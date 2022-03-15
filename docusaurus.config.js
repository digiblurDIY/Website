// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'digiblurDIY',
  tagline: '',
  url: 'https://digiblur.pages.dev',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'digiblurDIY', // Usually your GitHub org/user name.
  projectName: 'Website', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),

          editUrl: 'https://github.com/digiblurDIY/Website/tree/main/',
        },
        blog: {
          showReadingTime: false,
          routeBasePath: '/',
          postsPerPage: 5,
          blogSidebarTitle: 'Recent Posts',
          blogSidebarCount: 10,
          feedOptions: {
            type: 'all',
            title: 'digiblurDIY',
            description: 'digiblurDIY',
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en"],
        docsRouteBasePath: 'docs',
        blogRouteBasePath: '/',
        removeDefaultStopWordFilter: 'true',
        highlightSearchTermsOnTargetPage: 'false',
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'digiblurDIY',
        logo: {
          alt: 'digiblurDIY',
          src: 'img/digiblur.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Tutorials',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Tutorials',
            items: [
              {
                label: 'Tutorials',
                to: '/docs/intro',
              },
              {
                label: 'Tutorials2',
                to: '/docs/intro',
              },
              {
                label: 'Tutorials3',
                to: '/docs/intro',
              },
              {
                label: 'Tutorials4',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'YouTube',
                href: 'https://youtube.com/digiblurDIY',
              },
              {
                label: 'Discord',
                href: 'https://discord.digiblur.com/',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/digiblur',
              },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/digiblurdiy/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Patreon',
                href: 'https://www.patreon.com/digiblurDIY',
              },
              {
                label: 'Amazon Store',
                href: 'https://www.amazon.com/shop/digiblurdiy',
              },
              {
                label: 'Blog',
                to: '/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/digiblurDIY',
              },
            ],
          },
        ],
        copyright: `digiblurDIY - Links to products provided through the Amazon Affiliate program. As an Amazon Associate I earn from qualifying purchases.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
    }),

  plugins: [],
};

module.exports = config;
