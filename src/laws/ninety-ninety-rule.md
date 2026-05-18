---
title: The Ninety-Ninety Rule
description: "A humorous but highly accurate software estimation adage: The first 90% of the code accounts for the first 90% of the development time."
icon: Hourglass
---

# The Ninety-Ninety Rule

> "The first 90% of the code accounts for the first 90% of the development time. The remaining 10% of the code accounts for the other 90% of the development time." — Tom Cargill (Bell Labs)

**The Ninety-Ninety Rule** is a humorous but highly accurate aphorism regarding the difficulty of software project estimation and the deceptive nature of tracking progress in software engineering.

---

## The Core Concept

In a software project, progress often seems rapid in the beginning. Developers write models, setup routes, build UI components, and declare: *"The feature is 90% complete!"*

However, the final 10% of the project includes:
- Debugging obscure edge cases.
- Fixing asynchronous race conditions.
- Running cross-browser testing.
- Optimizing database queries.
- Adjusting CSS for responsive views.
- Writing documentation and unit tests.

These tasks require deep, painstaking effort. The final 10% often takes just as long (or longer) than writing the bulk of the initial feature logic.

---

## Why It Occurs

1. **Over-optimism**: Developers estimate time based on the "happy path" (how long it takes to write code that works under perfect conditions).
2. **Hidden complexity**: Real-world integration issues, network latencies, and browser inconsistencies only reveal themselves when the system is fully assembled.
3. **Refactoring overhead**: As the feature is finalized, paying down technical debt and writing tests takes significant time.

## How to Mitigate the Rule

- **Do Not Estimate Based on Lines of Code**: Focus on verifiable, working milestones instead of "written percentage".
- **Get to "Done-Done" Early**: Define a strict "Definition of Done" that includes unit tests, documentation, and reviews. A feature is either `0%` done or `100%` done. There is no `90%` done.
- **Buffer Your Estimates**: When estimating tasks, build in generous buffers for debugging, reviews, and regression testing.
