'use client';

import { useState } from 'react';
import { createInvoiceAction, getInvoicesAction, getInvoiceEventsAction, sendInvoiceStatusAction, logoutAction } from './actions';
import type { InvoiceFormData, FormLine } from './lib/en16931';
import type { SuperPDPInvoice } from './lib/superpdp';

const VAT_RATES = [0, 5.5, 10, 20];

const emptyLine = (): FormLine => ({ description: '', quantity: 1, unitPrice: 0, vatRate: 0 });

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

function thirtyDaysISO() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split('T')[0];
}

function nextInvoiceNumber() {
  const year = new Date().getFullYear();
  return `AW-${year}-001`;
}

export default function FacturesPage() {
  const [tab, setTab] = useState<'new' | 'history'>('new');
  const [lines, setLines] = useState<FormLine[]>([emptyLine()]);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [invoices, setInvoices] = useState<SuperPDPInvoice[] | null>(null);
  const [latestStatus, setLatestStatus] = useState<Record<number, string>>({});
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [actionPending, setActionPending] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    setIsPending(true);

    const fd = new FormData(e.currentTarget);
    const data: InvoiceFormData = {
      invoiceNumber: fd.get('invoiceNumber') as string,
      issueDate: fd.get('issueDate') as string,
      dueDate: fd.get('dueDate') as string,
      buyerName: fd.get('buyerName') as string,
      buyerSiret: fd.get('buyerSiret') as string,
      buyerVat: fd.get('buyerVat') as string,
      buyerStreet: fd.get('buyerStreet') as string,
      buyerCity: fd.get('buyerCity') as string,
      buyerPostcode: fd.get('buyerPostcode') as string,
      buyerCountry: fd.get('buyerCountry') as string,
      notes: fd.get('notes') as string,
      lines,
    };

    const result = await createInvoiceAction(data);
    setIsPending(false);

    if (result.success) {
      setStatus({ type: 'success', message: `Invoice submitted. Super PDP ID: ${result.invoiceId}` });
    } else {
      setStatus({ type: 'error', message: result.error || 'Unknown error' });
    }
  }

  async function loadHistory() {
    setLoadingHistory(true);
    const [data, events] = await Promise.all([getInvoicesAction(), getInvoiceEventsAction()]);
    setInvoices(data);
    // Events are desc by id — first seen per invoice_id is the latest
    const statusMap: Record<number, string> = {};
    for (const ev of events) {
      if (!(ev.invoice_id in statusMap)) statusMap[ev.invoice_id] = ev.status_code;
    }
    setLatestStatus(statusMap);
    setLoadingHistory(false);
  }

  async function handleSendStatus(invoiceId: number, statusCode: string) {
    setActionPending(invoiceId);
    await sendInvoiceStatusAction(invoiceId, statusCode);
    await loadHistory();
    setActionPending(null);
  }

  function updateLine(i: number, field: keyof FormLine, value: string | number) {
    setLines((prev) => prev.map((l, idx) => (idx === i ? { ...l, [field]: value } : l)));
  }

  function addLine() {
    setLines((prev) => [...prev, emptyLine()]);
  }

  function removeLine(i: number) {
    setLines((prev) => prev.filter((_, idx) => idx !== i));
  }

  const totalExVat = lines.reduce((s, l) => s + l.quantity * l.unitPrice, 0);
  const totalVat = lines.reduce((s, l) => s + l.quantity * l.unitPrice * (l.vatRate / 100), 0);
  const totalIncVat = totalExVat + totalVat;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Factures — awattsdev</h1>
        <form action={logoutAction}>
          <button type="submit" className="text-sm text-gray-400 hover:text-white">
            Sign out
          </button>
        </form>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setTab('new')}
            className={`text-sm font-medium px-4 py-2 rounded-lg ${tab === 'new' ? 'bg-white text-gray-950' : 'text-gray-400 hover:text-white'}`}
          >
            New Invoice
          </button>
          <button
            onClick={() => { setTab('history'); if (!invoices) loadHistory(); }}
            className={`text-sm font-medium px-4 py-2 rounded-lg ${tab === 'history' ? 'bg-white text-gray-950' : 'text-gray-400 hover:text-white'}`}
          >
            History
          </button>
        </div>

        {tab === 'new' && (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Invoice details */}
            <section className="bg-gray-900 rounded-xl p-6 space-y-4">
              <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Invoice Details</h2>
              <div className="grid grid-cols-3 gap-4">
                <Field label="Invoice Number" name="invoiceNumber" defaultValue={nextInvoiceNumber()} required />
                <Field label="Issue Date" name="issueDate" type="date" defaultValue={todayISO()} required />
                <Field label="Due Date" name="dueDate" type="date" defaultValue={thirtyDaysISO()} required />
              </div>
            </section>

            {/* Buyer */}
            <section className="bg-gray-900 rounded-xl p-6 space-y-4">
              <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Buyer</h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Company / Name" name="buyerName" required />
                <Field label="SIRET" name="buyerSiret" placeholder="14-digit SIRET" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="VAT Number" name="buyerVat" placeholder="e.g. FR12345678901" />
                <Field label="Street" name="buyerStreet" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Field label="City" name="buyerCity" />
                <Field label="Postcode" name="buyerPostcode" />
                <Field label="Country Code" name="buyerCountry" defaultValue="FR" placeholder="FR" />
              </div>
            </section>

            {/* Line items */}
            <section className="bg-gray-900 rounded-xl p-6 space-y-4">
              <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Line Items</h2>
              <div className="space-y-3">
                {lines.map((line, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-5">
                      {i === 0 && <label className="block text-xs text-gray-500 mb-1">Description</label>}
                      <input
                        value={line.description}
                        onChange={(e) => updateLine(i, 'description', e.target.value)}
                        required
                        className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:outline-none focus:border-gray-500"
                      />
                    </div>
                    <div className="col-span-2">
                      {i === 0 && <label className="block text-xs text-gray-500 mb-1">Qty</label>}
                      <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={line.quantity}
                        onChange={(e) => updateLine(i, 'quantity', parseFloat(e.target.value))}
                        required
                        className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:outline-none focus:border-gray-500"
                      />
                    </div>
                    <div className="col-span-2">
                      {i === 0 && <label className="block text-xs text-gray-500 mb-1">Unit Price (€)</label>}
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={line.unitPrice}
                        onChange={(e) => updateLine(i, 'unitPrice', parseFloat(e.target.value))}
                        required
                        className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:outline-none focus:border-gray-500"
                      />
                    </div>
                    <div className="col-span-2">
                      {i === 0 && <label className="block text-xs text-gray-500 mb-1">VAT %</label>}
                      <select
                        value={line.vatRate}
                        onChange={(e) => updateLine(i, 'vatRate', parseFloat(e.target.value))}
                        className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:outline-none focus:border-gray-500"
                      >
                        {VAT_RATES.map((r) => (
                          <option key={r} value={r}>{r}%</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      {lines.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLine(i)}
                          className="text-gray-500 hover:text-red-400 text-lg leading-none mt-1"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addLine}
                className="text-sm text-gray-400 hover:text-white"
              >
                + Add line
              </button>

              {/* Totals */}
              <div className="border-t border-gray-800 pt-4 space-y-1 text-sm text-right">
                <div className="text-gray-400">Total ex. VAT: <span className="text-white">{totalExVat.toFixed(2)} €</span></div>
                <div className="text-gray-400">VAT: <span className="text-white">{totalVat.toFixed(2)} €</span></div>
                <div className="font-semibold text-base">Total inc. VAT: {totalIncVat.toFixed(2)} €</div>
              </div>
            </section>

            {/* Notes */}
            <section className="bg-gray-900 rounded-xl p-6 space-y-4">
              <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Notes (optional)</h2>
              <textarea
                name="notes"
                rows={3}
                placeholder="Payment terms, additional information…"
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2.5 text-sm border border-gray-700 focus:outline-none focus:border-gray-500"
              />
            </section>

            {status && (
              <div className={`rounded-xl px-5 py-4 text-sm ${status.type === 'success' ? 'bg-green-900/40 text-green-300' : 'bg-red-900/40 text-red-300'}`}>
                {status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-white text-gray-950 rounded-xl py-3 font-medium hover:bg-gray-100 disabled:opacity-50"
            >
              {isPending ? 'Submitting…' : 'Submit Invoice'}
            </button>
          </form>
        )}

        {tab === 'history' && (
          <section className="bg-gray-900 rounded-xl overflow-hidden">
            {loadingHistory && (
              <p className="text-gray-400 text-sm p-6">Loading…</p>
            )}
            {!loadingHistory && invoices && invoices.length === 0 && (
              <p className="text-gray-400 text-sm p-6">No invoices yet.</p>
            )}
            {!loadingHistory && invoices && invoices.length > 0 && (
              <table className="w-full text-sm">
                <thead className="border-b border-gray-800">
                  <tr className="text-gray-400 text-left">
                    <th className="px-6 py-3 font-medium">ID</th>
                    <th className="px-6 py-3 font-medium">Number</th>
                    <th className="px-6 py-3 font-medium">Buyer</th>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium text-right">Total</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {invoices.map((inv) => {
                    const statusCode = latestStatus[inv.id];
                    const isPaid = statusCode === 'fr:212';
                    const isCancelled = statusCode === 'fr:208';
                    const pending = actionPending === inv.id;
                    return (
                      <tr key={inv.id} className="hover:bg-gray-800/50">
                        <td className="px-6 py-4 text-gray-400">#{inv.id}</td>
                        <td className="px-6 py-4">{inv.en_invoice?.number ?? '—'}</td>
                        <td className="px-6 py-4">{inv.en_invoice?.buyer.name ?? '—'}</td>
                        <td className="px-6 py-4 text-gray-400">{inv.en_invoice?.issue_date ?? inv.created_at?.split('T')[0]}</td>
                        <td className="px-6 py-4 text-right">
                          {inv.en_invoice?.totals.amount_due_for_payment
                            ? `${inv.en_invoice.totals.amount_due_for_payment} €`
                            : '—'}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-mono text-gray-400">{statusCode ?? '—'}</span>
                        </td>
                        <td className="px-6 py-4">
                          {!isPaid && !isCancelled && (
                            <div className="flex gap-3">
                              <button
                                disabled={pending}
                                onClick={() => handleSendStatus(inv.id, 'fr:212')}
                                className="text-xs text-green-400 hover:text-green-300 disabled:opacity-40"
                              >
                                {pending ? '…' : 'Encaissée'}
                              </button>
                              <button
                                disabled={pending}
                                onClick={() => handleSendStatus(inv.id, 'fr:208')}
                                className="text-xs text-red-400 hover:text-red-300 disabled:opacity-40"
                              >
                                {pending ? '…' : 'Annuler'}
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            <div className="p-4 border-t border-gray-800">
              <button onClick={loadHistory} className="text-sm text-gray-400 hover:text-white">
                Refresh
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function Field({
  label, name, type = 'text', defaultValue, placeholder, required,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs text-gray-500 mb-1">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 text-sm border border-gray-700 focus:outline-none focus:border-gray-500"
      />
    </div>
  );
}
