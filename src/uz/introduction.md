---
title: Kirish
description: Dasturlash tamoyillari (SOLID, DRY, KISS, YAGNI va boshqalar) bo'yicha to'liq va mukammal qo'llanma.
icon: Palette
---

# Dasturlash tamoyillariga kirish

<CoverImage src="/covers/getting-started/introduction.webp" alt="Kirish">
  <h1>Kirish</h1>
  <p>Tong chog'ida tepalikda turgan kichkina oq robot qo'lidagi porlayotgan kompasni baland ko'tarib turibdi; kompas mili uzoqdagi toza, tartibli geometrik binolar shahrini ko'rsatmoqda, robotning ortida esa chirmashgan o'tlar va sochilgan simlardan iborat changalzor qolgan.</p>
</CoverImage>

**Dasturlash tamoyillari (Programming Principles)** — toza, mustahkam va oson saqlanadigan dasturiy ta'minot loyihalashda dasturchilarga yordam beradigan fundamental ko'rsatmalar va hayotiy qoidalar to'plamidir. Ular nusxa olib ishlatiladigan tayyor andozalar (patterns) emas — ular loyihalash jarayonida to'g'ri qarorlar qabul qilishga undaydigan dizayn falsafalaridir. Tamoyillar kodning haddan tashqari murakkablashib ketishining oldini oladi va jamoada yuqori sifatli kod yozish bo'yicha umumiy lug'atni shakllantiradi.

Ushbu qo'llanma eng muhim dasturlash tamoyillarini o'z ichiga oladi va ularni uchta toifaga ajratadi: **SOLID**, **Umumiy/Amaliy** va **GRASP**.

---

## SOLID Tamoyillari

Obyektga yo'naltirilgan dizaynning Robert C. Martin tomonidan tuzilgan oltin standarti. Ushbu beshta tamoyil klass va modullaringizning modulli, uyg'un va o'zgarishlarga bardoshli bo'lishini ta'minlaydi.

<Cards>
  <Card
    title="SOLIDga kirish"
    description="SOLID tamoyillarining tarixi va asosiy maqsadlari bilan tanishing."
    href="/uz/solid/introduction"
    image="/cards/solid/introduction.webp"
  />
  <Card
    title="Yagona javobgarlik (SRP)"
    description="Klass faqat bitta o'zgarish sababiga ega bo'lishi kerak."
    href="/uz/solid/srp"
    image="/cards/solid/srp.webp"
  />
  <Card
    title="Ochiq-yopiq (OCP)"
    description="Kengaytirish uchun ochiq, o'zgartirish uchun yopiq bo'lish."
    href="/uz/solid/ocp"
    image="/cards/solid/ocp.webp"
  />
  <Card
    title="Liskov o'rnini bosish (LSP)"
    description="Subklasslar ota klasslar o'rnini to'liq bosa olishi kerak."
    href="/uz/solid/lsp"
    image="/cards/solid/lsp.webp"
  />
  <Card
    title="Interfeysni ajratish (ISP)"
    description="Mijoz o'zi ishlatmaydigan metodlarga majburlanmasligi kerak."
    href="/uz/solid/isp"
    image="/cards/solid/isp.webp"
  />
  <Card
    title="Qaramlikni inversiya qilish (DIP)"
    description="Konkretlikka emas, abstraktsiyalarga bog'liq bo'ling."
    href="/uz/solid/dip"
    image="/cards/solid/dip.webp"
  />
</Cards>

---

## Umumiy va Amaliy Tamoyillar

Ushbu tamoyillar kodning kundalik tozaligi va soddaligiga qaratilgan bo'lib, loyihani asossiz murakkablashtirishdan va erta abstraktsiya qilishdan himoya qiladi.

<Cards>
  <Card
    title="DRY (Takrorlamang)"
    description="Har bir bilim yoki mantiq tizimda yagona vakillikka ega bo'lsin."
    href="/uz/general/dry"
    image="/cards/general/dry-wet.webp"
  />
  <Card
    title="KISS (Oddiy saqlang)"
    description="Oddiylik eng oliy maqsaddir; ortiqcha mantiqlardan qoching."
    href="/uz/general/kiss"
    image="/cards/general/kiss.webp"
  />
  <Card
    title="YAGNI (Kerak bo'lmaydi)"
    description="Imkoniyatlarni faqat kerak bo'lgandagina qo'shing, oldindan emas."
    href="/uz/general/yagni"
    image="/cards/general/yagni.webp"
  />
  <Card
    title="Mas'uliyatlarni ajratish (SoC)"
    description="Dasturni alohida vazifalarni bajaruvchi mustaqil qismlarga bo'ling."
    href="/uz/general/soc"
    image="/cards/general/soc.webp"
  />
  <Card
    title="Eng kam ajablanish (POLA)"
    description="API va modullar doimo kutilganidek harakat qilishini ta'minlang."
    href="/uz/general/least-astonishment"
    image="/cards/general/least-astonishment.webp"
  />
</Cards>

---

## Dasturiy ta'minot arxitekturasi

Kattaroq tizimlarni loyihalashda qo'llaniladigan arxitektura tamoyillari, bog'liqliklarni kamaytirish va mas'uliyatlarni taqsimlash qoidalari.

<Cards>
  <Card
    title="GRASP tamoyillari"
    description="Mas'uliyatlarni ob'ektlar orasida taqsimlashning 9 ta ko'rsatmasi."
    href="/uz/architecture/grasp"
    image="/cards/architecture/grasp.webp"
  />
  <Card
    title="Demetra qonuni"
    description="Faqat o'z do'stlaringiz bilan gaplashing; bog'liqlikni kamaytiring."
    href="/uz/architecture/law-of-demeter"
    image="/cards/architecture/law-of-demeter.webp"
  />
  <Card
    title="Meros o'rniga kompozitsiya"
    description="Merosxo'rlikdan ko'ra ob'ektlarni kompozitsiya qilishni afzal ko'ring."
    href="/uz/architecture/composition-over-inheritance"
    image="/cards/architecture/composition-over-inheritance.webp"
  />
</Cards>

---

## Muhim ogohlantirish

Dasturlash tamoyillari — **mutloq qonunlar emas, balki tavsiyalardir**. Har bir qatorga SOLID, DRY yoki SoC qoidalarini ko'r-ko'rona tatbiq etish kodni o'ta chigal va tushunarsiz qilib yuborishi mumkin. Dasturlashning eng oliy maqsadi — **oddiylik va kodni oson saqlashdir (maintainability)**. Agar qandaydir tamoyil foyda berish o'rniga qiyinchilik tug'dirayotgan bo'lsa, undan voz kechib sodda yechimni tanlash eng to'g'ri yo'ldir.
