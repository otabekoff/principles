---
title: Future Developers Will Copy You
description: Setting a high standard because future maintainers will mimic the patterns they see in the codebase.
icon: Copy
---

# Future Developers Will Copy You

> "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live." — John Woods

One of the most powerful sociological truths in software development is this: **"Future developers (including yourself in six months) are going to copy what they see here."**

When developers enter an unfamiliar codebase, they do not read architectural design documents. Instead, they look at existing files to see "how things are done around here," copy that pattern, and adapt it for their own feature.

## The Core Concept

Because copy-paste is the default learning mechanism for developers:
- **If you write clean, well-tested, beautifully structured code**: That pattern will propagate across the codebase.
- **If you write a hacky, untested, single-letter-variable hotfix**: That exact hack will be duplicated 10 times by developers assuming "it's the approved way to do it."

Every file you commit acts as a template for future work. You are not just writing code; you are **setting the cultural standard** for the project.

### The Rule of the Hack: The Big Warning Comment

Sometimes, due to severe deadlines or external constraints, you *must* write hacky, less-than-ideal code. If you do this without explanation, others will assume it is a best practice and copy it.

If you must write a hack, you **must** call it out with a prominent comment explaining:
1. Why this hack was necessary.
2. Why future developers should **not** copy it.
3. How it should be solved properly when time permits.

```ts
// ❌ Dangerous Hack without warning
function fetchUserToken() {
  return window.__secret_token; 
}
// Future developers will see this and start reading random properties off the window object!
```

```ts
//  Pragmatic Hack with clear warning
function fetchUserToken() {
  // ⚠️ HACK: We are reading from the window object temporarily because
  // our OAuth context provider is undergoing a major migration.
  // DO NOT COPY THIS PATTERN. If you need authentication details,
  // use the `useAuthContext()` hook instead.
  // TODO: Remove this once OAuth migration is complete (Ref: JIRA-402)
  return window.__secret_token;
}
```

## Summary of Actionable Steps

1. **Think of the Example You Are Setting**: Before submitting a PR, ask yourself: *"Would I be happy if the entire codebase was written using this exact pattern?"*
2. **At Least Write One Test**: Even for simple components, write at least one test. It sets up the testing configuration and boilerplates, making it 90% easier for the next developer to add more tests instead of skipping them.
3. **Guard Your Core Architectures**: Keep core patterns extremely clean, because once bad patterns start being copied, purging them requires monumental effort.
