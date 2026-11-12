import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@zensteps.in'
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword || adminPassword.length < 12) {
    throw new Error('Set ADMIN_PASSWORD to a value with at least 12 characters before seeding.')
  }
  const hashedPassword = await bcrypt.hash(adminPassword, 12)
  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Zen Admin',
      role: 'superadmin',
    },
  })

  // Seed Hero Slides
  await prisma.heroSlide.createMany({
    data: [
      {
        title: 'Walk Your Way to Wellness',
        subtitle: 'Discover the ancient art of therapeutic grounding through our curated stone-path experiences across India.',
        mediaUrl: '/images/hero-1.jpg',
        mediaType: 'image',
        ctaText: 'Explore Our Therapies',
        ctaLink: '/services',
        sortOrder: 1,
      },
      {
        title: 'Every Step Heals',
        subtitle: 'From reflexology walkways to barefoot grounding sessions — reconnect with the earth beneath your feet.',
        mediaUrl: '/images/hero-2.jpg',
        mediaType: 'image',
        ctaText: 'Find a Centre Near You',
        ctaLink: '/locations',
        sortOrder: 2,
      },
    ],
    skipDuplicates: true,
  })

  // Seed Services
  const services = [
    {
      title: 'Stone Path Walk',
      slug: 'stone-path-reflexology',
      shortDesc: 'A guided walk over natural textures, with room to find a pace and pressure that feel comfortable.',
      description: 'A guided walk over a considered mix of natural surfaces. Begin with a short check-in, take an unhurried walk, and choose a pace that feels comfortable. A practitioner stays nearby to answer questions and help you pause whenever you like.',
      image: '/images/service-placeholder.jpg',
      benefits: ['A slower pace', 'Time outdoors', 'A sensory reset'],
      duration: '30 minutes',
      price: '₹799',
      sortOrder: 1,
    },
    {
      title: 'Ground & Breathe',
      slug: 'barefoot-grounding-therapy',
      shortDesc: 'A gentle barefoot walk with simple breathing prompts and no need to hurry.',
      description: 'Move between a few familiar surfaces while a practitioner offers simple breathing prompts. Choose to walk, pause, or sit whenever you like. This is a quiet guided practice for taking a little time out of the day.',
      image: '/images/service-placeholder.jpg',
      benefits: ['Breathing practice', 'Gentle movement', 'A little time to pause'],
      duration: '45 minutes',
      price: '₹999',
      sortOrder: 2,
    },
    {
      title: 'Quiet Pressure Practice',
      slug: 'acupressure-mat-session',
      shortDesc: 'A seated, guided pause with comfortable pressure and regular check-ins.',
      description: 'Settle into a comfortable seat while your practitioner guides a short pressure and breathing routine. The pressure is adjusted to your preference, with time to pause and check in throughout. This session is for relaxation and does not replace medical care.',
      image: '/images/service-placeholder.jpg',
      benefits: ['Comfort-led pacing', 'A seated reset', 'A quiet place to pause'],
      duration: '40 minutes',
      price: '₹899',
      sortOrder: 3,
    },
    {
      title: 'Herbal Foot Soak Ritual',
      slug: 'herbal-foot-soak-ritual',
      shortDesc: 'Soak your feet in warm herbal infusions crafted from traditional Indian botanicals.',
      description: 'This deeply relaxing ritual begins with a warm foot bath infused with a proprietary blend of turmeric, neem, eucalyptus, and rock salt sourced from the Himalayas. Your feet are gently cleansed and exfoliated before being immersed in the herbal soak for 20 minutes. The warmth opens pores and allows the botanical extracts to penetrate the skin, softening calluses, reducing fungal concerns, and drawing out toxins. The session concludes with a cooling peppermint balm application and gentle foot massage.',
      image: '/images/service-foot-soak.jpg',
      benefits: ['Detoxification', 'Soft and healthy feet', 'Antifungal care', 'Deep relaxation', 'Improved skin texture'],
      duration: '35 minutes',
      price: '₹699',
      sortOrder: 4,
    },
    {
      title: 'Meridian Walking Meditation',
      slug: 'meridian-walking-meditation',
      shortDesc: 'A guided meditative walk along paths mapped to traditional energy meridians.',
      description: 'Drawing from traditional Chinese and Ayurvedic medicine, our meridian walking paths are designed to stimulate the body\'s energy channels through intentional foot placement and breathwork. Each path is marked with symbols corresponding to different organ systems. Our practitioners guide you through slow, deliberate steps synchronised with breathing patterns. This moving meditation improves energy flow, calms the nervous system, and brings profound mental clarity. Suitable for all ages and fitness levels.',
      image: '/images/service-meridian.jpg',
      benefits: ['Mental clarity', 'Balanced energy flow', 'Nervous system calm', 'Emotional balance', 'Mindfulness practice'],
      duration: '50 minutes',
      price: '₹1,099',
      sortOrder: 5,
    },
    {
      title: 'Junior Steppers Programme',
      slug: 'junior-steppers-programme',
      shortDesc: 'Playful grounding and balance activities designed for children aged 4 to 12.',
      description: 'Our Junior Steppers programme makes wellness fun for children. Through games, obstacle courses, and sensory play on natural surfaces, children develop better balance, coordination, and body awareness. Each session is led by certified child wellness practitioners who create a safe, engaging environment. Activities include pebble sorting with feet, textured path adventures, and group grounding games. Regular participation supports healthy growth, improves concentration, and reduces screen-time restlessness.',
      image: '/images/service-junior.jpg',
      benefits: ['Better balance and coordination', 'Improved concentration', 'Sensory development', 'Screen-time detox', 'Fun physical activity'],
      duration: '30 minutes',
      price: '₹599',
      sortOrder: 6,
    },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    })
  }

  // Seed Locations
  const locations = [
    { name: 'Zen Steps Adyar', slug: 'adyar-chennai', city: 'Chennai', state: 'Tamil Nadu', address: '42, Gandhi Nagar Main Road, Adyar, Chennai - 600020', phone: '+91 44 2441 0001', email: 'adyar@zensteps.in', timings: 'Mon–Sat: 9 AM – 8 PM, Sun: 10 AM – 5 PM' },
    { name: 'Zen Steps Koramangala', slug: 'koramangala-bangalore', city: 'Bangalore', state: 'Karnataka', address: '15, 80 Feet Road, Koramangala 4th Block, Bangalore - 560034', phone: '+91 80 2563 0002', email: 'koramangala@zensteps.in', timings: 'Mon–Sat: 9 AM – 8 PM, Sun: 10 AM – 5 PM' },
    { name: 'Zen Steps Banjara Hills', slug: 'banjara-hills-hyderabad', city: 'Hyderabad', state: 'Telangana', address: '8-2-293, Road No. 12, Banjara Hills, Hyderabad - 500034', phone: '+91 40 2335 0003', email: 'banjarahills@zensteps.in', timings: 'Mon–Sat: 9 AM – 8 PM, Sun: 10 AM – 5 PM' },
    { name: 'Zen Steps Bandra', slug: 'bandra-mumbai', city: 'Mumbai', state: 'Maharashtra', address: '22, Hill Road, Bandra West, Mumbai - 400050', phone: '+91 22 2640 0004', email: 'bandra@zensteps.in', timings: 'Mon–Sat: 9 AM – 8 PM, Sun: 10 AM – 5 PM' },
    { name: 'Zen Steps Connaught Place', slug: 'connaught-place-delhi', city: 'New Delhi', state: 'Delhi', address: 'N-14, Inner Circle, Connaught Place, New Delhi - 110001', phone: '+91 11 2334 0005', email: 'cp@zensteps.in', timings: 'Mon–Sat: 9 AM – 8 PM, Sun: 10 AM – 5 PM' },
    { name: 'Zen Steps RS Puram', slug: 'rs-puram-coimbatore', city: 'Coimbatore', state: 'Tamil Nadu', address: '57, DB Road, RS Puram, Coimbatore - 641002', phone: '+91 422 2541 0006', email: 'rspuram@zensteps.in', timings: 'Mon–Sat: 9 AM – 8 PM, Sun: 10 AM – 5 PM' },
  ]

  for (const loc of locations) {
    if (process.env.SEED_SAMPLE_LOCATIONS !== 'true') continue
    await prisma.location.upsert({
      where: { slug: loc.slug },
      update: {},
      create: loc,
    })
  }

  // Seed Team Members
  await prisma.teamMember.createMany({
    data: [
      { name: 'Dr. Meera Venkatesh', role: 'Founder & Chief Wellness Officer', bio: 'A podiatrist turned wellness evangelist, Dr. Meera spent 15 years studying reflexology traditions across Asia before founding Zen Steps. Her vision is to make therapeutic grounding accessible to every Indian household.', sortOrder: 1 },
      { name: 'Rajesh Sundaram', role: 'Head of Practitioner Training', bio: 'With certifications in traditional Chinese medicine and Ayurvedic foot therapy, Rajesh designs our practitioner curriculum and ensures every Zen Steps therapist meets our exacting standards.', sortOrder: 2 },
      { name: 'Anitha Krishnan', role: 'Director of Operations', bio: 'Anitha oversees the day-to-day running of all Zen Steps centres across India. Her background in healthcare administration ensures every location maintains consistent quality.', sortOrder: 3 },
    ],
    skipDuplicates: true,
  })

  // Optional example FAQs; keep the public site on reviewed copy by default.
  if (process.env.SEED_SAMPLE_FAQS === 'true') await prisma.fAQ.createMany({
    data: [
      { question: 'What should I wear to a session?', answer: 'Wear comfortable, loose-fitting clothing. You will be barefoot during all therapies, so avoid tight socks or stockings before your visit. We provide sanitised foot covers if needed.', category: 'general', sortOrder: 1 },
      { question: 'Is reflexology walkway therapy painful?', answer: 'Most clients describe the sensation as a firm, satisfying pressure rather than pain. Our practitioners always start gently and adjust based on your comfort level. First-time visitors may experience mild tenderness that subsides quickly.', category: 'general', sortOrder: 2 },
      { question: 'How often should I visit?', answer: 'For general wellness, we recommend one session per week. For specific concerns like chronic pain or sleep issues, your practitioner may suggest twice-weekly visits initially, reducing to maintenance frequency as you improve.', category: 'general', sortOrder: 3 },
      { question: 'Are your therapies suitable for pregnant women?', answer: 'Certain therapies can be adapted for pregnant women, especially after the first trimester. However, we require a note from your obstetrician before scheduling. Our Stone Path and Acupressure Mat sessions have modified protocols for expectant mothers.', category: 'services', sortOrder: 4 },
      { question: 'Do you offer franchise opportunities?', answer: 'Yes, Zen Steps is actively expanding across India. We offer comprehensive franchise packages including training, equipment, branding, and ongoing support. Visit our Franchise page or call our business development team for details.', category: 'franchise', sortOrder: 5 },
      { question: 'What hygiene measures do you follow?', answer: 'All stone paths and mats are sanitised between sessions using medical-grade, eco-friendly disinfectants. Foot soak tubs are single-use lined. Towels are freshly laundered. Our centres undergo daily deep cleaning and monthly professional sanitisation.', category: 'general', sortOrder: 6 },
    ],
    skipDuplicates: true,
  })

  // Seed Site Settings
  const settings = [
    { key: 'siteName', value: 'Zen Steps' },
    { key: 'tagline', value: 'Walk Your Way to Wellness' },
    { key: 'phone', value: '+91 1800 123 4567' },
    { key: 'email', value: 'hello@zensteps.in' },
    { key: 'address', value: '42, Gandhi Nagar Main Road, Adyar, Chennai - 600020 (Head Office)' },
    { key: 'facebook', value: 'https://facebook.com/zenstepsindia' },
    { key: 'instagram', value: 'https://instagram.com/zenstepsindia' },
    { key: 'twitter', value: 'https://twitter.com/zenstepsindia' },
    { key: 'youtube', value: 'https://youtube.com/@zenstepsindia' },
    { key: 'whatsapp', value: '+9118001234567' },
  ]

  for (const s of settings) {
    await prisma.siteSettings.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    })
  }

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
