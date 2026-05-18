---
title: Learning Tour
description: A guided learning tour of the Programming Principles documentation — what's here and how to use it.
icon: BookOpen
---

# Learning Tour

<CoverImage src="/covers/getting-started/learning-tour.png" alt="Cover">
  <h1>Learning Tour</h1>
  <p>A cheerful robot tour guide driving a tiny, sleek futuristic hover-bus filled with little curious baby robots peering out of the windows at grand, floating monuments representing SOLID, DRY, and GRASP principles.</p>
</CoverImage>

This learning tour explains how the Programming Principles documentation is structured, what each page contains, and how to navigate effectively depending on what you're trying to do.

## What's Covered

The documentation covers **over 43 foundational programming principles, laws, and aphorisms** across six key categories:

| Category                   | Count | Focus                                                                                                  |
| :------------------------- | :---- | :----------------------------------------------------------------------------------------------------- |
| **SOLID Principles**       | 5     | The gold standard of Object-Oriented Design (SRP, OCP, LSP, ISP, DIP).                                 |
| **General Principles**     | 10    | Real-world rules of thumb to avoid over-engineering (DRY, KISS, YAGNI, SoC, etc.).                     |
| **Pragmatic & Clean Code** | 8     | Tactical rules for clean, malleable codebases (Boy Scout, WET, Abstraction levels).                    |
| **Testing & Quality**      | 3     | Pragmatic strategies for fully testable and high-quality software (TDD, ZOMBIES).                      |
| **Software Architecture**  | 8     | High-level paradigms, separations, and structural metrics (Cohesion, Core/Shell, CQS).                 |
| **Laws & Aphorisms**       | 11    | Classical software engineering laws, aphorisms, and design philosophies (Gall's Law, Worse is Better). |

---

## Anatomy of a Principle Page

Every principle page follows a clean, highly structured layout to make it easy to study in-depth:

```
Overview       — The core definition and intent in simple language.
Core Concept   — The underlying logic and why the principle is critical.
Code Smell     — An example of poor code that violates the principle.
Solution       — A clean, refactored solution adhering to the principle.
Tradeoffs      — Honest analysis of when the principle adds unnecessary overhead.
Pragmatism     — Real-world guidance on when to relax or ignore the rule.
```

---

## How to Navigate

### Finding the Right Principle

If you are facing a specific design problem but aren't sure which principle applies, check the [Quick Reference](/quick-reference). It acts as a concise cheat sheet listing each principle's core intent, violation symptoms, and corresponding solutions.

### Searching

Use the search bar (`Cmd+K` on Mac, `Ctrl+K` on Windows) to instantly search for principles by name, synonyms, key concepts, or terms like "coupling", "cohesion", or "duplication".

---

## Suggested Learning Paths

How you explore this site depends on your experience level.

### Junior Developers

1. Start with the [Core Concepts](/core-concepts) page to understand what a "principle" is and how it differs from a "design pattern".
2. Study **KISS** (Keep It Simple) and **DRY** (Don't Repeat Yourself) first — they are the easiest to apply immediately to any codebase.
3. Move on to **YAGNI** (You Aren't Gonna Need It) and the **Boy Scout Rule** to protect yourself from complexity bloat and maintain cleanliness.
4. Learn the value of testing via **Pass the Tests & Testability**.
5. Read **If It Ain't Broke, Don't Fix It** and **The Zen of Python** for high-level, practical guidelines.

### Mid-Level & Senior Developers

1. Study **Liskov Substitution Principle (LSP)** and **Dependency Inversion Principle (DIP)** in-depth. These are the two most frequently misunderstood SOLID principles.
2. Read the **Composition over Inheritance** page to learn how to break out of rigid class inheritance trees.
3. Master **Functional Core, Imperative Shell** and **Command-Query Separation (CQS)** to write highly decoupled architectures.
4. Learn the **ZOMBIES Strategy** to systematically test complex code blocks and edge cases.
5. Study **Gall's Law** and **Worse is Better** to appreciate the power of evolution and simplicity in system designs.
6. Review the **GRASP** principles to improve your design intuition regarding responsibility assignment, low coupling, and high cohesion.

---

::: tip
Principles are meant to guide your thinking, not dictate your lines of code. Always value **simplicity**, **readability**, and **pragmatic delivery** over perfect compliance.
:::
