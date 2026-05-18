---
title: Dependency Inversion Principle (DIP)
description: A complete guide to the Dependency Inversion Principle.
icon: GitCommit
---

# Dependency Inversion Principle (DIP)

> "Depend upon abstractions, [not] concretions." — Robert C. Martin

The **Dependency Inversion Principle (DIP)** is a key guideline for reducing coupling between different parts of a software system. It dictates how modules should interact with each other.

## The Core Concept

DIP is divided into two primary rules:
1. High-level modules should not depend on low-level modules. Both should depend on abstractions.
2. Abstractions should not depend on details. Details (concrete implementations) should depend on abstractions.

"High-level" modules contain the complex business logic of your application, while "low-level" modules handle utility details like database connection, file storage, email APIs, or network requests. Under a traditional top-down design, high-level components directly instantiate low-level components, making the high-level logic hard to reuse or test.

### Code Smell: High-level directly coupled to Low-level

Imagine a `NotificationManager` that directly instantiates and depends on a concrete `EmailSender`:

```ts
// ❌ Violates DIP
class EmailSender {
  sendEmail(message: string) {
    console.log(`Email: ${message}`);
  }
}

class NotificationManager {
  private emailSender = new EmailSender();

  notify(message: string) {
    // Rigidly coupled to EmailSender!
    this.emailSender.sendEmail(message);
  }
}
```

If you want to switch from sending emails to sending SMS or Push Notifications, you must modify the `NotificationManager` itself. You also cannot easily test `NotificationManager` without hitting real email logic.

### The Solution: Introduce an Abstraction

We create an interface (abstraction) that represents the action, and make both high-level and low-level classes depend on it:

```ts
//  Adheres to DIP
interface MessageSender {
  send(message: string): void;
}

// Low-level details implement the abstraction
class EmailSender implements MessageSender {
  send(message: string) {
    console.log(`Email: ${message}`);
  }
}

class SMSSender implements MessageSender {
  send(message: string) {
    console.log(`SMS: ${message}`);
  }
}

// High-level module depends ONLY on the abstraction
class NotificationManager {
  constructor(private sender: MessageSender) {}

  notify(message: string) {
    this.sender.send(message);
  }
}
```

Now, the low-level sender is "injected" into the high-level module (using the **Dependency Injection** pattern). `NotificationManager` is completely decoupled from the details of how the message is sent.

## Tradeoffs and Pragmatism

- **Pros**: Extreme flexibility, complete testability (you can pass mock senders in tests), and easily reusable business logic.
- **Cons**: Requires creating extra interfaces and managing dependency injection lifecycle (often requiring DI containers or setup code in a main file).

If you are writing a small script or a component that will never need another implementation or test double, introducing interfaces solely to satisfy DIP might be premature. Apply it where flexibility and isolation are required.
