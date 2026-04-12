# shopBasket Electronics Store - DBMS Project Presentation

A comprehensive Database Management Systems (DBMS) project focused on designing, implementing, and querying a relational database for an electronics e-commerce platform.

## Presentation Structure (10-12 slides)

---

## Slide 1: Project Identification & Title

**Project Title**: shopBasket - Electronics E-Commerce Store  
**Course**: Database Management Systems (DBMS)  
**Student Name**: Rajan Jaiswal  
**Objective**: Design and implement a relational database for an online electronics shopping platform with complete normalization up to 3NF

**Key Focus Areas**:
- Entity-Relationship modeling
- Database normalization (1NF, 2NF, 3NF)
- SQL query optimization
- Data integrity and constraints

---

## Slide 2: Project Background & Requirements

**Business Context**:
- Growing demand for online electronics retail
- Need for efficient inventory management
- Complex customer-order-product relationships
- Support for multiple product categories

**Project Requirements**:
- User registration and authentication
- Product catalog with filtering capabilities
- Shopping cart management
- Order placement and tracking
- Inventory management
- Payment processing tracking

**Scope**:
- 10+ interconnected tables
- Multiple relationships (1:N, M:N)
- Complex queries with joins and aggregations

---

## Slide 3: Project Description

**System Overview**:

shopBasket is a complete e-commerce database system designed to manage:

1. **Users**: Customer accounts with authentication
2. **Products**: Electronics inventory with categories
3. **Shopping Cart**: Temporary storage of user selections
4. **Orders**: Complete purchase history and tracking
5. **Inventory**: Stock management per product
6. **Payments**: Transaction records and status
7. **Reviews**: Customer feedback and ratings
8. **Categories**: Product organization and filtering

**Key Features**:
- Real-time inventory tracking
- Order status management
- Customer address management
- Coupon/discount system
- Payment method support
- Review and rating system

**Technology Stack**:
- **DBMS**: MySQL
- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Authentication**: JWT Tokens

---

## Slide 4: ER Diagram Creation

**ER Diagram Representation**:

```
[Users] ←─→ [Addresses]
   ↓
[Cart] ←─→ [Products]
   ↓            ↓
[Orders]   [Categories]
   ↓            ↓
[Order_Items] [Inventory]
   ↓         ↓
[Payments][Reviews]
   ↓         ↓
[Coupons][Coupon_Usage]
```

**Entity-Relationship Details**:
- **Users** (1:N) **Orders**: One user can place multiple orders
- **Users** (1:N) **Cart**: One user has one cart with multiple items
- **Users** (1:N) **Addresses**: One user can have multiple addresses
- **Products** (1:N) **Cart**: Multiple cart items reference same product
- **Products** (1:N) **Order_Items**: Multiple order items reference same product
- **Products** (1:N) **Inventory**: One product has one inventory record
- **Categories** (1:N) **Products**: One category has multiple products
- **Orders** (1:N) **Order_Items**: One order contains multiple items
- **Orders** (1:1) **Payments**: One order has one payment
- **Products** (1:N) **Reviews**: One product has multiple reviews
- **Users** (1:N) **Reviews**: One user can write multiple reviews
- **Coupons** (1:N) **Coupon_Usage**: One coupon used multiple times

**Tool Recommendation**: Use Lucidchart, Draw.io, or MySQL Workbench to create visual ER diagram

---

## Slide 5: ER Diagram Description

**Entities and Attributes**:

1. **Users**: user_id (PK), username (UNIQUE), email (UNIQUE), password_hash, created_at
2. **Categories**: category_id (PK), name (UNIQUE), description
3. **Products**: product_id (PK), name, description, price, category_id (FK), image_url
4. **Inventory**: inventory_id (PK), product_id (FK, UNIQUE), quantity, last_updated
5. **Addresses**: address_id (PK), user_id (FK), street, city, state, zip, country
6. **Cart**: cart_id (PK), user_id (FK), product_id (FK), quantity, added_at, UNIQUE(user_id, product_id)
7. **Orders**: order_id (PK), user_id (FK), order_date, total_amount, status (ENUM), address_id (FK)
8. **Order_Items**: order_item_id (PK), order_id (FK), product_id (FK), quantity, price
9. **Payments**: payment_id (PK), order_id (FK, UNIQUE), payment_method (ENUM), amount, status, transaction_id
10. **Reviews**: review_id (PK), product_id (FK), user_id (FK), rating (1-5), comment, created_at, UNIQUE(product_id, user_id)
11. **Coupons**: coupon_id (PK), code (UNIQUE), discount_type (ENUM), discount_value, expiry_date, usage_limit
12. **Coupon_Usage**: usage_id (PK), coupon_id (FK), user_id (FK), order_id (FK)

**Key Constraints**:
- Primary Keys: Uniquely identify each record
- Foreign Keys: Maintain referential integrity
- NOT NULL: Ensure data completeness
- CHECK: Validate data ranges (e.g., price > 0, rating 1-5)
- UNIQUE: Prevent duplicate entries
- ENUM: Restrict values to predefined options

