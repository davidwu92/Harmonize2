import React, { useState } from 'react'
import UserAPI from '../../utils/UserAPI'
const {loginUser} = UserAPI

const LoginForm = () => {
  
  //using LoginState to track username/password on this page only.
  const [loginState, setLoginState] = useState({
    username: '',
    password: ''
  })
  loginState.handleInputChange = (event) => {
    setLoginState({...loginState, [event.target.name]: event.target.value})
  }
  //defining function for LOG IN button.
  loginState.handleLogin = (event) => {
    event.preventDefault()
    console.log(loginState.username + loginState.password)
    loginUser({
      username: loginState.username,
      password: loginState.password
    })
    .then(()=>{console.log('You attempted a log in.')})
    .catch((e)=>console.error(e))
  }

  return (

    <div className="row">
      <form action="" className="col s12">
        <div className="card">
          <div className="card-content green-text">
            <h3>Login</h3>
            <div className="input-field">
              <input placeholder="Username" type="text" id="username" name="username" value={loginState.username} onChange={loginState.handleInputChange}/>
              <label htmlFor="username"></label>
            </div>
            <div className="input-field">
              <input placeholder="Password" type="password" id="password" name="password" value={loginState.password} onChange={loginState.handleInputChange}/>
              <label htmlFor="password"></label>
            </div>
            <button onClick={loginState.handleLogin} id="login" className="btn waves-effect waves-light col s12" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
            </button>
            <p>Register Link will go somewhere down here</p>
          </div>
        </div>
      </form>
    </div>

  )
}

export default LoginForm