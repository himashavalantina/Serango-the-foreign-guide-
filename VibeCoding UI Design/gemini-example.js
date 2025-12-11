// Converted from TypeScript to JavaScript
const { GoogleGenAI } = require('@google/genai');

// Initialize with your API key
const ai = new GoogleGenAI({ apiKey: "API_KEY" });

async function main() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Explain how AI works in a few words",
    });
    console.log(response.text);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the function
main();
