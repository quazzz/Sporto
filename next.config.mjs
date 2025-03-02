
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
    eslint: {
        
        ignoreDuringBuilds: true,
      },
    
};

export default nextConfig;
