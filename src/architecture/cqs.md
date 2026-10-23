---
title: Command-Query Separation (CQS)
description: Ensure methods either perform an action or return data, but never both.
icon: Divide
---

# Command-Query Separation (CQS)

<CoverImage src="/covers/architecture/cqs.webp" alt="Command-Query Separation">
  <h1>Command-Query Separation</h1>
  <p>A tiny white robot clerk behind a counter with two separate windows: at one it only hands out information cards, at the other it only accepts change requests stamped in amber.</p>
</CoverImage>

> **"Asking a question should not change the answer."** — *Bertrand Meyer*

The **Command Query Separation (CQS)** principle states that each method should be either a **command** that performs an action, or a **query** that returns data to the caller, but not both.

With this principle applied, the programmer can code with much more confidence. The query methods can be used anywhere, at any frequency, and in any order since they do not mutate state. With commands, one has to be more careful.

---

## Why Apply CQS?

* **Developer Confidence**: By clearly separating methods into pure reads (queries) and writes (commands), the programmer can invoke methods with additional confidence without having to inspect each method's deep, internal implementation details.

---

## How to Apply It

* **Segregate Every Method**: Implement each class method as either an absolute query (returns a value, no side effects) or an absolute command (mutates state, returns no value).
* **Apply Strict Naming Conventions**: Use method naming conventions that make it instantly obvious whether a method is a command or query (e.g. prefixing commands with verbs like `save`, `update`, `delete`, `perform` and queries with `get`, `fetch`, `is`, `has`).

---

---

## 1. Commands (State Mutators)

Commands change the state of the system. 
- *Examples*: Inserting a record in a database, updating a user's password, sending a command to a physical hardware controller.
- *Rule*: Because they change state, they should not return a value.

```ts
// 🌟 Clean Command
class TaskService {
  private tasks: Task[] = [];

  completeTask(id: string): void { // Returns void!
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.isCompleted = true; // Mutates state
    }
  }
}
```

OR

**Command-Query Separation (CQS)** is a foundational software design principle devised by Bertrand Meyer during his pioneering work on the Eiffel programming language. It states that every method in a software system should fall into one of two distinct categories:

1. **Commands**: Perform an action, mutate system state, and return **no data** (usually `void` or `Promise<void>`).
2. **Queries**: Return data to the caller but **must not mutate state** or produce side effects (they are referentially transparent).

```
 ┌────────────────────────────────────────────────────────┐
 │                      CQS METHOD MAP                    │
 ├───────────────────────────┬────────────────────────────┤
 │         COMMAND           │           QUERY            │
 │   (Mutates state / Write) │ (Returns data / Read-only) │
 │   Returns: void           │ Returns: Data structure    │
 └───────────────────────────┴────────────────────────────┘
```

---

## 2. Queries (Side-Effect Free)

Queries ask a question of the system and return a response.
- *Examples*: Searching for active users, calculating a subtotal, checking if a username is available.
- *Rule*: Running a query 100 times must not change the state of the database or application. It must be completely safe and read-only.

```ts
// 🌟 Clean Query
class TaskService {
  private tasks: Task[] = [];

  getCompletedTasks(): Task[] { // Returns data, NO state mutation!
    return this.tasks.filter(t => t.isCompleted);
  }
}
```


OR

## 1. Connection with Design by Contract (DbC)

Bertrand Meyer deeply integrated CQS with **Design by Contract (DbC)**. In DbC, the correctness of a program is guaranteed through:
* **Preconditions**: What must be true before a method runs.
* **Postconditions**: What is guaranteed to be true after a method completes.
* **Invariants**: What must remain true at all stable stages of a class's lifecycle.

Under DbC, assertions (checks of pre/postconditions and invariants) are considered **design annotations** rather than run-time program logic. 

> [!IMPORTANT]
> **Heisenbug Prevention**: Because assertions can be compiled out (disabled in production for performance), executing an assertion *must never* change program behavior. By enforcing CQS, assertions can freely invoke **queries** to verify system state, secure in the knowledge that executing these queries has zero side effects and won't introduce phantom bugs when assertion checking is toggled.

---

## 2. Code Smell: The Mixed Method

Mixing commands and queries makes a codebase highly unpredictable. A classic example is a getter method that secretly increments a view counter or modifies a database:

```ts
// ❌ Violates CQS: Query has a hidden command side-effect!
class Document {
  private viewCount = 0;
  private content = "Hello World";

  getContent(): string {
    this.viewCount++; // ⚠️ HIDDEN STATE MUTATION!
    return this.content;
  }
}
```

If a developer calls `getContent()` in an automated test, in a template rendering loop, or in a debugger watch expression, the `viewCount` metric will silently increment, corrupting the business analytics.

### The CQS Solution

Split the mixed method into an explicit **Command** and an explicit **Query**:

