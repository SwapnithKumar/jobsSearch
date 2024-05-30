import {FaRegStar, FaSuitcase} from 'react-icons/fa'
import {IoLocation} from 'react-icons/io5'
import {Link} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {job} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = job
  return (
    <Link to="/jobs" className="link-ele">
      <li className="job-card-bg-container">
        <div className="job-card-top-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="job-details-company-logo"
          />
          <div>
            <h1 className="job-details-title">{title}</h1>
            <FaRegStar className="star" />
            {rating}
          </div>
        </div>
        <div className="job-second-container">
          <div className="job-card-top-container">
            <div className="job-second-container">
              <IoLocation className="logo" />
              {location}
            </div>
            <div>
              <FaSuitcase className="logo" />
              {employmentType}
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr className="separator-line" />
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
