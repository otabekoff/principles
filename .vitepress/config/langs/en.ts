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
        text: 'General Principles',
        collapsed: false,
        items: [
          { text: 'Abstraction Principle', link: '/general/abstraction-principle' },
          { text: 'Black Box', link: '/general/black-box' },
          { text: 'Code Reuse', link: '/general/code-reuse' },
          { text: 'DRY vs WET', link: '/general/dry-wet' },
          { text: 'Single Source of Truth (SSOT)', link: '/general/single-source-of-truth' },
          { text: 'KISS (Keep It Simple, Stupid)', link: '/general/kiss' },
          { text: 'YAGNI (You Aren\'t Gonna Need It)', link: '/general/yagni' },
          { text: 'Do The Simplest Thing That Could Possibly Work', link: '/general/do-simplest-thing' },
          { text: 'Separation of Concerns (SoC)', link: '/general/soc' },
          { text: 'Orthogonality', link: '/general/orthogonality' },
          { text: 'Robustness Principle (Postel\'s Law)', link: '/general/robustness-principle' },
          { text: 'Encapsulate What Changes', link: '/general/encapsulate-what-changes' },
          { text: 'Principle of Least Privilege', link: '/general/least-privilege' },
          { text: 'Principle of Least Astonishment', link: '/general/least-astonishment' }
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
        text: 'Pragmatic & Clean Code',
        collapsed: true,
        items: [
          { text: 'Coding Standards & Specs', link: '/pragmatic/coding-standards' },
          { text: 'Avoid Premature Optimization', link: '/pragmatic/premature-optimization' },
          { text: 'The Boy Scout Rule', link: '/pragmatic/boy-scout-rule' },
          { text: 'Code for the Maintainer', link: '/pragmatic/code-for-the-maintainer' },
          { text: 'Findability & Discoverability', link: '/pragmatic/findability-discoverability' },
          { text: 'Levels of Abstraction', link: '/pragmatic/level-of-abstraction' },
          { text: 'Make it Work, Right, Fast', link: '/pragmatic/make-it-work-right-fast' },
          { text: 'Good Code is Easy to Delete', link: '/pragmatic/easy-to-delete' },
          { text: 'Make Non-Breaking Changes', link: '/pragmatic/non-breaking-changes' },
          { text: 'Future Developers Will Copy You', link: '/pragmatic/future-developers' },
          { text: 'Type-Driven Development', link: '/pragmatic/type-driven-development' }
        ]
      },
      {
        text: 'Software Architecture',
        collapsed: true,
        items: [
          { text: 'Coupling', link: '/architecture/coupling' },
          { text: 'Cohesion', link: '/architecture/cohesion' },
          { text: 'GRASP', link: '/architecture/grasp' },
          { text: 'Law of Demeter', link: '/architecture/law-of-demeter' },
          { text: 'Composition over Inheritance', link: '/architecture/composition-over-inheritance' },
          { text: 'Encapsulation & Info Hiding', link: '/architecture/encapsulation-information-hiding' },
          { text: 'Command-Query Separation (CQS)', link: '/architecture/cqs' },
          { text: 'Inversion of Control (IoC)', link: '/architecture/inversion-of-control' },
          { text: 'Functional Core, Imperative Shell', link: '/architecture/functional-core-imperative-shell' },
          { text: 'Functional Purity', link: '/architecture/functional-purity' },
          { text: 'Event-Driven Architecture', link: '/architecture/event-driven-architecture' },
          { text: 'Strangler Fig', link: '/architecture/strangler-fig' },
          { text: 'Defensive & Offensive Programming', link: '/architecture/defensive-offensive-programming' },
          { text: 'Fail-Fast & Robustness', link: '/architecture/fail-fast-robustness' },
          { text: 'Reveal Intentions', link: '/architecture/reveal-intentions' }
        ]
      },
      {
        text: 'Testing & Quality',
        collapsed: true,
        items: [
          { text: 'FIRST Principles of Testing', link: '/testing/first-principles' },
          { text: 'Arrange, Act, Assert (3A)', link: '/testing/arrange-act-assert' },
          { text: 'The Test Pyramid', link: '/testing/test-pyramid' },
          { text: 'Pass the Tests & Testability', link: '/testing/pass-the-tests' },
          { text: 'Test-Driven Development (TDD)', link: '/testing/test-driven-development' },
          { text: 'Behavior-Driven Development (BDD)', link: '/testing/behavior-driven-development' },
          { text: 'Property-Based Testing', link: '/testing/property-based-testing' },
          { text: 'The ZOMBIES Strategy', link: '/testing/zombies-strategy' }
        ]
      },
      {
        text: 'Laws & Aphorisms',
        collapsed: true,
        items: [
          { text: 'Booch Method', link: '/laws/booch-method' },
          { text: 'Brooks\'s Law', link: '/laws/brookss-law' },
          { text: 'Chesterton\'s Fence', link: '/laws/chestertons-fence' },
          { text: 'Conway\'s Law', link: '/laws/conways-law' },
          { text: 'Curly\'s Law', link: '/laws/curlys-law' },
          { text: 'Deutsch Limit', link: '/laws/deutsch-limit' },
          { text: 'Gall\'s Law', link: '/laws/galls-law' },
          { text: 'Hofstadter\'s Law', link: '/laws/hofstadters-law' },
          { text: 'Hyrum\'s Law', link: '/laws/hyrums-law' },
          { text: 'If It Ain\'t Broke, Don\'t Fix It', link: '/laws/if-it-aint-broke' },
          { text: 'Mechanism and Policy', link: '/laws/mechanism-policy' },
          { text: 'Pristine Sources', link: '/laws/pristine-sources' },
          { text: 'Rule of Three', link: '/laws/rule-of-three' },
          { text: 'The Ninety-Ninety Rule', link: '/laws/ninety-ninety-rule' },
          { text: 'The Power of 10 Safety Rules', link: '/laws/power-of-10' },
          { text: 'The Unix Philosophy', link: '/laws/unix-philosophy' },
          { text: 'The Zen of Python', link: '/laws/zen-of-python' },
          { text: 'Uniform Access Principle', link: '/laws/uniform-access' },
          { text: 'Worse is Better', link: '/laws/worse-is-better' },
          { text: 'Zero-One-Infinity Rule', link: '/laws/zero-one-infinity' }
        ]
      }
    ],
    footer: {
      message: 'Released under the <a href="https://github.com/otabekoff/principles/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2025-present <a href="https://github.com/otabekoff">Otabek Sadiridinov</a>'
    }
  }
}
