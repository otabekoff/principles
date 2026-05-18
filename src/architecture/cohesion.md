---
title: Cohesion (Computer Science)
description: "A deep dive into the types, metrics, advantages, and trade-offs of cohesion within software modules."
icon: Shield
---

# Cohesion (Computer Science)

> "Cohesion refers to the degree to which the elements inside a module belong together." — Larry Constantine

In software engineering, **cohesion** is a qualitative metric that measures how focused, unified, and closely related the responsibilities inside a single module, class, package, or function are. First formalized by Larry Constantine in the late 1960s as part of *Structured Design*, cohesion serves as one of the primary pillars of software quality.

Cohesion is typically described as being **"high" (preferable)** or **"low" (undesirable)**. Highly cohesive systems are more robust, understandable, reusable, and maintainable.

---

## High Cohesion vs. Low Cohesion

In a highly cohesive system:
* **readability** and **reusability** are significantly increased.
* **Complexity** is kept manageable because each module serves a single, clear, unifying purpose.
* Functional changes in the business domain affect only a small, well-bounded set of modules.

In contrast, low cohesion creates "Swiss Army Knife" modules that do too many unrelated things, making them fragile, extremely difficult to test, and highly resistant to refactoring.

```mermaid
graph TD
    subgraph Low Cohesion (Bloated Module)
        M1[UserManager] --> A[Save User to DB]
        M1 --> B[Hash Password]
        M1 --> C[Send Email Alert]
        M1 --> D[Format Invoice PDF]
    end
    
    subgraph High Cohesion (Focused Modules)
        Repo[UserRepository] --> A1[Save User to DB]
        Crypto[PasswordHasher] --> B1[Hash Password]
        Email[MailService] --> C1[Send Email Alert]
        PDF[InvoiceGenerator] --> D1[Format PDF]
    end

    style M1 fill:#f99,stroke:#333,stroke-width:2px
    style Repo fill:#9f9,stroke:#333,stroke-width:2px
    style Crypto fill:#9f9,stroke:#333,stroke-width:2px
    style Email fill:#9f9,stroke:#333,stroke-width:2px
    style PDF fill:#9f9,stroke:#333,stroke-width:2px
```

---

## The Cohesion Spectrum (Worst to Best)

Cohesion is qualitative and is classified using a rubric of levels, ranging from **Coincidental** (the worst) to **Perfect/Atomic** (the absolute narrowest). 

| Rank | Cohesion Type | Description | Quality |
| :--- | :--- | :--- | :--- |
| 1 | **Coincidental** | Elements are grouped arbitrarily with zero logical connection. | ❌ Worst |
| 2 | **Logical** | Elements are grouped because they do similar things, though they differ by nature. | ⚠️ Poor |
| 3 | **Temporal** | Elements are grouped by *when* they are processed during execution. | ⚠️ Poor |
| 4 | **Procedural** | Elements are grouped because they execute in a specific sequence. | 📊 Fair |
| 5 | **Communicational** | Elements operate on the exact same input/output data. | ✅ Good |
| 6 | **Sequential** | The output of one element serves as the direct input to the next (pipeline). | ✅ Good |
| 7 | **Functional** | Every element contributes strictly to a single, well-defined task. | 🏆 Superior |
| 8 | **Perfect (Atomic)** | The module implements a single mathematical action that cannot be reduced further. | 🏆 Perfect |

---

## Deep Dive & Code Examples

### 1. Coincidental Cohesion (Worst)
**Coincidental Cohesion** occurs when parts of a module are grouped together purely arbitrarily. The only relation between them is that they reside in the same file or class (often found in generic `Utils`, `Helpers`, or `Misc` classes).

```ts
// ❌ Coincidental Cohesion (Arbitrary Grouping)
class MiscUtilities {
  static formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }

  static calculateV8SparkPlugGap(cylinders: number): number {
    return cylinders * 0.035;
  }

  static validateEmailPattern(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
```

---

### 2. Logical Cohesion
**Logical Cohesion** occurs when functions are grouped because they fall into the same general category (e.g. mouse & keyboard input handlers, or all input validators), but their internal mechanics and purposes are entirely different.

```ts
// ❌ Logical Cohesion
class InputHandler {
  handleInput(eventType: 'click' | 'keypress' | 'swipe', payload: any) {
    if (eventType === 'click') {
      this.handleMouseClick(payload);
    } else if (eventType === 'keypress') {
      this.handleKeyboardPress(payload);
    } else if (eventType === 'swipe') {
      this.handleTouchSwipe(payload);
    }
  }

  private handleMouseClick(e: MouseEvent) { /* mouse logic */ }
  private handleKeyboardPress(e: KeyboardEvent) { /* keyboard logic */ }
  private handleTouchSwipe(e: TouchEvent) { /* gesture logic */ }
}
```

