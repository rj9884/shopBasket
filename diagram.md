# shopBasket Diagrams

This file contains the System Architecture and Data Flow Diagrams (DFD) for the shopBasket application.

## 1. System Architecture

```text
User (Browser)
      ↓
Frontend (HTML, CSS, JavaScript)
      ↓
Backend (Node.js, Express.js APIs)
      ↓
Database (MySQL)
```

## 2. Level 0 Data Flow Diagram (Context Diagram)

```text
Shopper / Admin
      ↓  (Requests / Data)
shopBasket System
      ↓  (Responses / Interface)
Shopper / Admin
```

## 3. Level 1 Data Flow Diagram

```text
                   Shopper
                      ↓
              Frontend Interface
                      ↓
    +-----------------+-----------------+
    ↓                 ↓                 ↓
 Auth API       Products API        Orders API
    ↓                 ↓                 ↓
    +-----------------+-----------------+
                      ↓
               MySQL Database
```
