# Critical Rendering Path (CRP)

## Overview

The **Critical Rendering Path (CRP)** is the sequence of steps the browser takes to convert HTML, CSS, and JavaScript into actual pixels on the screen. Understanding and optimizing the CRP is key to achieving fast page load times and good user experience.

---

## 1. What is the Critical Rendering Path?

The CRP is the **minimum set of steps** the browser must complete before it can render the first pixel on the screen (called **First Paint**). Every web page goes through this process.

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CRITICAL RENDERING PATH                           │
│                                                                     │
│   HTML        CSS         JavaScript       Layout       Paint       │
│  Parsing   Parsing       Execution       Calculation   to Screen   │
│    │          │              │               │            │         │
│    ▼          ▼              ▼               ▼            ▼         │
│  ┌────┐    ┌────┐        ┌────┐          ┌────┐      ┌────┐       │
│  │DOM │    │CSSOM│        │ JS │          │Layout│     │Paint│      │
│  │Tree│    │Tree │        │Exec│          │ Tree │     │     │      │
│  └────┘    └────┘        └────┘          └────┘      └────┘       │
│    │          │              │               │            │         │
│    └──────────┴──────────────┘               │            │         │
│                │                             │            │         │
│                ▼                             │            │         │
│         ┌───────────┐                        │            │         │
│         │  Render   │────────────────────────┘            │         │
│         │   Tree    │─────────────────────────────────────┘         │
│         └───────────┘                                               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Steps of the Critical Rendering Path

### Step-by-Step Process

```
┌─────────────────────────────────────────────────────────────────────┐
│                   CRP - STEP BY STEP                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Step 1: Receive HTML                                               │
│  ─────────────────────                                              │
│  Browser receives HTML bytes from the server                        │
│  Bytes → Characters → Tokens → Nodes → DOM Tree                    │
│                                                                     │
│  Step 2: Build the DOM (Document Object Model)                      │
│  ──────────────────────────────────────────────                     │
│  Parse HTML tokens into a tree structure                            │
│                                                                     │
│  Step 3: Build the CSSOM (CSS Object Model)                         │
│  ───────────────────────────────────────────                        │
│  Parse CSS (inline, internal, external) into a tree                 │
│  ⚠️ CSS is RENDER-BLOCKING                                         │
│                                                                     │
│  Step 4: Execute JavaScript                                         │
│  ──────────────────────────                                         │
│  Run JS (can modify DOM and CSSOM)                                  │
│  ⚠️ JS is PARSER-BLOCKING                                          │
│                                                                     │
│  Step 5: Build Render Tree                                          │
│  ─────────────────────────                                          │
│  Combine DOM + CSSOM → Render Tree                                  │
│  (Only visible elements are included)                               │
│                                                                     │
│  Step 6: Layout (Reflow)                                            │
│  ────────────────────────                                           │
│  Calculate exact position and size of each element                  │
│                                                                     │
│  Step 7: Paint                                                      │
│  ─────────                                                          │
│  Convert layout into actual pixels on the screen                    │
│                                                                     │
│  Step 8: Compositing                                                │
│  ────────────────────                                               │
│  Combine painted layers into the final image                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Detailed Breakdown of Each Step

### Step 1 & 2: HTML Parsing → DOM Tree

The browser converts raw HTML bytes into a structured tree called the **DOM (Document Object Model)**.

```
HTML Document:
─────────────
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>World</p>
  </body>
</html>


Conversion Process:
───────────────────
Bytes → Characters → Tokens → Nodes → DOM

Bytes:      3C 68 74 6D 6C 3E ...
Characters: <html><head><title>...
Tokens:     StartTag:html, StartTag:head, StartTag:title ...
Nodes:      HTMLElement, HeadElement, TitleElement ...


DOM Tree:
─────────
                    document
                       │
                     <html>
                    /      \
               <head>      <body>
                 │          /    \
              <title>    <h1>   <p>
                 │         │      │
              "My Page" "Hello" "World"
