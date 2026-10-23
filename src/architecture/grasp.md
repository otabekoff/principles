---
title: GRASP (General Responsibility Assignment Software Patterns)
description: A complete architectural guide to the nine fundamental principles of GRASP for object-oriented responsibility assignment.
icon: Zap
cardPrompt: "A hard hat and a rolled blueprint being handed from one robot hand to another."
---

# GRASP (General Responsibility Assignment Software Patterns)

<CoverImage src="/covers/architecture/grasp.webp" alt="GRASP">
  <h1>GRASP</h1>
  <p>A tiny white robot foreman on a construction site handing each task to the teammate robot that already holds the right tools and plans for it.</p>
</CoverImage>

> "The critical design tool for software development is a mind well educated in design principles. It is not UML or any other technology." — Craig Larman, *Applying UML and Patterns*

**GRASP** is an acronym for **General Responsibility Assignment Software Patterns (or Principles)**. First published by computer scientist **Craig Larman** in his seminal 1997 book *Applying UML and Patterns*, GRASP is a unified mental framework of nine core principles designed to guide software engineers in a fundamental task: **assigning responsibilities to classes and objects.**

Unlike the Gang of Four (GoF) design patterns, which provide concrete structural architectures (like the Decorator or Command patterns), GRASP patterns are **evaluative mental guidelines**. They help developers resolve the single most critical day-to-day coding question: **"Where should this method, variable, or responsibility live?"**

---

## The Nine GRASP Patterns

```
                                ┌────────────────────────┐
                                │   THE 9 GRASP PATTERNS  │
                                └───────────┬────────────┘
                                            │
         ┌──────────────────────────────────┼──────────────────────────────────┐
         ▼                                  ▼                                  ▼
 ┌───────────────┐                  ┌───────────────┐                  ┌───────────────┐
 │  FOUNDATIONAL │                  │  EVALUATIVE   │                  │  ARCHITECTURAL│
 ├───────────────┤                  ├───────────────┤                  ├───────────────┤
 │ 1. Info Expert│                  │ 4. LowCoupling│                  │ 7. Polymorph. │
 │ 2. Creator    │                  │ 5. HighCohes. │                  │ 8. Prot. Var. │
 │ 3. Controller │                  │               │                  │ 9. Indirection│
 └───────────────┘                  └───────────────┘                  └───────────────┘
```

---

## 1. Information Expert (The Expert Principle)

* **Problem**: What is the most basic principle by which to assign responsibilities to objects?
* **Solution**: Assign a responsibility to the class that contains the **information** needed to fulfill it.

### Core Philosophy
To determine where a method or computed field belongs, identify what data is required, locate the object that stores that data, and place the responsibility directly on that object. This ensures data encapsulation and limits unnecessary getters and setters.

### ❌ Violation: Anemic Data Pulling
An external printer service pulls all line items, reads their individual prices and taxes, and calculates the total. The `Order` object is treated as a dumb data bag:

```ts
class SalesLineItem {
  constructor(public price: number, public quantity: number) {}
}

class Order {
  public items: SalesLineItem[] = [];
}

// Client pulling data out (Feature Envy)
class OrderBillingService {
  calculateTotal(order: Order): number {
    let total = 0;
    for (const item of order.items) {
      total += item.price * item.quantity; // Service does all the work!
    }
    return total;
  }
}
```

### 🌟 Adherence: The Information Expert Decides
The calculation is delegated down. `SalesLineItem` calculates its own subtotal; `Order` sums the subtotals because it owns the item array:

```ts
class SalesLineItem {
  constructor(private price: number, private quantity: number) {}

  getSubtotal(): number {
    return this.price * this.quantity; // Information Expert on item calculations
  }
}

class Order {
  private items: SalesLineItem[] = [];

  getTotal(): number {
    // Information Expert: Order owns the array of items, so it computes the total
    return this.items.reduce((sum, item) => sum + item.getSubtotal(), 0);
  }
}
```

---

## 2. Creator

* **Problem**: Who should be responsible for instantiating a new instance of Class `A`?
* **Solution**: Assign class `B` the responsibility to create instances of `A` if one (or preferably more) of the following apply:
  * Instances of `B` contain or compositely aggregate instances of `A`.
  * Instances of `B` record instances of `A`.
  * Instances of `B` closely use instances of `A`.
  * Instances of `B` have the initializing information for `A` and pass it on creation.

### Core Philosophy
By restricting object creation to classes that naturally hold or manage the created instances, you prevent the rest of the application from coupling directly to concrete subclasses, maintaining a clean dependency graph.

### 🌟 Code Example: Order as the Creator of OrderItems

```ts
class OrderItem {
  constructor(public productId: string, public quantity: number) {}
}

class Order {
  private items: OrderItem[] = [];

  // Order aggregates and records OrderItem. It acts as the Creator!
  addItem(productId: string, quantity: number): void {
    const newItem = new OrderItem(productId, quantity); // Internal instantiation
    this.items.push(newItem);
  }
}
```

---

## 3. Controller

* **Problem**: Who should be responsible for handling an input system event?
* **Solution**: Assign the responsibility of dealing with system events to a non-UI class that represents the overall system (Facade Controller) or a specific use-case scenario (Use-Case Controller).

### Core Philosophy
The controller is the very first object beyond the UI boundary that receives and coordinates system operations. It acts as a gatekeeper: it **coordinates and delegates work** to the domain layer, but does not perform heavy business logic itself.

