import { useState, useEffect } from 'react';
import { getAllRecipes } from '../../api/fetch';
import RecipeView from './RecipeView'
import ErrorMessage from '../Errors/ErrorMessage';
import "./RecipeIndex.css"

function RecipeIndex({recipeList,setRecipeList,editedRecipeList,setEditedRecipeList,searchBarRecipeList,setSearchBarRecipeList,allergyList, user}) {

    const [loadingError, setLoadingError] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    async function allergyRecipeFilter(theAllergyList) {
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


    const handleSearchInputChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    
    useEffect(() => {
      getAllRecipes()
        .then((data) => {
          setRecipeList(data)
          if(editedRecipeList.length===0){
            setEditedRecipeList(data)
          }
          console.log("The Data:",data);
          setLoadingError(false); 
        })
        .catch((error) => {
          console.error(error);
          setLoadingError(true);
        });
    
    }, []);

    useEffect(()=>{
      if(user){
        allergyRecipeFilter(allergyList)
        console.log("Edited REcipe List",editedRecipeList)
        console.log("user", user)
      }
    },[user])


    useEffect(() => {
      // Update the edited recipe list based on the search term
      const filteredRecipes = editedRecipeList.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchBarRecipeList(filteredRecipes);
    }, [searchTerm,editedRecipeList]);

  return (
    <div>
      {loadingError ? (
          <ErrorMessage />
          ) : (
          <div className='index-wrapper'>
            <input
              type='text'
              placeholder='Search recipes...'
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
            <section className='all-recipes'>
                {searchBarRecipeList.map((recipe) => {
                    return  <RecipeView recipe={recipe} key={recipe.id}/>;
                })}
            </section>
          </div>
      )}
    </div>
  )
}

export default RecipeIndex