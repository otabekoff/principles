---
title: Defensive & Offensive Programming
description: Learn how to combine Defensive Programming at your system boundaries with Offensive Programming in your core to write robust, bug-free applications.
icon: ShieldAlert
---

# Defensive & Offensive Programming

In software design, developers often debate how to handle unexpected inputs and errors. **Defensive Programming** and **Offensive Programming** represent two distinct, yet highly complementary, strategies for ensuring system integrity and reliability.

---

## 1. Defensive Programming (Protect the Boundaries)

**Defensive Programming** assumes that everything that *can* go wrong *will* go wrong. It is designed to ensure that an application never crashes, corrupts data, or behaves unpredictably, even when it receives completely garbage inputs.

- **Strategy**:
  - Validate all inputs thoroughly.
  - Provide fallback/default values.
  - Gracefully handle all external resource failures (e.g., database timeouts, failed network calls).
  - Use structured try-catch-finally statements.
- **Where to apply**: At **system boundaries** where you interact with untrusted actors (e.g., HTTP request controllers, third-party API responses, forms, user input fields).

### Example: Defensive Input Handling

```ts
// 🛡️ Defensive Boundary Controller
class UserController {
  async handleRegistrationRequest(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      
      // Strict input validation
      if (!email || !email.includes('@')) {
        return res.status(400).json({ error: "Invalid email address" });
      }

      await userService.register(email, password);
      return res.status(200).json({ success: true });
    } catch (error) {
      // Graceful error handling - system never crashes!
      logger.error("Failed to register user", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
```

---

## 2. Offensive Programming (Fail-Fast Internally)

**Offensive Programming** is the exact opposite. It suggests that inside your private application modules, you should **never tolerate invalid data**. If a programmer error occurs (e.g., a function is called with invalid parameters), the program should **crash immediately and loudly**.

- **Strategy**:
  - Assert preconditions strictly.
  - Fail-fast with clear error messages rather than continuing in an invalid state.
  - Do not catch errors that you cannot actually recover from.
- **Where to apply**: Inside your **core domain logic** and private utility methods where only your own team's code is interacting.

### Example: Offensive Core Logic Assertion

```ts
// 💥 Offensive Domain Core
class Invoice {
  private items: InvoiceItem[] = [];

  addItem(item: InvoiceItem) {
    // Assert Precondition: A negative price is a programmer bug, NOT a user input issue!
    // Fail immediately, loudly, and with a clear diagnostic.
    if (item.price < 0) {
      throw new Error(`[Assertion Failure] Invoice item price cannot be negative: Got ${item.price}`);
    }
    this.items.push(item);
  }
}
```

If a developer accidentally passes a negative price item to `addItem`, the program will crash immediately in development/testing, forcing the developer to locate and fix the logical bug. If we had defensively set the price to `0` instead, the bug would be hidden, leading to silent calculation errors in production.

---

## The Golden Rule: Combined Strategy

To build robust, maintainable systems, combine both approaches:

```
                  ┌──────────────────────────────────────────────┐
                  │                 USER / HTTP                  │
                  └──────────────────────┬───────────────────────┘
                                         │
                                         ▼ [Boundary]
                  ┌──────────────────────────────────────────────┐
                  │            DEFENSIVE PROGRAMMING             │
                  │  (Sanitize, validate, return HTTP 400/500)   │
                  └──────────────────────┬───────────────────────┘
                                         │
                                         ▼ [Trusted Internal Data]
                  ┌──────────────────────────────────────────────┐
                  │            OFFENSIVE PROGRAMMING             │
                  │   (Fail-fast, crash loudly on assertions)    │
                  └──────────────────────────────────────────────┘
```
