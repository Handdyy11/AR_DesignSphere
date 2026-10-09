export type RoomCategory = 'Living Room' | 'Bedroom' | 'Kitchen' | 'Office';

export type FurnitureCategory =
  | 'All'
  | 'Sofas'
  | 'Tables'
  | 'Chairs'
  | 'Lighting'
  | 'Storage'
  | 'Decor';

export interface RoomPhoto {
  id: string;
  name: string;
  category: RoomCategory;
  image: string;
  size: string;
}

export interface FurnitureItem {
  id: string;
  name: string;
  category: Exclude<FurnitureCategory, 'All'>;
  price: number;
  width: number;
  depth: number;
  height: number;
  material: string;
  image: string;
  colors: { name: string; hex: string }[];
}

export const ROOM_PHOTOS: RoomPhoto[] = [
  {
    id: 'lr1',
    name: 'Sunlit Modern Living',
    category: 'Living Room',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
    size: '18 × 14 ft',
  },
  {
    id: 'lr2',
    name: 'Neutral Lounge',
    category: 'Living Room',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
    size: '16 × 13 ft',
  },
  {
    id: 'lr3',
    name: 'Urban Open Plan',
    category: 'Living Room',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
    size: '20 × 15 ft',
  },
  {
    id: 'br1',
    name: 'Cozy Bedroom Suite',
    category: 'Bedroom',
    image:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80',
    size: '14 × 12 ft',
  },
  {
    id: 'br2',
    name: 'Soft Minimal Bedroom',
    category: 'Bedroom',
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80',
    size: '13 × 11 ft',
  },
  {
    id: 'kt1',
    name: 'Minimal White Kitchen',
    category: 'Kitchen',
    image:
      'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=1200&q=80',
    size: '12 × 10 ft',
  },
  {
    id: 'kt2',
    name: 'Warm Wood Kitchen',
    category: 'Kitchen',
    image:
      'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=1200&q=80',
    size: '14 × 11 ft',
  },
  {
    id: 'of1',
    name: 'Focused Home Office',
    category: 'Office',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    size: '12 × 10 ft',
  },
  {
    id: 'of2',
    name: 'Bright Studio Desk',
    category: 'Office',
    image:
      'https://images.unsplash.com/photo-1593062096033-9a2bde36c524?w=1200&q=80',
    size: '11 × 9 ft',
  },
];

