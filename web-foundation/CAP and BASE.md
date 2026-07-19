# CAP Theorem and BASE Theorem

## Overview

When building distributed systems (like microservices, distributed databases), we face fundamental trade-offs in how data is managed across multiple nodes. The **CAP Theorem** and **BASE Theorem** are two important concepts that help us understand these trade-offs.

---

## 1. CAP Theorem (Brewer's Theorem)

### What is it?

The CAP Theorem was proposed by **Eric Brewer in 2000** and later formally proved. It states that a distributed data system can only guarantee **two out of three** properties simultaneously:

- **C** - Consistency
- **A** - Availability
- **P** - Partition Tolerance

### The Three Properties

#### C - Consistency

Every read receives the **most recent write** or an error. All nodes see the same data at the same time.

```
Example: You update your profile name to "Vikas"
- With Consistency: Every node immediately returns "Vikas"
- Without Consistency: Some nodes may still return old name temporarily
```

#### A - Availability

Every request receives a **non-error response**, without guarantee that it contains the most recent write. The system is always responsive.

```
Example: You request your profile data
- With Availability: You ALWAYS get a response (even if data is slightly outdated)
- Without Availability: System may refuse to respond if it can't guarantee correctness
```

#### P - Partition Tolerance

The system continues to **operate despite network failures** (messages lost or delayed between nodes). The system works even when communication between nodes breaks.

```
Example: Network cable between two data centers is cut
- With Partition Tolerance: System keeps working on both sides
- Without Partition Tolerance: System shuts down until network is restored
```

### CAP Theorem Diagram

```
                         ┌───────────────────────┐
                         │     CAP THEOREM       │
                         │                       │
                         │   "Pick any TWO"      │
                         └───────────────────────┘

                              Consistency
                                  /\
                                 /  \
                                /    \
                               /  CA  \
                              /        \
                             /  (No     \
                            /  Partition \
                           /  Tolerance)  \
                          /________________\
                         /\                /\
                        /  \              /  \
                       / CP \            / AP \
                      /      \          /      \
                     / (No    \        / (No    \
                    / Availab- \      / Consis-  \
                   /   ility)   \    /  tency)    \
                  /──────────────\  /──────────────\
        Partition                    Availability
        Tolerance
```

### The Trade-offs Explained

```
┌─────────────────────────────────────────────────────────────────────┐
│                     CAP TRADE-OFF COMBINATIONS                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  CA (Consistency + Availability)                             │   │
│  │  - Sacrifice: Partition Tolerance                            │   │
│  │  - Works only in single-node or non-distributed systems     │   │
│  │  - Example: Traditional RDBMS (MySQL, PostgreSQL - single)  │   │
│  │  - Reality: NOT practical in distributed systems            │   │
│  │             (network partitions WILL happen)                 │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  CP (Consistency + Partition Tolerance)                      │   │
│  │  - Sacrifice: Availability                                  │   │
│  │  - System may refuse requests during partition              │   │
│  │  - Guarantees data correctness                              │   │
│  │  - Example: MongoDB, HBase, Redis (in cluster mode)         │   │
│  │  - Use when: Data correctness is critical (banking, inventory)│  │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  AP (Availability + Partition Tolerance)                     │   │
│  │  - Sacrifice: Consistency                                   │   │
│  │  - System always responds but data may be stale             │   │
│  │  - Eventually consistent                                    │   │
│  │  - Example: Cassandra, DynamoDB, CouchDB                    │   │
│  │  - Use when: System must always be responsive (social media)│   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Why Can't We Have All Three?

```
Scenario: Network partition occurs between Node A and Node B

┌──────────┐         X  X  X         ┌──────────┐
│  Node A  │ ────── PARTITION ─────── │  Node B  │
└──────────┘     (Network Break)      └──────────┘

Client writes "balance = 100" to Node A

Option 1 (Choose Consistency - CP):
  → Node A cannot confirm Node B has the update
  → Node A REJECTS the write or becomes unavailable
  → Availability is LOST

