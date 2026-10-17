// TOPIC: The File System (fs) module in Node.js

// What is it?
// The built-in `fs` module lets your program work with files and folders:
// create, read, update (append), and delete. It is a core module, so no
// npm install is needed.

// Synchronous vs Asynchronous (important):
//  - Sync methods end in "Sync" (writeFileSync). They BLOCK: Node waits
//    for the operation to finish before running the next line. Simple,
//    but can freeze the app.
//  - Async methods (writeFile, readFile) are NON-BLOCKING. Node starts
//    the work in the background and calls your callback when done. This
//    keeps apps fast, so async is preferred in real projects.

// Error-first callback pattern:  (err, data) => { ... }
// The first argument is always the error (null if all went fine).
// Always check `err` before using `data`.

// Note: there is also a Promise-based API `fs/promises` that works with
// async/await. The examples below use the classic callback style.

import fs from "fs";

// 1) Write a file (synchronous)
// writeFileSync(path, content)
//   - creates the file if it does not exist
//   - OVERWRITES all content if it already exists
//   - blocks until writing is done
// fs.writeFileSync("vikas.txt", "hello from nodejs");
// fs.writeFileSync("vikas.txt", "hi from file handling"); // overwrites above

// 2) Write a file (asynchronous)
// writeFile(path, content, callback)
//   - same as above but non-blocking; result comes in the callback
//   - also overwrites existing content
// fs.writeFile(
//   "log.txt",
//   `user has entered in class at this time ${Date.now()}`, // Date.now() = ms timestamp
//   (err, data) => {
//     if (err) return err; // if writing failed, stop and surface the error
//     console.log("file has been created");
//   },
// );

// 3) Append to a file (asynchronous)
// appendFile(path, content, callback)
//   - ADDS content to the END of the file (does not erase old data)
//   - creates the file if it doesn't exist
//   - the leading "\n" starts the new text on a new line
// fs.appendFile(
//   "log.txt",
//   `\n user has entered in class at this time ${Date.now()}`,
//   (err, data) => {
//     if (err) return err;
//     console.log("file has been updated");
//   },
// );

// 4) Read a file (asynchronous)
// readFile(path, encoding, callback)
//   - without encoding you get raw bytes (a Buffer)
//   - passing "utf-8" returns readable text (a string)
// fs.readFile("log.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log("error while reading the file", err.message);
//     return; // stop so we don't log undefined data
//   }
//   console.log("data is:", data);
// });

// 5) Delete a file (asynchronous)
// unlink(path, callback)
//   - "unlink" is the classic name for removing a file
//   - errors if the file does not exist, so handle `err`
// fs.unlink("vikas.txt", (err) => {
//   if (err) {
//     console.log("error while deleting file", err.message);
//     return;
//   }
//   console.log("file deleted");
// });

// Quick recap:
// - fs = core module to Create, Read, Update, Delete files (CRUD).
// - "...Sync" methods block; plain methods are async with callbacks.
// - writeFile OVERWRITES; appendFile ADDS to the end.
// - pass "utf-8" to readFile to get text instead of a Buffer.
// - unlink() deletes a file.
// - always check the error-first `err` argument.
