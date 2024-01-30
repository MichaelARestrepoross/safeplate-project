import { useState, useEffect } from 'react';
import { getAllRecipes } from '../../api/fetch';
import RecipeView from './RecipeView'
import ErrorMessage from '../Errors/ErrorMessage';
import "./RecipeIndex.css"

function RecipeIndex({editedRecipeList,setEditedRecipeList,setRecipeList}) {

    const [loadingError, setLoadingError] = useState(false);

    useEffect(() => {
      if(editedRecipeList.length===0){
        getAllRecipes()
        .then((data) => {
            setRecipeList(data);
            setEditedRecipeList(data);
            setLoadingError(false);
        })
        .catch((error) => {
            console.error(error);
            setLoadingError(true);
        });
      }
    }, []);
  return (
    <div>
      {loadingError ? (
          <ErrorMessage />
          ) : (
          <div className='index-wrapper'>
            <section className='all-recipes'>
                {editedRecipeList.map((recipe) => {
                    return  <RecipeView recipe={recipe} key={recipe.id}/>;
                })}
            </section>
          </div>
      )}
    </div>
  )
}

export default RecipeIndex