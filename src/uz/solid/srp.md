---
title: Yagona javobgarlik tamoyili (SRP)
description: Yagona javobgarlik tamoyili (Single Responsibility Principle) bo'yicha to'liq qo'llanma.
icon: Target
---

# Yagona javobgarlik tamoyili (SRP)

> "Klassning o'zgarishi uchun faqat bitta sabab bo'lishi kerak." — Robert C. Martin

**Yagona javobgarlik tamoyili (SRP)** — toza, modulli va oson saqlanadigan dasturiy ta'minot yaratishning eng muhim qoidalaridan biridir. U har bir modul, klass yoki funktsiya dastur tomonidan taqdim etiladigan funktsionallikning faqat bitta qismi uchun javobgar bo'lishi va bu javobgarlik to'liq klass ichiga olingan bo'lishi kerakligini belgilaydi.

## Asosiy tushuncha

SRPdagi "javobgarlik" so'zi ba'zan chalkashliklarga olib kelishi mumkin. Buni tushunishning eng yaxshi usuli — uni **o'zgarish sabablari** nuqtai nazaridan ko'rib chiqishdir.

Agar klass uchta turli xil ishni bajarsa, ushbu talablarning istalgan biriga kiritilgan o'zgartirish klassni tahrirlashni talab qiladi. Bu esa boshqa bog'liq bo'lmagan qismlarda xatoliklarning paydo bo'lish xavfini oshiradi.

### Noto'g'ri namuna (Violates SRP)

Foydalanuvchi ma'lumotlarini saqlaydigan, bazaga yozadigan va xat jo'natadigan klass:

```ts
// ❌ SRPga zid
class User {
  constructor(public name: string, public email: string) {}

  saveToDatabase() {
    console.log(`${this.name} ma'lumotlar bazasiga saqlanmoqda...`);
  }

  sendWelcomeEmail() {
    console.log(`${this.email} manziliga xat yuborilmoqda...`);
  }
}
```

Bu klass SRPni buzadi, chunki uning o'zgarishi uchun uchta sabab bor: foydalanuvchi ma'lumotlari o'zgarishi, ma'lumotlar bazasi tizimi o'zgarishi yoki xat jo'natish provayderi o'zgarishi.

### To'g'ri yechim (Adheres to SRP)

Har bir javobgarlikni alohida klasslarga ajratamiz:

```ts
//  SRPga mos keladi
class User {
  constructor(public name: string, public email: string) {}
}

class UserRepository {
  save(user: User) {
    console.log(`${user.name} ma'lumotlar bazasiga saqlanmoqda...`);
  }
}

class EmailService {
  sendWelcome(user: User) {
    console.log(`${user.email} manziliga xat yuborilmoqda...`);
  }
}
```

Endi ma'lumotlar bazasi o'zgarganda faqat `UserRepository` klassini o'zgartiramiz, xat tizimi o'zgarganda esa `EmailService` tahrirlanadi.
