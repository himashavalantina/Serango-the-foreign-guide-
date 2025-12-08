@echo off
echo 🚀 Starting SeranGo Backend...

REM Check if Java is installed
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Java is not installed. Please install Java 17 or higher.
    pause
    exit /b 1
)

REM Check if Maven is installed
mvn -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Maven is not installed. Please install Maven 3.6 or higher.
    pause
    exit /b 1
)

REM Build the application
echo 🔨 Building application...
mvn clean compile

if %errorlevel% neq 0 (
    echo ❌ Build failed. Please check the errors above.
    pause
    exit /b 1
)

REM Start the application
echo 🎯 Starting SeranGo Backend on port 8080...
mvn spring-boot:run

echo ✅ SeranGo Backend started successfully!
echo 📡 API available at: http://localhost:8080
echo 🏥 Health check: http://localhost:8080/api/health
echo 📚 API Documentation: See README.md
pause
