/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'firebasestorage.googleapis.com',
              port: '',
            },
            {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com',
              port: '',
            },
            {
              protocol: 'https',
              hostname: 'fluffy-gaufre-12f23b.netlify.app',
              port: '',
            }
        ],
      },
}
module.exports = nextConfig
