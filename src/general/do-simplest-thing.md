---
title: Do The Simplest Thing That Could Possibly Work
description: Real progress against the real problem is maximized if we just work on what the problem really is.
icon: CheckCircle
cardPrompt: "A character crossing a stream on a single plank labelled \"SIMPLE\", next to a half-finished suspension bridge labelled \"SOMEDAY\"."
---

# Do The Simplest Thing That Could Possibly Work

<CoverImage src="/covers/general/do-simplest-thing.webp" alt="Do The Simplest Thing">
  <h1>Do The Simplest Thing</h1>
  <p>A tiny white robot crossing a narrow creek by stepping on a single wooden plank, while an elaborate half-built suspension bridge with idle cranes looms unfinished in the background.</p>
</CoverImage>

> "Real progress against the real problem is maximized if we just work on what the problem really is." — *Extreme Programming Core Philosophy*

When faced with a complex programming challenge, it is incredibly easy to get sucked into designing massive class hierarchies, custom pub-sub event buses, and elaborate configurations. Developers often believe that "professionalism" means making the code look complex and architectural.

The principle of **Do The Simplest Thing That Could Possibly Work** is a famous Extreme Programming guideline that urges you to cut through the noise. It asks you to pause, step back, and ask yourself a single, defining question:

> **"What is the simplest thing that could possibly work?"**

---

## Why Focus on the Simplest Path?

1. **Maximize Progress**: Real-world software delivery is about solving actual problems for users. If you spend three days building a generic plugin system before shipping a basic data display, you are not making progress on the real problem.
2. **Easy to Refactor**: Simple code is incredibly easy to understand, rewrite, or delete. If the requirement changes next week, you can throw away 10 lines of simple code without pain. Throwing away 500 lines of highly coupled "architecture" is painful and expensive.
3. **Fewer Bugs**: Complexity is the breeding ground for edge-case errors. Simple code has fewer moving parts, fewer branches, and fewer places for bugs to hide.

---

## Technical Proof: Simple vs. Speculative Cleverness

Imagine we need to read a CSV config file containing user names and active states.

::: code-group

```ts [TypeScript]
// ❌ Over-engineered (Building custom stream readers and tokenizers prematurely)
class CleverCsvReader {
  *parseStream(rawText: string): Generator<Record<string, string>> {
    const lines = rawText.split("\n");
    const headers = lines[0].split(",");
    
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i]) continue;
      const cells = lines[i].split(",");
      const record: Record<string, string> = {};
      headers.forEach((h, index) => {
        record[h.trim()] = cells[index]?.trim() || "";
      });
      yield record;
    }
  }
}

// 🌟 Simple (The simplest thing that could possibly work for the current task)
function parseSimpleCsv(rawText: string): string[][] {
  return rawText
    .split("\n")
    .filter(line => line.trim() !== "")
    .map(line => line.split(","));
}
```

```py [Python]
# ❌ Over-engineered (Creating custom abstract factory parsers)
class CustomParser:
    def parse(self, text: str) -> dict:
        raise NotImplementedError

# 🌟 Simple (Just use Python's excellent built-in libraries)
import csv

def parse_csv(data: list[str]) -> list[dict]:
    return list(csv.DictReader(data))
```

:::

---

## How to Practice It

* **Ignore the "What-Ifs"**: Do not code for the future. Solve the immediate, concrete task in the simplest possible way.
* **Avoid Writing Custom Infrastructure**: If a standard library function or a simple array loop solves the problem, use it. Do not write custom frameworks, observers, or state machines until you have concrete performance data proving they are necessary.
* **Build it, then Refactor it**: Get a passing test as fast as possible using the simplest code imaginable. Once it is working and verified, refactor it to clean up formatting and structure.

---

## KISS vs. "Do The Simplest Thing That Could Possibly Work" (DTSTTCPW)

While both principles advocate for extreme simplicity, they originate from different design paradigms and operate at different levels of abstraction:
* **KISS** is a high-level **system philosophy** that guides design across all disciplines (engineering, architecture, writing). It warns against over-cleverness and unnecessary conceptual complexity globally.
* **DTSTTCPW** is a tactical **Extreme Programming (XP) constraint** that governs daily coding tasks. It asks you to focus strictly on implementing only the immediate required feature without guessing future needs, and then refactoring to a clean design once it works.

In short, **KISS** is the philosophical goal (simplicity), whereas **DTSTTCPW** is the tactical software-engineering practice used to achieve it.

---

## Resources & Deep Dive

* [Do The Simplest Thing That Could Possibly Work on Wiki.c2.com](https://wiki.c2.com/?DoTheSimplestThingThatCouldPossiblyWork)
* [YAGNI (You Aren't Gonna Need It)](/general/yagni)
* [KISS (Keep It Simple, Stupid)](/general/kiss)