```

### Step 3: CSS Parsing → CSSOM Tree

The browser parses all CSS (external files, `<style>` tags, inline styles) into the **CSSOM (CSS Object Model)**. CSS is **render-blocking** — the browser won't render until all CSS is parsed.

```
CSS:
────
body { font-size: 16px; }
h1 { color: red; font-weight: bold; }
p { display: none; }


CSSOM Tree:
───────────
                    document
                       │
                  StyleSheet
                       │
                ┌──────┼──────┐
                │      │      │
             body     h1      p
               │       │      │
          font-size  color   display
           16px      red     none
                     │
                  font-weight
                    bold
```

### Step 4: JavaScript Execution

JavaScript can **modify both DOM and CSSOM**. That's why JS is **parser-blocking** — the browser pauses DOM construction when it encounters a `<script>` tag.

```
┌─────────────────────────────────────────────────────────────────┐
│              JAVASCRIPT BLOCKING BEHAVIOR                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Without async/defer:                                            │
│  ═══════════════════                                             │
│                                                                  │
│  HTML Parsing: ████████░░░░░░░░░░████████████                   │
│  JS Download:          ████████                                  │
│  JS Execute:                   ██                                │
│                        ↑ BLOCKED ↑                               │
│                                                                  │
│  With async:                                                     │
│  ═══════════                                                     │
│                                                                  │
│  HTML Parsing: ████████████████░░████████████                   │
│  JS Download:  ████████████████                                  │
│  JS Execute:                   ██                                │
│               (downloads in parallel, blocks only during execute) │
│                                                                  │
│  With defer:                                                     │
│  ═══════════                                                     │
│                                                                  │
│  HTML Parsing: ██████████████████████████████                   │
│  JS Download:  ████████████████                                  │
│  JS Execute:                                 ██                  │
│              (downloads in parallel, executes after HTML parsing) │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Step 5: Render Tree Construction

The browser combines the **DOM + CSSOM** to create the **Render Tree**. Only visible elements are included.

```
DOM Tree:                    CSSOM:
─────────                    ──────
<html>                       body { font:16px }
├── <head>                   h1 { color:red }
│   └── <title>              p { display:none }
└── <body>
    ├── <h1>Hello</h1>
    └── <p>World</p>


                    │
                    ▼ COMBINE (DOM + CSSOM)
                    │

Render Tree:
────────────
<body>  ─── font-size: 16px
  │
  └── <h1> ─── color: red, font-weight: bold
        │
      "Hello"

Note: <head>, <title>, and <p> are NOT in render tree!
- <head>/<title> → not visible elements
- <p> → has display:none (hidden)
```

### Step 6: Layout (Reflow)

The browser calculates the **exact position and size** of every element in the render tree based on the viewport.

```
┌─────────────────────────────────────────────────────────────────┐
│                     LAYOUT CALCULATION                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Viewport: 1024px wide                                          │
│                                                                  │
│  ┌────────────────────────────────── 1024px ──────────────────┐ │
│  │  <body>                                                     │ │
│  │  x: 0, y: 0, width: 1024px, height: auto                  │ │
│  │                                                             │ │
│  │  ┌──────────────────────────── 1024px ───────────────────┐ │ │
│  │  │  <h1> "Hello"                                          │ │ │
│  │  │  x: 0, y: 0, width: 1024px, height: 40px             │ │ │
│  │  └────────────────────────────────────────────────────────┘ │ │
│  │                                                             │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Each element gets: x, y, width, height                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Step 7 & 8: Paint & Compositing

The browser converts the layout into actual **pixels on the screen**. Complex pages are painted in multiple layers and then composited together.

```
┌─────────────────────────────────────────────────────────────────┐
│                     PAINT & COMPOSITE                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Paint Order (back to front):                                    │
│  ─────────────────────────────                                   │
│  1. Background color                                             │
│  2. Background image                                             │
│  3. Border                                                       │
│  4. Children                                                     │
│  5. Outline                                                      │
│                                                                  │
│  Layer Compositing:                                              │
│  ──────────────────                                              │
│                                                                  │
│  ┌──────────┐                                                    │
│  │ Layer 3  │ (z-index: 3, e.g., modal)                         │
│  └──────────┘                                                    │
│       ┌──────────┐                                               │
│       │ Layer 2  │ (z-index: 2, e.g., dropdown)                  │
│       └──────────┘                                               │
│            ┌──────────┐                                          │
│            │ Layer 1  │ (z-index: 1, e.g., navbar)               │
│            └──────────┘                                          │
│                 ┌──────────┐                                     │
│                 │ Layer 0  │ (base page content)                  │
│                 └──────────┘                                     │
│                                                                  │
│  GPU composites all layers → Final Frame on Screen               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Render-Blocking vs Parser-Blocking Resources

