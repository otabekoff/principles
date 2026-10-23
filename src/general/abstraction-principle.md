---
title: Abstraction Principle
description: "A foundational dictum in software engineering: reduce duplication of information by making use of programming language abstractions."
icon: Target
---

# Abstraction Principle

<CoverImage src="/covers/general/abstraction-principle.webp" alt="Abstraction Principle">
  <h1>Abstraction Principle</h1>
  <p>A tiny white robot pulling a single amber lever on a smooth, minimal control panel, while the panel's transparent back reveals a vast hidden clockwork of thousands of turning gears.</p>
</CoverImage>

> "Each significant piece of functionality in a program should be implemented in just one place in the source code. Where similar functions are carried out by distinct pieces of code, it is generally beneficial to combine them into one by abstracting out the varying parts." — Benjamin C. Pierce (*Types and Programming Languages*, 2002)

The **Abstraction Principle** is one of the most fundamental dictums in software engineering and programming language theory. It aims to reduce the duplication of information (with a strong emphasis on code duplication) by utilizing the abstraction features provided by the programming language or software libraries.

---

## Formulations of the Principle

Over the decades, the Abstraction Principle has been formulated by multiple pioneering computer scientists from both language-design and practical-programming perspectives.

### 1. The Programmer's Recommendation
In its widely cited formulation by **Benjamin C. Pierce** (2002), the principle serves as a direct guideline for developers: 
Whenever similar actions are performed by different sections of code, you should combine them into a single implementation by **abstracting out the parts that vary**.

### 2. The Language Design Requirement
In its formulation by **David A. Schmidt** in *The Structure of Typed Programming Languages* (1994), the principle is stated as a requirement for programming languages themselves:
> *"The phrases of any semantically meaningful syntactic class may be named."*

This means that if a language has a concept (such as an expression, a statement, a type, or a command), it must provide a mechanism to name it and reuse it (e.g. variables, functions, classes, generic parameters).

---

## Historical Variations

The principle has been independently reinvented and rephrased across different programming eras:

* **MacLennan's Law (1983)**: *"Avoid requiring something to be stated more than once; factor out the recurring pattern."*
* **S-algol Definition (1982)**: *"Define all the semantically meaningful syntactic categories in the language and allow an abstraction over them."*
* **Extreme Programming (XP)**: Known under the slogan **"Once and Only Once"** (meaning: zero duplicate code, and automating repetitive tasks with scripts).
* **The Gang of Four (GoF)**: Central to object-oriented design patterns, often phrased as: **"Find what varies and encapsulate it."**

---

## Code Smell: Duplicated Variation

Consider two functions that perform similar logging calculations but differ in their format and output destination:

```ts
// ❌ Duplicated Logic with slight variations
function logToConsole(user: string, action: string) {
  const timestamp = new Date().toISOString();
  const message = `[CONSOLE] User ${user} performed: ${action} at ${timestamp}`;
  console.log(message);
}

function logToFile(user: string, action: string, filePath: string) {
  const timestamp = new Date().toISOString();
  const message = `[FILE] User ${user} performed: ${action} at ${timestamp}`;
  fs.writeFileSync(filePath, message);
}
```

Both functions duplicate the timestamp generation and message format construction.

### The Solution: Abstracting the Varying Parts

Following Pierce's recommendation, we combine the common logic into a single abstraction (a helper function) and parameterize the variation (via a callback format function):

```ts
// 🌟 Abstracted Solution
function createLogMessage(user: string, action: string, type: string): string {
  const timestamp = new Date().toISOString();
  return `[${type.toUpperCase()}] User ${user} performed: ${action} at ${timestamp}`;
}

function logToConsole(user: string, action: string) {
  const message = createLogMessage(user, action, 'console');
  console.log(message);
}

function logToFile(user: string, action: string, filePath: string) {
  const message = createLogMessage(user, action, 'file');
  fs.writeFileSync(filePath, message);
}
```

---

## Implications & Complementary Principles

1. **Relation to DRY (Don't Repeat Yourself)**: DRY is a broad generalization of the Abstraction Principle. While Abstraction focuses specifically on code and syntactic elements, DRY extends to database schemas, build processes, documentations, and human effort.
2. **The Danger of Over-Abstraction**: Inexperienced developers often introduce excessive abstraction layers for logic that is only used once. To balance this, refer to:
   * **KISS Principle**: Keep it simple.
   * **YAGNI**: You aren't gonna need it.
   * **The Rule of Three**: Duplicate code twice; only extract the abstraction on the third occurrence to ensure the pattern is stable.
3. **Hardware & Interface Abstraction Layers**: In systems programming, levels of abstraction describe the interfaces between hardware and software layers (e.g. C operating system commands abstracting away low-level assembly register calls, with the stack acting as the interface boundary).
