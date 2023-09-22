import { withContentlayer } from 'next-contentlayer'

import './src/env/env.mjs'

// eslint-disable-next-line jsdoc/check-tag-names
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },

  typescript: {
    ignoreBuildErrors: process.env.CI === 'true'
  },

  eslint: {
    ignoreDuringBuilds: process.env.CI === 'true'
  },

  images: {
    domains: ['avatars.githubusercontent.com']
  },

  webpack: (config) => {
    config.infrastructureLogging = {
      level: 'error'
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config
  },

  // eslint-disable-next-line @typescript-eslint/require-await
  async redirects() {
    return [
      {
        source: '/pc-specs',
        destination: '/uses',
        permanent: true
      }
    ]
  },

  // eslint-disable-next-line @typescript-eslint/require-await
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ]
  }
}

export default withContentlayer(nextConfig)
