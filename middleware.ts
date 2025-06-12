// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware((auth, req) => {
  // 1. Define public routes
  const publicPaths = [
    '/',
    '/sign-in(.*)',
    '/api/webhook(.*)',
    '/favicon.ico',
    '/_next/static(.*)'
  ];

  // 2. Check if current route is public
  const isPublic = publicPaths.some(path => 
    new RegExp(`^${path}$`).test(req.nextUrl.pathname)
  );

  // 3. Handle routing
  if (isPublic) {
    return NextResponse.next();
  }

  // 4. Protect all other routes
  return auth().protect();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
