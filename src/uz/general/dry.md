---
title: DRY (Takrorlamang)
description: DRY (Don't Repeat Yourself) tamoyili bo'yicha to'liq qo'llanma.
icon: RefreshCw
---

# DRY (Don't Repeat Yourself)

<CoverImage src="/covers/general/dry-wet.webp" alt="DRY (Takrorlamang)">
  <h1>DRY (Takrorlamang)</h1>
  <p>Ikkiga bo'lingan sahna: chapda kichkina oq robot yigirmata bir xil eshikdagi bir xil yozuvni shoshib qayta-qayta bo'yamoqda; o'ngda esa xuddi shu robot xotirjam holda yagona asosiy trafaretni o'zgartirmoqda va u barcha eshiklarni bir vaqtda mayin binafsha nur bilan yangilaydi.</p>
</CoverImage>

> "Har bir bilim yoki mantiq tizim ichida yagona, aniq va nufuzli ko'rinishga ega bo'lishi kerak." — Andy Hunt and Dave Thomas, *The Pragmatic Programmer*

**DRY (Don't Repeat Yourself - O'zingizni takrorlamang)** tamoyili dasturlashdagi eng mashhur qoidalardan biridir. Aslini olganda, u kod bazasida bilim yoki mantiqning takrorlanishiga yo'l qo'ymaslik haqida bo'lib, o'zgarishlar faqat bitta joyda amalga oshirilishini ta'minlaydi.

## Asosiy tushuncha

Ko'pgina dasturchilar DRYni faqat **kodning takrorlanishi** (ya'ni bir xil kod satrlarini nusxalash) deb noto'g'ri tushunishadi. Biroq, asl ta'rif **bilim yoki maqsadning takrorlanishi**ga qaratilgan.

Agar sizda mutlaqo boshqa biznes vazifalarni bajaradigan, lekin bugungi kunda tasodifan bir xil ko'rinishga ega bo'lgan ikkita bir xil kod bloki bo'lsa, ular DRY buzilishi hisoblanmaydi. Ular kelajakda boshqa tomonga o'zgarishi mumkin bo'lgan alohida bilimlarni ifodalaydi.

Ammo, agar sizda bitta biznes qoidasi ham bazada, ham backend modelda, ham frontend validatsiyada takrorlangan bo'lsa, bu haqiqiy DRY buzilishi hisoblanadi. Chunki bu qoida o'zgarsa, uni 3 ta joyda o'zgartirish kerak.

### Noto'g'ri namuna (Violates DRY)

```ts
// ❌ DRYga zid
class InvoiceService {
  createInvoice(amount: number) {
    const tax = amount * 0.20; // Soliq stavkasi takrorlangan
    console.log(`Jami: ${amount + tax}`);
  }
}

class ReceiptService {
  printReceipt(amount: number) {
    const tax = amount * 0.20; // Soliq stavkasi takrorlangan
    console.log(`Jami: ${amount + tax}`);
  }
}
```

### To'g'ri yechim (Adheres to DRY)

```ts
//  DRYga mos keladi
class TaxCalculator {
  private static readonly VAT_RATE = 0.20;

  static calculateVAT(amount: number): number {
    return amount * this.VAT_RATE;
  }
}
```
Foydalanuvchi endi barcha hisob-kitoblarda `TaxCalculator.calculateVAT(amount)` metodidan foydalanadi. Soliq stavkasi o'zgarsa faqat bir joy tahrirlanadi.
