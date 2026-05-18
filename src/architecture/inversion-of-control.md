---
title: Inversion of Control (IoC)
description: Master Inversion of Control (IoC) and learn how to decouple your modules using the Hollywood Principle.
icon: RefreshCw
---

# Inversion of Control (IoC)

> "Don't call us, we'll call you." — The Hollywood Principle

**Inversion of Control (IoC)** is a core software design philosophy in which the control flow of a program is inverted compared to traditional imperative programming. Instead of your custom code directly calling library methods and managing class instances, a framework or runtime container takes control and calls *your* code when needed.

---

## Traditional Flow vs. Inverted Flow

### 1. Traditional Control Flow
In a traditional flow, your custom application code is the driver. It instantiates dependencies, calls database connections, and drives the execution sequence.

```
  ┌────────────────────────────────────────────────────────┐
  │                 YOUR CUSTOM MAIN CODE                  │
  └───────────────────────────┬────────────────────────────┘
                              │
                              ▼ [Creates & Calls]
  ┌────────────────────────────────────────────────────────┐
  │               DATABASE / NETWORK LIBRARY               │
  └────────────────────────────────────────────────────────┘
```

```ts
// ❌ Traditional Flow (Main code drives everything, hard to test or extend)
class App {
  start() {
    const db = new MySQLDatabase(); // App manages database lifecycle!
    db.connect();
    const server = new HTTPServer();
    server.listen(8080);
  }
}
```

### 2. Inverted Control Flow (IoC)
In an inverted flow, a generic framework acts as the driver. It manages class lifecycles and instantiates dependencies. Your custom code is registered as a plugin or event listener, and the framework calls your methods.

```
  ┌────────────────────────────────────────────────────────┐
  │                  FRAMEWORK / IoC CONTAINER             │
  │                  (Manages lifecycle, drives flow)       │
  └───────────────────────────┬────────────────────────────┘
                              │
                              ▼ [Injects & Calls]
  ┌────────────────────────────────────────────────────────┐
  │                 YOUR CUSTOM PLUGINS/CODE               │
  └────────────────────────────────────────────────────────┘
```

```ts
//  Inverted Flow (IoC via Dependency Injection)
class App {
  constructor(private db: Database, private server: Server) {} // Lifecycle managed externally!

  start() {
    this.db.connect();
    this.server.listen(8080);
  }
}
```

---

## Forms of Inversion of Control

IoC is a broad architectural umbrella that includes several concrete patterns:

1. **Dependency Injection (DI)**: Passing dependencies (abstractions) to a class constructor rather than letting the class instantiate them directly (e.g., using containers like NestJS, Spring, or simple constructor passing).
2. **Event Listeners / Pub-Sub**: The system raises an event, and registered callback functions are executed. The callers don't know who is listening.
3. **Template Method Pattern**: A parent class defines the skeleton of an algorithm, and subclasses override specific hook methods to provide custom details.

## Summary of Benefits

- **Loose Coupling**: Classes are completely decoupled from concrete dependencies.
- **Easy Mocking & Testing**: Since dependencies are injected, they can be easily replaced with mocks in unit tests.
- **Flexibility**: You can swap out a module implementation (e.g., swapping a MySQL database driver for MongoDB) without changing your main application orchestration.
