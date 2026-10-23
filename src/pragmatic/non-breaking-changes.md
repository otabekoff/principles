---
title: Make Non-Breaking Changes
description: Avoid the mud of endless refactoring by making incremental, non-breaking modifications.
icon: FastForward
---

# Make Non-Breaking Changes

<CoverImage src="/covers/pragmatic/non-breaking-changes.webp" alt="Non-Breaking Changes">
  <h1>Non-Breaking Changes</h1>
  <p>A tiny white robot crew building a new modern bridge right beside an old one, little cars still flowing over the old bridge until the new one is ready to open.</p>
</CoverImage>

> "Keep the engine running while you swap the parts."

When a component, interface, or database schema needs to change, developers often make the mistake of performing a **breaking change** immediately. They modify the signature and then spend hours or days fixing compiler errors across a hundred calling files. This stalls feature development and creates major merge conflicts.

The principle of **Making Non-Breaking Changes** suggests that you should introduce new functionality alongside the old, mark the old code as deprecated, and phase it out gradually.

## The Core Concept

Instead of rewriting an active component and breaking all callers, follow this migration strategy:

1. **Keep the old functionality working exactly as before.**
2. **Mark the old code as `@deprecated`.** Modern IDEs (like VS Code) will display the deprecated code with a clear visual strikethrough, warning developers not to use it.
3. **Implement the new functionality** (e.g., `MyWidget2` or a new set of props).
4. **Gradually migrate callers** as you work on other tasks.
5. **Delete the deprecated code** once all references are gone.

This avoids the endless mud of running massive "refactor pull requests" that block releases.

### Code Smell: The Aggressive Breaking Change

Imagine renaming props in a shared user avatar component:

```ts
// ❌ Breaking Change
// Old prop was 'url'. You change it to 'imageUrl' directly:
interface AvatarProps {
  imageUrl: string; // Immediately breaks 200 components calling <Avatar url="..." />!
}
```

Now, the entire build is broken, and you must update all 200 callers before you can push your changes.

### The Solution: Gradual Deprecation

Instead, keep `url` as an optional deprecated prop and introduce the new prop alongside it:

```tsx
//  Non-Breaking Change
interface AvatarProps {
  /** @deprecated Use imageUrl instead */
  url?: string;
  imageUrl?: string;
}

export function Avatar({ url, imageUrl }: AvatarProps) {
  const src = imageUrl ?? url; // Backward compatible!
  return <img src={src} alt="User Avatar" />;
}
```

Now, your build remains 100% green. VS Code will highlight `<Avatar url="..." />` calls with a strikethrough, prompting developers to update them at their own pace. 

This gradual approach might mean that over time you have `MyWidget1` (deprecated), `MyWidget2` (deprecated), and `MyWidget3` (current) living in your project simultaneously. **This is absolutely fine.** You can periodically scan the codebase to see which deprecated components or props are still in use, and go through and safely delete them once their active references hit zero. 

While you might worry that this leaves the codebase temporarily messy, the alternative is forever running in the mud of massive, stalled "refactor sprints" that block deployment.

## Benefits

- **Continuous Integration**: The main branch is never broken due to unfinished refactoring.
- **Micro-tasks**: Refactoring can be split into small, low-risk pull requests.
- **Velocity**: Developers are not blocked by breaking changes made by other teams.
