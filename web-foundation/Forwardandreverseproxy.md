# Forward Proxy and Reverse Proxy

## Overview

A **proxy** is an intermediary server that sits between a client and a server. It forwards requests on behalf of one side. There are two main types:

- **Forward Proxy** — sits in front of clients (protects/hides the client)
- **Reverse Proxy** — sits in front of servers (protects/hides the server)

---

## 1. What is a Proxy?

A proxy is a server that acts as a **middleman** between a client and a destination server. Instead of communicating directly, traffic passes through the proxy.

```
WITHOUT PROXY:
══════════════
┌────────┐                              ┌────────┐
│ Client │ ────── Direct Request ──────▶│ Server │
│        │ ◀───── Direct Response ──────│        │
└────────┘                              └────────┘


WITH PROXY:
═══════════
┌────────┐          ┌───────┐          ┌────────┐
│ Client │ ────────▶│ Proxy │─────────▶│ Server │
│        │ ◀────────│       │◀─────────│        │
└────────┘          └───────┘          └────────┘
                  (Intermediary)
```

---

## 2. Forward Proxy

### What is it?

A **Forward Proxy** sits in front of **clients** and forwards their requests to the internet/servers. The server only sees the proxy's IP, not the client's real IP.

> Think of it as: Client → Forward Proxy → Internet/Server

### Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        FORWARD PROXY                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   INTERNAL NETWORK                    │         INTERNET            │
│   (Private)                           │         (Public)            │
│                                       │                             │
│  ┌──────────┐                         │                             │
│  │ Client A │──┐                      │       ┌──────────┐         │
│  └──────────┘  │                      │       │ Server 1 │         │
│                │    ┌──────────────┐  │       └──────────┘         │
│  ┌──────────┐  ├───▶│   FORWARD    │──┼──────▶                     │
│  │ Client B │──┤    │    PROXY     │  │       ┌──────────┐         │
│  └──────────┘  │    └──────────────┘  │       │ Server 2 │         │
│                │     (Hides clients)  │       └──────────┘         │
│  ┌──────────┐  │                      │                             │
│  │ Client C │──┘                      │       ┌──────────┐         │
│  └──────────┘                         │       │ Server 3 │         │
│                                       │       └──────────┘         │
│                                       │                             │
│   Server sees PROXY IP               │                             │
│   NOT Client's real IP                │                             │
│                                       │                             │
└─────────────────────────────────────────────────────────────────────┘
```

### How Forward Proxy Works

```
Step-by-step:
─────────────

1. Client wants to access www.example.com
2. Client sends request to Forward Proxy
3. Forward Proxy checks rules (allowed? cached?)
4. Forward Proxy forwards request to www.example.com
5. Server responds to Forward Proxy
6. Forward Proxy sends response back to Client

┌────────┐         ┌────────────────┐         ┌───────────────┐
│ Client │         │ Forward Proxy  │         │  www.example  │
│        │         │                │         │    .com       │
└───┬────┘         └───────┬────────┘         └──────┬────────┘
    │                      │                         │
    │  1. "I want to       │                         │
    │     visit example"   │                         │
    │─────────────────────▶│                         │
    │                      │                         │
    │                      │  2. Forward request     │
    │                      │     (with proxy IP)     │
    │                      │────────────────────────▶│
    │                      │                         │
    │                      │  3. Response            │
    │                      │◀────────────────────────│
    │                      │                         │
    │  4. Forward response │                         │
    │◀─────────────────────│                         │
    │                      │                         │
