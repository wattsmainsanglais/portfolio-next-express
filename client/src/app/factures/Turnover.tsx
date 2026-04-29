'use client';

import { useState, useEffect } from 'react';
import { getInvoicesAction, getInvoiceEventsAction } from './actions';
import type { SuperPDPInvoice } from './lib/superpdp';

type Mode = 'monthly' | 'quarterly';

interface PeriodData {
  key: string;
  label: string;
  paid: number;
  pending: number;
}

function getIssueDate(inv: SuperPDPInvoice): string {
  return inv.en_invoice?.issue_date ?? inv.created_at.split('T')[0];
}

function toPeriodKey(dateStr: string, mode: Mode): string {
  const [year, month] = dateStr.split('-');
  if (mode === 'monthly') return `${year}-${month}`;
  return `${year}-Q${Math.ceil(parseInt(month) / 3)}`;
}

function toPeriodLabel(key: string): string {
  if (key.includes('-Q')) {
    const [year, q] = key.split('-');
    return `${q} ${year}`;
  }
  const [year, month] = key.split('-');
  return new Date(parseInt(year), parseInt(month) - 1, 1)
    .toLocaleString('en-GB', { month: 'short', year: '2-digit' });
}

function buildPeriods(
  invoices: SuperPDPInvoice[],
  statusMap: Record<number, string>,
  mode: Mode,
  limit: number
): PeriodData[] {
  const map: Record<string, { paid: number; pending: number }> = {};

  for (const inv of invoices) {
    const status = statusMap[inv.id];
    if (status === 'fr:208') continue;
    const amount = parseFloat(inv.en_invoice?.totals.amount_due_for_payment ?? '0');
    if (!amount) continue;
    const key = toPeriodKey(getIssueDate(inv), mode);
    if (!map[key]) map[key] = { paid: 0, pending: 0 };
    if (status === 'fr:212') map[key].paid += amount;
    else map[key].pending += amount;
  }

  return Object.keys(map)
    .sort()
    .slice(-limit)
    .map(key => ({ key, label: toPeriodLabel(key), paid: map[key].paid, pending: map[key].pending }));
}

function getDeclarationPeriod(mode: Mode): { key: string; label: string; deadline: Date } {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  if (mode === 'monthly') {
    const pm = month === 1 ? 12 : month - 1;
    const py = month === 1 ? year - 1 : year;
    const key = `${py}-${String(pm).padStart(2, '0')}`;
    const label = new Date(py, pm - 1, 1).toLocaleString('en-GB', { month: 'long', year: 'numeric' });
    const deadline = new Date(year, month, 0); // last day of current month
    return { key, label, deadline };
  }

  // Quarterly: declare previous quarter
  const cq = Math.ceil(month / 3);
  const pq = cq === 1 ? 4 : cq - 1;
  const py = cq === 1 ? year - 1 : year;
  const key = `${py}-Q${pq}`;
  const label = `Q${pq} ${py}`;

  // Deadlines: Q4→Jan 31, Q1→Apr 30, Q2→Jul 31, Q3→Oct 31
  const deadlines = [
    new Date(year, 0, 31),
    new Date(year, 3, 30),
    new Date(year, 6, 31),
    new Date(year, 9, 31),
  ];

  return { key, label, deadline: deadlines[cq - 1] };
}

const BAR_MAX_H = 160;

