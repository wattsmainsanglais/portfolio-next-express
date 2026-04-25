import { cookies } from 'next/headers';
import nodemailer from 'nodemailer';
import { getSellerToken, getInvoice } from '../../../../factures/lib/superpdp';
import { generateInvoicePDF } from '../../../../factures/lib/invoice-pdf';

export async function POST(
  request: Request,
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

  let to: string;
  try {
    const body = await request.json();
    to = (body.to ?? '').trim();
    if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 });
    }
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  try {
    const token = await getSellerToken();
    const invoice = await getInvoice(invoiceId, token);

    if (!invoice.en_invoice) {
      return Response.json({ error: 'Invoice data not available' }, { status: 404 });
    }

    const pdfBuffer = await generateInvoicePDF(invoice.en_invoice, process.env.SELLER_LOGO_URL);
    const number = invoice.en_invoice.number ?? `invoice-${invoiceId}`;
    const sellerName = process.env.SELLER_NAME ?? 'awattsdev';

    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: `Invoice ${number} from ${sellerName}`,
      text: `Please find attached invoice ${number} from ${sellerName}.`,
      attachments: [
        {
          filename: `${number}.pdf`,
          content: Buffer.from(pdfBuffer),
          contentType: 'application/pdf',
        },
      ],
    });

    return Response.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
