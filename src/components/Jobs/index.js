import {Component} from 'react'
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
    this.setState({profileStatus: apiConstants.in_progress})
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.setState({
        profileData: data.profile_details,
        profileStatus: apiConstants.success,
      })
    } else {
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
        <img src={profileData.profile_image_url} alt="profile_image" />
        <h1>{profileData.name}</h1>
        <p>{profileData.short_bio}</p>
      </div>
    )
  }

  failureView = () => (
    <div>
      <button
        type="button"
        className="retry-button"
        onClick={this.getProfile()}
      >
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
