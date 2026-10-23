---
title: Design by Contract (DbC)
description: A complete guide to Bertrand Meyer's Design by Contract (DbC) methodology, focusing on preconditions, postconditions, and class invariants.
icon: FileSignature
cardPrompt: "A rolled scroll stamped with three glowing violet wax seals."
---

# Design By Contract (DbC)

<CoverImage src="/covers/architecture/design-by-contract.webp" alt="Design by Contract">
  <h1>Design by Contract</h1>
  <p>A tiny white robot and a client robot shaking hands over a glowing violet scroll stamped with three wax seals, standing for preconditions, postconditions and invariants.</p>
</CoverImage>

> **"A software system is a collection of components that interact according to precise specifications. These specifications, or contracts, govern the relationships between a supplier (the implementation) and a client (the caller). If a contract is broken, the fault lies with the party that failed to uphold its terms."** — *Bertrand Meyer (1986)*

**Design by Contract (DbC)** is a software engineering methodology that prescribes formal, precise, and verifiable interface specifications for software components. It treats the relationship between a class or method and its callers as a **legally binding contract**, specifying each party's mutual rights and obligations.

DbC shifts software design away from defensive "trust-nobody" code toward highly explicit declarations of expectations, making systems far easier to reason about, test, and debug.

---

## The Three Pillars of a Contract

Every contract consists of three key elements that govern the lifecycle and state transitions of a component:

```
                           THE THREE PILLARS OF DbC:
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ 1. Preconditions: "What must be true BEFORE calling this method?"       │
  │    - Client's obligation; Supplier's guarantee.                        │
  └────────────────────────────────────┬────────────────────────────────────┘
                                       ▼
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ 2. Postconditions: "What is guaranteed to be true AFTER execution?"    │
  │    - Supplier's obligation; Client's right.                             │
  └────────────────────────────────────┬────────────────────────────────────┘
                                       ▼
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ 3. Class Invariants: "What remains constant throughout the object life?"│
  │    - Maintained in a steady state before and after public operations.   │
  └─────────────────────────────────────────────────────────────────────────┘
```

### 1. Preconditions
A precondition is a condition that must be met by the client **before** calling a method. 
* **Obligation**: The client is legally obligated to satisfy the precondition.
* **Benefit**: The method implementation does not need to worry about invalid inputs; it assumes the precondition is met and can execute its core business logic directly without nested validation loops.

### 2. Postconditions
A postcondition is a guarantee that the method will satisfy **after** it finishes executing, provided that the precondition was met.
* **Obligation**: The method (supplier) is legally obligated to satisfy the postcondition.
* **Benefit**: The client can rely on the postcondition being true without having to double-check or validate the return values or state changes manually.

### 3. Class Invariants
A class invariant is an assertion about the state of an object that must remain true throughout its entire public-facing lifetime. It must hold:
* Immediately after object construction.
* Before any public method is called.
* Immediately after any public method finishes executing.
* *Note: Invariants can be temporarily violated during the execution of private helper methods, but must be fully restored before control is returned to public callers.*

---

## 1. History and Eiffel

The methodology was designed and copyrighted in the late 1980s by **Bertrand Meyer** in conjunction with his creation of **Eiffel**, a pure object-oriented programming language. Meyer designed Eiffel to natively support DbC at the language level:

```eiffel
-- Eiffel Native DbC Example
deposit (sum: INTEGER) is
    require
        sum_positive: sum > 0
    do
        balance := balance + sum
    ensure
        balance_increased: balance = old balance + sum
end
```

In Eiffel, assertions are compiled into the codebase and can be turned on or off via compiler flags. When turned on during development or testing, any contract violation immediately throws a runtime exception, pointing exactly to the offending line of code and identifying whether the **Client** (precondition failure) or **Supplier** (postcondition/invariant failure) broke the contract.

---

## 2. Design by Contract and Liskov Substitution (LSP)

