/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'v2.exercisedb.io'
            }
        ]
    }
};

export default nextConfig;
