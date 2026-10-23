---
title: The Ninety-Ninety Rule
description: "A humorous but highly accurate software estimation adage: The first 90% of the code accounts for the first 90% of the development time."
icon: Hourglass
---

# The Ninety-Ninety Rule

<CoverImage src="/covers/laws/ninety-ninety-rule.webp" alt="The Ninety-Ninety Rule">
  <h1>The Ninety-Ninety Rule</h1>
  <p>A tiny white robot reaching what it thought was the mountain summit, flag in hand, only to see a second, equally tall peak revealed behind it.</p>
</CoverImage>

> "The first 90% of the code accounts for the first 90% of the development time. The remaining 10% of the code accounts for the other 90% of the development time." — Tom Cargill, Bell Labs

**The Ninety-Ninety Rule** is a famous, humorous aphorism in computer programming and software engineering. By mathematically adding up to **180%**, the rule serves as a wry allusion to the notorious tendency of software development projects to overrun their schedules and exceed initial effort estimations.

---

## 1. Origin and History

The ninety-ninety rule was coined by **Tom Cargill** of Bell Labs. It was widely popularized by **Jon Bentley** in his famous September 1985 *"Programming Pearls"* column in the **Communications of the ACM (CACM)**, where it was originally titled the **"Rule of Credibility"**.

```
    CARGILL'S PROJECT TIME ESTIMATION:
   ┌──────────────────────────────────────────────────┐ ┌──────────────────────────────────────────────────┐
   │            THE FIRST 90% OF THE CODE             │ │            THE REMAINING 10% OF THE CODE         │
   │            (Writing initial feature logic)       │ │            (Hard edge cases, integration, debug) │
   ├──────────────────────────────────────────────────┤ ├──────────────────────────────────────────────────┤
   │          90% OF PLANNED DEVELOPMENT TIME         │ │          90% OF ACTUAL DEVELOPMENT TIME          │
   └──────────────────────────────────────────────────┘ └──────────────────────────────────────────────────┘
   ◄──────────────────────────────────────────────── TOTAL: 180% TIME ────────────────────────────────────►
```

The anecdote captures two core realities of software engineering:
1. **Easy vs. Hard Work**: The uneven distribution of effort between writing the straightforward, "happy-path" code (which seems to go quickly) and resolving the complex, unpredictable bugs that occur during integration.
2. **Failure to Anticipate Complexity**: The primary cause of project lateness is a structural inability to anticipate and estimate the difficult, hidden complexities that only emerge when a system is fully assembled.

---

## 2. The Agile Manifestation: "Relatively Done"

In modern Agile software development, the Ninety-Ninety Rule frequently manifests during standups or sprint planning when a ticket is described as **"90% done"** or **"relatively done."** 

This is a classic project management trap:
* The developer has written all the core features, models, and UI components (the planned work is complete).
* However, the ticket cannot be officially signed off because it is pending **a single final activity**—such as a security audit, compliance signoff, environment configuration, database migration approval, or resolving an elusive cross-browser CSS glitch.
* Because of this single bottleneck, the ticket remains stuck in a near-complete state for a substantial period of time, effectively acting as an open block.

---

## 3. Why the Final 10% Takes 90% of the Time

As a project progresses, the nature of the work changes dramatically:

```
                            THE TIME ALLOCATION SHIFT:
   ┌───────────────────────────────────┬──────────────────────────────────┐
   │    THE EASY 90% (Happy Path)      │     THE HARD 10% (Edge Cases)    │
   ├───────────────────────────────────┼──────────────────────────────────┤
   │ * Setting up database models      │ * Debugging race conditions      │
   │ * Designing basic user interfaces │ * Optimizing database queries    │
   │ * Implementing standard routing   │ * Adjusting cross-browser CSS    │
   │ * Writing core controller logic   │ * Writing unit/integration tests │
   │ * Delivering the standard flow    │ * Getting security approvals     │
   └───────────────────────────────────┴──────────────────────────────────┘
```

The "happy path" is highly predictable. The "unhappy path" (handling edge cases, network partitions, device compatibility, performance tuning, and validation) involves highly unpredictable, non-linear debugging loops.

---

## 4. How to Mitigate the Ninety-Ninety Rule

### A. Establish a Strict "Definition of Done" (DoD)
A task must never be declared "90% complete." It is either `0%` complete or `100%` complete. A feature is only done when it meets the complete DoD:
- Written code is fully peer-reviewed.
- Unit and integration tests are passing with stable code coverage.
- Documentation has been written and synchronized.
- The feature is deployed and verified in a staging environment.

### B. Use the Pareto Principle (80/20 Rule)
Identify the 20% of requirements that deliver 80% of the value. Build and release those core features first to collect real-world feedback, avoiding over-engineering early in the development lifecycle.

### C. Build Buffers into Estimation
Recognize that estimation is a non-linear challenge. When estimating software effort, use historical data rather than developer optimism, and apply standard scaling factors (e.g. multiplying the initial optimistic estimate by `1.5` or `2`) to account for unpredictable integration challenges.

---

## 5. Related Adages

* **Hofstadter's Law**: *"It always takes longer than you expect, even when you take into account Hofstadter's Law."* (Highlighting the recursive nature of human estimation errors).
* **The Lindy Effect**: The future life expectancy of a technology or idea is proportional to its current age. Old, tried-and-tested software patterns are likely to remain relevant far longer than new, unproven ones.
* **Small Matter of Programming (SMOP)**: A highly sarcastic phrase used in software engineering to describe a task that a non-technical person thinks is simple but is actually incredibly complex and time-consuming.
