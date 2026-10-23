---
title: Meros o'rniga kompozitsiya
description: Meros o'rniga kompozitsiya (Composition over Inheritance) tamoyili bo'yicha to'liq qo'llanma.
icon: Layers3
---

# Meros o'rniga kompozitsiya

<CoverImage src="/covers/architecture/composition-over-inheritance.webp" alt="Meros o'rniga kompozitsiya">
  <h1>Meros o'rniga kompozitsiya</h1>
  <p>Kichkina oq robot almashtiriladigan qahrabo rang qismlarni — g'ildiraklar, qanotlar va parrakni — bir-biriga ulab o'ziga xos transport vositasini yasamoqda; uning ortida esa transport ajdodlarining ulkan va chigal shajara daraxti foydalanilmay turibdi.</p>
</CoverImage>

> "Klass vorisligidan (inheritance) ko'ra, ob'ektlar kompozitsiyasini afzal ko'ring." — *Design Patterns (Gang of Four)*

**Meros o'rniga kompozitsiya (Composition over Inheritance)** — obyektga yo'naltirilgan dizaynning muhim qoidasi bo'lib, kodni qayta ishlatish uchun ota klassdan meros olish o'rniga, boshqa klasslar ob'ektlaridan tarkibiy qism sifatida foydalanishni (kompozitsiya) tavsiya qiladi.

## Asosiy tushuncha

- **Meros (Is-A munosabati)**: Vorislik klasslarni bir-biriga juda qattiq bog'lab qo'yadi (tight coupling). Ota klassdagi kichik o'zgarish farzand klasslarni buzishi mumkin (fragile base class muammosi).
- **Kompozitsiya (Has-A munosabati)**: Kuchsiz bog'liqlik (loose coupling). Ob'ekt o'z ishini bajarish uchun boshqa ob'ektlarga tayanadi. Ushbu tarkibiy qismlarni dastur ishlash vaqtida (runtime) ham osongina almashtirish mumkin.

### Kompozitsiya yordamida yechim

Misol uchun, o'yin qahramonini yaratishda `FightingCharacter` yoki `FlyingCharacter` klasslaridan meros olish o'rniga, harakat va jang qilish qobiliyatlarini mustaqil komponent sifatida yaratib, qahramonga biriktiramiz:

```ts
//  Kompozitsiya namunasi
class GameCharacter {
  constructor(
    private movement: MovementAbility,
    private combat: CombatAbility
  ) {}

  performMove() { this.movement.move(); }
  performAttack() { this.combat.attack(); }
}
```

Bu orqali uchadigan, yuradigan, qilich yoki kamon ishlatadigan qahramonlarni har qanday murakkab vorislik daraxtlarisiz osongina yig'ishimiz mumkin.
