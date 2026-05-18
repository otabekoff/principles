---
title: Levels of Abstraction
description: A guide to keeping each block of code on a single, consistent level of abstraction.
icon: Layout
---

# Levels of Abstraction

> "Functions should do one thing. They should do it well. They should do it only." — Robert C. Martin

The principle of **Levels of Abstraction** suggests that every statement in a function, class, or module should be at the **same level of abstraction**. Mixing high-level business rules with low-level technical details inside the same method is one of the most common causes of unreadable and hard-to-maintain code.

## The Core Concept

Make sure that each function, class, and file is kept strictly on the same level of abstraction. A system is vastly easier to read when we cleanly segregate high-level business rules from low-level technical technologies:

* **High-Level (Business Logic)**: If a function is handling business logic, then every line in there should be easy to understand by a non-developer who knows your business. 
  - *Example*: You should read `isEmpty(post)` instead of checking low-level raw details like `post.body === ''`.
* **Low-Level (Web/Database Technologies)**: The same rules apply the other way around: if a function is handling web technologies, serialization, or network protocols, then every line should be easy to understand by a web developer who does not necessarily know your business.
  - *Example*: You must **never** mix a business validation check like `post.body === ''` into a technical helper function whose sole job is to dispatch a raw AJAX request.

Mixing different levels of abstraction inside the same function forces the reader's brain to constantly shift gears between high-level business intents and low-level computer operations.

### Code Smell: Tangled Abstraction Levels

Consider this function that publishes a post:

```ts
// ❌ Violates Levels of Abstraction
class PostService {
  publishPost(post: any) {
    // High-level rule: Check if post is empty
    if (post.body === '' || post.title.trim() === '') { 
      throw new Error("Cannot publish empty post");
    }

    // Mid-level action: update state
    post.status = 'published';

    // Low-level technical detail: Raw AJAX call mixed directly into domain logic!
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/posts", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(post));
  }
}
```

This is hard to read because high-level empty checks and mid-level status updates are tangled with low-level raw XMLHttpRequests.

### The Solution: Keep Code on a Single Abstraction Level

We refactor by delegating different levels of abstraction to dedicated helper methods or services:

```ts
//  Adheres to Levels of Abstraction
class PostService {
  constructor(private apiClient: ApiClient) {}

  publishPost(post: Post) {
    if (this.isPostEmpty(post)) {
      throw new Error("Cannot publish empty post");
    }

    this.markAsPublished(post);
    this.apiClient.sendPost(post); // Clean, delegated mid-level call!
  }

  private isPostEmpty(post: Post): boolean {
    return post.body === '' || post.title.trim() === '';
  }

  private markAsPublished(post: Post) {
    post.status = 'published';
  }
}
```

Now, `publishPost` is extremely easy to read because every statement inside it is at the exact same high/mid level of abstraction. A non-developer could scan `publishPost` and understand the business flow immediately. The low-level network details are encapsulated inside `ApiClient`.
