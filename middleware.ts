import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  // Optional: Add public routes that don't require authentication
  publicRoutes: [
    '/',
    '/api/webhook(.*)', // Example webhook route
    '/sign-in(.*)',
    '/sign-up(.*)',
  ],
  // Optional: Customize ignored routes
  ignoredRoutes: [
    '/favicon.ico',
    '/_next/static(.*)',
    '/_next/image(.*)',
    '/assets(.*)',
  ]
});

export const config = {
  matcher: [
    // Protect all routes except:
    // 1. Next.js internals (_next)
    // 2. Static files with extensions
    // 3. Public routes defined above
    '/((?!_next|static|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf)$).*)',
    // Always protect API/trpc routes unless explicitly public
    '/(api|trpc)(.*)'
  ],
};
