---
title: Hyrum's Law
description: With a sufficient number of users of an API, it does not matter what you promise in the contract; all observable behaviors of your system will be depended on by somebody.
icon: ShieldAlert
cardPrompt: "A squeaky door being oiled, while little neighbours run out shouting \"THAT WAS OUR DOORBELL!\"."
---

# Hyrum's Law

<CoverImage src="/covers/laws/hyrums-law.webp" alt="Hyrum's Law">
  <h1>Hyrum's Law</h1>
  <p>A tiny white robot oiling a squeaky old door hinge, while dozens of other robots who had been using the squeak as a doorbell come running out, confused.</p>
</CoverImage>

> **"With a sufficient number of users of an API, it does not matter what you promise in the contract: all observable behaviors of your system will be depended on by somebody."** — *Hyrum Wright*

**Hyrum's Law** (also known as the "Law of Implicit Interfaces") is a software engineering observation formulated by Google engineer **Hyrum Wright**. It states that **once an API has enough consumers, every detail of the system's implementation—even undocumented quirks, execution performance, side-effects, and order of operations—will eventually be discovered and relied upon by a user as a critical feature.**

This law exposes the difference between an API's **declared contract** (the documentation, type signatures, and intended behaviors) and its **implicit contract** (how the API actually behaves under all circumstances). Any change to an implicit contract will break a consumer's codebase, even if the change conforms perfectly to the declared documentation.

---

## The Declared vs. Implicit Contract

```
   THE API CONCENTRIC CIRCLES OF DEPENDENCY:
   ┌────────────────────────────────────────────────────────┐
   │             THE DECLARED CONTRACT                      │
   │   * Documented JSON fields                             │
   │   * Public function type signatures                    │
   └───────────────────────────┬────────────────────────────┘
                               ▼ (What you *think* users rely on)
   ┌────────────────────────────────────────────────────────┐
   │             THE IMPLICIT CONTRACT (Hyrum's Law)        │
   │   * The exact execution time (e.g., 50ms response)     │
   │   * The ordering of JSON keys                          │
   │   * Specific text of undocumented error messages      │
   │   * Obscure edge-case exceptions                       │
   └────────────────────────────────────────────────────────┘
```

---

## Classic Examples of Hyrum's Law

### Example A: The Ordered JSON Keys
A developer is rewriting a high-throughput microservice from Python to Go. The API returns a user object as JSON:

```json
{
  "id": 101,
  "name": "Alice",
  "email": "alice@example.com"
}
```

The Go JSON encoder formats keys alphabetically by default, changing the output order to `email`, `id`, `name`. While JSON objects are mathematically unordered according to the JSON specification, a third-party consumer parsed the response using a raw string split or regular expression expecting `id` to be the first key.
* **The Result**: The client app crashes. Even though the API is mathematically and standardly identical, the change to an **implicit, undocumented behavior** broke the consumer.

### Example B: The Sort Order Stability
An API provides a `/users` endpoint that fetches list of users. The documentation makes no promises about the sorting order. However, due to database engine implementation details, the SQL query has historically returned records ordered by `created_at` (because it was the primary key index). 

An engineer refactors the database schema or migrates from Postgres to MySQL. The query now returns users in a different order.
* **The Result**: Multiple downstream systems break because their dashboards, exports, or paginators relied on the implicit, undocumented sorted order.

### Example C: The Text-Matching Error Message
An API method originally threw a generic exception:
```ts
throw new Error("Invalid input: age cannot be negative");
```

To localize the system and make errors easier to translate, the developer changes the message string to a localized key:
```ts
throw new Error("ERROR_AGE_NEGATIVE");
```

* **The Result**: A consumer was parsing the error string directly via `error.message.includes("age")` to trigger UI behavior. Their error handling fails, and users see raw, unhandled generic modals.

---

## How to Combat Hyrum's Law

Maintaining backward compatibility on a massive API surface is exceptionally difficult. Engineers use several tactics to de-risk changes:

1. **Chaos Engineering for APIs (API Shaking)**:
   Deliberately introduce slight variances in undocumented behaviors to prevent consumers from coupling to them.
   * **Randomize JSON Key Order**: Ensure your serializers randomize key ordering in development or staging environments.
   * **Inject Slight Latency**: Randomly delay responses by 5-15ms to prevent clients from depending on hyper-precise execution durations.
   * **Vary Database Query Order**: If no `ORDER BY` is requested, shuffle the returned array in non-production environments to force developers to write explicit sorting logic if they need it.
2. **Design Explicitly for Deprecation**:
   Write thorough, explicit type definitions, and use strict versioning systems (like Semantic Versioning). State clearly in your documentation what behaviors are **guaranteed contracts** vs. **implementation details**.
3. **Rigorous API Integration Tests**:
   Write contract tests (using tools like Pact) that capture how clients consume your services.
4. **Communicate Clearly**:
   Provide detailed changelogs and changelists, and monitor access logs to see what headers, endpoints, and query parameters are being used before deprecating them.

---

## Summary Heuristic

> **"If an API behavior can be observed, some client somewhere is already depending on it."**

When refactoring or migrating, **never assume a change is safe just because it respects the written documentation.** Run staging tests with real production-like traffic mirrors (e.g., using shadow-routing) to verify that implicit behaviors remain intact.

---

## Resources & Deep Dive

* [Hyrum's Law (Official Homepage)](https://www.hyrumslaw.com/)
* [Software Engineering at Google by Titus Winters, Tom Manshreck, and Hyrum Wright](https://www.oreilly.com/library/view/software-engineering-at/9781492082781/)
* [Postel's Law (Robustness Principle)](/general/robustness-principle) — The companion design rule of thumb.