```
┌─────────────────────────────────────────────────────────────────┐
│              BLOCKING RESOURCES                                   │
├──────────────────────────────┬──────────────────────────────────┤
│     RENDER-BLOCKING          │       PARSER-BLOCKING            │
├──────────────────────────────┼──────────────────────────────────┤
│                              │                                  │
│  CSS files (external)        │  JavaScript (without async/defer)│
│  CSS in <style> tags         │  <script src="app.js"></script>  │
│                              │                                  │
│  Blocks:                     │  Blocks:                         │
│  - Render Tree construction  │  - DOM construction (parsing)    │
│  - First Paint               │  - Waits for CSSOM too           │
│                              │                                  │
│  Why?                        │  Why?                            │
│  Browser needs complete      │  JS can modify DOM/CSSOM,        │
│  CSSOM before rendering      │  so browser must pause           │
│  (avoids FOUC - Flash of     │  and execute JS first            │
│  Unstyled Content)           │                                  │
│                              │                                  │
└──────────────────────────────┴──────────────────────────────────┘
```

---

## 5. CRP Metrics & Performance

### Key Metrics

| Metric                             | Description                                       |
| ---------------------------------- | ------------------------------------------------- |
| **FP (First Paint)**               | First pixel rendered on screen (background color) |
| **FCP (First Contentful Paint)**   | First text/image rendered                         |
| **LCP (Largest Contentful Paint)** | Largest visible element rendered                  |
| **TTI (Time to Interactive)**      | Page is fully interactive                         |

### CRP Length

The "length" of the CRP is determined by:

```
CRP Length = Number of critical resources
           + Critical path length (round trips)
           + Critical bytes (total size)

┌─────────────────────────────────────────────────────────────────┐
│                  CRP LENGTH EXAMPLE                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Page with: index.html, style.css, app.js                        │
│                                                                  │
│  Round Trip 1:  Browser ──GET index.html──▶ Server               │
│                 Browser ◀──HTML response───  Server               │
│                                                                  │
│  Round Trip 2:  Browser ──GET style.css───▶ Server               │
│                 Browser ──GET app.js──────▶ Server               │
│                 Browser ◀──CSS response───  Server               │
│                 Browser ◀──JS response────  Server               │
│                                                                  │
│  Then: Parse CSS → Parse JS → Build Render Tree → Paint          │
│                                                                  │
│  Critical Resources: 3 (HTML + CSS + JS)                         │
│  Critical Path Length: 2 round trips                             │
│  Critical Bytes: HTML size + CSS size + JS size                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Optimizing the Critical Rendering Path

### Optimization Strategies

```
┌─────────────────────────────────────────────────────────────────┐
│              CRP OPTIMIZATION TECHNIQUES                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. MINIMIZE CRITICAL RESOURCES                                  │
│  ───────────────────────────────                                 │
│  - Inline critical CSS (above-the-fold styles)                   │
│  - Use async/defer for non-critical JS                           │
│  - Remove unused CSS/JS                                          │
│                                                                  │
│  2. MINIMIZE CRITICAL PATH LENGTH                                │
│  ─────────────────────────────────                               │
│  - Reduce number of round trips                                  │
│  - Use HTTP/2 (multiplexing)                                     │
│  - Use preload/prefetch hints                                    │
│  - Server push critical resources                                │
│                                                                  │
│  3. MINIMIZE CRITICAL BYTES                                      │
│  ──────────────────────────────                                  │
│  - Minify HTML, CSS, JS                                          │
│  - Compress with Gzip/Brotli                                     │
│  - Optimize images                                               │
│  - Use code splitting                                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Optimization Techniques in Detail

