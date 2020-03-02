import { createContext } from 'react'

const ForgotContext = createContext({
  email: '',
  showError: '',
  messageFromServer: '',
  handleInputChange: () => {},
  sendEmail: () => {}
})

export default ForgotContext