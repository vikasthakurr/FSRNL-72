// TOPIC: Reading the request body with the http module (streams)

// What is it?
// This builds a raw http server (like 5-http.js) but focuses on reading
// the REQUEST BODY, the data a client sends in a POST/PUT request.
// In raw Node, the body does NOT arrive all at once. It comes in pieces
// called "chunks" through events, so we listen for those events and
// stitch the pieces together.

// The request is a "stream" and emits events:
//  - "data"  : fires repeatedly, once per chunk of body data
//  - "end"   : fires once, when the whole body has arrived
//  - "error" : fires if something goes wrong while reading

import http from "http";

const server = http.createServer((req, res) => {
  // Start with an empty string; we will build the full body here.
  let body = "";

  // "data" event: each chunk is a Buffer, so .toString() turns it into
  // text, and we append it to body. This runs multiple times for big data.
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  // "end" event: the whole body has now been received, so it is safe to
  // use it and send the response.
  req.on("end", () => {
    console.log("method", req.method); // GET, POST, etc.
    console.log("url", req.url); // requested path
    console.log("headers", req.headers); // all request headers
    console.log("body", body); // the full body text we collected

    // res.writeHead(statusCode, headersObject)
    // Sends the status line + response headers in one call.
    // 200 = OK. Content-Type tells the client we return JSON.
    // Access-Control-Allow-Origin "*" enables CORS (allows browsers on
    // other origins to call this server).
    res.writeHead(200, {
      "Content-Type": "application/json",
      author: "vikas",
      "Access-Control-Allow-Origin": "*",
    });

    // res.end(data) sends the body and finishes the response.
    // JSON.stringify() converts a JS object into a JSON text string,
    // which is what we promised via the Content-Type header.
    res.end(
      JSON.stringify({
        message: "hello world",
        body: body,
      }),
    );
  });

  // "error" event: handle problems while reading the request.
  req.on("error", (err) => {
    console.log("error", err);
  });
});

server.listen(3000, () => {
  console.log("server is up and running");
});

// Flow summary (from the notes at the bottom):
// body  -> each chunk is converted to a string and appended to `body`
// end   -> now we have url, method, headers, body; send status 200 + response

// Quick recap:
// - A request body arrives in CHUNKS via stream events, not all at once.
// - "data"  -> collect chunks (append as strings).
// - "end"   -> body complete; read req info and send the response.
// - "error" -> handle read failures.
// - res.writeHead(status, headers) sets the status + headers together.
// - JSON.stringify(obj) converts an object to JSON text before sending.
