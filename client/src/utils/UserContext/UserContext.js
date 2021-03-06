import { createContext } from 'react'

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
  friends: [],
  request: [],
  handleInputChange: () => { },
  // handleFormSubmit: () => { }
  setCityState: () => {},
})

export default UserContext