export const FURNITURE: FurnitureItem[] = [
  {
    id: 'f1',
    name: 'Luna 3-Seater Sofa',
    category: 'Sofas',
    price: 1890,
    width: 84,
    depth: 36,
    height: 34,
    material: 'Linen Blend',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    colors: [
      { name: 'Sand Beige', hex: '#C4A882' },
      { name: 'Olive', hex: '#6B7F4A' },
      { name: 'Grey', hex: '#8A8F98' },
      { name: 'White', hex: '#F2F0EB' },
      { name: 'Brown', hex: '#6B4F3A' },
    ],
  },
  {
    id: 'f2',
    name: 'Nordic Lounge Sofa',
    category: 'Sofas',
    price: 2240,
    width: 78,
    depth: 34,
    height: 32,
    material: 'Bouclé',
    image:
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
    colors: [
      { name: 'Sand Beige', hex: '#C4A882' },
      { name: 'Grey', hex: '#8A8F98' },
      { name: 'White', hex: '#F2F0EB' },
      { name: 'Brown', hex: '#6B4F3A' },
    ],
  },
  {
    id: 'f3',
    name: 'Oak Coffee Table',
    category: 'Tables',
    price: 540,
    width: 48,
    depth: 28,
    height: 16,
    material: 'Solid Oak',
    image:
      'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80',
    colors: [
      { name: 'Sand Beige', hex: '#C4A882' },
      { name: 'Brown', hex: '#6B4F3A' },
      { name: 'White', hex: '#F2F0EB' },
      { name: 'Grey', hex: '#8A8F98' },
    ],
  },
  {
    id: 'f4',
    name: 'Marble Side Table',
    category: 'Tables',
    price: 380,
    width: 20,
    depth: 20,
    height: 22,
    material: 'Marble & Brass',
    image:
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80',
    colors: [
      { name: 'White', hex: '#F2F0EB' },
      { name: 'Grey', hex: '#8A8F98' },
      { name: 'Brown', hex: '#6B4F3A' },
    ],
  },
  {
    id: 'f5',
    name: 'Arc Dining Chair',
    category: 'Chairs',
    price: 220,
    width: 20,
    depth: 22,
    height: 32,
    material: 'Walnut & Fabric',
    image:
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80',
    colors: [
      { name: 'Olive', hex: '#6B7F4A' },
      { name: 'Sand Beige', hex: '#C4A882' },
      { name: 'Grey', hex: '#8A8F98' },
      { name: 'Brown', hex: '#6B4F3A' },
    ],
  },
  {
    id: 'f6',
    name: 'Velvet Accent Chair',
    category: 'Chairs',
    price: 640,
    width: 30,
    depth: 32,
    height: 34,
    material: 'Velvet',
    image:
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
    colors: [
      { name: 'Olive', hex: '#6B7F4A' },
      { name: 'Grey', hex: '#8A8F98' },
      { name: 'Brown', hex: '#6B4F3A' },
      { name: 'Sand Beige', hex: '#C4A882' },
    ],
  },
  {
    id: 'f7',
    name: 'Sphere Floor Lamp',
    category: 'Lighting',
    price: 310,
    width: 14,
    depth: 14,
    height: 62,
    material: 'Brushed Metal',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
    colors: [
      { name: 'White', hex: '#F2F0EB' },
      { name: 'Grey', hex: '#8A8F98' },
      { name: 'Brown', hex: '#6B4F3A' },
    ],
  },
  {
    id: 'f8',
    name: 'Linear Pendant',
    category: 'Lighting',
    price: 450,
    width: 36,
    depth: 6,
    height: 18,
    material: 'Matte Black Metal',
    image:
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80',
    colors: [
      { name: 'Grey', hex: '#8A8F98' },
      { name: 'White', hex: '#F2F0EB' },
      { name: 'Brown', hex: '#6B4F3A' },
    ],
  },
  {
    id: 'f9',
    name: 'Oak Media Console',
    category: 'Storage',
    price: 980,
    width: 60,
    depth: 18,
    height: 24,
    material: 'White Oak',
    image:
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80',
    colors: [
      { name: 'Sand Beige', hex: '#C4A882' },
      { name: 'Brown', hex: '#6B4F3A' },
      { name: 'White', hex: '#F2F0EB' },
      { name: 'Grey', hex: '#8A8F98' },
    ],
  },
  {
    id: 'f10',
    name: 'Modular Bookcase',
    category: 'Storage',
    price: 720,
    width: 48,
    depth: 14,
    height: 72,
    material: 'Ash Wood',
    image:
      'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80',
    colors: [
      { name: 'Brown', hex: '#6B4F3A' },
      { name: 'White', hex: '#F2F0EB' },
      { name: 'Grey', hex: '#8A8F98' },
    ],
  },
  {
    id: 'f11',
    name: 'Ceramic Vase Set',
    category: 'Decor',
    price: 120,
    width: 10,
    depth: 10,
    height: 14,
    material: 'Stoneware',
    image:
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80',
    colors: [
      { name: 'Sand Beige', hex: '#C4A882' },
      { name: 'White', hex: '#F2F0EB' },
      { name: 'Olive', hex: '#6B7F4A' },
      { name: 'Grey', hex: '#8A8F98' },
    ],
  },
  {
    id: 'f12',
    name: 'Woven Area Rug',
    category: 'Decor',
    price: 480,
    width: 96,
    depth: 60,
    height: 1,
    material: 'Wool Blend',
    image:
      'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80',
    colors: [
      { name: 'Sand Beige', hex: '#C4A882' },
      { name: 'Olive', hex: '#6B7F4A' },
      { name: 'Grey', hex: '#8A8F98' },
      { name: 'Brown', hex: '#6B4F3A' },
    ],
  },
];

export const PROJECT_CARDS = [
  {
    id: 'p1',
    name: 'Modern Living Room',
    status: 'In Progress',
    budget: '₹1,25,000',
    size: '18 × 14 ft',
    progress: 72,
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80',
  },
  {
    id: 'p2',
    name: 'Cozy Bedroom',
    status: 'Collaboration',
    budget: '₹82,000',
    size: '14 × 12 ft',
    progress: 54,
    image:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&q=80',
  },
  {
    id: 'p3',
    name: 'Minimal Kitchen',
    status: 'Approved',
    budget: '₹1,58,000',
    size: '12 × 10 ft',
    progress: 100,
    image:
      'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=900&q=80',
  },
];

export const HERO_IMAGE =
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80';

export const DESIGN_A_IMAGE =
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80';

export const DESIGN_B_IMAGE =
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80';
