---
title: Good Code is Easy to Delete
description: Why modularity and encapsulation mean writing code that is simple to completely tear out.
icon: Trash
---

# Good Code is Easy to Delete

> "Good code is easy to delete, not easy to extend." — Tef

When we think about good software design, we often talk about extensibility, reusability, and generic structures. However, a highly pragmatic and powerful design principle is: **"Good code is easy to delete."**

If a block of code is easy to delete without breaking other parts of the application, it is by definition **highly decoupled and well-encapsulated**.

## The Core Concept

In a fast-growing application, features are constantly added, tested, and discarded. If a feature fails or becomes obsolete, you want to be able to completely purge it from the codebase.

* **Well-Designed Code**: Is completely isolated inside a self-contained folder or module behind a clear interface. It doesn't matter if you write a hairy, arcane function that is complex and hard to understand (especially if it is backed by tests!) — as long as it is easy to delete and replace with an alternative implementation without any ripple effects, it is **exceptionally well-designed code**.
* **Badly Designed Code**: Is hard to delete because other parts of the application are directly relying on that specific function to do a task, creating a complex, tangled web of dependencies across dozens of files. Deleting it requires a massive, risky refactoring.

### Code Smell: Tight Coupling

Imagine an analytical tracking service that is directly imported and called in 50 different components:

```ts
// ❌ Violates Easy to Delete
// Inside 50 different files:
import { AnalyticsService } from './AnalyticsService';

function handleClick() {
  AnalyticsService.trackClick('button_click', { userId: '123' }); // Directly coupled!
}
```

If you decide to replace `AnalyticsService` with a new provider, or remove tracking altogether, you have to modify 50 files.

### The Solution: Direct Through a Single Shell or Event Bus

Instead of direct coupling, wrap the tracking behind an event listener or a single app-level boundary:

```ts
//  Adheres to Easy to Delete
// Components emit standard DOM or application events
function handleClick() {
  dispatchAppEvent('user-clicked', { id: 'button_click' });
}

// In one single startup file, bind the listener:
import { AnalyticsService } from './AnalyticsService';
onAppEvent('user-clicked', (data) => AnalyticsService.trackClick(data));
```

If you want to delete `AnalyticsService` tomorrow, you only need to delete the `AnalyticsService` file itself and remove that **one single line of binding**. The rest of your components remain completely untouched!

## Summary of Benefits

- **Minimal Technical Debt**: You can remove dead features cleanly and completely.
- **Easy Refactoring**: Replacing an old implementation with a new one is safe and local.
- **No Residual Code Clutter**: Prevents the codebase from filling up with "ghost code" that everyone is afraid to delete because they don't know what might break.
