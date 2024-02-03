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

// Update user User meal-plan
export function updateUserMealPlan(userId, UpdatedMealDayPlan, day) {
  // Assuming UpdatedMealDayPlan is an object with keys like "breakfast," "lunch," and "dinner"
  const updatedBody = {
    weeklyMeals: {
      [day]: {
        breakfast: UpdatedMealDayPlan.breakfast || [],
        lunch: UpdatedMealDayPlan.lunch || [],
        dinner: UpdatedMealDayPlan.dinner || [],
      },
    },
  };

  return fetch(`${URL}/userData/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedBody),
  }).then((response) => response.json());
}
