---
title: If It Ain't Broke, Don't Fix It
description: "A pragmatic software engineering adage: Avoid making unnecessary changes to stable, working systems to prevent regression risks."
icon: Lock
---

# If It Ain't Broke, Don't Fix It

> "If it ain't broke, don't fix it." — Thomas Bertram "Bert" Lance, *Nation's Business* (May 1977)

**If It Ain't Broke, Don't Fix It** is one of the most famous pragmatic rules of thumb in management, engineering, and systems theory. It cautions designers, managers, and developers against intervening in stable, self-regulating, and functional systems, warning that unnecessary modifications almost always introduce new regression risks, bugs, and instability.

---

## 1. Historical Origin and Bert Lance

While variations of the phrase existed in regional American vernacular, the expression was officially coined and popularized globally by **Thomas Bertram "Bert" Lance** (June 3, 1931 – August 15, 2013).

```
                  BERT LANCE & THE POPULARIZATION TIMELINE:
   ┌───────────────────────┐     ┌────────────────────────┐     ┌───────────────────────┐
   │   State Highway Dir.  │────►│  Director of the OMB   │────►│  "If it ain't broke,  │
   │   (Under Gov. Carter)  │     │ (Carter Administration)│     │     don't fix it!"    │
   └───────────────────────┘     └────────────────────────┘     └───────────────────────┘
```

A prominent Georgia businessman and bank president, Lance served as the **Director of the Office of Management and Budget (OMB)** under President Jimmy Carter in 1977. He famously quoted the phrase in the May 1977 issue of the magazine *Nation's Business* to describe his approach to federal administration and spending. 

The saying quickly captured the public imagination. Famous New York Times columnist **William Safire**—who won a Pulitzer Prize in 1978 for his commentary on the Carter administration—noted that Lance's quote had "become a source of inspiration to anti-activists," representing a powerful, commonsense argument against excessive government and corporate intervention in working structures.

---

## 2. The Core Systems Philosophy: Homeostasis and Entropy

In systems science, working organizations and codebases exhibit **homeostasis**—they represent dynamic, self-stabilizing balances that have adapted to their environments over years of feedback loops. 

When a developer or system architect decides to "fix" a stable system just because it looks old or doesn't use the latest structural pattern:
* They are introducing **artificial entropy** into a low-entropy, highly stable state.
* **Hidden Requirements**: Legacy code contains years of silent bug fixes, edge-case handling, and regional optimizations that are undocumented. A rewrite from scratch strips these away, re-introducing bugs that were solved years ago.
* **Cascading Regression**: Modern codebases are deeply interwoven. An aesthetic refactoring of a stable, low-level module can trigger a ripple effect of compiler errors, breaking upstream modules for zero immediate gain.

---

## 3. When to Refactor (Adhering to the Rule)

To balance this adage with the **Boy Scout Rule** (which encourages leaving files cleaner than you found them), software teams should apply a strict, value-driven rubric:

```
                            THE DECISION TREE:
                           Is the code working?
                                    │
                    ┌──────────────┴──────────────┐
                    YES                           NO
                    │                             │
         Are you adding a feature?            Fix it!
                    │
            ┌───────┴───────┐
            NO              YES
            │               │
       Leave it alone!   Perform small, local
                         Boy Scout refactoring
```

### Actionable Refactoring Guidelines:

| Action | When to Avoid ("Don't Fix It") | When to Proceed ("Leave it Better") |
| :--- | :--- | :--- |
| **Deep Refactoring / Rewrite** | The file is old, messy, but works flawlessly and **no one needs to change it**. Leave it completely alone. | You are actively in the file to add a new feature or fix a bug. Perform **opportunistic refactoring** around your change. |
| **Dependency Upgrade** | Upgrading a major stable library just to have the latest version number, requiring rewriting large parts of your working app. | The old library version has active, critical security vulnerabilities or is blocking major features. |
| **Clever Optimizations** | Trying to micro-optimize a function that is not showing up as a bottleneck in your profilers. | Profiling proves this specific module is taking up 40% of the application's frame time. |

### Summary
* **Value Stability**: Stable, boring code is beautiful code because it generates business value with zero maintenance cost.
* **Pragmatic Refactoring**: Only modify working code when you have a clear, immediate reason to touch it. Never refactor just for the sake of aesthetic purity.

---

## 4. Parallels in Software Paradigms

* **YAGNI (You Aren't Gonna Need It)**: Prevents developers from writing complex, speculative logic ahead of time.
* **AHA (Avoid Hasty Abstractions)**: Recommends copy-pasting code once or twice rather than creating complex, premature helper functions that are hard to maintain.
* **Continuous Delivery**: Keeps code changes small, isolated, and continuously tested to ensure the master branch remains in a permanently stable, working state.
