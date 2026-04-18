#!/bin/bash

# shopBasket - Complete Start Script
# Sets up and starts the entire application

echo "🚀 shopBasket Electronics Store - Complete Setup & Start"
echo "========================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Run database setup
echo "📊 Setting up database..."
if ! ./setup.sh; then
    echo "❌ Database setup failed"
    exit 1
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
if ! npm install; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Check if port 3000 is available
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "❌ Port 3000 is already in use. Please stop the existing server first."
    echo "   Run: pkill -f 'node server.js'"
    exit 1
fi

# Start backend server in background
echo "🖥️  Starting backend server..."
npm start &
BACKEND_PID=$!
cd ..
echo "✅ Backend started (PID: $BACKEND_PID)"

# Wait a moment for backend to start
sleep 3

# Check if backend is actually running
if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo "❌ Backend server failed to start"
    exit 1
fi

# Start frontend server
echo "🌐 Starting frontend server..."
cd frontend
python3 -m http.server 8000 &
FRONTEND_PID=$!
cd ..
echo "✅ Frontend server started on http://localhost:8000 (PID: $FRONTEND_PID)"

echo ""
echo "🎉 shopBasket is now running!"
echo "   Backend API: http://localhost:3000"
echo "   Frontend: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for user interrupt
trap "echo '🛑 Stopping servers...'; kill $BACKEND_PID 2>/dev/null; kill $FRONTEND_PID 2>/dev/null; exit 0" INT
wait