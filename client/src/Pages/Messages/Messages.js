import React from 'react'
import Chat from '../../Components/Chat'
import './messages.css'

const Messages = () => {
  

  return (
    <>
      <div className="container">

        <div className="row center-align">
          <h4 className="white-text">MESSAGES</h4>
        </div>
        <div className="divider"></div>

        <form>
          <input type="text" name="message" placeholder="message" />
          <button className="btn" type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}

export default Messages