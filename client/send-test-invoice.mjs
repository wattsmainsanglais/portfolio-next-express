// Sandbox test: send invoice FROM Tricatel TO Burger Queen
// Run: node send-test-invoice.mjs

import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ENDPOINT = 'https://api.superpdp.tech';

const TRICATEL_ID = '019db463-6579-7dc8-b0a3-fed3d7a46e07';
const TRICATEL_SECRET = 'Ll1i0tpiTyUUSumQTVuXN0BXEns_lPDbUUxPiQ';

async function getToken() {
  const resp = await fetch(`${ENDPOINT}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: TRICATEL_ID,
      client_secret: TRICATEL_SECRET,
    }),
  });
  const body = await resp.json();
  return body.access_token;
}

const invoice = {
  number: 'TRI-2026-004',
  issue_date: '2026-04-28',
  payment_due_date: '2026-05-28',
  type_code: 380,
  currency_code: 'EUR',
  process_control: {
    business_process_type: 'M1',
    specification_identifier: 'urn:cen.eu:en16931:2017',
  },
  notes: [
    { subject_code: 'PMT', note: "L'indemnité forfaitaire légale pour frais de recouvrement est de 40 €." },
    { subject_code: 'PMD', note: "À défaut de règlement à la date d'échéance, une pénalité de 10 % du net à payer sera applicable immédiatement." },
    { subject_code: 'AAB', note: 'Aucun escompte pour paiement anticipé.' },
  ],
  seller: {
    name: 'tricatel',
    legal_registration_identifier: { value: '000000001', scheme: '0002' },
    vat_identifier: 'FR00000000100',
    electronic_address: { value: '315143296_4495', scheme: '0225' },
    postal_address: { country_code: 'FR' },
  },
  buyer: {
    name: 'Burger Queen',
    legal_registration_identifier: { value: '000000002', scheme: '0002' },
    electronic_address: { value: '315143296_4496', scheme: '0225' },
    postal_address: { country_code: 'FR' },
  },
  lines: [
    {
      identifier: '001',
      invoiced_quantity: '1.0000',
      invoiced_quantity_code: 'C62',
      net_amount: '250.00',
      price_details: { item_net_price: '250.000000' },
      vat_information: { invoiced_item_vat_category_code: 'E', invoiced_item_vat_rate: '0' },
      item_information: { name: 'Supplies Q2 2026' },
    },
  ],
  vat_break_down: [
    {
      vat_category_taxable_amount: '250.00',
      vat_category_tax_amount: '0.00',
      vat_category_code: 'E',
      vat_identifier: 'VAT',
      vat_category_rate: '0',
      vat_exemption_reason_code: 'VATEX-EU-O',
    },
  ],
  totals: {
    sum_invoice_lines_amount: '250.00',
    total_without_vat: '250.00',
    total_vat_amount: { value: '0.00', currency_code: 'EUR' },
    total_with_vat: '250.00',
    amount_due_for_payment: '250.00',
  },
};

const token = await getToken();
console.log('Token:', token);

const pdfBuffer = await readFile(join(__dirname, 'src/app/factures/lib/facturx_blank.pdf'));

const form = new FormData();
form.append('invoice', new Blob([JSON.stringify(invoice)], { type: 'application/json' }));
form.append('pdf', new Blob([new Uint8Array(pdfBuffer)], { type: 'application/pdf' }));

console.log('Invoice payload:', JSON.stringify(invoice, null, 2));

console.log('Converting to Factur-X…');
const convertResp = await fetch(`${ENDPOINT}/v1.beta/invoices/convert?from=en16931&to=factur-x`, {
  method: 'POST',
  body: form,
});

if (!convertResp.ok) {
  const err = await convertResp.text();
  console.error('Conversion failed:', convertResp.status, err);
  process.exit(1);
}

const facturXBuffer = await convertResp.arrayBuffer();
console.log('Factur-X generated, size:', facturXBuffer.byteLength);

console.log('Submitting invoice…');
const submitResp = await fetch(`${ENDPOINT}/v1.beta/invoices`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
  body: facturXBuffer,
});

const result = await submitResp.json();
if (!submitResp.ok) {
  console.error('Submit failed:', submitResp.status, result);
  process.exit(1);
}

console.log('Invoice submitted:', JSON.stringify(result, null, 2));
