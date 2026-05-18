---
title: Open-Closed Principle (OCP)
description: A complete guide to the Open-Closed Principle.
icon: Unlock
---

# Open-Closed Principle (OCP)

> "Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification." — Bertrand Meyer

The **Open-Closed Principle (OCP)** is the foundation of building reusable, robust, and maintainable software. It encourages designing systems in a way that allows you to add new features or behaviors without changing the existing, working code.

## The Core Concept

- **Open for Extension**: You should be able to extend the behavior of the component or module as requirements change.
- **Closed for Modification**: Extending the behavior should not require changing the existing source code. Why? Because modifying existing code carries the risk of breaking existing features (regression) and requires re-testing.

We achieve this primary through **polymorphism** and **abstractions** (interfaces or abstract classes).

### Code Smell: Huge `switch` or `if-else` blocks

Imagine a class `DiscountCalculator` that calculates discount rates based on customer type:

```ts
// ❌ Violates OCP
class DiscountCalculator {
  calculateDiscount(customerType: string, amount: number): number {
    if (customerType === 'Regular') {
      return amount * 0.05;
    } else if (customerType === 'VIP') {
      return amount * 0.10;
    }
    return 0;
  }
}
```

If we want to introduce a new customer type (e.g., "SuperVIP"), we must modify the `calculateDiscount` method. This violates OCP because we are modifying existing code to add new behavior.

### The Solution: Using Polymorphism

Instead of checking types in a central class, we define a common interface for discounts and let each customer type implement its own logic:

```ts
//  Adheres to OCP
interface DiscountStrategy {
  calculate(amount: number): number;
}

class RegularDiscount implements DiscountStrategy {
  calculate(amount: number): number {
    return amount * 0.05;
  }
}

class VIPDiscount implements DiscountStrategy {
  calculate(amount: number): number {
    return amount * 0.10;
  }
}

class SuperVIPDiscount implements DiscountStrategy {
  calculate(amount: number): number {
    return amount * 0.20;
  }
}

class DiscountCalculator {
  calculateDiscount(strategy: DiscountStrategy, amount: number): number {
    return strategy.calculate(amount);
  }
}
```

Now, adding a new discount strategy is as simple as creating a new class implementing `DiscountStrategy`. We do not have to touch `DiscountCalculator` or any existing discount strategy classes.

## Tradeoffs and Pragmatism

- **Pros**: Drastically reduces the risk of breaking existing features (regression), isolates new features in new files, and makes the codebase highly modular.
- **Cons**: Requires more upfront planning and abstract design. Can introduce extra indirection and classes, making a simple application more complex than necessary.

If a set of behaviors is highly unlikely to ever change or expand, writing simple, direct conditional blocks is perfectly fine. Apply OCP when you identify a clear axis of change.
