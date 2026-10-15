export const locales = ['es', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'es'

import type { ContactTime, LeadRole, UnitRange } from '@/lib/leads/lead'

export type FeatureId = 'unified' | 'finance' | 'communication'

type Testimonial = { quote: string; name: string; role: string }

export type Dictionary = {
  brand: { tagline: string; homeLabel: string }
  nav: { platform: string; comparison: string; testimonials: string; login: string; toggleMenu: string; changeLanguage: string }
  hero: {
    title: string
    intro: string
    explore: string
    trusted: string
    cloud: string
    cardImageAlt: string
    cardEyebrow: string
    cardTitle: string
    carouselLabel: string
    slideLabel: string
  }
  platform: {
    eyebrow: string
    title: string
    lead: string
    cta: string
    features: { id: FeatureId; title: string; description: string }[]
  }
  comparison: {
    eyebrow: string
    title: string
    lead: string
    cta: string
    withoutLabel: string
    without: string[]
    withLabel: string
    with: string[]
  }
  trial: {
    cta: string
    ctaShort: string
    note: string
    section: { eyebrow: string; title: string; lead: string; steps: { title: string; description: string }[] }
    form: {
      title: string
      subtitle: string
      close: string
      labels: { fullName: string; email: string; phone: string; condoName: string; city: string; unitsRange: string; role: string; contactTime: string }
      placeholders: { fullName: string; email: string; phone: string; condoName: string; city: string; select: string; contactTime: string }
      phoneHint: string
      unitOptions: Record<UnitRange, string>
      roleOptions: Record<LeadRole, string>
      contactTimeOptions: Record<ContactTime, string>
      consent: string
      submit: string
      submitting: string
      errors: { required: string; invalid: string; email: string; phone: string; tooLong: string; consent: string; server: string }
      success: { title: string; description: string; action: string; redirecting: string }
    }
  }
  testimonials: { eyebrow: string; title: string; rating: string; ratingLabel: string; starsLabel: string; items: Testimonial[] }
  cta: { eyebrow: string; title: string; lead: string; login: string }
  footer: { rights: string; tagline: string }
}

const es: Dictionary = {
  brand: { tagline: 'Property operations', homeLabel: 'EdiFeasy inicio' },
  nav: {
    platform: 'Plataforma',
    comparison: 'Por qué EdiFeasy',
    testimonials: 'Testimonios',
    login: 'Ingresar',
    toggleMenu: 'Abrir o cerrar menú',
    changeLanguage: 'Cambiar idioma',
  },
  hero: {
    title: 'Administra tu condominio con claridad.',
    intro: 'EdiFeasy reúne residentes, finanzas y operación diaria en una plataforma segura y fácil de usar.',
    explore: 'Conoce la plataforma',
    trusted: 'Diseñado para administradores modernos',
    cloud: '100% en la nube',
    cardImageAlt: 'Vista arquitectónica de un condominio moderno',
    cardEyebrow: 'Edificios reales. Operación clara.',
    cardTitle: 'Mira el panorama completo.',
    carouselLabel: 'Carrusel de edificios',
    slideLabel: 'Ver edificio',
  },
  platform: {
    eyebrow: 'Todo conectado',
    title: 'Menos fricción. Más confianza.',
    lead: 'Una vista clara de tu operación le da a tu equipo más tiempo para lo que realmente importa: cuidar a las personas y sus propiedades.',
    cta: 'Descubrir más',
    features: [
      { id: 'unified', title: 'Una sola fuente de verdad', description: 'Todo lo que tu equipo necesita, organizado y accesible desde un solo lugar.' },
      { id: 'finance', title: 'Finanzas más inteligentes', description: 'Controla gastos, compras y recaudos con información confiable.' },
      { id: 'communication', title: 'Comunicación que sí funciona', description: 'Mantén a tus residentes informados, conectados y escuchados.' },
    ],
  },
  comparison: {
    eyebrow: 'Una mejor forma de avanzar',
    title: 'Tus residentes notan la diferencia.',
    lead: 'Reemplaza hojas de cálculo dispersas y conversaciones interminables de WhatsApp por un sistema en el que toda tu comunidad pueda confiar.',
    cta: 'Mira EdiFeasy en acción',
    withoutLabel: 'Sin EdiFeasy',
    without: ['Información dispersa', 'Respuestas lentas', 'Finanzas poco claras', 'Residentes desconectados'],
    withLabel: 'Con EdiFeasy',
    with: ['Una única fuente de verdad', 'Servicio ágil y transparente', 'Control en tiempo real', 'Una comunidad conectada'],
  },
  trial: {
    cta: 'Prueba gratis 7 días',
    ctaShort: 'Prueba gratis',
    note: 'Sin compromiso. Un asesor te ayuda a empezar.',
    section: {
      eyebrow: 'Prueba gratis',
      title: 'Pruébalo 7 días con tu propio condominio.',
      lead: 'Crea tu cuenta, carga tu información y explora todas las funciones. Un asesor de EdiFeasy te contactará para ayudarte con la configuración.',
      steps: [
        { title: 'Cuéntanos de tu condominio', description: 'Déjanos tus datos de contacto y algunos detalles de tu propiedad.' },
        { title: 'Crea tu cuenta', description: 'Te llevamos directo al registro en la plataforma EdiFeasy.' },
        { title: 'Administra 7 días gratis', description: 'Usa todas las funciones con acompañamiento de nuestro equipo.' },
      ],
    },
    form: {
      title: 'Empieza tu prueba gratis de 7 días',
      subtitle: 'Cuéntanos sobre tu condominio. Después te llevamos a crear tu cuenta.',
      close: 'Cerrar',
      labels: {
        fullName: 'Nombre completo',
        email: 'Correo electrónico',
        phone: 'Teléfono / WhatsApp',
        condoName: 'Nombre del condominio',
        city: 'Ciudad',
        unitsRange: 'Número de unidades',
        role: 'Tu rol',
        contactTime: 'Mejor horario para llamarte (opcional)',
      },
      placeholders: {
        fullName: 'Ej. Mariana Torres',
        email: 'nombre@correo.com',
        phone: '+57 300 123 4567',
        condoName: 'Ej. Conjunto Residencial Los Pinos',
        city: 'Ej. Bogotá',
        select: 'Selecciona una opción',
        contactTime: 'Cualquier horario',
      },
      phoneHint: 'Incluye el indicativo del país si no estás en Colombia.',
      unitOptions: { '1-20': '1 a 20 unidades', '21-50': '21 a 50 unidades', '51-150': '51 a 150 unidades', '151-500': '151 a 500 unidades', '500+': 'Más de 500 unidades' },
      roleOptions: {
        administrator: 'Administrador(a)',
        board: 'Miembro del consejo',
        management_company: 'Empresa administradora',
        resident: 'Residente / propietario',
        other: 'Otro',
      },
      contactTimeOptions: { morning: 'Mañana (8 a. m. – 12 m.)', afternoon: 'Tarde (12 m. – 5 p. m.)', evening: 'Noche (5 p. m. – 8 p. m.)' },
      consent: 'Autorizo a EdiFeasy a tratar mis datos personales para contactarme sobre la prueba y el servicio, conforme a la Ley 1581 de 2012.',
      submit: 'Continuar al registro',
      submitting: 'Guardando…',
      errors: {
        required: 'Este campo es obligatorio.',
        invalid: 'Revisa este campo.',
        email: 'Ingresa un correo válido.',
        phone: 'Ingresa un teléfono válido (7 a 15 dígitos).',
        tooLong: 'El texto es demasiado largo.',
        consent: 'Necesitamos tu autorización para contactarte.',
        server: 'No pudimos guardar tus datos en este momento. Puedes continuar al registro de todas formas.',
      },
      success: {
        title: '¡Listo! Ya casi empiezas.',
        description: 'Recibimos tus datos y un asesor te contactará pronto. Ahora crea tu cuenta para activar tus 7 días gratis.',
        action: 'Crear mi cuenta',
        redirecting: 'Te estamos llevando al registro…',
      },
    },
  },
  testimonials: {
    eyebrow: 'La confianza se construye juntos',
    title: 'La diferencia se siente todos los días.',
    rating: '4.9',
    ratingLabel: 'Calificación de clientes',
    starsLabel: '5 de 5 estrellas',
    items: [
      { quote: '“EdiFeasy le dio a nuestro equipo el control y la visibilidad que necesitábamos. Todo se siente más profesional.”', name: 'Mariana Torres', role: 'Administradora, Bogotá' },
      { quote: '“Nuestros residentes por fin tienen un canal claro para solicitudes y novedades. Mejoramos de inmediato.”', name: 'Carlos Méndez', role: 'Presidente del consejo, Medellín' },
      { quote: '“La vista financiera es simple, transparente y muy fácil de explicar en cada asamblea.”', name: 'Laura Gómez', role: 'Administradora, Cali' },
    ],
  },
  cta: { eyebrow: 'EdiFeasy', title: '¿Listo para administrar mejor?', lead: 'Empieza hoy tu prueba gratis de 7 días.', login: '¿Ya tienes cuenta? Ingresa' },
  footer: { rights: 'Todos los derechos reservados.', tagline: 'La operación de tu propiedad, más clara.' },
}

const en: Dictionary = {
  brand: { tagline: 'Property operations', homeLabel: 'EdiFeasy home' },
  nav: {
    platform: 'Platform',
    comparison: 'Why EdiFeasy',
    testimonials: 'Testimonials',
    login: 'Log in',
    toggleMenu: 'Toggle menu',
    changeLanguage: 'Change language',
  },
  hero: {
    title: 'Run your condominium with clarity.',
    intro: 'EdiFeasy brings residents, finances and day-to-day operations together in one secure platform.',
    explore: 'Explore the platform',
    trusted: 'Built for modern property managers',
    cloud: '100% cloud-based',
    cardImageAlt: 'Architectural view of a modern condominium',
    cardEyebrow: 'Real buildings. Clear operations.',
    cardTitle: 'See the whole picture.',
    carouselLabel: 'Building carousel',
    slideLabel: 'View building',
  },
  platform: {
    eyebrow: 'Everything connected',
    title: 'Less friction. More confidence.',
    lead: 'A clear view of your operation gives your team more time for what really matters: taking care of people and properties.',
    cta: 'Discover more',
    features: [
      { id: 'unified', title: 'One source of truth', description: 'Everything your team needs, organized and accessible from one place.' },
      { id: 'finance', title: 'Smarter finances', description: 'Track expenses, purchases and collections with confidence.' },
      { id: 'communication', title: 'Communication that works', description: 'Keep residents informed, engaged and heard.' },
    ],
  },
  comparison: {
    eyebrow: 'A better way forward',
    title: 'Your residents notice the difference.',
    lead: 'Replace scattered spreadsheets and endless WhatsApp threads with a system your whole community can trust.',
    cta: 'See EdiFeasy in action',
    withoutLabel: 'Without EdiFeasy',
    without: ['Scattered information', 'Slow response times', 'Unclear finances', 'Residents left out'],
    withLabel: 'With EdiFeasy',
    with: ['A single source of truth', 'Faster, transparent service', 'Real-time control', 'A connected community'],
  },
  trial: {
    cta: 'Start your 7-day free trial',
    ctaShort: 'Free trial',
    note: 'No commitment. An advisor helps you get started.',
    section: {
      eyebrow: 'Free trial',
      title: 'Try it for 7 days with your own property.',
      lead: 'Create your account, load your data and explore every feature. An EdiFeasy advisor will reach out to help you with the setup.',
      steps: [
        { title: 'Tell us about your property', description: 'Leave your contact details and a few facts about your property.' },
        { title: 'Create your account', description: 'We take you straight to sign-up on the EdiFeasy platform.' },
        { title: 'Run it free for 7 days', description: 'Use every feature with our team by your side.' },
      ],
    },
    form: {
      title: 'Start your 7-day free trial',
      subtitle: 'Tell us about your property. Then we will take you to create your account.',
      close: 'Close',
      labels: {
        fullName: 'Full name',
        email: 'Email',
        phone: 'Phone / WhatsApp',
        condoName: 'Property name',
        city: 'City',
        unitsRange: 'Number of units',
        role: 'Your role',
        contactTime: 'Best time to call you (optional)',
      },
      placeholders: {
        fullName: 'e.g. Mariana Torres',
        email: 'name@email.com',
        phone: '+57 300 123 4567',
        condoName: 'e.g. Los Pinos Residences',
        city: 'e.g. Bogotá',
        select: 'Select an option',
        contactTime: 'Any time',
      },
      phoneHint: 'Include your country code if you are outside Colombia.',
      unitOptions: { '1-20': '1 to 20 units', '21-50': '21 to 50 units', '51-150': '51 to 150 units', '151-500': '151 to 500 units', '500+': 'More than 500 units' },
      roleOptions: {
        administrator: 'Property manager',
        board: 'Board member',
        management_company: 'Management company',
        resident: 'Resident / owner',
        other: 'Other',
      },
      contactTimeOptions: { morning: 'Morning (8 a.m. – 12 p.m.)', afternoon: 'Afternoon (12 – 5 p.m.)', evening: 'Evening (5 – 8 p.m.)' },
      consent: 'I authorize EdiFeasy to process my personal data to contact me about the trial and the service, under Colombian Law 1581 of 2012.',
      submit: 'Continue to sign-up',
      submitting: 'Saving…',
      errors: {
        required: 'This field is required.',
        invalid: 'Please check this field.',
        email: 'Enter a valid email.',
        phone: 'Enter a valid phone number (7 to 15 digits).',
        tooLong: 'This text is too long.',
        consent: 'We need your permission to contact you.',
        server: 'We could not save your details right now. You can still continue to sign-up.',
      },
      success: {
        title: 'All set! You are almost there.',
        description: 'We received your details and an advisor will contact you soon. Now create your account to activate your 7 free days.',
        action: 'Create my account',
        redirecting: 'Taking you to sign-up…',
      },
    },
  },
  testimonials: {
    eyebrow: 'Trusted by communities',
    title: 'The difference is felt every day.',
    rating: '4.9',
    ratingLabel: 'Customer rating',
    starsLabel: '5 out of 5 stars',
    items: [
      { quote: '“EdiFeasy gave our team the control and visibility we were missing. Everything feels more professional now.”', name: 'Mariana Torres', role: 'Property manager, Bogotá' },
      { quote: '“Our residents finally have a clear channel for requests and updates. Response times improved immediately.”', name: 'Carlos Méndez', role: 'Board president, Medellín' },
      { quote: '“The financial view is simple, transparent and easy to explain at every assembly.”', name: 'Laura Gómez', role: 'Administrator, Cali' },
    ],
  },
  cta: { eyebrow: 'EdiFeasy', title: 'Ready to run a better property?', lead: 'Start your 7-day free trial today.', login: 'Already have an account? Log in' },
  footer: { rights: 'All rights reserved.', tagline: 'Property operations, made clear.' },
}

export const dictionaries: Record<Locale, Dictionary> = { es, en }
