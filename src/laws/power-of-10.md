---
title: The Power of 10 Safety Rules
description: "Gerard J. Holzmann's ten strict rules for developing highly reliable, safety-critical software."
icon: Shield
---

# The Power of 10 Safety Rules

> "Rules are like guardrails on a mountain road; they keep you on track when things get slippery." — Gerard J. Holzmann

**The Power of 10** is a set of ten strict, highly formal rules developed by Gerard J. Holzmann of the NASA/JPL Laboratory for Reliable Software. These rules are designed to prevent bugs and ensure absolute predictability in **safety-critical** software (such as spacecraft control, medical devices, or flight systems).

---

## The Ten Rules of Safety-Critical Coding

While these rules might seem extremely restrictive for general web application development, understanding them offers fascinating insights into how to write highly predictable, bulletproof code.

1. **Avoid Complex Flow**: Avoid complex flow control; do not use `goto` statements, setjmp/longjmp, or direct recursion. Keep control flow simple and linear.
2. **Fixed Upper Bounds for Loops**: All loops must have a fixed, statically checkable upper bound. It must be impossible for a loop to run infinitely.
3. **No Dynamic Memory Allocation**: Do not use dynamic memory allocation (like `malloc`, `new`, or standard garbage collection) after initialization. All memory must be pre-allocated statically to prevent memory leaks and out-of-memory crashes.
4. **Limit Function Size**: No function should be longer than what can be printed on a single sheet of paper (typically about 60 lines of code).
5. **Low Assertion Density**: The code must have a low assertion density (around two assertions per function). Assertions are used to verify pre- and post-conditions of functions.
6. **Restrict Scope**: Declare data objects at the smallest possible level of scope. Avoid global variables entirely.
7. **Check All Return Values**: The return value of non-void functions must be checked by each calling function, and all parameter validations must be performed.
8. **Limit Preprocessor Use**: Limit the use of the preprocessor (macro definitions) to simple header inclusions and simple constant definitions.
9. **Restrict Pointer Usage**: Limit the use of pointers. Pointer dereferencing should not be nested deeper than one level, and function pointers are forbidden.
10. **Compile with All Warnings Enabled**: All code must be compiled with all warnings enabled, and must compile with zero warnings. Code must pass static analyzer checks daily.

---

## Pragmatic Takeaways for General Developers

For everyday applications (like SaaS apps or websites), we can adapt Holzmann's extreme safety rules into excellent, pragmatic standards:
- **Compile with Strict Linters**: Never ignore compiler warnings or ESLint errors. Treat them as blockers to deployment.
- **Keep Functions Small**: Keep functions focused and under 50 lines to maximize readability.
- **Check Your Returns**: Always check responses from API calls and database queries. Never assume the network or database will return a perfect response.
