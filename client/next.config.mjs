/** @type {import('next').NextConfig} */


import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.js');

const nextConfig = {
  serverExternalPackages: ['pdfkit'],
};

export default withNextIntl(nextConfig)
