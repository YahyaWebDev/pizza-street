// clerk.config.ts
export default {
  domain: process.env.NODE_ENV === 'production'
    ? 'pizza-street.vercel.app'
    : 'localhost',
  signInUrl: '/sign-in',
  isSatellite: true,
  proxyUrl: '/api/clerk',
  // For development only:
  dangerouslyDisableSecureWhileTesting: process.env.NODE_ENV === 'development'
};
