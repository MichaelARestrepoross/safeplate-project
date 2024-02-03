import React from 'react';
import { useState } from 'react';

function WeeklyMealPlan({ user, myRecipes,recipeList }) {
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const weeklyMealsArray = Object.entries(user.weeklyMeals);

  function handleChange(recipe) {
    setSelectedRecipe(recipe);
  }

  return (
    <div className='weekly-mealplan-wrapper'>
      {console.log('weeklyMealsArray:', weeklyMealsArray)}
      {console.log('Slected Meal:', selectedRecipe)}
      <h1 className='Week-meal-plan-header'>{user.name}'s Weekly meal plan</h1>
      <div className='meal-plan-selector'>
        <ul style={{ overflow: 'scroll', height: '350px' }}>
          {myRecipes.map((recipe) => (
            <li key={recipe.id} onClick={() => handleChange(recipe)}>
              <br />
              <p>Name: {recipe.name}</p>
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
              <h2>breakfast</h2>
              {/* Map out user's breakfast recipes for the day */}
              {meals.breakfast.map((recipeId,index) => {
                if (recipeId !== "") {
                const recipe = recipeList.find((r) => r.id === recipeId);
                return (
                  <li key={recipeId + day + index}>
                    {recipe && (
                      <div>
                        <p>Name: {recipe.name}</p>
                        <img src={recipe.image} alt="" style={{ width: '100px', height: '100px' }} />
                      </div>
                    )}
                  </li>
                );
              }
              return null; // Skip rendering for empty strings
              })}
            </ul>
            <ul className='lunch'>
              <h2>Lunch</h2>
              {/* Map out user's lunch recipes for the day */}
              {meals.lunch.map((recipeId,index) => {
                if (recipeId !== "") {
                const recipe = recipeList.find((r) => r.id === recipeId);
                return (
                  <li key={recipeId + day +index}>
                    {recipe && (
                      <div>
                        <p>Name: {recipe.name}</p>
                        <img src={recipe.image} alt="" style={{ width: '100px', height: '100px' }} />
                      </div>
                    )}
                  </li>
                );
                }
                return null; // Skip rendering for empty strings
              })}
            </ul>
            <ul className='dinner'>
              <h2>Dinner</h2>
              {/* Map out user's dinner recipes for the day */}
              {meals.dinner.map((recipeId,index) => {
                if (recipeId !== "") {
                const recipe = recipeList.find((r) => r.id === recipeId);
                return (
                  <li key={recipeId + day + index}>
                    {recipe && (
                      <div>
                        <p>Name: {recipe.name}</p>
                        <img src={recipe.image} alt="" style={{ width: '100px', height: '100px' }} />
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
