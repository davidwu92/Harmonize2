import React, {useContext} from 'react'
import UserContext from '../../Utils/UserContext'

const RegisterForm = () => {
  const {name, email, username, handleInputChange } = useContext(UserContext)

  return (
    <div className="row">
      <form action="" className="col s12">
        <div id="card" className="card">
          <div className="card-content green-text">
            <h3>Register</h3>
            <div className="input-field">
              <label htmlFor="name"></label>
              <input placeholder="Full Name" type="text" id="name" name="name" value={name} onChange={handleInputChange}/>
            </div>
            <div className="input-field">
              <input placeholder="Email" type="text" id="email" name="email" value={email} onChange={handleInputChange}/>
              <label htmlFor="email"></label>
            </div>
            <div className="input-field">
              <input placeholder="Username" type="text" id="username" name="username" value={username} onChange={handleInputChange}/>
              <label htmlFor="username"></label>
            </div>

            {/* NEED A WAY TO PASS THIS TO BACKEND */}
            <div className="input-field">
              <input placeholder="Password" type="password" id="password" name="password"/>
              <label htmlFor="password"></label>

              {/* SUBMIT BUTTON */}
              <button id="register" className="btn waves-effect waves-light col s12" type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>

  )
}

export default RegisterForm