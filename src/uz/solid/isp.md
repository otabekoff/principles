---
title: Interfeysni ajratish tamoyili (ISP)
description: Interfeysni ajratish tamoyili (Interface Segregation Principle) bo'yicha to'liq qo'llanma.
icon: LayoutGrid
---

# Interfeysni ajratish tamoyili (ISP)

<CoverImage src="/covers/solid/isp.webp" alt="Interfeysni ajratish tamoyili (ISP)">
  <h1>Interfeysni ajratish tamoyili (ISP)</h1>
  <p>Kichkina oq robot devordagi ilgakdan faqat uchta tugmasi bor ixcham, bitta vazifali pultni olmoqda va uning yonida osilib turgan yuzlab chalkash tugmali ulkan pultga e'tibor ham bermayapti.</p>
</CoverImage>

> "Mijozlar o'zlari ishlatmaydigan metodlarga bog'liq bo'lishga majburlanmasligi kerak." — Robert C. Martin

**Interfeysni ajratish tamoyili (ISP)** interfeyslarning hajmi va diqqat markaziga qaratilgan. U bitta katta, umumiy maqsadli interfeysdan ko'ra, ko'plab kichik, juda aniq interfeyslarga ega bo'lish yaxshiroq ekanligini ta'kidlaydi.

## Asosiy tushuncha

Interfeys juda katta bo'lsa, uni amalga oshiradigan klasslar ko'pincha o'zlariga kerak bo'lmagan metodlar uchun "soxta" yoki "bo'sh" implementatsiyalar yozishga majbur bo'lishadi. Bu keraksiz bog'liqliklarni keltirib chiqaradi.

### Noto'g'ri namuna (Violates ISP)

Barcha turdagi ishchilar uchun bitta katta interfeys:

```ts
// ❌ ISPga zid
interface Worker {
  work(): void;
  eat(): void;
  code(): void;
}

class SoftwareEngineer implements Worker {
  work() { console.log("Kod yozmoqda..."); }
  eat() { console.log("Ovqatlanmoqda..."); }
  code() { console.log("Dasturlamoqda..."); }
}

class SecurityGuard implements Worker {
  work() { console.log("Qriqlamoqda..."); }
  eat() { console.log("Ovqatlanmoqda..."); }
  code() {
    // Qorovullar kod yozishmaydi!
    throw new Error("Men kod yozishni bilmayman!");
  }
}
```

### To'g'ri yechim (Adheres to ISP)

Interfeysni kichik va maqsadli qismlarga ajratamiz:

```ts
//  ISPga mos keladi
interface Workable {
  work(): void;
}

interface Feedable {
  eat(): void;
}

interface Codable {
  code(): void;
}

class SoftwareEngineer implements Workable, Feedable, Codable {
  work() { console.log("Tizim loyihalash..."); }
  eat() { console.log("Tushlik..."); }
  code() { console.log("Kod yozish..."); }
}

class SecurityGuard implements Workable, Feedable {
  work() { console.log("Patrul..."); }
  eat() { console.log("Tushlik..."); }
}
```
