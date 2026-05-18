---
title: Conway's Law
description: Any organization that designs a system will produce a design whose structure is a copy of the organization's communication structure.
icon: GitCommit
---

# Conway's Law

> **"Organizations which design systems are constrained to produce designs which are copies of the communication structures of these organizations."** — *Melvin Conway (1967)*

**Conway's Law** is a sociological and architectural principle stating that **a software system's structure will inevitably mirror the communication channels and team boundaries of the organization that built it.**

First formulated by computer scientist **Melvin Conway** in his 1967 paper, this principle highlights that software design is not purely a technical exercise. Rather, it is deeply bound to human organization. If an organization's departments are siloed and communicate infrequently, their corresponding software modules will be loosely coupled and separated by rigid integration boundaries. If a team is structured as a tight monolith, the code they produce will inevitably become a monolithic, highly coupled system.

---

## The Organizational Mirror

```
   ORGANIZATIONAL STRUCTURE (Teams):
   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
   │ Frontend Team│     │ Backend Team │     │ Database Team│
   └──────────────┘     └──────────────┘     └──────────────┘
          │ (Siloed)           │ (Siloed)           │
          ▼                    ▼                    ▼
   SOFTWARE ARCHITECTURE RESULT (Siloed Layers):
   ┌────────────────────────────────────────────────────────┐
   │                 Monolithic UI Layer                    │
   ├────────────────────────────────────────────────────────┤
   │               Monolithic Backend Layer                 │
   ├────────────────────────────────────────────────────────┤
   │                  Monolithic Database                   │
   └────────────────────────────────────────────────────────┘
```

When teams are structured in functional silos (Frontend, Backend, DBA), their code naturally organizes into horizontal architectural layers. Every new feature requires coordination across all three teams, creating severe bottlenecks, long meetings, and high integration friction.

---

## Real-World Examples of Conway's Law

### 1. The Multi-Team Compiler Case Study
In Melvin Conway's original thesis, a classic experiment was conducted:
* **The Setup**: An organization assigned four separate teams to write a compiler for a new programming language.
* **The Result**: The resulting compiler had exactly **four passes** (phases of compilation). Each team designed a single pass, and the output of one pass became the input of the next. 
* **The Lesson**: The technical architecture of the compiler was not determined by computer science optimization rules; it was dictated by the fact that there were exactly four human teams who needed to divide the labor.

### 2. Microservice Sprawl
A modern company reorganizes its engineering department into 30 tiny, independent teams. Each team is given complete autonomy and told to "own their own service."
* **The Result**: The system architecture quickly devolves into 30 hyper-fragmented microservices. Simple features require calls across 10 network boundaries, introducing massive latency, complex tracing issues, and event synchronizations. The system architecture is a direct reflection of the organization's desire for 30 autonomous boxes.

---

## The Inverse Conway Maneuver

If system design mirrors team structure, you can strategically exploit this connection. The **Inverse Conway Maneuver** is an architectural strategy where **you deliberately design your team structures to mirror your desired software architecture.**

```
   DESIRED TARGET ARCHITECTURE (Microservices / Domain Slices):
   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
   │ Billing Slice│     │ Checkout Slice│     │ Identity Slice│
   └──────────────┘     └──────────────┘     └──────────────┘
          ▲                    ▲                    ▲
          │ (Align)            │ (Align)            │ (Align)
   INVERSE CONWAY MANEUVER TEAM ALIGNMENT:
   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
   │ Cross-Func   │     │ Cross-Func   │     │ Cross-Func   │
   │ Billing Team │     │ Checkout Team│     │ Identity Team│
   └──────────────┘     └──────────────┘     └──────────────┘
```

Instead of organizing teams by technology stacks (e.g., "The React Team" vs "The Java Team"), you organize teams by **Business Domains** (e.g., "The Billing Team", "The Checkout Team").
* **Cross-Functional Design**: Each team contains a Frontend Developer, a Backend Developer, a QA, and a product owner.
* **The Outcome**: The team owns their domain slice end-to-end. Because their internal communications are extremely fast, they design a highly cohesive, self-contained module or microservice with clear API boundaries. The software architecture naturally reorganizes into clean, domain-driven boundaries (matching [Domain-Driven Design (DDD)](https://en.wikipedia.org/wiki/Domain-driven_design)).

---

## Summary of Organizational Trade-offs

| Organizational Pattern | Architectural Outcome | Communication Cost |
| :--- | :--- | :--- |
| **Siloed Teams** (Frontend, DBA) | Layered Monolith; rigid database and API layers. | **High**: Cross-team handoffs are slow; frequent blockers. |
| **Monolithic Single Team** | Coupled, monolithic codebase ("spaghetti code"). | **Low**: Anyone can edit anything; code quickly loses boundaries. |
| **Domain-Aligned Teams** | Highly modular microservices or modular monoliths. | **Medium**: Teams communicate internally rapidly; APIs are stable. |

---

## Resources & Deep Dive

* [How Do Committees Invent? by Melvin Conway (Original 1968 Paper)](http://www.melconway.com/research/committees.html)
* [Team Topologies by Matthew Skelton and Manuel Pais](https://teamtopologies.com/)
* [The Mythical Man-Month by Fred Brooks](https://en.wikipedia.org/wiki/The_Mythical_Man-Month)
