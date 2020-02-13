import React, { useState } from 'react'
import Chat from '../../Components/Chat'
import './messages.css'

const Messages = () => {

  const [message, setMessage] = useState("")

  return (
    <>
      <div className="container">

        <div className="row center-align">
          <h4 className="white-text">MESSAGES</h4>
        </div>
        <div className="divider"></div>

        <form>
          <input type="text" name="message" placeholder="message" value={message} onChange={event => setMessage(event.target.value} />
          <button className="btn" type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}

export default Messages