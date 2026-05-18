---
title: Mechanism and Policy
description: "A core Unix philosophy: Separate the mechanisms of a system (capabilities) from its policies (rules)."
icon: Split
---

# Separation of Mechanism and Policy

**Separation of Mechanism and Policy** is a fundamental design principle in computer science, most prominently featured in the Unix operating system and X Window System architectures. It states that the core capabilities of a system (the **mechanism**) should be kept completely separate from the rules governing how that system behaves (the **policy**).

---

## The Concepts Defined

- **Mechanism**: The low-level tools, operations, or capabilities provided by a system. It answers the question: _"How do we perform this capability?"_
- **Policy**: The high-level rules, configurations, or business decisions governing when and why the capabilities are used. It answers the question: _"What are the rules and parameters for using this capability?"_

If mechanism and policy are tightly coupled, the system is rigid and cannot be easily customized or adapted to different business rules.

---

## Real-World Example: Node.js Logger

Imagine building a logging utility for a web server:

```ts
// ❌ Coupled Mechanism and Policy
class CoupledLogger {
  log(message: string) {
    const formatted = `[${new Date().toISOString()}] ${message}`;

    // Mechanism (writing to console) is coupled with Policy (only in development environment)
    if (process.env.NODE_ENV === "development") {
      console.log(formatted);
    }
  }
}
```

If we want to change the policy to log to a file in production, we have to rewrite the `CoupledLogger` class.

### The Solution: Keep Them Separate

We extract the mechanism (how to log) and inject the policy (what / where / when to log) externally:

```ts
//  Separated Mechanism and Policy
interface LogTransport {
  write(message: string): void;
}

// Mechanism: knows how to log and format
class Logger {
  constructor(private transport: LogTransport) {}

  log(message: string) {
    const formatted = `[${new Date().toISOString()}] ${message}`;
    this.transport.write(formatted);
  }
}

// Policy: Governs when and where we log (decided at startup)
const transport =
  process.env.NODE_ENV === "production"
    ? new FileLogTransport("/var/log/app.log")
    : new ConsoleLogTransport();

const logger = new Logger(transport);
```

---

## Summary of Benefits

- **High Flexibility**: You can completely change the business rules (policy) of your application without modifying a single line of your core framework or utility code (mechanism).
- **Testability**: Mechanisms can be easily tested using simple mock policies.
- **Reusability**: The same core mechanisms can be reused across different projects that have entirely different policy requirements.
