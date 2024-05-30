import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {FaRegStar, FaSuitcase} from 'react-icons/fa'
import {IoLocation} from 'react-icons/io5'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {status: apiConstants.initial, jobDetails: '', similarJobs: []}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {jobId} = match.params
    this.setState({status: apiConstants.in_progress})
    const jwtToken = Cookies.get('jwt_token')
    if (!jwtToken) {
      console.error('JWT token is undefined')
      return
    }
    const url = `https://apis.ccbp.in/jobs/${jobId}`
    // console.log(url)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(url, options)
      console.log(response)
      if (response.ok) {
        const data = await response.json()
        // console.log(data.job_details)
        const item = data.job_details
        console.log(item)
        const companyLogoUrl = item.company_logo_url
        const companyWebsiteUrl = item.company_website_url
        const {id} = item
        const jobDescription = item.job_description
        const employmentType = item.employment_type
        const {description} = item.life_at_company
        const imageUrl = item.life_at_company.image_url
        const lifeAtCompany = {
          description,
          imageUrl,
        }
        const {location} = item
        const packagePerAnnum = item.package_per_annum
        const {rating} = item
        const skillsRequired = item.skills.map(e => ({
          imageUrl: e.image_url,
          name: e.name,
        }))
        const {title} = item
        const jobItemDetails = {
          companyLogoUrl,
          companyWebsiteUrl,
          id,
          jobDescription,
          employmentType,
          lifeAtCompany,
          location,
          packagePerAnnum,
          rating,
          skillsRequired,
          title,
        }

        const similarJobs = data.similar_jobs.map(i => ({
          companyLogoUrl: i.company_logo_url,
          employmentType: i.employment_type,
          id: i.id,
          jobDescription: i.job_description,
          location: i.location,
          packagePerAnnum: i.package_per_annum,
          rating: i.rating,
          title: i.title,
        }))
        console.log(jobItemDetails)

        this.setState({
          status: apiConstants.success,
          jobDetails: jobItemDetails,
          similarJobs,
        })
      } else {
        this.setState({status: apiConstants.failure})
      }
    } catch (error) {
      this.setState({status: apiConstants.failure})
    }
  }

  inProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>

      <button
        type="button"
        className="retry-button"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  successView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      id,
      jobDescription,
      employmentType,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skillsRequired,
      title,
    } = jobDetails
    // console.log(jobDetails)
    return (
      <div>
        <li className="job-item-details-container">
          <ul className="job-card-top-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-details-company-logo"
            />
            <div>
              <h1 className="job-details-title">{title}</h1>
              <div className="rating-container">
                <FaRegStar className="star" />
                <p>{rating}</p>
              </div>
            </div>
          </ul>
          <div className="job-second-container">
            <div className="job-card-top-container">
              <div className="job-second-container">
                <div className="rating-container">
                  <IoLocation className="logo" />
                  <p>{location}</p>
                </div>
              </div>
              <div className="rating-container">
                <FaSuitcase className="logo" />
                <p>{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr className="separator-line" />
          <div className="flex-row">
            <h1>Description</h1>
            <a href={companyWebsiteUrl}>Visit↗️</a>
          </div>
          <p>{jobDescription}</p>
          <h1>Skills</h1>

          <ul className="skills-container">
            {skillsRequired.map(item => (
              <li className="skills" key={item.name}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="skills-img"
                />
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
          <h1>Life At Company</h1>
          <div className="flex-row">
            <p>{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.imageUrl} alt="Life At Company" />
          </div>
        </li>
        <h1>Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobs.map(eachItem => (
            <li className="similar-job-card" key={eachItem.id}>
              <div className="job-card-top-container">
                <img
                  src={eachItem.companyLogoUrl}
                  alt="similar job company logo"
                  className="job-details-company-logo"
                />
                <div>
                  <h1 className="job-details-title">{eachItem.title}</h1>
                  <div className="rating-container">
                    <FaRegStar className="star" />
                    <p>{eachItem.rating}</p>
                  </div>
                </div>
              </div>
              <h1>Description</h1>
              <p>{eachItem.jobDescription}</p>
              <div className="job-second-container">
                <div className="job-card-top-container">
                  <div className="job-second-container">
                    <div className="rating-container">
                      <IoLocation className="logo" />
                      <p>{eachItem.location}</p>
                    </div>
                  </div>
                  <div className="rating-container">
                    <FaSuitcase className="logo" />
                    <p>{eachItem.employmentType}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderJobItemDetailsView = () => {
    const {status} = this.state
    // return <h1>Job ID: {jobId}</h1> // Display the jobId for debugging
    switch (status) {
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
    return (
      <div>
        <Header />
        <div className="job-item-details-bg-container">
          <div>{this.renderJobItemDetailsView()}</div>
        </div>
      </div>
    )
  }
}

export default withRouter(JobItemDetails)
