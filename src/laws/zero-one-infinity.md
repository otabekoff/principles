---
title: Zero-One-Infinity Rule
description: "A software design rule of thumb: A system should either disallow an entity, allow exactly one, or allow an infinite number."
icon: Infinity
---

# Zero-One-Infinity Rule

> "A software design rule of thumb that says that a system should not allow arbitrary limits on the number of instances of a particular entity. Instead, it should either disallow the entity entirely, allow exactly one, or allow an infinite number." — Willem van der Poel

The **Zero-One-Infinity (ZOI) Rule** suggests that when designing data structures, APIs, or systems, you should avoid setting arbitrary, hardcoded upper limits (like allowing exactly 5 files, 10 users, or 25 categories).

---

## The Rule Explained

When deciding how many instances of a feature or entity to support, there are only three logical choices:

1. **Zero (0)**: The entity is not allowed or supported at all.
2. **One (1)**: Exactly one instance is allowed (e.g., a Singleton class, a primary key, or a single active user session).
3. **Infinity (∞)**: Unlimited instances are allowed. You use dynamic collections (like Arrays, Lists, or Maps) that expand as long as system memory permits.

### Code Smell: Arbitrary Limits

Imagine writing a configuration class for a server that allows exactly three database connections:

```ts
// ❌ Violates Zero-One-Infinity (Hardcoded arbitrary limit)
class DBManager {
  private conn1?: Connection;
  private conn2?: Connection;
  private conn3?: Connection; // Why exactly three? What if we need four?
}
```

This requires custom, duplicated variable names and logic, and makes the system brittle.

### The Solution: Dynamic Infinity

Use a dynamic array or list that allows as many connections as the user wants, only bounded by hardware memory limits:

```ts
//  Adheres to Zero-One-Infinity (Infinite capacity)
class DBManager {
  private connections: Connection[] = []; // Allows 0, 1, or infinity!
}
```

---

## Why Arbitrary Limits Are Bad

- **Brittle Architecture**: Hardcoded limits (like `max_users = 100`) always get broken as businesses grow, forcing painful refactoring.
- **Complexity**: Writing code to enforce and handle arbitrary limits (e.g., checking if `count === 5` and throwing errors) adds unnecessary complexity compared to simple dynamic lists.
