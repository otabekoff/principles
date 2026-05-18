---
title: Make It Work, Right, Fast
description: "A practical workflow for software development: Make it work, make it right, make it fast."
icon: Zap
---

# Make It Work, Make It Right, Make It Fast

> "Make it work, make it right, make it fast." — Kent Beck

This principle outlines a highly disciplined, three-stage workflow for building software. It prevents developers from getting paralyzed by trying to write perfect, optimized code on the first attempt, instead breaking the development process into manageable, logical phases.

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│ Make It Work │ ───> │ Make It Right│ ───> │ Make It Fast │
└──────────────┘      └──────────────┘      └──────────────┘
```

---

## Phase 1: Make It Work

Your first goal is to **solve the problem**. 

- Do not worry about clean architecture, perfect naming, design patterns, or execution speed.
- Write direct, simple, and even "ugly" code if necessary.
- Focus entirely on getting the feature to pass its tests and behave correctly.

Why? Because until you have a working solution, you don't fully understand the problem. Working code gives you a baseline of correctness that you can verify.

## Phase 2: Make It Right

Once the code works and the tests pass, **refactor it**.

- Clean up the code.
- Apply design principles (SOLID, DRY, KISS).
- Rename variables to reveal intent.
- Break down large functions.
- Write unit tests if you haven't already.

This is where you pay down the technical debt you accumulated in Phase 1. Since you already have a passing test suite, you can refactor with complete confidence that you aren't breaking the working behavior.

## Phase 3: Make It Fast

Only after the code works and is clean should you think about **optimization**.

- Measure performance using a profiler.
- Locate actual bottlenecks.
- Apply targeted optimizations (e.g., caching, better algorithms, index structures).

::: danger The Danger of Skipping Steps
- **Skipping "Make It Right"**: Leads to a mountain of technical debt, unreadable code, and regression bugs.
- **Skipping "Make It Work" (trying to go straight to "Make It Fast")**: Leads to premature optimization, over-engineering, and highly complex, bug-ridden code that might not even solve the original problem.
:::
