import { cookies } from 'next/headers';
import { getSellerToken, getInvoice } from '../../../../factures/lib/superpdp';
import { generateInvoicePDF } from '../../../../factures/lib/invoice-pdf';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const session = cookieStore.get('factures_session');
  if (session?.value !== process.env.FACTURES_SESSION_TOKEN) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { id } = await params;
  const invoiceId = parseInt(id, 10);
  if (isNaN(invoiceId)) {
    return new Response('Invalid invoice ID', { status: 400 });
  }

  try {
    const token = await getSellerToken();
    const invoice = await getInvoice(invoiceId, token);

    if (!invoice.en_invoice) {
      return new Response('Invoice data not available', { status: 404 });
    }

    const pdfBuffer = await generateInvoicePDF(invoice.en_invoice, process.env.SELLER_LOGO_URL);
    const number = invoice.en_invoice.number ?? `invoice-${invoiceId}`;

    return new Response(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${number}.pdf"`,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(message, { status: 500 });
  }
}
