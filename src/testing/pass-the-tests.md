---
title: Pass the Tests & Testability
description: A complete philosophy of building highly testable code, organic test growth, and eliminating test friction.
icon: ShieldCheck
---

# Pass the Tests & Testability

> "Software testing is a sport of building confidence. It is not about proving the absence of bugs, but verifying the presence of core functionality."

Every piece of production code should have automated tests verifying its behavior. This ensures long-term reliability, prevents regressions, and boosts the team's confidence in the codebase. However, writing tests is often met with resistance. This page covers essential, pragmatic rules for building highly testable systems.

---

## 1. Tests Accrete (Organic Test Growth)

If you have a large legacy codebase with low test coverage, **do not drop everything to write hundreds of tests**. This leads to burn-out and poor test quality.

Instead, let your tests grow organically over time:
- **Write tests when fixing bugs**: When a bug is discovered, write a test that reproduces the bug, watch it fail, then fix the code and watch it pass. This ensures the bug *never* returns.
- **Write tests for new features**: Write tests for the happy paths of any new component or method you add.
- **Delete useless tests**: If a test is brittle, hard to understand, or constantly gets in the way of refactoring without providing real confidence, **delete it**.

Over time, your test suite will organically grow into a highly useful, resilient safety net.

## 2. Make it Easy to Test (Friction is the Enemy)

Every bit of friction in writing tests increases the likelihood that when a tight deadline approaches, tests simply won't be written. 

Spend engineering effort in **improving the test developer experience (DX)**:
- Create simple mock helpers.
- Setup clean, fast-running global test environments.
- Provide simple scripts (like `npm run test:watch`).
- Keep test compilation times extremely fast.

If a developer can write a unit test in 30 seconds rather than 30 minutes, they will do it gladly.

## 3. It's More Important to be Testable than Actually Tested

Writing **testable code** is more than just about having test files. Highly testable code naturally possesses outstanding design traits:
- It is highly decoupled.
- It favors pure functions and composition.
- It relies on dependency injection rather than global singletons.
- It is easy to understand how to use.

Even if you don't write 100% test coverage for a component immediately, ensuring it *can* be easily tested guarantees a clean, extensible architecture.

### Code Smell: Untestable Global Coupling

```ts
// ❌ Hard to test (relies on direct global filesystem & network calls)
class ReportGenerator {
  generateAndSave() {
    const rawData = fs.readFileSync('/var/data/source.csv'); // Coupled to local filesystem!
    const report = this.process(rawData);
    axios.post('https://analytics.internal/reports', report); // Coupled to live network!
  }
}
```

Testing this class requires mocking global Node.js file systems and intercepting external network calls.

### The Solution: Inject Abstractions

```ts
//  Highly Testable (and therefore highly decoupled and extensible!)
class ReportGenerator {
  constructor(
    private fileReader: FileReader,
    private apiClient: ApiClient
  ) {}

  generateAndSave(filePath: string) {
    const rawData = this.fileReader.read(filePath);
    const report = this.process(rawData);
    this.apiClient.sendReport(report);
  }
}
```

Now, testing this method is a breeze: you simply pass mock implementations of `FileReader` and `ApiClient` in your unit tests.
