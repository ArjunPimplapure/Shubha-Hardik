/**
 * CENTRAL WEDDING ASSETS & EXACT INVITATION DATA
 *
 * ---------------------------------------------------------------------------
 * HOW TO REPLACE YOUR OFFICIAL WEDDING LOGO & MUSIC:
 *
 * 1. WEDDING LOGO IMAGE:
 *    - Upload your official PNG/SVG logo (with transparent background) into
 *      `public/images/wedding-logo.png` (or `src/assets/images/`).
 *    - Update `WEDDING_LOGO_SRC` below to `'/images/wedding-logo.png'`.
 *    - The app preserves exact aspect ratio, original colours, and transparency.
 *
 * 2. BACKGROUND WEDDING SONG:
 *    - Replace `public/audio/wedding-music.wav` with your `.mp3` or `.wav` file,
 *      OR upload `public/audio/my-wedding-song.mp3` and update `WEDDING_MUSIC_SRC` below.
 *
 * 3. DECORATIVE EVENT / VENUE ARTWORK:
 *    - Update any path inside `DECORATIVE_IMAGES` below if you wish to substitute
 *      custom photography or illustrations.
 * ---------------------------------------------------------------------------
 */

export const WEDDING_LOGO_SRC = '/src/assets/images/wedding_monogram_1795042786047.jpg';

// Official antique royal scroll image uploaded by user
export const ROYAL_SCROLL_SRC =
  '/assets/aistudio/images__1__6174b8fd.jfif';

// Replace with your custom wedding song path, e.g. '/wedding-music.wav' or '/audio/shehnai-wedding-theme.mp3'
export const WEDDING_MUSIC_SRC = '/wedding-music.wav';

export const DECORATIVE_IMAGES = {
  haldi: '/src/assets/images/haldi_marigold_motif_1795042786712.jpg',
  sangeet: '/src/assets/images/sangeet_lantern_art_1795042802315.jpg',
  vivah: '/src/assets/images/vivah_mandap_motif_1795042787927.jpg',
  reception: '/src/assets/images/reception_chandelier_art_1795042803015.jpg',
  venue: '/src/assets/images/venue_palace_floral_1795042786560.jpg',
} as const;

export const WEDDING_DATA = {
  religiousHeading: '॥ श्री कंकई नमः ॥',
  invitationLead: 'With the divine blessings of our elders and the love of our families',
  invitationPrompt: 'We joyfully invite you to celebrate the wedding of',
  bride: {
    name: 'SHUBHA SHAH',
    parents: 'D/o Shri Rajkumar Shah & Smt. Rakhi Shah',
    grandparents: 'Grand Daughter of Late Smt. Jyotsana Anil Shah',
  },
  groom: {
    name: 'HARDIK GODA',
    parents: 'S/o Shri Kishore Goda & Smt. Prerna Ben Goda',
  },
  // Midnight of 25 December 2026 in Asia/Kolkata (+05:30)
  countdownTargetIso: '2026-12-25T00:00:00+05:30',
  days: [
    {
      id: 'day-1',
      dateDisplay: '25 DECEMBER 2026',
      dateCompact: '25-12-2026',
      subtitle: 'Two Hearts, A Thousand Hues',
      events: [
        {
          id: 'haldi',
          title: 'HALDI',
          tagline: 'Carnival of Love / Hues Of Sunshine',
          time: '10:30 AM',
          theme: 'haldi' as const,
          image: DECORATIVE_IMAGES.haldi,
          imageAlt: 'Traditional brass urli with yellow marigold garlands and turmeric hues',
        },
        {
          id: 'sangeet',
          title: 'SANGEET',
          tagline: 'Sufiyana Shaam',
          time: '7:30 PM',
          theme: 'sangeet' as const,
          image: DECORATIVE_IMAGES.sangeet,
          imageAlt: 'Glowing Mughal hanging lanterns with sitar and tabla musical motifs',
        },
      ],
    },
    {
      id: 'day-2',
      dateDisplay: '26 DECEMBER 2026',
      dateCompact: '26-12-2026',
      subtitle: 'A Sacred Beginning, A Timeless Celebration',
      events: [
        {
          id: 'vivah',
          title: 'PHERE / SHUBH VIVAH',
          tagline: 'The Divine Knot',
          time: '10:30 AM',
          theme: 'vivah' as const,
          image: DECORATIVE_IMAGES.vivah,
          imageAlt: 'Sacred Indian wedding mandap adorned with red roses, jasmine, and brass kalash',
        },
        {
          id: 'reception',
          title: 'RECEPTION',
          tagline: 'Starlit Affair',
          time: '12:30 PM',
          theme: 'reception' as const,
          image: DECORATIVE_IMAGES.reception,
          imageAlt: 'Grand starlit palace banquet terrace illuminated by crystal chandeliers',
        },
      ],
    },
  ],
  venue: {
    heading: 'THE WEDDING VENUE',
    name: 'THE EXOTICA HOTEL',
    address: 'Mangliya, Indore, M.P.',
    mapsUrl: 'https://maps.app.goo.gl/6nf8jr32N3ntoZBeA',
  },
  compliments: [
    'Rakhi - Rajkumar Shah',
    'Seema - Bhavesh Shah',
    'Unnati - Vaibhav Shah',
    'Munali - Bhavik Shah',
    'Manan Shah',
  ],
  rsvpContacts: [
    {
      name: 'Rajkumar Shah',
      displayPhone: '+91-98932 97224',
      telHref: 'tel:+919893297224',
      whatsappHref: 'https://wa.me/919893297224',
    },
    {
      name: 'Vaibhav Shah',
      displayPhone: '+91-62629 22224',
      telHref: 'tel:+916262922224',
      whatsappHref: 'https://wa.me/916262922224',
    },
  ],
  closing: {
    message: 'Your presence will make our celebration even more special.',
    couple: 'SHUBHA & HARDIK',
    regards: 'With Love & Warm Regards',
    hostLine: 'Rakhi - Rajkumar Shah & Family',
  },
} as const;
