// clerk.config.ts
import type { ClerkConfig } from "@clerk/nextjs";

const clerkConfig: ClerkConfig = {
  domain: "pizza-street.vercel.app",
  signInUrl: "/sign-in",
};

export default clerkConfig;
