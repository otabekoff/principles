---
title: Open-Closed Principle (OCP)
description: A complete guide to Bertrand Meyer's implementation inheritance and Robert C. Martin's polymorphic interface interpretations of OCP.
icon: Unlock
cardPrompt: "A sealed, smiling machine with a padlock labelled \"CLOSED\" and a new module clicking into a side socket labelled \"OPEN FOR EXTENSION\"."
---

# Open-Closed Principle (OCP)

<CoverImage src="/covers/solid/ocp.webp" alt="Open-Closed">
  <h1>Open-Closed</h1>
  <p>A tiny white robot snapping a new glowing module onto the side of a sealed, polished machine through a standard socket, without ever opening the machine's casing.</p>
</CoverImage>

> **"Software entities (such as classes, modules, and functions) should be open for extension, but closed for modification."** — *Bertrand Meyer*

The **Open-Closed Principle (OCP)** is the structural cornerstone of modern object-oriented design and represents the **O** in the **SOLID** design acronym. It describes an elegant architectural goal: you should be able to alter or modify the behavior of an entity *without altering its underlying source code*.

---

## Why Apply OCP?

* **Improve Maintainability & Stability**: By minimizing the need to rewrite or alter existing, verified, and thoroughly tested source code, you prevent regressions, dramatically enhancing the long-term stability and maintainability of your system.

---

## How to Apply It

* **Write Extensible Classes**: Design your classes and components so that they can be extended (via polymorphism or interfaces) rather than modified whenever new behaviors are introduced.
* **Expose Only the Moving Parts**: Identify the specific hot-spots or concepts that vary, expose only those moving parts that actually need to change, and keep everything else completely hidden behind stable interfaces.

---

---

## 1. The Two Historical Interpretations of OCP

While the primary goal of OCP is uniform—decoupling systems to allow safe extensions—the software engineering community historically split into two distinct schools of thought regarding its implementation:

```
                            THE OCP PARADIGM SPLIT:
   ┌───────────────────────────────────┬──────────────────────────────────┐
   │    A. MEYER'S ORIGINAL OCP (1988) │  B. POLYMORPHIC OCP (1990s/DIP)   │
   ├───────────────────────────────────┼──────────────────────────────────┤
   │ * Focuses on Implementation       │ * Focuses on Abstract Interfaces  │
   │   Inheritance.                    │   and Dynamic Polymorphism.      │
   │ * Reuses concrete class behavior  │ * Reuses interface specifications │
   │   by declaring descendants.       │   without forcing implementation.│
   │ * Class is baselined & compiled.  │ * Existing interface is closed;  │
   │                                   │   substitutions are open.        │
   └───────────────────────────────────┴──────────────────────────────────┘
```

### A. Bertrand Meyer's Open-Closed Principle (1988)
First appearing in Bertrand Meyer's pioneering 1988 book, ***Object-Oriented Software Construction***, this definition reflects the era of compiled libraries where modifying source code inevitably broke client dependencies:

* **Open**: A module is open if it is still available for extension (e.g. adding new fields to its data structures or functions to its capabilities).
* **Closed**: A module is closed if it is available for use by other modules. This assumes the module has been baselined, compiled, stored in a library, and given a stable description (its interface under information hiding rules).

#### Meyer's Proposed Inheritance Solution:
> *"A class is closed, since it may be compiled, stored in a library, baselined, and used by client classes. But it is also open, since any new class may use it as a parent, adding new features. When a descendant class is defined, there is no need to change the original or to disturb its clients."*

### B. The Polymorphic Open-Closed Principle (1990s)
Redefined in the 1990s, this modern interpretation advocates for **abstract base classes and interfaces** rather than concrete implementation inheritance. It was popularized by **Robert C. Martin** in his seminal 1996 article, *"The Open-Closed Principle"*.

Here, the interface specification is closed to changes. Instead of subclasses inheriting and overriding concrete methods, multiple independent classes implement the stable interface and are substituted polymorphically at runtime. 

In 2001, **Craig Larman** connected this polymorphic OCP directly to Alistair Cockburn's **Protected Variations** pattern and David Parnas's fundamental principles of **Information Hiding**.

---

## 2. Case Study: The Discount Calculator

### ❌ The Code Smell: Fragile Switch / Conditional Blocks
When you rely on concrete type checks, adding new features requires modifying existing code, creating high risk of regressions and forced retesting:

```ts
// ❌ Violates OCP: Adding a new type requires modifying this file!
class DiscountCalculator {
  calculateDiscount(customerType: string, amount: number): number {
    if (customerType === 'Regular') {
      return amount * 0.05;
    } else if (customerType === 'VIP') {
      return amount * 0.10;
    }
    return 0; // If we want to add 'SuperVIP', we must change this code!
  }
}
```

### 🌟 The Solution: Polymorphic Abstraction
We define a stable, closed interface and extend the behavior by creating new, isolated classes:

```ts
// 🌟 Adheres to OCP via Polymorphic Interfaces
interface DiscountStrategy {
  calculate(amount: number): number;
}

// Existing strategies are closed to modification
class RegularDiscount implements DiscountStrategy {
  calculate(amount: number): number { return amount * 0.05; }
}

class VIPDiscount implements DiscountStrategy {
  calculate(amount: number): number { return amount * 0.10; }
}

// Adding new behaviors is done by creating fresh, isolated classes
class SuperVIPDiscount implements DiscountStrategy {
  calculate(amount: number): number { return amount * 0.20; }
}

// The calculator class remains completely untouched (closed)
class DiscountCalculator {
  calculateDiscount(strategy: DiscountStrategy, amount: number): number {
    return strategy.calculate(amount);
  }
}
```

---

## 3. Advantages and Pragmatic Tradeoffs

### Advantages:
* **Zero Regression Risk**: Since you do not touch existing, compiled, and verified files, you cannot introduce bugs into active features.
* **Ease of Testing**: New features are isolated in fresh classes, letting you write focused unit tests without mock pollution.
* **Parallel Development**: Multiple developers can work on separate strategies simultaneously without experiencing git merge conflicts.

### Tradeoffs & Over-Engineering:
* **The Complexity Trap**: Designing a highly abstract system of interfaces upfront introduces extra indirection, class counts, and cognitive overhead. 
* **When to Skip OCP**: If a set of conditional logic is highly unlikely to change or expand over time, a simple `if/else` block is vastly superior under the **KISS Principle**. Apply OCP only along proven "axes of change" in your codebase.

---

## 4. Connections to Other Principles

* **Liskov Substitution Principle (LSP)**: OCP relies on subclasses or interface implementations behaving predictably. If a subclass breaks the parent's contract, the OCP abstraction collapses.
* **Robustness Principle (Postel's Law)**: *"Be conservative in what you do, be liberal in what you accept from others."* By keeping interfaces closed to structural changes but open to flexible payloads, systems retain extreme resilience.

---

## Resources & Deep Dive

* [Open Closed Principle on Wikipedia](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle)
* [The Open Closed Principle by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2014/05/12/TheOpenClosedPrinciple.html)
