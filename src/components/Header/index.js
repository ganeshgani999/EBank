import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logoutOutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }
  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          className="logo"
          alt="website logo"
        />
      </Link>

      <button className="logout-button" onClick={logoutOutButton}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
