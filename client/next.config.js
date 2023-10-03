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

     async headers() {
        return [
            {
                // matching all API routes
                source: "/api/express",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "https://server-production-7c47.up.railway.app/" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
     }  
};

module.exports = nextConfig
