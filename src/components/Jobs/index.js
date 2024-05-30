import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileStatus: apiConstants.initial,
    jobsStatus: apiConstants.initial,
    profileData: '',
    jobsData: '',
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({profileStatus: apiConstants.in_progress})
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(url, options)
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        this.setState({
          profileData: data.profile_details,
          profileStatus: apiConstants.success,
        })
      } else {
        this.setState({profileStatus: apiConstants.failure})
      }
    } catch (error) {
      console.error('Error fetching profile data:', error)
      this.setState({profileStatus: apiConstants.failure})
    }
  }

  inProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  successView = () => {
    const {profileData} = this.state
    return (
      <div className="profile-bg-container">
        <div className="profile-bg">
          <img
            src={profileData.profile_image_url}
            alt="profile_image"
            className="profile-img"
          />
          <h1 className="profile-name">{profileData.name}</h1>
          <p className="profile-bio">{profileData.short_bio}</p>
        </div>
      </div>
    )
  }

  failureView = () => (
    <div>
      <button type="button" className="retry-button" onClick={this.getProfile}>
        Retry
      </button>
    </div>
  )

  renderProfileView = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case apiConstants.in_progress:
        return this.inProgressView()
      case apiConstants.success:
        return this.successView()
      case apiConstants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    const {jobsStatus, jobsData} = this.state
    return (
      <div>
        <Header />
        <div className="jobs-bg-container">
          <div>
            <div>{this.renderProfileView()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
