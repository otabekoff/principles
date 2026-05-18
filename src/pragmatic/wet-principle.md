---
title: WET (Write Everything Twice)
description: A complete guide to the WET principle and avoiding hasty abstractions.
icon: Layers
---

# WET (Write Everything Twice)

> "Duplication is far cheaper than the wrong abstraction." — Sandi Metz

While **DRY (Don't Repeat Yourself)** is an essential guideline, developers often apply it prematurely, leading to over-engineered code and tight coupling. **WET (Write Everything Twice)**—sometimes described as **AHA (Avoid Hasty Abstractions)**—is a pragmatic counter-philosophy that encourages delaying abstraction until you have sufficient information.

## The Core Concept

When developers see identical lines of code, their immediate reflex is to extract them into a shared utility or parent class. However, this carries a major risk: **premature abstraction**.

If you abstract two similar blocks of code too early:
1. They might look identical today but represent completely different business behaviors.
2. In the future, one flow will need to change, and you will be forced to add complex `if-else` flags to the shared abstraction.
3. Over time, the shared function becomes a tangled, unmaintainable mess because it is trying to satisfy two unrelated masters.

WET suggests a simple rule of thumb: **"Write everything twice (or even thrice) before abstracting."**

## The Rule of Three

Don't create an abstraction that you don't need yet.
1. **Need to solve a problem?** Just solve it. No abstraction.
2. **Need to solve it again?** Just solve it again. Duplication of code is perfectly fine here because you do not yet have enough context on how the feature will evolve.
3. **Need to solve it a third time?** Now, instead of writing the same code a third time, refactor the existing two instances to use a clean abstraction, and reuse this abstraction for the third time you need it. You now have three concrete examples of the behavior to design a correct, robust abstraction.

### Code Smell: The Hasty Shared Helper

Imagine building validation for a user registration form and a checkout delivery form:

```ts
// ❌ Hasty Abstraction (premature DRY)
function validateInput(text: string, type: 'username' | 'address') {
  if (text.trim() === '') return false;
  // Coupled rules: what if addresses can have special characters but usernames can't?
  if (type === 'username') {
    return /^[a-zA-Z0-9]+$/.test(text);
  }
  return text.length > 5;
}
```

This single helper function is already coupled to two entirely unrelated features. A change in username validation parameters might accidentally break delivery address validation.

### The Solution: Keep Them Independent Until a Clear Pattern Emerges

Duplicate the code. Keep them separate. Only abstract them when they are truly doing the exact same logical task:

```ts
//  Adheres to WET (Duplicated, but decoupled!)
function validateUsername(username: string): boolean {
  if (username.trim() === '') return false;
  return /^[a-zA-Z0-9]+$/.test(username);
}

function validateDeliveryAddress(address: string): boolean {
  if (address.trim() === '') return false;
  return address.length > 5;
}
```

These two functions are decoupled. If the username rules change tomorrow, you only edit `validateUsername` with absolutely zero risk of breaking your delivery forms.

## Summary

- **Write Everything Twice**: Duplication is cheap and safe.
- **Abstract Thrice**: Abstraction is powerful but expensive. Delay it until the third use case reveals the correct design.
