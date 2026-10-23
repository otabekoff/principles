---
title: DRY (Don't Repeat Yourself) vs WET (Write Everything Twice)
description: A complete guide to the tension between DRY and WET principles, AHA (Avoid Hasty Abstractions), and finding the balance in software design.
icon: RefreshCw
---

# DRY (Don't Repeat Yourself) vs WET (Write Everything Twice)

<CoverImage src="/covers/general/dry-wet.webp" alt="DRY vs WET">
  <h1>DRY vs WET</h1>
  <p>A split scene: on the left, a tiny white robot frantically repainting the same sign on twenty identical doors; on the right, the same robot calmly adjusting one master stencil that updates every door at once with a soft amber glow.</p>
</CoverImage>

> **"Every piece of knowledge must have a single, unambiguous, authoritative representation within a system."** — *Andy Hunt and Dave Thomas, The Pragmatic Programmer*
>
> **"Duplication is far cheaper than the wrong abstraction."** — *Sandi Metz*

In software engineering, two of the most frequently discussed (and frequently misunderstood) principles represent a fundamental architectural tension: **DRY (Don't Repeat Yourself)** and **WET (Write Everything Twice)**. 

While DRY advocates for consolidating knowledge and behavior into single, cohesive abstractions, WET advocates for pragmatic, delayed abstraction to avoid over-engineering and coupling. Achieving visual and logical elegance in a codebase requires understanding when to apply each of these companion philosophies.

---

## 1. DRY: Don't Repeat Yourself

The core of **DRY** is that each significant piece of functionality and every unique piece of knowledge in a program should be implemented in just one place.

* **Isolate Changes**: Modifying any single element of a system does not require cascading changes in other logically unrelated elements.
* **Eliminate Synchronization Failures**: When rules or constants are duplicated across files, developers inevitably forget to update one of the copies, leading to critical bugs.

### The Critical Distinction: Knowledge vs. Text Duplication
Many developers mistakenly apply DRY by merging any two blocks of code that look identical. This is a severe design mistake.

* **Text Duplication (Coincidental)**: Two separate business flows might currently calculate a value using identical formulas. However, if these flows serve different business domains (e.g. calculating a user's subscription discount vs calculating warehouse shipping tax), they represent **different knowledge**. Merging them couples these domains together. When subscription rules change tomorrow, you will accidentally break shipping tax.
* **Knowledge Duplication (DRY Violation)**: Representing a single business rule or system parameter in multiple places. If a database schema column length, a frontend form validator, a backend controller, and an API schema all hardcode the value `100` for a username character limit, you have duplicated knowledge. If that limit changes to `150`, you must update it in four separate files. That is a real DRY violation.

---

## 2. WET: Write Everything Twice (or Waste Everyone's Time)

The humorous counter-acronym **WET** stands for **"Write Everything Twice"** (promoting pragmatic copy-pasting), though in poorly designed enterprise systems it represents the painful anti-pattern: **Write Every Time**, **We Enjoy Typing**, or **Waste Everyone's Time**.

WET as a design philosophy is a direct response to **premature abstraction** (premature DRYing). When developers abstract too early, they lock themselves into a design before they have enough data to understand how the system will evolve.

### The Rule of Three
To prevent hasty abstractions, WET suggests the following rule of thumb:
1. **Need to solve a problem once?** Just solve it. No abstraction.
2. **Need to solve it again (twice)?** Just solve it again. Duplication of code is perfectly fine here because you do not yet have enough context on how the feature or business requirements will evolve.
3. **Need to solve it a third time?** Now, instead of writing the same code a third time, refactor the existing two instances to use a clean abstraction, and use this abstraction for the third time you need it. You now have three concrete examples of the behavior to design a correct, robust abstraction.

---

## Technical Contrast 1: The Danger of Hasty Helpers (WET Solution)

Imagine building validation for a user registration form and a checkout delivery form.

::: code-group

```ts [❌ Hasty Abstraction (Premature DRY)]
function validateInput(text: string, type: 'username' | 'address') {
  if (text.trim() === '') return false;
  // Coupled rules: what if addresses can have special characters but usernames can't?
  if (type === 'username') {
    return /^[a-zA-Z0-9]+$/.test(text);
  }
  return text.length > 5;
}
```

```ts [🌟 Adheres to WET (Duplicated but Decoupled)]
// Kept separate. If username rules change, delivery validation is safe.
function validateUsername(username: string): boolean {
  if (username.trim() === '') return false;
  return /^[a-zA-Z0-9]+$/.test(username);
}

function validateDeliveryAddress(address: string): boolean {
  if (address.trim() === '') return false;
  return address.length > 5;
}
```

:::

---

## Technical Contrast 2: The Single Choice Principle (DRY Solution)

Coined by Bertrand Meyer in his book *Object-Oriented Software Construction*, the **Single Choice Principle** is a formal subset of DRY. It states: *"Whenever a software system must support a set of alternatives, one and only one module in the system should know their complete list."*

::: code-group

```ts [❌ Violates Single Choice Principle]
// Multiple switch statements on the same list of alternatives across files
class InvoiceGenerator {
  calculateTax(userType: "Retail" | "Wholesale" | "NonProfit") {
    switch(userType) { /* ... */ }
  }
}

class ShippingService {
  getPriority(userType: "Retail" | "Wholesale" | "NonProfit") {
    switch(userType) { /* ... */ }
  }
}
// If you add a new "Enterprise" user type, you must locate and update both classes.
```

```ts [🌟 Adheres to Single Choice Principle]
// Consolidate alternatives using polymorphism
abstract class UserType {
  abstract getTaxRate(): number;
  abstract getShippingPriority(): string;
}

class RetailUser extends UserType {
  getTaxRate() { return 0.20; }
  getShippingPriority() { return "Standard"; }
}

class WholesaleUser extends UserType {
  getTaxRate() { return 0.10; }
  getShippingPriority() { return "Express"; }
}
// Adding "EnterpriseUser" simply requires a new subclass.
```

:::

---

## AHA: Avoid Hasty Abstractions

Popularized by Cher Scarlett, Sandi Metz, and Kent C. Dodds, **AHA (Avoid Hasty Abstractions)** provides the definitive bridge between DRY and WET:

> **"Prefer duplication over the wrong abstraction."**

Optimize for change and deletion first. High-end software design is not about writing the absolute minimum number of lines; it is about keeping modules isolated enough that they can be easily rewritten or safely thrown away when product requirements shift.

---

## Resources & Deep Dive

* [Don't Repeat Yourself on Wiki.c2.com](https://wiki.c2.com/?DontRepeat Yourself)
* [Don't Repeat Yourself on Wikipedia](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
* [DRY Principle: Its Benefit and Cost with Examples](https://thevaluable.dev/dry-principle-cost-benefit-example/)
* [Once And Only Once on Wiki.c2.com](https://wiki.c2.com/?OnceAndOnlyOnce)
* [Single Source of Truth on Wikipedia](https://en.wikipedia.org/wiki/Single_source_of_truth)
* [Abstraction Principle on Wikipedia](https://en.wikipedia.org/wiki/Abstraction_principle_(computer_programming))
* [Be careful with the code metric "duplicated lines"](https://rachelcarmena.github.io/2018/02/27/be-careful-with-code-metric-duplicated-lines.html)
