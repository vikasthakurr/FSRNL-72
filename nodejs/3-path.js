// TOPIC: The Path module in Node.js

// What is it?
// The built-in `path` module helps you work with file and folder paths
// safely. Different operating systems use different separators (Windows
// uses "\" while Mac/Linux use "/"). The path module handles these
// differences for you, so you don't build paths by hand with string joins.
// It is a core module, so no npm install is needed.

import path from "path";

// path.extname(p)
// Returns the FILE EXTENSION (including the dot).
// console.log(path.extname("abc.txt")); // ".txt"

// path.dirname(p)
// Returns the DIRECTORY (folder) part of a path.
// console.log(path.dirname("abc.txt")); // "." (current folder here)

// path.join(...segments)
// Joins path pieces together using the correct separator for the OS.
// console.log(path.join("parent", "child", "subchild", "vikas.pdf"));
// -> "parent/child/subchild/vikas.pdf"

// path.parse(p)
// Breaks a path into an object: { root, dir, base, ext, name }.
// console.log(path.parse("abc.txt"));
// -> { root: '', dir: '', base: 'abc.txt', ext: '.txt', name: 'abc' }

// path.resolve(...segments)
// Builds an ABSOLUTE path from the current working directory.
// console.log(path.resolve("abc.txt"));
// -> e.g. "/Users/you/project/abc.txt"

// path.normalize(p)
// Cleans up a messy path (extra slashes, "." and "..") into a tidy one.
// console.log(path.normalize(".../../parent/child/abc.pdf"));

// path.isAbsolute(p)
// Returns true/false: is this an absolute path (starts from the root)?
// console.log(path.isAbsolute("abc.txt")); // false (it's relative)

// Quick recap:
// - path builds and reads file paths safely across operating systems.
// - extname -> extension,  dirname -> folder,  basename -> file name.
// - join    -> glue pieces,  resolve -> make an absolute path.
// - parse   -> split into parts,  normalize -> clean a messy path.
// - isAbsolute -> check if a path is absolute.
