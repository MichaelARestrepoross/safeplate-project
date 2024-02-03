import { Route, Routes, useNavigate,Link } from "react-router-dom";
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
import WeeklyMealPlan from "./components/UserProfile/WeeklyMealPlan";

const App = () => {
// Recipes
const [recipeList,setRecipeList] = useState([]);
const [editedRecipeList,setEditedRecipeList] = useState([]);
const [searchBarRecipeList, setSearchBarRecipeList] = useState([]);
const [addFavoriteCalled,setAddFavoriteCalled] = useState(false);

//Users
const [users, setUsers] = useState ([]);
const [user, setUser] = useState({});
const [selectedUser, setSelectedUser] = useState("");
const [loadingError, setLoadingError] = useState(false);

//Allergies
const [allergyList, setAllergyList] = useState([]);
const [addAllergyCalled, setAddAllergyCalled] = useState(false);

//Navigation tools
const navigate = useNavigate();

const navigateToHome = () => {
  console.log("Navigate to home")
  navigate('/');
};

const navigateToRecipes = () => {
  navigate('/recipe');
};

const navigateToProfiles = () => {
  navigate('/user');
};
const navigateToAbout = () => {
  navigate('/about');
};

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

}, [addAllergyCalled,addFavoriteCalled]);


  return (
    <div className="wrapper">
      <Header
      navigateToHome = {navigateToHome}
      navigateToRecipes = {navigateToRecipes}
      navigateToProfiles = {navigateToProfiles}
      navigateToAbout = {navigateToAbout}
      />
      <Routes>
        <Route path="/" element={<LandingPage 
          navigateToRecipes = {navigateToRecipes}
          navigateToProfiles = {navigateToProfiles}/>} 
        />
        <Route path="/recipe" element={<RecipeIndex 
          recipeList = {recipeList}
          setRecipeList = {setRecipeList}
          editedRecipeList = {editedRecipeList} 
          setEditedRecipeList = {setEditedRecipeList} 
          searchBarRecipeList = {searchBarRecipeList}
          setSearchBarRecipeList = {setSearchBarRecipeList}
          allergyList = {allergyList}
          user = {user}/>} 
        />
        <Route path="/recipe/:id" element={<RecipeDetailedView 
        user={user}
        navigateToProfiles = {navigateToProfiles}  
        addAllergyCalled = {addAllergyCalled}
        setAddFavoriteCalled = {setAddFavoriteCalled}
        />} />
        {/* Double check userProfile id might need to be a userId instead of just id if broken. */}
        <Route path="/user" element={<UserProfile 
          users = {users} 
          user = {user}
          setUser = {setUser} 
          selectedUser = {selectedUser}
          setSelectedUser ={setSelectedUser}
          recipeList = {recipeList} 
          allergyList= {allergyList} 
          setAllergyList = {setAllergyList}
          setAddAllergyCalled={setAddAllergyCalled}
          addAllergyCalled = {addAllergyCalled}
          setAddFavoriteCalled = {setAddFavoriteCalled}
          />} 
          
        />
        <Route path="/meal-plan" element={<WeeklyMealPlan />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>);
};

export default App;
