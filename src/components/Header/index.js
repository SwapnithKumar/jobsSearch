import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props

  const userLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ul className="header-bg-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      <div className="header-flex">
        <Link to="/">
          <li>
            <button type="button" className="header-fonts">
              Home
            </button>
          </li>
        </Link>
        <Link to="/jobs">
          <li>
            <button type="button" className="header-fonts">
              Jobs
            </button>
          </li>
        </Link>
      </div>
      <li>
        <button type="button" className="logout-button" onClick={userLogout}>
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Header)