### 🌟 Code Example: Use-Case Controller

```ts
// The Controller coordinates but delegates all database and hashing logic
class RegistrationController {
  constructor(
    private userService: UserService,
    private emailValidator: EmailValidator
  ) {}

  // Handles input event
  async handleUserSignup(request: SignupRequest): Promise<Response> {
    if (!this.emailValidator.isValid(request.email)) {
      return Response.error("Invalid email.");
    }
    
    // Delegates coordinate execution to Domain Services
    const user = await this.userService.register(request.email, request.password);
    return Response.success(user.id);
  }
}
```

---

## 4. Low Coupling

* **Problem**: How to support lower dependency between classes, lower change impact, and higher reuse potential?
* **Solution**: Assign responsibilities so that coupling (dependencies) remains as low as possible.

### Core Philosophy
Low Coupling is an **evaluative pattern**. Every time you assign a responsibility to an object, evaluate how many other objects it must now depend on. A class that is coupled to dozens of others is brittle: a change to any dependency ripples through and breaks the coupled class.

---

## 5. High Cohesion

* **Problem**: How to keep objects appropriately focused, manageable, understandable, and supportive of Low Coupling?
* **Solution**: Assign responsibilities so that the responsibilities of a class are strongly related and highly focused.

### Core Philosophy
Like Low Coupling, High Cohesion is an **evaluative pattern**. A class with low cohesion performs many unrelated tasks (e.g. printing reports, calculating taxes, and querying databases). It is hard to comprehend, test, and reuse. High Cohesion keeps a class focused on doing one job exceptionally well (closely aligned with the Single Responsibility Principle).

---

## 6. Polymorphism

* **Problem**: How to handle alternatives or variant behaviors based on type? How to create pluggable components?
* **Solution**: When related behaviors vary by type (class), assign responsibility for the behavior—using polymorphic operations—to the types for which the behavior varies.

### Core Philosophy
Avoid explicit type-checking, `switch` blocks, or `if-else` branching on type enums in your client code. Instead, declare an interface or abstract base class and let subclasses implement their own distinct behaviors.

### ❌ Violation: The Switch-Smell
Checking types manually requires updating the client code every time a new alternative is added:

```ts
class PaymentProcessor {
  processPayment(type: "Stripe" | "PayPal", amount: number) {
    if (type === "Stripe") {
      // Stripe specific API call
    } else if (type === "PayPal") {
      // PayPal specific SDK call
    }
  }
}
```

### 🌟 Adherence: Polymorphic Dispatch

```ts
interface PaymentGateway {
  charge(amount: number): void;
}

class StripeGateway implements PaymentGateway {
  charge(amount: number) { /* Stripe API call */ }
}

class PayPalGateway implements PaymentGateway {
  charge(amount: number) { /* PayPal SDK call */ }
}

// Client is completely clean and pluggable
class CheckoutService {
  process(gateway: PaymentGateway, amount: number) {
    gateway.charge(amount); // Polymorphic execution!
  }
}
```

---

## 7. Protected Variations

* **Problem**: How to design systems so that instability or variations in elements do not have an undesirable impact on other components?
* **Solution**: Identify points of predicted variation or instability; assign responsibilities to create a **stable interface** around them.

### Core Philosophy
Protected Variations is the conceptual basis for the **Open/Closed Principle (OCP)**. By wrapping volatile implementation points (such as third-party APIs, database systems, or hardware devices) behind an interface, you "protect" the rest of the application from breaking when those volatile systems change.

---

## 8. Indirection

* **Problem**: Where to assign responsibility to avoid direct coupling between two or more components?
* **Solution**: Assign the responsibility to an intermediate object to mediate between the components.

### Core Philosophy
Direct coupling between components restricts their reuse. Introducing an intermediary—such as a controller, proxy, adapter, or event mediator—breaks this direct dependency, allowing them to remain decoupled and highly reusable.

```
  ┌────────────────────────────────────────────────────────┐
  │                 INDIRECTED RELATIONSHIP                │
  ├────────────────────────────────────────────────────────┤
  │   [Component A]  ───►  [Mediator/Adapter]  ───►  [Component B]  │
  └────────────────────────────────────────────────────────┘
```

---

## 9. Pure Fabrication

* **Problem**: What if the solution presented by *Information Expert* violates *Low Coupling* or *High Cohesion*?
* **Solution**: Assign a highly cohesive set of responsibilities to a **fabricated class** that does not represent a concept in the business problem domain, solely to achieve low coupling and high cohesion.

### Core Philosophy
If you strictly follow the *Information Expert* principle, you might bloat a business domain entity (like `User`) with technical responsibilities (like hashing passwords, making HTTP database requests, or writing to logs) simply because it owns the user data.

To prevent this domain corruption, fabricate a "purely invented" class—such as a **Service**, **Repository**, or **Logger**—to handle the technical execution.

### 🌟 Code Example: Pure Fabrication Repository
Instead of forcing the `User` class to save itself to the SQL database, we fabricate a `UserRepository` to manage database operations:

```ts
// High Cohesion Domain Entity
class User {
  constructor(public id: string, public email: string) {}
}

// Pure Fabrication (Inventor class for database handling)
class UserRepository {
  async save(user: User): Promise<void> {
    const query = "INSERT INTO users (id, email) VALUES ($1, $2)";
    await db.query(query, [user.id, user.email]); // Technical detail kept here!
  }
}
```
