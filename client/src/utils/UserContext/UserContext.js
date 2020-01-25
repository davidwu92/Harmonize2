import React, { createContext } from './node_modules/react'

const UserContext = createContext({
  name: '',
  email: '',
  username: '',
  password: '',
  handleInputChange: () => { },
  // handleFormSubmit: () => { }
})

export default UserContext