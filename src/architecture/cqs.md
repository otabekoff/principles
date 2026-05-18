---
title: Command-Query Separation (CQS)
description: Ensure methods either perform an action or return data, but never both.
icon: Divide
---

# Command-Query Separation (CQS)

> "Asking a question should not change the answer." — Bertrand Meyer

**Command-Query Separation (CQS)** is a fundamental software design principle coined by Bertrand Meyer. It states that every method in a system should fall into one of two distinct categories:
1. **Commands**: Perform an action, mutate state, and return **no data** (usually `void` or `Promise<void>`).
2. **Queries**: Fetch and return data, but **must not mutate state** (they must be side-effect free).

In short: **A method should either do something or answer something, but never both.**

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

---

## Code Smell: The Mixed Method

Mixing commands and queries makes code unpredictable and incredibly hard to debug. A classic example is a getter method that secretly increments a counter or modifies a database:

```ts
// ❌ Violates CQS (Query has a hidden command side-effect!)
class Document {
  private viewCount = 0;
  private content = "Hello World";

  getContent(): string {
    this.viewCount++; // ⚠️ HIDDEN STATE MUTATION!
    return this.content;
  }
}
```

If a developer calls `getContent()` to display a preview, or in a debug console log, they will accidentally increment the `viewCount` metric, corrupting the business reports.

## Summary of Benefits

- **Predictability**: You can call queries as many times as you want in templates, logs, or conditionals without worrying about corrupting application state.
- **Maintainability**: Separating write logic from read logic makes it much easier to optimize performance (e.g., adding caching or read-replicas).
