// clerk.config.ts
export default {
  domain: 'pizza-street.vercel.app',
  signInUrl: '/sign-in',
  isSatellite: true,
  proxyUrl: '/api/clerk',
  // DEVELOPMENT ONLY:
  dangerouslyDisableSecureWhileTesting: true,
  skipDomainCheck: true
};
