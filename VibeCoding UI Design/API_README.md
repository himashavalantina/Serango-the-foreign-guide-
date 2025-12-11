# Gemini AI API Server

This is a JavaScript API server that provides access to Google's Gemini AI model through a REST API.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set your Google API key (create a `.env` file):
```
GOOGLE_API_KEY=
PORT=3001
```

3. Start the server:
```bash
npm run server
# or
npm start
```

## API Endpoints

### POST /api/generate
Generate content using Gemini AI.

**Request Body:**
```json
{
  "prompt": "Your prompt here",
  "model": "gemini-2.5-flash" // optional, defaults to gemini-2.5-flash
}
```

**Response:**
```json
{
  "success": true,
  "response": "Generated content from AI",
  "model": "gemini-2.5-flash"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "API server is running"
}
```

## Usage Examples

### Direct JavaScript Usage
```javascript
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });

async function generateContent(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
}
```

### API Client Usage
```javascript
async function callGeminiAPI(prompt) {
  const response = await fetch('http://localhost:3001/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  return await response.json();
}
```

## Files Created

- `server.js` - Main API server
- `gemini-example.js` - Direct JavaScript usage example
- `api-client-example.js` - API client usage example
- `API_README.md` - This documentation

## Notes

- The API key is currently hardcoded in the server.js file
- For production, use environment variables for the API key
- The server runs on port 3001 by default
- CORS is enabled for cross-origin requests
