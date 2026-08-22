# JavaScript Engine, V8 & Node.js Architecture

---

## What is a JavaScript Engine?

**Definition:** A JavaScript engine is a program that takes JavaScript code, compiles/interprets it, and executes it. Every browser has one.

| Browser | Engine |
|---------|--------|
| Chrome | V8 |
| Firefox | SpiderMonkey |
| Safari | JavaScriptCore (Nitro) |
| Edge (old) | Chakra |
| Edge (new) | V8 |

---

## How a JS Engine Works (Generic Steps)

```
Source Code (.js)
      │
      ▼
┌──────────────┐
│   Parser     │  → Reads code, checks syntax
└──────┬───────┘
       │
       ▼
┌──────────────┐
│     AST      │  → Abstract Syntax Tree (tree representation of code)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Interpreter │  → Converts AST to Bytecode (quick execution)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Compiler   │  → Optimizes hot code (JIT compilation)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Machine Code│  → Runs on CPU
└──────────────┘
```

---

## V8 Engine – Deep Dive

### Definition

**V8** is Google's open-source, high-performance JavaScript & WebAssembly engine, written in C++. It powers **Chrome** and **Node.js**.

---

### V8 Internal Pipeline

```
JavaScript Source Code
        │
        ▼
┌─────────────────────┐
│      PARSER         │
│  (Tokenizer + AST)  │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│     IGNITION        │  ← Interpreter
│  (Generates         │
│   Bytecode)         │
└─────────┬───────────┘
          │
          │  Profiling: tracks "hot" functions
          │  (functions called repeatedly)
          ▼
┌─────────────────────┐
│    TURBOFAN         │  ← Optimizing Compiler
│  (Bytecode →        │
│   Optimized         │
│   Machine Code)     │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│   MACHINE CODE      │  ← Runs directly on CPU
└─────────────────────┘

⚠️ If assumptions break (e.g., type changes):
   TurboFan DE-OPTIMIZES → falls back to Ignition bytecode
```

---

### V8 Key Components

| Component | Role |
|-----------|------|
| **Parser** | Converts source code → AST |
| **Ignition** | Interpreter → generates bytecode (fast startup) |
| **TurboFan** | JIT Compiler → generates optimized machine code (fast execution) |
| **Garbage Collector (Orinoco)** | Reclaims unused memory automatically |
| **Inline Caching** | Remembers object property locations for speed |
| **Hidden Classes** | Internally tracks object shape for fast property access |

---

### V8 Memory Model

```
┌──────────────────────────────────────────┐
│              V8 MEMORY (HEAP)            │
├────────────────────┬─────────────────────┤
│   YOUNG GENERATION │   OLD GENERATION    │
│   (Short-lived)    │   (Long-lived)      │
├────────────────────┼─────────────────────┤
│  • New objects     │  • Objects that      │
│  • Collected often │    survived multiple │
│    (Scavenger GC)  │    GC cycles         │
│                    │  • Collected less     │
│                    │    often (Mark-Sweep) │
└────────────────────┴─────────────────────┘
```

---

### JIT Compilation (Just-In-Time)

> JS engines don't purely interpret OR compile. They do **both** — that's JIT.

```
Cold Code (runs once)     → Ignition interprets (fast startup)
Hot Code (runs many times) → TurboFan compiles to machine code (fast execution)
```

**Why JIT?**
- Pure interpretation = slow for repeated code
- Pure compilation = slow startup (must compile everything first)
- JIT = best of both worlds

---

## Node.js Architecture

### Definition

**Node.js** is a **runtime environment** that allows JavaScript to run **outside the browser** (on servers). It uses V8 + libuv to handle async I/O.

---

