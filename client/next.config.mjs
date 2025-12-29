/** @type {import('next').NextConfig} */


import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.js');

const nextConfig = {
    // No custom config needed - using built-in Next.js API routes
};

export default withNextIntl(nextConfig)
