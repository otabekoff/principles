---
title: O'rganish sayohati
description: Dasturlash tamoyillari bo'yicha yo'naltirilgan o'rganish sayohati — bu yerda nimalar bor va ulardan qanday samarali foydalanish kerak.
icon: BookOpen
---

# O'rganish sayohati

<CoverImage src="/covers/getting-started/learning-tour.webp" alt="O'rganish sayohati">
  <h1>O'rganish sayohati</h1>
  <p>Kichkina ryukzak taqqan va qo'lida qog'oz xarita ochib olgan kichkina oq robot porlayotgan binafsha rang toshlardan iborat egri-bugri so'qmoq bo'ylab sakrab bormoqda; so'qmoq bir qator mitti orollarni bog'laydi va har bir orolda o'ziga xos kichik yodgorlik qad rostlagan.</p>
</CoverImage>

Ushbu sayohat Dasturlash tamoyillari (Programming Principles) hujjatlari qanday tuzilganligini, har bir sahifada nimalar borligini va o'zingiz xohlagan narsaga qarab saytda qanday samarali harakat qilish kerakligini tushuntiradi.

## Nimalar qamrab olingan

Hujjatlar uchta asosiy toifadagi **14 ta fundamental dasturlash tamoyillarini** o'z ichiga oladi:

| Turkum                          | Soni               | Yo'nalishi                                                                                                  |
| :------------------------------ | :----------------- | :---------------------------------------------------------------------------------------------------------- |
| **SOLID tamoyillari**           | 5                  | Obyektga yo'naltirilgan loyihalashning oltin standartlari (SRP, OCP, LSP, ISP, DIP).                        |
| **Umumiy va Amaliy tamoyillar** | 8                  | Loyihani murakkablashtirmaslik uchun hayotiy qoidalar (DRY, KISS, YAGNI, Demetra qonuni, SoC va boshqalar). |
| **GRASP tamoyillari**           | 9 (bitta sahifada) | Mas'uliyatlarni ob'ektlar orasida to'g'ri taqsimlash uchun 9 ta asosiy ko'rsatma.                           |

## Sahifaning tuzilishi

Har bir tamoyil sahifasi o'qishni va skanerlashni osonlashtirish uchun bir xil toza tuzilishga ega:

```
Tavsif        — Tamoyilning qisqa va sodda tildagi ta'rifi.
Asosiy g'oya  — Ushbu tamoyilning nima uchun juda muhimligi.
Xato namunasi — Tamoyil buzilgan, yomon yozilgan kod namunasi.
To'g'ri yechim — Tamoyilga muvofiq qayta yozilgan (refaktor qilingan) kod.
Tahlil        — Tamoyilni qo'llashning foydalari va uning qiyinchiliklari.
Amaliyot      — Tamoyilni qachon chetga surish yoki biroz yumshatish mumkinligi.
```

## Qanday navigatsiya qilish kerak

### Kerakli tamoyilni topish

Agar siz loyihalashda aniq muammoga duch kelgan bo'lsangiz, lekin qaysi tamoyil yordam berishini bilmasangiz, [Tezkor ma'lumotnoma](/uz/quick-reference) sahifasiga o'ting. U har bir tamoyilning maqsadi, xato belgilari va yechimlarini jamlagan qisqa shpargalka vazifasini bajaradi.

### Qidiruv

Tizim bo'ylab tezkor qidirish uchun qidiruv satridan (`Cmd+K` Mac-da, `Ctrl+K` Windows-da) foydalaning. Siz tamoyillar nomlari, tushunchalar yoki "bog'liqlik", "takrorlanish" kabi kalit so'zlar orqali darhol kerakli sahifani topishingiz mumkin.

## Tavsiya etilgan o'rganish yo'llari

### Yangi boshlovchilar uchun

1. Avval [Asosiy tushunchalar](/core-concepts) sahifasini o'qib, tamoyil nimaligini va u dizayn andozalaridan (patterns) qanday farq qilishini bilib oling.
2. **KISS** (Oddiy saqlang) va **DRY** (Takrorlamang) tamoyillarini o'rganing — ularni har qanday kod bazasida darhol qo'llash juda oson.
3. Ortiqcha loyihalash va taxminiy kodlardan qochish uchun **YAGNI** tamoyilini o'rganing.
4. SOLID olamiga birinchi qadam sifatida **Yagona javobgarlik (SRP)** sahifasidan boshlang.

### Tajribali dasturchilar uchun

1. **Liskov o'rnini bosish (LSP)** va **Qaramlikni inversiya qilish (DIP)** tamoyillarini chuqur o'rganing. Ular eng ko'p noto'g'ri tushuniladigan qoidalar hisoblanadi.
2. Qattiq va moslashuvchan bo'lmagan vorislik zanjirlaridan qochish uchun **Meros o'rniga kompozitsiya** sahifasini o'qing.
3. Mas'uliyatlarni taqsimlashda to'g'ri intuitsiyaga ega bo'lish uchun **GRASP** qoidalarini ko'rib chiqing.

---

::: tip
Dasturlash tamoyillari dasturlash fikrlashingizni yo'naltirish uchun xizmat qiladi, kod satrlaringizni diktovka qilish uchun emas. Har doim mukammallikdan ko'ra **oddiylik**, **o'qiluvchanlik** va **amaliy foydani** ustun qo'ying.
:::
