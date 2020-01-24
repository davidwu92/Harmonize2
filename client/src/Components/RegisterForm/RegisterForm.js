import React from 'react'

const RegisterForm = () => {

  return (

    <div className="row">
      <form action="" className="col s12">
        <div id="card" className="card">
          <div className="card-content green-text">
            <h3>Register</h3>
            <div className="input-field">
              <input placeholder="Full Name" type="text" id="fullName" />
              <label htmlFor="fullName"></label>
            </div>
            <div className="input-field">
              <input placeholder="Email" type="text" id="email" />
              <label htmlFor="email"></label>
            </div>
            <div className="input-field">
              <input placeholder="Username" type="text" id="username" />
              <label htmlFor="username"></label>
            </div>
            <div className="input-field">
              <input placeholder="Password" type="password" id="password" />
              <label htmlFor="password"></label>

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