#### 1. CSS Optimization

```html
<!-- BAD: All CSS is render-blocking -->
<link rel="stylesheet" href="styles.css" />
<link rel="stylesheet" href="print.css" />
<link rel="stylesheet" href="mobile.css" />

<!-- GOOD: Use media queries to reduce blocking -->
<link rel="stylesheet" href="styles.css" />
<link rel="stylesheet" href="print.css" media="print" />
<link rel="stylesheet" href="mobile.css" media="(max-width: 768px)" />

<!-- BEST: Inline critical CSS -->
<style>
  /* Only above-the-fold critical styles */
  body {
    font-family: sans-serif;
    margin: 0;
  }
  .header {
    background: #333;
    color: white;
    padding: 1rem;
  }
</style>
<!-- Load rest of CSS asynchronously -->
<link
  rel="preload"
  href="full-styles.css"
  as="style"
  onload="this.rel='stylesheet'"
/>
```

#### 2. JavaScript Optimization

```html
<!-- BAD: Parser-blocking -->
<script src="app.js"></script>

<!-- GOOD: async (download parallel, execute when ready) -->
<script src="analytics.js" async></script>

<!-- GOOD: defer (download parallel, execute after DOM ready) -->
<script src="app.js" defer></script>

<!-- Use defer for scripts that depend on DOM -->
<!-- Use async for independent scripts (analytics, ads) -->
```

#### 3. Resource Hints

```html
<!-- Preload: High priority, current page needs this soon -->
<link rel="preload" href="critical-font.woff2" as="font" crossorigin />
<link rel="preload" href="hero-image.webp" as="image" />

<!-- Prefetch: Low priority, future page might need this -->
<link rel="prefetch" href="next-page.html" />

<!-- Preconnect: Establish early connection to important origins -->
<link rel="preconnect" href="https://api.example.com" />

<!-- DNS-prefetch: Resolve DNS early -->
<link rel="dns-prefetch" href="https://cdn.example.com" />
```

---

## 7. CRP Optimization Flowchart

```
┌─────────────────────────────────────────────────────────────────┐
│           CRP OPTIMIZATION DECISION FLOWCHART                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│                    Is resource needed                            │
│                    for first paint?                              │
│                    /            \                                 │
│                  YES            NO                                │
│                  /                \                               │
│        Is it CSS?              Defer/async load it                │
│        /       \               (not critical)                    │
│      YES       NO                                                │
│      /           \                                               │
│  Is it small    Is it JS?                                        │
│  (< 14KB)?     /      \                                         │
│  /     \      YES      NO (image/font)                          │
│ YES    NO     /          \                                       │
│ /       \   Can it be    Use preload                            │
│Inline   Keep as         deferred?                                │
│it       external        /      \                                 │
│         (but preload)  YES     NO                                │
│                        /         \                                │
│                    Use defer   Keep but                           │
│                               minimize                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. Before vs After Optimization

```
BEFORE OPTIMIZATION:
════════════════════

Timeline (ms):  0    200    400    600    800    1000   1200
                │     │      │      │      │      │      │
HTML Parse:     ████████
CSS Download:          ████████
CSS Parse:                    ████
JS Download:                  ░░░░░░░░████████   (blocked by CSS)
JS Execute:                                 ████
Render Tree:                                    ████
Layout:                                             ██
Paint:                                                ██
                                                       ↑
                                              First Paint: ~1200ms


