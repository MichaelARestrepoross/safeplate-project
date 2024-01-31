import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

//calling api test
import { getAllRecipes,getAllUserData,getAllDifferentAllergies } from './api/fetch';

//Components
import Header from "./components/Common/Header";
import LandingPage from "./components/Common/LandingPage";
import AboutPage from "./components/Common/AboutPage";
import RecipeIndex from "./components/Recipes/RecipeIndex";
import RecipeDetailedView from "./components/Recipes/RecipeDetailedView";
import UserProfile from "./components/UserProfile/UserProfile";

const App = () => {
// Recipes
const [recipeList,setRecipeList] = useState([]);
const [editedRecipeList,setEditedRecipeList] = useState([]);

//Users
const [users, setUsers] = useState ([]);
const [user, setUser] = useState({});
const [loadingError, setLoadingError] = useState(false);

//Allergies
const [allergyList, setAllergyList] = useState([]);

useEffect(() => {
  getAllUserData()
    .then((data) => {
      setUsers(data)
      console.log(data);
      setLoadingError(false);
    })
    .catch((error) => {
      console.error(error);
      setLoadingError(true);
    });

}, []);
useEffect(() => {
  getAllRecipes()
    .then((data) => {
      setRecipeList(data)
      setEditedRecipeList(data)
      console.log(data);
      // setLoadingError(false); edit this to
    })
    .catch((error) => {
      console.error(error);
      // setLoadingError(true);
    });

}, []);

  return (
    <div className="wrapper">
      Basic Pursuit React Starter
      <Header/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/recipe" element={<RecipeIndex 
          editedRecipeList = {editedRecipeList} 
          setEditedRecipeList = {setEditedRecipeList} 
          setRecipeList = {setRecipeList}/>} 
        />
        <Route path="/recipe/:id" element={<RecipeDetailedView />} />
        {/* Double check userProfile id might need to be a userId instead of just id if broken. */}
        <Route path="/user" element={<UserProfile 
          users = {users} 
          user = {user}
          setUser = {setUser} 
          recipeList = {recipeList} 
          allergyList= {allergyList} 
          setAllergyList = {setAllergyList}/>} 
        />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>);
};

export default App;