```

### Use Cases of Forward Proxy

| Use Case                    | Description                                                  |
| --------------------------- | ------------------------------------------------------------ |
| **Anonymity**               | Hide client's real IP address from servers                   |
| **Content Filtering**       | Block access to certain websites (corporate/school networks) |
| **Caching**                 | Cache frequently accessed content to reduce bandwidth        |
| **Access Control**          | Control which users can access which resources               |
| **Bypass Geo-restrictions** | Access content blocked in your region                        |
| **Monitoring**              | Log and monitor user activity                                |
| **Bandwidth Saving**        | Compress traffic, serve cached content                       |

### Real-World Examples

- **Corporate networks** — Companies use forward proxies to control employee internet access
- **School/University** — Block social media, gaming sites during class hours
- **VPN services** — VPNs act like forward proxies to hide user identity
- **Squid Proxy** — Popular open-source forward proxy
- **Web Scraping** — Use proxy rotation to avoid IP bans

---

## 3. Reverse Proxy

### What is it?

A **Reverse Proxy** sits in front of **servers** and receives requests from clients on behalf of the servers. The client only sees the proxy's IP, not the actual backend server.

> Think of it as: Client → Reverse Proxy → Backend Server(s)

### Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        REVERSE PROXY                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│    INTERNET                   │         INTERNAL NETWORK            │
│    (Public)                   │         (Private/Protected)         │
│                               │                                     │
│                               │         ┌──────────────┐           │
│                               │    ┌───▶│  Server A    │           │
│  ┌──────────┐                 │    │    │  (App 1)     │           │
│  │ Client A │──┐              │    │    └──────────────┘           │
│  └──────────┘  │  ┌────────────────┤                               │
│                ├─▶│   REVERSE  │   │    ┌──────────────┐           │
│  ┌──────────┐  │  │    PROXY   │───┼───▶│  Server B    │           │
│  │ Client B │──┤  │            │   │    │  (App 2)     │           │
│  └──────────┘  │  └────────────────┤    └──────────────┘           │
│                │              │    │                               │
│  ┌──────────┐  │              │    │    ┌──────────────┐           │
│  │ Client C │──┘              │    └───▶│  Server C    │           │
│  └──────────┘                 │         │  (App 3)     │           │
│                               │         └──────────────┘           │
│   Client sees PROXY IP        │                                     │
│   NOT Server's real IP        │    Servers are HIDDEN               │
│                               │    from the internet                │
└─────────────────────────────────────────────────────────────────────┘
```

### How Reverse Proxy Works

```
Step-by-step:
─────────────

1. Client sends request to www.example.com (which is actually the reverse proxy)
2. Reverse Proxy receives the request
3. Reverse Proxy decides which backend server should handle it
4. Reverse Proxy forwards request to the chosen backend server
5. Backend server processes and responds
6. Reverse Proxy sends the response back to the client

┌────────┐         ┌────────────────┐         ┌───────────────┐
│ Client │         │ Reverse Proxy  │         │ Backend Server│
│        │         │ (Nginx/HAProxy)│         │  (App Server) │
└───┬────┘         └───────┬────────┘         └──────┬────────┘
    │                      │                         │
    │  1. Request to       │                         │
    │     example.com      │                         │
    │─────────────────────▶│                         │
    │                      │                         │
    │                      │  2. Route to backend    │
    │                      │     (load balance)      │
    │                      │────────────────────────▶│
    │                      │                         │
    │                      │  3. Response            │
    │                      │◀────────────────────────│
    │                      │                         │
    │  4. Forward response │                         │
    │◀─────────────────────│                         │
    │                      │                         │
    │  Client thinks it's  │                         │
    │  talking to one      │                         │
    │  server directly     │                         │
```

### Use Cases of Reverse Proxy

| Use Case                     | Description                                            |
| ---------------------------- | ------------------------------------------------------ |
| **Load Balancing**           | Distribute traffic across multiple backend servers     |
| **SSL Termination**          | Handle HTTPS encryption/decryption at proxy level      |
| **Caching**                  | Cache responses to reduce backend load                 |
| **Security**                 | Hide backend server details, protect from DDoS         |
| **Compression**              | Compress responses before sending to client            |
| **URL Routing**              | Route requests to different backends based on URL path |
| **Rate Limiting**            | Control the rate of incoming requests                  |
| **Web Application Firewall** | Filter malicious requests                              |

### Real-World Examples

- **Nginx** — Most popular reverse proxy / web server
- **HAProxy** — High-performance TCP/HTTP load balancer
- **AWS ALB/ELB** — Cloud-based reverse proxy (load balancer)
- **Cloudflare** — CDN + reverse proxy for DDoS protection
- **Traefik** — Modern reverse proxy for containers/microservices
- **Apache HTTP Server** — Can be configured as reverse proxy

---

## 4. Load Balancing with Reverse Proxy