export default function Turnover() {
  const [mode, setMode] = useState<Mode>('quarterly');
  const [invoices, setInvoices] = useState<SuperPDPInvoice[] | null>(null);
  const [statusMap, setStatusMap] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('turnover_mode') as Mode;
      if (saved === 'monthly' || saved === 'quarterly') setMode(saved);
    } catch {}
  }, []);

  function handleModeChange(m: Mode) {
    setMode(m);
    try { localStorage.setItem('turnover_mode', m); } catch {}
  }

  async function load() {
    setLoading(true);
    const [data, events] = await Promise.all([getInvoicesAction(), getInvoiceEventsAction()]);
    setInvoices(data);
    const map: Record<number, string> = {};
    for (const ev of [...events].sort((a, b) => b.id - a.id)) {
      if (!(ev.invoice_id in map)) map[ev.invoice_id] = ev.status_code;
    }
    setStatusMap(map);
    setLoading(false);
  }

  if (!invoices && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <p className="text-muted-foreground text-sm">Load your turnover data.</p>
        <button
          onClick={load}
          className="bg-brand-600 hover:bg-brand-700 text-white rounded-xl px-8 py-3 text-sm font-semibold transition-colors shadow-sm"
        >
          Load Turnover
        </button>
      </div>
    );
  }

  if (loading) {
    return <p className="text-muted-foreground text-sm py-6">Loading…</p>;
  }

  const limit = mode === 'monthly' ? 6 : 4;
  const periods = buildPeriods(invoices!, statusMap, mode, limit);
  const maxTotal = Math.max(...periods.map(p => p.paid + p.pending), 1);

  const declInfo = getDeclarationPeriod(mode);
  const declPaid = periods.find(p => p.key === declInfo.key)?.paid ?? 0;
  const isOverdue = new Date() > declInfo.deadline;

  return (
    <div className="space-y-6">

      {/* URSSAF declaration summary */}
      <div className={`rounded-xl border p-6 ${isOverdue ? 'bg-red-500/5 border-red-500/20' : 'bg-brand-600/5 border-brand-600/20'}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Current URSSAF Declaration
            </p>
            <p className="text-xl font-bold text-foreground">{declInfo.label}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Due {declInfo.deadline.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              {isOverdue && <span className="ml-2 text-red-600 font-semibold">— Overdue</span>}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              CA to declare
            </p>
            <p className="text-3xl font-bold text-foreground">€{declPaid.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">paid invoices only</p>
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="rounded-xl border border-border bg-card shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold text-foreground">Chiffre d'Affaires</h2>
          <div className="flex gap-0.5 bg-muted rounded-lg p-0.5">
            {(['monthly', 'quarterly'] as Mode[]).map(m => (
              <button
                key={m}
                onClick={() => handleModeChange(m)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                  mode === m ? 'bg-brand-600 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {periods.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-16">No invoice data yet.</p>
        ) : (
          <>
            <div className="flex items-end gap-3" style={{ height: BAR_MAX_H }}>
              {periods.map(p => {
                const paidH = Math.round((p.paid / maxTotal) * BAR_MAX_H);
                const pendingH = Math.round((p.pending / maxTotal) * BAR_MAX_H);
                const isHov = hovered === p.key;

                return (
                  <div
                    key={p.key}
                    className="relative flex-1 group"
                    onMouseEnter={() => setHovered(p.key)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {isHov && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10 bg-foreground text-background rounded-lg px-3 py-2 text-xs whitespace-nowrap shadow-lg pointer-events-none">
                        {p.paid > 0 && <div>€{p.paid.toFixed(2)} paid</div>}
                        {p.pending > 0 && <div className="opacity-60">+ €{p.pending.toFixed(2)} pending</div>}
                        {p.paid === 0 && p.pending === 0 && <div>€0.00</div>}
                      </div>
                    )}
                    {/* Stacked bar — pending on top, paid at bottom */}
                    <div className="flex flex-col justify-end" style={{ height: BAR_MAX_H }}>
                      {p.pending > 0 && (
                        <div
                          className="w-full bg-brand-600/20 border border-brand-600/30 border-b-0 rounded-t-sm"
                          style={{ height: pendingH }}
                        />
                      )}
                      {p.paid > 0 && (
                        <div
                          className={`w-full bg-brand-600 transition-opacity ${isHov ? 'opacity-80' : ''} ${p.pending === 0 ? 'rounded-t-sm' : ''}`}
                          style={{ height: paidH }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* X-axis labels */}
            <div className="flex gap-3 mt-2">
              {periods.map(p => (
                <div key={p.key} className="flex-1 text-center">
                  <span className="text-xs text-muted-foreground">{p.label}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Legend + refresh */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-brand-600" />
            <span className="text-xs text-muted-foreground">Paid (CA)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-brand-600/20 border border-brand-600/30" />
            <span className="text-xs text-muted-foreground">Pending (not counted)</span>
          </div>
          <button
            onClick={load}
            className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

    </div>
  );
}
