/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://api-webapp.vercel.app/:path*', // เปลี่ยน URL ให้ตรงกับ API ของคุณ
        },
      ]
    },
    reactStrictMode: true, // เปิด React Strict Mode
  }
  
  export default nextConfig;
  