---
title: Introduction
description: A complete guide to programming principles (SOLID, DRY, KISS, YAGNI, and more) used in software development.
icon: Palette
cardPrompt: "A cheerful little explorer holding a big compass whose needle points to a signpost labelled \"CLEAN CODE\", while a tangled scribble labelled \"SPAGHETTI\" sits behind them."
---

# Introduction to Programming Principles

<CoverImage src="/covers/getting-started/introduction.webp" alt="Introduction">
  <h1>Introduction</h1>
  <p>A tiny white robot standing on a hilltop at dawn, holding up a glowing compass whose needle points toward a distant, orderly city of clean geometric buildings, while a tangled jungle of vines and loose wires lies behind it.</p>
</CoverImage>

**Programming principles** are fundamental guidelines and rules of thumb that help developers design clean, robust, and maintainable software. They are not structural design pattern recipes that you copy-paste — they are foundational design philosophies that you apply with judgment. A principle guides your everyday decisions, helps prevent over-engineering, and provides a shared vocabulary for high-quality software craft.

Every programmer benefits from understanding programming principles and design patterns. This comprehensive reference is designed to serve as a practical guide during system design, discussion, or code review. The list is naturally incomplete, and trade-offs must frequently be made between conflicting principles. However, higher-ranked principles usually guide the system more effectively than lower-ranked ones.

