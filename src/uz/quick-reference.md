---
title: Tezkor ma'lumotnoma
description: Barcha asosiy SOLID, Umumiy va GRASP dasturlash tamoyillari uchun qisqacha qo'llanma va shpargalka.
icon: BookMarked
---

# Tezkor ma'lumotnoma

<CoverImage src="/covers/getting-started/quick-reference.webp" alt="Tezkor ma'lumotnoma">
  <h1>Tezkor ma'lumotnoma</h1>
  <p>Kichkina oq robot ulkan cho'ntak qo'llanmasini varaqlamoqda, uning sahifalari ochilganda kichik 3D rasmlarga aylanib chiqadi; robotning bir qo'lida lupa, kitobdan esa binafsha rang xatcho'p lentasi osilib turibdi.</p>
</CoverImage>

Eng muhim dasturlash tamoyillari uchun qisqa shpargalka. Ushbu jadvallardan tamoyillarni ko'rib chiqish, qoidabuzarliklarni (kod hidlarini) aniqlash va eng yaxshi yechimlarni bir qarashda topish uchun foydalaning.

---

## SOLID Tamoyillari Shpargalkasi

| Tamoyil | Asosiy maqsad | Xato belgilari (Code Smell) | Eng yaxshi yechim / Andoza |
| :--- | :--- | :--- | :--- |
| **SRP** (Yagona javobgarlik) | Klass/modulning o'zgarishi uchun faqat bitta sabab bo'lishi kerak. | UI, baza va xat yuborishni bitta o'zida bajaruvchi ulkan klasslar. | Mas'uliyatlarni alohida klasslarga (servis, repozitoriy) ajratish. |
| **OCP** (Ochiq-yopiq) | Kengaytirish uchun ochiq, o'zgartirish uchun yopiq bo'lish. | Yangi tur qo'shilganda tahrirlanadigan ulkan `switch` yoki `if-else` bloklari. | Polimorfizm, interfeyslar va **Strategiya** kabi dizayn andozalari. |
| **LSP** (Liskov o'rnini bosish) | Subklasslar ota klasslar o'rnini to'liq bosa olishi kerak. | `NotImplementedException` otuvchi yoki ota klass qoidalarini buzuvchi subklasslar. | Meros o'rniga kompozitsiyani tanlash yoki mustaqil interfeyslar yaratish. |
| **ISP** (Interfeyslarni ajratish) | Mijoz o'zi ishlatmaydigan metodlarga bog'lanib qolmasligi kerak. | Bo'sh yoki "soxta" metodlarni majburlab yozdiruvchi ulkan interfeyslar. | Katta interfeyslarni kichik, maqsadli interfeyslarga bo'lish. |
| **DIP** (Qaramlikni inversiya qilish) | Konkretlikka emas, abstraktsiyaga bog'liq bo'lish. | Yuqori darajadagi mantiqning quyi darajadagi klasslarni bevosita yaratishi (`new` qilish). | **Qaramlikni inyeksiya qilish (DI)** va umumiy interfeyslardan foydalanish. |

---

## Umumiy va Amaliy Tamoyillar

| Tamoyil | Asosiy maqsad | Xato belgilari | Eng yaxshi yechim |
| :--- | :--- | :--- | :--- |
| **DRY** (Takrorlamang) | Har bir bilim yoki mantiq tizimda yagona ko'rinishga ega bo'lishi kerak. | Frontend, backend va bazada bir xil validatsiya mantiqlarining takrorlanishi. | Takrorlangan bilimlarni yagona avtoritetli modulga birlashtirish. |
| **KISS** (Oddiy saqlang) | Tizimni iloji boricha sodda saqlash, murakkablikdan qochish. | Haddan tashqari "aqlli" bir qatorli kodlar, keraksiz abstraktsiya qatlamlari. | Tushunarli va to'g'ridan-to'g'ri kod yozish. Qisqalikdan ko'ra o'qiluvchanlikni afzal ko'rish. |
| **YAGNI** (Kerak bo'lmaydi) | Narsalarni faqat ularga ehtiyoj tug'ilganda yarating, oldindan emas. | "Har ehtimolga qarshi" deb har xil eksportlar yoki audit loglar yozib qo'yish. | Faqat joriy tasdiqlangan talablarni bajarish. Kodni kelajakda kengaytirish uchun toza saqlash. |
| **Demetra qonuni** (LoD) | "Faqat bevosita yaqin do'stlar bilan gaplashing". | Boshqa ob'ektlarning ichki ob'ektlariga zanjir bo'lib murojaat qilish (`a.getB().getC().do()`). | Bevosita ob'ektga mas'uliyatni topshirish (`a.doAction()`). |
| **Mas'uliyatlarni ajratish** (SoC) | Tizimni turli vazifalarni bajaruvchi mustaqil qismlarga bo'lish. | SQL so'rovlar, HTML dizayn va biznes qoidalarning bir joyda qorishib ketishi. | Qatlamli arxitekturalardan foydalanish (masalan, MVC, Clean Architecture). |
| **Meros o'rniga kompozitsiya** | Kodni qayta ishlatishda vorislikdan ko'ra kompozitsiyani tanlash. | Juda chuqur va qattiq bog'langan merosxo'rlik daraxtlari. | Ob'ektlarni interfeyslar orqali bog'lab, mas'uliyatlarni delegatsiya qilish. |
| **Eng kam ajablanish tamoyili** | Kod va APIlar foydalanuvchi kutganidek harakat qilishi kerak. | O'qish metodi ichida bazani o'zgartirish, nomlashdagi chalkashliklar. | Izchil nomlash qoidalari, sof funktsiyalar va nojo'ya ta'sirlardan qochish. |

---

## GRASP Tamoyillari Shpargalkasi

| Tamoyil | Asosiy Savol | Qisqacha Ta'rif |
| :--- | :--- | :--- |
| **Axborot eksperti** | Buni kim bajarishi kerak? | Mas'uliyatni ushbu ish uchun kerakli ma'lumotga ega klassga topshiring. |
| **Yaratuvchi** | A ob'ektini kim yaratadi? | Agar B klassi A ob'ektlarini o'z ichiga olsa yoki yig'sa, A ni yaratishni B ga bering. |
| **Nazoratchi** | Tizim hodisalarini kim boshqaradi? | Tizim voqealarini qabul qilish va muvofiqlashtirishni maxsus Controller klassiga bering. |
| **Kuchsiz bog'liqlik** | Bog'liqlik ta'sirini qanday kamaytiramiz? | Klasslarni bir-biriga iloji boricha kamroq bog'lang. |
| **Yuqori uyg'unlik** | Ob'ektlarni qanday diqqatli saqlaymiz? | Klasslarni faqat bitta mantiqiy vazifaga yo'naltiring, ularni yuklamang. |
| **Polimorfizm** | Turlarga qarab o'zgarishlarni qanday hal qilamiz? | O'zgaruvchan xatti-harakatlarni shartli bloklar o'rniga polimorfizm orqali hal qiling. |
| **Sof uydirma** | Real ob'ektlar chalkashib ketsa nima qilamiz? | Sun'iy, yordamchi toza klasslar yarating (masalan, `UserRepository`). |
| **Bilvositalik** | Bevosita bog'liqlikdan qanday qochamiz? | Ikkala komponent orasiga vositachi ob'ekt qo'shing. |
| **Himoyalangan o'zgarishlar** | O'zgarishlardan qanday himoyalanamiz? | O'zgaruvchan nuqtalarni barqaror interfeyslar (abstraktsiyalar) bilan o'rang. |

---

::: tip
Dasturlash tamoyillari qat'iy qonunlar emas, balki tavsiyalardir. Har doim har bir qarorning foyda va zararlarini taroziga qo'ying va eng oliy maqsad **oddiylik** hamda **kodni oson saqlash** ekanligini unutmang.
:::
