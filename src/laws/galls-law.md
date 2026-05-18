---
title: Gall's Law
description: "A fundamental law of system design: complex working systems invariably evolve from simple working systems."
icon: TreeDeciduous
---

# Gall's Law

> "A complex system that works is invariably found to have evolved from a simple system that worked. A complex system designed from scratch never works and cannot be patched up to make it work. You have to start over, beginning with a working simple system." — John Gall (Systemantics, 1975)

**Gall's Law** is one of the most important truths in software architecture and systems engineering. It states that you cannot successfully build a complex system from scratch. Instead, you must build a simple, working system first, and then gradually evolve it into a complex one over time.

---

## The Core Concept

When developers or businesses want to build a new product, they often design a massive, multi-featured system with all anticipated complexities (microservices, caching, advanced auth, complex databases) on day one.

According to Gall's Law, this is a recipe for failure:
1. **Designed-from-scratch complexity is unpredictable**: A complex system has countless moving parts, feedback loops, and hidden dependencies. When designed from scratch, it will suffer from endless bugs, architectural failures, and deployment blockages.
2. **Cannot be patched to work**: If a massive designed-from-scratch system doesn't work, no amount of hotfixes or patches will save it. The architectural foundation is fundamentally flawed because it was built on untested assumptions.
3. **Evolving is natural**: A simple system that works has already proved its correctness under real-world conditions. When you add features incrementally, you build on a stable, verified foundation.

---

## Actionable Guidelines

- **Start with a Monolith / MVP**: Do not start a new project with a distributed microservices architecture. Start with a simple, monolithic application that solves the core problem.
- **Incremental Refactoring**: Only extract microservices or add complex architectures (like CQRS, Event Sourcing, or caching) when the simple monolithic system begins to hit physical bottlenecks.
- **Fail Early, Validate Often**: Get your simple system into production as fast as possible to validate core business assumptions before investing months in complex engineering.