Design by Contract provides a mathematical foundation for the **Liskov Substitution Principle (LSP)** in object-oriented inheritance. LSP dictates that a subtype must be completely substitutable for its supertype. Under DbC, this substitutability is governed by a strict rule:

> **"Preconditions cannot be strengthened in a subtype; postconditions cannot be weakened in a subtype."**

```
                     CONTRACT INHERITANCE VARIANCE (LSP):
    
                    SUPERTYPE (Abstract Class / Interface)
                       Pre:  x >= 10   (Broader input range)
                       Post: y <= 50   (Narrower output guarantee)
                                      ▲
                                      │ Subtyping
                                      │
                     SUBTYPE (Concrete Class Implementation)
                       Pre:  x >= 0    (Weaker Precondition - OK!)
                       Post: y <= 20   (Stronger Postcondition - OK!)
```

### Why this is critical:
* **Preconditions**: A subclass can accept *more* inputs than its parent class, but it cannot accept *fewer*. If a parent class accepts any number `x >= 10`, a subclass cannot strengthen this to require `x >= 100`, because a client relying on the parent's contract would pass `50` and experience a sudden crash in the subclass.
* **Postconditions**: A subclass can guarantee *more* strict outputs than its parent, but it cannot promise *less*. If a parent promises to return a number `y <= 50`, a subclass can safely return a number `y <= 20` (stronger postcondition), because any client expecting something under `50` will be perfectly happy with something under `20`.

---

## 3. DbC vs. Defensive Programming

A common misconception is that DbC is just another word for validation or defensive programming. They are actually polar opposites in design philosophy:

| Attribute | Defensive Programming | Design by Contract (DbC) |
| :--- | :--- | :--- |
| **Trust Model** | Trust no one. Assume clients will pass garbage data. | High trust, high clarity. Formally agree on boundary conditions. |
| **Code Structure** | Methods are littered with nested `if (input == null)` checks and throw clauses. | Clean core logic. Input checks are abstracted into explicit preconditions. |
| **Fault Attribution** | Failures are handled gracefully or bubbled up via broad error handling. | Fault is absolute. A contract breach is a developer bug that crashes the thread. |
| **Performance** | Redundant checks occur throughout every layer of the call stack. | No redundant checks inside method bodies. High performance. |

---

## 4. Modern Technical Proof: TypeScript and Python

While languages like Eiffel have native DbC compiler support, modern languages can easily implement DbC patterns using decorator patterns, custom assertions, or validation boundaries.

::: code-group

```ts [TypeScript]
// DbC Contract Enforcement Helper
function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(`[CONTRACT VIOLATION] ${message}`);
  }
}

class BankAccount {
  private _balance: number;

  constructor(initialDeposit: number) {
    // Constructor Invariant Check
    assert(initialDeposit >= 0, "Initial balance cannot be negative");
    this._balance = initialDeposit;
  }

  get balance(): number {
    return this._balance;
  }

  deposit(amount: number): number {
    // 1. Preconditions (Client Obligation)
    assert(amount > 0, "Deposit amount must be positive");
    
    // Save old state for postcondition check
    const oldBalance = this._balance;

    // 2. Core Execution (No defensive checks inside business logic)
    this._balance += amount;

    // 3. Postconditions (Supplier Obligation)
    assert(
      this._balance === oldBalance + amount, 
      "Balance must equal old balance plus deposit amount"
    );

    // 4. Invariants Verification
    this.verifyInvariants();

    return this._balance;
  }

  private verifyInvariants(): void {
    // Invariant: Balance must never be negative
    assert(this._balance >= 0, "Invariant violated: balance cannot be negative");
  }
}

// === Usage ===
const account = new BankAccount(100);

// Succeeds perfectly
account.deposit(50); 

// Throws immediate Precondition Error (Client's fault)
try {
  account.deposit(-20); 
} catch (e: any) {
  console.error(e.message); // [CONTRACT VIOLATION] Deposit amount must be positive
}
```

