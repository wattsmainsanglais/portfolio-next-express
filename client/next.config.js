/** @type {import('next').NextConfig} */
const nextConfig = {

    async rewrites() {
        return [
            // rewritting API requests to Express server
            {
                source: "/api/express",
                destination: "https://server-production-7c47.up.railway.app/api/express"
            },
        ];
    },
};

module.exports = nextConfig
