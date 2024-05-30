import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props
  const navigateToHome = () => history.replace('/')

  const navigateToJobs = () => history.replace('/jobs')

  const userLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="website-logo"
      />
      <div className="header-flex">
        <button type="button" className="header-fonts" onClick={navigateToHome}>
          Home
        </button>
        <button type="button" className="header-fonts" onClick={navigateToJobs}>
          Jobs
        </button>
      </div>
      <button type="button" className="logout-button" onClick={userLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
