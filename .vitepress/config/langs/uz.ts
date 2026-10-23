export const uz = {
  title: "Dasturlash tamoyillari",
  description: "To'liq qo'llanma",
  label: 'O\'zbek',
  lang: 'uz',
  search: {
    translations: {
      button: { buttonText: 'Qidiruv', buttonAriaLabel: 'Qidiruv' },
      modal: {
        displayDetails: 'Batafsil ro\'yxatni ko\'rsatish',
        resetButtonTitle: 'Qidiruvni tozalash',
        backButtonTitle: 'Qidiruvni yopish',
        noResultsText: 'Natija topilmadi',
        footer: {
          selectText: 'tanlash uchun',
          selectKeyAriaLabel: 'kirish',
          navigateText: 'navigatsiya qilish uchun',
          navigateUpKeyAriaLabel: 'yuqoriga',
          navigateDownKeyAriaLabel: 'pastga',
          closeText: 'yopish uchun',
          closeKeyAriaLabel: 'chiqish'
        }
      }
    }
  },
  themeConfig: {
    lastUpdated: {
      text: 'Oxirgi yangilanish',
      formatOptions: {
        dateStyle: 'long',
        timeStyle: 'short',
        forceLocale: true
      }
    },
    outline: {
      level: 'deep',
      label: 'Ushbu sahifada'
    },
    docFooter: {
      prev: 'Oldingi sahifa',
      next: 'Keyingi sahifa'
    },
    darkModeSwitchLabel: 'Ko\'rinish',
    lightModeSwitchTitle: 'Yorug\' rejimga o\'tish',
    darkModeSwitchTitle: 'Qorong\'u rejimga o\'tish',
    sidebarMenuLabel: 'Menyu',
    returnToTopLabel: 'Yuqoriga qaytish',
    langMenuLabel: 'Tilni o\'zgartirish',
    skipToContentLabel: 'Asosiy kontentga o\'tish',
    editLink: {
      pattern: 'https://github.com/otabekoff/principles/edit/main/src/:path',
      text: 'Ushbu sahifani GitHubda tahrirlash'
    },
    nav: [
      { text: 'Bosh sahifa', link: '/uz/' },
      { text: 'Tezkor ma\'lumotnoma', link: '/uz/quick-reference' },
      {
        text: 'Ko\'proq',
        items: [
          { text: 'Boshqa loyihalar', link: 'https://github.com/otabekoff' },
          { text: 'Qo\'llab-quvvatlash', link: 'https://taps.uz/uzhandy' }
        ]
      }
    ],
    sidebar: [
      {
        text: 'Boshlash',
        collapsed: false,
        items: [
          { text: 'Kirish', link: '/uz/introduction' },
          { text: 'Asosiy tushunchalar', link: '/uz/core-concepts' },
          { text: 'Sayohat', link: '/uz/learning-tour' },
          { text: 'Tezkor ma\'lumotnoma', link: '/uz/quick-reference' }
        ]
      },
      {
        text: 'SOLID tamoyillari',
        collapsed: false,
        items: [
          { text: 'Kirish', link: '/uz/solid/introduction' },
          { text: 'Yagona javobgarlik tamoyili (SRP)', link: '/uz/solid/srp' },
          { text: 'Ochiq-yopiq tamoyili (OCP)', link: '/uz/solid/ocp' },
          { text: 'Liskov o\'rnini bosish tamoyili (LSP)', link: '/uz/solid/lsp' },
          { text: 'Interfeysni ajratish tamoyili (ISP)', link: '/uz/solid/isp' },
          { text: 'Qaramlikni inversiya qilish tamoyili (DIP)', link: '/uz/solid/dip' }
        ]
      },
      {
        text: 'Umumiy tamoyillar',
        collapsed: false,
        items: [
          { text: 'DRY (Takrorlamang)', link: '/uz/general/dry' },
          { text: 'KISS (Oddiy saqlang)', link: '/uz/general/kiss' },
          { text: 'YAGNI (Sizga bu kerak bo\'lmaydi)', link: '/uz/general/yagni' },
          { text: 'Mas\'uliyatlarni ajratish (SoC)', link: '/uz/general/soc' },
          { text: 'Eng kam ajablantirish tamoyili', link: '/uz/general/least-astonishment' }
        ]
      },
      {
        text: 'Dasturiy ta\'minot arxitekturasi',
        collapsed: true,
        items: [
          { text: 'GRASP tamoyillari', link: '/uz/architecture/grasp' },
          { text: 'Demetra qonuni', link: '/uz/architecture/law-of-demeter' },
          { text: 'Meros o\'rniga kompozitsiya', link: '/uz/architecture/composition-over-inheritance' }
        ]
      }
    ],
    footer: {
      message: '<a href="https://github.com/otabekoff/principles/blob/main/LICENSE">MIT Litsenziyasi</a> ostida tarqatilgan.',
      copyright: 'Mualliflik huquqi © 2025-hozirga qadar <a href="https://github.com/otabekoff">Otabek Sadiridinov</a>'
    }
  }
}
