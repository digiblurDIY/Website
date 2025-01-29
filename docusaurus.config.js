// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'digiblurDIY',
  tagline: '',
  url: 'https://digiblur.com',
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
          routeBasePath: 'wiki',
          editUrl: 'https://github.com/digiblurDIY/Website/tree/main/',
        },
        blog: {
          showReadingTime: false,
		  routeBasePath: '/',
          postsPerPage: 7,
          //blogSidebarTitle: 'Recent Posts',
          blogSidebarCount: 0,
          feedOptions: {
            type: 'all',
            title: 'digiblurDIY Smart Home',
            description: 'No cloud is the way!  DIY Smart Home Automation projects and reviews.  Projects and devices that offer the best value.',
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
        docsRouteBasePath: 'wiki',
        blogRouteBasePath: '/',
        removeDefaultStopWordFilter: true,
        highlightSearchTermsOnTargetPage: false,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/digiblur-large.jpg',
      metadata: [{name: 'keywords', content: 'smart home, digiblur, digiblurdiy, home assistant, tasmota, smart home how to guides'}],
      announcementBar: {
        id: 'affiliate',
        content:
          'Links to products provided through the Amazon Affiliate program. As an Amazon Associate I earn from qualifying purchases.',
        backgroundColor: '#242526',
        textColor: '#7390ae',
        isCloseable: true,
      },
      navbar: {
        title: 'digiblurDIY',
        logo: {
          alt: 'digiblurDIY',
          src: 'img/digiblur.png',
        },
        items: [
          {
            to: '/',
            label: 'News',
            position: 'left',
          },
          {
            type: 'doc',
            docId: 'devices/index',
            position: 'left',
            label: 'Devices',
          },
          {
            type: 'doc',
            docId: 'tasmota/index',
            position: 'left',
            label: 'Tasmota',
          },
          {
            type: 'doc',
            docId: 'ha/index',
            position: 'left',
            label: 'Home Assistant',
          },
          {
            type: 'doc',
            docId: 'zigbee/index',
            position: 'left',
            label: 'Zigbee',
          },
          {
            type: 'doc',
            docId: 'led/index',
            position: 'left',
            label: 'LEDs',
          },
          {
            type: 'doc',
            docId: 'digiblur-picks/index',
            position: 'left',
            label: 'digiblur Top Picks',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Wiki',
            items: [
              {
                label: 'Devices',
                to: '/wiki/devices',
              },
              {
                label: 'Tasmota',
                to: '/wiki/tasmota',
              },
              {
                label: 'Home Assistant',
                to: '/wiki/ha',
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
                href: 'https://discord.com/invite/dgRZSw6',
              },
              {
                label: 'X',
                href: 'https://x.com/digiblur',
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
                label: 'News',
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
