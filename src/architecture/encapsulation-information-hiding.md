---
title: Encapsulation & Info Hiding
description: Learn the difference between Encapsulation and Information Hiding and how to safeguard your systems.
icon: EyeOff
---

# Encapsulation & Information Hiding

While **Encapsulation** and **Information Hiding** are often used interchangeably, they represent two distinct and powerful design concepts in object-oriented programming.

```
┌────────────────────────────────────────────────────────────────┐
│                         OBJECT BOUNDARY                        │
├───────────────────────────────┬────────────────────────────────┤
│         ENCAPSULATION         │       INFORMATION HIDING       │
│   (Grouping data + methods)   │ (Hiding internal implementation│
│                               │   details behind public APIs)  │
└───────────────────────────────┴────────────────────────────────┘
```

---

## 1. Encapsulation (Data Bundling)

**Encapsulation** is the act of bundling data (state fields) and the methods that operate on that data together into a single cohesive unit (a class).
- It prevents state from being scattered across the codebase.
- It ensures that the state can only be mutated through valid, controlled class methods, rather than direct external updates.

### Example: Cohesive Encapsulation

```ts
// 🌟 Encapsulation
class BankAccount {
  private balance = 0; // State is kept inside the class

  deposit(amount: number) {
    if (amount <= 0) throw new Error("Invalid deposit amount");
    this.balance += amount; // Mutation is fully controlled
  }

  getBalance(): number {
    return this.balance;
  }
}
```

---

## 2. Information Hiding (Encapsulation for Design Decisions)

**Information Hiding** is a broader design philosophy introduced by David Parnas. It suggests that a module should hide its internal implementation choices and design decisions (such as data structures, file formats, or database layouts) behind a **stable, public interface**.

- **Goal**: Prevent calling code from relying on the internal structure of a class. If the calling code doesn't know *how* a class performs its calculations, the class implementation can be completely rewritten without breaking any calling code.

### Code Smell: Exposing Design Decisions

```ts
// ❌ Violates Information Hiding
class ProductCatalog {
  // Exposing the exact internal data structure (a Map)!
  public productMap = new Map<string, Product>(); 
}

// Callers directly access the Map:
const catalog = new ProductCatalog();
const p = catalog.productMap.get('123');
```

If we later decide to change the data structure to a sorted Array or query it dynamically from a database, we will **break every caller** that was directly accessing the `.productMap` property.

### The Solution: Expose an Abstract Interface

```ts
//  Adheres to Information Hiding
class ProductCatalog {
  private products = new Map<string, Product>(); // Internal implementation hidden!

  getProduct(id: string): Product | undefined {
    return this.products.get(id); // Stable public method
  }
}
```

Now, the internal data structure is completely hidden. We can change the Map to a database query or an array, and the rest of the application remains completely unaffected because they only interact with the stable public method `getProduct(id)`.

## Summary

- **Encapsulation**: Put your variables and actions in a box.
- **Information Hiding**: Tape the box shut and only expose a small slot to interact with it.
