'use client';

import { useActionState } from 'react';
import { loginAction } from '../actions';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    async (_prev: { error?: string }, formData: FormData) => loginAction(formData),
    {}
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">

        <div className="text-center space-y-1">
          <div className="text-2xl font-semibold">
            <span className="text-brand-600">awatts</span><span className="text-foreground">dev</span>
          </div>
          <p className="text-sm text-muted-foreground">Factures</p>
        </div>

        <form action={formAction} className="bg-card rounded-2xl border border-border shadow-sm p-8 space-y-5">
          <div>
            <label htmlFor="password" className="block text-xs text-muted-foreground mb-1.5">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full bg-muted text-foreground rounded-lg px-4 py-2.5 text-sm border border-input focus:outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/20 transition-colors"
            />
          </div>
          {state?.error && (
            <p className="text-red-500 text-xs">{state.error}</p>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-lg py-2.5 text-sm font-medium disabled:opacity-50 transition-colors shadow-sm"
          >
            {isPending ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