AFTER OPTIMIZATION:
═══════════════════

Timeline (ms):  0    200    400    600    800
                │     │      │      │      │
HTML Parse:     ████████
Inline CSS:     ██ (critical CSS inlined)
JS (defer):     ████████████████ (downloading in parallel)
Render Tree:            ████
Layout:                     ██
Paint:                        ██
JS Execute:                      ████████ (after paint)
                               ↑
                      First Paint: ~500ms (58% faster!)
```

---

## 9. Reflow and Repaint

After the initial render, changes to the page trigger **Reflow** and/or **Repaint**:

```
┌─────────────────────────────────────────────────────────────────┐
│              REFLOW vs REPAINT                                    │
├──────────────────────────────┬──────────────────────────────────┤
│         REFLOW               │          REPAINT                  │
│    (Layout Change)           │      (Visual Change)              │
├──────────────────────────────┼──────────────────────────────────┤
│                              │                                  │
│  Triggered by:               │  Triggered by:                   │
│  - Changing width/height     │  - Changing color                │
│  - Adding/removing elements  │  - Changing background           │
│  - Changing font-size        │  - Changing visibility           │
│  - Resizing window           │  - Changing box-shadow           │
│  - Changing position         │  - Changing outline              │
│                              │                                  │
│  Cost: EXPENSIVE             │  Cost: MODERATE                  │
│  (recalculates layout        │  (only repaints pixels,          │
│   for affected elements      │   no layout change)              │
│   AND their children)        │                                  │
│                              │                                  │
│  Reflow ALWAYS triggers      │  Repaint does NOT               │
│  a Repaint after it          │  trigger a Reflow                │
│                              │                                  │
└──────────────────────────────┴──────────────────────────────────┘

Performance Tip:
  - Batch DOM changes together
  - Use transform/opacity for animations (GPU accelerated, no reflow)
  - Avoid reading layout properties in a loop (forces synchronous reflow)
```

---

## 10. Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                    CRP SUMMARY                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  The Critical Rendering Path:                                    │
│                                                                  │
│  HTML → DOM → CSSOM → Render Tree → Layout → Paint → Composite  │
│                                                                  │
│  Key Points:                                                     │
│  ───────────                                                     │
│  1. CSS is render-blocking (CSSOM needed before render)          │
│  2. JS is parser-blocking (pauses DOM construction)              │
│  3. Render Tree = DOM + CSSOM (only visible nodes)               │
│  4. Layout calculates geometry (position, size)                  │
│  5. Paint converts to pixels                                     │
│                                                                  │
│  Optimize by:                                                    │
│  ────────────                                                    │
│  1. Minimize critical resources (inline CSS, defer JS)           │
│  2. Minimize critical path length (fewer round trips)            │
│  3. Minimize critical bytes (minify, compress)                   │
│  4. Use resource hints (preload, prefetch, preconnect)           │
│  5. Avoid unnecessary reflows (batch DOM changes)                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 11. Interview Quick Reference

| Question                 | Answer                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| What is CRP?             | The sequence of steps browser takes to convert HTML/CSS/JS into pixels on screen               |
| What are the steps?      | HTML→DOM, CSS→CSSOM, DOM+CSSOM→Render Tree, Layout, Paint, Composite                           |
| What is render-blocking? | CSS blocks rendering until CSSOM is fully constructed                                          |
| What is parser-blocking? | JS blocks HTML parsing (DOM construction) until script executes                                |
| async vs defer?          | async: downloads parallel, executes immediately; defer: downloads parallel, executes after DOM |
| What is reflow?          | Recalculating layout when geometry changes (expensive)                                         |
| What is repaint?         | Redrawing pixels when visual properties change (cheaper than reflow)                           |
| How to optimize CRP?     | Inline critical CSS, defer JS, minimize resources, use resource hints                          |
| What is FOUC?            | Flash of Unstyled Content - when page renders before CSS loads                                 |
