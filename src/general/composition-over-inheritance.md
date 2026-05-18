---
title: Composition over Inheritance
description: A complete guide to the Composition over Inheritance principle.
icon: Layers3
---

# Composition over Inheritance

> "Favor object composition over class inheritance." — *Design Patterns (Gang of Four)*

**Composition over Inheritance** (or the **Composite Reuse Principle**) is a fundamental rule in object-oriented design. It suggests that a class should achieve polymorphic behavior and code reuse by containing instances of other classes (composition) rather than inheriting from a parent class (inheritance).

## The Core Concept

- **Inheritance (Is-A relationship)**: Tightest form of coupling in OOP. A subclass is bound to the parent class implementation. Changes in parent class can break subclasses (the **fragile base class problem**).
- **Composition (Has-A relationship)**: Loose coupling. An object references other objects to delegate behavior. These components can be swapped easily at runtime.

### Code Smell: Deep Inheritance Hierarchies

Imagine modeling video game characters. You have a base `Character` class and use inheritance to define roles:

```ts
// ❌ Violates Composition over Inheritance
class Character {
  walk() { console.log("Walking..."); }
}

class FightingCharacter extends Character {
  fight() { console.log("Fighting..."); }
}

class FlyingCharacter extends Character {
  fly() { console.log("Flying..."); }
}
```

Now, what if we need a new character type that can **both** fight and fly? In languages with single inheritance, you cannot inherit from both `FightingCharacter` and `FlyingCharacter`. You are forced to copy code or create a convoluted inheritance tree.

### The Solution: Composition

Instead of saying a character *is* a fighter, we say a character *has* a fighting ability. We separate behaviors into independent components and compose our character using them:

```ts
//  Adheres to Composition over Inheritance
interface MovementAbility { move(): void; }
interface CombatAbility { attack(): void; }

class WalkMovement implements MovementAbility {
  move() { console.log("Walking..."); }
}

class FlyMovement implements MovementAbility {
  move() { console.log("Flying..."); }
}

class SwordAttack implements CombatAbility {
  attack() { console.log("Swinging sword..."); }
}

class BowAttack implements CombatAbility {
  attack() { console.log("Shooting bow..."); }
}

class GameCharacter {
  constructor(
    private movement: MovementAbility,
    private combat: CombatAbility
  ) {}

  performMove() { this.movement.move(); }
  performAttack() { this.combat.attack(); }
}
```

Now, we can compose any type of character dynamically without any complex hierarchies:
```ts
const flyingWarrior = new GameCharacter(new FlyMovement(), new SwordAttack());
const walkingArcher = new GameCharacter(new WalkMovement(), new BowAttack());
```

We can even change a character's movement or combat behavior at runtime!

## Tradeoffs

- **Pros**: Extreme flexibility, runtime adaptability, easily testable decoupled components, and no fragile base class issues.
- **Cons**: Requires more setup code (wiring components together) and can lead to a higher number of small, single-purpose classes.
