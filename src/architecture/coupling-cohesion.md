---
title: Coupling and Cohesion
description: "The core metrics of software architecture: High Cohesion and Low Coupling."
icon: GitMerge
---

# Coupling and Cohesion

In software architecture, **Coupling** and **Cohesion** are the two primary metrics used to measure the quality of a system's design. The ultimate goal of any clean architecture is to achieve **High Cohesion** and **Low Coupling**.

```
    ┌────────────────────────────────────────────────────────┐
    │                 SOFTWARE QUALITY GOALS                 │
    ├───────────────────────────┬────────────────────────────┤
    │      HIGH COHESION        │        LOW COUPLING        │
    │  (Focus within a module)  │ (Independence of modules)  │
    └───────────────────────────┴────────────────────────────┘
```

---

## 1. Cohesion: Focus Within a Module

**Cohesion** measures how closely related and focused the responsibilities inside a single module, class, or function are.
- **Low Cohesion (Bad)**: A class tries to do many unrelated things (e.g., a `User` class that handles database connections, user validation, password hashing, and sending emails). This violates the **Single Responsibility Principle (SRP)**.
- **High Cohesion (Good)**: A class does one thing and does it exceptionally well (e.g., a `PasswordHasher` class whose only job is to hash and verify passwords).

### Code Smell: Low Cohesion (The Swiss Army Knife)

```ts
// ❌ Low Cohesion
class UserManager {
  saveUser(user: User) { /* ...db save... */ }
  hashPassword(password: string) { /* ...crypto... */ }
  sendWelcomeEmail(email: string) { /* ...smtp send... */ }
}
```

This class is disjointed. Crypto updates, DB schema changes, or email provider updates will all force this same class to change.

### The Solution: High Cohesion (Dedicated Modules)

```ts
//  High Cohesion
class UserRepository {
  saveUser(user: User) { /* Only DB operations */ }
}

class PasswordHasher {
  hash(password: string) { /* Only cryptography */ }
}

class EmailService {
  sendWelcome(email: string) { /* Only transactional emails */ }
}
```

---

## 2. Coupling: Independence Between Modules

**Coupling** measures how dependent different modules or classes are on each other.
- **Tight Coupling (Bad)**: Two classes are highly dependent. Changing a method inside Class A immediately breaks Class B. This makes the code fragile and extremely hard to refactor.
- **Loose Coupling (Good)**: Classes interact through clean, minimal interfaces. Class A doesn't know how Class B is implemented; it only knows its public contract.

### Code Smell: Tight Coupling

```ts
// ❌ Tight Coupling
class Car {
  private engine = new V8Engine(); // Directly instantiated!

  start() {
    this.engine.igniteSparkPlugs(); // Car must know internal details of V8Engine
  }
}
```

If we want to change `V8Engine` to an `ElectricEngine`, we must rewrite the `Car` class.

### The Solution: Loose Coupling via Abstractions

```ts
//  Loose Coupling
interface Engine {
  start(): void;
}

class Car {
  constructor(private engine: Engine) {} // Injected abstraction!

  start() {
    this.engine.start(); // Car only cares about the interface contract
  }
}
```

Now, `Car` is completely decoupled. We can pass a `V8Engine`, `ElectricEngine`, or a `MockEngine` for testing without modifying a single line of the `Car` class.
