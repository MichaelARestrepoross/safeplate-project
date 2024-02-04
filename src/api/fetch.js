const URL = import.meta.env.VITE_BASE_API_URL

// Index/Get all
export function getAllRecipes() {
    return fetch(`${URL}/recipes`).then((response) => response.json());
  }

  export function getSingleRecipe(id) {
    return fetch(`${URL}/recipes/${id}`).then((response) => response.json());
  }

  export function getAllUserData() {
    return fetch(`${URL}/userData`).then((response) => response.json());
  }
  
  export function getSingleUser(id) {
    return fetch(`${URL}/userData/${id}`).then((response) => response.json());
  }
  
  export function getAllDifferentAllergies() {
    return fetch(`${URL}/differentAllergies`).then((response) => response.json());
  }

// Update user allergies
export function updateUserAllergies(userId, updatedAllergies) {
    return fetch(`${URL}/userData/${userId}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ allergies: updatedAllergies }),
    }).then((response) => response.json());
  }

// Update user Favorites
export function updateUserFavorites(userId, updatedFavoritesIds) {
  return fetch(`${URL}/userData/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ recipeIds: updatedFavoritesIds }),
  }).then((response) => response.json());
}

export async function updateUserMealPlan(userId, updatedMealDayPlan, day) {
  try {
    // Fetch the existing user meal plan
    const response = await fetch(`${URL}/userData/${userId}`);
    const userData = await response.json();
    const existingMealPlan = userData.weeklyMeals || {};

    // Update the specific day's meal plan
    existingMealPlan[day] = {
      breakfast: updatedMealDayPlan.breakfast || [],
      lunch: updatedMealDayPlan.lunch || [],
      dinner: updatedMealDayPlan.dinner || [],
    };

    

    // Update the backend with the modified meal plan
    const updateResponse = await fetch(`${URL}/userData/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        weeklyMeals: existingMealPlan,
      }),
    });

    if (!updateResponse.ok) {
      throw new Error(`Failed to update meal plan: ${updateResponse.statusText}`);
    }

    const updatedUserData = await updateResponse.json();
    console.log('Update Response:', updateResponse);
    console.log('Meal plan updated successfully!', updatedUserData);

    return updatedUserData; // Return the updated data if needed
  } catch (error) {
    console.error('Error updating meal plan:', error);
    throw error;
  }
}