```py [Python]
# DbC Contract Enforcement via Custom Decorators
from functools import wraps
import inspect

def contract(pre=None, post=None):
    """Decorator to enforce preconditions and postconditions on methods."""
    def decorator(func):
        @wraps(func)
        def wrapper(self, *args, **kwargs):
            # Resolve argument names to trace preconditions
            sig = inspect.signature(func)
            bound = sig.bind(self, *args, **kwargs)
            bound.apply_defaults()
            
            # 1. Precondition Check
            if pre:
                assert pre(**bound.arguments), f"Precondition failed for {func.__name__}"
            
            # Save pre-execution state for postconditions
            old_self_state = getattr(self, "_save_state", lambda: None)()
            
            # 2. Execute Supplier Logic
            result = func(self, *args, **kwargs)
            
            # 3. Postcondition Check
            if post:
                assert post(self, result, old_self_state), f"Postcondition failed for {func.__name__}"
            
            # 4. Invariant Check (if object has verify_invariants method)
            if hasattr(self, "verify_invariants"):
                self.verify_invariants()
                
            return result
        return wrapper
    return decorator


class SecureVault:
    def __init__(self, initial_cash: float):
        self._cash = initial_cash
        self.verify_invariants()
        
    def _save_state(self):
        return {"cash": self._cash}
        
    def verify_invariants(self):
        # Invariant: Cash in vault must always be between $0 and $1,000,000
        assert 0 <= self._cash <= 1000000, "Invariant violated: Vault cash limit breached"

    @contract(
        pre=lambda amount, **kwargs: amount > 0,
        post=lambda self, result, old_state: self._cash == old_state["cash"] + result
    )
    def deposit_cash(self, amount: float) -> float:
        self._cash += amount
        return amount

# === Usage ===
vault = SecureVault(500)
vault.deposit_cash(200) # Succeeds

# Throws AssertionError: Precondition failed for deposit_cash
try:
    vault.deposit_cash(-50)
except AssertionError as e:
    print(f"Caught Precondition Violation: {e}")
```

:::

---

## 5. Database Constraints as DbC

Design by Contract is not limited to object-oriented memory layers. Relational database engines implement DbC at a global system scale through physical database constraints, acting as ultimate boundaries of invariants and preconditions:

```sql
-- SQL Constraints as Global System DbC Contracts
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE, -- Invariant: UNIQUE and NOT NULL
    age INT,
    status VARCHAR(20) DEFAULT 'pending',
    
    -- Precondition/Invariant: User must be an adult to sign up
    CONSTRAINT check_user_age CHECK (age >= 18),
    
    -- Precondition/Invariant: Status must only be pending, active, or suspended
    CONSTRAINT check_user_status CHECK (status IN ('pending', 'active', 'suspended'))
);
```

### Mapping Database Elements to DbC:
* **`NOT NULL` & `UNIQUE`**: Act as database **Invariants**, ensuring the state of the database remains perfectly consistent under any concurrent transactions.
* **`CHECK` Constraints**: Enforce **Preconditions** on any `INSERT` or `UPDATE` transactions. The database supplier refuses to store garbage data, throwing constraint exceptions back to the client application layer if a transaction breaches the contract.

---

## Resources & Deep Dive

* [Design by Contract on Wikipedia](https://en.wikipedia.org/wiki/Design_by_contract)
* [Object-Oriented Software Construction (2nd Edition)](https://archive.org/details/objectorientedso0000meye) by Bertrand Meyer
* [Design by Contract in modern C++](https://isocpp.org/files/papers/P0542R5.html) (C++20/C++23 Contracts proposals)
* [Zod - TypeScript First Schema Validation with static type inference](https://zod.dev/) (acting as data boundary contracts)
* [Liskov Substitution Principle (LSP) and Behavioral Subtyping](/solid/lsp)
