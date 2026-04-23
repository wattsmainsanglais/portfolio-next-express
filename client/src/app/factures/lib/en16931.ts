import type { EN16931Invoice, EN16931Line, EN16931VatBreakdown } from './superpdp';

export interface InvoiceFormData {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  buyerName: string;
  buyerSiret: string;
  buyerVat: string;
  buyerStreet: string;
  buyerCity: string;
  buyerPostcode: string;
  buyerCountry: string;
  lines: FormLine[];
  notes: string;
}

export interface FormLine {
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number; // 0, 5.5, 10, or 20
}

// SIREN = first 9 digits of SIRET
function siretToSiren(siret: string): string {
  return siret.replace(/\s/g, '').substring(0, 9);
}

function sellerFromEnv(): EN16931Invoice['seller'] {
  const siret = process.env.SELLER_SIRET || '81996076600023';
  const siren = siretToSiren(siret);
  return {
    name: process.env.SELLER_NAME || 'Andrew Watts',
    // legal_registration_identifier requires SIREN (9 digits), not SIRET
    legal_registration_identifier: { value: siren, scheme: '0002' },
    identifiers: [{ value: siret, scheme: '0225' }],
    vat_identifier: process.env.SELLER_VAT || undefined,
    electronic_address: { value: siret, scheme: '0225' },
    postal_address: { country_code: 'FR' },
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

// VAT category code: S = standard, E = exempt (franchise TVA / 0%)
function vatCategoryCode(rate: number): string {
  return rate === 0 ? 'E' : 'S';
}


export function buildEN16931(form: InvoiceFormData): EN16931Invoice {
  const linesWithAmounts = form.lines.map((l, i) => ({
    ...l,
    netAmount: round2(l.quantity * l.unitPrice),
    index: i + 1,
  }));

  // Group by VAT rate for vat_break_down
  const vatGroups: Record<string, { taxable: number; tax: number; rate: number }> = {};
  for (const l of linesWithAmounts) {
    const key = String(l.vatRate);
    if (!vatGroups[key]) vatGroups[key] = { taxable: 0, tax: 0, rate: l.vatRate };
    vatGroups[key].taxable = round2(vatGroups[key].taxable + l.netAmount);
    vatGroups[key].tax = round2(vatGroups[key].tax + l.netAmount * (l.vatRate / 100));
  }

  const totalExVat = round2(linesWithAmounts.reduce((s, l) => s + l.netAmount, 0));
  const totalVat = round2(Object.values(vatGroups).reduce((s, g) => s + g.tax, 0));
  const totalIncVat = round2(totalExVat + totalVat);

  const vatBreakDown: EN16931VatBreakdown[] = Object.entries(vatGroups).map(([rate, g]) => ({
    vat_category_taxable_amount: g.taxable.toFixed(2),
    vat_category_tax_amount: g.tax.toFixed(2),
    vat_category_code: vatCategoryCode(g.rate),
    vat_identifier: 'VAT',
    vat_category_rate: rate,
    ...(g.rate === 0 && {
      vat_exemption_reason_text: 'TVA non applicable, art. 293 B du CGI',
      vat_exemption_reason_code: 'VATEX-EU-O',
    }),
  }));

  const lines: EN16931Line[] = linesWithAmounts.map((l) => ({
    identifier: String(l.index).padStart(3, '0'),
    invoiced_quantity: String(l.quantity),
    invoiced_quantity_code: 'C62',
    net_amount: l.netAmount.toFixed(2),
    price_details: { item_net_price: l.unitPrice.toFixed(2) },
    vat_information: {
      invoiced_item_vat_category_code: vatCategoryCode(l.vatRate),
      invoiced_item_vat_rate: String(l.vatRate),
    },
    item_information: { name: l.description },
  }));

  // All three notes are mandatory for French invoices (BR-FR-05)
  const notes: Array<{ subject_code: string; note: string }> = [
    {
      subject_code: 'PMT',
      note: "L'indemnité forfaitaire légale pour frais de recouvrement est de 40 €.",
    },
    {
      subject_code: 'PMD',
      note: "À défaut de règlement à la date d'échéance, une pénalité de 10 % du net à payer sera applicable immédiatement.",
    },
    {
      subject_code: 'AAB',
      note: 'Aucun escompte pour paiement anticipé.',
    },
  ];
  // Required by French law on invoices from franchise TVA sellers (no VAT number)
  if (!process.env.SELLER_VAT) {
    notes.push({ subject_code: 'AAI', note: 'TVA non applicable, art. 293 B du CGI' });
  }
  if (form.notes) {
    notes.push({ subject_code: 'AAI', note: form.notes });
  }

  const buyerSiret = form.buyerSiret.replace(/\s/g, '');
  const buyerSiren = buyerSiret ? siretToSiren(buyerSiret) : undefined;

  return {
    number: form.invoiceNumber,
    issue_date: form.issueDate,
    payment_due_date: form.dueDate,
    type_code: 380,
    currency_code: 'EUR',
    process_control: {
      business_process_type: 'M1',
      specification_identifier: 'urn:cen.eu:en16931:2017',
    },
    notes,
    seller: sellerFromEnv(),
    buyer: {
      name: form.buyerName,
      legal_registration_identifier: buyerSiren
        ? { value: buyerSiren, scheme: '0002' }
        : undefined,
      identifiers: buyerSiret
        ? [{ value: buyerSiret, scheme: '0225' }]
        : undefined,
      vat_identifier: form.buyerVat || undefined,
      electronic_address: buyerSiret
        ? { value: buyerSiret, scheme: '0225' }
        : undefined,
      postal_address: {
        street: form.buyerStreet || undefined,
        city: form.buyerCity || undefined,
        postcode: form.buyerPostcode || undefined,
        country_code: form.buyerCountry || 'FR',
      },
    },
    delivery_information: { delivery_date: form.issueDate },
    deliver_to_address: { country_code: form.buyerCountry || 'FR' },
    lines,
    vat_break_down: vatBreakDown,
    totals: {
      sum_invoice_lines_amount: totalExVat.toFixed(2),
      total_without_vat: totalExVat.toFixed(2),
      total_vat_amount: { value: totalVat.toFixed(2), currency_code: 'EUR' },
      total_with_vat: totalIncVat.toFixed(2),
      amount_due_for_payment: totalIncVat.toFixed(2),
    },
  };
}
