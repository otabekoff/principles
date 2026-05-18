export const en = {
  title: "Programming Principles",
  description: "Complete Reference Guide",
  label: 'English',
  lang: 'en',
  search: {
    translations: {
      button: { buttonText: 'Search', buttonAriaLabel: 'Search' },
      modal: {
        displayDetails: 'Display detailed list',
        resetButtonTitle: 'Reset search',
        backButtonTitle: 'Close search',
        noResultsText: 'No results found',
        footer: {
          selectText: 'to select',
          selectKeyAriaLabel: 'enter',
          navigateText: 'to navigate',
          navigateUpKeyAriaLabel: 'up arrow',
          navigateDownKeyAriaLabel: 'down arrow',
          closeText: 'to close',
          closeKeyAriaLabel: 'escape'
        }
      }
    }
  },
  themeConfig: {
    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'long',
        timeStyle: 'short',
        forceLocale: true
      }
    },
    outline: {
      level: 'deep',
      label: 'On this page'
    },
    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    },
    darkModeSwitchLabel: 'Appearance',
    lightModeSwitchTitle: 'Switch to light theme',
    darkModeSwitchTitle: 'Switch to dark theme',
    sidebarMenuLabel: 'Menu',
    returnToTopLabel: 'Return to top',
    langMenuLabel: 'Change language',
    skipToContentLabel: 'Skip to content',
    editLink: {
      pattern: 'https://github.com/otabekoff/principles/edit/main/:path',
      text: 'Edit this page on GitHub'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Quick Reference', link: '/quick-reference' },
      {
        text: 'More',
        items: [
          { text: 'Other projects', link: 'https://github.com/otabekoff' },
          { text: 'Support Us', link: 'https://tirikchilik.uz/uzhandy' }
        ]
      }
    ],
    sidebar: [
      { text: 'Other projects', link: 'https://github.com/otabekoff', target: '_blank', rel: 'noopener noreferrer' },
      { text: 'Support Us', link: 'https://tirikchilik.uz/uzhandy', target: '_blank', rel: 'noopener noreferrer' },
      {
        text: 'Getting Started',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Core concepts', link: '/core-concepts' },
          { text: 'Learning tour', link: '/learning-tour' },
          { text: 'Quick Reference', link: '/quick-reference' }
        ]
      },
      {
        text: 'SOLID',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/solid/introduction' },
          { text: 'Single Responsibility Principle (SRP)', link: '/solid/srp' },
          { text: 'Open-Closed Principle (OCP)', link: '/solid/ocp' },
          { text: 'Liskov Substitution Principle (LSP)', link: '/solid/lsp' },
          { text: 'Interface Segregation Principle (ISP)', link: '/solid/isp' },
          { text: 'Dependency Inversion Principle (DIP)', link: '/solid/dip' }
        ]
      },
      {
        text: 'General Principles',
        collapsed: false,
        items: [
          { text: 'DRY (Don\'t Repeat Yourself)', link: '/general/dry' },
          { text: 'KISS (Keep It Simple, Stupid)', link: '/general/kiss' },
          { text: 'YAGNI (You Aren\'t Gonna Need It)', link: '/general/yagni' },
          { text: 'Law of Demeter', link: '/general/law-of-demeter' },
          { text: 'Separation of Concerns (SoC)', link: '/general/soc' },
          { text: 'Composition over Inheritance', link: '/general/composition-over-inheritance' },
          { text: 'Principle of Least Astonishment', link: '/general/least-astonishment' },
          { text: 'GRASP', link: '/general/grasp' }
        ]
      }
    ],
    footer: {
      message: 'Released under the <a href="https://github.com/otabekoff/principles/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2025-present <a href="https://github.com/otabekoff">Otabek Sadiridinov</a>'
    }
  }
}
