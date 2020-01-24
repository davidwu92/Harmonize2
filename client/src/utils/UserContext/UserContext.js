import React, { createContext } from 'react'

const UserContext = createContext({
  fullName: '',
  username: '',
  password: '',
  handleInputChange: () => { },
  handleFormSubmit: () => { }
})

export default UserContext