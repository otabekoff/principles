---
title: Uniform Access Principle
description: "A module's services should be available through a uniform notation, which does not betray whether they are implemented through storage or computation."
icon: Equal
---

# Uniform Access Principle

> "All services offered by a module should be available through a uniform notation, which does not betray whether they are implemented through storage or through computation." — Bertrand Meyer (Object-Oriented Software Construction)

The **Uniform Access Principle (UAP)** is a software design rule of thumb stating that the caller of an object's property should not need to know or care whether that property is a pre-calculated variable stored in memory or a dynamic value computed on the fly.

---

## The Core Concept

In many traditional programming languages, accessing a public field is written as `object.value`, while invoking a calculated method requires parenthesis like `object.value()`.

If a developer changes a stored variable into a dynamically calculated method (or vice-versa):

1. **Traditional languages**: The developer must locate and update every calling file in the entire application to add or remove parentheses (`()`).
2. **UAP-compliant languages**: The caller notation remains exactly identical (`object.value`), meaning implementation changes have **zero** ripple effects on callers.

### Example: JavaScript / TypeScript Getters

JavaScript and TypeScript fully support the Uniform Access Principle through the use of **getters** and **setters**:

```ts
// 🌟 Stored field (Storage)
class Rectangle {
  constructor(
    public width: number,
    public height: number,
  ) {}
}

const rect = new Rectangle(10, 5);
console.log(rect.width); // Direct field access
```

If we later decide to make a computed value (e.g. `area`), we use the `get` keyword. The caller notation remains exactly the same as if it were a simple stored field:

```ts
// 🌟 Computed field (UAP via getter)
class Rectangle {
  constructor(
    public width: number,
    public height: number,
  ) {}

  get area(): number {
    // Looks like a property to the caller!
    return this.width * this.height; // Computation hidden!
  }
}

const rect = new Rectangle(10, 5);
console.log(rect.area); // Caller does NOT write rect.area() - identical notation!
```

---

## Summary of Benefits

- **Encapsulation of Complexity**: Allows you to safely delay caching or optimization decisions. You can start with simple computations, and later add complex caching inside a getter without modifying any calling code.
- **Maintainability**: Prevents wide-ranging, mechanical refactoring pull requests when state structures change.
