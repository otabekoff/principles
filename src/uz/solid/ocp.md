---
title: Ochiq-yopiq tamoyili (OCP)
description: Ochiq-yopiq tamoyili (Open-Closed Principle) bo'yicha to'liq qo'llanma.
icon: Unlock
---

# Ochiq-yopiq tamoyili (OCP)

<CoverImage src="/covers/solid/ocp.webp" alt="Ochiq-yopiq tamoyili (OCP)">
  <h1>Ochiq-yopiq tamoyili (OCP)</h1>
  <p>Kichkina oq robot muhrlangan, yaltiroq mashinaning yon tomoniga standart uyacha orqali yangi porlayotgan modulni ulamoqda, mashina korpusini esa umuman ochmayapti.</p>
</CoverImage>

> "Dasturiy ta'minot ob'ektlari (klasslar, modullar, funktsiyalar va boshqalar) kengaytirish uchun ochiq, lekin o'zgartirish uchun yopiq bo'lishi kerak." — Bertrand Meyer

**Ochiq-yopiq tamoyili (OCP)** — qayta ishlatiladigan, mustahkam va oson saqlanadigan dasturiy ta'minot yaratishning asosidir. U yangi xususiyatlar yoki xatti-harakatlarni mavjud bo'lgan, ishlayotgan kodni o'zgartirmasdan qo'shish imkonini beradigan tizimlarni loyihalashni rag'batlantiradi.

## Asosiy tushuncha

- **Kengaytirish uchun ochiq (Open for Extension)**: Talablar o'zgarganda komponent yoki modulning xatti-harakatlarini kengaytira olishingiz kerak.
- **O'zgartirish uchun yopiq (Closed for Modification)**: Xatti-harakatni kengaytirish mavjud kodni o'zgartirishni talab qilmasligi kerak. Nima uchun? Chunki mavjud kodni o'zgartirish avvalgi kodning buzilishi (regressiya) xavfini tug'diradi va qayta sinovdan o'tkazishni talab qiladi.

Biz bunga asosan **polimorfizm** va **abstraktsiyalar** (interfeyslar yoki abstrakt klasslar) orqali erishamiz.

### Noto'g'ri namuna (Violates OCP)

Mijoz turiga qarab chegirmalarni hisoblaydigan klass:

```ts
// ❌ OCPga zid
class DiscountCalculator {
  calculateDiscount(customerType: string, amount: number): number {
    if (customerType === 'Regular') {
      return amount * 0.05;
    } else if (customerType === 'VIP') {
      return amount * 0.10;
    }
    return 0;
  }
}
```

Yangi mijoz turi (masalan, "SuperVIP") qo'shish uchun biz mavjud `calculateDiscount` metodini o'zgartirishga majburmiz. Bu OCPni buzadi.

### To'g'ri yechim (Adheres to OCP)

Konditsional bloklardan voz kechib, har bir chegirma strategiyasini alohida klassga olib chiqamiz:

```ts
//  OCPga mos keladi
interface DiscountStrategy {
  calculate(amount: number): number;
}

class RegularDiscount implements DiscountStrategy {
  calculate(amount: number): number {
    return amount * 0.05;
  }
}

class VIPDiscount implements DiscountStrategy {
  calculate(amount: number): number {
    return amount * 0.10;
  }
}

class DiscountCalculator {
  calculateDiscount(strategy: DiscountStrategy, amount: number): number {
    return strategy.calculate(amount);
  }
}
```

Yangi chegirma turi qo'shish uchun faqat yangi strategiya klassini yaratish kifoya. Mavjud kodlarga tegilmaydi.