### Node.js Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     YOUR JS CODE                            │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    NODE.JS RUNTIME                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────────┐          ┌────────────────────────────┐  │
│  │    V8 ENGINE  │          │       NODE.JS APIs         │  │
│  │  (JS → Machine│          │  (fs, http, path, crypto,  │  │
│  │   Code)       │          │   os, events, stream...)   │  │
│  └───────┬───────┘          └──────────────┬─────────────┘  │
│          │                                 │                │
│          └──────────────┬──────────────────┘                │
│                         │                                   │
│                         ▼                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              NODE.JS BINDINGS (C++ Bindings)          │   │
│  │         (Bridge between JS and C/C++ code)           │   │
│  └──────────────────────────┬───────────────────────────┘   │
│                             │                               │
│                             ▼                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                     LIBUV                             │   │
│  │  (Async I/O, Event Loop, Thread Pool)                │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  • Event Loop (single thread)                        │   │
│  │  • Thread Pool (4 threads default — for heavy tasks) │   │
│  │  • Handles: file I/O, DNS, networking, timers        │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                OPERATING SYSTEM (Linux/macOS/Windows)        │
│         (epoll / kqueue / IOCP for async operations)        │
└─────────────────────────────────────────────────────────────┘
```

---

### Node.js Event Loop (Step by Step)

The Event Loop is the **heart** of Node.js async behavior.

```
┌───────────────────────────────────────────┐
│            EVENT LOOP PHASES              │
├───────────────────────────────────────────┤
│                                           │
│   ┌─────────────────────────┐             │
│   │ 1. Timers               │  setTimeout, setInterval callbacks
│   └────────────┬────────────┘             │
│                ▼                          │
│   ┌─────────────────────────┐             │
│   │ 2. Pending Callbacks    │  I/O callbacks deferred from previous loop
│   └────────────┬────────────┘             │
│                ▼                          │
│   ┌─────────────────────────┐             │
│   │ 3. Idle / Prepare       │  Internal use only
│   └────────────┬────────────┘             │
│                ▼                          │
│   ┌─────────────────────────┐             │
│   │ 4. Poll                 │  Retrieve new I/O events
│   │   (waits here if idle)  │  Execute I/O callbacks
│   └────────────┬────────────┘             │
│                ▼                          │
│   ┌─────────────────────────┐             │
│   │ 5. Check                │  setImmediate() callbacks
│   └────────────┬────────────┘             │
│                ▼                          │
│   ┌─────────────────────────┐             │
│   │ 6. Close Callbacks      │  socket.on('close')
│   └────────────┬────────────┘             │
│                │                          │
│                ▼                          │
│         (loop back to 1)                  │
│                                           │
└───────────────────────────────────────────┘

Between each phase:
  → process.nextTick() callbacks run
  → Promise microtasks (.then) run
```

---

### Node.js Key Components

| Component | Role |
|-----------|------|
| **V8** | Executes JavaScript, manages memory |
| **libuv** | Provides event loop, async I/O, thread pool |
| **Node APIs** | Built-in modules (fs, http, crypto, etc.) |
| **C++ Bindings** | Bridge between JS and low-level C/C++ operations |
| **Thread Pool** | 4 default threads for file I/O, DNS, crypto, zlib |
| **Event Loop** | Orchestrates async callbacks in a non-blocking way |

---

### Why Node.js is Non-Blocking

```
Traditional Server (e.g., Apache):
  Request 1 → Thread 1 (blocked until DB responds)
  Request 2 → Thread 2 (blocked until file read)
  Request 3 → Thread 3 ...
  ❌ Expensive: 1 thread per request

Node.js:
  Request 1 ─┐
  Request 2 ─┤→ Single thread + Event Loop
  Request 3 ─┘   (delegates I/O to OS / thread pool)
                  (callbacks fire when ready)
  ✅ Efficient: handles thousands of concurrent connections
```

---

### Timeline: How a Request Flows in Node.js

```
Client sends HTTP request
        │
        ▼
┌────────────────────┐
│ Node receives req  │
│ (http module)      │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ JS callback runs   │
│ (your route handler│
│  e.g., app.get())  │
└────────┬───────────┘
         │
         ▼ (needs DB / file?)
┌────────────────────┐
│ Delegated to libuv │
│ (non-blocking)     │
└────────┬───────────┘
         │
         ▼ (meanwhile event loop continues)
┌────────────────────┐
│ OS / Thread Pool   │
│ completes the task │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ Callback pushed to │
│ event loop queue   │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ Event loop picks   │
│ callback → runs it │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ Response sent back │
│ to client          │
└────────────────────┘
```

---

## Quick Summary

| Topic | One-liner |
|-------|-----------|
| JS Engine | Program that parses + executes JavaScript |
| V8 | Google's engine — uses Ignition (interpreter) + TurboFan (compiler) |
| JIT | Compiles hot code at runtime for speed |
| Node.js | V8 + libuv = JS on the server |
| Event Loop | Single-threaded loop that handles async callbacks phase by phase |
| libuv | C library for async I/O + thread pool |
