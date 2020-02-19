import { createContext } from 'react'

const ResetContext = createContext({
  username: '',
  password: '',
  confirmPassword: '',
  update: false,
  isLoading: true,
  error: false,
  handleInputChange: () => {},
  updatePassword: () => {}
})

export default ResetContext