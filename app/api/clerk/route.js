import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const runtime = 'edge';
export const preferredRegion = ['auto'];