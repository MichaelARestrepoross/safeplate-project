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
const [users, setUsers] = useState ([]);
const [user, setUser] = useState({});
const [loadingError, setLoadingError] = useState(false);

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

  return (
    <div className="wrapper">
      Basic Pursuit React Starter
      <Header/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/recipe-index" element={<RecipeIndex />} />
        <Route path="/recipe:id" element={<RecipeDetailedView />} />
        {/* Double check userProfile id might need to be a userId instead of just id if broken. */}
        <Route path="/user-profile:id" element={<UserProfile />} />
        <Route path="/about-page" element={<AboutPage />} />
      </Routes>
    </div>);
};

export default App;
