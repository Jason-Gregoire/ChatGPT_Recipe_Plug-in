// Function to handle form submission
async function handleSubmit(event) {
  event.preventDefault();

  // Get user inputs from the form
  const mealType = document.getElementById('mealType').value;
  const ingredients = [];
  const ingredientInputs = document.getElementsByClassName('ingredient-input');
  for (const input of ingredientInputs) {
    if (input.value.trim() !== '') {
      ingredients.push(input.value.trim());
    }
  }

  // Get optional criteria from the form
  const optionalCriteria = document.getElementById('optionalCriteria').value;

  // Prepare the request data
  const requestData = {
    mealType,
    ingredients,
    optionalCriteria,
  };

  try {
    // Make a POST request to the backend
    const response = await fetch('http://localhost:5000/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    // Process the response and display recipe recommendations
    const data = await response.json();
    const recipeRecommendations = data.recommendations;
    displayRecommendations(recipeRecommendations);
  } catch (error) {
    console.error('Error in fetching recipe recommendations:', error);
  }
}

// Function to display recipe recommendations
function displayRecommendations(recommendations) {
  const recommendationsContainer = document.getElementById('recommendations');
  recommendationsContainer.innerHTML = `<h3>Recipe Recommendations:</h3><p>${recommendations}</p>`;
}

// Add event listener to the form submit button
const form = document.getElementById('recipeForm');
form.addEventListener('submit', handleSubmit);
