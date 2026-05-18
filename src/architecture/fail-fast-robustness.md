---
title: Fail-Fast & Robustness
description: Design software that crashes early on anomalies to guarantee state correctness and robust recovery.
icon: ZapOff
---

# Fail-Fast & Robustness

A common dilemma in system architecture is deciding whether to continue execution when a minor error or state anomaly occurs. The **Fail-Fast** principle suggests that a system should immediately stop execution and raise an error as soon as it detects any anomaly, rather than trying to proceed in an undefined, corrupted state.

---

## 1. Fail-Fast: Preventing Silent Corruption

When a system runs in a "broken" state (e.g., a missing configuration option, a database connection failure, or a null pointer in a critical function):
- **If you proceed silently (Defensive over-kill)**: The program might compile and run, but it will save corrupted data into the database, perform incorrect payments, or write useless logs. Locating the root cause of these silent bugs in production is a developer's worst nightmare.
- **If you Fail-Fast**: The program terminates immediately, logs a stack trace, and triggers alerts. The bug is identified instantly during development, testing, or initial deployment before any damage is done.

### Code Smell: Silent Continuation

```ts
// ❌ Violates Fail-Fast
class PaymentGateway {
  processPayment(amount: number, currency: string) {
    if (!currency) {
      currency = 'USD'; // ⚠️ Silent fallback! What if the user wanted EUR?
    }
    this.sendToBank(amount, currency);
  }
}
```

This silent fallback can lead to major financial discrepancies and angry customers.

### The Solution: Fail-Fast Assertions

```ts
//  Fail-Fast
class PaymentGateway {
  processPayment(amount: number, currency: string) {
    if (!currency) {
      // Crash immediately! Let the developer or calling controller know their parameter is broken.
      throw new Error("[Validation Error] Payment currency must be specified explicitly.");
    }
    this.sendToBank(amount, currency);
  }
}
```

---

## 2. Robustness (Graceful Recovery)

While **Fail-Fast** is applied *locally* inside functions and classes, the system as a whole must be **Robust**. A robust system handles failures gracefully at higher orchestration levels:
- **Crash-Recovery**: Use process managers (like PM2, Docker, or Kubernetes) that automatically restart an application container if it fails-fast and crashes.
- **Transactional Safety**: Ensure that database transactions are rolled back completely on error, so partial writes never occur.
- **Circuit Breakers**: If an external microservice fails-fast repeatedly, open the circuit and return structured fallbacks without crashing the entire system.

## Summary

- **Fail-Fast Locally**: Raise errors early, assert assumptions, and refuse to work with invalid data.
- **Recover Globally**: Catch and handle errors at the system boundaries, roll back transactions, and let the supervisor restart the failed processes.
