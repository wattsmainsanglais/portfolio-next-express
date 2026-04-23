import 'server-only';
import PDFDocument from 'pdfkit';
import type { EN16931Invoice } from './superpdp';

const DARK = '#111827';
const GREY = '#6b7280';
const LIGHT = '#f3f4f6';
const BORDER = '#e5e7eb';

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

function eur(value: string | number): string {
  return `${Number(value).toFixed(2)} €`;
}

function hrule(doc: PDFKit.PDFDocument, y: number, color = BORDER) {
  doc.moveTo(50, y).lineTo(doc.page.width - 50, y).strokeColor(color).lineWidth(0.5).stroke();
}

function resolveLogoUrl(logoUrl: string): string {
  if (logoUrl.startsWith('http')) return logoUrl;
  const base = (process.env.SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
  return `${base}${logoUrl.startsWith('/') ? '' : '/'}${logoUrl}`;
}

async function fetchLogoBuffer(logoUrl: string): Promise<Buffer | null> {
  try {
    const resolved = resolveLogoUrl(logoUrl);
    const res = await fetch(resolved);
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

export async function generateInvoicePDF(
  invoice: EN16931Invoice,
  logoUrl?: string
): Promise<Buffer> {
  const logoBuffer = logoUrl ? await fetchLogoBuffer(logoUrl) : null;

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50, bufferPages: true });
    const chunks: Buffer[] = [];
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const { seller, buyer, lines, totals, notes = [] } = invoice;
    const sellerSiret = seller.identifiers?.[0]?.value ?? '';
    const buyerSiret  = buyer.identifiers?.[0]?.value ?? '';
    const pageW = doc.page.width;
    const margin = 50;
    const contentW = pageW - margin * 2;

    // ── HEADER ────────────────────────────────────────────────────────────
    const headerTop = 50;

    if (logoBuffer) {
      doc.image(logoBuffer, margin, headerTop, { fit: [120, 60] });
    } else {
      doc.fontSize(16).fillColor(DARK).font('Helvetica-Bold').text(seller.name, margin, headerTop);
    }

    doc.fontSize(24).fillColor(DARK).font('Helvetica-Bold')
      .text('FACTURE', margin, headerTop, { align: 'right' });
    doc.fontSize(9).font('Helvetica-Bold').fillColor(DARK)
      .text(invoice.number, margin, headerTop + 32, { align: 'right' });
    doc.font('Helvetica').fillColor(GREY)
      .text(`Date : ${formatDate(invoice.issue_date)}`, margin, headerTop + 46, { align: 'right' })
      .text(`Échéance : ${formatDate(invoice.payment_due_date)}`, margin, headerTop + 58, { align: 'right' });

    // ── PARTIES ───────────────────────────────────────────────────────────
    const partyTop = 140;
    const colW = contentW / 2 - 16;

    // Seller
    doc.fontSize(7).font('Helvetica-Bold').fillColor(GREY)
      .text('ÉMETTEUR', margin, partyTop);
    doc.fontSize(10).font('Helvetica-Bold').fillColor(DARK)
      .text(seller.name, margin, partyTop + 12);
    doc.fontSize(9).font('Helvetica').fillColor(GREY);
    if (sellerSiret) doc.text(`SIRET : ${sellerSiret}`, margin, partyTop + 26);
    const sellerVatY = sellerSiret ? partyTop + 38 : partyTop + 26;
    const sellerVatText = seller.vat_identifier
      ? `N° TVA : ${seller.vat_identifier}`
      : 'TVA non applicable, art. 293 B du CGI';
    doc.text(sellerVatText, margin, sellerVatY, { width: colW });

    // Buyer
    const buyerX = margin + colW + 32;
    doc.fontSize(7).font('Helvetica-Bold').fillColor(GREY)
      .text('DESTINATAIRE', buyerX, partyTop);
    doc.fontSize(10).font('Helvetica-Bold').fillColor(DARK)
      .text(buyer.name, buyerX, partyTop + 12);
    doc.fontSize(9).font('Helvetica').fillColor(GREY);
    let buyerY = partyTop + 26;
    if (buyerSiret) { doc.text(`SIRET : ${buyerSiret}`, buyerX, buyerY, { width: colW }); buyerY += 12; }
    if (buyer.vat_identifier) { doc.text(`N° TVA : ${buyer.vat_identifier}`, buyerX, buyerY, { width: colW }); buyerY += 12; }
    if (buyer.postal_address?.street) { doc.text(buyer.postal_address.street, buyerX, buyerY, { width: colW }); buyerY += 12; }
    if (buyer.postal_address?.city) {
      doc.text(`${buyer.postal_address.postcode ?? ''} ${buyer.postal_address.city}`.trim(), buyerX, buyerY, { width: colW });
      buyerY += 12;
    }
    if (buyer.postal_address?.country_code) doc.text(buyer.postal_address.country_code, buyerX, buyerY, { width: colW });

    // ── LINE ITEMS TABLE ──────────────────────────────────────────────────
    const tableTop = 240;
    const colDescW = contentW * 0.42;
    const colQtyW  = contentW * 0.08;
    const colPuW   = contentW * 0.16;
    const colVatW  = contentW * 0.10;
    const colTotW  = contentW * 0.16;
    // col positions
    const xDesc = margin;
    const xQty  = xDesc + colDescW;
    const xPu   = xQty  + colQtyW;
    const xVat  = xPu   + colPuW;
    const xTot  = xVat  + colVatW;

    // Header row
    doc.rect(margin, tableTop, contentW, 20).fill(DARK);
    doc.fontSize(8).font('Helvetica-Bold').fillColor('#ffffff');
    doc.text('Description',   xDesc, tableTop + 6, { width: colDescW });
    doc.text('Qté',           xQty,  tableTop + 6, { width: colQtyW,  align: 'right' });
    doc.text('PU HT',         xPu,   tableTop + 6, { width: colPuW,   align: 'right' });
    doc.text('TVA',           xVat,  tableTop + 6, { width: colVatW,  align: 'right' });
    doc.text('Total HT',      xTot,  tableTop + 6, { width: colTotW,  align: 'right' });

    let rowY = tableTop + 20;
    lines.forEach((line, i) => {
      const rowH = 20;
      if (i % 2 === 1) doc.rect(margin, rowY, contentW, rowH).fill(LIGHT);
      doc.fontSize(9).font('Helvetica').fillColor(DARK);
      doc.text(line.item_information.name,                   xDesc, rowY + 6, { width: colDescW });
      doc.text(line.invoiced_quantity,                       xQty,  rowY + 6, { width: colQtyW,  align: 'right' });
      doc.text(eur(line.price_details.item_net_price),       xPu,   rowY + 6, { width: colPuW,   align: 'right' });
      doc.text(`${line.vat_information.invoiced_item_vat_rate}%`, xVat, rowY + 6, { width: colVatW, align: 'right' });
      doc.text(eur(line.net_amount),                         xTot,  rowY + 6, { width: colTotW,  align: 'right' });
      rowY += rowH;
    });

    hrule(doc, rowY);
    rowY += 16;

    // ── TOTALS ────────────────────────────────────────────────────────────
    const totalsX = margin + contentW * 0.55;
    const totalsW = contentW * 0.45;

    doc.fontSize(9).font('Helvetica').fillColor(GREY)
      .text('Total HT',  totalsX, rowY, { width: totalsW * 0.6 });
    doc.fillColor(DARK)
      .text(eur(totals.total_without_vat), totalsX, rowY, { width: totalsW, align: 'right' });
    rowY += 16;

    doc.fillColor(GREY)
      .text('TVA', totalsX, rowY, { width: totalsW * 0.6 });
    doc.fillColor(DARK)
      .text(eur(totals.total_vat_amount.value), totalsX, rowY, { width: totalsW, align: 'right' });
    rowY += 8;

    hrule(doc, rowY, DARK);
    rowY += 10;

    doc.fontSize(11).font('Helvetica-Bold').fillColor(DARK)
      .text('Total TTC', totalsX, rowY, { width: totalsW * 0.6 });
    doc.text(eur(totals.amount_due_for_payment), totalsX, rowY, { width: totalsW, align: 'right' });
    rowY += 32;

    // ── LEGAL NOTES ───────────────────────────────────────────────────────
    if (notes.length > 0) {
      hrule(doc, rowY);
      rowY += 12;
      doc.fontSize(7.5).font('Helvetica').fillColor(GREY);
      notes.forEach(n => {
        doc.text(n.note, margin, rowY, { width: contentW });
        rowY += 12;
      });
    }

    doc.end();
  });
}
