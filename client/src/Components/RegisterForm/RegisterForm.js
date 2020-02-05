import React, { useContext, useState } from 'react'
import UserContext from '../../utils/UserContext'
import UserAPI from '../../utils/UserAPI'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const { addUser } = UserAPI

const RegisterForm = () => {
  const history = useHistory()

  const { name, email, username, password, handleInputChange } = useContext(UserContext)

  const handleAddUser = event => {
    event.preventDefault()
    addUser({
      name,
      email,
      username,
      password,
      //other relevant pf info that can be edited from profile.
      links: [],
      bio: `You currently don't have a bio. Click on the edit profile button to tell others about yourself!`,
      pfPic: ``
    })
      .then(({ data }) => {
        if (addUser === true) {
          history.push('/login')
        } else {
          //ALERT MESSAGE 
          document.getElementById('alertMsg').innerHTML = `
          *Please enter the correct Info
          `
          console.error('Failed to Register')
        }
      })
      .catch(e => console.error(e))
  }

  return (
    <div className="row">
      <form id="registerForm" action="" className="col s12">
        <h3>Register</h3>
        <div id="alertMsg" className="red-text"></div>
        <div className="input-field">
          <label htmlFor="name"></label>
          <input placeholder="Full Name" type="text" id="name" name="name" value={name} onChange={handleInputChange} />
        </div>
        <div className="input-field">
          <input placeholder="Email" type="text" id="email" name="email" value={email} onChange={handleInputChange} />
          <label htmlFor="email"></label>
        </div>
        <div className="input-field">
          <input placeholder="Username" type="text" id="username" name="username" value={username} onChange={handleInputChange} />
          <label htmlFor="username"></label>
        </div>

        {/* NEED A WAY TO PASS THIS TO BACKEND */}
        <div className="input-field">
          <input placeholder="Password" type="password" id="password" name="password" value={password} onChange={handleInputChange} />
          <label htmlFor="password"></label>
        </div>

        {/* SUBMIT BUTTON */}
        <button onClick={handleAddUser} id="register" className="btn black waves-effect waves-light col s12" type="submit" name="action">Register
                    <i className="material-icons right">send</i>
        </button>
      </form>
    </div>
  )
}

export default RegisterForm