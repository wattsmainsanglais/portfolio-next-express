'use client';

import { useState } from 'react';
import {
  createInvoiceAction,
  getInvoicesAction,
  getInvoiceEventsAction,
  sendInvoiceStatusAction,
  getNextInvoiceNumberAction,
  logoutAction,
} from './actions';
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

function statusLabel(code: string): { label: string; className: string } {
  if (code === 'fr:212') return { label: 'Paid', className: 'bg-green-500/15 text-green-600 ring-1 ring-green-500/30' };
  if (code === 'fr:208') return { label: 'Cancelled', className: 'bg-red-500/15 text-red-600 ring-1 ring-red-500/30' };
  if (code === 'api:uploaded') return { label: 'Pending', className: 'bg-amber-500/15 text-amber-600 ring-1 ring-amber-500/30' };
  return { label: code, className: 'bg-muted text-muted-foreground ring-1 ring-border' };
}

type BuyerType = 'company' | 'individual';

export default function FacturesPage() {
  const [tab, setTab] = useState<'new' | 'history'>('new');
  const [invoiceReady, setInvoiceReady] = useState(false);
  const [nextNumber, setNextNumber] = useState<string | null>(null);
  const [generatingNumber, setGeneratingNumber] = useState(false);
  const [lines, setLines] = useState<FormLine[]>([emptyLine()]);
  const [buyerType, setBuyerType] = useState<BuyerType>('company');
  const [vatApplicable, setVatApplicable] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [invoices, setInvoices] = useState<SuperPDPInvoice[] | null>(null);
  const [latestStatus, setLatestStatus] = useState<Record<number, string>>({});
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [actionPending, setActionPending] = useState<number | null>(null);
  const [sendPopup, setSendPopup] = useState<{ invoiceId: number; email: string } | null>(null);
  const [sendPending, setSendPending] = useState(false);
  const [sendResult, setSendResult] = useState<{ invoiceId: number; type: 'success' | 'error'; message: string } | null>(null);

  async function handleNewInvoice() {
    setGeneratingNumber(true);
    const number = await getNextInvoiceNumberAction();
    setNextNumber(number);
    setLines([emptyLine()]);
    setStatus(null);
    setBuyerType('company');
    setVatApplicable(false);
    setInvoiceReady(true);
    setGeneratingNumber(false);
  }

  function toggleVat(applicable: boolean) {
    setVatApplicable(applicable);
    if (!applicable) {
      setLines((prev) => prev.map((l) => ({ ...l, vatRate: 0 })));
    }
  }

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
      buyerSiret: buyerType === 'company' ? (fd.get('buyerSiret') as string) : '',
      buyerVat: buyerType === 'company' ? (fd.get('buyerVat') as string) : '',
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
      setStatus({ type: 'success', message: `Invoice ${result.invoiceNumber} submitted successfully.` });
      setInvoiceReady(false);
      setNextNumber(null);
    } else {
      setStatus({ type: 'error', message: result.error || 'Unknown error' });
    }
  }

  async function loadHistory() {
    setLoadingHistory(true);
    const [data, events] = await Promise.all([getInvoicesAction(), getInvoiceEventsAction()]);
    setInvoices(data);
    const statusMap: Record<number, string> = {};
    for (const ev of [...events].sort((a, b) => b.id - a.id)) {
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

  async function handleSendInvoice(invoiceId: number, email: string) {
    setSendPending(true);
    setSendResult(null);
    try {
      const res = await fetch(`/api/factures/${invoiceId}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSendResult({ invoiceId, type: 'success', message: `Sent to ${email}` });
        setSendPopup(null);
      } else {
        setSendResult({ invoiceId, type: 'error', message: data.error ?? 'Failed to send' });
      }
    } catch {
      setSendResult({ invoiceId, type: 'error', message: 'Network error' });
    }
    setSendPending(false);
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
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header className="border-b border-border bg-background/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <img src="/images/awattsdev.png" alt="awattsdev" className="h-8 w-auto" />
            <div className="w-px h-8 bg-border" />
            <span className="text-4xl font-bold text-foreground tracking-tight">E-Invoicing & E-Reporting Portal</span>
          </div>
          <form action={logoutAction}>
            <button type="submit" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sign out
            </button>
          </form>
        </div>
      </header>

<div className="max-w-6xl mx-auto px-8 py-10">

        {/* Tabs */}
        <div className="flex gap-1 mb-10 bg-muted rounded-xl p-1 w-fit">
          <TabButton active={tab === 'new'} onClick={() => setTab('new')}>New Invoice</TabButton>
          <TabButton active={tab === 'history'} onClick={() => { setTab('history'); if (!invoices) loadHistory(); }}>
            History
          </TabButton>
        </div>

        {/* New invoice — start screen */}
        {tab === 'new' && !invoiceReady && (
          <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
            <div className="space-y-3">
              <h1 className="text-5xl font-bold text-foreground tracking-tight">
                English-speaking<br />E-Invoicing for France
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Certified. Compliant. No French required.
              </p>
            </div>
            {status && (
              <div className={`w-full max-w-md rounded-xl px-5 py-4 text-sm ring-1 ${
                status.type === 'success'
                  ? 'bg-green-500/10 text-green-700 ring-green-500/20'
                  : 'bg-red-500/10 text-red-700 ring-red-500/20'
              }`}>
                {status.message}
              </div>
            )}
            <button
              onClick={handleNewInvoice}
              disabled={generatingNumber}
              className="bg-brand-600 hover:bg-brand-700 text-white rounded-xl px-10 py-3.5 text-base font-semibold disabled:opacity-50 transition-colors shadow-sm"
            >
              {generatingNumber ? 'Checking number…' : '+ New Invoice'}
            </button>
          </div>
        )}

        {/* New invoice — form */}
        {tab === 'new' && invoiceReady && (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-5 items-start">

              {/* Left column — main fields */}
              <div className="col-span-2 space-y-5">

                <Card title="Invoice Details">
                  <div className="grid grid-cols-3 gap-4">
                    <Field label="Invoice Number" name="invoiceNumber" defaultValue={nextNumber ?? ''} required />
                    <Field label="Issue Date" name="issueDate" type="date" defaultValue={todayISO()} required />
                    <Field label="Due Date" name="dueDate" type="date" defaultValue={thirtyDaysISO()} required />
                  </div>
                </Card>

                <Card
                  title="Client"
                  action={
                    <SegmentedToggle
                      value={buyerType}
                      onChange={(v) => setBuyerType(v as BuyerType)}
                      options={[
                        { value: 'company', label: 'Company' },
                        { value: 'individual', label: 'Individual' },
                      ]}
                    />
                  }
                >
                  {buyerType === 'company' ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Company Name" name="buyerName" required />
                        <Field label="SIRET" name="buyerSiret" placeholder="14-digit SIRET" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="VAT Number" name="buyerVat" placeholder="e.g. FR12345678901" />
                        <Field label="Street" name="buyerStreet" />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <Field label="City" name="buyerCity" />
                        <Field label="Postcode" name="buyerPostcode" />
                        <Field label="Country" name="buyerCountry" defaultValue="FR" />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Field label="Full Name" name="buyerName" required />
                      <div className="grid grid-cols-3 gap-4">
                        <Field label="Street" name="buyerStreet" />
                        <Field label="City" name="buyerCity" />
                        <Field label="Postcode" name="buyerPostcode" />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <Field label="Country" name="buyerCountry" defaultValue="FR" />
                      </div>
                    </div>
                  )}
                </Card>

                <Card
                  title="Line Items"
                  action={
                    <SegmentedToggle
                      value={vatApplicable ? 'vat' : 'no-vat'}
                      onChange={(v) => toggleVat(v === 'vat')}
                      options={[
                        { value: 'no-vat', label: 'No VAT' },
                        { value: 'vat', label: 'VAT applicable' },
                      ]}
                    />
                  }
                >
                  <div className="space-y-2">
                    <div className={`grid gap-2 ${vatApplicable ? 'grid-cols-12' : 'grid-cols-10'}`}>
                      <div className="col-span-5 text-sm text-muted-foreground">Description</div>
                      <div className="col-span-2 text-sm text-muted-foreground text-right">Qty</div>
                      <div className="col-span-2 text-sm text-muted-foreground text-right">Unit Price (€)</div>
                      {vatApplicable && <div className="col-span-2 text-sm text-muted-foreground text-right">VAT %</div>}
                      <div className="col-span-1" />
                    </div>

                    {lines.map((line, i) => (
                      <div key={i} className={`grid gap-2 items-center ${vatApplicable ? 'grid-cols-12' : 'grid-cols-10'}`}>
                        <div className="col-span-5">
                          <input
                            value={line.description}
                            onChange={(e) => updateLine(i, 'description', e.target.value)}
                            required
                            placeholder="Description"
                            className="w-full bg-muted text-foreground rounded-lg px-3 py-2.5 text-sm border border-input focus:outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/20 transition-colors placeholder:text-muted-foreground/50"
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={line.quantity}
                            onChange={(e) => updateLine(i, 'quantity', parseFloat(e.target.value))}
                            required
                            className="w-full bg-muted text-foreground rounded-lg px-3 py-2.5 text-sm border border-input focus:outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/20 transition-colors text-right"
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={line.unitPrice}
                            onChange={(e) => updateLine(i, 'unitPrice', parseFloat(e.target.value))}
                            required
                            className="w-full bg-muted text-foreground rounded-lg px-3 py-2.5 text-sm border border-input focus:outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/20 transition-colors text-right"
                          />
                        </div>
                        {vatApplicable && (
                          <div className="col-span-2">
                            <select
                              value={line.vatRate}
                              onChange={(e) => updateLine(i, 'vatRate', parseFloat(e.target.value))}
                              className="w-full bg-muted text-foreground rounded-lg px-3 py-2.5 text-sm border border-input focus:outline-none focus:border-brand-500/60 transition-colors"
                            >
                              {VAT_RATES.map((r) => (
                                <option key={r} value={r}>{r}%</option>
                              ))}
                            </select>
                          </div>
                        )}
                        <div className="col-span-1 flex justify-end">
                          {lines.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeLine(i)}
                              className="text-muted-foreground hover:text-red-500 text-lg leading-none transition-colors"
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
                    className="text-xs text-brand-600 hover:text-brand-700 transition-colors font-medium"
                  >
                    + Add line
                  </button>

                  <div className="border-t border-border pt-4 space-y-1.5 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Total ex. VAT</span>
                      <span className="text-foreground font-medium">{totalExVat.toFixed(2)} €</span>
                    </div>
                    {vatApplicable && (
                      <div className="flex justify-between text-muted-foreground">
                        <span>VAT</span>
                        <span className="text-foreground font-medium">{totalVat.toFixed(2)} €</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-semibold pt-1 border-t border-border">
                      <span className="text-foreground">Total</span>
                      <span className="text-brand-600">{totalIncVat.toFixed(2)} €</span>
                    </div>
                  </div>
                </Card>

              </div>

              {/* Right column — notes + actions */}
              <div className="col-span-1 space-y-5">

                <Card title="Notes (optional)">
                  <textarea
                    name="notes"
                    rows={6}
                    placeholder="Additional information, payment terms…"
                    className="w-full bg-muted text-foreground rounded-lg px-4 py-2.5 text-sm border border-input focus:outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/20 transition-colors resize-none placeholder:text-muted-foreground/50"
                  />
                </Card>

                {status && (
                  <div className={`rounded-xl px-5 py-4 text-sm ring-1 ${
                    status.type === 'success'
                      ? 'bg-green-500/10 text-green-700 ring-green-500/20'
                      : 'bg-red-500/10 text-red-700 ring-red-500/20'
                  }`}>
                    {status.message}
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-xl py-2.5 text-sm font-medium disabled:opacity-50 transition-colors shadow-sm"
                  >
                    {isPending ? 'Submitting…' : 'Submit Invoice'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setInvoiceReady(false); setNextNumber(null); }}
                    className="w-full px-6 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground border border-border hover:border-foreground/30 transition-colors"
                  >
                    Cancel
                  </button>
                </div>

                <img
                  src="/images/plateforme-agreee-logo.svg"
                  alt="Plateforme Agréée"
                  className="h-24 w-auto mt-4"
                />

              </div>

            </div>
          </form>
        )}

        {/* History */}
        {tab === 'history' && (
          <div className="rounded-xl border border-border overflow-hidden bg-card shadow-sm">
            {loadingHistory && (
              <p className="text-muted-foreground text-sm p-6">Loading…</p>
            )}
            {!loadingHistory && invoices && invoices.length === 0 && (
              <p className="text-muted-foreground text-sm p-6">No invoices yet.</p>
            )}
            {!loadingHistory && invoices && invoices.length > 0 && (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider bg-muted/50">
                    <th className="px-5 py-3 font-medium text-left">Number</th>
                    <th className="px-5 py-3 font-medium text-left">Client</th>
                    <th className="px-5 py-3 font-medium text-left">Date</th>
                    <th className="px-5 py-3 font-medium text-right">Total</th>
                    <th className="px-5 py-3 font-medium text-left">Status</th>
                    <th className="px-5 py-3 font-medium text-left">PDF</th>
                    <th className="px-5 py-3 font-medium text-left">Send</th>
                    <th className="px-5 py-3 font-medium text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {invoices.map((inv) => {
                    const code = latestStatus[inv.id];
                    const { label, className: badgeClass } = code
                      ? statusLabel(code)
                      : { label: '—', className: 'text-muted-foreground' };
                    const isPaid = code === 'fr:212';
                    const isCancelled = code === 'fr:208';
                    const pending = actionPending === inv.id;
                    return (
                      <tr key={inv.id} className="hover:bg-muted/40 transition-colors">
                        <td className="px-5 py-4 font-mono text-xs text-muted-foreground">
                          {inv.en_invoice?.number ?? `#${inv.id}`}
                        </td>
                        <td className="px-5 py-4 text-foreground">{inv.en_invoice?.buyer?.name ?? '—'}</td>
                        <td className="px-5 py-4 text-muted-foreground text-xs">
                          {inv.en_invoice?.issue_date ?? inv.created_at?.split('T')[0]}
                        </td>
                        <td className="px-5 py-4 text-right font-medium text-foreground">
                          {inv.en_invoice?.totals.amount_due_for_payment
                            ? `${parseFloat(inv.en_invoice.totals.amount_due_for_payment).toFixed(2)} €`
                            : '—'}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium ${badgeClass}`}>
                            {label}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <a
                            href={`/api/factures/${inv.id}/pdf`}
                            target="_blank"
                            className="text-xs text-brand-600 hover:text-brand-700 transition-colors font-medium"
                          >
                            Download
                          </a>
                        </td>
                        <td className="px-5 py-4">
                          <div className="space-y-1">
                            {sendResult?.invoiceId === inv.id && (
                              <span className={`text-xs font-medium ${sendResult.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                                {sendResult.message}
                              </span>
                            )}
                            <button
                              onClick={() => { setSendResult(null); setSendPopup({ invoiceId: inv.id, email: '' }); }}
                              className="text-xs text-brand-600 hover:text-brand-700 transition-colors font-medium"
                            >
                              Send
                            </button>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          {!isPaid && !isCancelled && (
                            <div className="flex gap-3">
                              <button
                                disabled={pending}
                                onClick={() => handleSendStatus(inv.id, 'fr:212')}
                                className="text-xs text-green-600 hover:text-green-700 disabled:opacity-40 transition-colors font-medium"
                              >
                                {pending ? '…' : 'Mark Paid'}
                              </button>
                              <button
                                disabled={pending}
                                onClick={() => handleSendStatus(inv.id, 'fr:208')}
                                className="text-xs text-red-500 hover:text-red-600 disabled:opacity-40 transition-colors font-medium"
                              >
                                {pending ? '…' : 'Cancel'}
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
            <div className="px-5 py-3 border-t border-border">
              <button
                onClick={loadHistory}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Send to Client modal */}
      {sendPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-card rounded-2xl border border-border shadow-2xl p-8 w-full max-w-md mx-4">
            <h2 className="text-3xl font-bold text-foreground mb-2">Send to Client</h2>
            <p className="text-sm text-muted-foreground mb-6">
              The invoice will be sent as a PDF attachment to the address below.
            </p>
            <input
              type="email"
              value={sendPopup.email}
              onChange={(e) => setSendPopup({ invoiceId: sendPopup.invoiceId, email: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSendInvoice(sendPopup.invoiceId, sendPopup.email);
                }
                if (e.key === 'Escape') setSendPopup(null);
              }}
              placeholder="client@example.com"
              autoFocus
              className="w-full bg-muted text-foreground rounded-lg px-4 py-3 text-sm border border-input focus:outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/20 transition-colors placeholder:text-muted-foreground/50 mb-4"
            />
            <div className="flex gap-3">
              <button
                disabled={sendPending}
                onClick={() => handleSendInvoice(sendPopup.invoiceId, sendPopup.email)}
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white rounded-xl py-3 text-sm font-semibold disabled:opacity-50 transition-colors shadow-sm"
              >
                {sendPending ? 'Sending…' : 'Send Invoice'}
              </button>
              <button
                onClick={() => setSendPopup(null)}
                className="px-5 py-3 rounded-xl text-sm text-muted-foreground hover:text-foreground border border-border hover:border-foreground/30 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Card({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-card rounded-xl border border-border shadow-sm p-7 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function SegmentedToggle({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="inline-flex bg-muted rounded-lg p-0.5 gap-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            value === opt.value
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
        active ? 'bg-brand-600 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  name,
  type = 'text',
  defaultValue,
  placeholder,
  required,
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
      <label htmlFor={name} className="block text-xs text-muted-foreground mb-1.5">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="w-full bg-muted text-foreground rounded-lg px-4 py-2.5 text-sm border border-input focus:outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/20 transition-colors placeholder:text-muted-foreground/50"
      />
    </div>
  );
}
