const path = require('path');

module.exports = {
  title: 'React Motion Layout',
  tagline: 'Animate components',
  url: 'http://jeffersonlicet.com/reacto-motion-layout',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'jeffersonlicet', // Usually your GitHub org/user name.
  projectName: 'React Motion Layout', // Usually your repo name.
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/dracula'),
    },
    disableDarkMode: true,
    navbar: {
      title: 'Motion Layout',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.png',
      },
      links: [
        {
          to: 'docs/installation',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          to: 'examples/feed',
          activeBasePath: 'examples/feed',
          label: 'Examples',
          position: 'left',
        },
        {
          href: 'https://github.com/jeffersonlicet/react-motion-layout',
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
            {
              label: 'Installation',
              to: 'docs/installation',
            },
            {
              label: 'Animating components',
              to: 'docs/animating',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Credits',
              href: 'credits/libs',
            },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/react-motion-layout',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/jeffersonlicet/react-motion-layout',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/jeffersonlicet',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Jefferson Licet. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  stylesheets: [
    'https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css',
    'https://fonts.googleapis.com/css?family=Baloo+Chettan+2:400,700&display=swap',
  ],
};
