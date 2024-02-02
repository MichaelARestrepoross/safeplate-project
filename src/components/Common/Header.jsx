import { Link } from 'react-router-dom'
import "./Header.css"
function Header({navigateToHome,navigateToRecipes,navigateToProfiles,navigateToAbout}) {

    return (
      <header className='Header-wrapper'>
      <Link to={'/'} onClick={navigateToHome}>
        <div className='home-h1'>SafePlate</div>
      </Link>
      <div className='navigate-wrapper'>
        <h2 onClick={navigateToRecipes}>Recipes</h2>
        <h2 onClick={navigateToProfiles}>Profiles</h2>
        <h2 onClick={navigateToAbout}>About Us</h2>
      </div>
    </header>
    )
  }
  
  export default Header