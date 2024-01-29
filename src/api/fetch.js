const URL = import.meta.env.VITE_BASE_API_URL

// Index/Get all
export function getAllRecipes() {
    return fetch(`${URL}/recipes`).then((response) => response.json());
  }

