---
title: Demetra qonuni (LoD)
description: Demetra qonuni (Law of Demeter - Eng kam bilim tamoyili) bo'yicha to'liq qo'llanma.
icon: GitPullRequest
---

# Demetra qonuni (LoD)

> "Faqat o'z yaqin do'stlaringiz bilan gaplashing."

**Demetra qonuni (LoD)** yoki **Eng kam bilim tamoyili (Principle of Least Knowledge)** loyihalash qoidasi bo'lib, u modullarning o'zaro bog'liqligini kamaytirishga yordam beradi. Unda aytilishicha, ob'ekt o'zi ishlayotgan boshqa ob'ektlarning ichki tuzilishini bilmasligi kerak.

## Asosiy tushuncha

LoD bo'yicha `A` ob'ekti faqat quyidagilarning metodlarini chaqirishi mumkin:
1. O'zining metodlari.
2. Unga parametr sifatida uzatilgan ob'ektlar.
3. O'zi yaratgan (instantiate qilgan) ob'ektlar.
4. O'zining bevosita tarkibiy qismlari (maydonlari).

Ob'ekt hech qachon boshqa ob'ekt qaytargan ob'ektning metodlarini chaqirmasligi kerak (ya'ni `a.getB().getC().doSomething()` ko'rinishidagi uzun zanjirlardan qochish kerak).

### Noto'g'ri namuna (Violates LoD)

```ts
// ❌ Demetra qonuniga zid
class Shop {
  processPayment(customer: Customer, amount: number) {
    // Mijozning hamyoniga kirib, undan kartasini olib pul yechish!
    customer.wallet.creditCard.charge(amount);
  }
}
```

Bu `Shop` klassini ham hamyonga, ham kredit kartaga bog'lab qo'yadi. Agar hamyon yoki karta tuzilishi o'zgarsa, `Shop` ham buziladi.

### To'g'ri yechim (Adheres to LoD)

Mijozning o'ziga to'lashni topshiring:

```ts
//  Demetra qonuniga mos keladi
class Shop {
  processPayment(customer: Customer, amount: number) {
    customer.pay(amount);
  }
}
```
Mijoz o'zi hamyonidan to'laydi, bu orqali `Shop` mijozning pulni qanday saqlashidan mutlaqo bexabar bo'ladi.
