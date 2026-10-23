---
title: GRASP
description: GRASP (General Responsibility Assignment Software Patterns) tamoyillari bo'yicha to'liq qo'llanma.
icon: Zap
---

# GRASP

<CoverImage src="/covers/architecture/grasp.webp" alt="GRASP">
  <h1>GRASP</h1>
  <p>Qurilish maydonidagi kichkina oq robot usta har bir vazifani aynan unga kerakli asboblar va chizmalarga ega bo'lgan sherik robotga topshirmoqda.</p>
</CoverImage>

> **GRASP** — **General Responsibility Assignment Software Patterns (Mas'uliyatni taqsimlashning umumiy dasturiy naqshlari/tamoyillari)** so'zlarining qisqartmasidir.

Craig Larman tomonidan taklif qilingan GRASP — bu obyektga yo'naltirilgan loyihalashda klasslar va ob'ektlarga mas'uliyatlarni (metodlar va vazifalarni) to'g'ri va mantiqiy taqsimlashga yordam beradigan 9 ta asosiy tamoyillar to'plamidir.

## To'qqizta GRASP tamoyili

GRASP kod yozishda eng asosiy savolga javob beradi: **"Ushbu metod yoki vazifa qaysi klass ichida turishi kerak?"**

1. **Axborot eksperti (Information Expert)**: Mas'uliyat ushbu vazifani bajarish uchun eng ko'p ma'lumotga ega bo'lgan klassga berilishi kerak.
2. **Yaratuvchi (Creator)**: Agar `B` klassi `A` klassini o'z ichiga olsa yoki undan ko'p foydalansa, `A` ob'ektini yaratish mas'uliyati `B` klassiga beriladi.
3. **Nazoratchi (Controller)**: Tizim voqealari va foydalanuvchi harakatlarini qabul qilib, ularni muvofiqlashtiruvchi sinf (Controller).
4. **Kuchsiz bog'liqlik (Low Coupling)**: Klasslar bir-biriga iloji boricha kamroq bog'liq bo'lishini ta'minlash.
5. **Yuqori uyg'unlik (High Cohesion)**: Klass faqat bitta mantiqiy ishga yo'naltirilgan bo'lishi (SRP kabi).
6. **Polimorfizm (Polymorphism)**: Harakatlar turiga qarab o'zgarganda, konditsionallar o'rniga polimorfizmdan foydalanish.
7. **Sof uydirma (Pure Fabrication)**: Biznes sohasiga kirmaydigan, lekin loyihani toza saqlash uchun yaratiladigan yordamchi ob'ektlar (masalan, `UserRepository`, `Logger`).
8. **Bilvositalik (Indirection)**: Ikki komponent o'rtasidagi to'g'ridan-to'g'ri bog'liqlikni kamaytirish uchun oraga vositachi qo'shish.
9. **Himoyalangan o'zgarishlar (Protected Variations)**: Tizimni kutilayotgan o'zgarishlardan interfeyslar orqali himoya qilish.
