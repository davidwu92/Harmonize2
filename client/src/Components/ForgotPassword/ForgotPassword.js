import React, { useContext, useState } from 'react'
// import TextField from '@material-ui/core/TextField'
import ForgotContext from '../../utils/ForgotContext'





const ForgotPassword = () =>  {

 const { email, messageFromServer, showNullError, showError, sendEmail, handleInputChange } = useContext(ForgotContext)

 return(
   <div className="row">
      <form action="" className="col s12">
        <h3>Forgot Password</h3>
        <div className="input-field">
          <input placeholder="EmailAddress" type="text" id="email" name="email" value={email} onChange={handleInputChange}/>
          <label htmlFor="email"></label>
        </div>
        <button onClick={sendEmail} className="btn black waves-effect waves-light col s12" type="submit" name="action">Send Password Reset Email
                <i className="material-icons right">send</i>
        </button>
      </form>
      {showNullError && (
        <div>
          <h3>The email address cannot be left blank</h3>
        </div>
      )}
      {showError && (
        <div>
        <h3>
          That email address isn't recognized. Please try again or <a href={'/register'}>Register</a> for a new account.
        </h3> 
        

         </div>
      )}
      {messageFromServer === 'recovery email sent' && (
        <div>
          <h3>Password Reset Email Successfully Sent!</h3>
        </div>
      )}
      <h5><a href={'/'}>Home</a></h5>
    </div>        
 )
}


export default ForgotPassword