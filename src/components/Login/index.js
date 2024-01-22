import {Component} from 'react'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    showError: false,
    errorMesg: '',
  }

  onChangeInput = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSuccessFetch = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onFailFetch = errorMesg => {
    this.setState({
      showError: true,
      errorMesg,
    })
  }

  BankLogin = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.onSuccessFetch(data.jwt_token)
    } else {
      this.onFailFetch(data.error_msg)
    }
  }

  render() {
    const {userId, pin, showError, errorMesg} = this.state
    return (
      <div className="login-container">
        <div className="sub-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            className="login-img"
            alt="website login"
          />
          <form className="login-from" onSubmit={this.BankLogin}>
            <h1 className="form-heading">Welcome Back!</h1>
            <div className="input-container">
              <label className="input-label" htmlFor="user-input">
                User Id
              </label>
              <input
                type="text"
                placeholder="Enter User ID"
                className="input"
                id="user-input"
                value={userId}
                onChange={this.onChangeInput}
              />
            </div>
            <div className="input-container">
              <label className="input-label" htmlFor="pin-input">
                PIN
              </label>
              <input
                type="password"
                placeholder="Enter PIN"
                className="input"
                id="pin-input"
                value={pin}
                onChange={this.onChangePin}
              />
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
            <div className="ct">
              {showError && <p className="error-msg"> {errorMesg} </p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
