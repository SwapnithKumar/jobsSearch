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
    <div className="header-bg-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      <div className="header-flex">
        <Link to="/">
          <button type="button" className="header-fonts">
            Home
          </button>
        </Link>
        <Link to="/jobs">
          <button type="button" className="header-fonts">
            Jobs
          </button>
        </Link>
      </div>
      <button type="button" className="logout-button" onClick={userLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
