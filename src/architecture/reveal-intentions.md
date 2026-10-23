---
title: Reveal Intentions
description: Write self-documenting code by choosing descriptive names that reflect purpose, structure, and intent.
icon: Eye
cardPrompt: "A row of clear glass jars with neat descriptive labels on a pantry shelf."
---

# Reveal Intentions

<CoverImage src="/covers/architecture/reveal-intentions.webp" alt="Reveal Intentions">
  <h1>Reveal Intentions</h1>
  <p>A tiny white robot fixing clear, descriptive labels onto glass jars in a sunny pantry, next to a dusty shelf of identical unmarked jars nobody can tell apart.</p>
</CoverImage>

> "Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler

The principle of **Revealing Intentions** suggests that code should be self-documenting. By choosing descriptive names for variables, functions, and classes that reflect their true purpose and structure, you allow other developers (and your future self) to understand the code at a glance without having to decipher ambiguous meanings.

---

## 1. Intent-Revealing Naming

Avoid generic or encrypted names (like `a`, `data`, `process`, `temp`). Names should explain:
- **Why** the variable/function exists.
- **What** it does.
- **How** it is used.

### Code Smell: Deciphering Cryptic Names

```ts
// ❌ Violates Reveal Intentions
function calc(d: number, t: number): number {
  let s = 60;
  let res = (d / t) * s;
  return res;
}
```

To understand this code, the reader has to look at the math and guess that `d` is distance, `t` is minutes, and `s` is 60 (to convert to hours), and the result is speed in km/h.

### The Solution: Self-Documenting Code

```ts
//  Reveals Intentions
function calculateSpeedInKmPerHour(distanceInKm: number, timeInMinutes: number): number {
  const MINUTES_PER_HOUR = 60;
  const speed = (distanceInKm / timeInMinutes) * MINUTES_PER_HOUR;
  return speed;
}
```

The refactored function requires zero comments or explanation. Its intention is perfectly revealed.

---

## 2. Document the "Why", Not the "What"

If your code is clean and reveals its intentions, you do not need comments that restate what the code is doing. Comments should be reserved for explaining **why** a certain, non-obvious approach was taken (e.g., historical constraints, performance workarounds, or business rules).

```ts
// ❌ Redundant "What" Comment
// Check if user is active
if (user.isActive) {
  // Save user token
  saveToken(user.token);
}
```

```ts
//  Meaningful "Why" Comment
if (user.isActive) {
  // We save the token in localStorage here because legacy mobile Safari
  // does not persist secure httpOnly cookie sessions reliably across refreshes.
  saveToken(user.token);
}
```

## Summary of Guidelines

- **Use Pronounceable and Searchable Names**: Avoid acronyms and shortcuts (e.g., use `subscriptionIntervalInDays` instead of `subIntDays`).
- **Be Consistent**: Use the same word for the same concept throughout the project (e.g., don't use `fetchUser`, `getUser`, and `retrieveUser` interchangeably).
- **Make Code Read Like Prose**: Write clear, descriptive method calls so the flow is as natural to read as a storybook.
