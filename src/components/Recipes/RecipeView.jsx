import { Link } from 'react-router-dom'
import React from 'react'
import "./RecipeView.css"

function RecipeView({
    recipe: {id,name,image,description}}) {
  return (
    <Link className='single-recipe' to={`/recipe/${id}`}>
    <article>
      <h2 className='recipe-name'>
        {name}  
      </h2>
      <div className='food-image'>
        <img src={image} alt={`${name}'s image`} />
      </div>
      <div className='description-wrapper'>
        <p>{description}</p>
      </div>
    </article>
    </Link>
  )
}

export default RecipeView