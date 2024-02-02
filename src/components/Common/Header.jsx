import { Link } from 'react-router-dom'
import "./Header.css"
function Header({navigateToHome,navigateToRecipes,navigateToProfiles}) {

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