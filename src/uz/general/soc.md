---
title: Mas'uliyatlarni ajratish (SoC)
description: Mas'uliyatlarni ajratish (Separation of Concerns) tamoyili bo'yicha to'liq qo'llanma.
icon: Layers
---

# Mas'uliyatlarni ajratish (SoC)

<CoverImage src="/covers/general/soc.webp" alt="Mas'uliyatlarni ajratish (SoC)">
  <h1>Mas'uliyatlarni ajratish (SoC)</h1>
  <p>Kichkina oq robot ulkan bento qutisini tartiblamoqda: har bir bo'limda alohida, ozoda taom joylashgan, bo'limlar orasida hech narsa aralashib ketmagan, ajratgichlardan esa qahrabo nur taralmoqda.</p>
</CoverImage>

> "Mas'uliyatlarni ajratish dasturlashdagi eng muhim masala hisoblanadi." — Edsger W. Dijkstra

**Mas'uliyatlarni ajratish (Separation of Concerns - SoC)** dasturni alohida bo'limlarga ajratish tamoyili bo'lib, bunda har bir bo'lim alohida muammo yoki vazifani hal qiladi. 

## Asosiy tushuncha

SoC yordamida yaratilgan tizimlarda komponentlar bir-biridan mustaqil bo'ladi va toza APIlar orqali bog'lanadi. Bu quyidagilarni ta'minlaydi:
- Bir qismga (masalan, UI dizayniga) kiritilgan o'zgarishlar boshqa qismga (masalan, ma'lumotlar bazasiga) ta'sir qilmaydi.
- Kod modulli, tushunish oson va testlashga juda qulay bo'ladi.

## Umumiy me'moriy qatlamlar

SoCning klassik tatbiqi dasturni quyidagi mustaqil qatlamlarga ajratishdir:
1. **Taqdimot qatlami (UI)**: Ma'lumotlarni ko'rsatish va foydalanuvchi kiritishini qabul qilish.
2. **Biznes mantiq qatlami (Domain)**: Tizimning asosiy qoidalari va hisob-kitoblari.
3. **Ma'lumotlar qatlami (Infrastructure)**: Bazalar, fayllar yoki tarmoq so'rovlari bilan ishlash.

MVC (Model-View-Controller) arxitekturasi ham SoC tamoyilining to'g'ridan-to'g'ri namunasidir.
