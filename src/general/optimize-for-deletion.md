---
title: Optimize for Deletion
description: Write code that is easy to delete, not easy to extend. Focus on deletable and rewriteable code.
icon: Trash2
---

# Optimize for Deletion

> "Write code that is easy to delete, not easy to extend." — *Tef (Programming in the 21st Century)*

For decades, software engineering books preached the gospel of **extensibility**: *"Design your classes so they can easily be extended to support any future requirements!"* This advice led developers to build incredibly complex, generic hierarchies, filled with abstract factories, hooks, and deep inheritance chains.

But real-world software development taught us a harsh lesson: **we are incredibly bad at predicting the future**. When the requirements inevitably changed, they never fit our pre-designed "extension hooks." Instead, we were left with massive, tightly coupled systems that were impossible to modify.

The principle of **Optimize for Deletion** suggests a complete paradigm shift: 

> **Don't try to predict future changes today. Instead, write code that is easy to delete, easy to throw away, and easy to replace.**

---

## Why Deletability is the Ultimate Design Goal

1. **Easy to Replace**: If a feature is no longer needed or must be completely rewritten, deleting it should be a trivial `git rm` operation. If deleting the feature breaks ten other unrelated modules, your system is poorly designed.
2. **Reduced Legacy Code**: Codebases rot because developers are afraid to delete old, unused, or messy code. If your code is modular and easy to delete, you can safely wipe it out and replace it with a clean, modern implementation.
3. **Resilience to Change**: Code that is easy to delete is, by definition, **loosely coupled** and **highly cohesive**. This makes your entire system naturally resilient to radical business shifts.

---

## Technical Contrast: Coupled vs. Deletable

Imagine we have a system that calculates user billing and triggers emails.

::: code-group

```ts [TypeScript]
// ❌ Hard to Delete (The Email and Billing logic are completely tangled inside User)
class UserPrimitive {
  constructor(public id: string, public email: string, public balance: number) {}

  processBilling(amount: number) {
    this.balance -= amount;
    // Tightly coupled email logic! If we want to replace our email client tomorrow,
    // we have to rewrite our core User billing class.
    console.log(`Sending billing invoice to ${this.email}`);
  }
}

// 🌟 Optimized for Deletion (Billing and Email are isolated modules)
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
        
# If we delete the psycopg2 database layer tomorrow, Dashboard remains completely untouched!
```

:::

---

## How to Optimize for Deletion

* **Adhere to the Single Responsibility Principle**: If a class does only one thing, deleting it requires deleting only one file.
* **Minimize Coupling**: Avoid letting modules import or depend on each other's internal implementation details. Have them communicate only through clean, small interface boundaries.
* **Keep Files Small and Dedicated**: Avoid the "God Object" or the "Swiss Army Knife" files. Large files containing thousands of lines are nearly impossible to delete or refactor safely.
* **Avoid Shared Global State**: When multiple components read and write to the same global variable, deleting one component can cause a chain reaction of failures across the system.

---

## Resources & Deep Dive

* [The Art of Destroying Software (Greg Young's legendary talk)](https://www.youtube.com/watch?v=sU14zL-Xnws)
* [Write Code That Is Easy to Delete, Not Easy to Extend by Tef](https://programmingisterrible.com/post/139222674273/write-code-that-is-easy-to-delete-not-easy-to)
* [Optimize for Deletion by Steve Grossi](https://work.stevegrossi.com/2015/09/20/optimize-for-deletion/)
* [Deletability by Kelly Sutton](https://kellysutton.com/2021/04/06/deletability.html)
