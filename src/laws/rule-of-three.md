---
title: Rule of Three
description: "A code refactoring rule of thumb: Don Roberts' three strikes and you refactor guideline to prevent premature abstractions."
icon: Hash
cardPrompt: "Three identical hand-drawn stars on paper next to a freshly carved violet stamp of the same star."
---

# Rule of Three (Refactoring)

<CoverImage src="/covers/laws/rule-of-three.webp" alt="Rule of Three">
  <h1>Rule of Three</h1>
  <p>A tiny white robot noticing it has drawn the same star shape three times on a sheet of paper, and carving a reusable violet stamp of that star.</p>
</CoverImage>

> "Two instances of similar code do not require refactoring, but when similar code is used three times, it should be extracted into a new procedure." — Don Roberts

The **Rule of Three**—also known as the **"Three strikes and you refactor"** rule—is a widely accepted, pragmatic guideline in computer programming. It provides a simple, quantitative rubric for deciding when to extract duplicate code into a shared abstraction, balancing the benefits of **DRY (Don't Repeat Yourself)** against the immense dangers of **premature optimization**.

The rule was popularized by **Martin Fowler** in his seminal book ***Refactoring*** and formally attributed to software engineer **Don Roberts**.

---

## 1. The Core Workflow: Three Strikes and Refactor

```
                        THE THREE STRIKES REFACORING PIPELINE:
   ┌────────────────────────────────────────────────────────────────────────┐
   │ Strike 1 (Write Once):                                                 │
   │   Implement the feature in the simplest, most direct way.              │
   │                                                                        │
   │ Strike 2 (Duplicate It):                                               │
   │   Copy and paste the code for the second use-case. Resist DRYing now!  │
   │   Keeping them decoupled is cheaper than choosing the wrong abstraction.│
   │                                                                        │
   │ Strike 3 (Refactor!):                                                  │
   │   Extract the common pattern into a clean, reusable function or class. │
   │   You now have enough real-world data points to get the design right.  │
   └────────────────────────────────────────────────────────────────────────┘
```

When building features, developers frequently encounter similar tasks and feel the immediate urge to create generic classes or helper methods. The Rule of Three manages this urge in three phases:

1. **The First Instance (Write It)**: Implement the logic directly where it is needed. Do not spend time planning a generic architecture or worrying about future reusability (aligns with the **YAGNI** principle).
2. **The Second Instance (Duplicate It)**: Copy, paste, and adapt the code. While copy-and-paste programming is often discouraged, writing everything twice (**WET**) is highly pragmatic at this stage. You do not yet have enough information to know whether the two use cases are truly identical or merely coincidentally similar.
3. **The Third Instance (Refactor It)**: When the exact same logic is required for a third time, **stop and refactor**. Extract the duplicate code into a new, independent procedure, helper, or class.

---

## 2. Why "Three" is the Magic Number

### The Danger of Premature DRYing (Two Instances)
Attempting to refactor duplicate code when you only have **two examples** is a high-risk activity. The similarity between the two cases might be entirely accidental or superficial. 

If you force them into a single, shared abstraction, you will inevitably run into a major problem when a new requirement emerges. You will be forced to introduce complex conditional flags, parameters, and configuration arguments (e.g., `options.shouldExecuteSpecialLogicOnlyForUseCaseB`) to make the shared class support slightly different behaviors. 

As a result, **the premature abstraction becomes far more complex, fragile, and difficult to maintain than the two copies ever were**.

```
                   THE DANGER OF PREMATURE ABSTRACTING:
   ┌───────────────────────┐                    ┌────────────────────────┐
   │    Two Similar Files  │ ───[Abstract!]───► │  Complex Shared Class   │
   │ (Slightly different)  │                    │ (Tangled with conditional│
   │                       │                    │  flags & configuration)│
   └───────────────────────┘                    └────────────────────────┘
                                                            ▲
                                                            │
                                                Extremely Hard to Maintain!
```

### The Clarity of Three Instances
By waiting until you have **three concrete examples**, you gain invaluable context. You can clearly see:
* **The Invariants**: The exact lines of code and data fields that remain identical across all three use cases.
* **The Variants**: The specific parameters, configurations, or parameters that differ among them.

With three data points, the correct design pattern naturally reveals itself, making it highly probable that your extracted helper class will be robust, readable, and highly maintainable.

---

## 3. Balancing Maintenance and Refactoring Costs

The Rule of Three is fundamentally an economic model of developer time:
$$\mathrm{Total\ Cost} = \mathrm{Cost\ of\ Duplication} \times N - \mathrm{Cost\ of\ Refactoring}$$

* **At 2 Copies**: The maintenance cost of changing two identical code blocks is very small. The risk of picking the wrong abstraction is extremely high. Therefore, duplication is the cheaper, safer path.
* **At 3+ Copies**: The cost of finding and updating three or more matching blocks of code (and the high probability of forgetting to update one of them) outweighs the time and effort required to build and test a clean, shared abstraction.

---

## 4. Connections to Other Principles

* **DRY (Don't Repeat Yourself)**: The Rule of Three is the pragmatic "brake pad" for the DRY principle, ensuring developers do not over-dry their codebases into unreadable, over-abstracted layers of indirection.
* **YAGNI (You Aren't Gonna Need It)**: By avoiding premature abstracting, you ensure you do not build highly general code architectures for features that might never be requested.
* **Copy-and-Paste Programming**: While copy-pasting is a code smell in large systems, the Rule of Three legitimizes it as a healthy, temporary intermediate step toward high-quality software architecture.
