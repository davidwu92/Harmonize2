import React from 'react'

const RegisterForm = () => {

  return (
    <div className="container">
      <div className="row">
        <h1>REGISTER</h1>
        <form action="" className="col s12">
          <div className="card blue-grey darken-1">
            <div className="card-content text-white">
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
              </div>
              <button className="btn waves-effect waves-light" type="submit" name="action">Submit
    <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm