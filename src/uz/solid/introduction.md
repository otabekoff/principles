---
title: SOLID tamoyillariga kirish
description: Obyektga yo'naltirilgan dizayn va dasturlashning beshta asosiy tamoyili.
icon: Grid
---

# SOLID tamoyillariga kirish

<CoverImage src="/covers/solid/introduction.webp" alt="SOLID tamoyillariga kirish">
  <h1>SOLID tamoyillariga kirish</h1>
  <p>Beshta kichkina oq robotning har biri bittadan katta, porlayotgan ustunni ko'tarib turibdi va ular birgalikda kichik, mustahkam ibodatxona tomini tutib turishibdi.</p>
</CoverImage>

SOLID — bu obyektga yo'naltirilgan dizayn va dasturlashning beshta asosiy tamoyili bo'lib, ular 2000-yillarning boshlarida Robert C. Martin (Uncle Bob) tomonidan to'plangan. Ushbu tamoyillar klasslar tuzilishini loyihalashda amal qilinishi kerak bo'lgan qoidalar va eng yaxshi amaliyotlar to'plamidir.

Ushbu beshta tamoyil quyidagilardan iborat:

1. **[Yagona javobgarlik tamoyili (SRP)](/uz/solid/srp)**: Klass faqat bitta o'zgarish sababiga ega bo'lishi kerak.
2. **[Ochiq-yopiq tamoyili (OCP)](/uz/solid/ocp)**: Dasturiy ta'minot ob'ektlari kengaytirish uchun ochiq, lekin o'zgartirish uchun yopiq bo'lishi kerak.
3. **[Liskov o'rnini bosish tamoyili (LSP)](/uz/solid/lsp)**: Superklass ob'ektlarini uning subklasslari ob'ektlari bilan dastur ishini buzmagan holda almashtirish mumkin bo'lishi kerak.
4. **[Interfeysni ajratish tamoyili (ISP)](/uz/solid/isp)**: Mijoz o'zi ishlatmaydigan metodlarga bog'lanib qolishga majburlanmasligi kerak.
5. **[Qaramlikni inversiya qilish tamoyili (DIP)](/uz/solid/dip)**: Yuqori darajadagi modullar quyi darajadagi modullarga bog'liq bo'lmasligi kerak. Ikkalasi ham abstraktsiyalarga bog'liq bo'lishi kerak.

## Nima uchun SOLID muhim?

SOLID tamoyillari dasturchilarga quyidagilarga yordam beradi:
- Qattiq bog'liqlik va moslashuvchanlikning yo'qligidan qochish.
- Sinovdan o'tkazish va saqlash oson bo'lgan tizimlarni yaratish.
- Komponentlarni mustaqil ravishda almashtirish yoki yangilash mumkin bo'lgan modulli tizimlarni loyihalash.
- Kod bazalarini toza va bashorat qilinadigan qilish orqali jamoaviy ishni rivojlantirish.

Keyingi bo'limlarda biz real misollar, diagrammalar va aniq kodlar orqali har bir tamoyilni chuqur o'rganamiz.
