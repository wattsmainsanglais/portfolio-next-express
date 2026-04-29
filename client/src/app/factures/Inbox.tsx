'use client';

import { useState } from 'react';
import { getIncomingInvoicesAction } from './actions';
import type { SuperPDPInvoice } from './lib/superpdp';

export default function Inbox() {
  const [invoices, setInvoices] = useState<SuperPDPInvoice[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    const data = await getIncomingInvoicesAction();
    setInvoices(data);
    setLoading(false);
  }

  if (!invoices && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <p className="text-muted-foreground text-sm">Load invoices received from suppliers.</p>
        <button
          onClick={load}
          className="bg-brand-600 hover:bg-brand-700 text-white rounded-xl px-8 py-3 text-sm font-semibold transition-colors shadow-sm"
        >
          Load Inbox
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card shadow-sm">
      {loading && <p className="text-muted-foreground text-sm p-6">Loading…</p>}
      {!loading && invoices && invoices.length === 0 && (
        <p className="text-muted-foreground text-sm p-6">No received invoices yet.</p>
      )}
      {!loading && invoices && invoices.length > 0 && (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider bg-muted/50">
              <th className="px-5 py-3 font-medium text-left">Number</th>
              <th className="px-5 py-3 font-medium text-left">From</th>
              <th className="px-5 py-3 font-medium text-left">Date</th>
              <th className="px-5 py-3 font-medium text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-muted/40 transition-colors">
                <td className="px-5 py-4 font-mono text-xs text-muted-foreground">
                  {inv.en_invoice?.number ?? `#${inv.id}`}
                </td>
                <td className="px-5 py-4 text-foreground">
                  {inv.en_invoice?.seller?.name ?? '—'}
                </td>
                <td className="px-5 py-4 text-muted-foreground text-xs">
                  {inv.en_invoice?.issue_date ?? inv.created_at?.split('T')[0]}
                </td>
                <td className="px-5 py-4 text-right font-medium text-foreground">
                  {inv.en_invoice?.totals.amount_due_for_payment
                    ? `${parseFloat(inv.en_invoice.totals.amount_due_for_payment).toFixed(2)} €`
                    : '—'}
                </td>
              </tr>
            ))}
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
  );
}
