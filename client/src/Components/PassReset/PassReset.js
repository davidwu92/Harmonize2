import React, { useContext } from 'react'
import ResetContext from '../../utils/ResetContext'
import { BrowserRouter as Link } from 'react-router-dom'

const title = {
  pageTitle: 'Password Reset Screen'
}

const PassReset = () => {
const { password, error, isLoading, updated, handleInputChange, updatePassword } = useContext(ResetContext)

if (error) {
  return (
    <div>
      <h1>{title.pageTitle}</h1>
      <div>
        <h4>Problem resetting password. Please send another reset link.</h4>
        <h6><Link to="/">Go Home</Link></h6>
        <h6><Link to="/forgotPassword">Forgot Password?</Link></h6>
      </div>
    </div>
  )
} 
if (isLoading) {
  return(
    <div>
      <div>Loading User Data...</div>
    </div>
  )
}

  return (
    <div>
    <h1>{title.pageTitle}</h1>
          <form action="" className="col s12">
        <div className="input-field">
          <input placeholder="password" type="text" id="password" name="password" value={password} onChange={handleInputChange}/>
          <label htmlFor="password"></label>
        </div>
        <button onClick={updatePassword} className="btn black waves-effect waves-light col s12" type="submit" name="action">Update Password
                <i className="material-icons right">send</i>
        </button>
      </form>

      {updated && (
        <div>
          <p>
            Your password has been successfully reset, please try logging in again.
          </p>
          <h6><Link to="/login">Forgot Password?</Link></h6>
        </div>
      )}
      <h6><Link to="/">Go Home</Link></h6>
    </div>
  )



}



export default PassReset