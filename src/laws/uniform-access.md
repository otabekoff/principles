---
title: Uniform Access Principle
description: "A complete guide to Bertrand Meyer's Uniform Access Principle (UAP), its language implementations (Python, Ruby, C#, JS, C++), and performance tradeoffs."
icon: Equal
---

# Uniform Access Principle (UAP)

<CoverImage src="/covers/laws/uniform-access.webp" alt="Uniform Access">
  <h1>Uniform Access</h1>
  <p>A tiny white robot at a vending machine with identical buttons, where some snacks drop out ready-made and others are quietly cooked fresh behind the panel, and the robot cannot tell the difference.</p>
</CoverImage>

> "All services offered by a module should be available through a uniform notation, which does not betray whether they are implemented through storage or through computation." — Bertrand Meyer

The **Uniform Access Principle (UAP)** is a fundamental software design rule of thumb put forth by computer scientist **Bertrand Meyer** in his seminal book, ***Object-Oriented Software Construction***. It states that the notation used to access properties of an object should remain completely identical regardless of whether that property is a simple variable pre-calculated in memory (storage) or a dynamic value computed on the fly (computation).

---

## 1. The Maintenance Problem: Storage vs. Computation

In early programming languages (such as C++), accessing a public field is syntactically different from invoking a method. Field access is written as `object.value`, whereas calling a method requires parentheses: `object.value()`.

```
                    THE REFRACTORING RIPPLE EFFECT:
   ┌────────────────────────────────────────────────────────────────────────┐
   │ Problem:                                                               │
   │   After writing thousands of lines of code, you realize an attribute   │
   │   (e.g., color) needs to be calculated dynamically from a database     │
   │   or cache.                                                            │
   │                                                                        │
   │ Traditional C++:                                                       │
   │   Change: obj.color  ───► obj.getColor()                               │
   │                                                                        │
   │ The Fallout:                                                           │
   │   Every single source file in the system using that property must be   │
   │   manually updated and recompiled. If you are shipping a distributed   │
   │   library to hundreds of customers, this change breaks their builds!   │
   └────────────────────────────────────────────────────────────────────────┘
```

Meyer recognized that changing how a value is resolved is a private **implementation detail** of the class. The caller should be completely shielded from this decision. The "write" implications (i.e. modifying a value via a setter method) are historically harder to implement cleanly than "read" operations, as Meyer explored in his Eiffel research.

---

## 2. Language Implementations of UAP

Modern programming languages handle UAP through native **Properties**—syntactic sugar that maps simple attribute notation directly to getter and setter methods.

### A. Python
Python implements UAP using the built-in `@property` decorator, abstracting away the difference between raw attributes and calculated getters/setters:

```python
# 🌟 Adheres to UAP in Python
class Egg:
    def __init__(self, weight_oz: float, color_name: str) -> None:
        # Internally converts weight to grams, and color to RGB
        self.weight = weight_oz 
        self.color = color_name

    @property
    def color(self) -> str:
        """Color property getter: computes name from internal RGB."""
        return to_color_str(self._color_rgb)

    @color.setter
    def color(self, color_name: str) -> None:
        """Color property setter."""
        self._color_rgb = to_rgb(color_name)

    @property
    def weight(self) -> float:
        """Weight property getter: converts internal grams to ounces."""
        return self._weight_gram / 28.35

    @weight.setter
    def weight(self, weight_oz: float) -> None:
        self._weight_gram = 28.35 * weight_oz

# The calling code remains identical in both implementations!
egg = Egg(2.0, "white")
egg.color = "green" # Triggers the setter method implicitly!
print(egg.color)    # Triggers the getter method implicitly!
```

### B. Ruby
Ruby follows a revised version of UAP. In Ruby, **there is no way to directly retrieve an instance variable from outside an object**. Every attribute access is *always* an implicit method call. The standard `attr_accessor` keyword is simply syntactic sugar that auto-generates these getter and setter methods behind the scenes:

```ruby
# 🌟 UAP via Implicit Methods in Ruby
class Egg
  attr_accessor :color # Generates def color and def color=(val)
  
  def initialize(color)
    @color = color
  end
end

y = Egg.new("Green")
y.color = "White" # Invokes method: y.color=("White")
puts y.color      # Invokes method: y.color()
```

### C. C#
C# natively supports Class Properties, letting developers define `get` and `set` code blocks that look exactly like standard member variables to the caller:

```csharp
// 🌟 UAP via C# Properties
public class Foo
{
    private string _name;

    public int Size { get; set; } // Auto-implemented property

    public string Name
    {
        get { return _name; }
        set { _name = value; }
    }
}

// Call site is completely uniform
var foo = new Foo();
foo.Size = 42;      // Triggers setter
foo.Name = "Alice"; // Triggers setter
```

### D. JavaScript
JavaScript has supported computed properties via getters and setters since the introduction of **ECMAScript 5** in 2009. Historically, special properties like `Array.prototype.length` and `String.prototype.length` pre-dated ES5. Modern JS uses `Object.defineProperty` or native class getter syntax:

```js
// 🌟 UAP in JavaScript
const obj = {};

Object.defineProperty(obj, "two", {
  get: function() { return 1 + 1; },
  set: function(val) { this.x = val; }
});

console.log(obj.two); // 2
```

### E. C++ (The Outlier)
C++ natively lacks both UAP and properties. If a class member is converted from an attribute (`obj.color`) to a pair of functions (`obj.getColor()`), all callers must be refactored. While templates and operator overloading can "fake" properties, it introduces complex, hard-to-maintain code, making C++ library maintenance famously viscosity-prone.

---

## 3. The Performance Trap and Pitfalls of UAP

While UAP is incredibly elegant, it introduces a dangerous cognitive gap regarding **runtime complexity**:

```
                       THE DANGEROUS PERFORMANCE GAP:
   ┌────────────────────────────────────────────────────────────────────────┐
   │ Developer Expectation:                                                 │
   │   obj.score  ───► "This is a cheap O(1) memory lookup."                │
   │                                                                        │
   │ Underlying Reality (Under UAP):                                        │
   │   obj.score  ───► "Calculates high-degree matrix multiplications over   │
   │                    100,000 arrays taking 5 seconds!"                   │
   │                                                                        │
   │ Result: The uniform notation completely masks massive I/O, heavy DB    │
   │         queries, or intensive network latencies.                       │
   └────────────────────────────────────────────────────────────────────────┘
```

### Golden Rules for Preventing UAP Abuse:
1. **Keep Properties Cheap**: Properties should generally have $O(1)$ complexity. If getting a property is highly expensive or performs a network fetch, **do not use a getter/property**. Wrap it in an explicit method name (e.g., `calculateScore()` or `fetchUserData()`) to warn the caller of its high performance footprint.
2. **Avoid Cache Side-Effects**: Do not write getters that trigger unpredictable cache purges, database transactions, or global mutations. Keep property reads idempotent.
