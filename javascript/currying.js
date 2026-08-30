// function autoMailer(to, subject, body) {
//   console.log(
//     `mail has been sent to ${to} with subject of ${subject} and body is ${body}`,
//   );
// }
// autoMailer("welcome to mernstack", "hi this is body of mern");

// ===== CURRYING NOTES =====
// Currying = transforming a function that takes MANY arguments into a
// chain of functions that each take ONE argument.
//
// Normal:   autoMailer(to, subject, body)
// Curried:  autoMailer(to)(subject)(body)
//
// How it works below (this relies on CLOSURES):
// 1. autoMailer("vikas@gmail.com") runs and returns a function that
//    "remembers" `to`.
// 2. Calling that with ("welcome to js") returns another function that
//    remembers both `to` and `sub`.
// 3. Calling that with ("hi this is body") finally has all 3 values and
//    runs the console.log.
//
// Why useful:
// - Reuse: fix some arguments now, supply the rest later.
//     const mailToVikas = autoMailer("vikas@gmail.com");
//     mailToVikas("subject A")("body A");
//     mailToVikas("subject B")("body B");
// - Builds cleaner, composable functions.
function autoMailer(to) {
  return function (sub) {
    return function (body) {
      console.log(
        `mail has been sent to ${to} with subject of ${sub} and body is ${body}`,
      );
    };
  };
}
// Each pair of () supplies one argument to the next inner function.
autoMailer("vikas@gmail.com")("welcome to js")("'hi this is body")
