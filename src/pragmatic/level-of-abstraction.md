---
title: Levels of Abstraction
description: A guide to keeping each block of code on a single, consistent level of abstraction.
icon: Layout
---

# Levels of Abstraction

> "Functions should do one thing. They should do it well. They should do it only." — Robert C. Martin

The principle of **Levels of Abstraction** suggests that every statement in a function, class, or module should be at the **same level of abstraction**. Mixing high-level business rules with low-level technical details inside the same method is one of the most common causes of unreadable and hard-to-maintain code.

## The Core Concept

We can divide programming concerns into different levels of abstraction:
1. **High-Level (Domain/Business Logic)**: Speaks the language of the business or domain (e.g., "activate subscription", "calculate cart total", "is post empty").
2. **Mid-Level (Component/Service coordination)**: Coordinates different utility components (e.g., fetching a record, checking cache, routing a message).
3. **Low-Level (Technical details)**: Speaks the language of the computer, database, or network protocol (e.g., parsing strings, manipulating DOM nodes, raw SQL execution, setting HTTP headers).

If a single function contains both high-level business rules and raw database or string manipulations, it requires the reader's brain to constantly shift gears between "what the business wants" and "how the CPU executes".

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
