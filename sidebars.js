/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // ── Docs hub (new IA entry) ───────────────────────────────────────────────
  mainSidebar: [
    { type: 'doc', id: 'index', label: 'Docs home' },
    {
      type: 'category',
      label: 'Products',
      collapsed: false,
      items: [
        'products/index',
        'products/autocad/index',
        'products/revit/index',
        'products/fusion/index',
        'products/forma/index',
        {
          type: 'category',
          label: 'Solutions',
          collapsed: true,
          items: [
            'solutions/index',
            'solutions/automated-submittals/index',
            'solutions/multilingual-docs/index',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'APS products',
      collapsed: false,
      items: [
        'apis/index',
        'apis/design-automation/index',
        'apis/viewer/index',
        'apis/webhooks/index',
        'apis/metrics/index',
        'apis/machine-translation/index',
        {
          type: 'category',
          label: 'Data Management API',
          collapsed: true,
          link: { type: 'doc', id: 'apis/wip-dm-v3/index' },
          items: [
            'apis/wip-dm-v3/technical-guide',
            'apis/wip-dm-v3/migration-guide',
            'apis/wip-dm-v3/release-notes',
            'apis/wip-dm-v3/changelog',
            'apis/wip-dm-v3/code-examples',
            'apis/wip-dm-v3/postman',
          ],
        },
        'sdks/index',
        'mcps/index',
      ],
    },
    {
      type: 'category',
      label: 'Apps',
      collapsed: false,
      items: [
        'apps/index',
      ],
    },
    {
      type: 'category',
      label: 'Releases',
      collapsed: true,
      items: [
        'releases/index',
        'releases/design-automation/index',
        'releases/viewer/index',
        'releases/webhooks/index',
        'releases/metrics/index',
        'releases/machine-translation/index',
      ],
    },
  ],

  // ── Design Automation API ────────────────────────────────────────────────
  designAutomationSidebar: [
    { type: 'doc', id: 'design-docs/developer-guide/overview', label: 'Overview' },
    {
      type: 'category',
      label: "Developer's Guide",
      collapsed: false,
      items: [
        'design-docs/developer-guide/security',
        'design-docs/developer-guide/troubleshooting',
        'design-docs/developer-guide/faq',
      ],
    },
    {
      type: 'category',
      label: 'How-to Guide',
      collapsed: false,
      items: [
        'design-docs/how-to-guide/getting-started',
        'design-docs/how-to-guide/oauth-auth-code',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: [
        'design-docs/reference/auth',
      ],
    },
  ],

  // ── Viewer API ───────────────────────────────────────────────────────────
  viewerSidebar: [
    { type: 'doc', id: 'viewer-api/developer-guide/overview', label: 'Overview' },
    {
      type: 'category',
      label: "Developer's Guide",
      collapsed: false,
      items: [
        'viewer-api/developer-guide/troubleshooting',
        'viewer-api/developer-guide/faq',
      ],
    },
    {
      type: 'category',
      label: 'How-to Guide',
      collapsed: false,
      items: ['viewer-api/how-to-guide/getting-started'],
    },
  ],

  // ── Webhooks ─────────────────────────────────────────────────────────────
  webhooksSidebar: [
    { type: 'doc', id: 'webhooks/developer-guide/overview', label: 'Overview' },
    {
      type: 'category',
      label: "Developer's Guide",
      collapsed: false,
      items: [
        'webhooks/developer-guide/troubleshooting',
        'webhooks/developer-guide/faq',
      ],
    },
    {
      type: 'category',
      label: 'How-to Guide',
      collapsed: false,
      items: ['webhooks/how-to-guide/getting-started'],
    },
  ],

  // ── Metrics & Analytics ──────────────────────────────────────────────────
  metricsSidebar: [
    { type: 'doc', id: 'metrics/developer-guide/overview', label: 'Overview' },
    {
      type: 'category',
      label: "Developer's Guide",
      collapsed: false,
      items: [
        'metrics/developer-guide/troubleshooting',
        'metrics/developer-guide/faq',
      ],
    },
    {
      type: 'category',
      label: 'How-to Guide',
      collapsed: false,
      items: ['metrics/how-to-guide/getting-started'],
    },
  ],

  // ── Machine Translation API ──────────────────────────────────────────────
  mtApiSidebar: [
    { type: 'doc', id: 'mt-api/developer-guide/overview', label: 'Overview' },
    {
      type: 'category',
      label: "Developer's Guide",
      collapsed: false,
      items: [
        'mt-api/developer-guide/troubleshooting',
        'mt-api/developer-guide/faq',
      ],
    },
    {
      type: 'category',
      label: 'How-to Guide',
      collapsed: false,
      items: [
        'mt-api/how-to-guide/getting-started',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      link: { type: 'doc', id: 'mt-api/v1/reference/http/mt-api/index' },
      items: [
        'mt-api/v1/reference/http/mt-api/post-machine-translate',
        'mt-api/v1/reference/http/mt-api/get-version',
        'mt-api/v1/reference/http/mt-api/get-languages',
      ],
    },
  ],

};

module.exports = sidebars;
