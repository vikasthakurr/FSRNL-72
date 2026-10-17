// TOPIC: Modules & Imports in Node.js

// What is a module?
// A module is just a file. Node.js lets you split code into many files
// and share them using `export` and `import`. This keeps code organized
// and reusable.

// Two module systems:
// 1) CommonJS (older, default): uses require() and module.exports
//      const x = require("./file.js")
//      module.exports = value
// 2) ES Modules / ESM (modern, used here): uses import / export
//      import { PI } from "./maths.js"
//      export const PI = 3.14

// To use import/export in .js files you must either:
//   - add  "type": "module"  in package.json  (recommended), or
//   - rename the file to  .mjs
// Otherwise Node treats it as CommonJS and `import` throws an error.

// Named vs default imports:
//   - Named import uses braces and the name must match the export:
//       import { PI, add } from "./maths.js";
//   - Default import can use any name and has no braces:
//       import figlet from "figlet";

// Local module vs npm package:
//   - Local file  -> path starts with ./ or ../   e.g. "./maths.js"
//   - npm package -> just the name               e.g. "figlet"
//     (install first:  npm install figlet)

// Example 1: importing from our own local module (maths.js)
// PI and add are named exports inside maths.js, so names must match.
// import { PI, add } from "./maths.js";
// console.log(add(4, 5)); // 9
// console.log(PI);        // 3.14...

// Example 2: importing a third-party npm package (figlet)
// figlet turns text into big ASCII-art banners.
// `figlet` is a default import, so no braces are used.
// import figlet from "figlet";

// figlet(text, callback) runs in the background and then calls our
// callback with (err, data). This is Node's "error-first callback":
//   - on failure: err is filled, data is undefined
//   - on success: err is null, data holds the result
// Always check err first.
// figlet("Vikas Thakur!!", function (err, data) {
//   if (err) {
//     console.log("Something went wrong...");
//     console.dir(err); // prints the object with full detail
//     return;           // stop so we don't use missing data
//   }
//   console.log(data);  // the generated ASCII-art banner
// });

// Quick recap:
// - A file = a module. Share code with export / import.
// - Enable ESM with "type": "module" in package.json.
// - { } = named import (must match).  No { } = default import.
// - "./file.js" = local file.  "name" = installed npm package.
// - Node uses error-first callbacks: check `err` first.
