---
title: Levels of Abstraction
description: A guide to keeping each block of code on a single, consistent level of abstraction.
icon: Layout
cardPrompt: "Four stacked frames like a zoom ladder labelled \"SYSTEM\", \"MODULE\", \"FUNCTION\" and \"LINE\", each showing a closer view of the same little house."
---

# Levels of Abstraction

<CoverImage src="/covers/pragmatic/level-of-abstraction.webp" alt="Levels of Abstraction">
  <h1>Levels of Abstraction</h1>
  <p>A tiny white robot peering through a row of nested lenses, each lens showing the same place at a different zoom: a continent, a city, a street, and a single brick.</p>
</CoverImage>

> "Functions should do one thing. They should do it well. They should do it only." — Robert C. Martin

The principle of **Levels of Abstraction** suggests that every statement in a function, class, or module should be at the **same level of abstraction**. Mixing high-level business rules with low-level technical details inside the same method is one of the most common causes of unreadable and hard-to-maintain code.

## The Core Concept

Make sure that each function, class, and file is kept strictly on the **same level of abstraction**. We can divide programming concerns into three distinct tiers:

1. **High-Level (Domain & Business Rules)**: Speaks the language of the business. If a function is handling business rules, then every line inside it should be easy to understand by a non-developer who knows your business.
   - *Example*: Checking if a post is empty using a high-level helper: `isEmpty(post)` (instead of low-level primitive checks like `post.body === ''`).
2. **Mid-Level (Component & Service Coordination)**: Coordinates different components and services to execute a workflow. It delegates actions to execute a process without performing low-level technical implementation details directly.
   - *Example*: Fetching a record, calling validators, saving state, or invoking an API client (e.g., `this.apiClient.sendPost(post)`).
3. **Low-Level (Technical & Web/Database Technologies)**: Speaks the language of the computer, database, or network protocol. If a function is handling technical or web technologies, then every line should be easy to understand by a technical developer who does not necessarily know your business.
   - *Example*: Manipulating DOM nodes, performing raw string parsing, or configuring HTTP headers. You must **never** mix a business validation check like `post.body === ''` into a low-level technical helper whose sole job is to dispatch a raw AJAX request.

Mixing different levels of abstraction inside the same function forces the reader's brain to constantly shift gears between high-level business intents, coordinating workflows, and low-level transport mechanisms.

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
