# SeranGo Backend API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### 1. Authentication

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "role": "TOURIST"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "userId": "user-id",
  "email": "user@example.com",
  "role": "TOURIST",
  "fullName": "John Doe",
  "profileImage": "profile-image-url"
}
```

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "role": "TOURIST"
}
```

### 2. Trips

#### Create Trip
```http
POST /api/trips
Authorization: Bearer <token>
Content-Type: application/json

{
  "destination": "Paris, France",
  "arrivalDate": "2024-06-01T10:00:00",
  "departureDate": "2024-06-05T18:00:00",
  "groupSize": 2,
  "budget": "Moderate $500-1500",
  "interests": ["Historical Sites", "Food & Dining"],
  "additionalPreferences": "Interested in local cuisine"
}
```

#### Generate AI Itinerary
```http
POST /api/trips/{tripId}/generate-itinerary
Authorization: Bearer <token>
```

#### Submit Guide Bid
```http
POST /api/trips/{tripId}/bids
Authorization: Bearer <token>
Content-Type: application/json

{
  "tripId": "trip-id",
  "amount": 150.0,
  "message": "I'd love to show you around Paris!"
}
```

#### Accept Bid
```http
POST /api/trips/{tripId}/bids/{bidId}/accept
Authorization: Bearer <token>
```

#### Get My Trips
```http
GET /api/trips/my-trips
Authorization: Bearer <token>
```

#### Get Available Trips (for guides)
```http
GET /api/trips/available
Authorization: Bearer <token>
```

### 3. Destinations

#### Get All Destinations
```http
GET /api/destinations
```

#### Get Trending Destinations
```http
GET /api/destinations/trending
```

#### Search Destinations
```http
GET /api/destinations/search?query=paris
```

#### Get Destination by ID
```http
GET /api/destinations/{id}
```

### 4. Guides

#### Get Available Trips
```http
GET /api/guide/available-trips
Authorization: Bearer <token>
```

#### Submit Bid
```http
POST /api/guide/bids
Authorization: Bearer <token>
Content-Type: application/json

{
  "tripId": "trip-id",
  "amount": 200.0,
  "message": "I'm an experienced local guide!"
}
```

#### Get Guide Profile
```http
GET /api/guide/profile
Authorization: Bearer <token>
```

#### Update Guide Profile
```http
PUT /api/guide/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "bio": "Experienced local guide",
  "location": "Paris, France",
  "languages": ["French", "English"],
  "certifications": ["Tour Guide License"],
  "specialties": ["Historical Sites", "Food Tours"],
  "experienceYears": 5
}
```

#### Get Guides by Location
```http
GET /api/guide/guides/location/paris
```

### 5. Reviews

#### Create Review
```http
POST /api/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "tripId": "trip-id",
  "rating": 5,
  "comment": "Amazing experience!",
  "photos": ["photo1.jpg", "photo2.jpg"],
  "categoryRatings": {
    "communication": 5,
    "knowledge": 5,
    "punctuality": 4,
    "value": 5
  }
}
```

#### Get Guide Reviews
```http
GET /api/reviews/guide/{guideId}
```

#### Get My Reviews
```http
GET /api/reviews/my-reviews
Authorization: Bearer <token>
```

### 6. Messages

#### Send Message
```http
POST /api/messages
Authorization: Bearer <token>
Content-Type: application/x-www-form-urlencoded

receiverId=guide-id&content=Hello!&type=TEXT
```

#### Get Conversation
```http
GET /api/messages/conversation?userId1=user1&userId2=user2
Authorization: Bearer <token>
```

#### Get Unread Count
```http
GET /api/messages/unread-count
Authorization: Bearer <token>
```

### 7. Notifications

#### Get My Notifications
```http
GET /api/notifications
Authorization: Bearer <token>
```

#### Get Unread Notifications
```http
GET /api/notifications/unread
Authorization: Bearer <token>
```

#### Mark as Read
```http
PUT /api/notifications/{notificationId}/read
Authorization: Bearer <token>
```

### 8. Admin

#### Get Dashboard Stats
```http
GET /api/admin/dashboard
Authorization: Bearer <token>
```

#### Get All Users
```http
GET /api/admin/users
Authorization: Bearer <token>
```

#### Get Pending Guides
```http
GET /api/admin/guides/pending
Authorization: Bearer <token>
```

#### Verify Guide
```http
PUT /api/admin/guides/{guideId}/verify
Authorization: Bearer <token>
```

#### Create Destination
```http
POST /api/admin/destinations
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Rome, Italy",
  "country": "Italy",
  "description": "Eternal city with ancient history",
  "sustainabilityScore": 75,
  "isTrending": false,
  "isFeatured": true
}
```

## WebSocket Endpoints

### Real-time Messaging
```
ws://localhost:8080/ws
```

**Message Types:**
- `/app/chat.sendMessage` - Send message
- `/app/chat.addUser` - Add user to chat
- `/app/chat.private` - Send private message

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request data",
  "message": "Validation failed"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Sample Data

The application comes with pre-loaded sample data:

### Sample Users
- **Admin**: admin@serango.com / admin123
- **Tourist**: tourist1@serango.com / password123
- **Guide**: guide1@serango.com / password123

### Sample Destinations
- Santorini, Greece (Sustainability: 85)
- Kyoto, Japan (Sustainability: 92)
- Paris, France (Sustainability: 72)
- Barcelona, Spain (Sustainability: 68)
- And more...

## Rate Limiting
- No rate limiting implemented (can be added if needed)

## CORS
- Enabled for all origins in development
- Configured for localhost:3000 and localhost:5173

## Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "SeranGo API server is running",
  "version": "1.0.0"
}
```
