import React, { createContext } from 'react'

const UserContext = createContext({
  username: '',
  password: '',
  handleInputChange: () => { },
  handleFormSubmit: () => { }
})

export default UserContext