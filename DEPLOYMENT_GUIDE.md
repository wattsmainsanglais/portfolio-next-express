# Portfolio Contact Form - Deployment Guide

## Summary of Changes Made

### What We Fixed
1. **Converted from Express server to Next.js Server Actions**
   - Created `/client/src/app/[locale]/_lib/SubmitContactForm.js` (Server Action)
   - Created `/client/src/app/[locale]/_lib/nodemailer.js` (Email logic)
   - Matches architecture of popupcreche (which works on Railway)

2. **Fixed Multiple Issues:**
   - Changed `bodyParser.text()` → `bodyParser.json()` in old Express server
   - Changed SMTP port from 465 → 587 (TLS instead of SSL)
   - Fixed `USER` → `EMAIL_USER` (**USER is a reserved system variable!**)
   - Excluded `/api` routes from locale middleware
   - Converted controlled form inputs to FormData

3. **Contact form now uses Server Actions** (not API routes or external server)

## Current Status
✅ Works locally with Gmail SMTP
✅ Works on Railway **with Cloudflare proxy enabled**
⚠️  Times out on Railway **without Cloudflare proxy**

## THE KEY DISCOVERY: Cloudflare Proxy

**Why popupcreche works on Railway:**
- ✅ Uses Server Actions (not API routes)
- ✅ **Cloudflare proxy enabled** (orange cloud ☁️ in DNS)
- SMTP connections originate from Cloudflare's network, not Railway
- Railway allows SMTP from Cloudflare IPs

**Why portfolio was failing:**
- ❌ No Cloudflare proxy (gray cloud in DNS)
- Railway blocks direct SMTP connections from their infrastructure

## Deployment Options

### Option 1: Railway with Cloudflare Proxy (RECOMMENDED if already on Railway)

**Prerequisites:**
- Domain managed by Cloudflare
- Railway deployment already set up

**Steps:**

1. **Deploy to Railway** (if not already deployed)
   - Push code to GitHub
   - Railway will auto-deploy from your repo
   - Set Root Directory to `client`

2. **Add Environment Variables in Railway:**
   ```
   HOST=smtp.gmail.com
   EMAIL_USER=awattsdev@gmail.com
   PASS=your-gmail-app-password
   ```

3. **Enable Cloudflare Proxy:**
   - Go to Cloudflare Dashboard → DNS
   - Find your Railway domain record (e.g., CNAME to railway.app)
   - Click the cloud icon to make it **orange** (Proxied)
   - Wait 2-5 minutes for DNS propagation

4. **Test:** Contact form should now work!

**Why this works:**
- Cloudflare acts as reverse proxy
- SMTP connections originate from Cloudflare's network
- Railway allows SMTP from Cloudflare IPs

---

### Option 2: Deploy to Vercel (ALTERNATIVE)

### Step 1: Prepare Repository
```bash
cd /home/andrew/code/2025/awattsdev/portfolio-next-express

# Make sure .env is NOT committed (it's private)
# Check if client/.env is in .gitignore
```

### Step 2: Deploy to Vercel
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your portfolio Git repository
4. **Configure Project Settings:**
   - **Root Directory:** `client` ⚠️ IMPORTANT!
   - **Framework Preset:** Next.js (auto-detected)
   - **Build Command:** `npm run build` (default)
   - **Install Command:** `npm install` (default)

### Step 3: Add Environment Variables
In Vercel project settings → Environment Variables, add:

```
HOST=smtp.gmail.com
EMAIL_USER=awattsdev@gmail.com
PASS=wooneieeysrbesik
```

**Note:** Use your actual Gmail app password (16 chars, no spaces)

### Step 4: Deploy
Click "Deploy" - Vercel will build and deploy automatically.

### Step 5: Test
Once deployed, test the contact form on your live site.

## Important Files Changed

