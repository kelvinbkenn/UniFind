import { Item, CampusLocation } from '../types';

export const CAMPUS_LOCATIONS: CampusLocation[] = [
  {
    id: 'lib_central',
    name: 'W.E.B. Central Library',
    shortCode: 'LIB',
    zone: 'Central',
    hasSafeDesk: true,
    safeDeskName: 'Library Main Circulation Desk (1st Floor)',
    coordinates: { x: 50, y: 45 }
  },
  {
    id: 'stu_center',
    name: 'Student Center & Food Court',
    shortCode: 'STU',
    zone: 'Central',
    hasSafeDesk: true,
    safeDeskName: 'Student Union Info Booth (Ground Floor)',
    coordinates: { x: 42, y: 58 }
  },
  {
    id: 'sci_complex',
    name: 'Science & Chemistry Labs',
    shortCode: 'SCI',
    zone: 'North',
    hasSafeDesk: true,
    safeDeskName: 'Dean of Science Reception (Room 102)',
    coordinates: { x: 32, y: 25 }
  },
  {
    id: 'eng_hall',
    name: 'Engineering & Technology Building',
    shortCode: 'ENG',
    zone: 'East',
    hasSafeDesk: true,
    safeDeskName: 'Engineering Student Services (ENG 201)',
    coordinates: { x: 74, y: 38 }
  },
  {
    id: 'rec_gym',
    name: 'North Recreation & Sports Complex',
    shortCode: 'REC',
    zone: 'North',
    hasSafeDesk: true,
    safeDeskName: 'Gym Front Member Services Desk',
    coordinates: { x: 62, y: 18 }
  },
  {
    id: 'hall_101',
    name: 'University Lecture Halls (Auditorium)',
    shortCode: 'AUD',
    zone: 'Central',
    hasSafeDesk: false,
    coordinates: { x: 55, y: 62 }
  },
  {
    id: 'bus_terminal',
    name: 'Campus Transit Hub & Bus Stop',
    shortCode: 'BUS',
    zone: 'South',
    hasSafeDesk: true,
    safeDeskName: 'Campus Security Station (Transit Office)',
    coordinates: { x: 48, y: 88 }
  },
  {
    id: 'quad_green',
    name: 'South Memorial Quad & Lawn',
    shortCode: 'QUAD',
    zone: 'South',
    hasSafeDesk: false,
    coordinates: { x: 28, y: 72 }
  }
];

