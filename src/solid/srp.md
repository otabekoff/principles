---
title: Single Responsibility Principle (SRP)
description: A complete guide to the Single Responsibility Principle.
icon: Target
---

# Single Responsibility Principle (SRP)

> "A class should have one, and only one, reason to change." — Robert C. Martin

The **Single Responsibility Principle (SRP)** is one of the most fundamental guidelines for creating clean, modular, and maintainable software. It states that every module, class, or function should have responsibility over a single part of the functionality provided by the software, and that responsibility should be entirely encapsulated by the class.

## The Core Concept

The word "responsibility" in SRP can sometimes be confusing. A better way to think about it is in terms of **actors** or **reasons to change**. 

If a class does three different things, changes to any of those three requirements will require modifying the class. This increases the risk of introducing bugs in other unrelated parts of the class.

### Code Smell: The "God Object" or Multi-Tasker

Imagine a class `User` that handles user data, database persistence, and sending emails:

```ts
// ❌ Violates SRP
class User {
  constructor(public name: string, public email: string) {}

  saveToDatabase() {
    console.log(`Saving ${this.name} to the database...`);
  }

  sendWelcomeEmail() {
    console.log(`Sending email to ${this.email}...`);
  }
}
```

This class violates SRP because it has three reasons to change:
1. The business definition of a user changes.
2. The database schema or persistence mechanism changes.
3. The email provider or format changes.

### The Solution: Separation of Concerns

To follow SRP, we split these responsibilities into distinct classes, each focusing on exactly one job:

```ts
//  Adheres to SRP
class User {
  constructor(public name: string, public email: string) {}
}

class UserRepository {
  save(user: User) {
    console.log(`Saving ${user.name} to the database...`);
  }
}

class EmailService {
  sendWelcome(user: User) {
    console.log(`Sending email to ${user.email}...`);
  }
}
```

Now, if you want to switch from a relational database to a NoSQL database, you only modify `UserRepository`. `User` and `EmailService` remain untouched and safe.

## Tradeoffs and Pragmatism

While SRP is powerful, it can be taken to extremes. 

- **Pros**: Highly cohesive classes, easy testing (you only need to mock one responsibility), and low risk of side effects.
- **Cons**: Can lead to "class explosion" where a codebase is divided into too many tiny, single-method classes, making it harder to navigate and understand the big picture.

Always apply SRP with pragmatism. If a small utility class does two closely related small tasks that never change independently, keeping them together might be better than over-splitting.
