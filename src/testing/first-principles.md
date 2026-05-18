---
title: FIRST Principles of Testing
description: Discover the F.I.R.S.T. mnemonic of software testing to write fast, isolated, repeatable, self-validating, and timely tests.
icon: ShieldCheck
---

# FIRST Principles of Testing

> **"The quality of your test suite determines the speed at which you can safely change your system."**

The **FIRST** testing principles represent a set of industry-standard guidelines for writing high-quality, reliable, and maintainable automated unit tests. Enforcing these five characteristics keeps developers highly productive and prevents test suites from turning into flaky, slow, or ignored burdens.

---

## The F.I.R.S.T. Mnemonic

* **Fast**: Tests must execute in milliseconds so developers run them continuously.
* **Isolated**: Tests must not depend on each other's execution order or shared mutable state.
* **Repeatable**: Tests must yield the exact same result in any environment, at any time.
* **Self-validating**: Tests must automatically pass or fail without requiring manual inspection of output logs.
* **Timely**: Tests should be written in a timely fashion—ideally *before* or *alongside* the production code.

---

## 1. Fast

If a test suite takes minutes to run, developers will stop running it before commits, leading to a slow feedback loop and delayed bug discovery. Tests must run almost instantaneously.

### ❌ The Anti-Pattern: Network/IO Bound Tests
```ts
// ❌ Slow and fragile: depends on an external API response
test("fetchUser profile", async () => {
  const user = await api.fetchUserProfile("user-123"); // Takes 200ms - 1s!
  expect(user.name).toBe("Alice");
});
```

### 🌟 The FIRST Solution: In-Memory Mocks
```ts
// 🌟 Fast: executes in under 2ms using localized mock data
test("fetchUser profile", async () => {
  const mockApi = {
    fetchUserProfile: async () => ({ id: "user-123", name: "Alice" })
  };
  const user = await mockApi.fetchUserProfile("user-123");
  expect(user.name).toBe("Alice");
});
```

---

## 2. Isolated (Independent)

Tests should be isolated units. No test should depend on the output or state of a previous test. They must be able to run in any order, concurrently, or individually.

### ❌ The Anti-Pattern: Order Dependency
```ts
let sharedUserId = "";

// ❌ Test 1 sets up data
test("should create user", async () => {
  const user = await userService.create("Bob");
  sharedUserId = user.id; // Mutates global state
  expect(user.name).toBe("Bob");
});

// ❌ Test 2 breaks if run individually or out of order!
test("should fetch created user", async () => {
  const user = await userService.find(sharedUserId);
  expect(user.name).toBe("Bob");
});
```

### 🌟 The FIRST Solution: Clean Setup and Teardown
```ts
// 🌟 Isolated: Each test manages its own independent state
test("should create user", async () => {
  const user = await userService.create("Bob");
  expect(user.name).toBe("Bob");
});

test("should fetch created user", async () => {
  // Setup isolated precondition explicitly inside the test
  const user = await userService.create("Bob"); 
  const found = await userService.find(user.id);
  expect(found.name).toBe("Bob");
});
```

---

## 3. Repeatable

A test must produce the exact same outcome every time you run it, whether on your local machine, a coworker's environment, a Docker container, or the production CI/CD pipeline. Tests must be free of environment dependencies (e.g. system time, regional locales, or network availability).

### ❌ The Anti-Pattern: Flaky Time Dependency
```ts
// ❌ Brittle: This test will fail on January 1st because of hardcoded logic
test("isAdult check", () => {
  const user = { dob: new Date("2000-01-01") };
  const currentYear = new Date().getFullYear(); // Shifting variable!
  expect(currentYear - user.dob.getFullYear()).toBeGreaterThanOrEqual(18);
});
```

### 🌟 The FIRST Solution: Mocked Environments
```ts
// 🌟 Repeatable: Explicitly control the current time context in the test
test("isAdult check", () => {
  const fakeCurrentTime = new Date("2026-05-18");
  const user = { dob: new Date("2000-01-01") };
  
  const age = fakeCurrentTime.getFullYear() - user.dob.getFullYear();
  expect(age).toBeGreaterThanOrEqual(18);
});
```

---

## 4. Self-validating

A test must have a binary output: it either passes or fails. You should never have to manually inspect a log file, output stream, or database entry to determine if the code is working correctly.

### ❌ The Anti-Pattern: Manual Log Inspection
```ts
// ❌ Violates Self-validation: requires a developer to read the console log
test("processTransaction", () => {
  const result = transactionService.process(100);
  console.log("Transaction result is: ", result); // Manual audit needed!
});
```

### 🌟 The FIRST Solution: Declarative Assertions
```ts
// 🌟 Self-validating: Automated assertions guarantee status
test("processTransaction", () => {
  const result = transactionService.process(100);
  expect(result.status).toBe("SUCCESS"); // Binary output (Pass/Fail)
  expect(result.processedAmount).toBe(100);
});
```

---

## 5. Timely

Tests should be written in a timely fashion. In a traditional development flow, tests are often deferred to the end of a sprint—or skipped entirely. Writing tests *before* or *during* the coding process (such as in Test-Driven Development / TDD) forces you to design highly testable, decoupled APIs from day one.

> [!TIP]
> **Avoid Late-Stage Testing Friction**: Writing tests after the production code is complete is much harder because the code wasn't designed with testability in mind. Write your tests alongside your implementation.

---

## Resources & Deep Dive

* [FIRST Testing Principles on Agile in a Flash](https://agileinaflash.blogspot.com/2009/02/first.html)
* [Pass the Tests & Testability](/testing/pass-the-tests)
* [Test-Driven Development (TDD)](/testing/test-driven-development)
