---
title: Composition over Inheritance
description: A complete guide to the Composition over Inheritance principle.
icon: Layers3
cardPrompt: "A small custom vehicle snapped together from interchangeable violet parts: wheels, wings and a propeller."
---

# Composition over Inheritance

<CoverImage src="/covers/architecture/composition-over-inheritance.webp" alt="Composition over Inheritance">
  <h1>Composition over Inheritance</h1>
  <p>A tiny white robot building a custom vehicle by snapping together interchangeable violet parts, wheels, wings and a propeller, while a towering, tangled family tree of vehicle ancestors looms unused behind it.</p>
</CoverImage>

> "It is better to compose what an object can do than extend what it is. Compose when there is a 'has a' (or 'uses a') relationship, inherit when 'is a'."

**Composition over Inheritance** (or the **Composite Reuse Principle**) is a core software design rule. It suggests that classes should achieve polymorphic behavior and code reuse by containing instances of other classes (**composition** / Has-A relationship) rather than inheriting from a parent class (**inheritance** / Is-A relationship).

---

## Why Favor Composition?

* **Minimize Coupling**: Class inheritance creates the tightest form of coupling in object-oriented programming. Subclasses easily make assumptions about the internal workings of their parents, frequently breaking the [Liskov Substitution Principle (LSP)](/solid/lsp).
* **Maximize Flexibility**: Using composition, behavior can be swapped dynamically at runtime to accommodate changing business requirements, avoiding deep, rigid restructurings of domain-class hierarchies.
* **Avoid Cascading Changes**: Deep inheritance structures suffer when relatively minor changes are made to baseline parent classes, forcing complex, cascading corrections across several generations of subclasses.

---

## How to Apply It

* **Identify Behaviors as Interfaces**: Separate system object behaviors into distinct, focused interfaces rather than relying on class hierarchies to distribute behaviors among business classes.
* **Use Liskov Substitution Principle (LSP) as a Test**: Use the LSP test to decide when inheritance is truly justified. If a subclass cannot be substituted for its parent in *all* contexts without side effects, inherit is the wrong choice. Use composition instead.

---

```
┌────────────────────────────────────────────────────────────────┐
│                        DESIGN STRATEGY                         │
├───────────────────────────────┬────────────────────────────────┤
│    INHERITANCE (Is-A)         │      COMPOSITION (Has-A)       │
│  - Static / Compile-time      │  - Dynamic / Runtime           │
│  - Tight coupling (Fragile)   │  - Loose coupling (Resilient)  │
│  - Hard to change structure   │  - Behavior easily swapped     │
└───────────────────────────────┴────────────────────────────────┘
```

---

## 1. The Core Tension: Is-A vs. Has-A

* **Inheritance (Is-A)**: A subclass inherits everything from its parent class. This creates the tightest form of coupling in object-oriented programming. If the parent class changes, subclasses can break instantly (known as the **fragile base class problem**).
* **Composition (Has-A)**: An object holds references to other objects (components) and delegates work to them. This allows components to be easily mocked in tests and swapped dynamically at runtime.

---

## 2. A Real-World C++ Game Object Example

Consider modeling game entities in a game engine. If we use class inheritance, we might create a deep, rigid tree:

```cpp
// ❌ Static, rigid inheritance tree
class GameObject {};
class VisibleObject : public GameObject {};
class SolidObject : public VisibleObject {};
class MovableObject : public SolidObject {};
```

What if we want a **Visible, Movable** object that is **not Solid** (e.g. a ghostly particle)? In single-inheritance languages, this structure completely breaks, forcing developers to resort to code duplication or messy workarounds.

### The Decoupled Delegate Pattern (C++)

By refactoring to **Composition**, we separate behavior into independent delegate interfaces (`VisibilityDelegate`, `UpdateDelegate`, and `CollisionDelegate`). Concrete behaviors are injected into a generic `GameObject` at runtime:

