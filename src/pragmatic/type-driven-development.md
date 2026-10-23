---
title: Type-Driven Development
description: Make illegal states unrepresentable using structural compile-time type proofs.
icon: ShieldCheck
---

# Type-Driven Development

<CoverImage src="/covers/pragmatic/type-driven-development.webp" alt="Type-Driven Development">
  <h1>Type-Driven Development</h1>
  <p>A tiny white robot fitting uniquely shaped glowing amber blocks into a giant shape-sorter toy, each block sliding only into its matching hole.</p>
</CoverImage>

> "Make illegal states unrepresentable." — Yaron Minsky

In modern software development, we often rely heavily on unit tests to catch bugs and verify system correctness. While tests are essential, they are executed *after* the code is written and run at runtime. 

**Type-Driven Development** (sometimes called Type-Driven Design) is a paradigm that leverages the compiler's static type checker to mathematically prove that certain categories of bugs and invalid states **cannot possibly exist**. 

Rather than writing dynamic check after dynamic check and verifying them via unit tests, we design our domain data structures so that any invalid or illegal system state leads directly to a **compile-time compiler error**.

---

## The Core Mantra: Make Illegal States Unrepresentable

A classic anti-pattern in software design is the use of broad, primitive types (like `string`, `number`, or unstructured objects) to represent domain states. This is known as **Primitive Obsession**. 

For example, if you represent a user's subscription state with multiple boolean fields:
```ts
interface UserSubscription {
  isTrial: boolean;
  isActive: boolean;
  isExpired: boolean;
}
```

This design permits $2^3 = 8$ possible states, yet several of them are completely illegal (e.g., a subscription cannot be both `isTrial: true` and `isActive: true` and `isExpired: true` simultaneously). In a large system, developers must write complex `if/else` checks to guard against these impossible states, and write unit tests to verify the guards.

Type-driven development solves this by using **Algebraic Data Types (ADTs)**, Tagged Unions, or Enums with associated data. We declare a type that *only* permits valid combinations, eliminating the illegal states entirely at the architectural level.

---

## Multi-Language Proofs: Primitive Obsession vs. Type-Driven Design

Below are code groups showing how to refactor primitive-obsessed, vulnerable state models into robust, compiler-proven, type-driven architectures:

::: code-group

```ts [TypeScript]
// ❌ Primitive Obsession (permits illegal states like loading = true with success = true)
interface LoadingStatePrimitive {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data?: string;
  errorMessage?: string;
}

// 🌟 Type-Driven (Discriminated Union makes illegal states compile-time impossible)
type LoadingState =
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'success'; data: string }
  | { type: 'error'; errorMessage: string };

function renderState(state: LoadingState) {
  switch (state.type) {
    case 'idle': return 'Idle...';
    case 'loading': return 'Loading...';
    case 'success': return `Data: ${state.data}`; // Compiles only if state.type is 'success'
    case 'error': return `Error: ${state.errorMessage}`;
  }
}
```

```py [Python]
# ❌ Primitive Obsession (using dynamic dictionaries with no state validation)
class PostPrimitive:
    def __init__(self, title: str, status: str, draft_content: str, published_id: int):
        self.title = title
        self.status = status # 'draft', 'published'
        self.draft_content = draft_content
        self.published_id = published_id # Can be populated in a 'draft' state - illegal!

# 🌟 Type-Driven (Literal Types and Discriminated Union via mypy)
from typing import Literal, Union, TypedDict

class DraftPost(TypedDict):
    status: Literal["draft"]
    title: str
    draft_content: str

class PublishedPost(TypedDict):
    status: Literal["published"]
    title: str
    published_id: int

PostState = Union[DraftPost, PublishedPost]

def process_post(post: PostState):
    if post["status"] == "draft":
        # post["published_id"]  # ❌ Static Type Checker Error!
        print(f"Draft: {post['draft_content']}")
    elif post["status"] == "published":
        print(f"Published ID: {post['published_id']}")
```

```java [Java]
// ❌ Primitive Obsession (using static flags that easily drift)
class LoadingStatePrimitive {
    public boolean isLoading;
    public String data;
    public String error;
}

// 🌟 Type-Driven (Java 17+ Sealed Interfaces & Records act as ADTs)
public sealed interface LoadingState {
    record Idle() implements LoadingState {}
    record Loading() implements LoadingState {}
    record Success(String data) implements LoadingState {}
    record Error(String message) implements LoadingState {}
}

class Renderer {
    public String render(LoadingState state) {
        return switch (state) {
            case LoadingState.Idle i -> "Idle...";
            case LoadingState.Loading l -> "Loading...";
            case LoadingState.Success s -> "Data: " + s.data(); // Secure record extraction
            case LoadingState.Error e -> "Error: " + e.message();
        };
    }
}
```

```go [Go]
// ❌ Primitive Obsession (loose parameters allow out-of-bound errors)
func ProcessPaymentPrimitive(amount float64, currency string) {
    // Requires endless runtime checks:
    if currency != "USD" && currency != "EUR" {
        panic("invalid currency")
    }
}

// 🌟 Type-Driven (custom typed constants & struct encapsulation)
package main

import "errors"

type Currency string

const (
	USD Currency = "USD"
	EUR Currency = "EUR"
)

type Payment struct {
	amount   float64
	currency Currency // Restricted type prevents arbitrary string injections
}

func NewPayment(amount float64, currency Currency) (*Payment, error) {
	if amount <= 0 {
		return nil, errors.New("amount must be positive")
	}
	return &Payment{amount: amount, currency: currency}, nil
}
```

```rust [Rust]
// ❌ Primitive Obsession (loose structs that can contain illegal null fields)
struct RequestPrimitive {
    is_loading: bool,
    payload: Option<String>,
    error_msg: Option<String>,
}

// 🌟 Type-Driven (Idiomatic Rust Enums with associated data types)
pub enum RequestState {
    Idle,
    Loading,
    Success(String), // Payload is physically bound to the Success state
    Error(String),   // Error message is physically bound to the Error state
}

fn handle_request(state: RequestState) {
    match state {
        RequestState::Idle => println!("Idle..."),
        RequestState::Loading => println!("Loading..."),
        RequestState::Success(data) => println!("Success: {}", data),
        RequestState::Error(err) => println!("Error: {}", err),
    }
}
```

:::

---

## Why Type-Driven Development Simplifies Software

1. **Self-Documenting Code**: Types are documentation that never lies. Reading a discriminated union tells you exactly what forms of data exist and which configurations are valid.
2. **Accelerated Refactoring**: When business requirements change, you update the central type definition. The compiler will immediately red-flag every location in the codebase that needs to be updated, serving as a highly precise, automated checklist.
3. **Fewer Brittle Tests**: Because the compiler mathematically prevents invalid configurations, you don't need to write tests to check what happens when a database model is passed null values or impossible flags. 

::: tip Type Checking Is Not Testing
While Type-Driven Development eliminates entire classes of syntax, structure, and state bugs at compile time, it does not replace testing. You still need testing (like **TDD**, **ZOMBIES**, or **Integration Tests**) to verify **runtime business logic calculations** (e.g. ensuring `calculateTax(100)` returns `108` and not `110`).
:::
