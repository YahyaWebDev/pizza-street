// clerk.config.ts
import type { NextConfig } from "next";

export default {
  domain: 'pizza-street.vercel.app', // Must match exactly
  signInUrl: '/sign-in',
  // Critical for development:
  dangerouslyDisableSecureWhileTesting: true,
  // Temporary bypass for vercel.app domains:
  skipDomainCheck: true
};
export default clerkConfig;

