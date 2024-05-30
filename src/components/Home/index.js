import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="home-bg-container">
          <div className="home-left-container">
            <h1 className="home-main-text">Find The Job That Fits Your Life</h1>
            <p className="home-para-text">
              Millions of people are searching for jobs, salary, information,
              company reviews. Find the job that fits your abilities and
              potential
            </p>
            <Link to="/jobs">
              <button type="button" className="find-jobs-button">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Home)
