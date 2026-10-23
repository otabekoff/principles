---
title: Encapsulate What Changes
description: Identify the hotspots that are most likely to change and encapsulate them behind an interface. Keep changes local.
icon: Box
cardPrompt: "A sturdy box with a standard plug on the outside and a swirling shape-shifting violet glow peeking from under the lid."
---

# Encapsulate What Changes

<CoverImage src="/covers/general/encapsulate-what-changes.webp" alt="Encapsulate What Changes">
  <h1>Encapsulate What Changes</h1>
  <p>A tiny white robot carefully placing a wildly shape-shifting glowing creature into a sturdy violet-lined box with a standard plug, so the rest of the machine connects to the box instead of the creature.</p>
</CoverImage>

> **"Identify the aspects of your application that vary and separate them from what stays the same."** — *Gang of Four (Design Patterns, 1994)*

A fundamental rule of great software design is to identify the **hotspots** or concepts in your system that are most likely to change and encapsulate them behind a stable, abstract interface. When an anticipated change occurs, the necessary modifications are kept local, leaving the rest of the application completely unaffected.

---

## 1. Why Encapsulate What Changes?

* **Minimize Required Modifications**: If a business requirement changes (e.g., swapping a payment processor, changing taxation rules, or modifying notification channels), you only have to alter the isolated class encapsulating that specific concept.
* **Shield Clients from Volatility**: By wrapping changing concepts behind stable interfaces, client classes do not need to be rewritten, recompiled, or redeployed when implementation details change.
* **Improve Comprehensibility**: Isolating volatile logic makes the surrounding core business flow vastly easier to read, understand, and maintain.

---

## 2. Side-by-Side Comparison: Violating vs. Adhering

Let's look at a concrete payment processing scenario.

### ❌ Violating (Hardcoded Volatile Logic)
Here, the `OrderCheckout` class is coupled to the exact mechanics of Stripe payments. If we decide to support PayPal or Adyen tomorrow, we must modify the core `OrderCheckout` class:

```ts
// ❌ Violates Encapsulate What Changes
class OrderCheckout {
  processPayment(orderId: string, amount: number, provider: string) {
    console.log(`Checking out order: ${orderId}`);
    
    if (provider === "stripe") {
      // Direct integration with Stripe API
      console.log(`Stripe: Charging $${amount}`);
      // Stripe-specific key/signature headers logic...
    } else if (provider === "paypal") {
      // Direct integration with PayPal API
      console.log(`PayPal: Crediting $${amount}`);
    }
  }
}
```

### 🌟 Adhering (Encapsulating the Varying Concept)
We isolate the payment strategy (the concept that varies) behind a clean, stable interface. The core `OrderCheckout` remains completely closed to modifications:

```ts
// 🌟 Adheres to Encapsulate What Changes

// 1. Identify and capture the concept that varies behind a stable interface
interface PaymentProcessor {
  pay(amount: number): void;
}

// 2. Concrete implementations encapsulate the specific variation details
class StripeProcessor implements PaymentProcessor {
  pay(amount: number): void {
    console.log(`Stripe: Charging $${amount} with secret key headers.`);
  }
}

class PaypalProcessor implements PaymentProcessor {
  pay(amount: number): void {
    console.log(`PayPal: Crediting $${amount} with OAuth tokens.`);
  }
}

// 3. The orchestrator is stable and unaffected by changes to payment providers
class OrderCheckout {
  constructor(private processor: PaymentProcessor) {}

  checkout(orderId: string, amount: number) {
    console.log(`Checking out order: ${orderId}`);
    this.processor.pay(amount); // Decoupled execution!
  }
}
```

---

## 3. How to Apply the Principle

1. **Perform Change-Frequency Analysis**: As you design a module, ask yourself: *"Which parts of this behavior are stable business policies, and which parts are highly volatile technical implementations or shifting business rules?"*
2. **Abstract the Hotspots**: Put the varying concept behind an interface or abstract class.
3. **Separate into Distinct Modules**: Move the volatile implementations into their own classes, files, or packages.
4. **Use Design Patterns Strategically**:
   * **Strategy Pattern**: Encapsulate varying algorithms or behaviors.
   * **State Pattern**: Encapsulate shifting object states.
   * **Factory Pattern**: Encapsulate the creation and instantiation details of volatile objects.

---

## Resources & Deep Dive

* [Encapsulate the Concept that Varies on Principles Wiki](https://principles-wiki.net/principles:encapsulate_the_concept_that_varies)
* [Information Hiding on Wikipedia](https://en.wikipedia.org/wiki/Information_hiding)
* [Encapsulation & Information Hiding](/architecture/encapsulation-information-hiding)
