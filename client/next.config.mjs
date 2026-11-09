/** @type {import('next').NextConfig} */


import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.js');

const nextConfig = {
    // French-first: one permanent hop from "/" (the middleware would send a temporary 307)
    async redirects() {
        return [
            { source: '/', destination: '/fr', permanent: true },
        ]
    },
};

export default withNextIntl(nextConfig)
