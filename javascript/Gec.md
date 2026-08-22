# Global Execution Context (GEC)

## Definition

The **Global Execution Context (GEC)** is the default environment created by the JavaScript engine when your code starts running. It is the first execution context pushed onto the **Call Stack** and remains there until the program finishes.

> Every JS file runs inside the GEC. Functions create their own **Function Execution Context (FEC)**.

---

## Execution Context – Two Phases

Every execution context goes through **2 phases**:

| Phase | Name | What Happens |
|-------|------|--------------|
| 1 | **Memory Creation (Hoisting)** | Variables are allocated memory (`undefined`), functions are stored in full |
| 2 | **Code Execution** | Code runs line by line, values are assigned |

---

## Step-by-Step Example

```js
var a = 10;
var b = 20;

function add(x, y) {
  var result = x + y;
  return result;
}

var sum = add(a, b);
console.log(sum); // 30
```

### Phase 1 – Memory Creation (Hoisting)

```
Global Memory:
  a         → undefined
  b         → undefined
  add       → function definition (full code)
  sum       → undefined
```

### Phase 2 – Code Execution

```
Line 1: a = 10
Line 2: b = 20
Line 5: add(a, b) is called → NEW Execution Context created
         └── Memory: x = 10, y = 20, result = undefined
         └── Execution: result = 30, return 30
Line 9: sum = 30
Line 10: console.log(30) → Output: 30
```

---

## Diagram: Execution Context & Call Stack

```
┌────────────────────────────────────────────────────────┐
│             JAVASCRIPT ENGINE                           │
├────────────────────────────────────────────────────────┤
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │     GLOBAL EXECUTION CONTEXT (GEC)               │  │
│  ├────────────────────┬─────────────────────────────┤  │
│  │  MEMORY (Phase 1)  │  CODE EXECUTION (Phase 2)   │  │
│  ├────────────────────┼─────────────────────────────┤  │
│  │  a: undefined → 10 │  a = 10                     │  │
│  │  b: undefined → 20 │  b = 20                     │  │
│  │  add: fn {...}      │  add(a, b) called           │  │
│  │  sum: undefined → 30│  sum = 30                   │  │
│  └────────────────────┴─────────────────────────────┘  │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

## Diagram: Call Stack

```
        ┌─────────────────┐
        │  add(10, 20)    │  ← pushed when function called
        ├─────────────────┤
        │  GEC (Global)   │  ← always at bottom
        └─────────────────┘

   After add() returns:

        ┌─────────────────┐
        │  GEC (Global)   │  ← only GEC remains
        └─────────────────┘

   After program ends:

        ┌─────────────────┐
        │     (empty)     │  ← stack is empty
        └─────────────────┘
```

---

## Timeline: What Happens When JS Runs

```
Program Start
    │
    ▼
┌─────────────────────┐
│ GEC Created          │
│ (pushed to stack)    │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Phase 1: Memory      │
│ (hoisting happens)   │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Phase 2: Execution   │
│ (code runs line by   │
│  line)               │
└─────────┬───────────┘
          │
          ▼ (if function call found)
┌─────────────────────┐
│ New FEC Created      │
│ (pushed to stack)    │
│ → Phase 1 + Phase 2 │
│ → returns value      │
│ → FEC destroyed      │
│ (popped from stack)  │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ GEC continues        │
│ execution            │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Program Ends         │
│ GEC destroyed        │
│ (popped from stack)  │
└─────────────────────┘
```

---

## Key Concepts

| Concept | Meaning |
|---------|---------|
| **Execution Context** | Environment where JS code is evaluated |
| **GEC** | Created once, exists throughout the program |
| **FEC** | Created every time a function is invoked |
| **Call Stack** | Stack data structure that tracks execution contexts |
| **Hoisting** | Variables/functions moved to top of scope during memory phase |
| **TDZ** | let/const are hoisted but not accessible before declaration |

---

## Hoisting Quick Reference

```js
console.log(x); // undefined (var is hoisted)
console.log(y); // ReferenceError (let is in TDZ)

var x = 5;
let y = 10;

greet(); // "Hello!" (function declaration is fully hoisted)

function greet() {
  console.log("Hello!");
}
```

---

## Quick Summary

> When JavaScript runs, it creates a **Global Execution Context** with a memory phase (hoisting) and an execution phase. Every function call creates a new execution context on the **Call Stack**, which is destroyed after the function returns.
