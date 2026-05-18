---
title: Strangler Fig Pattern
description: Incrementally migrate a legacy system by replacing old endpoints one by one with a modern codebase.
icon: GitFork
---

# Strangler Fig Pattern

> **"One of the natural wonders of Australia are the strangler figs. They seed in the upper branches of a tree and gradually work their way down the tree until they root in the soil. Over many years they grow into fantastic and beautiful shapes, meanwhile strangling and killing the original tree in the process."** — *Martin Fowler (2004)*

The **Strangler Fig Pattern** (originally termed the "Strangler Application Pattern") is a software architecture pattern used for migrating legacy systems. It describes a strategy where **a legacy system is incrementally replaced by a new system by wrapping the old system in a modern interface and routing traffic away from it piece by piece.**

Instead of executing a highly risky **"Big Bang" rewrite**—where you spend months or years rebuilding the entire application from scratch and attempt to swap it out in a single night—the Strangler Fig Pattern allows you to deploy the new system alongside the legacy system starting on day one. You migrate specific features or endpoints slowly, keeping both systems running concurrently until the legacy system has been completely phased out.

---

## The Strangler Fig Migration Timeline

```
   PHASE 1 (Interception & Gateway):
   ┌────────────────────────────────────────────────────────┐
   │                       API Gateway                      │
   │           Routes all traffic to Legacy System          │
   └───────────────────────────┬────────────────────────────┘
                               ├───────────────────────────┐
                               ▼                           ▼
                     ┌───────────────────┐       ┌───────────────────┐
                     │   Legacy System   │       │    New System     │
                     │  (Handles 100%)   │       │    (Readying)     │
                     └───────────────────┘       └───────────────────┘

   PHASE 2 (Incremental Replacement):
   ┌────────────────────────────────────────────────────────┐
   │                       API Gateway                      │
   │       Routes /billing to New, /users to Legacy         │
   └───────────────────────────┬────────────────────────────┘
                               ├───────────────────────────┐
                               ▼                           ▼
                     ┌───────────────────┐       ┌───────────────────┐
                     │   Legacy System   │       │    New System     │
                     │   (Handles /users)│       │ (Handles /billing)│
                     └───────────────────┘       └───────────────────┘

   PHASE 3 (Complete Strangulation):
   ┌────────────────────────────────────────────────────────┐
   │                       API Gateway                      │
   │          Routes 100% of traffic to New System          │
   └───────────────────────────────────┬────────────────────┘
                                       ▼
                                 ┌───────────────────┐
                                 │    New System     │  ◀── [Legacy System can
                                 │   (Handles 100%)  │       now be shut down!]
                                 └───────────────────┘
```

---

## Core Steps for Implementing the Pattern

To successfully strangle a legacy application, follow these four distinct steps:

### 1. Place an Intermediary (API Gateway / Router)
Before making any changes to the code, place an API Gateway, Reverse Proxy (such as Nginx, Traefik, or AWS CloudFront), or Router in front of your legacy system. Originally, all client requests are routed through this gateway directly to the legacy app.
* **The Goal**: Clients remain completely unaware of where their requests are being served. The gateway abstracts the server architecture entirely.

### 2. Build the New Service
Create a clean, modern codebase (often a microservice or serverless API) and build the replacement for a single, well-defined slice of the application (e.g., the `/users` endpoint).

### 3. Redirect Traffic (Strangling)
Update your API Gateway configuration to intercept requests to `/users` and route them to the new service, while continuing to send all other requests to the legacy application.

```nginx
# Nginx Router Configuration conforming to Strangler Fig
server {
    listen 80;
    server_name api.app.com;

    # 1. New Service intercepting migrated endpoint
    location /users {
        proxy_pass http://new-microservice-cluster;
    }

    # 2. Default route serving legacy monolith
    location / {
        proxy_pass http://legacy-monolith-server;
    }
}
```

### 4. Deprecate and Clean Up
Once the new `/users` endpoint has been running in production for a few weeks with zero bugs, delete the legacy code associated with that endpoint from the old monolith codebase. Repeat the process for the next slice (e.g., `/billing`, `/orders`) until the legacy system is completely empty and can be safely turned off.

---

## Architectural Challenges

### A. Sharing Databases (The Integration Database Trap)
Often, both the legacy system and the new system need to read and write the same data. If both systems connect directly to the same database, they become tightly coupled, violating the [Single Source of Truth](/general/single-source-of-truth) and microservice boundaries.

* **Mitigation (The Event Synchronization Pattern)**:
  * Force the new system to write to its own isolated database.
  * Use [Event-Driven Architecture](/architecture/event-driven-architecture) or CDC (Change Data Capture) to synchronize changes back to the legacy database asynchronously. This keeps the data in sync without coupling the codebases.

### B. Session Management and Auth
During a strangler migration, users will hop back and forth between the legacy and new systems as they navigate the app. If the systems manage sessions differently, the user will be constantly logged out.

* **Mitigation**: Standardize on a unified, stateless token-based authentication system (like JWTs or OAuth2) at the API Gateway level. The gateway validates the token and passes user metadata headers (`X-User-ID`, `X-User-Roles`) down to both the legacy and new systems.

---

## Why Big-Bang Rewrites Almost Always Fail

| Big-Bang Rewrite | Strangler Fig Pattern |
| :--- | :--- |
| **High Risk**: Years of work deployed on a single day; rollback is incredibly difficult. | **Low Risk**: Small, incremental deployments; easy to roll back a single endpoint in seconds. |
| **Feature Freeze**: Legacy system must be frozen for months to prevent the rewrite from falling behind. | **Continuous Evolution**: You can add new features directly to the new codebase while maintaining old ones. |
| **Invisible Progress**: Stakeholders see no value or delivery for months or years. | **Immediate Value**: Stakeholders see modern, fast endpoints deployed to production within weeks. |

---

## Resources & Deep Dive

* [Strangler Fig Application on Martin Fowler's Blog](https://martinfowler.com/bliki/StranglerFigApplication.html)
* [Legacy System Migration Patterns by Microsoft Azure](https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig)
* [Refactoring to Microservices by Sam Newman](https://samnewman.io/books/monolith-to-microservice/)
