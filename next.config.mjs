/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://api-webapp.vercel.app/:path*', 
        },
      ]
    },
    reactStrictMode: true, 
  }
  
  export default nextConfig;
  