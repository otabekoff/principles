---
title: Curly's Law (Do One Thing)
description: Choose a single, clearly defined goal for any particular bit of code. Do One Thing.
icon: Target
---

# Curly's Law (Do One Thing)

> **Curly**: Do you know what the secret of life is?  
> **Mitch**: No. What?  
> **Curly**: This. [Holds up one finger]  
> **Mitch**: Your finger?  
> **Curly**: One thing. Just one thing. You stick to that, and the rest don't mean sh*t.  
> — *City Slickers (1991)*

**Curly's Law** is a software design aphorism coined by Coding Horror's Jeff Atwood. It states that any particular piece of code—be it a variable, a function, a class, or a module—should have **a single, clearly defined goal: Do One Thing.**

---

## 1. Core Philosophy of the Rule of One

Curly's Law is the micro-level counterpart to the macro-level [Single Responsibility Principle (SRP)](/solid/srp). While SRP is usually applied to classes and services, Curly's Law is applied to every line of code you write:

* **One Variable = One Meaning**: A variable should hold only one kind of data for one specific purpose. Reusing a variable for multiple different values at different steps of a method is a direct violation of Curly's Law.
* **One Function = One Operation**: A function should perform exactly one task. If its name contains "And" (e.g., `validateAndSaveUser`), it is likely violating the law and should be split.
* **One Class = One Concept**: A class should represent a single conceptual entity in the system design.

---

## 2. Side-by-Side Comparison: Violating vs. Adhering

Let's look at how Curly's Law brings clarity to everyday programming.

### ❌ Violating Curly's Law (Multifarious Code)
In this example, the variable `temp` is reused for completely unrelated values, and the function attempts to calculate, print, and save all at once:

```ts
class OrderProcessorPrimitive {
  processOrder(price: number, quantity: number) {
    // Variable 'temp' is used to hold the subtotal
    let temp = price * quantity;
    console.log(`Subtotal: ${temp}`);

    // Variable 'temp' is repurposed to hold the discounted total!
    temp = temp - (temp > 100 ? 10 : 0);
    
    // The function directly prints to DOM/console AND makes an API call
    document.getElementById("output")!.innerText = `Final Total: ${temp}`;
    fetch("/api/orders", { method: "POST", body: JSON.stringify({ total: temp }) });
  }
}
```

### 🌟 Adhering to Curly's Law (Do One Thing)
Each variable holds a single, immutable meaning. The operations are split into distinct, single-purpose functions:

```ts
class OrderCalculations {
  calculateSubtotal(price: number, quantity: number): number {
    return price * quantity;
  }

  applyDiscount(subtotal: number): number {
    return subtotal - (subtotal > 100 ? 10 : 0);
  }
}

class OrderRepository {
  async save(total: number): Promise<void> {
    await fetch("/api/orders", { method: "POST", body: JSON.stringify({ total }) });
  }
}

class OrderUI {
  renderTotal(total: number) {
    document.getElementById("output")!.innerText = `Final Total: ${total}`;
  }
}
```

---

## 3. Why Curly's Law Matters

1. **Dramatic Cognitive Relief**: By restricting each code unit to a single goal, you only need to reason about one isolated concern at a time.
2. **Astounding Reusability**: When a function does only one thing, it can be easily reused in multiple places. If a function does three things, you cannot reuse it if you only need the first two.
3. **Safe Refactoring**: Because the code is highly focused, changes to one action have zero side effects on unrelated calculations.

---

## Resources & Deep Dive

* [Curly's Law: Do One Thing on Coding Horror](https://blog.codinghorror.com/curlys-law-do-one-thing/)
* [The Rule of One or Curly’s Law on GRS Mentor](https://www.grsmentor.com/post/curlys-law-the-rule-of-one-in-software-development)
* [Single Responsibility Principle (SRP)](/solid/srp)
