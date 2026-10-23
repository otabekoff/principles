---
title: Functional Purity
description: Design predictable, side-effect-free software by leveraging deterministic pure functions.
icon: Sparkles
---

# Functional Purity

<CoverImage src="/covers/architecture/functional-purity.webp" alt="Functional Purity">
  <h1>Functional Purity</h1>
  <p>A tiny white robot feeding identical apples into a pristine glass juicer that always pours identical glasses of juice, leaving no mess and changing nothing around it.</p>
</CoverImage>

> "Practicality beats purity, but purity is the foundation of predictability."

In software architecture, **Functional Purity** is a design principle that encourages the use of **pure functions** to calculate values and model business domain operations. It serves as the mathematical bedrock for highly predictable, modular, and exceptionally testable software.

Understanding and applying functional purity is a prerequisite for master-level architectures like **Functional Core, Imperative Shell** and **Event Sourcing**.

---

## What is a Pure Function?

A function is considered mathematically "pure" if and only if it satisfies two strict properties:

1. **Determinism (Same Input, Same Output)**: Given the same arguments, the function will *always* return the exact same value. It cannot rely on any hidden, mutable external state that could change between calls (such as the system clock, random number generators, or database values).
2. **No Side Effects**: The function does not mutate or modify any state outside of its local scope. It cannot write to a database, modify a global variable, alter an input parameter in-place, print to a console, make network requests, or read from a filesystem.

---

## Multi-Language Proofs: Impure vs. Pure Code

Below are examples of how typical impure functions (coupled to mutable state or external I/O) are refactored into pure, deterministic operations across five programming languages:

::: code-group

```ts [TypeScript]
// ❌ Impure (relies on external global variables, mutates data in-place)
let globalTaxRate = 0.08;

function impureCalculateTotal(items: { price: number }[]) {
  // Mutates input parameter in-place!
  items.forEach(item => item.price = item.price * (1 + globalTaxRate)); 
  return items;
}

// 🌟 Pure (Deterministic, copies data to avoid mutations, parameters are read-only)
function pureCalculateTotal(items: readonly { price: number }[], taxRate: number) {
  return items.map(item => ({
    price: item.price * (1 + taxRate)
  }));
}
```

```py [Python]
# ❌ Impure (relies on the system clock and mutates global state)
import datetime

global_orders = []

def impure_add_order(item: str, price: float):
    # Relies on live clock (not deterministic) and writes to external list
    order = {"item": item, "price": price, "date": datetime.datetime.now()}
    global_orders.append(order)
    return order

# 🌟 Pure (Accepts time and external list as inputs, returns new state copies)
def pure_add_order(item: str, price: float, current_time: datetime.datetime) -> dict:
    return {"item": item, "price": price, "date": current_time}
```

```java [Java]
// ❌ Impure (Coupled to internal instance mutability and state drift)
public class PriceCalculatorImpure {
    private double discountRate = 0.10;

    public double calculateDiscount(double price) {
        // Relies on internal mutable instance variable
        return price * this.discountRate;
    }
}

// 🌟 Pure (Deterministic static method, no instance dependency or side effects)
public class PriceCalculatorPure {
    public static double calculateDiscount(double price, double discountRate) {
        return price * discountRate;
    }
}
```

```go [Go]
// ❌ Impure (Modifies slices by reference/pointer, mutates underlying array)
package main

func ImpureAddTax(prices []float64, taxRate float64) {
	for i := range prices {
		prices[i] = prices[i] * (1 + taxRate) // Mutates original slice!
	}
}

// 🌟 Pure (Allocates and returns a fresh, copy-safe slice of calculated values)
func PureAddTax(prices []float64, taxRate float64) []float64 {
	result := make([]float64, len(prices))
	for i, price := range prices {
		result[i] = price * (1 + taxRate)
	}
	return result
}
```

```rust [Rust]
// ❌ Impure (Requires mutable borrows and performs standard side-effect IO)
fn impure_log_and_update(age: &mut u32) {
    *age += 1; // Side-effect: Mutates value in place
    println!("Updated age is: {}", age); // Side-effect: Prints to stdout
}

// 🌟 Pure (Accepts immutable values, performs mathematical mapping, returns new values)
fn pure_update_age(age: u32) -> u32 {
    age + 1 // Pure addition, no mutation, no console output
}
```

:::

---

## Benefits of Functional Purity

### 1. Zero-Mock Unit Testing
Because pure functions have absolutely no side effects and do not query databases, networks, or file systems, **you do not need mocks, stubs, or complex testing setups to verify them**. 
Testing is as simple as passing arguments and asserting the return value:

```ts
// Testing a pure function is simple, lightning fast, and 100% reliable!
expect(pureCalculateTotal([{ price: 100 }], 0.08)).toEqual([{ price: 108 }]);
```

### 2. Thread-Safety & Parallel Execution
In multi-threaded or concurrent environments, shared mutable state is the root of all evil (causing race conditions, deadlocks, and unpredictable memory corruption). Because pure functions do not mutate state, they can be safely executed concurrently across multiple CPU threads with absolute safety.

### 3. Referential Transparency
In compiler theory, a function is **referentially transparent** if you can replace the function call with its computed result without changing the behavior of the program. 
For example:
```ts
const x = add(2, 3); // Can be safely replaced by the literal number 5 everywhere in code!
```
Referential transparency allows compilers and caching shells to perform **Memoization** (caching the results of expensive function calls based strictly on their input parameters).

---

## The Architectural Goal: Isolating Impurity

A system cannot be 100% pure. A system that has zero side effects is completely useless—it cannot save data to a database, send emails, or render pages.

The goal of functional purity is **not** to eliminate impurity, but to **isolate it**. 

By gathering all side-effects and orchestration logic inside an outer layer (the **Imperative Shell**) and leaving all complex, nested calculations inside a pure inner layer (the **Functional Core**), you get the best of both worlds: a highly testable, predictable business logic core surrounded by a simple, thin database/network controller shell.
