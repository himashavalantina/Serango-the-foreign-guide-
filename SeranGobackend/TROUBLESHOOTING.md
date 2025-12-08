# 🔧 SeranGo Backend Troubleshooting Guide

## ✅ **FIXED ISSUES:**

### 1. **Spring Boot Plugin Issue** ✅ FIXED
**Problem:** `No plugin found for prefix 'spring-boot'`
**Solution:** Added proper Spring Boot Maven plugin configuration in `pom.xml`

### 2. **Duplicate Class Issue** ✅ FIXED  
**Problem:** `duplicate class: com.example.demo.SeranGoApplication`
**Solution:** Removed duplicate `DemoApplication.java` file

### 3. **Missing Getters/Setters** ✅ FIXED
**Problem:** `cannot find symbol: method getAdditionalPreferences()`
**Solution:** All model classes now have proper `@Data` Lombok annotations

## 🚀 **HOW TO RUN THE APPLICATION:**

### Method 1: Using Maven (Recommended)
```bash
cd "c:\Users\dines\OneDrive\Desktop\seranagofront\SeranGobackend"
mvn spring-boot:run
```

### Method 2: Build and Run JAR
```bash
cd "c:\Users\dines\OneDrive\Desktop\seranagofront\SeranGobackend"
mvn clean package
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

### Method 3: Using IDE
1. Open the project in your IDE (IntelliJ IDEA, Eclipse, VS Code)
2. Right-click on `SeranGoApplication.java`
3. Select "Run SeranGoApplication"

## 🔍 **VERIFY THE APPLICATION IS WORKING:**

### Step 1: Check if it's running
```bash
netstat -an | findstr :8080
```
You should see: `TCP 0.0.0.0:8080 0.0.0.0:0 LISTENING`

### Step 2: Test the health endpoint
Open your browser and go to:
```
http://localhost:8080/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "SeranGo API server is running",
  "version": "1.0.0"
}
```

### Step 3: Test authentication endpoint
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@serango.com","password":"admin123","role":"ADMIN"}'
```

## 🐛 **COMMON ISSUES & SOLUTIONS:**

### Issue 1: MongoDB Connection Failed
**Error:** `MongoDB connection failed`
**Solution:**
1. Install MongoDB
2. Start MongoDB service:
   - Windows: `net start MongoDB`
   - macOS: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

### Issue 2: Port 8080 Already in Use
**Error:** `Port 8080 already in use`
**Solution:**
1. Kill the process using port 8080:
   ```bash
   netstat -ano | findstr :8080
   taskkill /PID <PID_NUMBER> /F
   ```
2. Or change the port in `application.properties`:
   ```
   server.port=8081
   ```

### Issue 3: Java Version Issues
**Error:** `UnsupportedClassVersionError`
**Solution:**
1. Make sure you have Java 17+ installed
2. Check Java version: `java -version`
3. Set JAVA_HOME environment variable

### Issue 4: Maven Issues
**Error:** `Maven not found`
**Solution:**
1. Install Maven
2. Add Maven to PATH environment variable
3. Verify: `mvn -version`

## 📊 **APPLICATION FEATURES:**

Once running, you'll have access to:

### 🔐 **Authentication**
- Login: `POST /api/auth/login`
- Register: `POST /api/auth/register`
- Sample users: admin@serango.com / admin123

### 🗺️ **Destinations**
- Get all: `GET /api/destinations`
- Trending: `GET /api/destinations/trending`
- Search: `GET /api/destinations/search?query=paris`

### 🧳 **Trips**
- Create: `POST /api/trips`
- Generate AI itinerary: `POST /api/trips/{id}/generate-itinerary`
- Submit bid: `POST /api/trips/{id}/bids`

### 👥 **Guides**
- Available trips: `GET /api/guide/available-trips`
- Submit bid: `POST /api/guide/bids`
- Profile: `GET /api/guide/profile`

### ⭐ **Reviews**
- Create: `POST /api/reviews`
- Get guide reviews: `GET /api/reviews/guide/{guideId}`

### 💬 **Messages**
- Send: `POST /api/messages`
- Get conversation: `GET /api/messages/conversation`

### 🔔 **Notifications**
- Get notifications: `GET /api/notifications`
- Mark as read: `PUT /api/notifications/{id}/read`

### 👨‍💼 **Admin**
- Dashboard: `GET /api/admin/dashboard`
- Verify guides: `PUT /api/admin/guides/{id}/verify`

## 🎯 **NEXT STEPS:**

1. **Start MongoDB** (if not already running)
2. **Run the application**: `mvn spring-boot:run`
3. **Test the health endpoint** in your browser
4. **Explore the API** using the documentation
5. **Integrate with your frontend** application

The backend is now fully functional and ready to support your SeranGo frontend! 🚀
