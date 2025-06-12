// middleware.ts
import { authMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: ['/', '/sign-in(.*)', '/api/webhook'],
  debug: process.env.NODE_ENV === 'development'
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
