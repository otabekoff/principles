---
title: Eng kam ajablantirish tamoyili
description: Eng kam ajablantirish tamoyili (Principle of Least Astonishment - POLA) bo'yicha to'liq qo'llanma.
icon: Compass
---

# Eng kam ajablantirish tamoyili (POLA)

<CoverImage src="/covers/general/least-astonishment.webp" alt="Eng kam ajablantirish tamoyili">
  <h1>Eng kam ajablantirish tamoyili</h1>
  <p>Kichkina oq robot itarish plastinkasi bor eshikni itarmoqda va eshik aynan kutilgandek ochilmoqda; orqa fonda esa hayron qolgan boshqa robot dastagidan tortayotganda uning eshigi to'g'ri shiftga qarab ko'tarilib ketmoqda.</p>
</CoverImage>

> "Agar zarur bo'lgan xususiyat kutilmagan (hayratlanarli) ta'sirga ega bo'lsa, uni qayta loyihalash kerak bo'lishi mumkin."

**Eng kam ajablantirish tamoyili (Principle of Least Astonishment - POLA)** tizim komponentlari foydalanuvchilar va dasturchilar kutganidek harakat qilishi kerakligini ta'kidlaydi. Ular kodni o'qigan yoki ishlatgan odamlarni hayratda qoldirmasligi, chalkashtirmasligi lozim.

## Asosiy tushuncha

Metod yoki interfeyslarni yaratayotganda ularning nomi va bajaradigan ishi aniq va kutilganidek bo'lishi kerak. Masalan, `getUser(id)` nomli funktsiya faqat foydalanuvchini olib kelishi kerak. 

Agar u foydalanuvchini olib kelish bilan birga yashirincha ma'lumotlar bazasini o'zgartirsa yoki to'lov tizimini ishga tushirsa, bu dasturchini juda **ajablantiradi** va kutilmagan xatoliklarga sabab bo'ladi.

## Ajablantiradigan kod belgilari

1. **Getter ichidagi nojo'ya ta'sirlar (Side Effects)**: O'qish uchun mo'ljallangan metodlarning tizim holatini o'zgartirishi.
2. **Nomuvofiq nomlash**: Bir joyda `deleteUser`, boshqasida `destroyUser`, uchinchisida esa `removeUser` ishlatilishi.
3. **Sehrli mattiqlar**: Global o'zgaruvchilarni yashirincha o'zgartirish yoki standart prototiplarga ta'sir qilish.

Kodni yozishda doimo standart qoidalarga amal qiling va metodlar faqat o'z nomiga mos ishlarni bajarishini ta'minlang.
