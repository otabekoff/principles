---
title: If It Ain't Broke, Don't Fix It
description: "A pragmatic software engineering adage: Avoid making unnecessary changes to stable, working systems to prevent regression risks."
icon: Lock
---

# If It Ain't Broke, Don't Fix It

> "If it ain't broke, don't fix it." — Standard American adage

**If It Ain't Broke, Don't Fix It** is a classic pragmatic software engineering rule of thumb. It advises developers to avoid modifying or refactoring stable, well-tested, and fully functional legacy systems unless there is a clear, high-value business reason (such as a new feature, a security vulnerability, or a critical performance bottleneck).

---

## The Core Concept

In a software project, developers often look at old, stable code and think: _"This code looks messy and outdated. I should rewrite it using the latest shiny framework/library!"_

This carries a massive, frequently underestimated risk:

1. **Hidden Requirements**: Stable legacy code contains years of accumulated bug fixes and handles rare edge cases that are not documented anywhere. If you rewrite it from scratch, you will inevitably re-introduce those old bugs.
2. **Regression Risk**: Any code change introduces a probability of regression. If the code is currently running in production with zero errors, changing it runs the risk of breaking active users for zero immediate gain.
3. **Opportunity Cost**: The hours spent "fixing" code that was already working are hours that could have been spent building high-value features that users actually need.

---

## When to Refactor (Safe Guidelines)

To balance this rule with the **Boy Scout Rule** (which encourages continuous cleanup), follow these guidelines:

| Action                         | When to Avoid ("Don't Fix It")                                                                                                | When to Proceed ("Leave it Better")                                                                                       |
| :----------------------------- | :---------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **Deep Refactoring / Rewrite** | The file is old, messy, but works flawlessly and **no one needs to change it**. Leave it completely alone.                    | You are actively in the file to add a new feature or fix a bug. Perform **opportunistic refactoring** around your change. |
| **Upgrade Library**            | Upgrading a major stable library just to have the latest version number, requiring rewriting large parts of your working app. | The old library version has active, critical security vulnerabilities or is blocking major features.                      |
| **Clever optimizations**       | Trying to micro-optimize a function that is not showing up as a bottleneck in your profilers.                                 | Profiling proves this specific module is taking up 40% of the application's frame time.                                   |

---

## Summary

- **Value Stability**: Stable, boring code is beautiful code because it generates business value with zero maintenance cost.
- **Pragmatic Refactoring**: Only modify working code when you have a clear, immediate reason to touch it. Never refactor just for the sake of aesthetic purity.
