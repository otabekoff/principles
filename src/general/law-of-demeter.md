---
title: Law of Demeter (LoD)
description: A complete guide to the Law of Demeter (Principle of Least Knowledge).
icon: GitPullRequest
---

# Law of Demeter (LoD)

> "Only talk to your immediate friends."

The **Law of Demeter (LoD)**, also known as the **Principle of Least Knowledge**, is a design guideline for developing software, particularly object-oriented programs. It encourages loose coupling by stating that a module should not know about the internal details of the objects it manipulates.

## The Core Concept

LoD can be summarized as:
An object `A` can call methods on:
1. Itself (`A`).
2. Its parameters.
3. Objects it instantiates.
4. Its direct component objects (fields/properties).

An object `A` should **never** call methods on an object returned by one of its allowed calls (i.e., avoiding method chaining across different object boundaries). This is often called the **"single dot" rule** (e.g., `object.method()` is fine, but `object.getDetail().getInternal().doSomething()` is a violation).

### Code Smell: Train Wrecks

Method chains that traverse multiple object relationships look like a train wreck and create intense coupling:

```ts
// ❌ Violates Law of Demeter
class Customer {
  constructor(public wallet: Wallet) {}
}

class Wallet {
  constructor(public creditCard: CreditCard) {}
}

class CreditCard {
  charge(amount: number) {
    console.log(`Charged $${amount}`);
  }
}

class Shop {
  processPayment(customer: Customer, amount: number) {
    // reaching deep into the customer's wallet to charge their card!
    customer.wallet.creditCard.charge(amount);
  }
}
```

If the structure of `Wallet` or `CreditCard` changes, the `Shop` class breaks, even though `Shop` shouldn't care how a customer represents money.

### The Solution: Delegate and Encapsulate

Instead of exposing internals, delegate the action to the parent object:

```ts
//  Adheres to Law of Demeter
class Customer {
  constructor(private wallet: Wallet) {}

  pay(amount: number) {
    this.wallet.charge(amount);
  }
}

class Wallet {
  constructor(private creditCard: CreditCard) {}

  charge(amount: number) {
    this.creditCard.charge(amount);
  }
}

class Shop {
  processPayment(customer: Customer, amount: number) {
    // Just tell the customer to pay!
    customer.pay(amount);
  }
}
```

Now, the `Shop` only knows its immediate friend (`Customer`). If a customer changes their payment method to Apple Pay instead of a CreditCard, only `Customer` changes.

## Tradeoffs and Fluent Interfaces

LoD does **not** apply to **Fluent Interfaces** or Builder patterns (like `array.map().filter().reduce()` or builder pipelines). In those cases, the methods are returning the same type of object (or a pipeline container), not reaching into completely unrelated nested objects to manipulate their internal state.
