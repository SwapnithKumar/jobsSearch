import {Component} from 'react'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {history} = this.props
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      Cookies.set('jwt_token', data.jwt_token, {
        expires: 30,
        path: '/',
      })
      history.replace('/')
    } else {
      this.setState({showError: true, errMsg: data.error_msg})
    }
  }

  render() {
    const {showError, errMsg} = this.state
    return (
      <form type="submit">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <div>{this.renderUsernameField()}</div>
        <div>{this.renderPasswordField()}</div>
        <button onClick={this.onSubmitLogin}>Login</button>
        {showError && <p>{errMsg}</p>}
      </form>
    )
  }
}

export default Login
