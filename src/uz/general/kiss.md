---
title: KISS (Oddiy saqlang)
description: KISS (Keep It Simple, Stupid) tamoyili bo'yicha to'liq qo'llanma.
icon: Lightbulb
---

# KISS (Keep It Simple, Stupid)

> "Oddiylik — eng yuqori darajadagi murakkablikdir." — Leonardo da Vinci

**KISS (Keep It Simple, Stupid - Oddiy saqlang, ahmoqona qilmagan holda)** tamoyili 1960-yilda AQSh Harbiy-havo kuchlari tomonidan qayd etilgan va dasturiy ta'minotda keng qo'llaniladigan loyihalash qoidasidir. Unda aytilishicha, ko'plab tizimlar murakkablashtirilgandan ko'ra oddiy saqlansa eng yaxshi ishlaydi.

## Asosiy tushuncha

Murakkablik — loyihalarni yemiruvchi yashirin qotildir. U quyidagilar orqali kirib keladi:
- Juda aqlli yozilgan, lekin boshqalar o'qiy olmaydigan kodlar.
- Kelajakdagi ehtimoliy xususiyatlarni oldindan rejalashtirish (YAGNIni buzish).
- Keraksiz abstraktsiyalar, qatlamlar va konfiguratsiyalar.

Oddiy kodni yozish, o'qish, xatolarini topish va refaktoring qilish oson.

### To'g'ri yondashuv (Adheres to KISS)

Aqlli va murakkab tsikllar yoki sortinglardan ko'ra, eng tushunarli va sodda yechimni yozing:

```ts
//  KISSga mos keladi
function findMax(numbers: number[]): number {
  if (numbers.length === 0) return -Infinity;
  return Math.max(...numbers);
}
```

Kod juda aqlli bo'lishi shart emas, asosiysi u aniq, tez va tushunarli bo'lishi kerak.
