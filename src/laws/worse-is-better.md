---
title: Worse is Better
description: "A software design philosophy advocating that simplicity of both interface and implementation is more important than completeness."
icon: ChevronDown
---

# Worse is Better

> "Simplicity of both the interface and the implementation is more important than any other attribute of the system — including correctness, consistency, and completeness." — Richard P. Gabriel (Lisp programmer and essayist)

**Worse is Better** is a classic software design philosophy. It argues that a simpler, slightly incomplete implementation that is easy to adopt and build will ultimately win in the marketplace over a highly complex, perfect, and complete design.

---

## The Two Approaches to Software Design

Richard Gabriel compared two distinct philosophies of software design: the **MIT approach** (The Right Thing) and the **New Jersey approach** (Worse is Better).

### 1. The MIT Approach (The Right Thing)

- **Simplicity**: Interface simplicity is paramount; implementation simplicity is nice but secondary.
- **Correctness**: Absolute correctness is a strict requirement.
- **Consistency**: Absolute consistency is mandatory.
- **Completeness**: The system must cover all expected cases and scenarios.

### 2. The New Jersey Approach (Worse is Better)

- **Simplicity**: Simplicity of the **implementation** is the single highest goal. The interface should also be simple, but implementation simplicity comes first.
- **Correctness**: Correctness is a goal, but it is better to be simple than 100% correct if correctness requires massive implementation complexity.
- **Consistency**: The design must not be overly inconsistent, but it is better to drop consistency for simplicity.
- **Completeness**: The system should cover common cases, but it is perfectly acceptable to be incomplete to preserve simplicity.

---

## Why "Worse" Wins

While "The Right Thing" sounds like the ideal engineering standard, history shows that the "Worse is Better" approach frequently dominates.

- **Ease of Implementation**: A simple system is incredibly fast to write, ship, and run.
- **Viral Adoption**: Because it is simple, others can easily understand it, write plugins for it, and adapt it to their needs.
- **Evolutionary Potential**: A simple, incomplete system that works can be gradually refined and improved over time. A massive, complex, complete system is incredibly hard to change once deployed.

::: tip Real-World Examples

- **C and Unix**: Unix was simple, lightweight, and incomplete compared to highly complex operating systems of the time, yet it completely won the industry.
- **HTML/JS**: The early web stack was highly fragile and incomplete, but its extreme simplicity allowed it to grow into the most dominant platform in human history.
  :::
