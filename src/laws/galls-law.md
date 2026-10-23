---
title: Gall's Law
description: "A fundamental law of system design: complex working systems invariably evolve from simple working systems."
icon: TreeDeciduous
---

# Gall's Law

<CoverImage src="/covers/laws/galls-law.webp" alt="Gall's Law">
  <h1>Gall's Law</h1>
  <p>A tiny white robot watering a small sapling that has grown into a healthy tree behind it, while beside it a giant tree assembled from scratch out of metal parts lies toppled over.</p>
</CoverImage>

> "A complex system that works is invariably found to have evolved from a simple system that worked. A complex system designed from scratch never works and cannot be patched up to make it work. You have to start over, beginning with a working simple system." — John Gall (*Systemantics*, 1975)

**Gall's Law** is one of the most profound truths in software architecture, systems engineering, and cybernetics. It asserts that complexity cannot be successfully manufactured from scratch; rather, it must emerge organically from a stable, simple foundation that has already been verified in the real world.

---

## 1. The Author Behind the Law: John Gall

**John Gall** (September 18, 1925 – December 15, 2014) was a distinguished American pediatrician, author, and systems scholar. A Fellow of the American Academy of Pediatrics, Gall practiced medicine for over 40 years while teaching clinical pediatrics at the University of Michigan.

```
                   JOHN GALL'S SYSTEMANTICS CHRONOLOGY:
  ┌───────────────────────┐     ┌────────────────────────┐     ┌───────────────────────┐
  │  General Systemantics │────►│   Systemantics (2nd Ed)├────►│   The Systems Bible   │
  │   (1975 Debut Essay)  │     │  (1986 Underground Lore)│     │  (2002 Definitive Ed) │
  └───────────────────────┘     └────────────────────────┘     └───────────────────────┘
```

Alongside his medical career, Gall conducted extensive research into the behavioral, organizational, and structural causes of **systems failures**. He cataloged real-world systemic anomalies across government agencies, medical institutions, and industrial projects, compiling them into a series of humorous yet deeply analytical guidelines. 

These studies were published across three main editions:
1. *General Systemantics* (1975), later republished as *Systemantics: How Systems Work and Especially How They Fail*.
2. *Systemantics: The Underground Text of Systems Lore* (1986), which nearly doubled the size of the original text.
3. *The Systems Bible* (2002), the definitive modern compilation of his systems theories.

Gall's insights went on to deeply influence legendary systems thinkers, including cognitive scientists Mario Bunge and Paul Watzlawick, organization theorist Russell Ackoff, database pioneer Ken Orr, and Object-Oriented Design pioneer **Grady Booch**, who has frequently quoted Gall's Law since 1991 to guide modern software engineering practices.

---

## 2. Deep Dive: Underspecification and Evolutionary Systems

A common failure mode in software design is **over-specification**—trying to map out every class, microservice boundary, database index, and caching route before a single line of code is written. 

Gall's Law argues heavily in favor of **underspecification**: keeping initial parameters broad, simple, and adaptive, allowing the system to grow in response to real-world demands.

```
                          EVOLUTIONARY ARCHITECTURE:
    [1. Start Simple]         [2. Verify Stability]       [3. Add Complexity]
     ┌─────────────┐             ┌─────────────┐             ┌─────────────┐
     │ Simple Monolith  ├────────────►│  Production  ├────────────►│ Add Caching &│
     │   (Working) │             │  Validation │             │ Microservices│
     └─────────────┘             └─────────────┘             └─────────────┘
```

> [!IMPORTANT]
> A critical, frequently overlooked qualifier precedes Gall's Law in *Systemantics* (p. 70):
> **"A simple system may or may not work."**
> Simplicity does not guarantee success. However, if a simple system fails, it can be easily debugged, rewritten, or thrown away. If a complex, designed-from-scratch system fails, it represents a catastrophic loss of capital and effort.

---

## 3. Real-World Case Studies

### A. The Successes: HTML/HTTP and the Blogosphere
* **The World Wide Web**: The internet did not start as a highly complex, multi-tiered enterprise application catalog. It began with two incredibly simple protocols: **HTTP** (a basic text-request scheme) and **HTML** (a simple document-linking markup). Because these simple foundations worked flawlessly, developers organically layered on CSS, JavaScript, Web APIs, and micro-frontends, evolving the web into the massively complex global ecosystem we rely on today.
* **The Blogosphere**: The global network of self-publishing evolved rapidly from a highly basic XML-based syndication feed called **RSS**. The simplicity of RSS allowed millions of distinct servers to syndicate data, creating an organic, complex publishing web.

### B. The Failures: CORBA and "Designed from Scratch" Middleware
* **CORBA (Common Object Request Broker Architecture)**: In the 1990s, a committee designed CORBA to be the ultimate, all-encompassing system for distributed object communication. They wrote massive, complex, and rigid specifications from scratch before building running examples. The result was an incredibly bloated, hard-to-use middleware that suffered from endless interoperability bugs and eventually collapsed under its own weight, replaced by simpler REST and JSON protocols.

---

## 4. Affinities with Agile and Extreme Programming (XP)

Gall’s Law is the philosophical backbone of **Agile Software Development** and **Extreme Programming (XP)**. It validates several key developer methodologies:

* **"Do the Simplest Thing That Could Possibly Work" (XP)**: Rather than designing for future possibilities, implement the absolute simplest layout that resolves the immediate user story. 
* **YAGNI (You Aren't Gonna Need It)**: Do not write code or add architectural layers based on future assumptions. Wait until real bottlenecks appear.
* **Continuous Delivery**: Deploying small, working features to production continuously ensures you are always building on a *working*, verified base, rather than compiling months of untested code in isolation.

---

## 5. Architectural Guidelines for Developers

* **Start with a Pragmatic Monolith**: When starting a new business product, resist the urge to deploy dozens of serverless microservices on Kubernetes. Build a clean, modular monolith first.
* **Polymorphic Refactoring**: Let your class architectures emerge naturally. Write clean procedural or simple inline code first, and only extract interfaces or abstract classes when duplicate behaviors make them necessary.
* **Opportunistic Splitting**: Only extract microservices or introduce complex setups (like CQRS, database sharding, or multi-tiered caching) when your simple, working monolith begins to experience physical database or operational constraints.
