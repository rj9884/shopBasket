# shopBasket - Electronics E-Commerce Store

A complete full-stack e-commerce application for electronics shopping, built with modern web technologies for a DBMS course project.

## Tech Stack

- **Backend**: Node.js, Express.js, MySQL
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Database**: MySQL with relational schema
- **Authentication**: JWT tokens
- **Styling**: Custom CSS with Amazon-inspired design

## Project Structure

```
shopBasket/
├── database/           # SQL schema, sample data, ER diagram
├── backend/            # Node.js Express API server
│   ├── routes/         # API endpoints (auth, products, cart, orders)
│   ├── config/         # Database configuration
│   └── server.js       # Main server file
├── frontend/           # Client-side application
│   ├── css/           # Stylesheets
│   ├── js/            # JavaScript modules
│   └── *.html         # HTML pages
├── setup.sh           # Database setup script
├── start.sh           # Complete application launcher
└── README.md          # This file
```

## Quick Start

### Prerequisites
- MySQL Server (8.0+) installed and running
- Node.js (14+) installed

### Automated Setup
```bash
# Run the complete setup script
./start.sh
```

This setup performs the following steps:
- Sets up the MySQL database with electronics data
- Installs backend dependencies
- Starts the backend API server on port 3000
- Starts the frontend development server on port 8000
- Opens the application in a browser

### Manual Setup
```bash
# 1. Setup database
./setup.sh

# 2. Install backend dependencies
cd backend && npm install

# 3. Start backend server
npm start

# 4. Start frontend (in another terminal)
cd ../frontend && python3 -m http.server 8000
```

## Features

### User Management
- User registration and login with JWT authentication
- Profile management
- Password hashing with bcrypt

### Product Catalog
- Electronics product categories:
  - Laptops & Notebooks
  - Smartphones & Mobile Devices
  - Tablets & E-readers
  - Headphones & Audio
  - Smartwatches & Wearables
  - Gaming Consoles & Accessories
- Filtering by category, price, and ratings
- Customer reviews and ratings
- Product images

### Shopping Experience
- Add to cart functionality
- Real-time cart updates
- Checkout process
- Order history and tracking
- Responsive design across devices

### Database Design
- Normalized relational schema
- Interconnected tables with foreign keys
- Inventory management
- Order and payment processing

## Sample Data

**Test Users:**
- Email: `john@example.com` | Password: `password123`
- Email: `jane@example.com` | Password: `password123`

**Product Categories:** Laptops, Smartphones, Tablets, Headphones, Smartwatches, Gaming

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Products
- `GET /products` - Get all products with filtering
- `GET /products/:id` - Get product details

### Cart Management
- `POST /cart/add` - Add item to cart
- `GET /cart` - Get user's cart
- `DELETE /cart/remove/:id` - Remove item from cart

### Orders
- `POST /orders` - Place new order
- `GET /orders` - Get user's order history

## UI/UX Design

- Amazon-inspired color palette with clean whites, blues, and grays
- Responsive layout for desktop, tablet, and mobile
- Intuitive navigation and user flows
- Loading states and user feedback
- User-friendly error handling

## Database Schema

Key tables include:
- `Users` - Customer information
- `Products` - Product catalog
- `Categories` - Product categorization
- `Orders` - Order management
- `Order_Items` - Order line items
- `Cart` - Shopping cart
- `Inventory` - Stock management
- `Payments` - Payment processing
- `Reviews` - Customer feedback

## Troubleshooting

### Database Connection Issues
```bash
# Check MySQL service
sudo systemctl status mysql

# Test connection
mysql -u root -p -e "SHOW DATABASES;"

# Reset database
./setup.sh
```

### Port Conflicts
```bash
# Kill processes on ports 3000/8000
lsof -ti:3000 | xargs kill -9
lsof -ti:8000 | xargs kill -9
```

### CORS Issues
- Access frontend via `http://localhost:8000`
- Do not open HTML files directly from the file system

## Project Highlights

- Complete CRUD operations
- JWT-based authentication
- Responsive web design
- Database normalization
- Error handling and validation
- Modern JavaScript (ES6+)
- RESTful API design
- One-click deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement changes
4. Test thoroughly
5. Submit a pull request

## License

This project is developed for educational purposes as part of a DBMS course project.

## Notes

- Sample passwords are not hashed; use bcrypt for production.
- For demo purposes, `address_id` is hardcoded in checkout.
- Admin analytics endpoint `/admin/top-products` requires login.
