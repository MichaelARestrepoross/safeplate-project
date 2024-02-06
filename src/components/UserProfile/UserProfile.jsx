import React from 'react'
import { useState, useEffect } from 'react';
import ErrorMessage3 from '../Errors/ErrorMessage3'
import { Link } from 'react-router-dom';
import { getAllRecipes,updateUserAllergies, updateUserFavorites } from '../../api/fetch';
import "./UserProfile.css"
import UserForm from './UserForm';

function UserProfile(
  {user ,setUser, users ,recipeList,myRecipes,setMyRecipes, allergyList,setAllergyList, setAddAllergyCalled,setAddFavoriteCalled,selectedUser,setSelectedUser,navigateToMealPlan,createUserToggle,setCreatedUserToggle}) {

   
    const [selectedUserId, setSelectedUserId] = useState("");
    const [newAllergy, setNewAllergy] = useState("");
    const [loadingError, setLoadingError] = useState(false);

    const addAllergy = async () => {
        try {
            if (!newAllergy.trim()) {
                // If the new allergy is empty, do nothing
                return;
            }
            const updatedAllergies = [...allergyList, newAllergy];
            
            // Update the user allergies on the server
            await updateUserAllergies(selectedUserId, updatedAllergies);
            
            setAllergyList(updatedAllergies);
            setAddAllergyCalled(true);
            setNewAllergy(""); // Clear the input field
        } catch (error) {
            console.error('Error updating allergies:', error);
            // Handle the error
        }
    };

    // Remove allergie code update code below as a format.

    const deleteAllergy = async (allergyToDelete) => {
        try {
          const updatedAllergies = allergyList.filter((allergy) => allergy !== allergyToDelete);
    
          // Update the user allergies on the server
          await updateUserAllergies(selectedUserId, updatedAllergies);
    
          setAllergyList(updatedAllergies);
          setAddAllergyCalled(true);
        } catch (error) {
            console.error('Error deleting allergies:', error);
            // Handle the error
        }
    };
    const deleteFavorite = async (newFavoriteId) => {
      try {          
          // const updatedFavorites = [...user.recipeIds, newFavoriteId];
          const updatedFavorites = user.recipeIds.filter((recipeId) => recipeId !== newFavoriteId);
          
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
    const fetchData = async () => {
      try {
        // If selectedUserId is not set, use the current user's ID as the default value
        const userIdToFetch = selectedUserId || user.id;

        if (userIdToFetch) {
          const data = await getAllRecipes();
          const userdata = users.find((user) => user.id === userIdToFetch);

          if (userdata) {
            // Filter recipes based on the user's recipeIds
            const filteredRecipes = recipeList.filter((recipe) => userdata.recipeIds.includes(recipe.id));
            setMyRecipes(filteredRecipes);

            setSelectedUser(userdata);
            setSelectedUserId(userdata.id);
            setUser(userdata);
            setAllergyList(userdata.allergies);
          } else {
            console.error("User not found");
          }

          setLoadingError(false);
          setAddAllergyCalled(false);
          setAddFavoriteCalled(false);
        }
      } catch (error) {
        console.error(error);
        setLoadingError(true);
      }
    };

    fetchData();
}, [selectedUserId, users, user]);  // Include user in the dependency array



    return (
        <div>
      {loadingError ? (
          <ErrorMessage3 />
      ) : (
        <div className='user-profile-wrapper'>
          <section className='user-profile'>
            <h2 className='users-name'>{selectedUser ? selectedUser.name : 'Select a user'}</h2>
            <p>Hello {selectedUser ? selectedUser.name : 'Select a user'}, would you like to edit your favorites or maybe your allergies today?</p>
            {selectedUser?  <h2 className='mealplan-link' onClick={navigateToMealPlan}> {selectedUser.name}'s meal plan</h2>  : null}
            {/* DropDown */}
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <p>Want to Create a user instead?</p>
            <UserForm
            createUserToggle = {createUserToggle}
            setCreatedUserToggle={setCreatedUserToggle}
            />
            {/* Displaying individual recipe information */}
            <h2>My favorites</h2>
            {console.log("Selected User:",selectedUser)}
            <ul className="favorites" style={{overflow:"scroll", height:"350px"}}>
              {myRecipes.length === 0 ? <p className='default-message'>Your Favorites will be placed here. <br /> Go to "Recipes" and add the recipe by clicking the recipe and then the "Add Recipe to Favorites" button. </p> : null}
              {myRecipes.map((recipe) => (
                <li className='single-favorite' key={recipe.id}>
                <br />
                <Link to={`/recipe/${recipe.id}`}>
                  <h3>{recipe.name}</h3>
                  <img src={recipe.image} alt="" style={{width: "200px", height:"200px"}} />
                  <p>Description: {recipe.description}</p>
                </Link>
                  <button onClick={() => deleteFavorite(recipe.id)}>
                        Delete
                    </button>
                <br />
                </li> 
              ))}
            </ul>
                    {console.log(allergyList)}
            <h2>My Allergies</h2>
            <ul className='allergy-list' style={{overflow:"scroll", height:"350px"}}>
              {allergyList.length === 0 ? <p className='default-message'>Your Allergies will be placed here. <br /> Scroll down to add your allergens.</p> : null}
              {allergyList ? allergyList.map((allergy,index) => (
                <li className='single-allergen' key={index}>
                    {allergy}
                    <button onClick={() => deleteAllergy(allergy)}>
                        Delete
                    </button>
                </li> 
              )): null}
            </ul>

            {/* Add Allergy input and button */}
            <div>
              <input
                type="text"
                placeholder="New Allergy"
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
              />
              <button onClick={addAllergy}>Add Allergy</button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default UserProfile