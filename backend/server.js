const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Replace 'YOUR_CHATGPT_API_KEY' with your actual ChatGPT API key
const API_KEY = 'YOUR_CHATGPT_API_KEY';

// Endpoint to handle recipe recommendations
app.post('/recommend', async (req, res) => {
  try {
    const { mealType, ingredients, optionalCriteria } = req.body;

    // Make a POST request to the ChatGPT API
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: `Find recipes for ${mealType} with ${ingredients.join(', ')} using ChatGPT`,
        max_tokens: 150,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
      }
    );

    // Process the API response and send it back to the frontend
    const recipeRecommendations = response.data.choices[0].text;
    res.json({ recommendations: recipeRecommendations });
  } catch (error) {
    console.error('Error in API request:', error.message);
    res.status(500).json({ error: 'Failed to fetch recipe recommendations.' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
