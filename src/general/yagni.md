---
title: YAGNI (You Aren't Gonna Need It)
description: A complete guide to the YAGNI principle from Extreme Programming.
icon: ShieldAlert
---

# YAGNI (You Aren't Gonna Need It)

> "Always implement things when you actually need them, never when you just foresee that you need them." — *Ron Jeffries, Extreme Programming co-founder*

**YAGNI** (an acronym for **"You Aren't Gonna Need It"**) is a fundamental software design guideline stating that **you should not implement something until it is strictly necessary**.

---

## Why Avoid Early Implementation?

* **Lost Iteration Effort**: Any work spent preparing for a speculative feature that might be needed tomorrow directly steals time and focus away from concrete features that must be completed for the current iteration.
* **Code Bloat**: Speculative design leads to rapid code bloat. The codebase becomes unnecessarily large, convoluted, and difficult to comprehend, which increases future maintenance overhead.
* **Flawed Assumptions**: When you build ahead of schedule, you inevitably make incorrect assumptions about how the feature will actually be used, forcing you to rewrite or throw away the code later.

---

## How to Apply YAGNI

* **Always implement features at the exact moment they are needed**, never when you merely foresee or guess that they will be useful in the future.
* Rely on clean, simple, and highly modular code so that when a new requirement is approved, refactoring the codebase to support it is trivial.
* Continuously ask yourself the core Extreme Programming question: [Do The Simplest Thing That Could Possibly Work](/general/do-simplest-thing).

---

## The Origins in Extreme Programming

YAGNI is the philosophical backbone of the XP practice known as **"Do the simplest thing that could possibly work"** (DTSTTCPW). 

XP advocates for short development cycles, continuous integration, and rapid refactoring. In this environment, writing code for *tomorrow's* speculative problems actively harms *today's* velocity. YAGNI works safely in XP because it is supported by a safety net of **continuous automated testing** and **continuous refactoring**. If you need the feature later, the test suite guarantees you can safely refactor the system to support it.

---

## The Cost of Speculative Design

When developers build a simple feature, they often try to anticipate future needs: *"We only need to fetch users today, but I'll build XML export, PDF generation hooks, and soft-delete capabilities just in case!"*

YAGNI explicitly forbids this due to the hidden costs of speculative code:

1. **The Maintenance Tax**: Every line of unused code must be compiled, tested, documented, and read by future developers.
2. **The Wrong Abstraction**: When you build a feature without a concrete, immediate requirement, you usually guess the API boundary incorrectly. When the business finally needs the feature, you must dismantle your old speculative code before writing the real code.
3. **Delayed Delivery**: Time spent building unused features is time stolen from delivering immediate value to the user.

```mermaid
graph TD
    A[Business Request: User Login] -->|YAGNI Approach| B[Build Simple Login]
    A -->|Speculative Approach| C[Build Login]
    C --> D[Build Roles System]
    C --> E[Build Audit Logs]
    C --> F[Build 2FA Stubs]
    
    B -->|Ships in 1 Day| G(((Immediate Value)))
    D & E & F -->|Ships in 1 Week| H(((Delayed Value + Maintenance Debt)))
    
    style B stroke:#10b981,stroke-width:3px
    style G fill:#10b981,color:white
    style H fill:#ef4444,color:white
```

---

## Code Smell: Premature Generalization

```ts
// ❌ Violates YAGNI (Speculative Design)
class UserService {
  // Building massive infrastructure for features that haven't been requested.
  getUser(id: string) { /* ... */ }
  exportUserToXML(id: string) { /* ... */ }
  generateUserReportPDF(id: string) { /* ... */ }
  softDeleteUser(id: string) { /* ... */ }
}
```

## The Solution: Focus on the Present

Only write what you need to solve the current requirement. Rely on clean, modular design to ensure the code remains easy to expand when future requirements arrive.

```ts
//  Adheres to YAGNI
class UserService {
  getUser(id: string) {
    // Only implement the actual, validated requirement
    return database.findUser(id);
  }
}
```

---

## Related Concepts

- **KISS (Keep It Simple, Stupid)**: Favor simplicity in the solution you are building today.
- **Minimum Viable Product (MVP)**: The business-level equivalent of YAGNI.
- **Technical Debt**: Without the supporting XP practice of continuous refactoring, YAGNI can theoretically lead to messy, disorganized code (technical debt) when features are forcefully bolted on later.

---

## Resources & Deep Dive

* [You Aren't Gonna Need It on Wiki.c2.com](https://wiki.c2.com/?YouArentGonnaNeedIt)
* [You’re NOT Gonna Need It! by Ron Jeffries](https://ronjeffries.com/xprog/articles/practices/dontneed/)
* [You Aren't Gonna Need It on Wikipedia](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)
