#!/bin/bash

# SeranGo Backend Startup Script

echo "🚀 Starting SeranGo Backend..."

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17 or higher."
    exit 1
fi

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven is not installed. Please install Maven 3.6 or higher."
    exit 1
fi

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first."
    echo "   On macOS: brew services start mongodb-community"
    echo "   On Ubuntu: sudo systemctl start mongod"
    echo "   On Windows: net start MongoDB"
    exit 1
fi

# Build the application
echo "🔨 Building application..."
mvn clean compile

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

# Start the application
echo "🎯 Starting SeranGo Backend on port 8080..."
mvn spring-boot:run

echo "✅ SeranGo Backend started successfully!"
echo "📡 API available at: http://localhost:8080"
echo "🏥 Health check: http://localhost:8080/api/health"
echo "📚 API Documentation: See README.md"
