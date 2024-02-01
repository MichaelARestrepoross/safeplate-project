import { Link,useNavigate } from 'react-router-dom'
import "./Header.css"
function Header() {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  const navigateToRecipes = () => {
    navigate('/recipe');
  };

  const navigateToProfiles = () => {
    navigate('/user');
  };
    return (
      <header>
      <Link to={'/'} onClick={navigateToHome}>
        <div>SafePlate</div>
      </Link>
      <h2 onClick={navigateToRecipes}>Recipes</h2>
      <h2 onClick={navigateToProfiles}>Profiles</h2>
    </header>
    )
  }
  
  export default Header