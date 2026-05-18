---
title: YAGNI (You Aren't Gonna Need It)
description: A complete guide to the YAGNI (You Aren't Gonna Need It) principle.
icon: ShieldAlert
---

# YAGNI (You Aren't Gonna Need It)

> "Always implement things when you actually need them, never when you just foresee that you may need them." — Ron Jeffries, Extreme Programming co-founder

**YAGNI (You Aren't Gonna Need It)** is a core principle of Extreme Programming (XP) and agile software development. It serves as a strong guardrail against over-engineering and building features based on speculative future requirements.

## The Core Concept

As developers, we love to anticipate. When building a simple user login feature, we might think: *"We will probably need an audit log, multiple role types, API token support, and automatic password rotation later. I'll build the abstractions for those now so they are easy to add."*

YAGNI says: **Stop.** Do not build them now. Why?

1. **You might be wrong**: The business direction might change, and you might never need those features.
2. **Maintenance cost**: Every line of speculative code you write must be documented, tested, and maintained today, slowing down current development.
3. **Wrong abstractions**: When you build a feature before you have concrete requirements, you usually build the wrong abstraction, which actually makes it harder to implement the real requirement when it finally arrives.

### Code Smell: Speculative Design

```ts
// ❌ Violates YAGNI
class UserService {
  // We only need to fetch users today, but I'll write XML export,
  // PDF generator hooks, and soft-delete capabilities just in case!
  getUser(id: string) { /* ... */ }
  exportUserToXML(id: string) { /* ... */ }
  generateUserReportPDF(id: string) { /* ... */ }
  softDeleteUser(id: string) { /* ... */ }
}
```

### The Solution: Focus on the Present

Only write what you need to solve the current requirement, and rely on clean, modular design to ensure the code remains easy to expand when future requirements arrive.

```ts
//  Adheres to YAGNI
class UserService {
  getUser(id: string) {
    // Only implement the actual, validated requirement
    return database.findUser(id);
  }
}
```

## When to Ignore YAGNI

YAGNI should be ignored in architectural foundations where changing things later is extremely expensive (e.g., choice of primary database, microservice boundaries, or security/encryption choices). However, for application features and individual class designs, YAGNI should be your default mindset.
