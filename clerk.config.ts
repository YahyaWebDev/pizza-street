// clerk.config.ts
import type { NextConfig } from "next";

const clerkConfig = {
  domain: "pizza-street.vercel.app",
  signInUrl: "/sign-in",
  // Optional: Add other Clerk configurations here
  // dangerouslyDisableSecureWhileTesting: true // Only for local development
};

export default clerkConfig;
