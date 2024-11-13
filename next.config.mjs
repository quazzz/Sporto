/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'v2.exercisedb.io'
            },
            {
                protocol: 'https',
                hostname: 'similarpng.com'
            }
        ]
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    
};

export default nextConfig;
