---
title: Single Source of Truth (SSOT)
description: Ensure every data element is stored exactly once, preventing synchronization errors, stale caches, and conflicting states.
icon: Database
cardPrompt: "A big friendly book on a pedestal labelled \"TRUTH\" with dashed lines to four little tablets that all show the same smiley face."
---

# Single Source of Truth (SSOT)

<CoverImage src="/covers/general/single-source-of-truth.webp" alt="Single Source of Truth">
  <h1>Single Source of Truth</h1>
  <p>Many tiny white robots in a bright round library, all looking at one great glowing book on a central pedestal, thin beams of light connecting each robot's tablet to that single book.</p>
</CoverImage>

> **"Every piece of knowledge must have a single, unambiguous, authoritative representation within a system."**

In software architecture, **Single Source of Truth (SSOT)** is the practice of structuring information systems such that every data element is stored exactly once. Any future references or modifications to that data must route back to this primary authoritative representation.

While closely related to the [DRY (Don't Repeat Yourself)](/general/dry-wet) principle, SSOT focuses specifically on **state, data, and system configurations** rather than behavior and logic duplication. When a system violates SSOT by duplicating data, it creates synchronization lag, stale caches, split-brain states, and logical contradictions where two parts of the same application disagree on the "truth" (e.g., an e-commerce cart displaying a different total price than the checkout page).

---

## The Synchronization Dilemma

```
   VIOLATION OF SSOT (Duplicated State):
   ┌───────────────┐     ┌───────────────┐
   │ Database User │◀───▶│ Cached User   │  ◀── [Sync Lag / Conflict Risk!]
   │ { status: 1 } │     │ { status: 0 } │
   └───────────────┘     └───────────────┘
   
   CONFORMING TO SSOT (Single Authoritative State):
   ┌─────────────────────────────────────┐
   │          Database User (SSOT)       │
   │             { status: 1 }           │
   └───────────────────┬─────────────────┘
                       │ (All read from same source)
                       ▼
            ┌──────────────────┐
            │  State Consumer  │
            └──────────────────┘
```

When data is duplicated across multiple locations, you must write code to keep those locations in sync. This synchronization code is a breeding ground for bugs, race conditions, and error states. If one sync call fails, the system enters an inconsistent state. By establishing an SSOT, you eliminate the need for synchronization entirely, since there is only one place where the data lives.

---

## Real-World Applications

### 1. Database Normalization
In relational database design, **Database Normalization** is a direct implementation of SSOT. 

Consider a database storing orders and customer addresses. If you store the customer's phone number directly inside every `orders` record, you violate SSOT:

```sql
-- VIOLATION of SSOT: Phone is duplicated in every order
CREATE TABLE orders (
  id INT PRIMARY KEY,
  customer_id INT,
  customer_phone VARCHAR(20), -- Duplicated!
  order_total DECIMAL(10, 2)
);
```

If a customer changes their phone number, you must update every order they have ever placed. If the update fails mid-way, you have conflicting data.

**The SSOT Solution:** Store the phone number exactly once in the `customers` table, and join the tables when querying:

```sql
-- CONFORMING to SSOT: Phone is stored in exactly one authoritative table
CREATE TABLE customers (
  id INT PRIMARY KEY,
  phone VARCHAR(20) -- Authoritative SSOT
);

CREATE TABLE orders (
  id INT PRIMARY KEY,
  customer_id INT REFERENCES customers(id),
  order_total DECIMAL(10, 2)
);
```

### 2. Frontend State Management
In modern web applications (built with React, Vue, or Angular), violating SSOT leads to UI glitches. 

Imagine a shopping cart component where both the parent component and a child component store their own copy of the cart count:

```ts
// VIOLATION of SSOT: Multiple components manage duplicated state
function CartHeader() {
  const [count, setCount] = useState(0); // Local copy
}

function CartDrawer() {
  const [count, setCount] = useState(0); // Another local copy!
}
```

If a user adds an item, you must manually update both states. A failure or delay in one creates a jarring user experience.

**The SSOT Solution:** Use a single, unified store (like Redux, Pinia, or simple Vue/React Context) to store the cart state, forcing all components to read from this single source:

```ts
// CONFORMING to SSOT: Single, centralized state
const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  // Calculated dynamically from the authoritative array
  getCount: () => items.length 
}));
```

### 3. Derived State (Computed Properties)
A common way developers violate SSOT is by storing **derived data** in their state. Derived data is any information that can be computed from existing data.

* **Incorrect (Violates SSOT)**:
  ```ts
  class User {
    firstName: string = "Jane";
    lastName: string = "Doe";
    fullName: string = "Jane Doe"; // Stored state! Must be updated if firstName changes.
  }
  ```
* **Correct (Conforms to SSOT)**:
  ```ts
  class User {
    firstName: string = "Jane";
    lastName: string = "Doe";

    // Calculated on the fly; impossible to get out of sync
    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
  ```

---

## SSOT vs. High-Performance Caching
In large-scale distributed systems, storing data in a single database is often too slow. We use **Caching** (e.g., Redis, Memcached, CDN) to speed up reads. 

Does caching violate SSOT? **Strictly speaking, yes, but it is a calculated trade-off.** 

To maintain system integrity while using caches:
* **The DB is the SSOT**: The database remains the absolute, authoritative source of truth.
* **The Cache is Read-Only**: The cache is merely a high-performance projection of the truth.
* **Aggressive Invalidation**: The moment the SSOT is modified, the cache must be instantly invalidated or deleted, forcing the next read to fetch the truth from the database.

---

## Summary of Design Heuristics

| Issue | Violation Pattern | Conforming SSOT Pattern |
| :--- | :--- | :--- |
| **User Data** | Storing `user_email` in multiple table rows. | Reference `users.id` via foreign key; email is stored once. |
| **UI State** | Storing `isLoggedIn` separately in Header and Sidebar. | Elevate state to a single shared Context or State Store. |
| **Calculations** | Storing `totalPrice` in the database while items edit. | Store raw items and prices; compute totals dynamically. |
| **Configuration** | Having distinct API keys in multiple `.env` files. | Use a centralized secrets manager (e.g., Vault, AWS Secrets). |

---

## Resources & Deep Dive

* [Single Source of Truth on Wikipedia](https://en.wikipedia.org/wiki/Single_source_of_truth)
* [Database Normalization Rules (1NF, 2NF, 3NF)](https://en.wikipedia.org/wiki/Database_normalization)
* [Sandi Metz on the True Cost of Duplication](https://www.sandimetz.com/blog/2016/1/20/the-wrong-abstraction)
