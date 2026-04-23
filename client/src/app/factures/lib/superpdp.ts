const ENDPOINT = process.env.SUPERPDP_ENDPOINT || 'https://api.superpdp.tech';

// Matches the actual EN16931 JSON schema returned by Super PDP's convert endpoint
export interface EN16931Invoice {
  number: string;
  issue_date: string;
  payment_due_date: string;
  type_code: number;
  currency_code: string;
  process_control: {
    business_process_type: string;
    specification_identifier: string;
  };
  notes?: Array<{ subject_code: string; note: string }>;
  seller: EN16931Party;
  buyer: EN16931Party;
  delivery_information?: { delivery_date: string };
  deliver_to_address?: { country_code: string };
  lines: EN16931Line[];
  vat_break_down: EN16931VatBreakdown[];
  totals: EN16931Totals;
}

export interface EN16931Party {
  name: string;
  identifiers?: Array<{ value: string; scheme: string }>;
  legal_registration_identifier?: { value: string; scheme: string };
  vat_identifier?: string;
  electronic_address?: { value: string; scheme: string };
  postal_address?: {
    street?: string;
    city?: string;
    postcode?: string;
    country_code: string;
  };
}

export interface EN16931Line {
  identifier: string;
  invoiced_quantity: string;
  invoiced_quantity_code: string;
  net_amount: string;
  price_details: { item_net_price: string };
  vat_information: {
    invoiced_item_vat_category_code: string;
    invoiced_item_vat_rate: string;
  };
  item_information: { name: string; description?: string };
}

export interface EN16931VatBreakdown {
  vat_category_taxable_amount: string;
  vat_category_tax_amount: string;
  vat_category_code: string;
  vat_identifier: string;
  vat_category_rate: string;
  exemption_reason_text?: string;
  exemption_reason_code?: string;
  vat_exemption_reason_text?: string;
  vat_exemption_reason_code?: string;
}

export interface EN16931Totals {
  sum_invoice_lines_amount: string;
  total_without_vat: string;
  total_vat_amount: { value: string; currency_code: string };
  total_with_vat: string;
  amount_due_for_payment: string;
}

export interface SuperPDPInvoice {
  id: number;
  created_at: string;
  en_invoice: EN16931Invoice | null;
}

export interface SuperPDPInvoiceEvent {
  id: number;
  invoice_id: number;
  status_code: string;
  created_at: string;
}

async function getToken(clientId: string, clientSecret: string): Promise<string> {
  const resp = await fetch(`${ENDPOINT}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }).toString(),
  });
  if (!resp.ok) throw new Error(`OAuth failed: ${resp.status}`);
  const body = await resp.json();
  return body.access_token as string;
}

export async function getSellerToken(): Promise<string> {
  return getToken(
    process.env.SUPERPDP_CLIENT_ID!,
    process.env.SUPERPDP_CLIENT_SECRET!
  );
}

export async function getInvoiceEvents(token: string): Promise<SuperPDPInvoiceEvent[]> {
  const resp = await fetch(`${ENDPOINT}/v1.beta/invoice_events?order=desc&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) throw new Error(`getInvoiceEvents failed: ${resp.status}`);
  const body = await resp.json();
  return body.data as SuperPDPInvoiceEvent[];
}

export async function createInvoiceEvent(
  invoiceId: number,
  statusCode: string,
  token: string
): Promise<SuperPDPInvoiceEvent> {
  const resp = await fetch(`${ENDPOINT}/v1.beta/invoice_events`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ invoice_id: invoiceId, status_code: statusCode }),
  });
  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`createInvoiceEvent failed (${resp.status}): ${err}`);
  }
  return resp.json();
}

export async function listInvoices(token: string): Promise<SuperPDPInvoice[]> {
  const resp = await fetch(`${ENDPOINT}/v1.beta/invoices?order=desc`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) throw new Error(`listInvoices failed: ${resp.status}`);
  const body = await resp.json();
  return body.data as SuperPDPInvoice[];
}

export async function convertAndSubmitInvoice(
  en16931Json: EN16931Invoice,
  token: string
): Promise<SuperPDPInvoice> {
  const { readFile } = await import('fs/promises');
  const { join } = await import('path');
  const pdfBuffer = await readFile(join(process.cwd(), 'src/app/factures/lib/facturx_blank.pdf'));

  const convertBody = new FormData();
  convertBody.append('invoice', new Blob([JSON.stringify(en16931Json)], { type: 'application/json' }));
  convertBody.append('pdf', new Blob([pdfBuffer], { type: 'application/pdf' }));

  const facturXResp = await fetch(`${ENDPOINT}/v1.beta/invoices/convert?from=en16931&to=factur-x`, {
    method: 'POST',
    body: convertBody,
  });
  if (!facturXResp.ok) {
    const err = await facturXResp.text();
    throw new Error(`Factur-X conversion failed (${facturXResp.status}): ${err}`);
  }
  const facturXBuffer = await facturXResp.arrayBuffer();

  const submitResp = await fetch(`${ENDPOINT}/v1.beta/invoices`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: facturXBuffer,
  });
  if (!submitResp.ok) {
    const err = await submitResp.text();
    throw new Error(`Invoice submit failed (${submitResp.status}): ${err}`);
  }
  return submitResp.json();
}
