/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DATABASE_URL: process.env.DATABASE_URL
    },
    webpack(config) {
        config.resolve.fallback = {
    
          // if you miss it, all the other options in fallback, specified
          // by next.js will be dropped.
          ...config.resolve.fallback,  
    
          fs: false, // the solution
        };
        
        return config;
      },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'xlspuchsnlqfkcufcvvz.supabase.co',
          },
        ],
      },
}

module.exports = nextConfig
