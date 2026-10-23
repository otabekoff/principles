---
title: Event-Driven Architecture (EDA)
description: Build highly decoupled, reactive, and scalable systems using events, publishers, and subscribers.
icon: Zap
cardPrompt: "A bell labelled \"EVENT\" ringing with dashed arrows to three little houses, each reacting differently: a lamp, a window, an oven."
---

# Event-Driven Architecture (EDA)

<CoverImage src="/covers/architecture/event-driven-architecture.webp" alt="Event-Driven Architecture">
  <h1>Event-Driven Architecture</h1>
  <p>A tiny white robot ringing a large bell in a village square, and robots in the surrounding houses each reacting on their own: one opens a window, one lights a lamp, one starts baking.</p>
</CoverImage>

> **"An event-driven architecture is a software architecture pattern promoting the production, detection, consumption of, and reaction to events."**

In software architecture, **Event-Driven Architecture (EDA)** is a design paradigm where system components communicate by publishing and subscribing to **Events**. An event represents a significant state change that has occurred in the past (e.g., `OrderPlaced`, `UserRegistered`, `InvoicePaid`).

In traditional synchronous request-response architectures (like HTTP/REST or gRPC), services are tightly coupled: Service A calls Service B directly and must block its execution thread waiting for Service B to respond. In an Event-Driven Architecture, **Service A simply publishes an event to an broker, completely unaware of who (if anyone) will consume it.** This creates a highly decoupled, asynchronous, and reactive ecosystem.

---

## Synchronous Request-Response vs. Asynchronous Events

```
   SYNCHRONOUS REQUEST-RESPONSE (Tight Coupling / Blocking):
   ┌──────────────┐                  ┌──────────────┐
   │ OrderService │─────────────────▶│ EmailService │  ◀── [If EmailService is down,
   │  (Blocks)    │  (Direct Call)  │  (Down?)     │       OrderService fails!]
   └──────────────┘                  └──────────────┘
   
   ASYNCHRONOUS EVENT-DRIVEN (Loose Coupling / Non-Blocking):
   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
   │ OrderService │────▶│ Event Broker │────▶│ EmailService │  ◀── [EmailService can be
   │ (Non-Blocking)     │ (Kafka/Rabbit)     │ (Reads event)│       down; message waits
   └──────────────┘     └──────────────┘     └──────────────┘       safely in broker!]
```

---

## Core Principles of EDA

### 1. Events as Immutable Facts
An event is a statement of historical fact. Because the past cannot be altered, **events are strictly immutable**. Once an event is published to a broker (like Apache Kafka, RabbitMQ, or AWS EventBridge), it can never be modified or deleted, only consumed.

```ts
// Good: Event names use past-tense verbs representing historical facts
interface OrderPlacedEvent {
  eventId: string;
  timestamp: string;
  orderId: string;
  customerId: string;
  totalAmount: number;
}
```

### 2. Publish-Subscribe (Pub/Sub) Decoupling
The publisher has no knowledge of the subscribers. This supports the [Open-Closed Principle (OCP)](/solid/ocp): you can add entirely new services to the system (e.g., a real-time analytics engine or a fraud detector) that listen to the `OrderPlaced` event without modifying a single line of code in the `OrderService`.

### 3. Asynchronous Execution and Resilience
If the `EmailService` crashes, the `OrderService` continues to process purchases perfectly. The events accumulate safely in the broker's message queue. Once the `EmailService` comes back online, it reads the backlog of events and catches up, resulting in zero data loss.

---

## Common Topologies in Event-Driven Systems

Event-driven communication is typically structured in one of two ways:

```
                            EVENT ARCHITECTURE TOPOLOGIES:
   ┌───────────────────────────────────┬──────────────────────────────────┐
   │       A. EVENT MEDIATION          │       B. EVENT CHOREOGRAPHY      │
   ├───────────────────────────────────┼──────────────────────────────────┤
   │ A central orchestrator controls   │ Services interact organically    │
   │ the workflow step-by-step.        │ without a single coordinator.    │
   │                                   │                                  │
   │ * Best for complex sagas.         │ * Best for simple, decoupled flows.│
   └───────────────────────────────────┴──────────────────────────────────┘
```

### A. Choreography (Reactive Flow)
In a choreographed workflow, services act independently and react organically to events:
1. `OrderService` publishes `OrderPlaced`.
2. `PaymentService` hears `OrderPlaced`, charges the credit card, and publishes `PaymentAuthorized`.
3. `InventoryService` hears `PaymentAuthorized`, reserves stock, and publishes `StockReserved`.
4. `ShippingService` hears `StockReserved` and schedules delivery.

### B. Orchestration (Mediator Flow)
In an orchestrated workflow, a central mediator service coordinates the sequence:
1. `OrderPlacedWorkflowManager` (Saga Orchestrator) listens to `OrderPlaced`.
2. It explicitly commands `PaymentService` to charge.
3. Upon receiving payment confirmation, it commands `InventoryService` to reserve stock.
4. If payment fails, the orchestrator handles compensating transactions (e.g., rolling back the order).

---

## Architectural Challenges & Mitigations

### 1. The Dual-Write Problem
A common pitfall occurs when a service must write to its local database and publish an event to a broker:

```ts
// VIOLATION: If database write succeeds but broker call fails,
// the system enters an inconsistent, split-brain state!
async function placeOrder(order) {
  await db.save(order);
  await eventBroker.publish("OrderPlaced", order); // If this crashes, system breaks!
}
```

**The Solution: Outbox Pattern**
Instead of writing to two systems directly, write both the `order` and the `OrderPlacedEvent` to the same database inside a single, atomic **transaction**. A separate background process (a Change Data Capture tool or an outbox publisher) polls the database table and publishes the events to the broker reliably.

```ts
// CONFORMING: Atomic database transaction writes both records together
async function placeOrder(order) {
  await db.transaction(async (tx) => {
    await tx.orders.save(order);
    await tx.outbox.save({ eventType: "OrderPlaced", payload: order });
  });
}
```

### 2. Eventual Consistency
Because events are processed asynchronously, the entire system is not instantly updated. When a user changes their username, it may take several seconds for the change to propagate to the `Billing` and `Search` microservices.
* **Mitigation**: Design the user interface to expect asynchronous delays (e.g., using optimistic UI updates or displaying loading states).

### 3. Idempotency
Due to network failures, brokers may deliver the same event more than once ("at-least-once delivery"). Consumers must be **idempotent**: processing the same event multiple times must yield the exact same result as processing it once.
* **Mitigation**: Track processed event IDs in a deduplication database table.
  ```sql
  CREATE TABLE processed_events (
    event_id VARCHAR(50) PRIMARY KEY,
    processed_at TIMESTAMP DEFAULT NOW()
  );
  ```

---

## Summary of EDA Trade-offs

| Advantages | Disadvantages |
| :--- | :--- |
| Extreme low-coupling between microservices. | Higher system complexity and debugging friction. |
| High horizontal scalability and performance. | Tracing workflows across services is difficult. |
| Resistant to service failures and network outages. | Risk of duplicate deliveries and out-of-order processing. |

---

## Resources & Deep Dive

* [Event-Driven Architecture on Martin Fowler's Blog](https://martinfowler.com/articles/201701-event-driven.html)
* [Enterprise Integration Patterns by Gregor Hohpe](https://www.enterpriseintegrationpatterns.com/)
* [Designing Data-Intensive Applications by Martin Kleppmann](https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/)
