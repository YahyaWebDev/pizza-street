// clerk.config.ts
import type { NextConfig } from "next";

export default {
  domain: 'pizza-street.vercel.app', // Make sure this exactly matches your Vercel URL
  isSatellite: true,
  proxyUrl: '/api/clerk', // Add this proxy route
  signInUrl: '/sign-in',
  // Only for local development:
  // dangerouslyDisableSecureWhileTesting: process.env.NODE_ENV === 'development'
};
export default clerkConfig;

