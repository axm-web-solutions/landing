export const siteConfig = {
  name: 'EdiFeasy',
  appUrl: 'https://edifeasy.ventofast.com/dashboard',
  signupUrl: 'https://edifeasy.ventofast.com/register',
  trialDays: 7,
  heroImages: ['/edifeasy-building.png', '/edifeasy-hero.png'],
  heroRotationMs: 5000,
} as const

export const sectionIds = {
  home: 'inicio',
  platform: 'plataforma',
  comparison: 'comparativa',
  trial: 'prueba-gratis',
  testimonials: 'testimonios',
} as const
