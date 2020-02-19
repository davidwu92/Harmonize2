import React, { useState, useEffect } from 'react'
import ResetContext from '../../utils/ResetContext'
import axios from 'axios'
import PassReset from '../../Components/PassReset'

import { useParams } from 'react-router-dom'



const ResetPass = () => {


const [resetState, setResetState] = useState({
  username: '',
  password: '',
  confirmPassword: '',
  update: false,
  isLoading: true,
  error: false
})
  let { token } = useParams()

useEffect(() => {
  axios.get('/reset', { params: {
    resetPasswordToken: token
  }})
  .then(response => {
    console.log(response)
    if (response.data.message === 'password reset link a-ok') {
      setResetState({ ...resetState,
        username: response.data.username,
        update: false,
        isLoading: false,
        error: false
      })
      
    } else {
      setResetState({ ...resetState,
        update: false,
        isLoading: false,
        error: true
      })
    }
  })
  .catch(error => {
    console.log(error.data)
  })

}, [])

resetState.handleInputChange = event => {
  setResetState({ ...resetState, [event.target.name]: event.target.value})
}

resetState.updatePassword = e => {
  e.preventDefault()
  axios.put('/updatePasswordViaEmail', {
    username: resetState.username,
    password: resetState.password
    })
    .then(response => {
      console.log(response.data)
      if (response.data.message === 'password updated') {
        setResetState({ ...resetState,
          updated: true,
          error: false
        })
      } else {
        setResetState({ ...resetState,
          updated: false,
          error: true
        })
      }
    })
    .catch(error => {
      console.log(error.data)
    })
  }

  return (
    <ResetContext.Provider value={resetState}>
      <PassReset />
    </ResetContext.Provider>
  )


}


export default ResetPass