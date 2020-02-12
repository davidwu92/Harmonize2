import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import UserAPI from '../../utils/UserAPI'
import { Redirect, useHistory } from 'react-router-dom'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { loginUser } = UserAPI

const LoginForm = () => {
  let history = useHistory()

  //using LoginState to track username/password on this page only.
  const [loginState, setLoginState] = useState({
    username: '',
    password: ''
  })

  loginState.handleInputChange = (event) => {
    setLoginState({ ...loginState, [event.target.name]: event.target.value })
  }

  //configure error message.
  toast.configure();
  const toastOptions = {
    autoClose: 7000,
    hideProgressBar: true,
    type: "error"
  }
  //defining function for LOG IN button.
  loginState.handleLogin = (event) => {
    event.preventDefault()
    loginUser({
      username: loginState.username,
      password: loginState.password
    })
      .then(({ data }) => {
        console.log(data)
        if (data.token && loginUser) {
          localStorage.setItem('token', data.token)
          history.push('/myprofile')
        } else {
          // ALERT MESSAGE
          return(toast(`Login failed. Please check your username and password combination or click on "Forgot Password".`, toastOptions))
        }
      })
      .catch(e => console.error(e))
  }

  return (

    <div className="row1">
      <form action="" className="col s12">
        <h3 className="white-text center-align">Login</h3>
        <div className="container">
          <div id="alertMsg" className="red-text"></div>
          <div className="input-field">
            <input className="white-text" placeholder="Username" type="text" id="username" name="username" value={loginState.username} onChange={loginState.handleInputChange} />
            <label htmlFor="username"></label>
          </div>
          <div className="input-field">
            <input className="white-text"  placeholder="Password" type="password" id="password" name="password" value={loginState.password} onChange={loginState.handleInputChange} />
            <label htmlFor="password"></label>
          </div>
          <button onClick={loginState.handleLogin} id="login" className="btn black waves-effect waves-light col s12 hoverable" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
          </button>
          <br></br>
          <br></br>
          <h6><Link to="/register">CREATE AN ACCOUNT</Link></h6>
          <h6><Link to="/forgotPassword">Forgot Password?</Link></h6>
        </div>
      </form>
    </div>
  )
}

export default LoginForm