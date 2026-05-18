---
title: Arrange, Act, Assert (3A)
description: Master the Arrange, Act, Assert (3A) pattern to structure unit tests logically, uniformly, and readably.
icon: Layers
---

# Arrange, Act, Assert (3A)

> **"A clean test should read like a three-act play: set the stage, perform the action, and deliver the resolution."**

The **Arrange, Act, Assert (3A)** pattern is a highly structured, industry-standard layout pattern used to arrange and format code inside unit tests. By partitioning tests into these three distinct and sequential phases, developers achieve high readability, easy debugging, and a highly uniform test suite.

```
┌────────────────────────────────────────────────────────┐
│                   UNIT TEST LIFECYCLE                  │
├────────────────────────────────────────────────────────┤
│ 1. ARRANGE: Set up preconditions, inputs, and SUT.     │
├────────────────────────────────────────────────────────┤
│ 2. ACT: Execute the specific method under test.        │
├────────────────────────────────────────────────────────┤
│ 3. ASSERT: Verify the outcome matches expectations.    │
└────────────────────────────────────────────────────────┘
```

---

## The Three Phases

1. **Arrange**: Set up all necessary preconditions, inputs, mocks, and configurations. This includes instantiating the **System Under Test (SUT)**.
2. **Act**: Invoke the primary method or function under test. Keep this action as minimal as possible—ideally a single line of code.
3. **Assert**: Verify that the actual results, returned value, or system state match the expected outcomes.

---

## Code Example: Structuring a Test with 3A

Below is a clean unit test in TypeScript for a shopping cart checkout system, structured with explicit 3A partition comments:

```ts
test("should calculate checkout total including tax and discount", () => {
  // 1. ARRANGE
  const cart = new ShoppingCart();
  const item = { name: "Mechanical Keyboard", price: 100 };
  const couponCode = "SAVE10"; // 10% discount
  
  cart.addItem(item);
  cart.applyCoupon(couponCode);

  // 2. ACT
  const invoice = cart.checkout();

  // 3. ASSERT
  expect(invoice.subtotal).toBe(100);
  expect(invoice.discount).toBe(10);
  expect(invoice.tax).toBe(7.2); // 8% tax on discounted amount
  expect(invoice.total).toBe(97.2);
});
```

---

## Why Use the 3A Pattern?

* **Uniform Structure**: It gives developers a common language and visual guide when reading tests. Anyone can open a test file and immediately find where the execution (Act) happens.
* **Separation of Concerns**: It prevents "interleaved" tests where assertions and actions are mixed arbitrarily, making tests extremely difficult to follow and debug.
* **Clear Scope**: Keeps tests focused on testing **one specific behavior** at a time. If the "Act" phase requires multiple method calls or complex state changes, it is a signal that your method under test is too bloated or doing too much.

---

## Best Practices

* **Keep "Act" to a Single Line**: The Act phase should represent a single business transaction or execution step. If it spans multiple lines, consider refactoring your production class interface.
* **Avoid Conditional Logic in Assertions**: If your "Assert" phase contains `if` statements or loops, the test becomes too complex and prone to bugs itself.
* **Leverage Factories for Big Arrange Blocks**: If your Arrange section spans dozens of lines of object initialization, extract it into a factory or setup helper function (e.g. `createTestUser()`) to keep the test focused.

---

## Resources & Deep Dive

* [Arrange Act Assert on the C2 Wiki](https://wiki.c2.com/?ArrangeActAssert)
* [3A - Arrange, Act, Assert on XP123](https://xp123.com/articles/3a-arrange-act-assert/)
* [The ZOMBIES Strategy](/testing/zombies-strategy)
