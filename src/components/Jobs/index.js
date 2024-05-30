import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import './index.css'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobCard from '../JobCard'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileStatus: apiConstants.initial,
    jobsStatus: apiConstants.initial,
    profileData: '',
    jobsData: [],
    employementType: [],
    salary: 0,
    searchVal: '',
    search: '',
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({jobsStatus: apiConstants.in_progress})
    const jwtToken = Cookies.get('jwt_token')
    const {employementType, salary, search} = this.state
    const employementTypes = employementType.join()
    // console.log('k...,,,n')
    // console.log(employementTypes)
    const url = `https://apis.ccbp.in/jobs?employment_type=${employementTypes}&minimum_package=${salary}&search=${search}`
    console.log(url)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        const openings = data.jobs.map(item => ({
          companyLogoUrl: item.company_logo_url,
          employmentType: item.employment_type,
          id: item.id,
          jobDescription: item.job_description,
          location: item.location,
          packagePerAnnum: item.package_per_annum,
          rating: item.rating,
          title: item.title,
        }))
        // console.log(openings)

        this.setState({
          jobsData: openings,
          jobsStatus: apiConstants.success,
        })
      } else {
        this.setState({jobsStatus: apiConstants.failure})
      }
    } catch (error) {
      console.error('Error fetching profile data:', error)
      this.setState({jobsStatus: apiConstants.failure})
    }
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
      // console.log(data)
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

  jobFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <p>We cannot seem find the page you are looking for</p>
      <button type="button" className="retry-button" onClick={this.getJobs}>
        Retry
      </button>
    </div>
  )

  jobSuccessView = () => {
    const {jobsData} = this.state
    return (
      <ul>
        {jobsData.map(eachItem => (
          <JobCard job={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderJobsView = () => {
    const {jobsStatus} = this.state
    switch (jobsStatus) {
      case apiConstants.in_progress:
        return this.inProgressView()
      case apiConstants.success:
        return this.jobSuccessView()
      case apiConstants.failure:
        return this.jobFailureView()
      default:
        return null
    }
  }

  addEmploymentTypes = event => {
    const {value, checked} = event.target
    const {employementType} = this.state
    if (employementType.includes(value)) {
      console.log('If')
      const updatedList = employementType.filter(item => item !== value)
      this.setState({employementType: updatedList}, this.getJobs)
    } else {
      console.log('Else')
      this.setState(
        prevState => ({
          employementType: [...prevState.employementType, value],
        }),
        this.getJobs,
      )
    }
  }

  typeOfEmployement = () => (
    <div>
      <h3>Type of Employment</h3>
      <ul>
        {employmentTypesList.map(eachItem => (
          <li className="sorting-types" key={eachItem.employmentTypeId}>
            <input
              type="checkbox"
              value={eachItem.employmentTypeId}
              onChange={this.addEmploymentTypes}
            />
            <p>{eachItem.label}</p>
          </li>
        ))}
      </ul>
    </div>
  )

  changeSalaray = event => {
    this.setState({salary: event.target.value}, this.getJobs)
  }

  salaryRange = () => (
    <div>
      <h3>Salry Range</h3>
      <ul>
        {salaryRangesList.map(eachItem => (
          <li className="sorting-types" key={eachItem.salaryRangeId}>
            <input
              type="radio"
              value={eachItem.salaryRangeId}
              onChange={this.changeSalaray}
            />
            <p>{eachItem.label}</p>
          </li>
        ))}
      </ul>
    </div>
  )

  changeSearchVal = event => this.setState({searchVal: event.target.value})

  changeSearchElement = () => {
    const {searchVal} = this.state
    this.setState({search: searchVal}, this.getJobs)
  }

  render() {
    const {jobsStatus, jobsData, search, employementType, salary} = this.state
    // console.log(jobsData)
    // console.log(search)
    // console.log(salary)
    return (
      <div>
        <Header />
        <div className="jobs-bg-container">
          <div className="jobs-left-container">
            <div>{this.renderProfileView()}</div>
            <hr className="hr-line" />
            <div>{this.typeOfEmployement()}</div>
            <hr className="hr-line" />
            <div>{this.salaryRange()}</div>
          </div>
          <div className="jobs-right-container">
            <div className="input-container">
              <input
                type="search"
                className="input-field"
                onChange={this.changeSearchVal}
              />
              <button
                type="button"
                data-testid="searchButton"
                aria-label="Search"
                className="search-icon"
                onClick={this.changeSearchElement}
              >
                <BsSearch />
              </button>
            </div>
            <div>{this.renderJobsView()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
