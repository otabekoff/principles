---
title: Coding Standards & Specs
description: Adhere to established specifications, style guides, and the 10 essential pillars of engineering quality.
icon: FileCode
cardPrompt: "A short, perfectly even brick wall with a violet blueprint unrolled in front of it."
---

# Coding Standards & Specs

<CoverImage src="/covers/pragmatic/coding-standards.webp" alt="Coding Standards">
  <h1>Coding Standards</h1>
  <p>A row of tiny white robots each building a neat brick wall, all following the same glowing violet blueprint and laying identical bricks in the same tidy pattern.</p>
</CoverImage>

> "Adhering to a set of agreed-upon code specifications ensures that the quality of the code is consistent and readable."

In software development, writing working code is only the first step. For a codebase to be maintainable, scalable, and secure, it must be built on a foundation of rigorous **coding standards and system design specifications**. 

Without these agreements, team members will write code in completely different styles, leading to massive cognitive overhead during peer reviews, difficult debugging sessions, and an accumulation of technical debt. 

---

## 1. Follow Code Specifications

Every language ecosystem has established, industry-standard style guides and specifications (e.g., **PEP 8** for Python, **Google Java Style Guide**, **Go Code Review Comments**, **Rust Style Guidelines**, and **Airbnb Style Guide** for JavaScript/TypeScript).

Adhering to code specifications guarantees:
* **Reduced Cognitive Load**: Developers don't waste time deciphering unusual formatting, inconsistent indentation, or weird naming conventions.
* **Automated Linters and Formatters**: Tooling (like ESLint, Ruff, Ruff-format, Go fmt, and Rustfmt) can automatically format and check rules, keeping pull request reviews focused on logic rather than formatting styles.
* **Fewer Integration Bugs**: Consistent paradigms (like how exceptions are handled, or how modules are structured) prevent subtle integration errors between subsystems.

### The Contrast: Unstandardized vs. Standardized Code

Below are examples of how code specifications transform disorganized code into standard, idiomatic production-quality implementations:

::: code-group

```ts [TypeScript]
// ❌ Non-Standard (mixed casing, missing types, loose comparisons, unformatted)
class user_account {
  private BAL: number = 0;
  constructor(public uName) {}
  
  AddVal(amt){
    if(amt == "0") return;
    this.BAL = this.BAL+amt;
  }
}

// 🌟 Standardized (Google/Airbnb Style: camelCase, strict equality, explicit types, formatting)
export class UserAccount {
  private balance = 0;

  constructor(public readonly username: string) {}

  public addFunds(amount: number): void {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive.");
    }
    this.balance += amount;
  }
}
```

```py [Python]
# ❌ Non-Standard (Violates PEP 8: bad spacing, non-standard naming, missing type hints)
class userAccount:
  def __init__(self,uName):
    self.uName=uName
    self.BAL=0
  def AddVal(self,amt):
    if amt==0:return
    self.BAL=self.BAL+amt

# 🌟 Standardized (PEP 8: snake_case, type hints, proper spacing, docstrings)
class UserAccount:
    """Represents a standard user account following strict PEP 8 specifications."""

    def __init__(self, username: str) -> None:
        self.username: str = username
        self.balance: float = 0.0

    def add_funds(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")
        self.balance += amount
```

```java [Java]
// ❌ Non-Standard (Inconsistent brace placement, poor naming, missing encapsulation)
class user_account {
  public double BAL = 0;
  public String u_name;
  user_account(String name) { u_name = name; }
  void AddVal(double amt) 
  {
    if (amt <= 0) return;
    BAL = BAL + amt;
  }
}

// 🌟 Standardized (Google Java Style: UpperCamelCase, private variables, standard brace placement)
public class UserAccount {
    private double balance = 0.0;
    private final String username;

    public UserAccount(String username) {
        this.username = username;
    }

    public void addFunds(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit amount must be positive.");
        }
        this.balance += amount;
    }

    public double getBalance() {
        return this.balance;
    }
}
```

