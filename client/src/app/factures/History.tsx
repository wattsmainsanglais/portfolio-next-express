'use client';

import { useState } from 'react';
import {
  getInvoicesAction,
  getInvoiceEventsAction,
  sendInvoiceStatusAction,
} from './actions';
import type { SuperPDPInvoice } from './lib/superpdp';

function statusLabel(code: string): { label: string; className: string } {
  if (code === 'fr:212') return { label: 'Paid', className: 'bg-green-500/15 text-green-600 ring-1 ring-green-500/30' };
  if (code === 'fr:208') return { label: 'Cancelled', className: 'bg-red-500/15 text-red-600 ring-1 ring-red-500/30' };
  if (code === 'api:uploaded') return { label: 'Pending', className: 'bg-amber-500/15 text-amber-600 ring-1 ring-amber-500/30' };
  return { label: code, className: 'bg-muted text-muted-foreground ring-1 ring-border' };
}

export default function History() {
  const [invoices, setInvoices] = useState<SuperPDPInvoice[] | null>(null);
  const [latestStatus, setLatestStatus] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [actionPending, setActionPending] = useState<number | null>(null);
  const [sendPopup, setSendPopup] = useState<{ invoiceId: number; email: string } | null>(null);
  const [sendPending, setSendPending] = useState(false);
  const [sendResult, setSendResult] = useState<{ invoiceId: number; type: 'success' | 'error'; message: string } | null>(null);

  async function load() {
    setLoading(true);
    const [data, events] = await Promise.all([getInvoicesAction(), getInvoiceEventsAction()]);
    setInvoices(data);
    const statusMap: Record<number, string> = {};
    for (const ev of [...events].sort((a, b) => b.id - a.id)) {
      if (!(ev.invoice_id in statusMap)) statusMap[ev.invoice_id] = ev.status_code;
    }
    setLatestStatus(statusMap);
    setLoading(false);
  }

  async function handleSendStatus(invoiceId: number, statusCode: string) {
    setActionPending(invoiceId);
    await sendInvoiceStatusAction(invoiceId, statusCode);
    await load();
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

  if (!invoices && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <p className="text-muted-foreground text-sm">Load your invoice history.</p>
        <button
          onClick={load}
          className="bg-brand-600 hover:bg-brand-700 text-white rounded-xl px-8 py-3 text-sm font-semibold transition-colors shadow-sm"
        >
          Load History
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl border border-border overflow-hidden bg-card shadow-sm">
        {loading && <p className="text-muted-foreground text-sm p-6">Loading…</p>}
        {!loading && invoices && invoices.length === 0 && (
          <p className="text-muted-foreground text-sm p-6">No invoices yet.</p>
        )}
        {!loading && invoices && invoices.length > 0 && (
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
            onClick={load}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

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
    </>
  );
}
