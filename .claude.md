# awattsdev Portfolio Site Documentation

## Repository Purpose

This is Andrew Watts' personal portfolio website showcasing web development services and projects.

**Live Site:** https://www.awattsdev.eu
**Tech Stack:** Next.js 15 + Express + next-intl (dual language EN/FR)

---

## Project Structure

```
portfolio-next-express/
├── client/                    # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── [locale]/     # Internationalized routes
│   │   │   │   ├── page.js   # Homepage
│   │   │   │   ├── layout.js # Root layout with metadata
│   │   │   │   ├── cv/       # CV page
│   │   │   │   └── _components/
│   │   │   │       ├── intro/
│   │   │   │       ├── bio.js
│   │   │   │       ├── projects.js
│   │   │   │       ├── services/
│   │   │   │       ├── contact_form.js
│   │   │   │       └── language/LanguageSwitcher.jsx
│   │   │   ├── api/contact/  # Contact form API (unused, Server Actions used instead)
│   │   │   └── sitemap.js
│   │   ├── middleware.js     # next-intl middleware
│   │   └── i18n/
│   ├── messages/
│   │   ├── en.json           # English translations
│   │   └── fr.json           # French translations
│   ├── public/
│   │   ├── images/
│   │   └── robots.txt
│   ├── .env                  # EMAIL_USER, HOST, PASS (NOT COMMITTED!)
│   └── package.json
│
└── server/                   # Express backend (NO LONGER USED)
    └── (legacy Express code for contact form - replaced by Server Actions)
```

---

## Tech Stack

### Frontend
- **Next.js:** 15.5.9 (App Router)
- **React:** 18.2.0
- **TypeScript:** Not currently used (JavaScript)
- **next-intl:** 3.21.1 (internationalization - EN/FR)
- **Radix UI:** 3.1.4 (component library, purple accent theme)
- **Tailwind CSS:** 3.4.14
- **Framer Motion:** 11.11.7 (animations)
- **Google Fonts:** Genos

### Backend
- **nodemailer:** 7.0.12 (contact form via Server Actions)
- **Gmail SMTP** (smtp.gmail.com:587)

### Deployment
- **Hosting:** Vercel
- **Domain:** awattsdev.eu (managed via Cloudflare - **proxy must be enabled**)
- **Analytics:** Google Analytics (G-4BVEYN2HGS)

---

## Environment Variables

Required in production (Vercel) and local `.env`:

```bash
HOST=smtp.gmail.com
EMAIL_USER=awattsdev@gmail.com
PASS=<gmail-app-password>
```

**CRITICAL:** Do NOT use `USER` as a variable name - it's a reserved system variable!

---

## Pages & Routes

### Homepage (`/en` or `/fr`)
- Header with logo + social links (Facebook, Instagram, LinkedIn, GitHub)
- Intro section
- Services section (tabs for "Web Development" vs "Support")
- Bio/About section
- Projects/Portfolio section
- Contact form (footer)

### CV Page (`/en/cv` or `/fr/cv`)
- Animated CV with tabs (Hello, Skills, Experience, Education)
- Uses Framer Motion for transitions
- **ISSUE:** Missing proper metadata (inherits from parent layout)

---

## Known Issues & Fixes

### Google Search Console Issues (as of Jan 2026)

1. **"Indexed, though blocked by robots.txt" (FAILED)**
   - Issue: Google cache problem
   - robots.txt is correct (allows all)
   - Solution: Request re-indexing in GSC

2. **"Duplicate without user-selected canonical"**
   - Issue: CV page `/en/cv` has canonical pointing to `/en` instead of `/en/cv`
   - Cause: CV page inherits metadata from parent layout
   - Solution: Add metadata export to `/client/src/app/[locale]/cv/page.jsx`

3. **"Page with redirect"**
   - Issue: Root `/` redirects to `/en` (307 redirect)
   - Cause: next-intl middleware automatically redirects to default locale
   - Solution: This is expected behavior, but you can:
     * Add `/` to sitemap with x-default hreflang
     * Or create a static homepage and use sub-routing for locales

4. **"Crawled - currently not indexed"**
   - Normal indexing delay, no action needed

---

## Contact Form Implementation

### Architecture (Current - Dec 2024 Update)

✅ **Uses Server Actions** (not API routes, not external Express server)

**Files:**
- `/client/src/app/[locale]/_lib/SubmitContactForm.js` - Server Action handler
- `/client/src/app/[locale]/_lib/nodemailer.js` - Email sending logic
- `/client/src/app/[locale]/_components/contact_form.js` - Form component

**How it works:**
1. User submits form
2. Form calls Server Action with FormData
3. Server Action validates and sends email via nodemailer
4. Uses Gmail SMTP (port 587, TLS)

**Deployment Notes:**
- ✅ Works on Vercel natively
- ✅ Works on Railway **with Cloudflare proxy enabled** (orange cloud in DNS)
- ❌ SMTP blocked on Railway without Cloudflare proxy

See `DEPLOYMENT_GUIDE.md` for full details.

