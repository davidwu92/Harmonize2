//client/src/Pages/Register.js
import React, { useState } from 'react'
import RegisterForm from '../../Components/RegisterForm'

const Register = () => {

return (
  <>
    <div className="container">
      <RegisterForm />
    </div>
    <div className="loading-img">
       <img src="https://cdn4.vectorstock.com/i/1000x1000/67/63/3d-tunnel-optical-vortex-twist-wireframe-vector-18036763.jpg" width="100%"/>   
    </div> 
  </>
)
}

export default Register