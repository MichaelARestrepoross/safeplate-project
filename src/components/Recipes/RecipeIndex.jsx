import { useState, useEffect } from 'react';
import { getAllRecipes } from '../../api/fetch';
import RecipeView from './RecipeView'
import ErrorMessage from '../Errors/ErrorMessage';
import "./RecipeIndex.css"

function RecipeIndex({recipeList,setRecipeList,editedRecipeList,setEditedRecipeList,searchBarRecipeList,setSearchBarRecipeList,allergyList, user}) {

    const [loadingError, setLoadingError] = useState(false);

    async function allergyRecipeFilter(theAllergyList,editedRecipeList) {
      let newEditedRecipeList = [...recipeList]; 
      console.log("The List:",allergyList);
      theAllergyList.forEach((allergy)=>{
        console.log("The Alergy:", allergy)
        // Filter out recipes that include the allergy
         newEditedRecipeList = newEditedRecipeList.filter((recipe,i) => {
          const ingredientString = recipe.ingredients.join(",")
          return !(ingredientString.includes(allergy));
        });
      })
      console.log(newEditedRecipeList)
      setEditedRecipeList(newEditedRecipeList);
    }
    
    useEffect(() => {
      getAllRecipes()
        .then((data) => {
          setRecipeList(data)
          if(editedRecipeList.length===0){
            setEditedRecipeList(data)
          }
          console.log(data);
          setLoadingError(false); 
        })
        .catch((error) => {
          console.error(error);
          setLoadingError(true);
        });
    
    }, []);

    useEffect(()=>{
      if(user){
        allergyRecipeFilter(allergyList,editedRecipeList)
        console.log("Edited REcipe List",editedRecipeList)
        console.log("user", user)
      }
    },[user])

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