export type UnifiedArea = 'products' | 'apis' | 'apps';

export type UnifiedCard = {
  id: string;
  area: UnifiedArea;
  title: string;
  summary: string;
  href: string;
  imageUrl?: string;
  imageAlt?: string;
  tags?: string[];
  badge?: string;
};

const AUTODESK_BRAND_IMG_BASE =
  'https://damassets.autodesk.net/content/dam/mgs/mgs/brand-experiences/making-autocad-image';

// Minimal, curated subset to mirror the three Autodesk properties.
// We keep this intentionally small and editable.
export const PRODUCT_CARDS: UnifiedCard[] = [
  {
    id: 'autodesk-autocad',
    area: 'products',
    title: 'AutoCAD',
    summary: '2D/3D CAD for drafting, design, and documentation.',
    href: 'https://www.autodesk.com/products/autocad/overview',
    imageUrl: `${AUTODESK_BRAND_IMG_BASE}/experiences-makingacad-oneacad1-676x402.jpg`,
    imageAlt: 'Autodesk brand imagery (AutoCAD)',
    tags: ['Design & Drafting'],
  },
  {
    id: 'autodesk-revit',
    area: 'products',
    title: 'Revit',
    summary: 'BIM for planning, design, construction, and building operations.',
    href: 'https://www.autodesk.com/products/revit/overview',
    imageUrl: `${AUTODESK_BRAND_IMG_BASE}/experiences-makingacad-designevo2-676x402.jpg`,
    imageAlt: 'Autodesk brand imagery (Revit)',
    tags: ['AEC', 'BIM'],
  },
  {
    id: 'autodesk-fusion',
    area: 'products',
    title: 'Fusion',
    summary: 'Integrated CAD/CAM/CAE/PCB for design and manufacturing.',
    href: 'https://fusion.autodesk.com/',
    imageUrl: `${AUTODESK_BRAND_IMG_BASE}/experiences-makingacad-family3-676x402.jpg`,
    imageAlt: 'Autodesk brand imagery (Fusion)',
    tags: ['Manufacturing'],
  },
  {
    id: 'autodesk-forma',
    area: 'products',
    title: 'Autodesk Forma',
    summary: 'Cloud-based planning and design collaboration across AECO workflows.',
    href: 'https://www.autodesk.com/products/forma/overview',
    imageUrl: `${AUTODESK_BRAND_IMG_BASE}/experiences-makingacad-photography3-676x402.jpg`,
    imageAlt: 'Autodesk brand imagery (Forma)',
    tags: ['AEC'],
  },
];

export const API_CARDS: UnifiedCard[] = [
  {
    id: 'aps-viewer',
    area: 'apis',
    title: 'Viewer SDK',
    summary: 'Build interactive web viewers for 2D and 3D design models.',
    href: 'https://aps.autodesk.com/viewer-sdk',
    imageUrl: `${AUTODESK_BRAND_IMG_BASE}/experiences-makingacad-rebranding1-676x402.jpg`,
    imageAlt: 'Autodesk brand imagery (APS Viewer)',
    tags: ['Visualization'],
  },
  {
    id: 'aps-automation',
    area: 'apis',
    title: 'Automation API',
    summary: "Run Autodesk's core products as cloud services at enterprise scale.",
    href: 'https://aps.autodesk.com/automation-apis',
    imageUrl: `${AUTODESK_BRAND_IMG_BASE}/experiences-makingacad-fabrication2-676x402.jpg`,
    imageAlt: 'Autodesk brand imagery (APS Automation)',
    tags: ['Automation'],
  },
  {
    id: 'aps-data-management',
    area: 'apis',
    title: 'Data Management API',
    summary: 'Unify data workflows across BIM 360, Fusion Team, and OSS.',
    href: 'https://aps.autodesk.com/data-management-api',
    imageUrl: `${AUTODESK_BRAND_IMG_BASE}/experiences-makingacad-designevo3-676x402.jpg`,
    imageAlt: 'Autodesk brand imagery (APS Data Management)',
    tags: ['Data'],
  },
  {
    id: 'aps-machine-translation',
    area: 'apis',
    title: 'Machine Translation API',
    summary: 'Translate technical content programmatically across languages.',
    href: 'https://aps.autodesk.com/developer/overview/machine-translation-api',
    imageUrl: `${AUTODESK_BRAND_IMG_BASE}/experiences-makingacad-rebranding2-676x402.jpg`,
    imageAlt: 'Autodesk brand imagery (APS Machine Translation)',
    tags: ['AI'],
    badge: 'New',
  },
];

// From the App Store “Featured Apps” section (curated subset).
export const APP_CARDS: UnifiedCard[] = [
  {
    id: 'appstore-avnet',
    area: 'apps',
    title: 'Avnet App',
    summary: 'Modern reference schematics, symbols, and datasheets to jumpstart design.',
    href: 'https://apps.autodesk.com/FUSION/en/Detail/Index?id=2389999075544681207&appLang=en&os=Mac',
    imageUrl: `${AUTODESK_BRAND_IMG_BASE}/experiences-makingacad-family1-676x402.jpg`,
    imageAlt: 'Autodesk brand imagery (App Store)',
    tags: ['Fusion', 'Free'],
  },
  {
    id: 'appstore-boqexport',
    area: 'apps',
    title: 'BoQExport',
    summary: 'Streamline Quantity Take-Off processes directly from Revit.',
    href: 'https://apps.autodesk.com/RVT/en/Detail/Index?id=5144426814434752650&appLang=en&os=Win64',
    imageUrl: `${AUTODESK_BRAND_IMG_BASE}/experiences-makingacad-family2-676x402.jpg`,
    imageAlt: 'Autodesk brand imagery (App Store)',
    tags: ['Revit', 'Free'],
  },
  {
    id: 'appstore-ta-roads-toolkit',
    area: 'apps',
    title: 'TA Roads Toolkit',
    summary: 'Automate road design tasks in Civil 3D to save time and improve accuracy.',
    href: 'https://apps.autodesk.com/CIV3D/en/Detail/Index?id=1462232572425845205&appLang=en&os=Win64',
    imageUrl: `${AUTODESK_BRAND_IMG_BASE}/experiences-makingacad-oneacad2-676x402.jpg`,
    imageAlt: 'Autodesk brand imagery (App Store)',
    tags: ['Civil 3D', 'Paid'],
  },
  {
    id: 'appstore-embeddable-viewer',
    area: 'apps',
    title: 'Embeddable Viewer',
    summary: 'Select a file/version in BIM 360/ACC and embed it on your webpage.',
    href: 'https://apps.autodesk.com/BIM360/en/Detail/Index?id=2589682023032440584&appLang=en&os=Web',
    imageUrl: `${AUTODESK_BRAND_IMG_BASE}/experiences-makingacad-oneacad3-676x402.jpg`,
    imageAlt: 'Autodesk brand imagery (App Store)',
    tags: ['ACC', 'Free'],
  },
];

export const INDUSTRY_LINKS: Array<{ id: string; label: string; href: string }> = [
  { id: 'aec', label: 'AEC', href: 'https://www.autodesk.com/industry/architecture-engineering-construction' },
  { id: 'dandm', label: 'Design & Manufacturing', href: 'https://www.autodesk.com/industry/manufacturing' },
  { id: 'mandE', label: 'Media & Entertainment', href: 'https://www.autodesk.com/industry/media-entertainment' },
];

