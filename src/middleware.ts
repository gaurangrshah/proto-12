export { default } from 'next-auth/middleware';

export const config = {
  // matcher: ["/profile"],
  matcher: ['/((?!register|api|login|policies|editor|sink|posts|blog).*)'], // whitelisted routes
};
