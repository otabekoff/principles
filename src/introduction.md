---
title: Introduction
description: A complete guide to programming principles (SOLID, DRY, KISS, YAGNI, and more) used in software development.
icon: Palette
---

# Introduction to Programming Principles

<CoverImage src="/covers/getting-started/introduction.png" alt="Cover">
  <h1>Introduction</h1>
  <p>A charming, tiny white robot holding a giant glowing "Hello World" handbook, standing excitedly at the grand stone entrance of a beautiful, shimmering maze of futuristic geometric architecture.</p>
</CoverImage>

**Programming principles** are fundamental guidelines and rules of thumb that help developers design clean, robust, and maintainable software. They are not structural design pattern recipes that you copy-paste — they are foundational design philosophies that you apply with judgment. A principle guides your everyday decisions, helps prevent over-engineering, and provides a shared vocabulary for high-quality software craft.

This reference covers the most critical software development principles, grouped into three categories: **SOLID**, **General/Pragmatic**, and **GRASP**.

---

## SOLID Principles

The gold standard of object-oriented design, compiled by Robert C. Martin. These five principles ensure your classes and modules are modular, cohesive, and resilient to change.

<Cards>
  <Card
    title="Introduction to SOLID"
    description="Learn the history and core goals of the SOLID principles."
    href="/solid/introduction"
    image="/cards/introduction.png"
  />
  <Card
    title="Single Responsibility (SRP)"
    description="A class should have only one reason to change."
    href="/solid/srp"
    image="/cards/singleton.png"
  />
  <Card
    title="Open-Closed (OCP)"
    description="Open for extension, closed for modification."
    href="/solid/ocp"
    image="/cards/factory-method.png"
  />
  <Card
    title="Liskov Substitution (LSP)"
    description="Subclasses must be fully substitutable for their parent classes."
    href="/solid/lsp"
    image="/cards/prototype.png"
  />
  <Card
    title="Interface Segregation (ISP)"
    description="Clients shouldn't depend on methods they don't use."
    href="/solid/isp"
    image="/cards/abstract-factory.png"
  />
  <Card
    title="Dependency Inversion (DIP)"
    description="Depend on abstractions, not concrete details."
    href="/solid/dip"
    image="/cards/dependency-injection.png"
  />
</Cards>

---

## General & Pragmatic Principles

These principles focus on everyday code cleanliness, simplicity, and protecting codebases from premature abstractions and complexity bloat.

<Cards>
  <Card
    title="DRY (Don't Repeat Yourself)"
    description="Ensure every piece of knowledge has a single representation."
    href="/general/dry"
    image="/cards/iterator.png"
  />
  <Card
    title="KISS (Keep It Simple)"
    description="Simplicity is key; avoid over-engineering and clever tricks."
    href="/general/kiss"
    image="/cards/mediator.png"
  />
  <Card
    title="YAGNI (You Aren't Gonna Need It)"
    description="Do not implement features until they are actually needed."
    href="/general/yagni"
    image="/cards/null-object.png"
  />
  <Card
    title="Law of Demeter"
    description="Only talk to your immediate friends; reduce object coupling."
    href="/general/law-of-demeter"
    image="/cards/observer.png"
  />
  <Card
    title="Separation of Concerns (SoC)"
    description="Divide a program into sections addressing distinct duties."
    href="/general/soc"
    image="/cards/mvc.png"
  />
  <Card
    title="Composition over Inheritance"
    description="Favor composing reusable behaviors over inheriting rigid trees."
    href="/general/composition-over-inheritance"
    image="/cards/decorator.png"
  />
  <Card
    title="Least Astonishment (POLA)"
    description="Ensure APIs and modules behave exactly as expected."
    href="/general/least-astonishment"
    image="/cards/proxy.png"
  />
  <Card
    title="GRASP Principles"
    description="Craig Larman's nine guidelines for responsibility assignment."
    href="/general/grasp"
    image="/cards/command.png"
  />
</Cards>

---

## A Word of Caution

Principles are **guidelines, not laws**. Dogmatically applying SOLID, DRY, or SoC to every single line of code can lead to over-engineering, high indirection, and code that is extremely hard to follow. The ultimate goal of programming is **simplicity and maintainability**. When a principle stops reducing friction and starts adding it, the right move is to choose the simpler, more direct solution.
