import React, { createContext } from 'react'

const UserContext = createContext({
  name: '',
  email: '',
  username: '',
  password: '',
  bio: '',
  instruments: [],
  skills: [],
  profile: '',
  resetPasswordToken: '',
  resetPasswordExpires: '',
  cityState: '',
  handleInputChange: () => { },
  // handleFormSubmit: () => { }
  setCityState: () => {},
})

export default UserContext