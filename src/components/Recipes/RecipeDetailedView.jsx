import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ErrorMessage2 from "../Errors/ErrorMessage2"

import { getSingleRecipe} from "../../api/fetch"

import "./RecipeDetailedView.css"

function RecipeDetailedView() {
    const { id } = useParams();
    const [loadingError, setLoadingError] = useState(false);

  const [recipe, setRecipe] = useState({
    id: "",
    name: "",
    image: "",
    description: "",
    ingredients: [],
    instructions: []
  });

  useEffect(() => {
    getSingleRecipe(id)
      .then((data) => {
          setRecipe(data);
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