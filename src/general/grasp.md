---
title: GRASP (General Responsibility Assignment Software Patterns)
description: A complete guide to GRASP (General Responsibility Assignment Software Patterns).
icon: Zap
---

# GRASP

> **GRASP** is an acronym for **General Responsibility Assignment Software Patterns (or Principles)**.

Developed by Craig Larman in his book *Applying UML and Patterns*, GRASP is a set of nine fundamental principles that help object-oriented developers assign responsibilities to classes and objects in a logical, maintainable way.

## The Nine GRASP Patterns

Rather than providing concrete structural templates (like GoF patterns), GRASP focuses on answering the question: **"Where should this method or responsibility live?"**

### 1. Information Expert
- **Question**: Which class should be responsible for a given action?
- **Answer**: The class that has the information necessary to fulfill the responsibility.
- *Example*: A `Sale` class contains `SalesLineItems`. The responsibility of calculating the total price should be assigned to `Sale` because it has the information about all the items.

### 2. Creator
- **Question**: Who should create a new instance of class `X`?
- **Answer**: Assign class `B` the responsibility to create `A` if `B` aggregates, contains, records, or closely uses `A`.
- *Example*: An `Order` contains `OrderItems`. The `Order` should be the creator of `OrderItems`.

### 3. Controller
- **Question**: Who should receive and coordinate system events/user actions?
- **Answer**: Assign this to a class representing the overall system, a root business coordinator, or a use-case handler (e.g., a `UserController`).

### 4. Low Coupling
- **Question**: How do we keep dependencies low and reuse high?
- **Answer**: Assign responsibilities so that coupling (dependencies between classes) remains as low as possible. This makes classes easier to modify in isolation.

### 5. High Cohesion
- **Question**: How do we keep objects focused and manageable?
- **Answer**: Assign responsibilities so that a class remains focused on a single logical area (similar to SRP). Classes with low cohesion do too many unrelated things and are hard to maintain.

### 6. Polymorphism
- **Question**: How do we handle alternatives based on type?
- **Answer**: When behaviors vary by type, assign responsibility for that behavior to the subclasses or types themselves using polymorphic methods, rather than using conditional `switch` or `if-else` blocks in the client (similar to OCP).

### 7. Pure Fabrication
- **Question**: What if an object doesn't fit the real-world domain, but we need it to keep coupling low and cohesion high?
- **Answer**: Create a "fake" (pure fabrication) domain object that does not represent a real-world concept.
- *Example*: A `DatabaseLogger` or `UserRepository`. A database connection is not a conceptual business domain object, but creating it keeps other business domain objects clean.

### 8. Indirection
- **Question**: How do we avoid direct coupling between two or more components?
- **Answer**: Assign the responsibility to an intermediate object to mediate between them.
- *Example*: A controller acting as an intermediary between a view and a database model.

### 9. Protected Variations
- **Question**: How do we design a system so that changes in one area do not cause instability in others?
- **Answer**: Identify points of predicted variation or instability and wrap them in a stable interface (abstraction).

## Summary

GRASP provides a superb mental checklist for day-to-day software design. By thinking about **Information Experts**, **High Cohesion**, **Low Coupling**, and **Protected Variations**, you can make highly logical decisions about where to place methods and how your objects should interact.
