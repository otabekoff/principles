---
title: Liskov Substitution Principle (LSP)
description: A complete guide to the Liskov Substitution Principle (Strong Behavioral Subtyping), its formal rules, history constraint, and design metrics.
icon: Repeat
---

# Liskov Substitution Principle (LSP)

> **"Objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program."** — *Barbara Liskov*

The **Liskov Substitution Principle (LSP)** represents the **L** in the **SOLID** programming principles. It focuses entirely on the expected behavioral semantics of object hierarchies, ensuring that subclass polymorphism does not silently introduce bugs or alter program correctness.

---

---

## 1. History and Mathematical Formalization

The principle was first introduced by computer scientist **Barbara Liskov** in her 1987 OOPSLA keynote address, *Data Abstraction and Hierarchy*. 

```
S \le T \to (\forall x:T. \phi(x) \to \forall y:S. \phi(y))
```

In 1994, Liskov and **Jeannette Wing** published a formalization that extended standard type theory into an extension of **Hoare logic**. They established that subtyping is not merely syntactic (e.g. sharing method names and signatures) but fundamentally **semantic** (sharing invariants, pre/postconditions, and state histories).

---

## 2. The Signature & Contractual Rules

To satisfy LSP, a subclass must conform to both syntactic signature rules and semantic behavioral rules:

```
                            LSP CONFORMING RULES:
   ┌───────────────────────────────────┬──────────────────────────────────┐
   │          SIGNATURE RULES          │         BEHAVIORAL RULES         │
   ├───────────────────────────────────┼──────────────────────────────────┤
   │ 1. Contravariance of parameters   │ 4. Preconditions cannot be       │
   │ 2. Covariance of return types     │    strengthened in subtype       │
   │ 3. No new exceptions thrown unless│ 5. Postconditions cannot be      │
   │    they are subtype exceptions    │    weakened in subtype           │
   │                                   │ 6. Invariants cannot be weakened │
   └───────────────────────────────────┴──────────────────────────────────┘
```

### Behavioral Rules Explained:
* **Preconditions Cannot Be Strengthened**: The subtype must be able to accept at least all inputs the supertype accepts. If the parent class accepts any integer, the subclass cannot restrict inputs to positive integers only.
* **Postconditions Cannot Be Weakened**: The subtype must guarantee at least everything the supertype guarantees. It cannot return a wider range of values or behave unpredictably compared to its parent.
* **Invariants Cannot Be Weakened**: The state properties that are always true of the parent class must remain true of the child class.

### 🌟 The History Constraint (The "History Rule")
Introduced by Liskov and Wing, this constraint is the single most important addition to earlier subtyping theories (such as Bertrand Meyer's Design by Contract). It states that **subtypes cannot introduce state changes that are not permissible in the supertype**.

* **❌ The Classic Immutable Violation**: Under older theories, a **Mutable Point** could be defined as a subtype of an **Immutable Point** because they share the same coordinates interface. However, LSP's history constraint forbids this. In the history of an immutable point, coordinates never change after creation. A mutable point allows changes, violating the history constraint of its parent.
* **🌟 Safe Subtyping**: You can define a Circle with an immutable center and a *mutable radius* as a subtype of an Immutable Point. Since the parent coordinates remain unchanged, the newly added mutable radius does not violate the observable state history of the parent.

---

## 3. Classic Violation: The Rectangle-Square Dilemma

A classic conceptual violation occurs when modeling a `Square` as a subclass of `Rectangle`. While a square is mathematically a rectangle, their behaviors under modification are fundamentally incompatible.

### ❌ The Code Smell (C++ Style Violation)

```cpp
#include <cassert>

class Rectangle {
private:
    double width;
    double height;
public:
    Rectangle(double width, double height) : width(width), height(height) {}

    virtual void setWidth(double w) { this->width = w; }
    virtual void setHeight(double h) { this->height = h; }

    double getWidth() const { return width; }
    double getHeight() const { return height; }
    double getArea() const { return width * height; }
};

// Square extends Rectangle
class Square : public Rectangle {
public:
    Square(double side) : Rectangle(side, side) {}

    void setWidth(double w) override {
        Rectangle::setWidth(w);
        Rectangle::setHeight(w); // Violates single-dimension constraint!
    }

    void setHeight(double h) override {
        Rectangle::setHeight(h);
        Rectangle::setWidth(h);  // Violates single-dimension constraint!
    }
};
```

#### Why this breaks LSP:
Now consider a function `g` designed to work with any `Rectangle`:

```cpp
void g(Rectangle& r) {
    r.setWidth(5);
    r.setHeight(4);
    // For any valid Rectangle, setting width=5 and height=4 yields area=20.
    // However, if we pass in a Square, width and height both become 4.
    // The assertion fails, breaking the program correctness!
    assert(r.getArea() == 20); 
}
```

By enforcing that width and height must always remain equal, `Square` strengthens the preconditions of `setHeight` and weakens the postconditions of `setWidth` compared to `Rectangle`. It is **not substitutable** for its parent class.

---

## 4. The Solution: Model Behaviors, Not Definitions

Instead of force-fitting relationships using classical taxological inheritance, we should model them with independent classes that implement a shared read-only interface:

```ts
// 🌟 Clean modeling adhering to LSP
interface Shape {
  getArea(): number;
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}
  getArea(): number { return this.width * this.height; }
}

class Square implements Shape {
  constructor(private side: number) {}
  getArea(): number { return this.side * this.side; }
}
```

Since `Square` and `Rectangle` both implement `Shape`, they are perfectly interchangeable where a `Shape` is expected.

---

## 5. Advantages and Experimental Evidence

* **Bulletproof Polymorphism**: Conforming to LSP guarantees that calling code can rely on polymorphic interfaces safely without writing explicit type checks or instanceof assertions.
* **Fewer Bugs (RFC vs WMC)**: In a landmark 1996 empirical study, Basili et al. demonstrated that a lower **Response For a Class (RFC)** reduces bug rates. LSP-conforming systems naturally segment their interfaces, yielding a lower RFC. However, the study also warned that an increase in **Weighted Methods per Class (WMC)** can lead to bugs. Developers must keep subclasses focused and avoid bloating them with unnecessary wrapper methods.
* **Composition over Inheritance**: LSP serves as the ultimate warning sign against shallow code reuse via inheritance. If a subclass cannot fulfill all invariants of its parent, favor composition.

---

## Resources & Deep Dive

* [Liskov Substitution Principle on Wikipedia](https://en.wikipedia.org/wiki/Liskov_substitution_principle)
* [The Liskov Substitution Principle Explained on Reflectoring.io](https://reflectoring.io/lsp-explained/)
