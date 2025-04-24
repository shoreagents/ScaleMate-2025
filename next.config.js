/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_ENABLE_TEST_DASHBOARD: 'true',
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  },
  compiler: {
    styledComponents: true
  },
  experimental: {
    serverActions: {
      enabled: true
    }
  },
  images: {
    domains: ['storage.googleapis.com'],
  },
  // Configure port via environment variable instead of server option
  async rewrites() {
    return [
      {
        source: '/test-dashboard',
        destination: '/test-dashboard/index',
      },
    ];
  }
};

module.exports = nextConfig; 