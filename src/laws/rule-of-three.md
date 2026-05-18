---
title: Rule of Three
description: "A code refactoring rule of thumb: Three strikes and you refactor to avoid premature DRYing."
icon: Hash
---

# Rule of Three

> "Three strikes and you refactor." — Martin Fowler (Refactoring)

The **Rule of Three** is a widely accepted refactoring rule of thumb in computer programming. It provides a simple, quantitative guide for deciding when to extract duplicate code into a shared abstraction, balancing the benefits of **DRY (Don't Repeat Yourself)** with the safety of **WET (Write Everything Twice)**.

---

## The Core Concept

When writing code, you will frequently find yourself duplicating logic. The Rule of Three guides your decision-making in three simple steps:

1. **First Time**: Write the code in the simplest, most direct way. No abstraction.
2. **Second Time**: You need the same logic again. **Duplicate it**. It might feel dirty, but copy-pasting the code keeps the two use cases fully decoupled. You do not have enough information to write a clean abstraction yet.
3. **Third Time**: You need the same logic a third time. **Stop**. Now you have three concrete, real-world examples of how this logic is used. You can clearly see what is common and what is different. You may now safely refactor the code to extract a clean, reusable helper, utility, or class.

---

## Why Three?

- **One Use Case**: An abstraction is impossible because you only have one data point.
- **Two Use Cases**: The similarity might be coincidental. If you abstract now, you risk building the wrong abstraction (premature DRYing), leading to complex `if-else` flags when the two use cases inevitably diverge.
- **Three Use Cases**: A pattern is established. You now have enough context to design an interface that cleanly supports all three scenarios.