---

## SEO Configuration

### Sitemap (`/sitemap.xml`)
Currently only includes:
- `/en`
- `/fr`

**Missing:**
- `/en/cv`
- `/fr/cv`

### robots.txt (`/public/robots.txt`)
```
User-agent: *
Allow: /

Sitemap: https://www.awattsdev.eu/sitemap.xml
```

### Metadata (from `layout.js`)
- Title: "Web Developer France | Web Design | Next.js & React | awattsdev"
- Description: "Professional web development services in France..."
- Keywords: Bilingual (EN + FR keywords)
- Canonical: Dynamic per locale (`/en` or `/fr`)
- Hreflang: EN, FR, x-default
- OpenGraph tags: Yes
- Twitter Card: Yes

---

## Styling & Design

### Color Scheme
- Background: Gradient from slate-900 → purple-900 → slate-900
- Accent: Purple (Radix UI purple theme)
- Text: White/Slate-100
- Components: Semi-transparent slate-800 with backdrop-blur

### Font
- **Genos** (Google Font, variable weight)
- Light weight for headings (font-light)
- Clean, modern, techy aesthetic

### Components (Radix UI)
- Theme wrapper with purple accent
- Box, Flex, Heading, Text components
- Custom Tailwind for layout

---

## Development Commands

```bash
# Install dependencies (root, client, and server)
npm install

# Run development server (both client and server)
npm run dev

# Run only client
npm run client

# Run only server
npm run server

# Build for production
cd client && npm run build
```

**Development URL:** http://localhost:3000

---

## Deployment Checklist

### Vercel Deployment
1. Set root directory to `client`
2. Add environment variables:
   - `HOST=smtp.gmail.com`
   - `EMAIL_USER=awattsdev@gmail.com`
   - `PASS=<app-password>`
3. Deploy
4. Test contact form
5. Check Google Search Console

### Domain Configuration
- **DNS:** Managed by Cloudflare
- **SSL:** Automatic via Vercel
- **WWW:** Redirects to www.awattsdev.eu

---

## Common Tasks

### Add New Project to Portfolio

1. Add project image to `/client/public/images/`
2. Convert image to WebP for optimization
3. Update `/client/src/app/[locale]/_components/projects.js`
4. Add project description to:
   - `/client/messages/en.json` under `Portfolio`
   - `/client/messages/fr.json` under `Portfolio`
5. Deploy

### Update Contact Form Email

1. Update `EMAIL_USER` in `.env` (local) and Vercel (production)
2. Generate new Gmail app password if needed
3. Update `PASS` in environment variables
4. Test form locally
5. Deploy and test in production

### Fix CV Page Metadata Issue

1. Add metadata export to `/client/src/app/[locale]/cv/page.jsx`:

```javascript
export async function generateMetadata({ params }) {
  const { locale } = await params
  const baseUrl = 'https://www.awattsdev.eu'

  return {
    title: 'Andrew Watts - CV | Web Developer',
    description: 'Full Stack Web Developer CV - Next.js, React, TypeScript specialist. View my skills, experience, and projects.',
    alternates: {
      canonical: `${baseUrl}/${locale}/cv`,
      languages: {
        'en': `${baseUrl}/en/cv`,
        'fr': `${baseUrl}/fr/cv`,
      },
    },
  }
}
```

2. Add `/en/cv` and `/fr/cv` to `sitemap.js`
3. Deploy
4. Request re-indexing in Google Search Console

---

## Troubleshooting

### Contact Form Not Sending
1. Check environment variables are set
2. Verify Gmail app password is correct (16 chars, no spaces)
3. Check Railway/Vercel logs
4. If on Railway: Ensure Cloudflare proxy is **enabled** (orange cloud)

### Google Search Console Errors
1. **"Indexed, though blocked by robots.txt"**
   - Check robots.txt allows page
   - Request re-indexing
   - Wait 2-7 days

2. **"Duplicate without user-selected canonical"**
   - Add canonical tags to all pages
   - Ensure canonical points to correct URL (not parent page)

3. **Pages Not Indexed**
   - Submit sitemap.xml
   - Request indexing manually
   - Check for noindex tags
   - Ensure pages are in sitemap

### Deployment Issues
- **Vercel build fails:** Check root directory is set to `client`
- **Environment variables not working:** Restart deployment after adding vars
- **404 on routes:** Check middleware.js matcher pattern

---

## Links & Resources

- **Live Site:** https://www.awattsdev.eu
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Google Search Console:** https://search.google.com/search-console
- **Google Analytics:** https://analytics.google.com

---

## Project History

- **Initial Build:** Next.js with external Express server for contact form
- **Dec 2024:** Migrated contact form to Server Actions, removed Express dependency
- **Current Status:** Deployed on Vercel, active portfolio site

See `DEPLOYMENT_GUIDE.md` for detailed migration notes.

---

**Last Updated:** January 5, 2026
**Current Version:** Next.js 15.5.9
**Maintainer:** Andrew Watts (awattsdev@gmail.com)