```go [Go]
// ❌ Non-Standard (Mixed naming, missing error handling, unformatted)
package main
type userAccount struct {
	BAL float64
	uName string
}
func (u *userAccount) AddVal(amt float64) {
	if amt <= 0 { return }
	u.BAL = u.BAL + amt
}

// 🌟 Standardized (Go Style: gofmt, camelCase, idiomatic error handling)
package main

import "errors"

type UserAccount struct {
	username string
	balance  float64
}

func NewUserAccount(username string) *UserAccount {
	return &UserAccount{username: username, balance: 0.0}
}

func (u *UserAccount) AddFunds(amount float64) error {
	if amount <= 0 {
		return errors.New("deposit amount must be positive")
	}
	u.balance += amount
	return nil
}
```

```rust [Rust]
// ❌ Non-Standard (Non-idiomatic casing, unformatted, poor error patterns)
struct userAccount {
    BAL: f64,
    uName: String
}
impl userAccount {
    fn AddVal(&mut self, amt: f64) {
        if amt <= 0.0 { return; }
        self.BAL = self.BAL + amt;
    }
}

// 🌟 Standardized (Idiomatic Rust: rustfmt, snake_case, Result types)
pub struct UserAccount {
    username: String,
    balance: f64,
}

impl UserAccount {
    pub fn new(username: String) -> Self {
        Self {
            username,
            balance: 0.0,
        }
    }

    pub fn add_funds(&mut self, amount: f64) -> Result<(), &'static str> {
        if amount <= 0.0 {
            return Err("Deposit amount must be positive.");
        }
        self.balance += amount;
        Ok(())
    }
}
```

:::

---

## The 10 Pillars of Engineering Quality

Below are the **10 essential pillars of software design and coding standards** that are key to producing production-ready software:

| Pillar | Focus | Deep Dive Link |
| :--- | :--- | :--- |
| **1. Follow Code Specs** | Maintain consistent indentation, casing, naming conventions, and style specs. | [Coding Standards & Specs](/pragmatic/coding-standards) |
| **2. Documentation & Comments** | Write clear code that reveals intent; use comments for the "Why" and not the "What". | [Reveal Intentions](/architecture/reveal-intentions) |
| **3. Robustness** | Catch and handle exception cases at system boundaries without crashing. | [Fail-Fast & Robustness](/architecture/fail-fast-robustness) |
| **4. Follow SOLID Principles** | Build scalable, easily maintainable modules using S, O, L, I, D guidelines. | [SOLID Section](/solid/introduction) |
| **5. Make Testing Easy** | Reduce component coupling to make testing straightforward and friction-free. | [Pass the Tests & Testability](/testing/pass-the-tests) |
| **6. Abstraction** | Extract core logic to hide internal complexity and keep abstractions moderate. | [Abstraction Principle](/general/abstraction-principle) |
| **7. Design Patterns (No Over-Design)** | Leverage patterns to solve common problems, but don't over-engineer them. | [Core Concepts](/core-concepts) |
| **8. Reduce Global Dependencies** | Minimize shared state, rely on parameter passing, and minimize coupling. | [Coupling and Cohesion](/architecture/coupling) |
| **9. Continuous Refactoring** | Cultivate a clean codebase by continuously applying minor, incremental fixes. | [The Boy Scout Rule](/pragmatic/boy-scout-rule) |
| **10. Security as a Top Priority** | Lock down modules and prevent leaks using strict encapsulation boundaries. | [Encapsulation & Info Hiding](/architecture/encapsulation-information-hiding) |

---

## Best Practices for Teams

To make these 10 principles work inside a development organization:
1. **Automate Formatting**: Put formatters (`Prettier`, `Black`, `rustfmt`) directly into IDE settings so developers never have to manually adjust spaces or indentation.
2. **Setup Pre-Commit Hooks**: Prevent non-standard code from entering Git by running linters and tests automatically before every commit using tools like `husky` or `pre-commit`.
3. **Focus Code Reviews on Design**: Because style compliance is automated, code reviews can focus entirely on high-level concerns like **SOLID**, **Coupling & Cohesion**, and **Security**.