This guide was originally inspired by the classic post [The Principles of Good Programming](https://www.artima.com/weblogs/viewpost.jsp?thread=331531). We have enriched it with thorough architectural reasoning, practical TypeScript code comparisons, modern engineering trade-offs, and curated deep-dive resources.

Currently, the reference covers the most critical software development principles, grouped into six categories: **General Principles**, **SOLID**, **Pragmatic & Clean Code**, **Software Architecture**, **Testing & Quality**, and **Laws & Aphorisms**.

---

## General Principles

These principles focus on everyday code cleanliness, simplicity, and protecting codebases from premature abstractions and complexity bloat.

<Cards>
  <Card
    title="Abstraction Principle"
    description="Reduce duplication by making use of programming language abstractions."
    href="/general/abstraction-principle"
    image="/cards/general/abstraction-principle.webp"
  />
  <Card
    title="Black Box"
    description="View systems in terms of inputs and outputs without internal knowledge."
    href="/general/black-box"
    image="/cards/general/black-box.webp"
  />
  <Card
    title="Code Reuse"
    description="Leverage existing well-tested code assets to build new software."
    href="/general/code-reuse"
    image="/cards/general/code-reuse.webp"
  />
  <Card
    title="DRY vs WET"
    description="The fundamental tension between Don't Repeat Yourself and Write Everything Twice."
    href="/general/dry-wet"
    image="/cards/general/dry-wet.webp"
  />
  <Card
    title="KISS (Keep It Simple)"
    description="Simplicity is key; avoid over-engineering and clever tricks."
    href="/general/kiss"
    image="/cards/general/kiss.webp"
  />
  <Card
    title="YAGNI (You Aren't Gonna Need It)"
    description="Do not implement features until they are actually needed."
    href="/general/yagni"
    image="/cards/general/yagni.webp"
  />
  <Card
    title="Separation of Concerns (SoC)"
    description="Divide a program into sections addressing distinct duties."
    href="/general/soc"
    image="/cards/general/soc.webp"
  />
  <Card
    title="Least Astonishment (POLA)"
    description="Ensure APIs and modules behave exactly as expected."
    href="/general/least-astonishment"
    image="/cards/general/least-astonishment.webp"
  />
  <Card
    title="Single Source of Truth (SSOT)"
    description="Ensure every data element is stored exactly once to prevent synchronization issues."
    href="/general/single-source-of-truth"
    image="/cards/general/single-source-of-truth.webp"
  />
  <Card
    title="Principle of Least Privilege"
    description="Restrict access rights to only those absolutely necessary for a component."
    href="/general/least-privilege"
    image="/cards/general/least-privilege.webp"
  />
</Cards>

---

## SOLID Principles

The gold standard of object-oriented design, compiled by Robert C. Martin. These five principles ensure your classes and modules are modular, cohesive, and resilient to change.

<Cards>
  <Card
    title="Introduction to SOLID"
    description="Learn the history and core goals of the SOLID principles."
    href="/solid/introduction"
    image="/cards/solid/introduction.webp"
  />
  <Card
    title="Single Responsibility (SRP)"
    description="A class should have only one reason to change."
    href="/solid/srp"
    image="/cards/solid/srp.webp"
  />
  <Card
    title="Open-Closed (OCP)"
    description="Open for extension, closed for modification."
    href="/solid/ocp"
    image="/cards/solid/ocp.webp"
  />
  <Card
    title="Liskov Substitution (LSP)"
    description="Subclasses must be fully substitutable for their parent classes."
    href="/solid/lsp"
    image="/cards/solid/lsp.webp"
  />
  <Card
    title="Interface Segregation (ISP)"
    description="Clients shouldn't depend on methods they don't use."
    href="/solid/isp"
    image="/cards/solid/isp.webp"
  />
  <Card
    title="Dependency Inversion (DIP)"
    description="Depend on abstractions, not concrete details."
    href="/solid/dip"
    image="/cards/solid/dip.webp"
  />
</Cards>

---

## Pragmatic & Clean Code

Tactical guidelines for maintaining an agile, clean, and highly maneuverable codebase during rapid development cycles.

<Cards>
  <Card
    title="Avoid Premature Optimization"
    description="Optimization is the root of all evil early in development."
    href="/pragmatic/premature-optimization"
    image="/cards/pragmatic/premature-optimization.webp"
  />
  <Card
    title="The Boy Scout Rule"
    description="Always leave the codebase cleaner than you found it."
    href="/pragmatic/boy-scout-rule"
    image="/cards/pragmatic/boy-scout-rule.webp"
  />
  <Card
    title="Findability & Discoverability"
    description="Ensure product features and information are easily retrieved and discovered."
    href="/pragmatic/findability-discoverability"
    image="/cards/pragmatic/findability-discoverability.webp"
  />
  <Card
    title="Levels of Abstraction"
    description="Keep every block of code inside a function on the same level."
    href="/pragmatic/level-of-abstraction"
    image="/cards/pragmatic/level-of-abstraction.webp"
  />
  <Card
    title="Make it Work, Right, Fast"
    description="Kent Beck's disciplined workflow for building software."
    href="/pragmatic/make-it-work-right-fast"
    image="/cards/pragmatic/make-it-work-right-fast.webp"
  />
  <Card
    title="Good Code is Easy to Delete"
    description="Modularity means writing code that is simple to completely tear out."
    href="/pragmatic/easy-to-delete"
    image="/cards/pragmatic/easy-to-delete.webp"
  />
  <Card
    title="Technical Debt"
    description="Ward Cunningham's financial metaphor for managing design shortcuts and cruft."
    href="/pragmatic/technical-debt"
    image="/cards/pragmatic/technical-debt.webp"
  />
  <Card
    title="Make Non-Breaking Changes"
    description="Introduce new logic alongside deprecated code to avoid build stalls."
    href="/pragmatic/non-breaking-changes"
    image="/cards/pragmatic/non-breaking-changes.webp"
  />
  <Card
    title="Future Developers Will Copy You"
    description="Setting templates and standards that future maintainers will mimic."
    href="/pragmatic/future-developers"
    image="/cards/pragmatic/future-developers.webp"
  />
</Cards>

---

## Software Architecture

High-level design paradigms, architectural separations, and safety-critical rules.

<Cards>
  <Card
    title="Coupling (Deep Dive)"
    description="Explore Larry Constantine's complete qualitative rubric of software coupling."
    href="/architecture/coupling"
    image="/cards/architecture/coupling.webp"
  />
  <Card
    title="Cohesion (Deep Dive)"
    description="Explore Larry Constantine's complete qualitative rubric of software cohesion."
    href="/architecture/cohesion"
    image="/cards/architecture/cohesion.webp"
  />
  <Card
    title="GRASP Principles"
    description="Craig Larman's nine guidelines for responsibility assignment."
    href="/architecture/grasp"
    image="/cards/architecture/grasp.webp"
  />
  <Card
    title="Law of Demeter"
    description="Only talk to your immediate friends; reduce object coupling."
    href="/architecture/law-of-demeter"
    image="/cards/architecture/law-of-demeter.webp"
  />
  <Card
    title="Composition over Inheritance"
    description="Favor composing reusable behaviors over inheriting rigid trees."
    href="/architecture/composition-over-inheritance"
    image="/cards/architecture/composition-over-inheritance.webp"
  />
  <Card
    title="Design by Contract (DbC)"
    description="Bertrand Meyer's methodology of preconditions, postconditions, and class invariants."
    href="/architecture/design-by-contract"
    image="/cards/architecture/design-by-contract.webp"
  />
  <Card
    title="Encapsulation & Info Hiding"
    description="Bundling state while shielding internal design decisions."
    href="/architecture/encapsulation-information-hiding"
    image="/cards/architecture/encapsulation-information-hiding.webp"
  />
  <Card
    title="Command-Query Separation (CQS)"
    description="Ensure methods do something or answer something, but never both."
    href="/architecture/cqs"
    image="/cards/architecture/cqs.webp"
  />
  <Card
    title="Inversion of Control (IoC)"
    description="Delegating control flow and lifecycle management to reusable frameworks."
    href="/architecture/inversion-of-control"
    image="/cards/architecture/inversion-of-control.webp"
  />
  <Card
    title="Functional Core, Imperative Shell"
    description="Keeping pure business rules safely isolated from side-effects."
    href="/architecture/functional-core-imperative-shell"
    image="/cards/architecture/functional-core-imperative-shell.webp"
  />
  <Card
    title="Functional Purity"
    description="Ensuring predictable, side-effect-free code through pure mathematical functions."
    href="/architecture/functional-purity"
    image="/cards/architecture/functional-purity.webp"
  />
  <Card
    title="Event-Driven Architecture (EDA)"
    description="Decouple and scale systems asynchronously using publishers, subscribers, and events."
    href="/architecture/event-driven-architecture"
    image="/cards/architecture/event-driven-architecture.webp"
  />
  <Card
    title="Strangler Fig"
    description="Safely migrate legacy systems incrementally by strangling old endpoints."
    href="/architecture/strangler-fig"
    image="/cards/architecture/strangler-fig.webp"
  />
  <Card
    title="Defensive & Offensive Programming"
    description="Protecting system boundaries while failing-fast internally."
    href="/architecture/defensive-offensive-programming"
    image="/cards/architecture/defensive-offensive-programming.webp"
  />
  <Card
    title="Fail-Fast & Robustness"
    description="Crashing early locally while maintaining global resilience."
    href="/architecture/fail-fast-robustness"
    image="/cards/architecture/fail-fast-robustness.webp"
  />
  <Card
    title="Reveal Intentions"
    description="Self-documenting code through meaningful, intent-revealing names."
    href="/architecture/reveal-intentions"
    image="/cards/architecture/reveal-intentions.webp"
  />
</Cards>

---

## Testing & Quality

Pragmatic workflows and strategies for building high-quality, fully testable, and reliable software.

<Cards>
  <Card
    title="Pass the Tests & Testability"
    description="Organic test growth, DX friction reduction, and testable design."
    href="/testing/pass-the-tests"
    image="/cards/testing/pass-the-tests.webp"
  />
  <Card
    title="Test-Driven Development (TDD)"
    description="Mastering the cycle of Red, Green, and Refactor."
    href="/testing/test-driven-development"
    image="/cards/testing/test-driven-development.webp"
  />
  <Card
    title="The ZOMBIES Strategy"
    description="A systematic test-driven problem-solving and boundary checklist."
    href="/testing/zombies-strategy"
    image="/cards/testing/zombies-strategy.webp"
  />
  <Card
    title="The Test Pyramid"
    description="Structure test suites with thousands of unit tests and minimal browser E2E tests."
    href="/testing/test-pyramid"
    image="/cards/testing/test-pyramid.webp"
  />
  <Card
    title="Behavior-Driven Development (BDD)"
    description="Align developers and business stakeholders via Given-When-Then human specs."
    href="/testing/behavior-driven-development"
    image="/cards/testing/behavior-driven-development.webp"
  />
  <Card
    title="Property-Based Testing"
    description="Assert universal system invariants across thousands of generative inputs."
    href="/testing/property-based-testing"
    image="/cards/testing/property-based-testing.webp"
  />
</Cards>

---

## Laws & Aphorisms

Historical rules of thumb, software engineering laws, and design philosophies.

<Cards>
  <Card
    title="Booch Method"
    description="Grady Booch's object-oriented software design methodology (UML origin)."
    href="/laws/booch-method"
    image="/cards/laws/booch-method.webp"
  />
  <Card
    title="Brooks's Law"
    description="Adding human resources to a late software project makes it later."
    href="/laws/brookss-law"
    image="/cards/laws/brookss-law.webp"
  />
  <Card
    title="Chesterton's Fence"
    description="Do not modify or remove a piece of code until you understand why it's there."
    href="/laws/chestertons-fence"
    image="/cards/laws/chestertons-fence.webp"
  />
  <Card
    title="Conway's Law"
    description="Any organization that designs a system will duplicate their communication structure."
    href="/laws/conways-law"
    image="/cards/laws/conways-law.webp"
  />
  <Card
    title="Curly's Law"
    description="A software entity should mean one thing, and only one thing."
    href="/laws/curlys-law"
    image="/cards/laws/curlys-law.webp"
  />
  <Card
    title="Deutsch Limit"
    description="Coined by L. Peter Deutsch, visual programming graphs should not exceed fifty elements."
    href="/laws/deutsch-limit"
    image="/cards/laws/deutsch-limit.webp"
  />
  <Card
    title="Gall's Law"
    description="A complex working system invariably evolved from a simple working system."
    href="/laws/galls-law"
    image="/cards/laws/galls-law.webp"
  />
  <Card
    title="Hofstadter's Law"
    description="It always takes longer than you expect, even when you take into account the law."
    href="/laws/hofstadters-law"
    image="/cards/laws/hofstadters-law.webp"
  />
  <Card
    title="Hyrum's Law"
    description="Once an API has enough users, all observable behaviors will be depended upon."
    href="/laws/hyrums-law"
    image="/cards/laws/hyrums-law.webp"
  />
  <Card
    title="If It Ain't Broke, Don't Fix It"
    description="Pragmatic software adage advising stability over unnecessary rewrites."
    href="/laws/if-it-aint-broke"
    image="/cards/laws/if-it-aint-broke.webp"
  />
  <Card
    title="Mechanism and Policy"
    description="Separate core system capabilities from behavioral business rules."
    href="/laws/mechanism-policy"
    image="/cards/laws/mechanism-policy.webp"
  />
  <Card
    title="Pristine Sources"
    description="Release management policy stating upstream code tarballs must be kept unmodified."
    href="/laws/pristine-sources"
    image="/cards/laws/pristine-sources.webp"
  />
  <Card
    title="Rule of Three"
    description="Three strikes and you refactor to avoid premature DRYing."
    href="/laws/rule-of-three"
    image="/cards/laws/rule-of-three.webp"
  />
  <Card
    title="The Ninety-Ninety Rule"
    description="A humorous but accurate law regarding project time estimations."
    href="/laws/ninety-ninety-rule"
    image="/cards/laws/ninety-ninety-rule.webp"
  />
  <Card
    title="The Power of 10 Safety Rules"
    description="Gerard J. Holzmann's strict guidelines for safety-critical coding."
    href="/laws/power-of-10"
    image="/cards/laws/power-of-10.webp"
  />
  <Card
    title="The Unix Philosophy"
    description="Write programs that do one thing and do it well, communicating via text streams."
    href="/laws/unix-philosophy"
    image="/cards/laws/unix-philosophy.webp"
  />
  <Card
    title="The Zen of Python"
    description="Universal aphorisms for simplicity, clarity, and readability."
    href="/laws/zen-of-python"
    image="/cards/laws/zen-of-python.webp"
  />
  <Card
    title="Uniform Access Principle"
    description="Access methods and properties through a unified identical notation."
    href="/laws/uniform-access"
    image="/cards/laws/uniform-access.webp"
  />
  <Card
    title="Worse is Better"
    description="Simplicity of implementation is more important than completeness."
    href="/laws/worse-is-better"
    image="/cards/laws/worse-is-better.webp"
  />
  <Card
    title="Zero-One-Infinity Rule"
    description="A system should not allow arbitrary limits on entity instances."
    href="/laws/zero-one-infinity"
    image="/cards/laws/zero-one-infinity.webp"
  />
</Cards>

---

## A Word of Caution

Principles are **guidelines, not laws**. Dogmatically applying SOLID, DRY, or SoC to every single line of code can lead to over-engineering, high indirection, and code that is extremely hard to follow. The ultimate goal of programming is **simplicity and maintainability**. When a principle stops reducing friction and starts adding it, the right move is to choose the simpler, more direct solution.