Option 2 (Choose Availability - AP):
  → Node A accepts the write
  → Node B still has old value
  → Consistency is LOST

Option 3 (Choose CA - ignore partition):
  → Not possible in real distributed systems!
  → Network failures WILL happen
```

### Real-World Examples

| System                  | Type | Description                                             |
| ----------------------- | ---- | ------------------------------------------------------- |
| **MySQL (single node)** | CA   | Consistent + Available, but no distribution             |
| **MongoDB**             | CP   | Consistent + Partition Tolerant, may become unavailable |
| **HBase**               | CP   | Strong consistency, handles partitions                  |
| **Cassandra**           | AP   | Always available, eventually consistent                 |
| **DynamoDB**            | AP   | Highly available, eventual consistency                  |
| **CouchDB**             | AP   | Available + Partition tolerant                          |
| **Redis Cluster**       | CP   | Consistent with partition handling                      |
| **Zookeeper**           | CP   | Strong consistency for coordination                     |

---

## 2. BASE Theorem

### What is it?

BASE is an alternative to ACID (used in traditional databases). It is a model for designing **highly available distributed systems** that relaxes consistency requirements. BASE is commonly associated with **AP systems** in the CAP theorem.

### BASE Stands For:

- **BA** - Basically Available
- **S** - Soft State
- **E** - Eventually Consistent

### The Three Properties

#### BA - Basically Available

The system **guarantees availability** as defined by the CAP theorem. It will always return a response, even if the data is not the latest. The system distributes data across multiple nodes, so even if some nodes fail, the system continues to work.

```
Example:
- An e-commerce site shows product listings even if the
  inventory count might be a few seconds behind
- Search results are returned even if index is slightly outdated
```

#### S - Soft State

The state of the system **may change over time**, even without new input. This is because data is being replicated and synced across nodes in the background. The system doesn't have to be write-consistent at all times.

```
Example:
- After updating your profile picture, different servers
  may show old picture for a few seconds before the new
  one propagates everywhere
- Shopping cart totals might briefly show different values
  across regions
```

#### E - Eventually Consistent

The system will **become consistent over time**. Given enough time without new updates, all replicas will converge to the same value. There is no guarantee of immediate consistency, but consistency will be achieved eventually.

```
Example:
- DNS propagation: When you update DNS records, it takes
  time (minutes to hours) for all DNS servers to reflect
  the change
- Social media posts: A new post may not appear immediately
  for all followers across different regions
```

### BASE Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        BASE MODEL                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │             BASICALLY AVAILABLE                          │    │
│  │                                                         │    │
│  │   Client ──Request──▶ System ──Response──▶ Client       │    │
│  │                                                         │    │
│  │   "I will ALWAYS respond, even if data is not perfect"  │    │
│  └─────────────────────────────────────────────────────────┘    │
│                          │                                       │
│                          ▼                                       │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │               SOFT STATE                                 │    │
│  │                                                         │    │
│  │   Node A: balance=100  ──syncing──▶  Node B: balance=90 │    │
│  │                                                         │    │
│  │   "State can change without explicit writes             │    │
│  │    (due to background replication)"                     │    │
│  └─────────────────────────────────────────────────────────┘    │
│                          │                                       │
│                          ▼                                       │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │           EVENTUALLY CONSISTENT                          │    │
│  │                                                         │    │
│  │   Time T0: Node A=100, Node B=90   (inconsistent)       │    │
│  │   Time T1: Node A=100, Node B=95   (syncing...)         │    │
│  │   Time T2: Node A=100, Node B=100  (consistent!)        │    │
│  │                                                         │    │
│  │   "Given enough time, all nodes will have same data"    │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. ACID vs BASE Comparison

### What is ACID?

ACID is the traditional model for relational databases:

- **A** - Atomicity (all or nothing)
- **C** - Consistency (valid state transitions)
- **I** - Isolation (concurrent transactions don't interfere)
- **D** - Durability (committed data persists)

### Comparison Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                      ACID vs BASE                                    │
├────────────────────────────────┬────────────────────────────────────┤
│            ACID                │              BASE                   │
├────────────────────────────────┼────────────────────────────────────┤
│                                │                                    │
│  Strong Consistency            │  Eventual Consistency              │
│  Isolation                     │  No Isolation (soft state)         │
│  Focus on Commit               │  Focus on Availability             │
│  Pessimistic (lock data)       │  Optimistic (no locks)            │
│  Hard state (immediate)        │  Soft state (may lag)             │
│  Nested transactions           │  Approximate answers OK           │
│  Strict                        │  Flexible                         │
│                                │                                    │
│  Best for:                     │  Best for:                        │
│  - Banking systems             │  - Social media feeds             │
│  - Inventory management        │  - Search engines                 │
│  - Order processing            │  - Recommendation systems         │
│  - Payment gateways            │  - Analytics dashboards           │
│                                │                                    │
│  Examples:                     │  Examples:                        │
│  - MySQL, PostgreSQL           │  - Cassandra, DynamoDB            │
│  - Oracle, SQL Server          │  - CouchDB, Riak                 │
│                                │                                    │
└────────────────────────────────┴────────────────────────────────────┘
```