---

### 3. Temporal Cohesion
**Temporal Cohesion** occurs when elements are grouped together solely because they must run at the same time in program execution (e.g., initializers, cleanups, or error handlers).

```ts
// ❌ Temporal Cohesion
class SystemShutdownManager {
  shutdown() {
    DatabaseConnection.closeAll();  // DB clean
    Logger.write("System stopped"); // Logging
    FileSystem.closeOpenHandles();  // OS File handles
    EmailService.notifyAdmin();     // Communication
  }
}
```

---

### 4. Procedural Cohesion
**Procedural Cohesion** occurs when elements are grouped together because they always execute in a specific, hardcoded sequence.

```ts
// 📊 Procedural Cohesion
class FileExporter {
  exportUserData(userId: string) {
    // Sequence: Check -> Read -> Format -> Save
    const hasPermission = Auth.checkPermissions(userId, 'export');
    if (!hasPermission) throw new Error("Unauthorized");

    const rawData = Db.readUser(userId);
    const formattedCsv = CsvFormatter.format(rawData);
    
    return Disk.saveFile(`user_${userId}.csv`, formattedCsv);
  }
}
```

---

### 5. Communicational Cohesion
**Communicational (or Informational) Cohesion** is achieved when all functions inside a module operate on the same shared data record, database table, or data structures.

```ts
// ✅ Communicational Cohesion
class UserAccountService {
  constructor(private userRecord: UserRecord) {}

  updateProfileImage(url: string) {
    this.userRecord.avatarUrl = url;
  }

  changePhoneNumber(phone: string) {
    this.userRecord.phone = phone;
  }

  deactivateAccount() {
    this.userRecord.status = 'inactive';
    this.userRecord.deactivatedAt = new Date();
  }
}
```

---

### 6. Sequential Cohesion
**Sequential Cohesion** occurs when a module's elements act as an assembly line: the output of one component becomes the direct input to the next.

```ts
// ✅ Sequential Cohesion
class ImageProcessor {
  process(rawBuffer: Buffer): Buffer {
    const resized = this.resizeImage(rawBuffer, 800, 600);
    const grayed = this.convertToGrayscale(resized);
    const compressed = this.compressJpeg(grayed, 85);
    return compressed;
  }

  private resizeImage(buf: Buffer, w: number, h: number): Buffer { /* ... */ return buf; }
  private convertToGrayscale(buf: Buffer): Buffer { /* ... */ return buf; }
  private compressJpeg(buf: Buffer, q: number): Buffer { /* ... */ return buf; }
}
```

---

### 7. Functional Cohesion (Superior)
**Functional Cohesion** is the standard goal of clean design. Every single part of the module contributes directly to executing **one, and only one, well-defined logical task**.

```ts
// 🏆 Functional Cohesion
class XmlLexer {
  lex(xmlString: string): Token[] {
    const tokens: Token[] = [];
    let position = 0;

    while (position < xmlString.length) {
      if (xmlString[position] === '<') {
        const tagToken = this.parseTag(xmlString, position);
        tokens.push(tagToken);
        position += tagToken.length;
      } else {
        const textToken = this.parseText(xmlString, position);
        tokens.push(textToken);
        position += textToken.length;
      }
    }
    return tokens;
  }

  private parseTag(src: string, pos: number): Token { /* ... */ }
  private parseText(src: string, pos: number): Token { /* ... */ }
}
```

---

### 8. Perfect Cohesion (Atomic)
An **Atomic** or **Perfect** module contains a single operation that is completely irreducible. It performs one primary task and cannot be split into smaller, independent functions without making it useless.

```ts
// 🏆 Perfect/Atomic Cohesion
class Arithmetic {
  static add(x: number, y: number): number {
    return x + y;
  }

  static multiply(x: number, y: number): number {
    return x * y;
  }
}
```

---

## Balancing Cohesion, Complexity, and Coupling

While theoretical perfection suggests every function or class should be a single atomic element, in practice, this can lead to **extreme coupling** and **system fragmentation**. 

If every class only has one single-line method:
1. You will have thousands of tiny classes.
2. The coupling between those classes will skyrocket because they must continuously invoke each other to achieve anything useful.
3. System understandability drops because developers must traverse a deep tree of tiny files to follow a single business execution path.

> [!TIP]
> **The Pragmatic Balance**: Group elements together into **Functional** or **Communicational** modules to keep cohesion high while preventing system complexity from exploding into a millions-of-tiny-files nightmare.
