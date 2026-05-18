---
title: Core Concepts
description: A clear explanation of what design patterns are, where they came from, and why they matter.
icon: Shapes
---

# Core concepts

<CoverImage src="/covers/getting-started/core-concepts.png" alt="Cover">
  <h1>Core Concepts</h1>
  <p>A wizard-hat robot sitting in a floating library, pointing a magic wand at a shelf of glowing, transparent 3D blueprints (a bridge, a castle gate, a shield) that fit perfectly over chaotic piles of jumbled toy blocks.</p>
</CoverImage>

A **programming principle** is a fundamental rule of thumb, guideline, or best practice that helps software developers design clean, maintainable, and robust systems. Unlike design patterns, which are concrete structural templates for specific problems, principles are more general, high-level guidelines that apply across all programming paradigms and situations.

Think of the difference between an architectural style and building codes. An architectural style (like Gothic or Modernist) dictates specific design structures—this is like a **design pattern**. Building codes (which require safe exits, sturdy foundations, and proper ventilation) are general rules that every building must follow to be safe and functional—these are **principles**.

## What a Principle Provides

A good programming principle offers:

- **Clarity** — guidance on how to structure code to make it readable and understandable.
- **Maintainability** — strategies to ensure code can change over time with minimal friction.
- **Robustness** — techniques to prevent bugs and regression when adding new features.
- **Decoupling** — ways to separate different parts of a system so they can evolve independently.

## Where Principles Came From

Many fundamental programming principles emerged alongside object-oriented design in the late 20th century. 

- **SOLID** was compiled by Robert C. Martin (Uncle Bob) in the early 2000s, grouping five core principles (SRP, OCP, LSP, ISP, DIP) that make software designs more understandable, flexible, and maintainable.
- **DRY (Don't Repeat Yourself)** was coined by Andy Hunt and Dave Thomas in their book *The Pragmatic Programmer*.
- **KISS (Keep It Simple, Stupid)** was originally a design principle noted by the U.S. Navy in 1960.
- **YAGNI (You Aren't Gonna Need It)** emerged from Extreme Programming (XP) practices.

## Principles vs. Patterns

The distinction is worth being precise about:

- **Principles** are philosophical guidelines. They are rules of thumb that tell you *what* qualities your code should have (e.g., "modules should have a single reason to change" or "keep things simple"). They are abstract and highly adaptable.
- **Patterns** are concrete, reusable designs. They are specific templates that solve a particular problem in a specific way (e.g., using a *Strategy* pattern to swap algorithms at runtime). Patterns are often concrete applications of underlying principles.

For example, the **Dependency Inversion Principle (DIP)** is a *principle* that tells you to depend on abstractions, not concretions. The **Dependency Injection (DI)** or **Service Locator** are *patterns* that help you achieve that principle in practice.

## Why Learn Them

Studying programming principles sharpens your software engineering instincts. It helps you recognize "code smells" before they lead to bugs or rigid systems. When you discuss code with your team, terms like "violating SRP" or "premature optimization (violating YAGNI)" provide a clear, shared vocabulary to evaluate design tradeoffs quickly.

## Common Criticisms & Misapplications

Principles are incredibly useful, but they can be easily abused:

**Dogmatic Adherence:** Following principles blindly without considering the context or the project's scale can lead to over-engineering. For example, over-splitting classes to satisfy SRP perfectly can lead to thousands of tiny classes that are impossible to navigate.

**Premature Application:** Applying principles too early—before the requirements or domain model are stable—can lead to rigid abstractions that end up being wrong. Sometimes, it is better to duplicate code briefly (violating DRY) until the correct abstraction becomes obvious.

**Analysis Paralysis:** Spending too much time trying to make a simple script follow every single SOLID principle perfectly instead of shipping working software.

## How Principles Are Classified

Programming principles are generally grouped into two major categories:

- **SOLID Principles** — Five core principles focusing on object-oriented and module-level design:
  - **SRP** (Single Responsibility Principle)
  - **OCP** (Open-Closed Principle)
  - **LSP** (Liskov Substitution Principle)
  - **ISP** (Interface Segregation Principle)
  - **DIP** (Dependency Inversion Principle)
- **General & Pragmatic Principles** — High-level guidelines for clean code and systems:
  - **DRY** (Don't Repeat Yourself)
  - **KISS** (Keep It Simple, Stupid)
  - **YAGNI** (You Aren't Gonna Need It)
  - **Law of Demeter** (Least Knowledge)
  - **Separation of Concerns** (SoC)
  - **Composition over Inheritance**
  - **Least Astonishment**
  - **GRASP** (General Responsibility Assignment Software Patterns)
