---
title: The Power of 10 Safety Rules
description: "A complete guide to Gerard J. Holzmann's rules for safety-critical systems, MISRA C compliance, and the NASA study of the Toyota electronic throttle firmware."
icon: Shield
cardPrompt: "A clipboard with ten checkboxes ticked, a small rocket beside it and a label \"SAFETY RULES\"."
---

# The Power of 10 Safety Rules

<CoverImage src="/covers/laws/power-of-10.webp" alt="The Power of 10">
  <h1>The Power of 10</h1>
  <p>A tiny white robot astronaut working through a pre-flight checklist of ten glowing items beside a small rocket on its launch pad.</p>
</CoverImage>

> "Rules are like guardrails on a mountain road; they keep you on track when things get slippery." — Gerard J. Holzmann

**The Power of 10 Rules** was created in 2006 by **Gerard J. Holzmann** of the **NASA/JPL Laboratory for Reliable Software**. The rules are specifically intended to eliminate certain C coding practices that make code difficult to review, test, or statically analyze. They are designed to guarantee absolute predictability in **safety-critical** software (such as spacecraft flight controls, medical life-support systems, or automotive throttle controllers).

These ten rules serve as a complement to the **MISRA C** guidelines and have been formally incorporated into the greater set of **JPL (Jet Propulsion Laboratory) coding standards**.

---

## 1. The Ten Rules of Safety-Critical Coding

```
                           THE JPL POWER OF 10 MAP:
   ┌────────────────────────────────────────────────────────────────────────┐
   │                          PREDICTABLE SYSTEM LOGIC                      │
   ├──────────────────────────┬─────────────────────────────────────────────┤
   │      CONTROL FLOW        │ 1. Only simple flow (no recursion, no goto) │
   │                          │ 2. Fixed upper bound on all loops           │
   ├──────────────────────────┼─────────────────────────────────────────────┤
   │    RESOURCE SECURITY     │ 3. No dynamic memory after initialization   │
   │                          │ 4. Functions ≤ 60 lines (one printed page)  │
   ├──────────────────────────┼─────────────────────────────────────────────┤
   │     STATE INTEGRITY      │ 5. Assertion density ≥ 2 per function       │
   │                          │ 6. Smallest possible variable scope         │
   │                          │ 7. Check all returns & validate inputs      │
   ├──────────────────────────┼─────────────────────────────────────────────┤
   │    COMPILER & POINTERS   │ 8. Minimal preprocessor, complete macros    │
   │                          │ 9. Max one pointer dereference, no fp       │
   │                          │ 10. Compile day one with pedantic warnings │
   └──────────────────────────┴─────────────────────────────────────────────┘
```

### Rule 1: Very Simple Control Flow
* **Rule**: Restrict all code to very simple control flow constructs—**do not use goto statements, setjmp or longjmp constructs, or direct or indirect recursion**.
* **Rationale**: Simple control flow makes static analysis straightforward, ensures execution paths are easily readable, and mathematically prevents stack overflow vulnerabilities caused by infinite recursion.

### Rule 2: Fixed Loop Upper Bounds
* **Rule**: **Give all loops a fixed upper bound**. It must be trivially possible for a checking tool to prove statically that the loop cannot exceed a preset upper bound on the number of iterations. If a tool cannot prove the loop bound statically, the rule is considered violated.
* **Rationale**: This guarantees that all code is guaranteed to terminate, preventing infinite loops and ensuring real-time systems meet their strict timing parameters.

### Rule 3: No Dynamic Memory Allocation After Initialization
* **Rule**: **Do not use dynamic memory allocation after initialization**.
* **Rationale**: Dynamic memory allocation (e.g., using `malloc()`, `free()`, or C++ `new`/`delete` at runtime) introduces memory leaks, memory fragmentation, dangling pointers, and non-deterministic behavior. All memory needed by the application must be statically pre-allocated during initialization.