```
┌─────────────────────────────────────────────────────────────────────┐
│               LOAD BALANCING ALGORITHMS                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. ROUND ROBIN                                                     │
│  ──────────────                                                     │
│  Request 1 → Server A                                               │
│  Request 2 → Server B                                               │
│  Request 3 → Server C                                               │
│  Request 4 → Server A  (cycles back)                                │
│                                                                     │
│  2. WEIGHTED ROUND ROBIN                                            │
│  ────────────────────────                                           │
│  Server A (weight: 3) → Gets 3 out of 6 requests                   │
│  Server B (weight: 2) → Gets 2 out of 6 requests                   │
│  Server C (weight: 1) → Gets 1 out of 6 requests                   │
│                                                                     │
│  3. LEAST CONNECTIONS                                               │
│  ─────────────────────                                              │
│  Send to whichever server has fewest active connections             │
│                                                                     │
│  4. IP HASH                                                         │
│  ──────────                                                         │
│  Same client IP always goes to same server                          │
│  (useful for session persistence)                                   │
│                                                                     │
│  5. LEAST RESPONSE TIME                                             │
│  ───────────────────────                                            │
│  Send to server with fastest response time                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Load Balancing Diagram

```
                    ┌─────────────┐
                    │   Clients   │
                    └──────┬──────┘
                           │
                           ▼
                ┌────────────────────┐
                │   REVERSE PROXY    │
                │   (Load Balancer)  │
                │                    │
                │  Algorithm:        │
                │  Round Robin       │
                └───┬─────┬─────┬───┘
                    │     │     │
            ┌───────┘     │     └───────┐
            │             │             │
            ▼             ▼             ▼
     ┌────────────┐ ┌────────────┐ ┌────────────┐
     │  Server A  │ │  Server B  │ │  Server C  │
     │  (33%)     │ │  (33%)     │ │  (33%)     │
     │            │ │            │ │            │
     │ ┌────────┐ │ │ ┌────────┐ │ │ ┌────────┐ │
     │ │  App   │ │ │ │  App   │ │ │ │  App   │ │
     │ └────────┘ │ │ └────────┘ │ │ └────────┘ │
     └────────────┘ └────────────┘ └────────────┘
