'use client';

import { useState } from 'react';
import { logoutAction } from './actions';
import NewInvoice from './NewInvoice';
import History from './History';
import Inbox from './Inbox';
import Turnover from './Turnover';

export default function FacturesPage() {
  const [tab, setTab] = useState<'new' | 'history' | 'inbox' | 'turnover'>('new');

  return (
    <div className="min-h-screen bg-background">

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

        <div className="flex gap-1 mb-10 bg-muted rounded-xl p-1 w-fit">
          <TabButton active={tab === 'new'} onClick={() => setTab('new')}>New Invoice</TabButton>
          <TabButton active={tab === 'history'} onClick={() => setTab('history')}>History</TabButton>
          <TabButton active={tab === 'inbox'} onClick={() => setTab('inbox')}>Inbox</TabButton>
          <TabButton active={tab === 'turnover'} onClick={() => setTab('turnover')}>Turnover</TabButton>
        </div>

        {tab === 'new' && <NewInvoice />}
        {tab === 'history' && <History />}
        {tab === 'inbox' && <Inbox />}
        {tab === 'turnover' && <Turnover />}

      </div>
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
