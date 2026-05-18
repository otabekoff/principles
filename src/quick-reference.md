---
title: Quick Reference
description: A concise cheat sheet and guide for all key SOLID, General, Clean Code, Testing, and Software Architecture principles.
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

| Principle                       | Core Intent                                                | Key Code Smell / Violation                                                                                      | Best Solution / Pattern                                                                                        |
| :------------------------------ | :--------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| **SRP** (Single Responsibility) | A class/module should have only one reason to change.      | God Objects, bloated classes handling UI, database, and email.                                                  | Split responsibilities into separate cohesive classes (e.g., repositories, services).                          |
| **OCP** (Open-Closed)           | Open for extension, closed for modification.               | Giant `switch` or `if-else` blocks whenever a new type is added.                                                | Polymorphism, interfaces, and design patterns like **Strategy** or **Factory**.                                |
| **LSP** (Liskov Substitution)   | Subclasses must be substitutable for their parent classes. | Subclasses throwing `NotImplementedException` or changing parent invariants (e.g., Square extending Rectangle). | Avoid inheritance for sharing partial code. Prefer **composition over inheritance** or independent interfaces. |
| **ISP** (Interface Segregation) | Clients shouldn't depend on methods they don't use.        | "Fat" interfaces forcing classes to implement dummy or empty methods.                                           | Break down large interfaces into small, highly granular, focused interfaces.                                   |
| **DIP** (Dependency Inversion)  | Depend on abstractions, not concretions.                   | High-level business logic directly instantiating low-level utility classes (e.g. databases, HTTP clients).      | **Dependency Injection (DI)**; make both layers depend on a shared abstraction (interface).                    |

---

## General Principles