```

---

## 5. SSL Termination with Reverse Proxy

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SSL TERMINATION                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  WITHOUT SSL Termination:                                           │
│  ─────────────────────────                                          │
│  Client ──HTTPS──▶ Server A (needs SSL cert)                       │
│  Client ──HTTPS──▶ Server B (needs SSL cert)                       │
│  Client ──HTTPS──▶ Server C (needs SSL cert)                       │
│  (Every server must handle encryption/decryption)                   │
│                                                                     │
│                                                                     │
│  WITH SSL Termination (at Reverse Proxy):                           │
│  ──────────────────────────────────────────                         │
│                                                                     │
│  ┌────────┐  HTTPS   ┌───────────────┐  HTTP   ┌──────────┐       │
│  │ Client │─────────▶│ Reverse Proxy │────────▶│ Server A │       │
│  └────────┘ encrypted│ (SSL Cert)    │ plain   └──────────┘       │
│                      │               │ text    ┌──────────┐       │
│                      │ Decrypts here │────────▶│ Server B │       │
│                      └───────────────┘         └──────────┘       │
│                                                                     │
│  Benefits:                                                          │
│  - Only ONE place to manage SSL certificates                        │
│  - Backend servers don't waste CPU on encryption                    │
│  - Easier certificate renewal                                       │
│  - Internal traffic can be plain HTTP (faster)                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 6. Forward Proxy vs Reverse Proxy - Key Differences

```
┌─────────────────────────────────────────────────────────────────────┐
│              FORWARD PROXY vs REVERSE PROXY                          │
├────────────────────────────────┬────────────────────────────────────┤
│       FORWARD PROXY            │        REVERSE PROXY               │
├────────────────────────────────┼────────────────────────────────────┤
│                                │                                    │
│  Client ──▶ [PROXY] ──▶ Server│  Client ──▶ [PROXY] ──▶ Server    │
│                                │                                    │
│  Sits on CLIENT side           │  Sits on SERVER side               │
│                                │                                    │
│  Hides the CLIENT              │  Hides the SERVER                  │
│  (server doesn't know client)  │  (client doesn't know server)     │
│                                │                                    │
│  Client KNOWS about proxy      │  Client DOESN'T know about proxy  │
│  (configured manually)         │  (transparent to client)          │
│                                │                                    │
│  Protects client identity      │  Protects server infrastructure   │
│                                │                                    │
│  Used for:                     │  Used for:                        │
│  - Anonymity                   │  - Load balancing                 │
│  - Content filtering           │  - SSL termination               │
│  - Bypass restrictions         │  - Caching                       │
│  - Monitoring users            │  - Security/DDoS protection      │
│                                │                                    │
│  Examples:                     │  Examples:                        │
│  - Squid                       │  - Nginx                         │
│  - VPN                         │  - HAProxy                       │
│  - Corporate proxy             │  - AWS ALB/ELB                   │
│  - Tor network                 │  - Cloudflare                    │
│                                │                                    │
└────────────────────────────────┴────────────────────────────────────┘
```

### Comparison Table

| Feature              | Forward Proxy               | Reverse Proxy                            |
| -------------------- | --------------------------- | ---------------------------------------- |
| **Position**         | Client side                 | Server side                              |
| **Hides**            | Client identity             | Server identity                          |
| **Client awareness** | Client knows about proxy    | Client unaware of proxy                  |
| **Primary purpose**  | Client protection & control | Server protection & optimization         |
| **Configuration**    | Client must configure it    | Server-side setup, transparent to client |
| **Caching**          | Caches for clients          | Caches for servers                       |
| **Typical users**    | End users, employees        | Website/API operators                    |
| **Scale**            | Handles outbound traffic    | Handles inbound traffic                  |

---

## 7. Combined Architecture (Real World)

In production, both proxy types are often used together:

```
┌─────────────────────────────────────────────────────────────────────┐
│               REAL-WORLD ARCHITECTURE                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  CORPORATE OFFICE              INTERNET           DATA CENTER       │
│  ════════════════              ════════           ═══════════       │
│                                                                     │
│  ┌──────────┐                                    ┌──────────────┐  │
│  │Employee A│─┐                                  │  Server A    │  │
│  └──────────┘ │                                  └──────┬───────┘  │
│               │  ┌──────────┐       ┌──────────┐       │          │
│  ┌──────────┐ ├─▶│ FORWARD  │──────▶│ REVERSE  │───────┤          │
│  │Employee B│─┤  │  PROXY   │       │  PROXY   │       │          │
│  └──────────┘ │  │          │       │ (Nginx)  │       │          │
│               │  │(Squid)   │       └──────────┘  ┌────┴─────┐   │
│  ┌──────────┐ │  └──────────┘                     │  Server B │   │
│  │Employee C│─┘                                   └──────────┘   │
│  └──────────┘                                                     │
│                                                                     │
│  Forward Proxy:             Reverse Proxy:                          │
│  - Filters websites         - Load balances                        │
│  - Logs activity            - SSL termination                      │
│  - Caches content           - Hides servers                        │
│  - Hides employee IPs       - Caches responses                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 8. Nginx as Reverse Proxy - Configuration Example

```nginx
# Basic Nginx Reverse Proxy Configuration

# Load balancing across multiple backend servers
upstream backend_servers {
    server 192.168.1.10:3000;   # App Server 1
    server 192.168.1.11:3000;   # App Server 2
    server 192.168.1.12:3000;   # App Server 3
}

server {
    listen 80;
    server_name www.example.com;

    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name www.example.com;

    # SSL Termination
    ssl_certificate     /etc/ssl/certs/example.crt;
    ssl_certificate_key /etc/ssl/private/example.key;

    # Reverse Proxy - forward to backend
    location / {
        proxy_pass http://backend_servers;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Caching static assets
    location /static/ {
        proxy_pass http://backend_servers;
        proxy_cache_valid 200 1d;
        expires 1d;
    }

    # API routing
    location /api/ {
        proxy_pass http://backend_servers;
        proxy_read_timeout 90s;
    }
}
```

---

## 9. CDN as Reverse Proxy

A **CDN (Content Delivery Network)** is essentially a globally distributed reverse proxy:

