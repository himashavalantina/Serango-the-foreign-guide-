// Example of how to use the API from a client
const API_BASE_URL = 'http://localhost:3001';

async function callGeminiAPI(prompt, model = 'gemini-2.5-flash') {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        model: model
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error calling API:', error);
    throw error;
  }
}

// Example usage
async function example() {
  try {
    const result = await callGeminiAPI("Explain how AI works in a few words");
    console.log('API Response:', result);
  } catch (error) {
    console.error('Failed to get response:', error);
  }
}

// Uncomment to run the example
// example();
