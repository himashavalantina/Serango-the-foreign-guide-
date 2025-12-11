const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google GenAI
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || "API_KEY" });

// API endpoint for Gemini AI
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, model = "gemini-2.5-flash" } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    res.json({
      success: true,
      response: response.text,
      model: model
    });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ 
      error: 'Failed to generate content',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API server is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Gemini AI API Server',
    endpoints: {
      'POST /api/generate': 'Generate content using Gemini AI',
      'GET /api/health': 'Health check'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log(`📝 Available endpoints:`);
  console.log(`   POST /api/generate - Generate content with Gemini AI`);
  console.log(`   GET /api/health - Health check`);
});
