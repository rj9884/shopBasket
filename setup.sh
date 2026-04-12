#!/bin/bash

# shopBasket One-Click Setup Script
# This script sets up the database for the shopBasket electronics store

echo "🚀 shopBasket Electronics Store - One-Click Setup"
echo "================================================="

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL is not installed. Please install MySQL Server first."
    echo "   Visit: https://dev.mysql.com/downloads/mysql/"
    exit 1
fi

# Check if MySQL service is running
if ! pgrep mysqld &> /dev/null; then
    echo "❌ MySQL service is not running. Please start MySQL service."
    echo "   On Linux: sudo systemctl start mysql"
    echo "   On macOS: brew services start mysql"
    exit 1
fi

# Database configuration
DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD=""  # Update this to match your MySQL root password if required
DB_NAME="shopbasket"

MYSQL_AUTH="-h$DB_HOST -u$DB_USER"
if [ -n "$DB_PASSWORD" ]; then
    MYSQL_AUTH="$MYSQL_AUTH -p$DB_PASSWORD"
fi

echo "📋 Configuration:"
echo "   Host: $DB_HOST"
echo "   User: $DB_USER"
echo "   Database: $DB_NAME"
echo "   Password: $( [ -n "$DB_PASSWORD" ] && echo '*****' || echo '(empty)' )"
echo ""

# Test MySQL connection
echo "🔍 Testing MySQL connection..."
if ! mysql $MYSQL_AUTH -e "SELECT 1;" &> /dev/null; then
    echo "❌ Cannot connect to MySQL. Please check your credentials."
    echo "   Update the DB_PASSWORD variable in this script if needed."
    exit 1
fi
echo "✅ MySQL connection successful"

# Create database
echo "🏗️  Creating database '$DB_NAME'..."
mysql $MYSQL_AUTH -e "DROP DATABASE IF EXISTS $DB_NAME; CREATE DATABASE $DB_NAME;"
if [ $? -ne 0 ]; then
    echo "❌ Failed to create database"
    exit 1
fi
echo "✅ Database created"

# Load schema
echo "📄 Loading database schema..."
mysql $MYSQL_AUTH "$DB_NAME" < database/schema.sql
if [ $? -ne 0 ]; then
    echo "❌ Failed to load schema"
    exit 1
fi
echo "✅ Schema loaded"

# Load sample data
echo "📦 Loading sample data..."
mysql $MYSQL_AUTH "$DB_NAME" < database/sample_data.sql
if [ $? -ne 0 ]; then
    echo "❌ Failed to load sample data"
    exit 1
fi
echo "✅ Sample data loaded"

# Verify setup
echo "🔍 Verifying setup..."
TABLE_COUNT=$(mysql $MYSQL_AUTH "$DB_NAME" -e "SHOW TABLES;" | wc -l)
if [ "$TABLE_COUNT" -gt 1 ]; then
    echo "✅ Setup completed successfully!"
    echo "   $((TABLE_COUNT-1)) tables created"
    echo ""
    echo "🎉 Ready to start the application!"
    echo "   Run: cd backend && npm start"
    echo "   Then open: frontend/index.html"
else
    echo "❌ Setup verification failed"
    exit 1
fi