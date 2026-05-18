---
title: Liskov Substitution Principle (LSP)
description: A complete guide to the Liskov Substitution Principle.
icon: Repeat
---

# Liskov Substitution Principle (LSP)

> "Subtypes must be substitutable for their base types." — Barbara Liskov

The **Liskov Substitution Principle (LSP)** ensures that inheritance is used correctly. It states that if class `B` is a subtype of class `A`, then objects of type `A` should be replaceable with objects of type `B` without altering the correctness or behavior of the program.

## The Core Concept

LSP means that subclassing should not only copy the interface (syntax) of a parent class but also conform to its expected behavior and contracts (semantics). A subclass should never weaken the preconditions or strengthen the postconditions of the parent class.

### Code Smell: The Classic Rectangle-Square Dilemma

A classic violation of LSP involves a `Rectangle` class and a `Square` subclass. Mathematically, a square is a rectangle. But in object-oriented design:

```ts
// ❌ Violates LSP
class Rectangle {
  constructor(protected width: number = 0, protected height: number = 0) {}

  setWidth(width: number) { this.width = width; }
  setHeight(height: number) { this.height = height; }
  getArea(): number { return this.width * this.height; }
}

class Square extends Rectangle {
  setWidth(width: number) {
    this.width = width;
    this.height = width; // Forces width and height to be equal
  }

  setHeight(height: number) {
    this.width = height;
    this.height = height; // Forces width and height to be equal
  }
}
```

Now look what happens when a client expects a `Rectangle`:

```ts
function resize(rect: Rectangle) {
  rect.setWidth(5);
  rect.setHeight(10);
  // For a real rectangle, area must be 5 * 10 = 50.
  // But if rect is a Square, the area will be 10 * 10 = 100!
  if (rect.getArea() !== 50) {
    throw new Error("Broken rectangle contract!");
  }
}
```

Since `Square` does not behave like a `Rectangle` in all situations, extending `Rectangle` to create `Square` violates LSP.

### The Solution: Separate and Model Behaviors, Not Definitions

Instead of force-fitting a relationship using inheritance, we should model them with independent classes or extract a common readonly interface:

```ts
//  Adheres to LSP
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

Since `Square` and `Rectangle` both implement `Shape`, they can be used interchangeably where only `Shape` is expected, without violating any assumptions about setting widths or heights independently.

## Tradeoffs and Pragmatism

- **Pros**: Ensures that inheritance Hierarchies are logically correct and behave predictably. Clients can rely on polymorphism safely.
- **Cons**: Can force you to design more complex, granular interfaces rather than quickly reusing code through inheritance.

Before inheriting, ask yourself: "Does the subclass support everything the superclass supports, under the exact same expectations?" If not, prefer **composition over inheritance**.