### Comparison Table

| Feature          | ACID                          | BASE                        |
| ---------------- | ----------------------------- | --------------------------- |
| **Consistency**  | Strong (immediate)            | Eventual                    |
| **Availability** | May sacrifice for consistency | Prioritized                 |
| **Focus**        | Data correctness              | System availability         |
| **Locking**      | Pessimistic (locks data)      | Optimistic (no locks)       |
| **Performance**  | Lower (due to locks)          | Higher (no locks)           |
| **Scalability**  | Vertical (scale up)           | Horizontal (scale out)      |
| **Complexity**   | Simpler logic                 | Complex conflict resolution |
| **Use Case**     | Transactions, financial       | Large-scale, distributed    |

---

## 4. How CAP and BASE Relate

```
┌─────────────────────────────────────────────────────────────────┐
│              RELATIONSHIP: CAP + BASE + ACID                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│                     CAP Theorem                                  │
│                    /          \                                   │
│                   /            \                                  │
│                  /              \                                 │
│          CP Systems          AP Systems                          │
│          (Strong             (Eventually                         │
│          Consistency)        Consistent)                         │
│              │                    │                               │
│              ▼                    ▼                               │
│     ┌──────────────┐    ┌──────────────┐                        │
│     │    ACID      │    │    BASE      │                        │
│     │   Model      │    │   Model      │                        │
│     ├──────────────┤    ├──────────────┤                        │
│     │ - Atomicity  │    │ - Basically  │                        │
│     │ - Consistency│    │   Available  │                        │
│     │ - Isolation  │    │ - Soft State │                        │
│     │ - Durability │    │ - Eventually │                        │
│     │              │    │   Consistent │                        │
│     └──────────────┘    └──────────────┘                        │
│              │                    │                               │
│              ▼                    ▼                               │
│     Traditional DBs       NoSQL / Distributed                    │
│     (MySQL, PostgreSQL)   (Cassandra, DynamoDB)                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Eventual Consistency - Deep Dive

### How Eventual Consistency Works

```
Timeline of Eventual Consistency:

Write "X=5" to Node A
        │
        ▼
┌──────────────────────────────────────────────────────────────┐
│  T=0ms                                                        │
│  Node A: X=5  ✓ (write accepted)                             │
│  Node B: X=3  ✗ (still has old value)                        │
│  Node C: X=3  ✗ (still has old value)                        │
├──────────────────────────────────────────────────────────────┤
│  T=50ms  (replication in progress)                           │
│  Node A: X=5  ✓                                              │
│  Node B: X=5  ✓ (updated via replication)                    │
│  Node C: X=3  ✗ (still syncing)                              │
├──────────────────────────────────────────────────────────────┤
│  T=100ms (all nodes synced)                                  │
│  Node A: X=5  ✓                                              │
│  Node B: X=5  ✓                                              │
│  Node C: X=5  ✓ (eventually consistent!)                     │
└──────────────────────────────────────────────────────────────┘

