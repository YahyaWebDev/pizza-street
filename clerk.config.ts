// clerk.config.ts
import type { NextConfig } from "next";

export default {
  domain: 'pizza-street.vercel.app', 
  isSatellite: true,
  proxyUrl: '/api/clerk', 
  signInUrl: '/sign-in',
};
export default clerkConfig;

