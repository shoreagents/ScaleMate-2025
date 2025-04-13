/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_ENABLE_TEST_DASHBOARD: 'true'
  },
  compiler: {
    styledComponents: true
  },
  experimental: {
    serverActions: {
      enabled: true
    }
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