---
title: Orthogonality
description: Things that are not related conceptually should not be related in the system. Orthogonality promotes modularity, simplicity, and safety.
icon: Grid
---

# Orthogonality

<CoverImage src="/covers/general/orthogonality.webp" alt="Orthogonality">
  <h1>Orthogonality</h1>
  <p>A tiny white robot at a mixing desk of perfectly independent sliders, each slider controlling exactly one glowing amber light in a neat grid, moving one never disturbing any other.</p>
</CoverImage>

> "The basic idea of orthogonality is that things that are not related conceptually should not be related in the system." — *Dave Thomas & Andy Hunt, The Pragmatic Programmer*

In geometry, two lines are **orthogonal** if they meet at a right angle (90 degrees). Moving along one line has absolutely zero impact on your position along the other line. 

In software engineering, **orthogonality** is a critical design principle denoting **independence or decoupling**. Two components, modules, or features are orthogonal if a change in one does not require or cause a change in the other. When you modify an orthogonal component, you can be 100% confident that you haven't silently broken unrelated parts of the system.

---

## The Value of Orthogonal Design

As highlighted in computer science literature and Wikipedia:
> "Orthogonality is closely associated with simplicity; the more orthogonal the design, the fewer exceptions. This makes it easier to learn, read, and write programs in a programming language. The meaning of an orthogonal feature is independent of context; the key parameters are symmetry and consistency."

### Why Build Orthogonal Systems?

1. **Eliminate Side Effects**: Changes to one part of your application (e.g., swapping a PostgreSQL database for MongoDB) have zero side effects on conceptually unrelated areas (e.g., UI rendering).
2. **Accelerate Testing and Debugging**: In an orthogonal system, bugs are isolated to a single component. Writing unit tests is trivial because you don't need to build massive, coupled system states just to verify one function.
3. **Enhance Reusability**: Orthogonal components are highly modular and self-contained. They can be easily extracted and reused in other modules, projects, or applications.
4. **Reduce Cognitive Load**: Since features do not depend on external contexts, you can reason about one module at a time without having to hold the entire system in your head.

---

## Technical Contrast: Non-Orthogonal vs. Orthogonal

Imagine we have a system that processes user subscriptions and updates active analytical dashboards.

::: code-group

```ts [TypeScript]
// ❌ Non-Orthogonal (Subscription logic directly manipulates database and UI state)
class SubscriptionManagerPrimitive {
  public activeCount = 0;

  purchaseSubscription(userId: string) {
    // 1. Process billing
    console.log(`Billing user ${userId}`);
    
    // 2. Mutate analytical state directly (Conceptually unrelated to core billing!)
    this.activeCount++;
    const dashboardElement = document.getElementById("analytics-chart");
    if (dashboardElement) {
      dashboardElement.innerText = `Active: ${this.activeCount}`;
    }
  }
}

// 🌟 Orthogonal (Billing, Analytics, and UI render are completely decoupled)
class SubscriptionService {
  private listeners: (() => void)[] = [];

  purchaseSubscription(userId: string) {
    console.log(`Billing user ${userId}`);
    // Notify listeners without knowing what they do!
    this.listeners.forEach(fn => fn());
  }

  onSubscriptionPurchased(callback: () => void) {
    this.listeners.push(callback);
  }
}

class AnalyticalTracker {
  private activeCount = 0;

  constructor(subscriptionService: SubscriptionService) {
    subscriptionService.onSubscriptionPurchased(() => {
      this.activeCount++;
      this.updateDashboard();
    });
  }

  private updateDashboard() {
    // Isolated UI update concern
    console.log(`Analytics updated: ${this.activeCount}`);
  }
}
```

```py [Python]
# ❌ Non-Orthogonal (File format configuration directly dictates calculations)
def calculate_tax(amount: float, file_format: str) -> float:
    # Logic couples calculations directly to file outputs!
    if file_format == "xml":
        return amount * 0.15
    elif file_format == "json":
        return amount * 0.18
    return amount * 0.10

# 🌟 Orthogonal (Calculation is completely independent of output formats)
def calculate_tax_orthogonal(amount: float, rate: float) -> float:
    return amount * rate

def format_output(value: float, file_format: str) -> str:
    if file_format == "xml":
        return f"<tax>{value}</tax>"
    return f'{{"tax": {value}}}'
```

:::

---

## How to Maintain Orthogonality

* **Keep Code Decoupled**: Avoid writing classes that know too much about their neighbors. Apply the [Law of Demeter](/architecture/law-of-demeter) and [Separation of Concerns](/general/soc).
* **Avoid Shared Global State**: When multiple components read and write to the same global variables, their behavior becomes highly dependent on execution timing, destroying orthogonality.
* **Refactor Coincidental Coupling**: As systems grow, components can naturally drift and become entangled. Actively refactor code to decouple unrelated features when you notice changes starting to cascade.

---

## Resources & Deep Dive

* [Be Orthogonal by Dave Thomas and Andy Hunt](https://media.pragprog.com/articles/nov_01_orthogonality.pdf)
* [Orthogonality on Wikipedia](https://en.wikipedia.org/wiki/Orthogonality)
* [Separation of Concerns](/general/soc)
