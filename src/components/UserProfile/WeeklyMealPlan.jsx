import React from 'react';
import { useState,useEffect } from 'react';
import "./WeeklyMealPlan.css"

import { updateUserMealPlan } from '../../api/fetch';

function WeeklyMealPlan({ user, myRecipes,recipeList }) {
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const weeklyMealsArray = Object.entries(user.weeklyMeals || {});
  const [updateTrigger, setUpdateTrigger] = useState(false);

  function handleChange(recipe) {
    setSelectedRecipe(recipe);
  }

// Function to add a recipe to the weekly meal plan
const addRecipeToMealPlan = async (day, mealType, recipeId) => {
  if (Object.keys(selectedRecipe).length === 0) {
    // If selectedRecipe is empty, do nothing
    return;
  }

  const updatedMealDayPlan = { ...user.weeklyMeals[day] };
  updatedMealDayPlan[mealType].push(recipeId);

  try {
    // Update the backend and then update the state
    await updateUserMealPlan(user.id, updatedMealDayPlan, day);
    setUpdateTrigger(!updateTrigger);
  } catch (error) {
    console.error('Error adding recipe to meal plan:', error);
  }
};


const deleteRecipeFromMealPlan = async (day, mealType, recipeId) => {
  const updatedMealDayPlan = { ...user.weeklyMeals[day] };

  if (updatedMealDayPlan[mealType]) {
    const index = updatedMealDayPlan[mealType].indexOf(recipeId);

    if (index !== -1) {
      updatedMealDayPlan[mealType].splice(index, 1);

      try {
        await updateUserMealPlan(user.id, updatedMealDayPlan, day);
        setUpdateTrigger((prev) => !prev);
      } catch (error) {
        console.error('Error deleting recipe from meal plan:', error);
      }
    }
  }
};

useEffect(() => {
  console.log('Recipe added or deleted. Do something here!');
}, [updateTrigger]);

  return (
    <div className='weekly-mealplan-wrapper'>
      <h1 className='week-meal-plan-header'>{user.name}'s Weekly meal plan</h1>
      <div className='meal-plan-selector'>
        <ul className='favorite-options' style={{ overflow: 'scroll', height: '350px' }}>
          {myRecipes.map((recipe) => (
            <li
              className={selectedRecipe.id === recipe.id ? 'selected-recipe' : 'unselected-recipe'}
              key={recipe.id}
              onClick={() => handleChange(recipe)}
            >
              <br />
              <h4>{recipe.name}</h4>
              <img src={recipe.image} alt="" style={{ width: '200px', height: '200px' }} />
              <p>Description: {recipe.description}</p>
              <br />
            </li>
          ))}
        </ul>
      </div>
      <div className='the-meal-plan-days'>
        {weeklyMealsArray.map(([day, meals], index) => (
          <section className={day} key={index}>
            <h1>{day}</h1>
            <ul className='breakfast'>
              <h2 className='meal-type'>Breakfast</h2>
              <button onClick={() => {console.log("Day:",day, "SelectedRecipeID:",selectedRecipe.id),addRecipeToMealPlan(day, 'breakfast', selectedRecipe.id)}}>Add</button>
              
              {meals.breakfast && Array.isArray(meals.breakfast) ? (
                meals.breakfast.map((recipeId, index) => {
                  if (recipeId !== "") {
                    const recipe = recipeList.find((r) => r.id === recipeId);
                    return (
                      <li className='scheduled-meal breakfast' key={recipeId + day + index}>
                        {recipe && (
                          <div>
                            <h4>{recipe.name}</h4>
                            <img src={recipe.image} alt="" style={{ width: '100px', height: '100px' }} />
                            <button className="delete-button" onClick={() =>{ console.log("theDay:",day,"recipeID:",recipeId),deleteRecipeFromMealPlan(day, 'breakfast', recipeId)}}>Delete</button>
                          </div>
                        )}
                      </li>
                    );
                  }
                  return null; // Skip rendering for empty strings
                })
              ) : (
                <p>No breakfast recipes available</p>
              )}
            </ul>
            <ul className='lunch'>
              <h2 className='meal-type'>Lunch</h2>
              <button onClick={() => addRecipeToMealPlan(day, 'lunch', selectedRecipe.id)}>Add</button>
              {/* Map out user's lunch recipes for the day */}
              {meals.lunch && meals.lunch.map((recipeId,index) => {
                if (recipeId !== "") {
                const recipe = recipeList.find((r) => r.id === recipeId);
                return (
                  <li className='scheduled-meal lunch' key={recipeId + day +index}>
                    {recipe && (
                      <div>
                        <h4>{recipe.name}</h4>
                        <img src={recipe.image} alt="" style={{ width: '100px', height: '100px' }} />
                        <button className="delete-button" onClick={() => deleteRecipeFromMealPlan(day, 'lunch', recipeId)}>Delete</button>
                      </div>
                    )}
                  </li>
                );
                }
                return null; // Skip rendering for empty strings
              })}
            </ul>
            <ul className='dinner'>
              <h2 className='meal-type'>Dinner</h2>
              <button onClick={() => addRecipeToMealPlan(day, 'dinner', selectedRecipe.id)}>Add</button>
              {/* Map out user's dinner recipes for the day */}
              {meals.dinner && meals.dinner.map((recipeId,index) => {
                if (recipeId !== "") {
                const recipe = recipeList.find((r) => r.id === recipeId);
                return (
                  <li className='scheduled-meal dinner' key={recipeId + day + index}>
                    {recipe && (
                      <div>
                        <p>Name: {recipe.name}</p>
                        <img src={recipe.image} alt="" style={{ width: '100px', height: '100px' }} />
                        <button className="delete-button" onClick={() => deleteRecipeFromMealPlan(day, 'dinner', recipeId)}>Delete</button>
                      </div>
                    )}
                  </li>
                );
              }
              return null; // Skip rendering for empty strings
              })}
            </ul>
          </section>
        ))}
      </div>

  </div>
  );
}

export default WeeklyMealPlan;
