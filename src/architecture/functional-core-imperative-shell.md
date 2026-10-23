---
title: Functional Core, Imperative Shell
description: Build robust systems by wrapping a pure, highly testable functional domain inside an imperative shell.
icon: LifeBuoy
cardPrompt: "A calm crystal in the middle labelled \"PURE CORE\", surrounded by a ring of busy little workers carrying boxes labelled \"I/O SHELL\"."
---

# Functional Core, Imperative Shell

<CoverImage src="/covers/architecture/functional-core-imperative-shell.webp" alt="Functional Core, Imperative Shell">
  <h1>Functional Core, Imperative Shell</h1>
  <p>A glowing, perfectly still crystal at the centre of a sphere, surrounded by an outer shell where tiny white robots busily handle deliveries, wires and doors.</p>
</CoverImage>

**Functional Core, Imperative Shell** (sometimes called *Clean Architecture* or *Ports and Adapters* on a code level) is a powerful structural design pattern. It separates code into two distinct zones: a pure, side-effect-free **Functional Core** that contains all complex business logic, and an **Imperative Shell** that handles all input/output (database, network, UI, filesystem) and orchestrates the core.

```
          ┌──────────────────────────────────────────┐
          │             IMPERATIVE SHELL             │
          │  (Impure, DB, Network, UI, Controllers)   │
          │                                          │
          │         ┌──────────────────────┐         │
          │         │   FUNCTIONAL CORE    │         │
          │         │  (Pure logic, math,  │         │
          │         │   state transitions) │         │
          │         └──────────────────────┘         │
          │                                          │
          └──────────────────────────────────────────┘
```

---

## 1. The Functional Core (Pure & Mathematical)

The core contains the raw brain of your application.
- **Rules**:
  - Must consist entirely of **pure functions** or immutable state objects.
  - Absolutely **no side-effects** (no database queries, no network calls, no system clock checks, no disk operations).
  - Given the same input, it must *always* return the exact same output.
- **Benefits**:
  - **Incredibly easy to test**: You don't need mocks, stubs, databases, or test containers. You simply pass inputs and assert the output.
  - **Extremely predictable**: No race conditions, no unexpected mutations.

### Example: Core Domain Logic

```ts
// 🌟 The Pure Functional Core
export interface CartItem {
  id: string;
  price: number;
  quantity: number;
}

// Pure function: no DB call, no external dependencies. Pure math.
export function calculateTotal(items: CartItem[], discountCode?: string): number {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (discountCode === 'SAVE10') {
    return subtotal * 0.9;
  }
  return subtotal;
}
```

---

## 2. The Imperative Shell (Impure & Orchestral)

The shell surrounds the core and interacts with the outside world.
- **Rules**:
  - Contains all the **impure operations** (HTTP requests, DB reads/writes, time checks).
  - Contains as little business decision-making logic as possible.
  - Reads data from the database/network, feeds that raw data into the Functional Core, gets the result back, and writes the output back to the database/network.
- **Benefits**:
  - Limits the surface area of hard-to-test code.

### Example: The Orchestrating Shell

```ts
// 🌟 The Imperative Shell
import { calculateTotal } from './core';
import { db } from './db';

class CheckoutController {
  async handleCheckout(userId: string, discountCode: string) {
    // 1. Impure DB reads
    const cartItems = await db.getUserCart(userId);

    // 2. Feed pure data into the Functional Core
    const total = calculateTotal(cartItems, discountCode);

    // 3. Impure DB/Network writes
    await db.saveOrder(userId, { items: cartItems, total });
    await emailProvider.sendReceipt(userId, total);
  }
}
```

## Summary of Benefits

- **Testability**: 90% of your complex edge cases (discounts, tax brackets, combinations) reside in the pure Functional Core, where testing is instant and mock-free.
- **Modularity**: You can swap the database or framework (e.g., migrating from Express to NestJS) by modifying only the Imperative Shell. The core domain logic remains untouched.
