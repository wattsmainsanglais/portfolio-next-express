const ENDPOINT = 'https://api.superpdp.tech';
const BQ_ID = '019daef0-4dcf-7b01-bbe0-4819e19cc2b8';
const BQ_SECRET = process.env.BQ_SECRET;

if (!BQ_SECRET) {
  console.error('Usage: BQ_SECRET=<secret> node check-inbox.mjs');
  process.exit(1);
}

const tokenResp = await fetch(`${ENDPOINT}/oauth2/token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: BQ_ID,
    client_secret: BQ_SECRET,
  }),
});
const { access_token } = await tokenResp.json();
console.log('Token:', access_token);

const url = `${ENDPOINT}/v1.beta/invoices?direction=in&order=desc&expand[]=en_invoice&expand[]=en_invoice.seller`;
console.log('Fetching:', url);
const resp = await fetch(url, { headers: { Authorization: `Bearer ${access_token}` } });
console.log('Status:', resp.status);
const body = await resp.json();
console.log(JSON.stringify(body, null, 2));
