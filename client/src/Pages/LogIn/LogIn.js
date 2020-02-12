import React, { useState, useEffect } from 'react'
import LoginForm from '../../Components/LoginForm'
import ForgotPassword from '../../Components/ForgotPassword'
import './login.css'

const LogIn = () => {


  return (
    <>
      <div className="container">
        <LoginForm />   
            <div className="loading-img">
              <img src="https://cdn4.vectorstock.com/i/1000x1000/67/63/3d-tunnel-optical-vortex-twist-wireframe-vector-18036763.jpg" width="100%"/>   
            </div> 
      </div>
    </>
  )
}

export default LogIn