```
┌─────────────────────────────────────────────────────────────────────┐
│                CDN AS REVERSE PROXY                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  User in India         User in USA          User in Europe          │
│       │                     │                    │                   │
│       ▼                     ▼                    ▼                   │
│  ┌──────────┐         ┌──────────┐         ┌──────────┐           │
│  │CDN Edge  │         │CDN Edge  │         │CDN Edge  │           │
│  │Mumbai    │         │New York  │         │London    │           │
│  │(Cache)   │         │(Cache)   │         │(Cache)   │           │
│  └────┬─────┘         └────┬─────┘         └────┬─────┘           │
│       │                     │                    │                   │
│       │    Cache MISS?      │                    │                   │
│       └─────────────────────┼────────────────────┘                  │
│                             │                                       │
│                             ▼                                       │
│                    ┌─────────────────┐                              │
│                    │  Origin Server  │                              │
│                    │  (Your Server)  │                              │
│                    └─────────────────┘                              │
│                                                                     │
│  - Cache HIT → Serve from nearest edge (fast!)                     │
│  - Cache MISS → Fetch from origin, cache it, then serve            │
│                                                                     │
│  Examples: Cloudflare, AWS CloudFront, Akamai, Fastly              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 10. Security Benefits

```
┌─────────────────────────────────────────────────────────────────────┐
│               SECURITY WITH PROXIES                                  │
├──────────────────────────────────┬──────────────────────────────────┤
│     FORWARD PROXY SECURITY       │    REVERSE PROXY SECURITY        │
├──────────────────────────────────┼──────────────────────────────────┤
│                                  │                                  │
│  1. IP Masking                   │  1. Hide Server IPs              │
│     - Hides client real IP       │     - Attackers can't target     │
│     - Harder to track users      │       actual servers directly    │
│                                  │                                  │
│  2. Content Filtering            │  2. DDoS Protection              │
│     - Block malware sites        │     - Absorb attack traffic      │
│     - Prevent phishing           │     - Rate limiting              │
│                                  │                                  │
│  3. Data Loss Prevention         │  3. WAF (Web App Firewall)       │
│     - Scan outgoing data         │     - Block SQL injection        │
│     - Prevent leaks              │     - Block XSS attacks          │
│                                  │                                  │
│  4. Access Control               │  4. SSL/TLS Encryption           │
│     - Whitelist/blacklist        │     - Centralized cert mgmt      │
│     - Time-based access          │     - Force HTTPS                │
│                                  │                                  │
│  5. Logging & Audit              │  5. Bot Protection               │
│     - Track all requests         │     - Detect & block bots        │
│     - Compliance reporting       │     - CAPTCHA challenges          │
│                                  │                                  │
└──────────────────────────────────┴──────────────────────────────────┘
```

---

## 11. Common Interview Questions

| Question                              | Answer                                                                     |
| ------------------------------------- | -------------------------------------------------------------------------- |
| What is a proxy?                      | An intermediary server between client and server that forwards requests    |
| What is a forward proxy?              | Sits on client side, hides client identity from servers                    |
| What is a reverse proxy?              | Sits on server side, hides server identity from clients                    |
| Key difference?                       | Forward proxy hides client; Reverse proxy hides server                     |
| Does client know about forward proxy? | YES — client must be configured to use it                                  |
| Does client know about reverse proxy? | NO — it's transparent to the client                                        |
| What is load balancing?               | Distributing incoming requests across multiple servers                     |
| What is SSL termination?              | Handling HTTPS decryption at the proxy so backends use plain HTTP          |
| Examples of reverse proxy?            | Nginx, HAProxy, AWS ALB, Cloudflare, Traefik                               |
| Examples of forward proxy?            | Squid, VPN services, corporate proxy servers                               |
| Is a VPN a forward proxy?             | Yes, VPN acts similarly — it hides client IP and routes traffic            |
| What is a CDN?                        | A distributed reverse proxy that caches content at edge locations globally |

---

## 12. Summary

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SUMMARY                                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  FORWARD PROXY                    REVERSE PROXY                     │
│  ═════════════                    ═════════════                     │
│                                                                     │
│  • On CLIENT side                 • On SERVER side                  │
│  • Hides CLIENT                   • Hides SERVER                    │
│  • Client is aware                • Client is unaware               │
│  • Controls outbound traffic      • Controls inbound traffic        │
│  • Used by: Users, Employees      • Used by: Website Operators      │
│  • Example: VPN, Squid            • Example: Nginx, CloudFlare     │
│                                                                     │
│  BOTH CAN:                                                          │
│  • Cache content                                                    │
│  • Improve security                                                 │
│  • Filter traffic                                                   │
│  • Log requests                                                     │
│  • Improve performance                                              │
│                                                                     │
│  KEY MEMORY AID:                                                    │
│  ────────────────                                                   │
│  Forward Proxy = "I don't want the SERVER to know who I am"        │
│  Reverse Proxy = "I don't want the CLIENT to know my servers"      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```
