---
title: Good Code is Easy to Delete (Optimize for Deletion)
description: Discover why modularity, encapsulation, and deletability are the ultimate software design goals over premature extensibility.
icon: Trash2
---

# Good Code is Easy to Delete (Optimize for Deletion)

> **"Write code that is easy to delete, not easy to extend."** — *Tef (Programming in the 21st Century)*

When we think about software design, we are historically trained to prioritize extensibility, reusability, and complex inheritance hierarchies. We strive to make code "easy to extend" to accommodate future requirements. 

However, real-world development yields a harsh truth: **we are incredibly bad at predicting the future**. When the requirements inevitably changed, they rarely fit our pre-designed "extension hooks." Instead, we were left with massive, tightly coupled systems that are impossible to alter or remove safely.

This principle—known interchangeably as **Good Code is Easy to Delete** or **Optimize for Deletion**—suggests a complete paradigm shift: 

> **Don't try to predict future changes today. Instead, write highly cohesive, completely isolated code that is trivial to completely throw away, delete, or replace tomorrow.**

---

## Why Deletability is the Ultimate Design Goal

If a module can be safely wiped out from the codebase with a simple delete or replace operation without trigger-happy compilation failures or cascading side-effects across the rest of the application, it is by definition **exceptionally well-designed, loosely coupled, and cohesive code**.

* **Minimal Technical Debt**: You can discard dead product features cleanly and completely.
* **Risk-Free Rewrites**: Replacing an old implementation with a modern one is safe, predictable, and localized.
* **No "Ghost Code" Clutter**: Developers are historically afraid to delete messy, old code because they don't know what might break. When code is isolated, developers can confidently purge unused paths.

---

## Technical Contrast 1: Direct Coupling vs. Isolated Services

Imagine we have a system that calculates user billing and triggers emails.

::: code-group

```ts [TypeScript]
// ❌ Hard to Delete (The Email and Billing logic are tangled inside User)
class UserPrimitive {
  constructor(public id: string, public email: string, public balance: number) {}

  processBilling(amount: number) {
    this.balance -= amount;
    // Tightly coupled email logic! If we want to replace our email client tomorrow,
    // we have to rewrite our core User billing class.
    console.log(`Sending billing invoice to ${this.email}`);
  }
}

// 🌟 Optimized for Deletion (Billing and Email are completely isolated modules)
class User {
  constructor(public id: string, public balance: number) {}
}

class BillingService {
  processBilling(user: User, amount: number) {
    user.balance -= amount;
  }
}

class InvoiceNotifier {
  sendInvoice(email: string, amount: number) {
    console.log(`Sending billing invoice to ${email}`);
  }
}

// These services can be easily deleted, swapped out, or rewritten independently!
```

```py [Python]
# ❌ Hard to Delete (Tangled global state and shared configuration)
GLOBAL_CONFIG = {"theme": "dark", "db": "pg"}

class DashboardPrimitive:
    def render(self):
        # Directly couples to the database and global config
        import psycopg2
        conn = psycopg2.connect(GLOBAL_CONFIG["db"])
        print("Rendering dashboard with theme:", GLOBAL_CONFIG["theme"])

# 🌟 Optimized for Deletion (Complete isolation of database and config)
class Dashboard:
    def __init__(self, theme: str):
        self.theme = theme

    def render(self):
        print("Rendering dashboard with theme:", self.theme)
        
# If we delete the database layer tomorrow, Dashboard remains completely untouched!
```

:::

---

## Technical Contrast 2: Direct API Calls vs. Decoupled Event Boundaries

Imagine an analytical tracking service that is directly imported and called in 50 different frontend components:

### ❌ Violates Easy to Delete (Direct Imports)
```ts
// Inside 50 different components:
import { AnalyticsService } from './AnalyticsService';

function handleClick() {
  AnalyticsService.trackClick('button_click', { userId: '123' }); // Directly coupled!
}
```
If you decide to replace `AnalyticsService` with a new provider, or remove tracking altogether, you have to modify and re-test **50 files**.

### 🌟 Optimized for Deletion (App Event Boundaries)
Instead of direct coupling, wrap the tracking behind an event listener or a single app-level boundary:
```ts
// Components emit standard DOM or application events
function handleClick() {
  dispatchAppEvent('user-clicked', { id: 'button_click' });
}

// In one single startup/initialization file, bind the listener:
import { AnalyticsService } from './AnalyticsService';
onAppEvent('user-clicked', (data) => AnalyticsService.trackClick(data));
```
If you want to delete `AnalyticsService` tomorrow, you only need to delete the `AnalyticsService` file itself and remove that **one single line of binding**. The rest of your components remain completely untouched!

---

## Guidelines to Optimize for Deletion

1. **Adhere to the Single Responsibility Principle**: If a class does only one thing, deleting it requires deleting only one file.
2. **Minimize Coupling**: Avoid letting modules import or depend on each other's internal implementation details. Have them communicate only through clean, small interface boundaries or event pipelines.
3. **Keep Files Small and Dedicated**: Avoid the "God Object" or the "Swiss Army Knife" files. Large files containing thousands of lines are nearly impossible to delete or refactor safely.
4. **Avoid Shared Global State**: When multiple components read and write to the same global variable, deleting one component can cause a chain reaction of failures across the system.

---

## Resources & Deep Dive

* [The Art of Destroying Software (Greg Young's legendary talk)](https://www.youtube.com/watch?v=sU14zL-Xnws)
* [Write Code That Is Easy to Delete, Not Easy to Extend by Tef](https://programmingisterrible.com/post/139222674273/write-code-that-is-easy-to-delete-not-easy-to)
* [Optimize for Deletion by Steve Grossi](https://work.stevegrossi.com/2015/09/20/optimize-for-deletion/)
* [Deletability by Kelly Sutton](https://kellysutton.com/2021/04/06/deletability.html)
