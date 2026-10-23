---
title: Interface Segregation Principle (ISP)
description: A complete guide to the Interface Segregation Principle, its historical Xerox origins, and modern software design applications.
icon: LayoutGrid
cardPrompt: "A slim three-button remote labelled \"WHAT I NEED\" beside a giant remote crowded with buttons labelled \"EVERYTHING\", a happy face picking the small one."
---

# Interface Segregation Principle (ISP)

<CoverImage src="/covers/solid/isp.webp" alt="Interface Segregation">
  <h1>Interface Segregation</h1>
  <p>A tiny white robot picking a slim, single-purpose remote with three buttons off a wall hook, ignoring a giant remote with hundreds of confusing buttons hanging right next to it.</p>
</CoverImage>

> **"Reduce fat interfaces into multiple smaller and more specific client-specific interfaces. An interface should be more dependent on the code that calls it than the code that implements it."** — *Robert C. Martin*

The **Interface Segregation Principle (ISP)** represents the **I** in the **SOLID** programming principles. 

---

## Why Apply ISP?

* **Keep Systems Decoupled**: Restricting client dependencies to highly focused interfaces keeps modules completely isolated. This makes the system significantly easier to refactor, change, test, and redeploy.

---

## How to Apply It

* **Avoid Fat Interfaces**: Restructure bulky, multi-purpose interfaces into narrow, cohesive role interfaces. 
* **Honor Single Responsibility Principle (SRP)**: Ensure classes never have to implement interface methods they do not use, preventing them from violating the [Single Responsibility Principle](/solid/srp).

---

Beyond traditional object-oriented design, ISP is a core principle in the architecture of **distributed systems** and stands as one of the six **IDEALS principles for microservice design**.

---

## 1. The Historical Origin: The Xerox Printer Crisis

The Interface Segregation Principle was first formulated by **Robert C. Martin** (Uncle Bob) in the 1990s while consulting for **Xerox**.

```
                   THE XEROX DEPLOYMENT BOTTLENECK:
  ┌─────────────────┐       ┌────────────────┐       ┌─────────────────┐
  │ Single Fat Job  │ ────► │ Multi-Task UI  │ ────► │  1-Hour Build/  │
  │ Class (Coupled) │       │ (Print, Staple)│       │  Redeploy Cycle │
  └─────────────────┘       └────────────────┘       └─────────────────┘
```

### The Problem
Xerox was building a new, sophisticated printer system that could perform various tasks such as printing, copying, stapling, and faxing. The software was written from the ground up, but as the codebase grew, development ground to a near-halt. Even the smallest change to a printing component would trigger a **full redeployment cycle of over an hour**, making ongoing development nearly impossible.

The culprit was a design flaw: a single, massive **`Job` class** held the methods and properties for all tasks. Every single sub-system (the stapler, the printer, the fax machine) depended directly on this fat `Job` class. Because of this tight coupling, modifying a method used exclusively by the stapler changed the signature of the `Job` class, forcing the print and fax modules to be recompiled, retested, and redeployed.

### The Solution: Role Interfaces
To solve this, Robert C. Martin applied the **Dependency Inversion Principle (DIP)**. He introduced an intermediate interface layer between the clients and the monolithic `Job` class. 

Instead of having clients interact with the concrete `Job` class directly, they created small, focused interfaces for each specific role (often called **Role Interfaces**):

```
                   THE ROLE INTERFACE PATTERN (ISP):
                     ┌──────────────────────────┐
                     │     Monolithic Job       │
                     └────────────▲─────────────┘
                                  │ (Implements)
        ┌─────────────────────────┼────────────────────────┐
        │                         │                        │
┌───────┴───────┐         ┌───────┴───────┐        ┌───────┴───────┐
│ PrintJob (IF) │         │ StapleJob (IF)│        │  FaxJob (IF)  │
└───────▲───────┘         └───────▲───────┘        └───────▲───────┘
        │                         │                        │
┌───────┴───────┐         ┌───────┴───────┐        ┌───────┴───────┐
│ Print Client  │         │ Staple Client │        │  Fax Client   │
└───────────────┘         └───────────────┘        └───────────────┘
```

Now, the `Print Client` only depended on the `PrintJob` interface, and the `Staple Client` only depended on the `StapleJob` interface. If the stapler implementation details changed, only the `StapleJob` interface and the stapler client were affected. The print and fax modules remained completely untouched, bypassing the hour-long recompilation cycle.

