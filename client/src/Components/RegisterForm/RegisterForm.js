import React, { useContext, useState } from 'react'
import UserContext from '../../utils/UserContext'
import UserAPI from '../../utils/UserAPI'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

import SearchPlace from '../SearchPlace'

const { addUser } = UserAPI

const RegisterForm = () => {
  const history = useHistory()

  const {name, email, username, password, bio, instruments, skills, handleInputChange } = useContext(UserContext)

  const handleAddUser = event => {
    event.preventDefault()
    addUser({ 
      name,
      email,
      username,
      password,
      //other relevant pf info that can be edited from profile.
      links: [],
      pfPic: ``,
      //HARMONIZE INFO
      bio: bio==='' ? `You currently don't have a bio. Click on the edit profile button to tell others about yourself!` : bio,
      instruments: [],
      skills: [],
    })
    .then(({ data }) => {
      history.push('/login')
    })
    .catch(e => {
      //ERROR MESSAGE HANDLE
      console.error(e)
    })
  }

  return (
    <div className="row">
      <form id="registerForm" action="" className="col s12">
            <h3>Register</h3>
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

            {/* SEARCHPLACe */}
            <SearchPlace/>

            {/* BIO UPDATE--optional */}
            <div className="input-field">
              <input placeholder="(optional) Bio: Tell us about yourself!" type="text" id="bio" name="bio" value={bio} onChange={handleInputChange} />
              <label htmlFor="bio"></label>
            </div>

            {/* INSTRUMENTS--optional*/}
            

            {/* SKILLS--optional */}



              {/* SUBMIT BUTTON */}
              <button onClick={handleAddUser} id="register" className="btn black waves-effect waves-light col s12" type="submit" name="action">Register
                    <i className="material-icons right">send</i>
              </button>
      </form>
    </div>
  )
}

export default RegisterForm