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
    id,
  } = job
  return (
    <Link to={`/jobs/${id}`} className="link-ele">
      <li className="job-card-bg-container">
        <div className="job-card-top-container">
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
        </div>
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
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
