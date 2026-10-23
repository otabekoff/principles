---
title: Test-Driven Development (TDD)
description: Master the classic Red-Green-Refactor loop and learn how test-driving code designs simpler systems.
icon: Route
---

# Test-Driven Development (TDD)

<CoverImage src="/covers/testing/test-driven-development.webp" alt="Test-Driven Development">
  <h1>Test-Driven Development</h1>
  <p>A tiny white robot tailor first drawing a chalk outline of a suit on fabric, then cutting and sewing exactly along that outline, with a red-green-amber cycle wheel hanging on the wall.</p>
</CoverImage>

**Test-Driven Development (TDD)** is an iterative software development process where you write a failing test *before* you write any production code. TDD is not just a testing technique; it is a **design methodology** that helps you understand requirements, keep code simple, and build highly decoupled architectures.

---

## The Red-Green-Refactor Loop

The core engine of TDD is a simple, rhythmic three-stage cycle:

```
    ┌───────────────┐
    │  🔴 RED       │ <--- Write a failing test first
    └───────────────┘
            │
            ▼
    ┌───────────────┐
    │  🟢 GREEN     │ <--- Write minimal code to make it pass
    └───────────────┘
            │
            ▼
    ┌───────────────┐
    │  🔵 REFACTOR  │ <--- Clean and optimize without breaking behavior
    └───────────────┘
            │
            └───────── Loop back for next feature
```

### 1. 🔴 Red (Write a failing test)
- Write a unit test for a single, small aspect of the feature you want to build.
- Run the test suite and verify that the new test **fails** (typically showing red in your terminal).
- This ensures your test is actually verifying the logic and that there are no false positives.

### 2. 🟢 Green (Make it pass)
- Write the **absolute minimum** amount of production code required to make the test pass (even if it's a hardcoded return value!).
- Run the test suite and watch it turn **green**.
- Do not write any code that is outside the scope of the test (adhering strictly to **YAGNI**).

### 3. 🔵 Refactor (Clean up)
- Once the test passes, look closely at the code you just wrote.
- Remove duplication, improve variable names, separate concerns, and clean up the design.
- Run the test suite after every small change to guarantee you didn't break any working behavior.

---

## Test-Drive Design (TDD as an Architect)

TDD forces you to act as the **first consumer** of your own API. 

Before you write a single line of implementation, you must formulate your ideas in a test. This forces you to answer critical design questions early:
- *What should this class be named?*
- *What arguments should the function accept?*
- *What should the return value look like?*
- *Is this interface easy and intuitive to use?*

If a class is hard to write a test for, it means the class design itself is coupled and complex. By ensuring testability first, you naturally steer the codebase towards modular, clean abstractions.

### TDD is WET and YAGNI on a Code Level

This basically is **YAGNI (You Aren't Gonna Need It)** and **WET (Write Everything Twice)** on a code level:
1. **Understand the problem**: First, think about what you need, understand the core problem, and formulate it strictly as a test.
2. **Just solve this test**: Then just solve this test. Write the absolute simplest code to pass. **Do not create unnecessary abstractions or add pre-emptive features.** Only when duplication emerges or new tests force refactoring should you introduce abstractions.

## Pragmatism: Don't Let Perfect Be the Enemy of Good

TDD is incredibly powerful, but it should be applied pragmatically. 
- You do not need 100% pure test coverage on verbose, volatile UI elements (like form variations).
- If a full unit test setup is too complex, having an E2E test (e.g., using **Cypress** or **Playwright**) that verifies the high-level workflow is vastly better than having no tests at all.
- Keep your tests focused on **business behavior** rather than internal implementation details. If refactoring your class internals requires rewriting all your tests, your tests are too tightly coupled to the implementation.
