import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { getAllRecipes} from "../../api/fetch"

import ErrorMessage2 from "../Errors/ErrorMessage2"

function RecipeDetailedView({
    recipe: {id,name,image,description, ingredients,instructions}}) {
  return (
    <div>
      {loadingError ? (
          <ErrorMessage />
          ) : (
          <div className='detailed-recipe-wrapper'>
            <section className='detailed-recipe'>
                <h2 className='recipe-name'>
                    {name}  
                </h2>
                <div className='food-image'>
                    <img src={image} alt={`${name}'s image`} />
                </div>
                <div className='description-wrapper'>
                    <p>{description}</p>
                </div>
                <div className='ingredients-wrapper'>
                    <ul>
                        {ingredients.map((ingredient) => {
                            return <li>{ingredient}</li>;
                        })}
                    </ul>
                </div>
                <div className='instructions-wrapper'>
                    <ol>
                        {instructions.map((instruction) => {
                            return <li>{instruction}</li>;
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