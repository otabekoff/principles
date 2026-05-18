---
title: Encapsulation & Info Hiding
description: Learn the difference between Encapsulation and Information Hiding and how to safeguard your systems.
icon: EyeOff
---

# Encapsulation & Information Hiding

While commonly used as synonyms, **Encapsulation** and **Information Hiding** represent two distinct and powerful design philosophies in software engineering.

```
┌────────────────────────────────────────────────────────────────┐
│                         OBJECT BOUNDARY                        │
├───────────────────────────────┬────────────────────────────────┤
│         ENCAPSULATION         │       INFORMATION HIDING       │
│   (Grouping data + methods)   │ (Hiding internal implementation│
│                               │   details behind public APIs)  │
└───────────────────────────────┴────────────────────────────────┘
```

---

## 1. Encapsulation: The Cohesive Bundle

**Encapsulation** is the act of bundling state variables (data fields) and the methods that operate on them together into a single, cohesive unit (a class).
* It ensures that state is not scattered randomly across the codebase.
* It restricts direct external modification of variables, forcing all updates to route through explicit class methods that validate business invariants.

### Example: Cohesive Encapsulation

```ts
// 🌟 Encapsulation
class BankAccount {
  private balance = 0; // State is kept inside the class

  deposit(amount: number) {
    if (amount <= 0) throw new Error("Invalid deposit amount");
    this.balance += amount; // Mutation is fully controlled
  }

  getBalance(): number {
    return this.balance;
  }
}
```

### Existential Types in Programming Theory
In type theory, encapsulation is formalized through **existential types** (written as $\exists X . T(X)$). An existential type allows a module to hide its concrete data type representations while exposing a set of interface operations. Callers only know that *some* type exists that supports these operations, but they are mathematically blocked from inspecting or manipulating its internal bits.

---

## 2. Information Hiding: Hiding Design Decisions

(Encapsulation for Design Decisions)

Introduced by computer scientist **David Parnas** in 1972, **Information Hiding** is a broader, architectural design rule:

**Information Hiding** is a broader design philosophy introduced by David Parnas. It suggests that a module should hide its internal implementation choices and design decisions (such as data structures, file formats, or database layouts) behind a **stable, public interface**.

> "A module should hide a difficult design decision or a volatile implementation choice behind a stable, abstract interface."

- **Goal**: Prevent calling code from relying on the internal structure of a class. If the calling code doesn't know *how* a class performs its calculations, the class implementation can be completely rewritten without breaking any calling code.

* **The Core Intent**: Prevent consumer code from depending on implementation details (e.g., whether data is stored in a `Map`, a sorted `Array`, or queried from a database file). If the calling code does not know *how* a class performs its calculations, the internal engine can be completely rewritten without breaking a single line of external calling code.

### Code Smell: Exposing Volatile Decisions
Exposing concrete variables (like a collection map) binds every caller to that exact data structure:

```ts
// ❌ Violates Information Hiding
class ProductCatalog {
  // Exposing the exact internal data structure (a Map)!
  public productMap = new Map<string, Product>(); // Exposed implementation!
}

// Callers directly access the Map:
const catalog = new ProductCatalog();
const p = catalog.productMap.get('123');
```

If we later decide to change the data structure to a sorted Array or query it dynamically from a database, we will **break every caller** that was directly accessing the `.productMap` property.

### The Solution: Expose an Abstract Interface

```ts
// 🌟 Adheres to Information Hiding
class ProductCatalog {
  private products = new Map<string, Product>(); // Hidden details implementation hidden!

  getProduct(id: string): Product | undefined {
    return this.products.get(id); // Stable public contract method
  }
}
```

---

## 3. Tension with Inheritance: Encapsulation Breaks

While inheritance is a fundamental OOP construct, it has a fraught, conflicting relationship with encapsulation:

### A. The Fragile Base Class Problem
Inheritance couples a child class directly to the internal, protected structures of its parent. If a parent class developer alters a protected variable name or refactors a helper method, child classes developed by other teams can break instantly.

### B. The Yo-Yo Problem
The **Yo-Yo Problem** describes the severe cognitive fatigue developers experience when trying to understand a deep inheritance hierarchy. Because methods are overridden and inherited at various levels:
* When reading code, the developer's eyes must constantly "yo-yo" up and down the inheritance tree to trace which class actually implements the active method.

```
                  THE YO-YO INHERITANCE PATH:
                       ┌──────────────┐
                       │ ParentClass  │ ───► [1. call methodA()]
                       └──────▲───────┘
                              │
                       ┌──────┴───────┐
                       │  ChildClass  │ ◄─── [2. methodA runs methodB()]
                       └──────▲───────┘
                              │
                       ┌──────┴───────┐
                       │SubChildClass │ ───► [3. methodB is overridden here!]
                       └──────────────┘
```

---

## 4. Language-Specific Encapsulation Structures

Different programming languages enforce encapsulation using varied compiler and runtime mechanisms:

### A. Access Specifiers (`public`, `private`, `protected`)
* **C++ / Java**: Checked strictly at compile-time. Attempting to access private fields generates compile errors.
* **Ruby**: Has no traditional `private` keyword for variables; all instance variables are private by default and can only be accessed via public getter/setter methods.

### B. Python Name Mangling
Python does not enforce compile-time private encapsulation. Instead, it uses **name mangling**: placing a double underscore prefix on a variable (e.g., `__balance`) causes the runtime to rewrite it to `_ClassName__balance`, preventing accidental overrides in subclasses.

### C. C Opaque Pointers (Procedural Encapsulation)
Encapsulation is not exclusive to OOP. In pure procedural C, developers build bulletproof information hiding using **Opaque Pointers** (often called handles):

```c
// ─── api.h (Public Header File) ───
typedef struct Entity Entity; // Forward declaration of structure (opaque)

Entity* create_entity(const char* name);
void destroy_entity(Entity* e);
void update_entity_position(Entity* e, int x, int y);
```

```c
// ─── api.c (Private Source Implementation) ───
#include "api.h"
#include <stdlib.h>

struct Entity { // Structure fields are defined ONLY here!
    char* name;
    int x;
    int y;
};

Entity* create_entity(const char* name) {
    Entity* e = malloc(sizeof(Entity));
    e->name = strdup(name);
    e->x = 0;
    e->y = 0;
    return e;
}
```
* **Why it works**: External files importing `api.h` only have access to `Entity*` pointers. Because the structure fields are not defined in the header, the compiler will error out if external code tries to dereference fields directly (e.g., `entity->x = 5`). The implementation is 100% hidden.

---

## 5. Object-Capability Security Model

In security-critical environments, encapsulation is used as a fundamental security boundary called the **Object-Capability Model (ocaps)**. 

Under this model:
* There are no ambient authority privileges (like `globalThis` or global files).
* A piece of code can only perform an action if it holds a direct, private reference to an object representing that **capability**.
* By locking down capabilities behind strict object encapsulation, systems prevent security exploits (such as malicious third-party packages stealing credentials or accessing the disk).
