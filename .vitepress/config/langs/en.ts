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
          { text: 'Abstraction Principle', link: '/general/abstraction-principle' },
          { text: 'Black Box', link: '/general/black-box' },
          { text: 'DRY (Don\'t Repeat Yourself)', link: '/general/dry' },
          { text: 'KISS (Keep It Simple, Stupid)', link: '/general/kiss' },
          { text: 'YAGNI (You Aren\'t Gonna Need It)', link: '/general/yagni' },
          { text: 'Law of Demeter', link: '/general/law-of-demeter' },
          { text: 'Separation of Concerns (SoC)', link: '/general/soc' },
          { text: 'Composition over Inheritance', link: '/general/composition-over-inheritance' },
          { text: 'Principle of Least Astonishment', link: '/general/least-astonishment' },
          { text: 'GRASP', link: '/general/grasp' }
        ]
      },
      {
        text: 'Pragmatic & Clean Code',
        collapsed: true,
        items: [
          { text: 'Avoid Premature Optimization', link: '/pragmatic/premature-optimization' },
          { text: 'The Boy Scout Rule', link: '/pragmatic/boy-scout-rule' },
          { text: 'WET (Write Everything Twice)', link: '/pragmatic/wet-principle' },
          { text: 'Levels of Abstraction', link: '/pragmatic/level-of-abstraction' },
          { text: 'Make it Work, Right, Fast', link: '/pragmatic/make-it-work-right-fast' },
          { text: 'Good Code is Easy to Delete', link: '/pragmatic/easy-to-delete' },
          { text: 'Make Non-Breaking Changes', link: '/pragmatic/non-breaking-changes' },
          { text: 'Future Developers Will Copy You', link: '/pragmatic/future-developers' }
        ]
      },
      {
        text: 'Testing & Quality',
        collapsed: true,
        items: [
          { text: 'Pass the Tests & Testability', link: '/testing/pass-the-tests' },
          { text: 'Test-Driven Development (TDD)', link: '/testing/test-driven-development' },
          { text: 'The ZOMBIES Strategy', link: '/testing/zombies-strategy' }
        ]
      },
      {
        text: 'Software Architecture',
        collapsed: true,
        items: [
          { text: 'Coupling and Cohesion', link: '/architecture/coupling-cohesion' },
          { text: 'Functional Core, Imperative Shell', link: '/architecture/functional-core-imperative-shell' },
          { text: 'Command-Query Separation (CQS)', link: '/architecture/cqs' },
          { text: 'Defensive & Offensive Programming', link: '/architecture/defensive-offensive-programming' },
          { text: 'Inversion of Control (IoC)', link: '/architecture/inversion-of-control' },
          { text: 'Encapsulation & Info Hiding', link: '/architecture/encapsulation-information-hiding' },
          { text: 'Fail-Fast & Robustness', link: '/architecture/fail-fast-robustness' },
          { text: 'Reveal Intentions', link: '/architecture/reveal-intentions' }
        ]
      },
      {
        text: 'Laws & Aphorisms',
        collapsed: true,
        items: [
          { text: 'Booch Method', link: '/laws/booch-method' },
          { text: 'Gall\'s Law', link: '/laws/galls-law' },
          { text: 'The Ninety-Ninety Rule', link: '/laws/ninety-ninety-rule' },
          { text: 'Worse is Better', link: '/laws/worse-is-better' },
          { text: 'Rule of Three', link: '/laws/rule-of-three' },
          { text: 'Zero-One-Infinity Rule', link: '/laws/zero-one-infinity' },
          { text: 'Uniform Access Principle', link: '/laws/uniform-access' },
          { text: 'The Power of 10 Safety Rules', link: '/laws/power-of-10' },
          { text: 'Mechanism and Policy', link: '/laws/mechanism-policy' },
          { text: 'The Zen of Python', link: '/laws/zen-of-python' },
          { text: 'If It Ain\'t Broke, Don\'t Fix It', link: '/laws/if-it-aint-broke' }
        ]
      }
    ],
    footer: {
      message: 'Released under the <a href="https://github.com/otabekoff/principles/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2025-present <a href="https://github.com/otabekoff">Otabek Sadiridinov</a>'
    }
  }
}
