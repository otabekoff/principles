---
title: Discoverability
description: "The degree to which a user or developer can easily locate and understand the features, interfaces, or capabilities of a system."
icon: Search
---

# Discoverability

> "Discoverability: the ability to discover what operations are possible and where and how to perform them." — Don Norman (*The Design of Everyday Things*)

**Discoverability** represents the ease with which users, developers, or external systems can locate, understand, and use the capabilities, interfaces, or features that a system provides. 

In software engineering, discoverability applies equally to **User Interface (UI/UX) Design** (how easily users find product features) and **API / Architecture Design** (how easily developer consumers discover endpoints, classes, and options).

---

## Crucial Distinctions

It is common to conflate discoverability with other design attributes, but they represent distinct stages of system interaction:

* **Discoverability**: Can they find that the feature exists in the first place?
* **Usability**: Can they easily operate the feature once they have found it?
* **Accessibility**: Can all users (including those using screen readers or assistive devices) perceive and interact with the feature?

> [!IMPORTANT]
> A feature can have perfect usability (intuitive buttons, instant response times, zero lag) but if it has zero discoverability, it is functionally non-existent to the consumer.

---

## Discoverability in API & Code Design

For software developers consuming an API, SDK, or class library, high discoverability dramatically reduces onboarding time and cognitive load:

### 1. Self-Documenting Code & Strong Typing
* Type-safe languages (like TypeScript, Rust, or Go) coupled with IDEs provide instant discoverability via **Autocomplete (IntelliSense)**. 
* By typing `user.` or `client.`, developers can instantly discover all available methods, properties, and parameters without leaving their editor.

### 2. Standardized Naming Conventions
* Using predictable, industry-standard names makes capabilities discoverable. For example, if a library uses `findById()` for database retrieval, developers will expect `updateById()` rather than `changeSpecificRecord()`.

### 3. REST & HATEOAS
* **Hypermedia As The Engine Of Application State (HATEOAS)** is a REST architectural constraint where the server returns hypermedia links along with data. This allows clients to dynamically *discover* subsequent API actions (e.g. "cancel", "refund", "ship") based on the current state of a resource.

---

## Discoverability in UI/UX Design

When building user-facing systems, design patterns exist to maximize feature discoverability without cluttering the screen:

1. **Progressive Disclosure**: Keep the primary interface clean and simple by showing only the most frequently used features. Hide advanced features behind nested settings, context menus, or "advanced" expanders, making them discoverable only when a user actively seeks them.
2. **Visual Affordances**: Buttons should look clickable, input fields should look writable, and scrollable containers should show slight offsets or scrollbars to signal that more content exists offscreen.
3. **The Gestural Void**: Mobile touchscreens suffer from low discoverability because gesture controls (pinching, swiping, double-tapping) have no physical visual affordance. To solve this, design interfaces with explicit visual cues (e.g. tutorial walkthroughs, small arrows, or pulsing tooltips).