During T=0 to T=100ms → System is inconsistent but AVAILABLE
After T=100ms → System is CONSISTENT
```

### Consistency Levels Spectrum

```
Strong                                                    Eventual
Consistency ◀──────────────────────────────────────────▶ Consistency
     │                                                        │
     │    Linearizable                                        │
     │         │                                              │
     │    Sequential                                          │
     │         │                                              │
     │    Causal                                              │
     │         │                                              │
     │    Read-your-writes                                    │
     │         │                                              │
     │    Monotonic reads                                     │
     │         │                                              │
     │    Eventual                                            │
     │                                                        │
  (ACID)                                                  (BASE)
  Banking                                             Social Media
  Payments                                              Analytics
```

---

## 6. Practical Decision Guide

```
┌─────────────────────────────────────────────────────────────────┐
│              CHOOSING BETWEEN CAP TRADE-OFFS                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Ask yourself:                                                   │
│                                                                  │
│  Q1: Is this a distributed system?                              │
│      NO  → Use traditional RDBMS (CA), no need for CAP          │
│      YES → Continue to Q2                                        │
│                                                                  │
│  Q2: Can you tolerate stale reads?                              │
│      NO  → Choose CP (MongoDB, HBase, Zookeeper)                │
│      YES → Continue to Q3                                        │
│                                                                  │
│  Q3: Must the system always respond?                            │
│      YES → Choose AP + BASE (Cassandra, DynamoDB)               │
│      NO  → Choose CP (if correctness > availability)            │
│                                                                  │
│  ┌─────────────────────────────────────────────────────┐        │
│  │  Common Patterns:                                    │        │
│  │                                                     │        │
│  │  Banking/Payments     → CP + ACID                   │        │
│  │  Social Media Feed    → AP + BASE                   │        │
│  │  Shopping Cart        → AP + BASE                   │        │
│  │  Inventory Count      → CP + ACID                   │        │
│  │  User Sessions        → AP + BASE                   │        │
│  │  Flight Booking       → CP + ACID                   │        │
│  │  DNS System           → AP + BASE                   │        │
│  │  Leader Election      → CP                          │        │
│  └─────────────────────────────────────────────────────┘        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. Key Takeaways

1. **CAP Theorem** tells us we can only pick 2 out of 3 (C, A, P) in a distributed system
2. **Partition Tolerance is mandatory** in real-world distributed systems (network failures happen), so the real choice is between **CP** and **AP**
3. **ACID** prioritizes consistency and correctness (traditional SQL databases)
4. **BASE** prioritizes availability and performance (NoSQL / distributed databases)
5. **Eventual Consistency** means data will sync across nodes given enough time
6. The right choice depends on your **business requirements** - there is no universally "better" option

---

## 8. Interview Quick Reference

| Question         | Answer                                                                                        |
| ---------------- | --------------------------------------------------------------------------------------------- |
| What is CAP?     | A distributed system can guarantee only 2 of: Consistency, Availability, Partition Tolerance  |
| Why not all 3?   | During a network partition, you must choose between responding (AP) or staying correct (CP)   |
| What is BASE?    | Basically Available, Soft state, Eventually consistent - a model for highly available systems |
| ACID vs BASE?    | ACID = strict consistency (banks), BASE = eventual consistency (social media)                 |
| When to use CP?  | When data correctness is critical (money, inventory, bookings)                                |
| When to use AP?  | When system must always respond (feeds, search, recommendations)                              |
| Is CA practical? | Only in non-distributed (single node) systems; not realistic for distributed systems          |
