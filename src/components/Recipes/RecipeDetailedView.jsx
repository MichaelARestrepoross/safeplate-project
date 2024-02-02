import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ErrorMessage2 from "../Errors/ErrorMessage2"

import { getSingleRecipe ,updateUserFavorites } from "../../api/fetch"

import "./RecipeDetailedView.css"

function RecipeDetailedView({user,navigateToProfiles,addAllergyCalled,setAddFavoriteCalled}) {
    const { id } = useParams();
    const [loadingError, setLoadingError] = useState(false);
    const [newFavoriteId, setNewFavoriteId] = useState("");

  const [recipe, setRecipe] = useState({
    id: "",
    name: "",
    image: "",
    description: "",
    ingredients: [],
    instructions: []
  });

  const addFavorite = async () => {
    try {
        if (!newFavoriteId.trim()|| user.recipeIds.includes(newFavoriteId)) {
            // If the new allergy is empty, do nothing or if the recipe is already in the list
            return;
        }
        
        const updatedFavorites = [...user.recipeIds, newFavoriteId];
        
        // Update the user allergies on the server
        await updateUserFavorites(user.id, updatedFavorites);
        
        setAddFavoriteCalled(true);
        setNewFavoriteId(""); 
    } catch (error) {
        console.error('Error updating favorites:', error);
        // Handle the error
    }
};

  useEffect(() => {
    getSingleRecipe(id)
      .then((data) => {
          setRecipe(data);
          if(user){
            setNewFavoriteId(id)
            setAddFavoriteCalled(false);
          }
          setLoadingError(false);
      })
      .catch((error) => {
          console.error(error);
          setLoadingError(true);
      });
  }, [id]);
      
  return (
    <div>
      {loadingError ? (
          <ErrorMessage2 />
          ) : (
          <div className='detailed-recipe-wrapper'>
            <div className="button-wrapper">
                {user.name ? <button className="add-favorite-button" onClick={addFavorite}>
                    Add to {user.name}'s favorites
                </button> : <button className="add-favorite-button" onClick={navigateToProfiles}>
                     Click here to select a user.
                </button> }
            </div>
            <section className='detailed-recipe'>
                <h2 className='recipe-name'>
                    {recipe.name}  
                </h2>
                <div className='food-image'>
                    <img src={recipe.image} alt={`${recipe.name}'s image`} />
                </div>
                <div className='description-wrapper'>
                    <p>{recipe.description}</p>
                </div>
                <div className='ingredients-wrapper'>
                    <ul>
                        {recipe.ingredients.map((ingredient,index) => {
                            return <li className="ingredient-item" key={index}>{ingredient}</li>;
                        })}
                    </ul>
                </div>
                <div className='instructions-wrapper'>
                    <ol>
                        {recipe.instructions.map((instruction,index) => {
                            return <li className="instruction-item" key={index}>{instruction}</li>;
                        })}
                    </ol>
                </div>
            </section>
          </div>
      )}
    </div>
  )
}

export default RecipeDetailedView