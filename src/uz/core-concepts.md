---
title: Asosiy tushunchalar
description: Dasturlash tamoyillari nima ekanligi, ular qayerdan kelib chiqqani va dizayn andozalaridan qanday farq qilishi haqida aniq tushuntirish.
icon: Shapes
---

# Asosiy tushunchalar

<CoverImage src="/covers/getting-started/core-concepts.webp" alt="Asosiy tushunchalar">
  <h1>Asosiy tushunchalar</h1>
  <p>Shinam yog'och ustaxonadagi kichkina oq robot porlayotgan qurilish bloklarini tartibli tortmalarga saralamoqda; har bir tortmada o'ziga xos oddiy belgi bor, tepada esa ozoda diagrammalar chizilgan katta yozuv taxtasi osilgan.</p>
</CoverImage>

**Dasturlash tamoyili (programming principle)** — dasturchilarga toza, oson saqlanadigan va mustahkam tizimlar loyihalashda yordam beradigan fundamental hayotiy qoida, ko'rsatma yoki eng yaxshi amaliyotdir. Muayyan muammolar uchun aniq tuzilmaviy shablon bo'lgan dizayn andozalaridan farqli o'laroq, tamoyillar barcha dasturlash paradigmalari va vaziyatlarga taalluqli bo'lgan umumiyroq, yuqori darajadagi ko'rsatmalardir.

