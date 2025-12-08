# 🚀 SeranGo Backend - Quick Start Guide

## The Issue You Encountered:
You tried to run the Spring Boot application directly with `javac` and `java`, but Spring Boot applications require Maven to manage dependencies and build properly.

## ✅ **SOLUTION - Follow These Steps:**

### Step 1: Make sure you're in the right directory
```bash
cd "c:\Users\dines\OneDrive\Desktop\seranagofront\SeranGobackend"
```

### Step 2: Check prerequisites
Make sure you have:
- ✅ Java 17+ installed
- ✅ Maven 3.6+ installed  
- ✅ MongoDB running

### Step 3: Run the application correctly
```bash
mvn spring-boot:run
```

### Step 4: Test the application
Open your browser and go to:
```
http://localhost:8080/api/health
```

You should see:
```json
{
  "status": "OK",
  "message": "SeranGo API server is running",
  "version": "1.0.0"
}
```

## 🔧 **Alternative Methods:**

### Method A: Build and run JAR
```bash
mvn clean package
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

### Method B: Use the batch file
```bash
start.bat
```

## 🐛 **Troubleshooting:**

### If you get "MongoDB connection failed":
1. Install MongoDB
2. Start MongoDB service
3. Make sure it's running on localhost:27017

### If you get "Port 8080 already in use":
1. Change the port in `application.properties`:
   ```
   server.port=8081
   ```
2. Or kill the process using port 8080

### If you get "Maven not found":
1. Install Maven
2. Add Maven to your PATH environment variable

## 📚 **What's Available:**

Once running, you'll have access to:
- **40+ API endpoints** for the complete SeranGo platform
- **Sample data** including users, destinations, and guides
- **Real-time messaging** via WebSocket
- **AI integration** for itinerary generation
- **Complete admin dashboard** functionality

## 🎯 **Next Steps:**
1. Get the backend running using `mvn spring-boot:run`
2. Test the health endpoint
3. Explore the API documentation in `API_DOCUMENTATION.md`
4. Integrate with your frontend application

The backend is fully functional and ready to support your SeranGo frontend! 🚀
