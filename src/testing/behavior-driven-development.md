---
title: Behavior-Driven Development (BDD)
description: Bridge the communication gap between developers and business stakeholders by writing tests in natural human language using Given-When-Then.
icon: Award
---

# Behavior-Driven Development (BDD)

<CoverImage src="/covers/testing/behavior-driven-development.webp" alt="Behavior-Driven Development">
  <h1>Behavior-Driven Development</h1>
  <p>A tiny white robot and a stakeholder robot reading together from a large storybook whose pages unfold into three illustrated scenes: the setup, the action and the outcome.</p>
</CoverImage>

> **"BDD is a second-generation, agile software development process that blends Test-Driven Development (TDD) with domain-driven design and acceptance-test-driven planning to provide software development and management teams with shared tools and a shared process."** — *Dan North*

**Behavior-Driven Development (BDD)** is an agile software development methodology designed to bridge the communication gap between technical developers and non-technical business stakeholders (such as Product Managers, QA analysts, and clients). 

First formulated by software consultant **Dan North** as a response to the challenges of teaching [Test-Driven Development (TDD)](/testing/test-driven-development), BDD shifts the focus of testing from *verification of technical implementations* to **documentation and verification of user behaviors**. BDD tests are written in structured, plain English using a syntax known as **Gherkin (Given-When-Then)**, allowing anyone in the business to read, understand, and validate the system's specifications.

---

## The Three Amigos & Shared Understanding

```
                     THE THREE AMIGOS BOUNDARY:
                     ┌────────────────────────┐
                     │    Product / Business  │
                     │  (What is the value?)  │
                     └───────────┬────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
       ┌──────────────────┐             ┌──────────────────┐
       │   Developer / Tech│             │  Quality / QA    │
       │(How do we build?)│             │(How do we break?)│
       └──────────────────┘             └──────────────────┘
```

At the core of BDD is the concept of **The Three Amigos**: bringing together a Business representative (Product Manager), a Technical representative (Developer), and a Quality representative (QA) *before* writing code. 
* **The Goal**: Discuss a user story, explore edge cases, and agree on a set of concrete, real-world examples representing acceptable behavior.
* **The Output**: Write down these examples as Gherkin **scenarios**. These scenarios serve as both the business requirement specifications *and* the automated test suite.

---

## Gherkin Syntax: Given, When, Then

BDD scenarios are written in Gherkin, a structured domain-specific language. Every scenario follows a simple three-step narrative:

* **Given**: The initial context or precondition of the system.
* **When**: The action or event triggered by the user.
* **Then**: The expected outcome, assertion, or side-effect.

### A Real-World Gherkin Scenario
```gherkin
Feature: User Account Cash Withdrawal

  Scenario: Successful withdrawal from account with sufficient funds
    Given the user's account has a balance of $100
    And the user's credit card is valid
    When the user requests a withdrawal of $20
    Then the ATM should dispense $20
    And the user's account balance should be $80
```

---

## Code Example: Connecting Gherkin to Tests (Step Definitions)

To execute Gherkin scenarios as automated tests, developers write **Step Definitions** (using tools like Cucumber, SpecFlow, or Jest-Cucumber). The step definition matches the Gherkin text using regular expressions and executes the underlying code:

```ts
// TypeScript Step Definitions conforming to BDD
import { Given, When, Then } from "@cucumber/cucumber";
import { assert } from "chai";
import { BankAccount, ATM } from "../src/bank";

let account: BankAccount;
let atm: ATM;
let dispensedAmount: number;

Given("the user's account has a balance of ${int}", (initialBalance: number) => {
  account = new BankAccount(initialBalance);
  atm = new ATM();
});

Given("the user's credit card is valid", () => {
  account.setCardValidity(true);
});

When("the user requests a withdrawal of ${int}", (requestedAmount: number) => {
  dispensedAmount = atm.withdraw(account, requestedAmount);
});

Then("the ATM should dispense ${int}", (expectedDispensed: number) => {
  assert.equal(dispensedAmount, expectedDispensed);
});

Then("the user's account balance should be ${int}", (expectedBalance: number) => {
  assert.equal(account.balance, expectedBalance);
});
```

---

## BDD vs. TDD

While BDD evolved from TDD, they serve different purposes and are often used together:

| Metric | Test-Driven Development (TDD) | Behavior-Driven Development (BDD) |
| :--- | :--- | :--- |
| **Audience** | Technical developers. | Developers, QA, Product Owners, Clients. |
| **Focus** | Code design, modularity, and correctness. | System behavior, user requirements, business value. |
| **Language** | Programming language (TS, Python, Go). | Natural human language (English, Uzbek). |
| **Scope** | Micro-level class/function testing. | Macro-level feature/acceptance testing. |

---

## Summary of BDD Benefits

* **Zero Translation Error**: Ensures that the developer builds exactly what the business owner requested. The Gherkin specification *is* the test.
* **Living Documentation**: Because BDD tests are written in plain English, they double as the system's up-to-date documentation. They never get stale because if the behavior changes, the test suite will fail.
* **Unified Quality Assurance**: QAs can collaborate on writing the scenarios *before* development begins, rather than waiting to write tests after code is already complete.

---

## Resources & Deep Dive

* [Introducing BDD by Dan North (Original Article)](https://dannorth.net/introducing-bdd/)
* [The Cucumber Book: Behaviour-Driven Development for Testers and Developers](https://cucumber.io/docs/guides/overview/)
* [Gherkin Reference Documentation](https://cucumber.io/docs/gherkin/reference/)
