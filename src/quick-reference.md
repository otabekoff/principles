---
title: Quick Reference
description: A concise cheat sheet and guide for all key SOLID, General, and GRASP programming principles.
icon: BookMarked
---

# Quick Reference

<CoverImage src="/covers/getting-started/quick-reference.png" alt="Cover">
  <h1>Quick Reference</h1>
  <p>A massive, clean control panel containing a beautiful array of color-coded glowing buttons, each representing a programming principle, with a tiny operator robot happily sliding a slider.</p>
</CoverImage>

A quick reference cheat sheet for the most important programming principles. Use these tables to review principles, identify violations (code smells), and find the best solutions at a glance.

---

## SOLID Principles Quick Cheat Sheet

| Principle | Core Intent | Key Code Smell / Violation | Best Solution / Pattern |
| :--- | :--- | :--- | :--- |
| **SRP** (Single Responsibility) | A class/module should have only one reason to change. | God Objects, bloated classes handling UI, database, and email. | Split responsibilities into separate cohesive classes (e.g., repositories, services). |
| **OCP** (Open-Closed) | Open for extension, closed for modification. | Giant `switch` or `if-else` blocks whenever a new type is added. | Polymorphism, interfaces, and design patterns like **Strategy** or **Factory**. |
| **LSP** (Liskov Substitution) | Subclasses must be substitutable for their parent classes. | Subclasses throwing `NotImplementedException` or changing parent invariants (e.g., Square extending Rectangle). | Avoid inheritance for sharing partial code. Prefer **composition over inheritance** or independent interfaces. |
| **ISP** (Interface Segregation) | Clients shouldn't depend on methods they don't use. | "Fat" interfaces forcing classes to implement dummy or empty methods. | Break down large interfaces into small, highly granular, focused interfaces. |
| **DIP** (Dependency Inversion) | Depend on abstractions, not concretions. | High-level business logic directly instantiating low-level utility classes (e.g. databases, HTTP clients). | **Dependency Injection (DI)**; make both layers depend on a shared abstraction (interface). |

---

## General & Pragmatic Principles

| Principle | Core Intent | Key Code Smell / Violation | Best Solution |
| :--- | :--- | :--- | :--- |
| **DRY** (Don't Repeat Yourself) | Every piece of knowledge must have a single representation. | Duplicate validation logic on front-end, back-end, and database. | Consolidate duplicate knowledge into a single authoritative module or utility. |
| **KISS** (Keep It Simple, Stupid) | Simplicity is the ultimate goal; avoid over-engineering. | Ultra-clever "one-liners", complex nested logic, unnecessary class layers. | Write readable, direct code. Refactor for clarity over compactness. |
| **YAGNI** (You Aren't Gonna Need It) | Do not implement features until they are needed. | Writing export features, audit logs, or flexible schemas "just in case". | Implement only the current, validated requirements. Keep design clean to allow future growth. |
| **Law of Demeter** (LoD) | "Only talk to your immediate friends" (Least Knowledge). | Long method chains traversing multiple object layers (e.g., `a.getB().getC().doAction()`). | Delegate actions to immediate friends (e.g., `a.doActionForC()`). |
| **Separation of Concerns** (SoC) | Separate a program into distinct sections representing different concerns. | Tangled code mixing presentation, SQL queries, and business rules. | Use layered architectures (e.g., MVC, Clean Architecture, or vertical slices). |
| **Composition over Inheritance** | Achieve reuse by composing objects rather than subclassing. | Deep, rigid inheritance trees; trying to inherit from multiple parent classes. | Reference components via interfaces and delegate behaviors. |
| **Principle of Least Astonishment** | APIs and interfaces must behave exactly as expected. | Getters with side-effects (e.g. `getValue()` modifying database), inconsistent naming. | Consistent naming, pure functions, side-effect-free getters, and strong typing. |

---

## GRASP Principles Cheat Sheet

| Pattern / Principle | Key Question | core Intent |
| :--- | :--- | :--- |
| **Information Expert** | Who should do this? | Assign responsibility to the class that has the necessary information. |
| **Creator** | Who creates object A? | Assign class B to create A if B aggregates, contains, or closely records A. |
| **Controller** | Who handles system events? | Assign responsibility for coordinating system events to a dedicated controller class. |
| **Low Coupling** | How to reduce dependency impact? | Design classes to have minimal dependencies on others to maximize reuse. |
| **High Cohesion** | How to keep objects focused? | Keep classes highly focused and clean, avoiding bloated, multi-duty objects. |
| **Polymorphism** | How to handle variations by type? | Assign varying behavior to classes representing the types using polymorphic methods. |
| **Pure Fabrication** | What if domain objects get cluttered? | Create a convenient, highly cohesive utility class that doesn't represent a real-world concept (e.g., Repositories). |
| **Indirection** | How to avoid direct coupling? | Introduce an intermediate object to mediate communication between components. |
| **Protected Variations** | How to protect from changes? | Wrap unstable or shifting points in stable interfaces (abstractions). |

---

## Common Design Anti-Patterns (What to Avoid)

- **God Object (Bloat)**: A single massive class that controls almost all of the application's logic. (SRP violation)
- **Spaghetti Code**: A codebase with no clear structure or separation of concerns, where control flow is tangled and highly dependent. (SoC violation)
- **Anemic Domain Model**: A domain model where classes represent data with little to no behavior (only getters/setters), pushing all business rules into bloated service layers.
- **Premature Optimization / Abstraction**: Optimizing performance or building complex abstractions before they are proven necessary. (KISS/YAGNI violation)
- **Hard Coupling**: Direct instantiation of dependencies using the `new` operator, making testing and replacing components impossible. (DIP violation)

::: tip
Programming principles are guidelines, not rigid laws. Understand the tradeoffs of each principle, and remember that **simplicity** and **maintainability** are always your ultimate goals.
:::
