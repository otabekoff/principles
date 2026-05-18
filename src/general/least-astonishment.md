---
title: Principle of Least Astonishment
description: A complete guide to the Principle of Least Astonishment (POLA).
icon: Compass
---

# Principle of Least Astonishment

> "If a necessary feature has a high astonishment factor, it may be necessary to redesign the feature."

The **Principle of Least Astonishment (POLA)** (or **Principle of Least Surprise**) states that a component of a system should behave in a way that most users and developers would expect it to behave. The behavior should not surprise, confuse, or astonish anyone who reads or uses it.

## The Core Concept

When designing APIs, functions, class methods, or user interfaces, your design should align with existing conventions and expectations. If a function is named `getUser(id)`, its only job should be to fetch and return a user. 

If `getUser(id)` also secretly modifies a database flag, initiates a payment, or takes 10 seconds because it triggers a heavy background job synchronously, it highly **astonishes** the developer calling it.

## Code Smells that Astonish

1. **Side Effects in Getters**: Functions with names like `get` or `is` modifying state.
2. **Inconsistent Naming**: Using `removeUser` in one controller, `deleteUser` in another, and `destroyUser` in a third.
3. **Magic Behaviors**: Global modifications, monkey-patching core language prototypes, or implicit type conversions that cause unexpected bugs.
4. **Ignoring Platform Conventions**: E.g., returning a successful HTTP status code `200 OK` for a server error or a request that failed validation.

### Example: Astonishing Side Effects

```ts
// ❌ Violates POLA
class Cache {
  private data = new Map<string, string>();

  // A getter should only read!
  getValue(key: string): string | undefined {
    if (!this.data.has(key)) {
      // Surprise! Getting a missing key automatically writes a dummy value!
      this.data.set(key, "DEFAULT_DUMMY");
    }
    return this.data.get(key);
  }
}
```

This violates POLA because a simple read operation modifies the state of the cache in a surprising way.

### The Solution: Predictable, Consistent APIs

Keep methods focused, clear, and side-effect-free unless their name explicitly signals otherwise:

```ts
//  Adheres to POLA
class Cache {
  private data = new Map<string, string>();

  getValue(key: string): string | undefined {
    return this.data.get(key);
  }

  ensureValue(key: string, defaultValue: string): string {
    if (!this.data.has(key)) {
      this.data.set(key, defaultValue);
    }
    return this.data.get(key)!;
  }
}
```

Now, the side-effect-prone behavior is isolated to a method whose name clearly describes the intent.

## How to Apply POLA
- Use industry-standard naming conventions.
- Make functions deterministic and pure where possible.
- Write clear, visible documentation or use type definitions (like TypeScript) to prevent misinterpretation of method behaviors.
