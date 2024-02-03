import React from 'react'

function WeeklyMealPlan({user,myRecipes}) {

  return (
    <div className='weekly-mealplan-wrapper'>
      <h1 className='Week-meal-plan-header'>
        {user.name}'s Weekly meal plan
      </h1>
      <div className='meal-plan-selector'>
      <ul style={{overflow:"scroll", height:"350px"}}>
              {myRecipes.map((recipe) => (
                <li key={recipe.id} >
                <br />
                  <p>Name: {recipe.name}</p>
                  <img src={recipe.image} alt="" style={{width: "200px", height:"200px"}} />
                  <p>Description: {recipe.description}</p>
                <br />
                </li> 
              ))}
            </ul>
      </div>
      <div className='the-meal-plan-days'>


      </div>
    </div>
  )
}

export default WeeklyMealPlan