Arxitektura uslubi bilan qurilish me'yorlari o'rtasidagi farqni tasavvur qiling. Arxitektura uslubi (masalan, gotika yoki modernizm) aniq dizayn tuzilmalarini belgilaydi — bu **dizayn andozasiga** o'xshaydi. Qurilish me'yorlari (xavfsiz chiqish yo'llari, mustahkam poydevor va to'g'ri shamollatishni talab qiladigan qoidalar) esa har bir bino xavfsiz va foydalanishga yaroqli bo'lishi uchun amal qilishi shart bo'lgan umumiy qoidalardir — bular **tamoyillar**.

## Tamoyil nima beradi

Yaxshi dasturlash tamoyili quyidagilarni taqdim etadi:

- **Aniqlik** — kodni o'qilishi va tushunilishi oson bo'ladigan qilib tuzish bo'yicha yo'l-yo'riq.
- **Saqlanuvchanlik** — kodni vaqt o'tishi bilan minimal qiyinchilik bilan o'zgartirish mumkin bo'lishini ta'minlaydigan strategiyalar.
- **Mustahkamlik** — yangi imkoniyatlar qo'shilganda xatolar va regressiyalarning oldini oladigan usullar.
- **Bog'liqlikni kamaytirish (decoupling)** — tizimning turli qismlarini bir-biridan ajratib, ularning mustaqil rivojlanishiga imkon beradigan yo'llar.

## Tamoyillar qayerdan kelib chiqqan

Ko'plab fundamental dasturlash tamoyillari XX asr oxirida obyektga yo'naltirilgan dizayn bilan birga paydo bo'lgan.

- **SOLID** 2000-yillar boshida Robert C. Martin (Uncle Bob) tomonidan jamlangan. U dasturiy ta'minot dizaynini tushunarliroq, moslashuvchanroq va oson saqlanadigan qiladigan beshta asosiy tamoyilni (SRP, OCP, LSP, ISP, DIP) birlashtiradi.
- **DRY (Don't Repeat Yourself — Takrorlamang)** atamasini Andy Hunt va Dave Thomas o'zlarining *The Pragmatic Programmer* kitobida kiritgan.
- **KISS (Keep It Simple, Stupid — Oddiy saqlang)** dastlab 1960-yilda AQSh Harbiy-dengiz kuchlari tomonidan qayd etilgan dizayn tamoyili edi.
- **YAGNI (You Aren't Gonna Need It — Sizga bu kerak bo'lmaydi)** Extreme Programming (XP) amaliyotlaridan kelib chiqqan.

## Tamoyillar va andozalar

Bu farqni aniq tushunib olish muhim:

- **Tamoyillar** — falsafiy ko'rsatmalar. Ular kodingiz *qanday* sifatlarga ega bo'lishi kerakligini aytadigan hayotiy qoidalardir (masalan, "modul o'zgarishi uchun faqat bitta sabab bo'lishi kerak" yoki "narsalarni oddiy saqlang"). Ular mavhum va juda moslashuvchan.
- **Andozalar** — aniq, qayta ishlatiladigan dizaynlar. Ular muayyan muammoni muayyan usulda hal qiladigan aniq shablonlardir (masalan, algoritmlarni ish vaqtida almashtirish uchun *Strategy* andozasidan foydalanish). Andozalar ko'pincha asosdagi tamoyillarning amaliy qo'llanilishidir.

Masalan, **Qaramlikni inversiya qilish tamoyili (DIP)** — konkret narsalarga emas, abstraksiyalarga bog'liq bo'lishni buyuradigan *tamoyil*. **Dependency Injection (DI)** yoki **Service Locator** esa bu tamoyilga amalda erishishga yordam beradigan *andozalardir*.

## Nega ularni o'rganish kerak

Dasturlash tamoyillarini o'rganish dasturiy muhandislik sezgingizni charxlaydi. U "kod hidlari"ni (code smells) xatolarga yoki qotib qolgan tizimlarga olib kelmasidan oldin payqashga yordam beradi. Jamoangiz bilan kodni muhokama qilayotganda "SRP buzilmoqda" yoki "muddatidan oldin optimallashtirish (YAGNI buzilishi)" kabi atamalar dizayndagi murosalarni tez baholash uchun aniq va umumiy lug'atni taqdim etadi.

## Keng tarqalgan tanqidlar va noto'g'ri qo'llashlar

Tamoyillar juda foydali, lekin ularni suiiste'mol qilish oson:

**Aqidaparastlarcha amal qilish:** Kontekst yoki loyiha ko'lamini hisobga olmasdan tamoyillarga ko'r-ko'rona amal qilish haddan tashqari murakkablashtirishga (over-engineering) olib kelishi mumkin. Masalan, SRPni mukammal bajarish uchun klasslarni haddan tashqari mayda bo'laklarga ajratish minglab kichkina klasslarga olib keladi va ularda yo'l topish imkonsiz bo'lib qoladi.

**Muddatidan oldin qo'llash:** Tamoyillarni juda erta — talablar yoki domen modeli barqarorlashmasidan oldin — qo'llash oxir-oqibat noto'g'ri bo'lib chiqadigan qotib qolgan abstraksiyalarga olib kelishi mumkin. Ba'zan to'g'ri abstraksiya ayon bo'lmaguncha kodni vaqtincha takrorlash (DRYni buzish) yaxshiroqdir.

**Tahlil falaji:** Ishlaydigan dasturni chiqarish o'rniga oddiy skriptni har bir SOLID tamoyiliga mukammal moslashtirishga juda ko'p vaqt sarflash.

## Tamoyillar qanday tasniflanadi

Dasturlash tamoyillari odatda ikkita asosiy toifaga bo'linadi:

- **SOLID tamoyillari** — obyektga yo'naltirilgan va modul darajasidagi dizaynga qaratilgan beshta asosiy tamoyil:
  - **SRP** (Yagona javobgarlik tamoyili)
  - **OCP** (Ochiq-yopiq tamoyili)
  - **LSP** (Liskov o'rnini bosish tamoyili)
  - **ISP** (Interfeysni ajratish tamoyili)
  - **DIP** (Qaramlikni inversiya qilish tamoyili)
- **Umumiy va amaliy tamoyillar** — toza kod va tizimlar uchun yuqori darajadagi ko'rsatmalar:
  - **DRY** (Takrorlamang)
  - **KISS** (Oddiy saqlang)
  - **YAGNI** (Sizga bu kerak bo'lmaydi)
  - **Demetra qonuni** (Eng kam bilim)
  - **Mas'uliyatlarni ajratish** (SoC)
  - **Meros o'rniga kompozitsiya**
  - **Eng kam ajablantirish**
  - **GRASP** (Javobgarlikni taqsimlashning umumiy andozalari)