---

## 2. Typical Violation: ATM Transaction Example

Another classic example discussed in Robert C. Martin's books is the **ATM User Interface**. 

### ❌ The Code Smell: The Fat UI Interface
An ATM supports Transactions like **Withdrawal**, **Deposit**, and **Transfer**. A single, monolithic interface represents the entire ATM UI:

```ts
// ❌ Violates ISP: The Fat Interface
interface ATMUserInterface {
  requestWithdrawalAmount(): number;
  requestDepositAmount(): number;
  requestTransferDetails(): { toAccount: string; amount: number };
}

// Monolithic class implementing everything
class ConsoleATMUI implements ATMUserInterface {
  requestWithdrawalAmount() { return 100; }
  requestDepositAmount() { return 50; }
  requestTransferDetails() { return { toAccount: "123", amount: 20 }; }
}
```

Now, imagine we write a `WithdrawalTransaction` class. Under this model, it must accept the entire `ATMUserInterface` dependency:

```ts
class WithdrawalTransaction {
  constructor(private ui: ATMUserInterface) {} // Coupled to Deposit and Transfer methods!

  execute() {
    const amount = this.ui.requestWithdrawalAmount();
    // execute withdrawal...
  }
}
```

This is a direct violation of ISP. The `WithdrawalTransaction` is forced to depend on `requestDepositAmount` and `requestTransferDetails`—methods it never uses. If a new business requirement changes the transfer screen signature, the `WithdrawalTransaction` class is forced to undergo retesting and redeployment.

### 🌟 The Solution: Interface Segregation
We segregate the monolithic ATM interface into focused **Role Interfaces**:

```ts
// 🌟 Role-specific interfaces adhering to ISP
interface WithdrawalUI {
  requestWithdrawalAmount(): number;
}

interface DepositUI {
  requestDepositAmount(): number;
}

interface TransferUI {
  requestTransferDetails(): { toAccount: string; amount: number };
}

// The UI class implements all three interfaces (Composition)
class MultiFunctionATMUI implements WithdrawalUI, DepositUI, TransferUI {
  requestWithdrawalAmount() { return 100; }
  requestDepositAmount() { return 50; }
  requestTransferDetails() { return { toAccount: "123", amount: 20 }; }
}
```

Now, our transaction classes depend only on their relevant role interfaces:

```ts
class WithdrawalTransaction {
  constructor(private ui: WithdrawalUI) {} // 🌟 Clean, decoupled dependency!

  execute() {
    const amount = this.ui.uiRequestWithdrawal(); // Only knows about withdrawals
  }
}
```

---

## 3. ISP, High Cohesion, and Distributed Systems

### A. ISP and GRASP High Cohesion
ISP is the structural counterpart to the **GRASP High Cohesion** principle. While High Cohesion ensures that a *class* does one thing and does it well, ISP ensures that the *interfaces* representing those classes do not force clients to know about unrelated responsibilities.

### B. ISP in Distributed Microservices (IDEALS)
In modern microservices architectures, ISP is represented in the **IDEALS design framework** (Interface segregation, Deployability, Event-driven, Availability, Loose coupling, Single responsibility). 
* **Contract Granularity**: Microservices should not expose a single, massive API gateway that forces every client (web, mobile, IoT) to fetch or process fields they do not care about. 
* **BFF (Backend for Frontend)**: A standard microservice pattern that segregates interfaces by creating dedicated API gateways tailored to each client type, matching the exact needs of mobile or desktop clients.

---

## 4. Tradeoffs and Pragmatism

* **Pros**:
  * **Minimized Ripple Effects**: Modifying or adding a method to one interface does not trigger recompilations or redeployments in unrelated modules.
  * **Easier Testing**: Mocking small, single-method interfaces is vastly simpler than mocking monolithic interfaces with dozens of methods.
  * **Strict Decoupling**: Systems remain modular and highly adaptable to change.

* **Cons**:
  * **Interface Explosion**: Segregating every class can lead to hundreds of small interfaces, increasing the overall codebase complexity and cognitive navigation overhead.
  * **Over-Engineering**: In dynamic languages (such as JavaScript or Python) that rely on duck-typing rather than compiler-enforced interfaces, creating explicit, small interfaces can be redundant if over-applied. Keep designs pragmatic.

---

## Resources & Deep Dive

* [Interface Segregation Principle on Wikipedia](https://en.wikipedia.org/wiki/Interface_segregation_principle)