---

## Slide 6: ER Diagram to Tables Conversion

**Conversion Process**:

Each entity becomes a table. Relationships are handled through:

1. **One-to-One Relationships**: Foreign key in dependent table
   - Example: Orders (1:1) Payments → Foreign key `order_id` in Payments table

2. **One-to-Many Relationships**: Foreign key in "many" side table
   - Example: Users (1:N) Orders → Foreign key `user_id` in Orders table
   - Example: Categories (1:N) Products → Foreign key `category_id` in Products table

3. **Many-to-Many Relationships**: Create junction table
   - Example: Users (M:N) Coupons → Junction table Coupon_Usage with (coupon_id, user_id) as foreign keys

**Example SQL for Table Creation**:
```sql
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    category_id INT,
    image_url VARCHAR(500),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);
```

---

## Slide 7: Table Descriptions & Schemas

**Core Tables**:

**Users Table**:
- Stores customer account information
- Attributes: user_id, username, email, password_hash (bcrypt), created_at
- Primary Key: user_id
- Constraints: UNIQUE on username and email

**Categories Table**:
- Organizes products into electronics categories
- Attributes: category_id, name, description
- Categories: Laptops, Smartphones, Tablets, Headphones, Smartwatches, Gaming

**Products Table**:
- Main product inventory
- Attributes: product_id, name, description, price, category_id, image_url
- Foreign Key: category_id references Categories
- Constraint: price > 0

**Orders Table**:
- Customer purchase records
- Attributes: order_id, user_id, order_date, total_amount, status, address_id
- Foreign Keys: user_id, address_id
- Status: pending, confirmed, shipped, delivered, cancelled

**Order_Items Table**:
- Line items for each order
- Attributes: order_item_id, order_id, product_id, quantity, price
- Junction between Orders and Products
- Captures price at time of purchase

**Cart Table**:
- Temporary shopping cart storage
- Attributes: cart_id, user_id, product_id, quantity, added_at
- Unique constraint: (user_id, product_id)

**Payment/Reviews/Coupons Tables**:
- Specialized tracking for payments, reviews, and discount coupons
- Enable multi-faceted customer interactions

---

## Slide 8: Database Normalization (1NF → 3NF)

**First Normal Form (1NF)**: Eliminate repeating groups
- ✅ Each attribute contains atomic (indivisible) values
- ❌ NO: Storing multiple addresses in one field
- ✅ YES: Separate Addresses table with user_id reference
- ❌ NO: Multiple products in one order cell
- ✅ YES: Order_Items junction table for line items

**Second Normal Form (2NF)**: Remove partial dependencies
- ✅ Must be in 1NF first
- ✅ All non-key attributes must depend on entire primary key
- Example: Order_Items(order_id, product_id) → non-key attributes (quantity, price) depend on both keys
- Removed: Storing product details in Order_Items; use foreign key instead

**Third Normal Form (3NF)**: Remove transitive dependencies
- ✅ Must be in 2NF first
- ✅ Non-key attributes must not depend on other non-key attributes
- ❌ NO: Storing category_name in Products table
- ✅ YES: Store category_id as foreign key reference to Categories
- ❌ NO: Storing user email and username combined
- ✅ YES: Each in Users table without dependencies

**Normalization Benefits**:
- Eliminates data redundancy
- Ensures data consistency
- Reduces storage space
- Improves query performance

---

## Slide 9: Sample Data in Tables

**Data Insertion Examples** (Minimum 5 tables with 5+ records):

```sql
-- Categories Data
INSERT INTO Categories (name, description) VALUES
('Laptops', 'High-performance laptops and notebooks'),
('Smartphones', 'Latest smartphones and mobile devices'),
('Tablets', 'Tablets and e-readers');

-- Users Data
INSERT INTO Users (username, email, password_hash) VALUES
('john_doe', 'john@example.com', '$2b$10$mxW1bacABWY75b6Epq4Ia.GuBYUs/dAjJxBIiJt84gba5.PcXoDeC'),
('jane_smith', 'jane@example.com', '$2b$10$mxW1bacABWY75b6Epq4Ia.GuBYUs/dAjJxBIiJt84gba5.PcXoDeC'),
('rajan_jaiswal', 'rajan@example.com', '$2b$10$mxW1bacABWY75b6Epq4Ia.GuBYUs/dAjJxBIiJt84gba5.PcXoDeC');

-- Products Data
INSERT INTO Products (name, description, price, category_id, image_url) VALUES
('Dell XPS 13 Laptop', 'Ultra-thin laptop with Intel i7', 95000.00, 1, 'del_xps.jpg'),
('iPhone 15 Pro', 'Latest iPhone with Pro camera', 129900.00, 2, 'iphone15.jpg'),
('MacBook Air M2', 'Lightweight laptop with M2 chip', 114900.00, 1, 'macbook_air.jpg'),
('iPad Pro 12.9', 'Professional tablet for creators', 119900.00, 3, 'ipad_pro.jpg'),
('Samsung Galaxy S24', 'Flagship Android smartphone', 109900.00, 2, 'galaxy_s24.jpg');

-- Inventory Data
INSERT INTO Inventory (product_id, quantity) VALUES
(1, 25), (2, 50), (3, 15), (4, 10), (5, 45);

-- Orders Data
INSERT INTO Orders (user_id, total_amount, status, address_id, order_date) VALUES
(1, 95000.00, 'delivered', 1, '2026-03-15 10:30:00'),
(2, 129900.00, 'shipped', 2, '2026-03-18 14:45:00'),
(1, 114900.00, 'pending', 1, '2026-03-28 09:15:00'),
(3, 229800.00, 'confirmed', 3, '2026-03-29 16:20:00'),
(2, 119900.00, 'delivered', 2, '2026-03-10 11:00:00');
```

