---
title: Interface Segregation Principle (ISP)
description: A complete guide to the Interface Segregation Principle.
icon: LayoutGrid
---

# Interface Segregation Principle (ISP)

> "Clients should not be forced to depend on methods they do not use." — Robert C. Martin

The **Interface Segregation Principle (ISP)** deals with the size and focus of interfaces. It suggests that it is better to have many small, highly specific interfaces than a single large, general-purpose one.

## The Core Concept

When an interface is too large, classes that implement it are often forced to write "dummy" implementations for methods they don't actually need. This creates unnecessary dependencies and couples the implementing classes to details they shouldn't care about.

### Code Smell: Fat Interfaces

Imagine a single interface `Worker` for all types of employees:

```ts
// ❌ Violates ISP
interface Worker {
  work(): void;
  eat(): void;
  code(): void;
}

class SoftwareEngineer implements Worker {
  work() { console.log("Designing and writing systems..."); }
  eat() { console.log("Eating lunch..."); }
  code() { console.log("Writing code..."); }
}

class SecurityGuard implements Worker {
  work() { console.log("Patrolling the premises..."); }
  eat() { console.log("Eating lunch..."); }
  code() {
    // Security guards do not code!
    throw new Error("I don't know how to code!");
  }
}
```

Because `Worker` is too fat, `SecurityGuard` is forced to implement a `code` method that it cannot support.

### The Solution: Granular, Focused Interfaces

By breaking down the fat interface into smaller, single-responsibility interfaces, implementing classes can choose exactly what they support:

```ts
//  Adheres to ISP
interface Workable {
  work(): void;
}

interface Feedable {
  eat(): void;
}

interface Codable {
  code(): void;
}

class SoftwareEngineer implements Workable, Feedable, Codable {
  work() { console.log("Designing systems..."); }
  eat() { console.log("Eating lunch..."); }
  code() { console.log("Writing code..."); }
}

class SecurityGuard implements Workable, Feedable {
  work() { console.log("Patrolling..."); }
  eat() { console.log("Eating lunch..."); }
}
```

Now, each client only depends on the specific contracts it actually uses, eliminating redundant implementations and dead code.

## Tradeoffs and Pragmatism

- **Pros**: Kept interfaces small and focused, easy testing, decoupled clients, and highly cohesive codebase.
- **Cons**: Can result in a very high number of small interfaces, which might increase the cognitive load of navigating the codebase.

In dynamic languages (like JavaScript or Python) that don't enforce static types, ISP is less about language syntax and more about not forcing client objects to accept unnecessary methods, preventing coupling.
