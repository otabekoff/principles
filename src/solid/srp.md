---
title: Single Responsibility Principle (SRP)
description: "A complete guide to Robert C. Martin's Single Responsibility Principle (SRP), its cohesion roots in DeMarco and Page-Jones, and actor-based change analysis."
icon: Target
cardPrompt: "A single chef's knife resting beside one neatly sliced vegetable on a clean cutting board."
---

# Single Responsibility Principle (SRP)

<CoverImage src="/covers/solid/srp.webp" alt="Single Responsibility">
  <h1>Single Responsibility</h1>
  <p>A calm tiny white robot chef doing one thing perfectly, slicing vegetables, beside a chaotic counter where a stressed robot juggles cooking, washing dishes and answering the phone all at once.</p>
</CoverImage>

> **"A class should never have more than one reason to change."** — *Robert C. Martin*

The **Single Responsibility Principle (SRP)**—the **S** in the **SOLID** design system—is a fundamental guideline for creating modular, robust, and maintainable software.

Every class or module should have a **single responsibility**, and that responsibility should be **entirely encapsulated** by the class. Under this principle, a "responsibility" is formally defined as a *reason to change*. Therefore, a class or module should have one, and only one, reason to change.

---

## Why Apply SRP?

* **High Maintainability**: By ensuring each class has only a single axis of change, system maintenance becomes clean and predictable. Future changes requested by business rules should only require modifications inside a single class or module, rather than triggering cascading changes across the system.

## How to Apply It

* **Apply [Curly's Law](/laws/curlys-law)**: Ensure each variable, function, class, and module has exactly one clearly defined goal—Do One Thing.

---

---

## 1. History and Cohesion Roots

While Robert C. Martin introduced and popularized the SRP term in his seminal 2003 book, ***Agile Software Development, Principles, Patterns, and Practices***, the principle has deep roots in structured software engineering theory:

```
                            THE SRP EVOLUTION:
   ┌────────────────────────────────────────────────────────────────────────┐
   │ 1978: Tom DeMarco (Structured Analysis and System Specification)       │
   │       -- Coined initial concepts of functional cohesion in modules.   │
   │                                                                        │
   │ 1980: Meilir Page-Jones (The Practical Guide to Structured Systems Design)│
   │       -- Formalized modular coupling and structural cohesion metrics.  │
   │                                                                        │
   │ 2003: Robert C. Martin (Agile Software Development, PPP)               │
   │       -- Transferred structured cohesion concepts to OOP as SRP.       │
   └────────────────────────────────────────────────────────────────────────┘
```

Martin designed SRP as an object-oriented translation of the classic structured concept of **Cohesion**. A cohesive module is one where all internal functions and statements work together to achieve a single unified goal.

---

## 2. Defining "Responsibility": The Actor Concept

The most common point of confusion surrounding SRP is the definition of "responsibility" or "reason to change." In his 2014 clarification blog post, Martin simplified the definition by mapping responsibilities directly to **Actors**:

> *"Another wording for the Single Responsibility Principle is: Gather together the things that change for the same reasons. Separate those things that change for different reasons. A class should be responsible to one, and only one, actor."*

An **Actor** represents a group of users, stakeholders, or business roles who demand a change in a specific feature. 

```
                          ACTORS VS. CLASS COUPLING:
   ┌───────────────────────────┐           ┌────────────────────────────┐
   │        ACTOR 1            │           │          ACTOR 2           │
   │   Accountant (Finance)    │           │    Database Admin (DBA)    │
   └───────────────────────────┘           └────────────────────────────┘
                 │                                       │
                 ▼                                       ▼
   ┌────────────────────────────────────────────────────────────────────┐
   │                       ❌ THE COUPLED CLASS                         │
   │                                                                    │
   │  - calculatePay()  -- Requested by Finance to change calculation.  │
   │  - saveEmployee()  -- Requested by DBA to change DB scheme.        │
   │                                                                    │
   │ Problem: A change requested by Finance risks breaking DBA database │
   │          operations, and vice versa.                               │
   └────────────────────────────────────────────────────────────────────┘
```

Even if the Accountant and the Database Administrator are represented by the same physical person in a small startup, they represent **different business roles** and will demand modifications at different times for entirely different reasons. Putting their respective logic in a single class couples their risks.

---

## 3. Case Study: The Report Compiler and Printer

Consider a software module that compiles a business report and prints it out:

### ❌ The Code Smell: Coupled Responsibilities
This design encapsulates two entirely different axes of change in a single class:

```ts
// ❌ Violates SRP: Two reasons to change, two different actors!
class ReportManager {
  constructor(private rawData: object) {}

  // Actor 1: Business Analyst (wants to change what content is presented)
  compileReportData(): string {
    return `Report Content: ${JSON.stringify(this.rawData)}`;
  }

  // Actor 2: Print Administrator (wants to change the page margins/format)
  printReport(content: string): void {
    console.log(`Printing on paper: ${content}`);
  }
}
```

If the printing library is upgraded or the layout margins are adjusted, we are forced to rewrite `ReportManager`. This modification runs a high risk of breaking the unrelated data compilation logic.

### 🌟 The Solution: Decoupled and Actor-Focused Modules
We split these responsibilities into distinct classes, ensuring that each class answers to exactly one actor:

```ts
// 🌟 Adheres to SRP: Single reason to change per class!

// Responsible purely to Actor 1: The Business Analyst
class ReportCompiler {
  constructor(private rawData: object) {}

  compile(): string {
    return `Report Content: ${JSON.stringify(this.rawData)}`;
  }
}

// Responsible purely to Actor 2: The Print Administrator
class ReportPrinter {
  print(content: string): void {
    console.log(`Printing on A4 paper with 1-inch margins: ${content}`);
  }
}
```

If we change the printing layout (e.g. printing to PDF instead of physical paper), we modify `ReportPrinter`. The `ReportCompiler` remains completely untouched, tested, and safe.

---

## 4. Advantages and Pragmatic Boundaries

### Advantages:
* **Extreme Testability**: Writing unit tests for an SRP class is trivial. You do not need to construct complex mocks for secondary responsibilities.
* **Low Regression Risk**: Changes requested by one department cannot accidentally inject bugs into features used by an entirely different department.
* **Understandability**: A developer can read an SRP file and instantly grasp its entire capability in under 10 seconds.

### The "Class Explosion" Trap:
Applying SRP blindly can lead to **Class Explosion**, where a simple application is fragmented into hundreds of single-method classes. 

Always balance SRP with the **KISS Principle**. If two small utility operations are highly cohesive and always change together for the exact same reasons, keeping them in a single class is highly pragmatic. Apply SRP when you identify clear, divergent axes of change driven by different business stakeholders.

---

## Resources & Deep Dive

* [Single Responsibility Principle on Wikipedia](https://en.wikipedia.org/wiki/Single-responsibility_principle)
* [Curly's Law: Do One Thing](/laws/curlys-law)
