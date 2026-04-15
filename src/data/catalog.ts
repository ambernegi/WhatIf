export type Pricing = 'free' | 'monetized' | 'mixed';
export type Maturity = 'ga' | 'beta' | 'alpha';

export type Product = {
  id: string;
  name: string;
  summary: string;
  maturity: Maturity;
  pricing: Pricing;
  industries: string[];
  capabilities: string[];
  featuredRank?: number; // lower = more prominent on landing
  entry: {
    docs: string;
    sdk?: string;
    releases?: string;
  };
};

export type Solution = {
  id: string;
  name: string;
  summary: string;
  usesProducts: string[]; // product ids
  entry: {
    docs: string;
  };
  curatedLinks: Array<{
    label: string;
    href: string;
    note?: string;
  }>;
};

export const PRODUCTS: Product[] = [
  {
    id: 'design-automation',
    name: 'Design Automation',
    summary:
      'Automate design workflows in the cloud to process CAD files, extract data, and generate outputs.',
    maturity: 'ga',
    pricing: 'monetized',
    industries: ['AEC'],
    capabilities: ['Document Management'],
    featuredRank: 1,
    entry: {
      docs: 'docs/products/design-automation',
      sdk: 'docs/sdks/design-automation',
      releases: 'docs/releases/design-automation',
    },
  },
  {
    id: 'viewer',
    name: 'Viewer',
    summary:
      'Embed and interact with 3D models in your apps. Supports CAD, BIM, and point cloud formats.',
    maturity: 'ga',
    pricing: 'monetized',
    industries: ['AEC'],
    capabilities: ['3D Visualization'],
    featuredRank: 2,
    entry: {
      docs: 'docs/products/viewer',
      sdk: 'docs/sdks/viewer',
      releases: 'docs/releases/viewer',
    },
  },
  {
    id: 'webhooks',
    name: 'Webhooks',
    summary: 'Receive real-time callbacks for key events and build event-driven integrations.',
    maturity: 'ga',
    pricing: 'free',
    industries: ['AEC'],
    capabilities: ['Document Management'],
    featuredRank: 3,
    entry: {
      docs: 'docs/products/webhooks',
      sdk: 'docs/sdks/webhooks',
      releases: 'docs/releases/webhooks',
    },
  },
  {
    id: 'metrics',
    name: 'Metrics & Analytics',
    summary: 'Track usage and operational metrics to monitor integrations and performance.',
    maturity: 'beta',
    pricing: 'mixed',
    industries: ['AEC'],
    capabilities: ['Observability'],
    entry: {
      docs: 'docs/products/metrics',
      sdk: 'docs/sdks/metrics',
      releases: 'docs/releases/metrics',
    },
  },
  {
    id: 'machine-translation',
    name: 'Machine Translation',
    summary: "Translate content programmatically across languages using Autodesk's MT service.",
    maturity: 'ga',
    pricing: 'free',
    industries: ['AEC'],
    capabilities: ['Document Management'],
    featuredRank: 4,
    entry: {
      docs: 'docs/products/machine-translation',
      sdk: 'docs/sdks/machine-translation',
      releases: 'docs/releases/machine-translation',
    },
  },
];

export const SOLUTIONS: Solution[] = [
  {
    id: 'automated-submittals',
    name: 'Automated Submittals',
    summary: 'Generate, validate, and deliver submission packages with repeatable automation.',
    usesProducts: ['design-automation', 'webhooks', 'viewer'],
    entry: { docs: 'docs/solutions/automated-submittals' },
    curatedLinks: [
      {
        label: 'Start with Design Automation overview',
        href: 'docs/design-docs/developer-guide/overview',
        note: 'Core compute/automation building block.',
      },
      {
        label: 'Add Webhooks for event-driven flows',
        href: 'docs/webhooks/developer-guide/overview',
      },
      {
        label: 'Embed Viewer for review and approvals',
        href: 'docs/viewer-api/developer-guide/overview',
      },
    ],
  },
  {
    id: 'multilingual-docs',
    name: 'Multilingual Documentation',
    summary: 'Translate technical content and keep product documentation consistent across locales.',
    usesProducts: ['machine-translation'],
    entry: { docs: 'docs/solutions/multilingual-docs' },
    curatedLinks: [
      {
        label: 'Machine Translation overview',
        href: 'docs/mt-api/developer-guide/overview',
      },
    ],
  },
];

export const ALL_INDUSTRIES = [...new Set(PRODUCTS.flatMap((p) => p.industries))].sort();
export const ALL_CAPABILITIES = [...new Set(PRODUCTS.flatMap((p) => p.capabilities))].sort();

