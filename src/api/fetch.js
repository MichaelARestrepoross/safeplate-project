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

  export function getAllDifferentAllergies() {
    return fetch(`${URL}/differentAllergies`).then((response) => response.json());
  }