```ts
// 🌟 Adheres to CQS
class Document {
  private viewCount = 0;
  private content = "Hello World";

  // Query: Safe, side-effect free, idempotent
  getContent(): string {
    return this.content;
  }

  // Command: Mutates state, returns nothing
  incrementViewCount(): void {
    this.viewCount++;
  }
}
```

---

## 3. CQRS: Architectural Scaling of CQS

While CQS operates at the **class/method level**, **Command-Query Responsibility Segregation (CQRS)** extends this separation to the **system/architectural level** (first popularized by Greg Young).

In complex or high-scale domains (often using Domain-Driven Design / DDD):
* **Command Model**: Handled by a specialized write model optimized for complex business invariants, validation, and write throughput.
* **Query Model**: Handled by highly optimized read models (often denormalized databases, Elasticsearch, or Redis caches) optimized for fast retrieval and UI projection.

```
                  ┌─────────────────┐
                  │   Client / UI   │
                  └─┬─────────────▲─┘
         Sends Command│             │Fetches Data
                    ▼             │
             ┌─────────────┐   ┌──┴──────────┐
             │Command Model│   │ Query Model │
             └──────┬──────┘   └─────▲───────┘
              Writes│                │Reads
                    ▼                │
             ┌─────────────┐   ┌─────┴───────┐
             │ Write DB    ├──►│  Read DB    │
             └─────────────┘   └─────────────┘
                             Sync (Eventual Consistency)
```

### Architectural Patterns in CQRS:
1. **Event Collaboration & Event Sourcing**: Instead of storing the current state in a database, the system stores a sequential ledger of immutable events (e.g., `OrderPlaced`, `ItemAdded`). The query model listens to these events to construct flat read tables.
2. **Eventual Consistency**: The write database and the read database are kept in sync asynchronously. While updates might take a few milliseconds to replicate to the read-replica, the system remains incredibly fast and responsive.
3. **Eager Read Derivation**: Complex reports are calculated during writes rather than on-demand during reads. The write operation does the heavy lifting, keeping read queries trivial and fast.
4. **Memory Images**: Keeping the entire read model in memory for single-digit microsecond reads, backed by transaction log files for crash recovery.

---

## 4. Limitations and Exceptions in CQS

While CQS is a powerful rule of thumb, strict compliance can sometimes conflict with other concerns, particularly **thread safety** and **reentrancy**:

### A. The Stack "Pop" Dilemma (Martin Fowler)
A classic exception is the standard `pop()` operation on a stack. A strict CQS-compliant stack would require two separate operations:
1. **Query (`top()`)**: Look at the top item without removing it.
2. **Command (`remove()`)**: Remove the top item from the stack.

```ts
// ⚠️ Separated CQS Stack usage:
const value = stack.top();
stack.remove();
```

#### The Race Condition:
In a multithreaded, concurrent environment, if two threads attempt to pop from the same stack simultaneously, a disastrous race condition occurs:
1. Thread A calls `stack.top()` (receives item `X`).
2. Thread B calls `stack.top()` (receives item `X`).
3. Thread A calls `stack.remove()`.
4. Thread B calls `stack.remove()`.
* **Result**: Both threads processed the same item `X`, and item `Y` was deleted without being processed by anyone! 

To prevent this, the `pop()` method *must* be atomic—combining the query (fetch) and command (remove) inside a single, synchronized CPU or thread-locked operation:

```ts
// Atomic pop: Violates strict CQS but is critical for thread-safety
async pop(): Promise<T | undefined> {
  // A mutex (e.g. from async-mutex) makes fetch + remove one indivisible step
  return this.mutex.runExclusive(() => this.elements.pop());
}
```

### B. Locking Counter (Compare-And-Swap)
Low-level operating system APIs or database operations often require atomic read-and-write semantics. For example, a **Compare-And-Swap (CAS)** primitive must atomically update a memory address if it matches a value and return whether the operation succeeded. Similarly, a thread-safe incrementer:

```ts
// Atomic update: combines read & write safely
class AtomicCounter {
  private value = 0;
  private mutex = new Mutex();

  async incrementAndGet(): Promise<number> {
    return this.mutex.runExclusive(() => {
      this.value++;
      return this.value; // Query + Command in one atomic step
    });
  }
}
```

---

## Summary of CQS Benefits

* **High Predictability**: Developers can safely call queries in templates, debug logging statements, or test assertions knowing they won't corrupt system state.
* **Separation of Concerns**: Splitting read and write paths simplifies business logic, making it easier to reason about, maintain, and optimize.
* **Clear Performance Optimization**: By isolating read-only paths, implementing advanced caching strategies, index optimizations, and database replicas becomes straightforward.

---

## Resources & Deep Dive

* [Command-Query Separation on Wikipedia](https://en.wikipedia.org/wiki/Command%E2%80%93query_separation)
* [Command-Query Separation by Martin Fowler](https://martinfowler.com/bliki/CommandQuerySeparation.html)
