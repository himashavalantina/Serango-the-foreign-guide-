# How to Run SeranGo Backend

## ❌ **WRONG WAY** (What you tried):
```bash
cd "c:\Users\dines\OneDrive\Desktop\seranagofront\SeranGobackend\src\main\java\com\example\demo\"
javac SeranGoApplication.java
java SeranGoApplication
```

**Why this doesn't work:**
- Spring Boot applications have many dependencies (Spring Framework, MongoDB, JWT, etc.)
- These dependencies are not in the default Java classpath
- You need Maven to manage dependencies and build the application properly

## ✅ **CORRECT WAYS** to run the application:

### Method 1: Using Maven (Recommended)
```bash
cd "c:\Users\dines\OneDrive\Desktop\seranagofront\SeranGobackend"
mvn spring-boot:run
```

### Method 2: Build and run JAR file
```bash
cd "c:\Users\dines\OneDrive\Desktop\seranagofront\SeranGobackend"
mvn clean package
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

### Method 3: Using the provided scripts
```bash
# Windows
start.bat

# Linux/Mac
./start.sh
```

## Prerequisites:
1. **Java 17+** installed
2. **Maven 3.6+** installed
3. **MongoDB** running on localhost:27017

## Check if everything is working:
1. Start MongoDB
2. Run: `mvn spring-boot:run`
3. Open browser: `http://localhost:8080/api/health`
4. You should see: `{"status":"OK","message":"SeranGo API server is running","version":"1.0.0"}`

## Troubleshooting:
- If MongoDB is not running: Install and start MongoDB
- If Maven is not found: Install Maven and add to PATH
- If Java is not found: Install Java 17+ and add to PATH
- If port 8080 is busy: Change `server.port` in `application.properties`
