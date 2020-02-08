import React, { useState } from 'react'
import ForgotPassword from '../../Components/ForgotPassword'
import ForgotAPI from '../../utils/ForgotAPI'
import ForgotContext from '../../utils/ForgotContext'
import { BrowserRouter } from 'react-router-dom'

const { sendForgot } = ForgotAPI

const ForgotLogin = () => {

  // forgot password logic

const [forgotState, setForgotState] = useState({
  email: '',
  showError: false,
  messageFromServer: '',
  showNullError: false,
})

forgotState.handleInputChange = event => {
  setForgotState({ ...forgotState, [event.target.name]: event.target.value})
}


forgotState.sendEmail = e => {
  e.preventDefault()
  if (forgotState.email === '') {
    setForgotState({ ...forgotState,
      showError: false,
      messageFromServer: '',
      showNullError: true
    })
  } else {
    let email = {
      email: forgotState.email
    }
    sendForgot(email)
      .then(response => {
        console.log(response)
        if (response.data === 'email not in db') {
          setForgotState({ ...forgotState,
            showError: true,
            messageFromServer: '',
            showNullError: false
          })
        } else if (response.data === 'recovery email sent') {
          setForgotState({ ...forgotState,
            showError: false,
            messageFromServer: 'recovery email sent',
            email: '',
            showNullError: false
          })
        }
      })
      .catch(e => console.error(e.data))
  }
}

 return (
<ForgotContext.Provider value={forgotState}>
<ForgotPassword />
</ForgotContext.Provider>
 )
}

export default ForgotLogin