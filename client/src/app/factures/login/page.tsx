'use client';

import { useActionState } from 'react';
import { loginAction } from '../actions';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    async (_prev: { error?: string }, formData: FormData) => loginAction(formData),
    {}
  );

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-full max-w-sm">
        <h1 className="text-white text-2xl font-semibold mb-8 text-center">Factures</h1>
        <form action={formAction} className="bg-gray-900 rounded-xl p-8 space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm text-gray-400 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2.5 text-sm border border-gray-700 focus:outline-none focus:border-gray-500"
            />
          </div>
          {state?.error && (
            <p className="text-red-400 text-sm">{state.error}</p>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-white text-gray-950 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-100 disabled:opacity-50"
          >
            {isPending ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
