// TOPIC: RESTful Architecture & API Contracts
//
// ==========================================================================
// PART 1 — WHAT IS REST?
// ==========================================================================
//
// REST = REpresentational State Transfer.
// It is an architectural STYLE (a set of rules/conventions), not a framework
// or a protocol. It describes HOW a client and a server should talk over HTTP.
//
// An API that follows these rules is called "RESTful".
//
// Core idea:
//   - Everything is a RESOURCE (a user, a product, an order...).
//   - Each resource is identified by a URL (also called an endpoint).
//   - You act on resources using standard HTTP METHODS (verbs).
//   - The server sends back a REPRESENTATION of the resource (usually JSON).
//
//
// ==========================================================================
// PART 2 — THE 6 REST CONSTRAINTS (the rules that make an API "RESTful")
// ==========================================================================
//
// 1. Client–Server
//    The client (UI) and server (data) are separate. They can evolve
//    independently as long as the contract between them stays the same.
//
// 2. Stateless
//    Every request must carry ALL the information needed to handle it.
//    The server does NOT remember anything about previous requests.
//    (e.g. the auth token is sent on every request, not stored server-side.)
//
// 3. Cacheable
//    Responses should say whether they can be cached, so clients/proxies can
//    reuse them and reduce load.
//
// 4. Uniform Interface
//    A consistent, predictable way to interact: resource URLs + HTTP methods.
//    This is the most important constraint for day-to-day API design.
//
// 5. Layered System
//    There may be intermediaries (load balancers, gateways, caches) between
//    client and server; the client doesn't need to know.
//
// 6. Code on Demand (optional)
//    The server MAY send executable code (rare, e.g. JS snippets).
//
//
// ==========================================================================
// PART 3 — HTTP METHODS (the "verbs" of REST)
// ==========================================================================
//
//   METHOD   PURPOSE                     SAFE?   IDEMPOTENT?
//   ------   -------                     -----   -----------
//   GET      read / fetch a resource     yes     yes
//   POST     create a new resource       no      no
//   PUT      replace a resource fully    no      yes
//   PATCH    update a resource partly    no      no
//   DELETE   remove a resource           no      yes
//
//   - SAFE       = does not change server data (only GET).
//   - IDEMPOTENT = calling it many times has the SAME effect as calling once
//                  (GET, PUT, DELETE). POST is NOT idempotent — two POSTs
//                  usually create two resources.
//
//
// ==========================================================================
// PART 4 — RESOURCE NAMING (good URL design)
// ==========================================================================
//
// Rules of thumb:
//   - Use NOUNS for resources, not verbs. The HTTP method is the verb.
//       good:  GET /users          bad:  GET /getUsers
//   - Use PLURAL nouns for collections.
//       /users      → the collection of all users
//       /users/42   → a single user with id 42
//   - Nest to show relationships.
//       /users/42/orders       → all orders belonging to user 42
//       /users/42/orders/7     → order 7 of user 42
//   - Use query params for filtering/sorting/pagination, not new endpoints.
//       /products?category=shoes&sort=price&page=2
//   - Keep it lowercase and hyphenated for multi-word paths: /order-items
//
// Typical CRUD mapping for a "users" resource:
//   GET    /users        → list all users
//   GET    /users/:id    → get one user
//   POST   /users        → create a new user
//   PUT    /users/:id    → replace a user
//   PATCH  /users/:id    → update part of a user
//   DELETE /users/:id    → delete a user
//
//
// ==========================================================================
// PART 5 — HTTP STATUS CODES (what the server tells the client)
// ==========================================================================
//
//   2xx — SUCCESS
//     200 OK                 → request succeeded (GET/PUT/PATCH).
//     201 Created            → new resource created (POST).
//     204 No Content         → success but nothing to return (often DELETE).
//
//   3xx — REDIRECTION
//     301 Moved Permanently  → resource lives at a new URL.
//     304 Not Modified       → cached copy is still valid.
//
//   4xx — CLIENT ERROR (the caller did something wrong)
//     400 Bad Request        → malformed request / invalid data.
//     401 Unauthorized       → not authenticated (no/invalid credentials).
//     403 Forbidden          → authenticated but not allowed.
//     404 Not Found          → resource does not exist.
//     409 Conflict           → e.g. duplicate resource.
//     422 Unprocessable      → validation failed.
//
//   5xx — SERVER ERROR (the server failed)
//     500 Internal Server Error → unexpected error on the server.
//     503 Service Unavailable   → server down / overloaded.
//
//
// ==========================================================================
// PART 6 — WHAT IS AN API CONTRACT?
// ==========================================================================
//
// An API contract is the AGREEMENT between the API provider (server/backend)
// and the API consumer (client/frontend) about EXACTLY how the API behaves.
// It is the "promise" the server makes and the client relies on.
//
// Think of it like a legal contract: as long as both sides follow it, the
// frontend and backend teams can work independently and in parallel.
//
// A good API contract defines:
//
//   1. ENDPOINTS      — the available URLs and which HTTP methods they accept.
//                       e.g. GET /users/:id
//
//   2. REQUEST SHAPE  — what the client must send:
//                         - path params   (/users/:id)
//                         - query params  (?page=2)
//                         - headers        (Authorization, Content-Type)
//                         - request body   (which fields, which types, which
//                                           are required vs optional)
//
//   3. RESPONSE SHAPE — what the server sends back:
//                         - status code
//                         - response body structure (field names & types)
//                         - headers
//
//   4. ERROR FORMAT   — a CONSISTENT shape for errors so clients can handle
//                       them uniformly, e.g.:
//                         { "error": { "code": "...", "message": "..." } }
//
//   5. AUTH RULES     — how the client authenticates (e.g. Bearer token),
//                       and which endpoints require it.
//
//   6. VERSIONING     — how changes are introduced without breaking old
//                       clients, usually via the URL: /api/v1/users, /api/v2/...
//
//
// ==========================================================================
// PART 7 — WHY CONTRACTS MATTER + HOW THEY ARE DOCUMENTED
// ==========================================================================
//
// Why they matter:
//   - Frontend and backend can build in PARALLEL against the agreed contract.
//   - Clients know exactly what to send and what to expect (fewer surprises).
//   - Breaking the contract (renaming a field, changing a status code) breaks
//     clients — so contracts are changed carefully and versioned.
//   - Enables automated testing, mocking, and auto-generated client code.
//
// How contracts are written/shared:
//   - OpenAPI / Swagger : the most common standard; a machine-readable spec
//                         (YAML/JSON) describing every endpoint. It can
//                         generate docs, mock servers, and client SDKs.
//   - Postman collections : shareable, runnable request examples.
//   - API Blueprint / RAML : alternative specification formats.
//
//
// ==========================================================================
// QUICK RECAP
// ==========================================================================
//   - REST is an architectural STYLE for HTTP APIs built around RESOURCES.
//   - Resources = nouns in URLs; actions = HTTP methods (GET/POST/PUT/
//     PATCH/DELETE).
//   - Follow the 6 constraints; "stateless" and "uniform interface" matter most.
//   - Use the right status codes (2xx success, 4xx client error, 5xx server).
//   - An API contract is the agreed promise: endpoints, request/response
//     shapes, errors, auth, and versioning.
//   - Document the contract with OpenAPI/Swagger so client and server stay
//     in sync and can evolve safely.
