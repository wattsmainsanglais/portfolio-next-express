/** @type {import('next').NextConfig} */
const nextConfig = {

    async rewrites() {
        return [
            // rewritting API requests to Express server
            {
                source: "/api/express",
                destination: "http://localhost:5000/api/express"
            },
        ];
    },
};

module.exports = nextConfig
