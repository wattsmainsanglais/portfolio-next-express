'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSellerToken, listInvoices, convertAndSubmitInvoice, getInvoiceEvents, createInvoiceEvent, type SuperPDPInvoice, type SuperPDPInvoiceEvent } from './lib/superpdp';
import { buildEN16931, type InvoiceFormData } from './lib/en16931';

export async function loginAction(formData: FormData): Promise<{ error?: string }> {
  const password = formData.get('password') as string;

  if (!password || password !== process.env.FACTURES_PASSWORD) {
    return { error: 'Incorrect password.' };
  }

  const cookieStore = await cookies();
  cookieStore.set('factures_session', process.env.FACTURES_SESSION_TOKEN!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  });

  redirect('/factures');
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('factures_session');
  redirect('/factures/login');
}

export async function getInvoicesAction(): Promise<SuperPDPInvoice[]> {
  const token = await getSellerToken();
  return listInvoices(token);
}

export async function getNextInvoiceNumberAction(): Promise<string> {
  const year = new Date().getFullYear();
  try {
    const token = await getSellerToken();
    const invoices = await listInvoices(token);
    const seq = String(invoices.length + 1).padStart(3, '0');
    return `AW-${year}-${seq}`;
  } catch {
    return `AW-${year}-001`;
  }
}

export async function getInvoiceEventsAction(): Promise<SuperPDPInvoiceEvent[]> {
  const token = await getSellerToken();
  return getInvoiceEvents(token);
}

export async function sendInvoiceStatusAction(
  invoiceId: number,
  statusCode: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const token = await getSellerToken();
    await createInvoiceEvent(invoiceId, statusCode, token);
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: message };
  }
}

export async function createInvoiceAction(
  formData: InvoiceFormData
): Promise<{ success: boolean; invoiceId?: number; error?: string }> {
  try {
    const token = await getSellerToken();
    const en16931 = buildEN16931(formData);
    const result = await convertAndSubmitInvoice(en16931, token);
    return { success: true, invoiceId: result.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: message };
  }
}
