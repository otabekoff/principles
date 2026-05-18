---
title: Liskov o'rnini bosish tamoyili (LSP)
description: Liskov o'rnini bosish tamoyili (Liskov Substitution Principle) bo'yicha to'liq qo'llanma.
icon: Repeat
---

# Liskov o'rnini bosish tamoyili (LSP)

> "Subtiplar o'zlarining asosiy tiplari o'rnini bosa olishi kerak." — Barbara Liskov

**Liskov o'rnini bosish tamoyili (LSP)** vorislikdan (inheritance) to'g'ri foydalanishni ta'minlaydi. Agar `B` klassi `A` klassining subklassi bo'lsa, unda `A` tipidagi ob'ektlarni `B` tipidagi ob'ektlar bilan dasturning to'g'riligiga yoki xatti-harakatiga ta'sir qilmasdan almashtirish imkoni bo'lishi kerak.

## Asosiy tushuncha

LSP subklass nafaqat ota klassning interfeysini (sinteksini) ko'chirishi, balki uning kutilgan xatti-harakatlari va shartnomalariga (semantikasiga) mos kelishi kerakligini anglatadi. Subklass hech qachon ota klassning shartlarini zaiflashtirmasligi yoki o'zgartirmasligi kerak.

### Klassik namuna: To'rtburchak va Kvadrat muammosi

Matematik jihatdan kvadrat to'rtburchakning bir turi hisoblanadi. Ammo obyektga yo'naltirilgan dizaynda:

```ts
// ❌ LSPga zid
class Rectangle {
  constructor(protected width: number = 0, protected height: number = 0) {}

  setWidth(width: number) { this.width = width; }
  setHeight(height: number) { this.height = height; }
  getArea(): number { return this.width * this.height; }
}

class Square extends Rectangle {
  setWidth(width: number) {
    this.width = width;
    this.height = width;
  }

  setHeight(height: number) {
    this.width = height;
    this.height = height;
  }
}
```

Agar mijoz to'rtburchakni (Rectangle) o'zgartiruvchi funktsiyani chaqirsa va unga Square uzatilsa, kutilmagan natija (maydon hisoblashda) yuzaga keladi va shartnoma buziladi. Chunki Kvadratda eni o'zgarganda bo'yi ham o'zgaradi, bu esa To'rtburchak mantig'iga to'g'ri kelmaydi.

### To'g'ri yechim (Adheres to LSP)

Vorislik o'rniga umumiy interfeysdan foydalanamiz:

```ts
//  LSPga mos keladi
interface Shape {
  getArea(): number;
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}
  getArea(): number { return this.width * this.height; }
}

class Square implements Shape {
  constructor(private side: number) {}
  getArea(): number { return this.side * this.side; }
}
```
