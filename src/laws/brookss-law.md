---
title: Brooks's Law
description: Adding human resources to a late software project makes it later.
icon: UserMinus
---

# Brooks's Law

<CoverImage src="/covers/laws/brookss-law.webp" alt="Brooks's Law">
  <h1>Brooks's Law</h1>
  <p>A tiny white robot foreman watching in dismay as more and more robots crowd onto a small half-built raft, slowing the work and making it sink lower, while a clock tower ticks behind them.</p>
</CoverImage>

> **"Adding human resources to a late software project makes it later."** — *Fred Brooks (The Mythical Man-Month, 1975)*

**Brooks's Law** is a famous software project management principle formulated by **Fred Brooks** in his seminal 1975 book, *The Mythical Man-Month*. It warns that when a software project is running behind schedule, attempting to speed up development by simply hiring more programmers will inevitably delay the project even further.

This law exposes the **non-linear nature of software engineering**. Unlike simple physical labor (where doubling the number of workers halves the construction time), software design requires high intellectual coordination, system context, and constant communication. Adding new people introduces massive overheads that quickly outweigh their technical contributions in the short term.

---

## The Communication Explosion

```
   COMMUNICATION CHANNELS BY TEAM SIZE:
   
   3 Developers (3 Channels):      4 Developers (6 Channels):
        A ─────── B                    A ─────── B
         \       /                     │ \     / │
          \     /                      │  \   /  │
           \   /                       │   \ /   │
             C                         C ─────── D
```

The primary driver of Brooks's Law is that **communication overhead scales quadratically** with the number of people on a team. The formula for the number of communication channels ($n$) is:

$$\text{Channels} = \frac{n(n - 1)}{2}$$

* **3 Developers**: 3 channels.
* **4 Developers**: 6 channels.
* **8 Developers**: 28 channels!
* **50 Developers**: 1,225 channels!

As a team grows, developers spend more time in meetings, writing status updates, coordinating pull requests, and resolving merge conflicts than actually writing code.

---

## Core Reasons Behind Brooks's Law

Brooks outlined three primary reasons why adding people to a late project delays it further:

### 1. The Ramp-up (Onboarding) Cost
New developers do not arrive with full knowledge of the codebase, business rules, or deployment pipelines. They must be trained.
* **The Drain on Seniors**: The only people capable of training the new hires are the existing, high-velocity senior developers. While training, these seniors are forced to stop writing code, immediately slowing down the project's progress.

### 2. Task Partitioning Limits
You cannot divide every task infinitely. In a famous analogy, Brooks observed: *"The bearing of a child takes nine months, no matter how many women are assigned."* 
* Certain software tasks are inherently sequential and cannot be split. If Task B depends on Task A, assigning two developers to work on them concurrently does not speed up the process—one developer will simply sit idle waiting for the other.

### 3. System Re-architecting & Merge Friction
Adding developers forces you to split your codebase into more files and directories to avoid people stepping on each other's toes. This requires up-front refactoring time and increases the overhead of reviewing code, resolving git merge conflicts, and aligning API interfaces.

---

## How to Mitigate Brooks's Law in Modern Teams

While Brooks's Law is powerful, modern software engineering has developed techniques to manage team scale effectively:

### A. Apply Conway's Law (Small, Autonomous Teams)
Instead of building a massive 50-developer team working on a single monolith, split the organization into small, cross-functional, highly autonomous units of **3 to 7 developers** (matching [Conway's Law](/laws/conways-law)). Give each team end-to-end ownership of a specific microservice or modular domain slice, minimizing the need for cross-team communication channels.

### B. Invest in Automated Developer Experience (DX)
Reduce the ramp-up cost by automating everything:
* **One-Command Setup**: Ensure new developers can spin up a fully working local development environment with a single command (e.g., using `Docker`, `Devcontainers`, or `Nix`).
* **Automated CI/CD**: Use continuous integration to automatically run tests and verify code syntax, reducing the burden of manual code coordination.

### C. Adjust Expectations & Manage Scope
If a project is running late, the only rational response is to **reduce the scope of the deliverable** or **extend the deadline**. Adding people is a long-term investment: they will slow you down for the first 2 months, but will increase your overall velocity 6 months from now once fully onboarded.

---

## Summary of Scheduling Decisions

| Project State | Action taken | Result |
| :--- | :--- | :--- |
| **Late** | Add new developers. | **Catastrophic Failure**: Project runs even later; seniors burn out. |
| **Late** | Reduce scope (features). | **Success**: Core value is delivered on time; clean codebase. |
| **Early / Planning** | Onboard developers slowly. | **Success**: Team scales naturally; codebase architecture evolves smoothly. |

---

## Resources & Deep Dive

* [The Mythical Man-Month by Fred Brooks](https://en.wikipedia.org/wiki/The_Mythical_Man-Month)
* [Team Topologies by Matthew Skelton and Manuel Pais](/laws/conways-law) — Designing teams for minimal cognitive load.
* [Brooks's Law on Wikipedia](https://en.wikipedia.org/wiki/Brooks's_law)
