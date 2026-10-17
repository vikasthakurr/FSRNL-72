// TOPIC: Events & EventEmitter in Node.js

// What is it?
// Node.js is "event-driven": a lot of its code runs when something
// happens (an event). The built-in `events` module gives us the
// EventEmitter class to create our own events, listen for them, and
// trigger them. It is a core module, so no npm install is needed.

// Simple real-life analogy (from the lines below):
// You tell someone "when the water boils, make the Maggi".
//   - "water boils" = the event
//   - "make the Maggi" = the listener (the function that reacts)
// The cook doesn't stand and wait; they react only when the event fires.
//
// rawmaggi  <----- waterboil        (raw maggi waits for water to boil)
// raw-flag  <----- waterboil()      (reaction happens when the event is emitted)

import { EventEmitter } from "events";

// Create an emitter object. It can register listeners and fire events.
const emitter = new EventEmitter();

// emitter.on(eventName, listener)
// REGISTERS a listener: "when the 'greet' event happens, run this function."
// Note: the event name is just a label; the function can do anything.
emitter.on("greet", () => {
  console.log("bye");
});

// Another listener, this one for the "bye" event.
emitter.on("bye", () => {
  console.log("acha hua chla gya");
});

// emitter.emit(eventName)
// FIRES (triggers) the event, which runs every listener registered for it.
emitter.emit("greet"); // runs the "greet" listener -> prints "bye"
emitter.emit("bye"); // runs the "bye" listener   -> prints "acha hua chla gya"

// Order matters: you must register a listener with .on() BEFORE you
// .emit() the event, otherwise there is nothing to run.

// Useful related methods:
// - emitter.once(name, fn) : listener runs only the FIRST time, then is removed
// - emitter.off(name, fn)  : removes a specific listener
// - emitter.emit(name, a, b): you can pass data to listeners -> (a, b) => {}

// Quick recap:
// - events module gives EventEmitter for custom events.
// - .on(name, fn)   = listen for an event.
// - .emit(name)     = fire the event (runs its listeners).
// - .once(name, fn) = listen only one time.
// - register listeners BEFORE emitting.
