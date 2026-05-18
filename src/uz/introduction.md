---
title: Kirish
description: Dasturlash tamoyillari (SOLID, DRY, KISS, YAGNI va boshqalar) bo'yicha to'liq va mukammal qo'llanma.
icon: Palette
---

# Dasturlash tamoyillariga kirish

<CoverImage src="/covers/getting-started/introduction.png" alt="Cover">
  <h1>Kirish</h1>
  <p>Dasturlash tamoyillarini ifodalovchi rang-barang va yorqin tugmalarga ega ulkan boshqaruv paneli va undagi slayderni baxtli boshqarayotgan kichik robot operatori.</p>
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
    image="/cards/introduction.png"
  />
  <Card
    title="Yagona javobgarlik (SRP)"
    description="Klass faqat bitta o'zgarish sababiga ega bo'lishi kerak."
    href="/uz/solid/srp"
    image="/cards/singleton.png"
  />
  <Card
    title="Ochiq-yopiq (OCP)"
    description="Kengaytirish uchun ochiq, o'zgartirish uchun yopiq bo'lish."
    href="/uz/solid/ocp"
    image="/cards/factory-method.png"
  />
  <Card
    title="Liskov o'rnini bosish (LSP)"
    description="Subklasslar ota klasslar o'rnini to'liq bosa olishi kerak."
    href="/uz/solid/lsp"
    image="/cards/prototype.png"
  />
  <Card
    title="Interfeysni ajratish (ISP)"
    description="Mijoz o'zi ishlatmaydigan metodlarga majburlanmasligi kerak."
    href="/uz/solid/isp"
    image="/cards/abstract-factory.png"
  />
  <Card
    title="Qaramlikni inversiya qilish (DIP)"
    description="Konkretlikka emas, abstraktsiyalarga bog'liq bo'ling."
    href="/uz/solid/dip"
    image="/cards/dependency-injection.png"
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
    image="/cards/iterator.png"
  />
  <Card
    title="KISS (Oddiy saqlang)"
    description="Oddiylik eng oliy maqsaddir; ortiqcha mantiqlardan qoching."
    href="/uz/general/kiss"
    image="/cards/mediator.png"
  />
  <Card
    title="YAGNI (Kerak bo'lmaydi)"
    description="Imkoniyatlarni faqat kerak bo'lgandagina qo'shing, oldindan emas."
    href="/uz/general/yagni"
    image="/cards/null-object.png"
  />
  <Card
    title="Demetra qonuni"
    description="Faqat o'z do'stlaringiz bilan gaplashing; bog'liqlikni kamaytiring."
    href="/uz/general/law-of-demeter"
    image="/cards/observer.png"
  />
  <Card
    title="Mas'uliyatlarni ajratish (SoC)"
    description="Dasturni alohida vazifalarni bajaruvchi mustaqil qismlarga bo'ling."
    href="/uz/general/soc"
    image="/cards/mvc.png"
  />
  <Card
    title="Meros o'rniga kompozitsiya"
    description="Merosxo'rlikdan ko'ra ob'ektlarni kompozitsiya qilishni afzal ko'ring."
    href="/uz/general/composition-over-inheritance"
    image="/cards/decorator.png"
  />
  <Card
    title="Eng kam ajablanish (POLA)"
    description="API va modullar doimo kutilganidek harakat qilishini ta'minlang."
    href="/uz/general/least-astonishment"
    image="/cards/proxy.png"
  />
  <Card
    title="GRASP tamoyillari"
    description="Mas'uliyatlarni ob'ektlar orasida taqsimlashning 9 ta ko'rsatmasi."
    href="/uz/general/grasp"
    image="/cards/command.png"
  />
</Cards>

---

## Muhim ogohlantirish

Dasturlash tamoyillari — **mutloq qonunlar emas, balki tavsiyalardir**. Har bir qatorga SOLID, DRY yoki SoC qoidalarini ko'r-ko'rona tatbiq etish kodni o'ta chigal va tushunarsiz qilib yuborishi mumkin. Dasturlashning eng oliy maqsadi — **oddiylik va kodni oson saqlashdir (maintainability)**. Agar qandaydir tamoyil foyda berish o'rniga qiyinchilik tug'dirayotgan bo'lsa, undan voz kechib sodda yechimni tanlash eng to'g'ri yo'ldir.