export const CATEGORIES_CONFIG = [
  { id: 'id_cards', label: 'ID & Cards', icon: 'IdCard', color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800/40' },
  { id: 'electronics', label: 'Electronics & Audio', icon: 'Headphones', color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/40' },
  { id: 'books', label: 'Books & Notes', icon: 'BookOpen', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/40' },
  { id: 'bottles', label: 'Bottles & Drinkware', icon: 'CupSoda', color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800/40' },
  { id: 'keys_wallets', label: 'Keys & Wallets', icon: 'KeyRound', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40' },
  { id: 'bags', label: 'Bags & Backpacks', icon: 'Briefcase', color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800/40' },
  { id: 'clothing', label: 'Clothing & Wearables', icon: 'Shirt', color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-800/40' },
  { id: 'other', label: 'Other Items', icon: 'Package', color: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800/40' },
] as const;

export const INITIAL_MOCK_ITEMS: Item[] = [
  {
    id: 'item-1',
    type: 'found',
    title: 'Silver Apple AirPods Pro (2nd Gen) in White Case',
    category: 'electronics',
    description: 'Found a clean pair of AirPods Pro 2 sitting on the treadmill console at the fitness area. The case has a slight scuff on the left hinge and a small holographic anime sticker on the bottom.',
    distinguishingFeatures: 'Holographic sticker on bottom of case, named "Alex\'s AirPods" when opened near iPhone.',
    locationId: 'rec_gym',
    locationDetails: '2nd Floor Cardio Zone, Treadmill #8',
    dateReported: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    eventDate: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString().split('T')[0],
    eventTime: '10:30 AM',
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=800&q=80'
    ],
    securityQuestion: 'What character is on the holographic sticker at the bottom of the case?',
    reporterName: 'Marcus Vance',
    reporterEmail: 'mvance@student.campus.edu',
    reporterPhone: '(555) 234-8901',
    reporterRole: 'student',
    preferredContact: 'in_app',
    safeDropOffLocationId: 'rec_gym',
    tags: ['airpods', 'apple', 'audio', 'earbuds', 'gym', 'gym floor']
  },
  {
    id: 'item-2',
    type: 'lost',
    title: 'Official Student ID Card - Computer Science Dept',
    category: 'id_cards',
    description: 'Misplaced my university student ID card along with a red lanyard and a blue room keycard attached. Needed urgently for dorm access and midterm lab exams this week!',
    distinguishingFeatures: 'ID belongs to "Sophia Chen", Major: CS, ID # ending in ...9412. Attached to a crimson university lanyard.',
    locationId: 'lib_central',
    locationDetails: '3rd Floor Quiet Study Stacks, Desk near Window 14B',
    dateReported: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    eventDate: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString().split('T')[0],
    eventTime: '08:45 AM',
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
    ],
    reward: '$20 Cafeteria Gift Card',
    reporterName: 'Sophia Chen',
    reporterEmail: 'schen@student.campus.edu',
    reporterPhone: '(555) 489-1120',
    reporterRole: 'student',
    preferredContact: 'phone',
    tags: ['id', 'badge', 'card', 'lanyard', 'library', 'cs']
  },
  {
    id: 'item-3',
    type: 'found',
    title: 'Hydro Flask 32oz Wide Mouth (Pacific Blue)',
    category: 'bottles',
    description: 'Found a Pacific Blue insulated water bottle left behind under the bench. Has multiple stickers including a NASA Meatball sticker and a National Parks badge.',
    distinguishingFeatures: 'Dent on the bottom rim, black straw lid, National Parks sticker.',
    locationId: 'hall_101',
    locationDetails: 'Lecture Hall 101, Row F Seat 12',
    dateReported: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    eventDate: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString().split('T')[0],
    eventTime: '02:15 PM',
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80'
    ],
    securityQuestion: 'Which national park is featured on the badge sticker?',
    reporterName: 'Prof. David Miller',
    reporterEmail: 'dmiller@faculty.campus.edu',
    reporterRole: 'faculty',
    preferredContact: 'email',
    safeDropOffLocationId: 'stu_center',
    tags: ['bottle', 'hydro flask', 'blue', 'stickers', 'drinkware']
  },
  {
    id: 'item-4',
    type: 'lost',
    title: 'Organic Chemistry 9th Edition Hardcover + Spiral Lab Notebook',
    category: 'books',
    description: 'Left my heavy textbook and black 5-subject notebook in the cafeteria booth after lunch. The notebook contains handwritten synthesis mechanisms essential for tomorrow\'s test!',
    distinguishingFeatures: 'Name "Liam O\'Connor" written on the inside cover; pink and yellow post-it tabs on chapters 8-12.',
    locationId: 'stu_center',
    locationDetails: 'Food Court corner booth near the smoothie counter',
    dateReported: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    eventDate: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString().split('T')[0],
    eventTime: '01:30 PM',
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    reward: '$15 Coffee Voucher',
    reporterName: 'Liam O\'Connor',
    reporterEmail: 'loconnor@student.campus.edu',
    reporterRole: 'student',
    preferredContact: 'email',
    tags: ['textbook', 'chemistry', 'notes', 'notebook', 'chem', 'food court']
  },
  {
    id: 'item-5',
    type: 'found',
    title: 'Dorm Key Ring with Toyota Fob & Calico Cat Keychain',
    category: 'keys_wallets',
    description: 'Found a set of 3 brass keys, a Toyota car key fob, and a cute enamel calico cat keychain dropped near the west bus shelter.',
    distinguishingFeatures: 'Contains 1 mailbox key, 2 Schlage brass keys, and the cat keychain has a tiny bell.',
    locationId: 'bus_terminal',
    locationDetails: 'Bus Shelter #2 (Express Route Line)',
    dateReported: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    eventDate: new Date(Date.now() - 1000 * 60 * 60 * 37).toISOString().split('T')[0],
    eventTime: '05:40 PM',
    status: 'claim_pending',
    images: [
      'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80'
    ],
    securityQuestion: 'What color is the collar on the cat keychain?',
    reporterName: 'Campus Transit Officer Ray',
    reporterEmail: 'security@campus.edu',
    reporterPhone: '(555) 911-0022',
    reporterRole: 'security',
    preferredContact: 'phone',
    safeDropOffLocationId: 'bus_terminal',
    tags: ['keys', 'dorm key', 'keychain', 'toyota', 'transit', 'bus']
  },
  {
    id: 'item-6',
    type: 'lost',
    title: 'Sony WH-1000XM5 Noise Canceling Headphones (Black)',
    category: 'electronics',
    description: 'Left in the gray fabric zip case on a workbench in the Engineering Lab. They are matte black and have a small scratch on the right headband arm.',
    distinguishingFeatures: 'Matte black, custom foam earpads, case contains a USB-C braided cable and 3.5mm jack adapter.',
    locationId: 'eng_hall',
    locationDetails: 'Circuit Lab 304, Workbench Row 3',
    dateReported: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    eventDate: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString().split('T')[0],
    eventTime: '04:00 PM',
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
    ],
    reward: '$50 Cash Reward',
    reporterName: 'Elena Rostova',
    reporterEmail: 'erostova@student.campus.edu',
    reporterRole: 'student',
    preferredContact: 'in_app',
    tags: ['sony', 'headphones', 'xm5', 'engineering', 'audio']
  },
  {
    id: 'item-7',
    type: 'found',
    title: 'Black Bellroy Leather Slim Bifold Wallet',
    category: 'keys_wallets',
    description: 'Discovered under the table at the student lounge. Wallet contains transit card and cash. Deposited safely at Student Union Info booth.',
    distinguishingFeatures: 'Navy stitching inside, contains an CharlieCard transit pass.',
    locationId: 'stu_center',
    locationDetails: '2nd Floor Mezzanine Couches',
    dateReported: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString(),
    eventDate: new Date(Date.now() - 1000 * 60 * 60 * 62).toISOString().split('T')[0],
    eventTime: '11:15 AM',
    status: 'resolved',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80'
    ],
    securityQuestion: 'What initials or card is visible in the quick-draw slot?',
    reporterName: 'Jordan Taylor',
    reporterEmail: 'jtaylor@staff.campus.edu',
    reporterRole: 'staff',
    preferredContact: 'email',
    safeDropOffLocationId: 'stu_center',
    tags: ['wallet', 'leather', 'bellroy', 'money', 'student union']
  },
  {
    id: 'item-8',
    type: 'lost',
    title: 'Osprey Nebula 32L Backpack (Dark Olive Green)',
    category: 'bags',
    description: 'Accidentally left on the quad picnic tables while studying with group. Contains a gray Patagonia fleece jacket and scientific TI-84 Plus CE calculator.',
    distinguishingFeatures: 'Reflective bike light clip loop on bottom front, key clip inside front compartment.',
    locationId: 'quad_green',
    locationDetails: 'Picnic bench under the large Oak tree by the statue',
    dateReported: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    eventDate: new Date(Date.now() - 1000 * 60 * 60 * 73).toISOString().split('T')[0],
    eventTime: '06:00 PM',
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    ],
    reward: '$30 Reward',
    reporterName: 'Noah Patel',
    reporterEmail: 'npatel@student.campus.edu',
    reporterRole: 'student',
    preferredContact: 'in_app',
    tags: ['backpack', 'osprey', 'green', 'calculator', 'quad']
  }
];

export const PRESET_ITEM_IMAGES: { category: string; url: string; label: string }[] = [
  { category: 'id_cards', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', label: 'ID Card / Badge' },
  { category: 'electronics', url: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80', label: 'AirPods / Earphones' },
  { category: 'electronics', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', label: 'Over-Ear Headphones' },
  { category: 'electronics', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80', label: 'Laptop / Tablet' },
  { category: 'books', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80', label: 'Textbook / Notes' },
  { category: 'bottles', url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80', label: 'Stainless Water Bottle' },
  { category: 'bottles', url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80', label: 'Coffee Tumbler' },
  { category: 'keys_wallets', url: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80', label: 'Keys with Keychain' },
  { category: 'keys_wallets', url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80', label: 'Leather Wallet' },
  { category: 'bags', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80', label: 'Backpack' },
  { category: 'clothing', url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', label: 'Jacket / Hoodie' },
  { category: 'other', url: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=800&q=80', label: 'Glasses / Sunglasses' },
];