---

## Slide 10: SQL Queries (Advanced)

**Query 1: Aggregate Function - Total Sales by Category**
```sql
SELECT c.name, COUNT(oi.order_item_id) as total_items, 
       SUM(oi.price * oi.quantity) as total_revenue
FROM Categories c
JOIN Products p ON c.category_id = p.category_id
JOIN Order_Items oi ON p.product_id = oi.product_id
GROUP BY c.category_id, c.name
ORDER BY total_revenue DESC;
```

**Query 2: JOIN - Customer Order History with Products**
```sql
SELECT u.username, o.order_id, o.order_date, o.total_amount, 
       p.name, oi.quantity, oi.price, o.status
FROM Users u
JOIN Orders o ON u.user_id = o.user_id
JOIN Order_Items oi ON o.order_id = oi.order_id
JOIN Products p ON oi.product_id = p.product_id
WHERE u.user_id = 1
ORDER BY o.order_date DESC;
```

**Query 3: Subquery - Products Above Average Price**
```sql
SELECT product_id, name, price, category_id
FROM Products
WHERE price > (SELECT AVG(price) FROM Products)
ORDER BY price DESC;
```

**Query 4: Subquery with IN - Users with Orders Exceeding 100,000**
```sql
SELECT DISTINCT u.user_id, u.username, u.email
FROM Users u
WHERE u.user_id IN (
    SELECT user_id FROM Orders 
    WHERE total_amount > 100000
);
```

**Query 5: Complex Query - Top Customers with Purchase Count**
```sql
SELECT u.username, COUNT(o.order_id) as purchase_count, 
       SUM(o.total_amount) as total_spent, AVG(o.total_amount) as avg_order_value
FROM Users u
LEFT JOIN Orders o ON u.user_id = o.user_id
GROUP BY u.user_id, u.username
HAVING COUNT(o.order_id) > 0
ORDER BY total_spent DESC;
```

---

## Slide 11: Database Views

**Purpose**: Simplify complex queries and provide data abstraction

**View 1: Customer Order Summary**
```sql
CREATE VIEW customer_orders_summary AS
SELECT u.user_id, u.username, u.email,
       COUNT(o.order_id) as total_orders,
       SUM(o.total_amount) as lifetime_value,
       MAX(o.order_date) as last_order_date
FROM Users u
LEFT JOIN Orders o ON u.user_id = o.user_id
GROUP BY u.user_id, u.username, u.email;
```

**View 2: Product Stock Status**
```sql
CREATE VIEW product_stock_status AS
SELECT p.product_id, p.name, c.name as category,
       p.price, i.quantity,
       CASE 
           WHEN i.quantity = 0 THEN 'Out of Stock'
           WHEN i.quantity < 10 THEN 'Low Stock'
           WHEN i.quantity < 50 THEN 'Medium Stock'
           ELSE 'In Stock'
       END as stock_status
FROM Products p
JOIN Categories c ON p.category_id = c.category_id
JOIN Inventory i ON p.product_id = i.product_id;
```

**View 3: Monthly Sales Report**
```sql
CREATE VIEW monthly_sales_report AS
SELECT DATE_FORMAT(o.order_date, '%Y-%m') as month,
       COUNT(o.order_id) as order_count,
       SUM(o.total_amount) as total_sales,
       AVG(o.total_amount) as avg_order_value
FROM Orders o
GROUP BY YEAR(o.order_date), MONTH(o.order_date)
ORDER BY o.order_date DESC;
```

**View Benefits**:
- Hides complex query logic
- Provides role-based data access
- Simplifies reporting
- Ensures data consistency in applications

---

## Key Achievements

✅ Comprehensive ER model with 12+ tables  
✅ Proper normalization to 3NF  
✅ Sample data across all core tables  
✅ Advanced SQL queries with joins, subqueries, aggregates  
✅ Database views for simplified access  
✅ Referential integrity and constraints  

## Tools Used

- **MySQL Workbench**: ER diagram design and SQL execution
- **Draw.io / Lucidchart**: Visual ER diagram representation
- **MySQL Server**: Database implementation and query execution
- **Node.js + Express**: Application backend
- **HTML/CSS/JavaScript**: Frontend interface