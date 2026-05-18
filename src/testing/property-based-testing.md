---
title: Property-Based Testing
description: Find edge cases automatically by asserting system invariants across thousands of randomly generated inputs.
icon: ShieldCheck
---

# Property-Based Testing

> **"Don't write tests. Write properties, and let the computer generate thousands of test cases to prove them wrong."** — *John Hughes*

**Property-Based Testing (PBT)** is a testing paradigm first introduced in 1999 by **Koen Claessen** and **John Hughes** with the creation of the Haskell library **QuickCheck**. Unlike traditional **Example-Based Testing**—where you write tests for specific inputs (e.g., verifying that `add(2, 3)` returns `5`)—**PBT asserts that certain system invariants (properties) must hold true across thousands of randomly generated inputs.**

PBT is an exceptionally powerful tool for finding obscure edge cases, arithmetic overflow errors, buffer overflows, unicode string crashes, and race conditions that a developer would never think to write a manual test case for.

---

## Example-Based vs. Property-Based Testing

```
   TRADITIONAL EXAMPLE-BASED TESTING (Explicit Cases):
   Input: [2, 3]    ──▶  add()  ──▶  Assert Output: 5
   Input: [-1, 1]   ──▶  add()  ──▶  Assert Output: 0
   (Limited to only the examples you write!)

   PROPERTY-BASED TESTING (Generative Cases):
   Thousands of randomly generated numbers (Integers, Floats, Max/Min, Null)
                    ──▶  add()  ──▶  Assert Invariant: add(a, b) === add(b, a)
   (Discovers unexpected edge cases automatically!)
```

---

## Defining a Property (System Invariant)

A **Property** is a logical assertion about your code that is always true, regardless of the input. 

Consider the task of testing a list-sorting function (`sort(list)`). In traditional testing, you write:
```ts
assert.deepEqual(sort([3, 1, 2]), [1, 2, 3]);
```

In Property-Based Testing, you define properties that **every sorted list must satisfy**:
1. **The Order Property**: For every element at index $i$, the value must be less than or equal to the element at $i+1$.
2. **The Size Property**: The sorted list must have the exact same length as the original list.
3. **The Membership Property**: Every element in the sorted list must exist in the original list (and vice-versa).

---

## Code Example: Property-Based Testing in Action

Using modern PBT libraries (like `fast-check` in TypeScript, `hypothesis` in Python, or `gopter` in Go), you define the input "arbitrary generator" and assert the properties.

Here is a TypeScript test verifying the properties of string concatenation:

```ts
import fc from "fast-check";

describe("String Concatenation Properties", () => {
  it("should satisfy the identity property", () => {
    // Generates 100+ random strings (empty, emoji, special characters, long text)
    fc.assert(
      fc.property(fc.string(), (str) => {
        // Property: any string concatenated with an empty string equals itself
        return str + "" === str;
      })
    );
  });

  it("should satisfy the length property", () => {
    fc.assert(
      fc.property(fc.string(), fc.string(), (strA, strB) => {
        // Property: length of concatenated string is sum of individual lengths
        return (strA + strB).length === strA.length + strB.length;
      })
    );
  });
});
```

---

## The Magic of Shrinking

When a property-based test fails, the randomly generated input that caused the failure is often extremely long, complex, and unreadable (e.g., a string containing 10,000 random characters, emojis, and binary codes). 

To help developers debug, PBT libraries run a **Shrinking Algorithm**:
1. Once a failure is found, the library automatically cuts the failing input in half.
2. It tests the smaller input to see if it still fails.
3. It repeats this process, reducing the failing case down to the **absolute simplest possible input** that triggers the bug.

### A Shrinking Example
Imagine you wrote an API that crashes when a user's name contains a blank space.
* **The Failure**: The tool generates a random string of 500 characters containing a space and crashes: `"aF9!kL98 @pLq... [480 more characters]"`.
* **The Shrinking Output**: The tool automatically shrinks this massive string down and reports the absolute minimum failure case:
  ```bash
  Property failed!
  Counter-example: " " (string of length 1 containing only a space)
  Shrunk 14 times.
  ```
  This immediately tells the developer the root cause of the bug without forcing them to manually parse a massive, messy logs.

---

## Common Property Patterns

To help you design property-based tests, look for these three classic patterns:

### A. Round-Trip Property (Serialization/Deserialization)
If you serialize data to a format (JSON, XML, binary) and deserialize it back, the output must equal the original input. Very useful for API payloads and database records.
$$\text{deserialize}(\text{serialize}(x)) \equiv x$$

### B. Commutative Property
For operations where the order of operands does not affect the result (like addition, merges, or database union sets).
$$f(a, b) \equiv f(b, a)$$

### C. Test Oracle (Dual Implementation)
If you are optimizing a complex algorithm to be extremely fast, test it against a slow, simple, but highly trusted implementation (your "Oracle"). Generate thousands of random inputs and assert that both implementations return the exact same output.
$$\text{fastAlgorithm}(x) \equiv \text{simpleAlgorithm}(x)$$

---

## Summary of PBT Trade-offs

| Advantages | Disadvantages |
| :--- | :--- |
| Discovers obscure edge cases and bugs automatically. | Requires a shift in cognitive thinking (defining properties is harder than writing examples). |
| Drastically reduces the manual code needed to achieve high test coverage. | Tests take longer to run (since they execute 100+ cases per test run). |
| The shrinking algorithm makes debugging extremely fast. | Occasionally generates flaky tests if properties are loosely defined. |

---

## Resources & Deep Dive

* [QuickCheck: An Automated Tool for Testing Haskell Programs by Hughes & Claessen (PDF)](https://www.cs.tufts.edu/comp/150FP/archive/john-hughes/quickcheck.pdf)
* [fast-check (Modern Property-Based Testing for JavaScript/TypeScript)](https://github.com/dubzzz/fast-check)
* [Hypothesis (Outstanding Property-Based Testing Library for Python)](https://hypothesis.works/)
