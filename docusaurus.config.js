// @ts-check

/**
 * Workaround for Node 24 / webpack 5.106+:
 * webpackbar extends webpack.ProgressPlugin and writes its own options
 * (name, color, reporters, …) onto this.options. webpack's strict schema
 * validation rejects those unknown keys via a compiler.hooks.validate tap
 * registered under the name 'ProgressPlugin'.
 *
 * Fix: for each WebpackBarPlugin in the webpack config, wrap its apply()
 * so that immediately after it registers the validate hook we remove that
 * specific tap. webpackbar's own code is untouched; webpack never validates.
 */
function webpackBarPatch() {
  return {
    name: 'webpackbar-patch',
    /** @param {import('webpack').Configuration} config */
    configureWebpack(config) {
      (config.plugins || []).forEach((plugin) => {
        if (plugin && plugin.constructor?.name === 'WebpackBarPlugin') {
          const origApply = /** @type {any} */ (plugin.apply.bind(plugin));
          // @ts-ignore — intentional low-level webpack plugin patch; origApply is already bound
          plugin.apply = (/** @type {any} */ compiler) => {
            origApply(compiler);
            // Remove the 'ProgressPlugin' schema-validate tap that the base
            // class registered — it rejects webpackbar's extra option keys.
            const taps = compiler.hooks.validate && compiler.hooks.validate.taps;
            if (Array.isArray(taps)) {
              const idx = taps.findIndex((t) => t.name === 'ProgressPlugin');
              if (idx !== -1) taps.splice(idx, 1);
            }
          };
        }
      });
      return {};
    },
  };
}

const baseUrl = process.env.DOCUSAURUS_BASE_URL || '/WhatIf/';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Autodesk',
  tagline: 'Documentation System POC',
  url: 'https://ambernegi.github.io',
  baseUrl,
  favicon: 'img/favicon.ico',
  organizationName: 'ambernegi', // GitHub org/user name.
  projectName: 'WhatIf', // GitHub repo name.
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themeConfig: {
    navbar: {
      title: '',
      logo: {
        alt: 'Autodesk Platform Services',
        src: 'images/apslogo.png',
        href: baseUrl,
      },
      items: [
        { to: '/', label: 'Explore', position: 'left' },
        { to: '/docs', label: 'Docs', position: 'left' },
        { to: '/docs/releases', label: 'Releases', position: 'left' },
        { to: '/docs/sdks', label: 'SDKs & Samples', position: 'left' },
        { href: 'https://github.com/ambernegi/WhatIf', label: 'App Store', position: 'left' },
        {
          href: 'https://github.com/ambernegi/WhatIf',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'API Catalog', to: '/' },
            { label: 'Getting Started', to: '/docs/design-docs/how-to-guide/getting-started' },
            { label: 'Reference', to: '/docs/design-docs/reference/auth' },
            { label: 'Machine Translation API', to: '/docs/mt-api/developer-guide/overview' },
          ],
        },
        {
          title: 'Resources',
          items: [
            { label: 'APS Portal', href: 'https://aps.autodesk.com' },
            { label: 'GitHub', href: 'https://github.com/ambernegi/WhatIf' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Autodesk, Inc.`,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  },

  plugins: [
    webpackBarPatch,
    [
      '@docusaurus/plugin-client-redirects',
      {
        // Keep legacy and new hubs stable; add migrations here as we reorganize folders.
        redirects: [],
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          routeBasePath: 'docs', // Serve docs under /docs, leave / for custom landing page.
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
};

module.exports = config;


