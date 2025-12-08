# SeranGo Backend API

A comprehensive Spring Boot backend for the SeranGo AI-powered trip planning platform.

## Features

- **User Management**: Support for Tourists, Guides, and Admins with role-based authentication
- **Trip Planning**: AI-powered itinerary generation using Gemini AI
- **Guide Marketplace**: Bidding system for guides to offer their services
- **Real-time Messaging**: WebSocket-based chat system
- **Reviews & Ratings**: Comprehensive review system with category ratings
- **Notifications**: Real-time notifications for trip updates and flight alerts
- **Admin Dashboard**: Complete admin panel for platform management
- **Destination Management**: Sustainability scoring and destination management

## Technology Stack

- **Framework**: Spring Boot 3.5.6
- **Database**: MongoDB
- **Security**: Spring Security with JWT
- **AI Integration**: Google Gemini AI API
- **Real-time**: WebSocket with STOMP
- **Validation**: Bean Validation
- **Documentation**: Spring Boot Actuator

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Trips
- `POST /api/trips` - Create new trip
- `POST /api/trips/{id}/generate-itinerary` - Generate AI itinerary
- `POST /api/trips/{id}/bids` - Submit guide bid
- `POST /api/trips/{id}/bids/{bidId}/accept` - Accept guide bid
- `PUT /api/trips/{id}/status` - Update trip status
- `POST /api/trips/{id}/verify-qr` - Verify guide QR code
- `GET /api/trips/my-trips` - Get user's trips
- `GET /api/trips/available` - Get available trips for guides

### Destinations
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/trending` - Get trending destinations
- `GET /api/destinations/featured` - Get featured destinations
- `GET /api/destinations/search?query=` - Search destinations
- `POST /api/destinations` - Create destination (Admin)
- `PUT /api/destinations/{id}` - Update destination (Admin)

### Guides
- `GET /api/guide/available-trips` - Get available trips
- `POST /api/guide/bids` - Submit bid
- `GET /api/guide/my-trips` - Get guide's trips
- `GET /api/guide/profile` - Get guide profile
- `PUT /api/guide/profile` - Update guide profile
- `GET /api/guide/guides` - Get all guides
- `GET /api/guide/guides/location/{location}` - Get guides by location

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/guide/{guideId}` - Get guide reviews
- `GET /api/reviews/trip/{tripId}` - Get trip reviews
- `PUT /api/reviews/{id}` - Update review
- `DELETE /api/reviews/{id}` - Delete review

### Messages
- `POST /api/messages` - Send message
- `GET /api/messages/conversation` - Get conversation
- `GET /api/messages/my-messages` - Get user messages
- `GET /api/messages/unread-count` - Get unread count

### Notifications
- `GET /api/notifications` - Get user notifications
- `GET /api/notifications/unread` - Get unread notifications
- `PUT /api/notifications/{id}/read` - Mark as read

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/users` - Get all users
- `GET /api/admin/guides/pending` - Get pending guides
- `PUT /api/admin/guides/{id}/verify` - Verify guide
- `GET /api/admin/trips` - Get all trips

## Setup Instructions

### Prerequisites
- Java 17+
- MongoDB
- Maven 3.6+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SeranGobackend
   ```

2. **Configure MongoDB**
   - Install and start MongoDB
   - Default connection: `mongodb://localhost:27017/serango`

3. **Configure AI Integration**
   - Update `ai.gemini.api-key` in `application.properties`
   - Ensure the Gemini AI server is running on port 3001

4. **Build and Run**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

5. **Access the API**
   - Base URL: `http://localhost:8080`
   - Health Check: `http://localhost:8080/api/health`

### Environment Variables

Create a `.env` file or set environment variables:
```bash
# MongoDB
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_DATABASE=serango

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=86400000

# AI Integration
AI_GEMINI_API_KEY=your-gemini-api-key
AI_GEMINI_BASE_URL=http://localhost:3001
```

## Sample Data

The application automatically initializes with sample data including:
- 8 sample destinations with sustainability scores
- Sample admin user (admin@serango.com / admin123)
- Sample tourists and guides with profiles
- Pre-configured user roles and permissions

## Security

- JWT-based authentication
- Role-based authorization (TOURIST, GUIDE, ADMIN)
- CORS enabled for frontend integration
- Password encryption with BCrypt

## Real-time Features

- WebSocket support for real-time messaging
- STOMP protocol for message routing
- User-specific message delivery
- Notification system for trip updates

## API Documentation

The API follows RESTful conventions with:
- JSON request/response format
- HTTP status codes
- Error handling with meaningful messages
- Input validation
- CORS support

## Development

### Running Tests
```bash
mvn test
```

### Building for Production
```bash
mvn clean package -Pprod
```

### Database Migration
The application uses MongoDB with automatic schema creation. No manual migration is required.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
