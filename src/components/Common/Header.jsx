import { Link } from 'react-router-dom'
import "./Header.css"
function Header() {
    return (
      <Link to={'/'}>
        <header>
          <div>SafePlate</div>
        </header>
      </Link>
    )
  }
  
  export default Header