| Principle                            | Core Intent                                                                | Key Code Smell / Violation                                                                 | Best Solution                                                                                 |
| :----------------------------------- | :------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| **Abstraction Principle**            | Reduce duplication by combining and parameterizing varying parts.          | Duplicate logic or operations with minor differences; repeating code syntax.               | Extract common logic into an abstract function or class; parameterize the variation.          |
| **DRY** (Don't Repeat Yourself)      | Every piece of knowledge must have a single representation.                | Duplicate validation logic on front-end, back-end, and database.                           | Consolidate duplicate knowledge into a single authoritative module or utility.                |
| **KISS** (Keep It Simple, Stupid)    | Simplicity is the ultimate goal; avoid over-engineering.                   | Ultra-clever "one-liners", complex nested logic, unnecessary class layers.                 | Write readable, direct code. Refactor for clarity over compactness.                           |
| **YAGNI** (You Aren't Gonna Need It) | Do not implement features until they are needed.                           | Writing export features, audit logs, or flexible schemas "just in case".                   | Implement only the current, validated requirements. Keep design clean to allow future growth. |
| **Law of Demeter** (LoD)             | "Only talk to your immediate friends" (Least Knowledge).                   | Long method chains traversing multiple object layers (e.g., `a.getB().getC().doAction()`). | Delegate actions to immediate friends (e.g., `a.doActionForC()`).                             |
| **Separation of Concerns** (SoC)     | Separate a program into distinct sections representing different concerns. | Tangled code mixing presentation, SQL queries, and business rules.                         | Use layered architectures (e.g., MVC, Clean Architecture, or vertical slices).                |
| **Composition over Inheritance**     | Achieve reuse by composing objects rather than subclassing.                | Deep, rigid inheritance trees; trying to inherit from multiple parent classes.             | Reference components via interfaces and delegate behaviors.                                   |
| **Principle of Least Astonishment**  | APIs and interfaces must behave exactly as expected.                       | Getters with side-effects (e.g. `getValue()` modifying database), inconsistent naming.     | Consistent naming, pure functions, side-effect-free getters, and strong typing.               |

---

## Pragmatic & Clean Code Cheat Sheet

| Principle                           | Core Intent                                                    | Key Code Smell / Violation                                                           | Best Solution / Strategy                                                              |
| :---------------------------------- | :------------------------------------------------------------- | :----------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| **Avoid Premature Optimization**    | Don't optimize your algorithm at an early stage.               | Building highly complex custom data structures or byte buffers without profiling.    | Keep code simple, profile first, and only optimize verified bottlenecks.              |
| **The Boy Scout Rule**              | Always leave the codebase cleaner than you found it.           | Leaving unformatted files, dead code, or confusing variable names in your path.      | Perform opportunistic refactoring. Clean up variables, rename, and add tests.         |
| **WET** (Write Everything Twice)    | delay abstraction until you have sufficient information.       | Creating a complex, generic shared helper function for only two callers.             | Delay abstraction. Duplicate code once, refactor to an abstraction on the third time. |
| **Levels of Abstraction**           | Every statement in a function should be on the same level.     | Mixing raw database connections or string parsers directly inside business rules.    | Delegate technical implementations to helpers or low-level components.                |
| **Make it Work, Right, Fast**       | Kent Beck's three-stage engineering workflow.                  | Trying to write highly clean, optimized code on the first attempt (paralysis).       | 1. Make it work (solve it). 2. Make it right (clean up). 3. Make it fast (optimize).  |
| **Good Code is Easy to Delete**     | Prioritize deleting logic easily over writing reusable blocks. | Tight coupling between components where removing one feature breaks dozens of files. | Encapsulate features behind clean, event-based, or interface boundaries.              |
| **Make Non-Breaking Changes**       | Avoid broad modifications that break callers.                  | Modifying a component's signature, causing hundreds of compiler errors.              | Keep old logic, mark as `@deprecated`, and add new signature concurrently.            |
| **Future Developers Will Copy You** | The templates you commit will be copied by future maintainers. | Adding a hacky, untested function without a warning comment.                         | Set a high example. If writing a hack, write a loud comment explaining why.           |

---

## Testing & Quality Cheat Sheet

| Principle / Strategy         | Core Intent                                           | Key Code Smell / Violation                                                        | Best Solution / Strategy                                                                              |
| :--------------------------- | :---------------------------------------------------- | :-------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| **Pass the Tests**           | Every piece of logic should be backed by tests.       | Pushing untested code to production; lack of confidence.                          | Write unit tests for core domain logic.                                                               |
| **Tests Accrete**            | Organic test growth over time.                        | Dropping feature development to write a massive, low-value test suite.            | Write tests as you discover bugs and implement new features.                                          |
| **Make it Easy to Test**     | Minimize testing DX friction.                         | Brittle test configurations, slow compilation, complex mocking boilerplate.       | Maintain fast compilation, simple scripts, and high-quality mock utilities.                           |
| **TDD (Red-Green-Refactor)** | Write failing test, implement minimal code, refactor. | Writing code first, and then struggle to write tests later (often skipping them). | 1. 🔴 Write failing test. 2. 🟢 Make it pass. 3. 🔵 Refactor clean.                                   |
| **ZOMBIES Strategy**         | Mnemonic checklist for incremental problem solving.   | Getting overwhelmed by complex requirements and forgetting edge cases.            | Walk through **Z**ero, **O**ne, **M**any, **B**oundaries, **I**nterfaces, **E**xceptions, **S**imple. |

---

## Software Architecture Cheat Sheet

| Principle                             | Core Intent                                                   | Key Code Smell / Violation                                                       | Best Solution / Strategy                                                                       |
| :------------------------------------ | :------------------------------------------------------------ | :------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| **Coupling & Cohesion**               | Minimize module interdependency, maximize focus.              | Swiss Army Knife classes (low cohesion), direct instantiations (tight coupling). | Build dedicated, focused classes (high cohesion) interacting via interfaces (low coupling).    |
| **Functional Core, Imperative Shell** | Separate pure business logic from impure side-effects.        | Raw database queries, HTTP fetches, and time checks inside domain classes.       | Keep domain functions side-effect-free (Core). Coordinate DB/Network in the Shell.             |
| **CQS** (Command-Query Separation)    | A method should do something or answer something, never both. | Getter methods that secretly increment a view counter or mutate databases.       | Commands return `void` (mutator). Queries return `data` (side-effect free read).               |
| **Defensive & Offensive**             | Validate untrusted boundaries, fail-fast inside domain.       | Over-defending internal parameters, causing silent logical bugs.                 | Defensive validation at boundaries (requests/forms). Assert/crash loudly inside internal core. |
| **Inversion of Control (IoC)**        | Invert the control flow of your system.                       | Main code directly instantiating libraries, hardcoding dependencies.             | Use Dependency Injection (DI) to pass abstract dependencies to classes.                        |
| **Encapsulation & Info Hiding**       | Group data, hide internal design choices.                     | Directly exposing Map or Array properties of a catalog to callers.               | Keep fields private, and expose stable, public CRUD methods.                                   |
| **Fail-Fast & Robustness**            | Crash early locally, recover gracefully globally.             | Tolerating corrupted states, saving invalid data, silent errors.                 | Assert parameters early. Use process managers and rollback safety globally.                    |
| **Reveal Intentions**                 | Code should be clear and self-documenting.                    | Cryptic variables (`x`, `t`), redundant "what" comments explaining simple code.  | Use intent-revealing names. Use comments only to explain "why", not "what".                    |

---

## Laws & Aphorisms Cheat Sheet

| Law / Aphorism                      | Core Intent                                                      | Key Code Smell / Violation                                                       | Best Solution / Strategy                                                          |
| :---------------------------------- | :--------------------------------------------------------------- | :------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| **Gall's Law**                      | Complex working systems invariably evolve from simple ones.      | Designing highly complex microservice architectures for day-one MVPs.            | Start with a simple monolith (MVP); evolve and scale incrementally.               |
| **The Ninety-Ninety Rule**          | Cargo Cargill's adage on deceptive software estimations.         | Declaring a feature "90% complete" when edge cases and testing are untouched.    | Use binary milestones (done/not done). Buffer estimates for debugging.            |
| **Worse is Better**                 | Simplicity of implementation beats completeness.                 | Writing massive, hyper-generic systems that cover all hypothetical cases.        | Prefer simpler implementations that cover common cases and adopt quickly.         |
| **Rule of Three**                   | Delay abstractions until you duplicate code three times.         | Abstracting duplicate logic on the very first or second occurrence (premature).  | Duplicate code once (WET). Refactor to a shared helper on the third time.         |
| **Zero-One-Infinity Rule**          | Disallow, allow exactly one, or allow unlimited entities.        | Setting arbitrary hardcoded limits (e.g. allowing exactly 3 active sessions).    | Design dynamically using arrays or collections to support infinite scale.         |
| **Uniform Access Principle**        | Use identical notation to access stored or computed fields.      | Exposing state directly, requiring callers to change method calls when computed. | Use getter properties (`get area()`) to hide internal computation from callers.   |
| **The Power of 10 Safety Rules**    | Strict guidelines for safety-critical coding environments.       | Unbounded loops, dynamic memory allocations, unhandled function returns.         | Strict linters, linear flow, fixed loop limits, and rigorous return validation.   |
| **Mechanism and Policy**            | Separate core capabilities from governing business rules.        | Tightly coupling "how a function logs" with "whether it logs in development".    | Keep tools abstract (Mechanism). Inject specific settings (Policy) externally.    |
| **The Zen of Python**               | 19 universal aphorisms for simplicity, clarity, and readability. | Deep nested trees, opaque implicit magic, dense and unreadable one-liners.       | Readability counts. Explicit is better than implicit. Flat is better than nested. |
| **If It Ain't Broke, Don't Fix It** | Stability is beautiful; avoid unnecessary rewrites.              | Rewriting a perfectly functional legacy class just to use a newer library.       | Restrict deep refactorings to modules undergoing active feature edits.            |

---

## GRASP Principles Cheat Sheet

| Pattern / Principle      | Key Question                          | core Intent                                                                                                          |
| :----------------------- | :------------------------------------ | :------------------------------------------------------------------------------------------------------------------- |
| **Information Expert**   | Who should do this?                   | Assign responsibility to the class that has the necessary information.                                               |
| **Creator**              | Who creates object A?                 | Assign class B to create A if B aggregates, contains, or closely records A.                                          |
| **Controller**           | Who handles system events?            | Assign responsibility for coordinating system events to a dedicated controller class.                                |
| **Low Coupling**         | How to reduce dependency impact?      | Design classes to have minimal dependencies on others to maximize reuse.                                             |
| **High Cohesion**        | How to keep objects focused?          | Keep classes highly focused and clean, avoiding bloated, multi-duty objects.                                         |
| **Polymorphism**         | How to handle variations by type?     | Assign varying behavior to classes representing the types using polymorphic methods.                                 |
| **Pure Fabrication**     | What if domain objects get cluttered? | Create a convenient, highly cohesive utility class that doesn't represent a real-world concept (e.g., Repositories). |
| **Indirection**          | How to avoid direct coupling?         | Introduce an intermediate object to mediate communication between components.                                        |
| **Protected Variations** | How to protect from changes?          | Wrap unstable or shifting points in stable interfaces (abstractions).                                                |

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
