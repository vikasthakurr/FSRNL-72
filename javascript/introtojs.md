# Introduction to JavaScript

## Definition

JavaScript is a **lightweight, interpreted, single-threaded programming language** used to make web pages interactive. It runs in the browser (client-side) and on servers (Node.js).

---

## Timeline of JavaScript

| Year | Event |
|------|-------|
| 1995 | Brendan Eich creates JavaScript at Netscape (in 10 days) |
| 1996 | Renamed from "Mocha" → "LiveScript" → "JavaScript" |
| 1997 | ECMAScript 1 (ES1) standardized |
| 2009 | ES5 released (strict mode, JSON, array methods) |
| 2009 | Node.js released (JS on server) |
| 2015 | ES6/ES2015 (let, const, arrow functions, classes, promises) |
| 2016+ | Yearly releases (ES2016, ES2017... ES2024) |

---

## How JavaScript Works (Step by Step)

```
Step 1: Browser loads HTML
Step 2: HTML parser encounters <script> tag
Step 3: JS Engine takes over (V8 in Chrome, SpiderMonkey in Firefox)
Step 4: Code is parsed into AST (Abstract Syntax Tree)
Step 5: AST is compiled to bytecode (JIT compilation)
Step 6: Code is executed line by line
Step 7: Output is rendered on the page / console
```

---

## Diagram: Where JS Fits in Web Development

```
┌─────────────────────────────────────────────┐
│              WEB BROWSER                     │
├─────────────────────────────────────────────┤
│                                             │
│   HTML (Structure)                          │
│       ↓                                     │
│   CSS (Styling)                             │
│       ↓                                     │
│   JavaScript (Behavior / Interactivity)     │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Key Features of JavaScript

- **Dynamically typed** – no need to declare variable types
- **Single-threaded** – one call stack, one thing at a time
- **Event-driven** – responds to user actions (click, scroll, etc.)
- **Prototype-based** – inheritance via prototypes, not classes (internally)
- **First-class functions** – functions can be assigned, passed, returned

---

## Ways to Include JavaScript

```html
<!-- 1. Inline -->
<button onclick="alert('Hello!')">Click</button>

<!-- 2. Internal -->
<script>
  console.log("Hello from internal JS");
</script>

<!-- 3. External (recommended) -->
<script src="index.js"></script>
```

---

## Data Types in JavaScript

| Type | Example |
|------|---------|
| Number | `42`, `3.14` |
| String | `"hello"`, `'world'` |
| Boolean | `true`, `false` |
| Undefined | `let x;` |
| Null | `let x = null;` |
| Object | `{ name: "John" }` |
| Array | `[1, 2, 3]` |
| Symbol | `Symbol("id")` |
| BigInt | `123n` |

---

## var vs let vs const

| Feature | var | let | const |
|---------|-----|-----|-------|
| Scope | Function | Block | Block |
| Hoisting | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
| Re-declare | ✅ | ❌ | ❌ |
| Re-assign | ✅ | ✅ | ❌ |

> **TDZ** = Temporal Dead Zone (cannot access before declaration)

---

## Quick Summary

> JavaScript = the language of the web. It adds life to static HTML/CSS pages by handling logic, DOM manipulation, API calls, and event handling.
