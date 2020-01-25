import React, { createContext } from 'react'

const UserContext = createContext({
  name: '',
  email: '',
  username: '',
  password: '',
  handleInputChange: () => { },
  // handleFormSubmit: () => { }
})

export default UserContext