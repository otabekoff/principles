---
title: DRY (Don't Repeat Yourself)
description: A complete guide to the Don't Repeat Yourself (DRY) principle, Bertrand Meyer's Single Choice Principle, and AHA.
icon: RefreshCw
---

# DRY (Don't Repeat Yourself)

> "Every piece of knowledge must have a single, unambiguous, authoritative representation within a system." — Andy Hunt and Dave Thomas, *The Pragmatic Programmer*

The **DRY (Don't Repeat Yourself)** principle is one of the most famous guidelines in software engineering. Yet, it is also one of the most frequently misunderstood. At its core, DRY is not about physical text duplication; it is about the **duplication of knowledge, rules, and intent**.

---

## 1. The Core Definition: Knowledge vs. Text

Many developers mistakenly apply DRY by merging any two blocks of code that look identical. This is a severe design mistake.

* **Text Duplication (Coincidental)**: Two separate business flows might currently calculate a value using identical formulas. However, if these flows serve different business domains (e.g. calculating a user's subscription discount vs calculating warehouse shipping tax), they represent **different knowledge**. Merging them couples these domains together. When subscription rules change tomorrow, you will accidentally break shipping tax.
* **Knowledge Duplication (DRY Violation)**: Representing a single business rule or system parameter in multiple places. If a database schema column length, a frontend form validator, a backend controller, and an API schema all hardcode the value `100` for a username character limit, you have duplicated knowledge. If that limit changes to `150`, you must update it in four separate files. That is a real DRY violation.

---

## 2. Bertrand Meyer’s Single Choice Principle

Coined by Bertrand Meyer in his book *Object-Oriented Software Construction*, the **Single Choice Principle** is a formal subset of DRY. It states:

> "Whenever a software system must support a set of alternatives, one and only one module in the system should know their complete list."

### The Smell of Multiple Choices
If you have multiple `switch` statements or `if-else` blocks checking the same list of enums or types throughout your codebase:

```ts
// ❌ Violates Single Choice Principle: Multiple switches on the same list of alternatives
class InvoiceGenerator {
  calculateTax(userType: "Retail" | "Wholesale" | "NonProfit") {
    switch(userType) { ... }
  }
}

class ShippingService {
  getPriority(userType: "Retail" | "Wholesale" | "NonProfit") {
    switch(userType) { ... }
  }
}
```

If you add a new `Enterprise` user type, you must locate and update every single switch statement in the application.

### The Solution: Polymorphic Encapsulation
Enforce the Single Choice Principle by consolidating the list of alternatives into a single class hierarchy or a factory, using polymorphism to handle variant behavior:

```ts
// 🌟 Adheres to Single Choice Principle
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
```

Now, the complete list of alternatives is defined in only one structural layout. Adding `EnterpriseUser` simply requires creating a new subclass, without modifying any existing business logic.

---

## 3. WET (Write Everything Twice / Waste Everyone's Time)

The humorous counter-acronym to DRY is **WET**. While sometimes used to mean "Write Everything Twice" (promoting pragmatic copy-pasting), in enterprise systems it represents the painful anti-pattern: **Write Every Time**, **We Enjoy Typing**, or **Waste Everyone's Time**.

WET manifests heavily in **multi-tier applications** where a single database record field is duplicated across:
1. Database DDL / SQL Schema definition.
2. ORM Entity mapping model.
3. Backend DTO (Data Transfer Object) class.
4. OpenAPI / Swagger API schema.
5. Frontend API client type definition.
6. HTML Form template field.

Every time a field name changes, developers must perform a massive, manual find-and-replace sweep across the entire stack.

---

## 4. AHA: Avoid Hasty Abstractions

Popularized by Cher Scarlett, Sandi Metz, and Kent C. Dodds, **AHA (Avoid Hasty Abstractions)** provides a vital sanity check against over-zealous DRYing:

> "Prefer duplication over the wrong abstraction."

When you abstract too early, you lock yourself into a design before you have enough data to understand how the system will evolve.

```
                   THE PATH TO STABLE ABSTRACTION:
  ┌───────────────────┐     ┌───────────────────┐     ┌───────────────────┐
  │  Write it Once    ├────►│  Write it Twice   ├────►│  Write it Thrice  │
  │  (Just implement) │     │   (Coincidental)  │     │ (Clear pattern!)  │
  └───────────────────┘     └───────────────────┘     └─────────┬─────────┘
                                                                │ Refactor
                                                                ▼
                                                      ┌───────────────────┐
                                                      │ Clean Abstraction │
                                                      └───────────────────┘
```

### AHA Best Practices:
* **The Rule of Three**: Duplicate the code once or twice. On the third duplicate, the common pattern will be obvious, allowing you to build a clean, stable abstraction.
* **Optimize for Change**: High-end software design is not about writing the fewest lines of code; it is about writing code that is **easy to delete and easy to modify**. Identical code that serves distinct business flows should be left duplicated.