### Rule 4: Small and Focused Functions
* **Rule**: **No function should be longer than what can be printed on a single sheet of paper** in a standard format with one line per statement and one line per declaration. Typically, this means **no more than about 60 lines of code** per function.
* **Rationale**: Long functions obscure logic, hide side-effects, make debugging highly complex, and increase cognitive load. Each function should do one clear task that fits completely on a single sheet of paper.

### Rule 5: Minimally Two Assertions Per Function
* **Rule**: **The code's assertion density should average to minimally two assertions per function**. Assertions must be used to check for anomalous conditions that should never happen in real-life executions. Assertions must be side-effect free and defined as Boolean tests. When an assertion fails, an explicit recovery action must be taken (e.g., returning an error condition to the caller). Any assertion for which a static checking tool can prove that it can never fail or never hold violates this rule.
* **Rationale**: Assertions enforce strict boundary checks and prevent a program from entering "limp-mode" or hiding bugs (aligning with **Offensive Programming**). By insisting that assertions have recovery actions, systems can fail-safe gracefully.

### Rule 6: Minimal Scope of Data Objects
* **Rule**: **Declare all data objects at the smallest possible level of scope**.
* **Rationale**: Declaring variables in the narrowest possible scope prevents accidental modification from unrelated code, limits the lifetime of variables on the stack, and enforces clear data flow boundaries.

### Rule 7: Check All Returns and Parameters
* **Rule**: **Each calling function must check the return value of nonvoid functions, and each called function must check the validity of all parameters provided by the caller**.
* **Rationale**: This prevents "silent failures" where a failed operation goes unnoticed. If a function returns a value, the caller is legally obligated to inspect it and handle error cases.

### Rule 8: Limited Preprocessor Usage
* **Rule**: **The use of the preprocessor must be limited to the inclusion of header files and simple macro definitions**. Token pasting (`##`), variable argument lists (ellipses), and recursive macro calls are not allowed. All macros must expand into complete syntactic units. The use of conditional compilation directives must be kept to a minimum.
* **Rationale**: The C preprocessor operates before compilation and can hide dangerous syntax, create subtle bugs, and bypass standard compiler type-checking rules.

### Rule 9: Restricted Pointer Operations
* **Rule**: **The use of pointers must be restricted. Specifically, no more than one level of dereference should be used**. Pointer dereference operations may not be hidden in macro definitions or inside `typedef` declarations. Function pointers are not permitted.
* **Rationale**: Pointers are the most common source of fatal bugs in C programs. Nesting pointers (e.g., `**ptr`) dramatically complicates safety analysis. Function pointers bypass static code analyzers, making it impossible for automated tools to map the call graph of the system.

### Rule 10: Zero-Warning Compilation from Day One
* **Rule**: **All code must be compiled, from the first day of development, with all compiler warnings enabled at the most pedantic setting available. All code must compile without warnings. All code must also be checked daily with at least one, but preferably more than one, strong static source code analyzer and should pass all analyses with zero warnings**.
* **Rationale**: Ignoring warnings is the first step toward catastrophic failures. Warnings are code smells that indicate the compiler is making assumptions that may not match the developer's intent. Treating warnings as errors prevents bugs from leaking into production.

---

## 2. Real-World Impact: The Toyota Throttle Case Study

The power and utility of these rules were demonstrated during a federal investigation into **Toyota's Electronic Throttle Control System (ETCS)**. 

Following reports of unintended acceleration, NASA engineers conducted a deep, forensic analysis of Toyota's electronic throttle control firmware. In their official report, **the NASA team discovered at least 243 separate violations of the JPL Power of 10 safety rules** within the throttle control source code. 

The violations included heavy reliance on global variables, lack of input parameter validation, bypassed return value checks, and lack of adequate assertion checks. This case study remains a classic example of why safety-critical systems must strictly adhere to Holzmann's rules to prevent real-world catastrophes.
