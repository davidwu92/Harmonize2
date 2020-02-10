import React, { useState, useEffect } from 'react'
import LoginForm from '../../Components/LoginForm'
import ForgotPassword from '../../Components/ForgotPassword'
import './login.css'

const LogIn = () => {


  return (
    <>
      <div className="container">
        <LoginForm />
      </div>
    </>
  )
}

export default LogIn