import React, { useContext } from 'react'
import UserContext from '../../utils/UserContext'

const LoginForm = () => {

  const { handleInputChange, handleFormSubmit } = useContext(UserContext)

  return (

    <div className="row">
      <form action="" className="col s12">
        <div className="card">
          <div className="card-content green-text">
            <h3>Login</h3>
            <div className="input-field">
              <input placeholder="Username" type="text" id="username" />
              <label htmlFor="username"></label>
            </div>
            <div className="input-field">
              <input placeholder="Password" type="password" id="password" />
              <label htmlFor="password"></label>
            </div>
            <button id="login" className="btn waves-effect waves-light col s12" type="submit" name="action">Submit
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