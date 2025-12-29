# Portfolio Contact Form - Deployment Guide

## Summary of Changes Made

### What We Fixed
1. **Moved email functionality from Express server to Next.js API routes**
   - Created `/client/src/app/api/contact/route.js`
   - Created `/client/src/app/[locale]/_lib/nodemailer.js`
   - Matches architecture of popupcreche (which works)

2. **Fixed Multiple Issues:**
   - Changed `bodyParser.text()` → `bodyParser.json()` in server
   - Changed SMTP port from 465 → 587 (Railway compatibility)
   - Fixed `USER` → `EMAIL_USER` (USER is a reserved env variable!)
   - Excluded `/api` routes from locale middleware

3. **Contact form now calls `/api/contact`** (Next.js API route, not external server)

## Current Status
✅ Works locally with Gmail SMTP
❌ Times out on Railway (SMTP blocked on new deployments)
✅ popupcreche works on Railway (8 months old, grandfathered in)

## Deployment to Vercel (RECOMMENDED)

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
- `client/src/app/api/contact/route.js` - API route handler (NEW)
- `client/src/app/[locale]/_lib/nodemailer.js` - Email sending logic (NEW)
- `client/src/app/[locale]/_components/contact_form.js` - Updated to call `/api/contact`
- `client/src/middleware.js` - Excluded `/api` from locale routing
- `client/next.config.mjs` - Removed old Express rewrites
- `client/.env` - Contains EMAIL_USER, HOST, PASS (DO NOT COMMIT!)
- `client/package.json` - Added nodemailer dependency

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

### Production Issues
- **SMTP Timeout on Railway:** Known issue, deploy to Vercel instead
- **Auth errors:** Check app password is correct (no spaces)
- **404 errors:** Make sure `/api` is excluded from middleware matcher

## Alternative: Use Resend (HTTP API)
If you prefer an HTTP API instead of SMTP:
1. Sign up at https://resend.com (free tier)
2. Install: `npm install resend`
3. Update `/client/src/app/[locale]/_lib/nodemailer.js` to use Resend SDK
4. No SMTP port blocking issues ever

## Next Steps
1. Deploy to Vercel (follow steps above)
2. Test contact form in production
3. Update DNS if needed to point to Vercel
4. Remove Railway server service (optional)

## Contact Details
- Emails will be received at: awattsdev@gmail.com
- Contact form location: https://www.awattsdev.eu (footer)
- Supports English and French locales

---
**Created:** 2025-12-29
**Status:** Ready to deploy to Vercel
