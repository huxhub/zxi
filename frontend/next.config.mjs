/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://salesiq.zohopublic.in https://*.zoho.in https://*.zohopublic.in https://*.zohocdn.com",
      "style-src 'self' 'unsafe-inline' https://*.zohocdn.com https://*.zoho.in https://*.zohopublic.in",
      "img-src 'self' data: blob: https://lh3.googleusercontent.com",
      "font-src 'self' data: https://*.zohocdn.com https://*.zoho.in https://*.zohopublic.in",
      "media-src 'self' blob:",
      "connect-src 'self' https://*.zoho.in https://*.zohopublic.in https://*.zohocdn.com wss://*.zoho.in wss://*.zohopublic.in",
      "frame-src https://www.google.com https://*.zoho.in https://*.zohopublic.in",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      'upgrade-insecure-requests',
    ].join('; '),
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), geolocation=(), microphone=(), payment=(), usb=()',
  },
];

const nextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