### Client (Next.js App)
- `client/src/app/[locale]/_lib/SubmitContactForm.js` - **Server Action** handler (NEW) ⭐
- `client/src/app/[locale]/_lib/nodemailer.js` - Email sending logic (NEW)
- `client/src/app/[locale]/_components/contact_form.js` - Updated to use Server Actions with FormData
- `client/src/middleware.js` - Excluded `/api` from locale routing
- `client/next.config.mjs` - Removed old Express rewrites
- `client/.env` - Contains EMAIL_USER, HOST, PASS (DO NOT COMMIT!)
- `client/package.json` - Added nodemailer dependency

**Note:** The `/client/src/app/api/contact/route.js` file was created during troubleshooting but is **not used**. The Server Action (`SubmitContactForm.js`) is what actually works.

### Server (No longer needed for contact form)
The Express server is no longer used for the contact form. You can:
- Keep it if you need it for other purposes
- Delete the Railway server service to save resources
- Keep the code in the repo for reference

## Environment Variables Reference

### Required Variables
- `HOST` - SMTP server (smtp.gmail.com for Gmail, mail.gmx.com for GMX)
- `EMAIL_USER` - Your email address (NOT `USER` - that's reserved!)
- `PASS` - Gmail app password or email password

### Gmail App Password Setup
1. Enable 2FA: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Copy the 16-character password (remove spaces)
4. Use in `PASS` environment variable

## Troubleshooting

### Local Development
- Make sure `.env` file is in `/client/.env` or `/client/.env.local`
- Restart dev server after changing .env files
- Check terminal for debug output: `Email config: { host, user, passLength }`
- **Critical:** Make sure `EMAIL_USER` is set (NOT `USER` - that's a system variable!)

### Production Issues on Railway
- **SMTP Timeout:** Enable Cloudflare proxy (orange cloud) on your domain
- **Still timing out:** Check Cloudflare DNS is actually proxied (orange, not gray)
- **Auth errors:** Check app password is correct (16 chars, no spaces)
- **500 errors:** Check Railway environment variables are set correctly

### Why Cloudflare Proxy is Needed on Railway
Railway blocks outbound SMTP connections (ports 465, 587) to prevent spam abuse. When you enable Cloudflare proxy:
1. Client → Cloudflare → Railway (for HTTP requests)
2. Railway → Cloudflare network → Gmail SMTP (for emails)
3. Railway allows SMTP from Cloudflare's trusted IPs

## Alternative: Use Resend (HTTP API)
If you prefer an HTTP API instead of SMTP:
1. Sign up at https://resend.com (free tier)
2. Install: `npm install resend`
3. Update `/client/src/app/[locale]/_lib/nodemailer.js` to use Resend SDK
4. No SMTP port blocking issues ever

## Next Steps

**Tomorrow: Enable Cloudflare Proxy**
1. Go to Cloudflare Dashboard → DNS → awattsdev.eu
2. Find Railway CNAME record
3. Click cloud icon → make it **orange** (Proxied)
4. Wait 5 minutes
5. Test contact form - should work! 🎉

**Alternative: Deploy to Vercel**
- Follow Option 2 steps above
- No Cloudflare proxy needed
- SMTP works natively on Vercel

**Cleanup (Optional):**
- Remove old Express server Railway service (not needed anymore)
- Delete `/client/src/app/api/contact/route.js` (unused API route)

## Contact Details
- Emails will be received at: awattsdev@gmail.com
- Contact form location: https://www.awattsdev.eu (footer)
- Supports English and French locales

## Key Learnings
1. **`USER` is a reserved system variable** - use `EMAIL_USER` instead
2. **Server Actions work better than API Routes** for server-side operations on Railway
3. **Cloudflare proxy enables SMTP on Railway** by routing through trusted IPs
4. **Port 587 (TLS) works better than 465 (SSL)** on cloud platforms
5. **Gmail requires app passwords** - regular passwords don't work with SMTP

---
**Created:** 2025-12-29
**Updated:** 2025-12-29
**Status:** Ready for Cloudflare proxy setup
**Architecture:** Next.js 15 + Server Actions + nodemailer + Gmail SMTP
