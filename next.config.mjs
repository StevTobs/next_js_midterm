/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3456/test/:path*', // Proxy to Backend
        },
      ];
    },
  };
  
  export default nextConfig;
  