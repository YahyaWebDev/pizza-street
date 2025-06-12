// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware(async (auth, req) => {
  // Public routes - no authentication required
  const publicPaths = ['/', '/sign-in(.*)', '/api/webhook'];
  
  if (publicPaths.some(path => new RegExp(path).test(req.nextUrl.pathname))) {
    return NextResponse.next();
  }

  // Protect all other routes
  return auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
