---
title: DRY (Don't Repeat Yourself)
description: A complete guide to the Don't Repeat Yourself (DRY) principle.
icon: RefreshCw
---

# DRY (Don't Repeat Yourself)

> "Every piece of knowledge must have a single, unambiguous, authoritative representation within a system." — Andy Hunt and Dave Thomas, *The Pragmatic Programmer*

The **DRY (Don't Repeat Yourself)** principle is one of the most widely cited rules in software engineering. At its core, it is about avoiding the duplication of knowledge or logic within a codebase, ensuring that changes only need to be made in a single place.

## The Core Concept

Many developers mistakenly believe that DRY is purely about **code duplication** (i.e., copy-pasting the same lines of code). However, the original definition focuses on the duplication of **knowledge or intent**.

If you have two identical blocks of code that happen to perform different business duties but look the same today, they are not a violation of DRY. They represent different knowledge and will likely diverge in the future. Trying to merge them creates premature abstraction.

Conversely, if you have one business rule written in a database constraint, validated in a backend model, and checked again in frontend validation, you are duplicating knowledge. If that business rule changes, you have to update it in three places. That is a real violation of DRY!

### Code Smell: Duplicated Logic

Imagine calculating VAT tax in multiple services directly:

```ts
// ❌ Violates DRY
class InvoiceService {
  createInvoice(amount: number) {
    const tax = amount * 0.20; // Hardcoded business rule
    const total = amount + tax;
    console.log(`Invoice total: ${total}`);
  }
}

class ReceiptService {
  printReceipt(amount: number) {
    const tax = amount * 0.20; // Hardcoded business rule again!
    const total = amount + tax;
    console.log(`Receipt total: ${total}`);
  }
}
```

If the VAT rate changes from 20% to 18%, you have to find and modify it in both services.

### The Solution: Consolidate Knowledge

Move the business rule into a single, authoritative place:

```ts
//  Adheres to DRY
class TaxCalculator {
  private static readonly VAT_RATE = 0.20;

  static calculateVAT(amount: number): number {
    return amount * this.VAT_RATE;
  }
}

class InvoiceService {
  createInvoice(amount: number) {
    const tax = TaxCalculator.calculateVAT(amount);
    console.log(`Invoice total: ${amount + tax}`);
  }
}

class ReceiptService {
  printReceipt(amount: number) {
    const tax = TaxCalculator.calculateVAT(amount);
    console.log(`Receipt total: ${amount + tax}`);
  }
}
```

## DRY vs. WET (Write Everything Twice)

Sometimes, applying DRY too early leads to over-engineered, complex code with high coupling. A popular counter-philosophy is **WET (Write Everything Twice)** or **AHA (Avoid Hasty Abstractions)**:
- Do not abstract code on the first duplicate.
- Duplicate it once or twice. When you find yourself writing it a third time, the correct abstraction will be obvious, and you can refactor it cleanly.

## Tradeoffs

- **Pros**: Easy updates, consistency across the system, and self-contained business definitions.
- **Cons**: Premature DRYing can couple completely unrelated parts of the system together, making future changes harder because a change in one flow unexpectedly breaks another.
