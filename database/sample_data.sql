-- Sample Data for shopBasket Electronics Store

USE shopbasket;

-- Insert Categories
INSERT INTO Categories (name, description) VALUES
('Laptops', 'High-performance laptops and notebooks'),
('Smartphones', 'Latest smartphones and mobile devices'),
('Tablets', 'Tablets and e-readers'),
('Headphones', 'Audio devices and headphones'),
('Smartwatches', 'Wearable smart devices'),
('Gaming', 'Gaming consoles and accessories');

-- Insert Products
INSERT INTO Products (name, description, price, category_id, image_url) VALUES
('Dell XPS 13 Laptop', 'Ultra-thin laptop with Intel i7 processor', 95000.00, 1, 'dell_xps.jpg'),
('iPhone 15 Pro', 'Latest iPhone with advanced camera system', 129900.00, 2, 'iphone15.jpg'),
('Samsung Galaxy Tab S9', 'Premium Android tablet with S Pen', 75900.00, 3, 'galaxy_tab.jpg'),
('Sony WH-1000XM5 Headphones', 'Noise-canceling wireless headphones', 29990.00, 4, 'sony_headphones.jpg'),
('Apple Watch Series 9', 'Advanced smartwatch with health features', 41900.00, 5, 'apple_watch.jpg'),
('PlayStation 5 Console', 'Next-gen gaming console', 49990.00, 6, 'ps5.jpg'),
('MacBook Air M2', 'Lightweight laptop with M2 chip', 114900.00, 1, 'macbook_air.jpg'),
('Google Pixel 8', 'AI-powered smartphone', 79990.00, 2, 'pixel8.jpg'),
('iPad Pro 12.9"', 'Professional tablet for creators', 119900.00, 3, 'ipad_pro.jpg'),
('Bose QuietComfort Earbuds', 'Wireless earbuds with noise cancellation', 22990.00, 4, 'bose_earbuds.jpg');

-- Insert Inventory
INSERT INTO Inventory (product_id, quantity) VALUES
(1, 25),
(2, 50),
(3, 30),
(4, 40),
(5, 35),
(6, 20),
(7, 15),
(8, 45),
(9, 10),
(10, 60);

-- Insert Users (passwords are 'password123' hashed with bcrypt, 10 rounds)
INSERT INTO Users (username, email, password_hash) VALUES
('john_doe', 'john@example.com', '$2b$10$mxW1bacABWY75b6Epq4Ia.GuBYUs/dAjJxBIiJt84gba5.PcXoDeC'),
('jane_smith', 'jane@example.com', '$2b$10$mxW1bacABWY75b6Epq4Ia.GuBYUs/dAjJxBIiJt84gba5.PcXoDeC');

-- Insert Addresses
INSERT INTO Addresses (user_id, street, city, state, zip) VALUES
(1, '123 Main St', 'Anytown', 'CA', '12345'),
(2, '456 Oak Ave', 'Somewhere', 'NY', '67890');

-- Insert Coupons
INSERT INTO Coupons (code, discount_type, discount_value, expiry_date, usage_limit) VALUES
('SAVE10', 'percentage', 10.00, '2026-12-31', 100),
('FIXED20', 'fixed', 20.00, '2026-12-31', 50);