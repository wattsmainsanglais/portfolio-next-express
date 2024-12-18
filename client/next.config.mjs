/** @type {import('next').NextConfig} */


import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {

   
     async headers() {
        return [
            {
                // matching all API routes
                source: "/api/express/contact",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
     }, 
     
    async rewrites() {
        return [
            // rewritting API requests to Express server
            {
                source: "/api/express",
                destination: "https://server-production-7c47.up.railway.app/api/express"
            },
        ];
    }

};

export default withNextIntl(nextConfig)