```cpp
#include <iostream>
#include <memory>

// 1. Behavior Interfaces (Abstractions)
class VisibilityDelegate {
public:
    virtual ~VisibilityDelegate() = default;
    virtual void draw() = 0;
};

class UpdateDelegate {
public:
    virtual ~UpdateDelegate() = default;
    virtual void update() = 0;
};

class CollisionDelegate {
public:
    virtual ~CollisionDelegate() = default;
    virtual void collide() = 0;
};

// 2. Concrete Behaviors
class OpaqueRender : public VisibilityDelegate {
public:
    void draw() override { std::cout << "Rendering opaque mesh.\n"; }
};

class TranslucentRender : public VisibilityDelegate {
public:
    void draw() override { std::cout << "Rendering ghostly mesh.\n"; }
};

class PhysicsMovement : public UpdateDelegate {
public:
    void update() override { std::cout << "Moving via Newton's laws.\n"; }
};

class SolidCollision : public CollisionDelegate {
public:
    void collide() override { std::cout << "Blocking physical movement.\n"; }
};

// 3. Composed Game Object
class GameObject {
private:
    std::unique_ptr<VisibilityDelegate> visibility;
    std::unique_ptr<UpdateDelegate> update;
    std::unique_ptr<CollisionDelegate> collision;

public:
    GameObject(
        std::unique_ptr<VisibilityDelegate> vis,
        std::unique_ptr<UpdateDelegate> upd,
        std::unique_ptr<CollisionDelegate> col
    ) : visibility(std::move(vis)), update(std::move(upd)), collision(std::move(col)) {}

    void renderEntity() { if (visibility) visibility->draw(); }
    void updatePhysics() { if (update) update->update(); }
    void handleCollision() { if (collision) collision->collide(); }
};

int main() {
    // We can compose a Ghostly Particle (Translucent Render + Physics, but no Solid Collision)
    auto ghost = std::make_unique<GameObject>(
        std::make_unique<TranslucentRender>(),
        std::make_unique<PhysicsMovement>(),
        nullptr // No collision behavior!
    );

    ghost->renderEntity();
    ghost->updatePhysics();
    ghost->handleCollision(); // Does nothing safely
    return 0;
}
```

---

## 3. Drawbacks of Composition: The Boilerplate Problem

While composition provides unmatched design flexibility, it introduces the **Forwarding / Delegation Boilerplate** problem. 

If a composite class wants to expose the interface of its components, it must manually write forwarding shell methods for every single delegate method. This is tedious and can lead to a significant amount of boilerplate code:

```ts
// ⚠️ Boilerplate Forwarding Methods:
class Window {
  constructor(private bounds: Rectangle) {}

  // Manual wrapper forwarding:
  getArea(): number { return this.bounds.getArea(); }
  getWidth(): number { return this.bounds.getWidth(); }
  getHeight(): number { return this.bounds.getHeight(); }
}
```

---

## 4. Modern Language Solutions to Boilerplate

Modern programming languages offer built-in syntactic sugar to eliminate this delegation boilerplate:

### A. Go (Struct Embedding)
Go supports implicit composition through struct embedding. Fields and methods of the embedded struct are automatically promoted to the outer struct:

```go
type Engine struct {}
func (e *Engine) Start() { println("Vroom!") }

type Car struct {
    Engine // Implicit composition (Embedding)
}

func main() {
    c := Car{}
    c.Start() // Method is automatically promoted! No manual forwarding needed.
}
```

### B. Kotlin (Class Delegation via `by` keyword)
Kotlin allows delegation of an interface to a specified object using the `by` keyword:

```kotlin
interface Engine { fun start() }
class V8Engine : Engine { override fun start() = println("Vroom!") }

// Kotlin automatically generates all forwarding boilerplate under the hood!
class Car(engine: Engine) : Engine by engine
```

### C. C# & Java (Default Interface Methods)
With default methods in interfaces, developers can write trait-like shared code inside interfaces, avoiding deep class hierarchies.

### D. Java (Lombok `@Delegate`)
Lombok automatically generates forwarding methods at compile-time for fields annotated with `@Delegate`:

```java
public class Car {
    @Delegate
    private final Engine engine = new V8Engine(); // Generates all Engine methods on Car
}
```

### E. Swift (Protocol Extensions)
Swift allows developers to define default method implementations directly within protocol extensions, creating powerful composition traits.

### F. PHP (Traits)
PHP uses traits to allow classes to share modular blocks of methods across unrelated structures:

```php
trait Movable {
    public function move() { echo "Moving..."; }
}

class Particle {
    use Movable; // Composer trait
}
```

---

## 5. Tempero et al. (2013) Empirical Findings

In 2013, researchers **Tempero et al.** conducted a large-scale empirical study analyzing how inheritance is actually used in real-world Java applications. 

They analyzed dozens of open-source projects and discovered that:
* Inheritance is rarely used to share code.
* The vast majority of class structures are highly shallow, with a **median depth of inheritance of only 1 or 2**.
* The study recorded a **median of only 2% purely internal reuse** via subclassing.
* **Conclusion**: Real-world software engineering implicitly leans heavily on composition. Designers who build deep, complex class trees are fighting against empirical software trends.

---

## Summary of Composition Benefits

* **Dynamic Behavior**: Swap components and alter object capabilities dynamically at runtime.
* **Simple Unit Testing**: Decompose classes into small, focused, easily testable components.
* **No Fragile Base Classes**: Changes inside components do not propagate unexpected structural breaks to outer classes.

---

## Resources & Deep Dive

* [Composition over Inheritance on Wikipedia](https://en.wikipedia.org/wiki/Composition_over_inheritance)
* [Favor Composition Over Inheritance (Microsoft Docs)](https://learn.microsoft.com/en-us/archive/msdn-magazine/2005/july/design-patterns-favor-object-composition-over-class-inheritance)
