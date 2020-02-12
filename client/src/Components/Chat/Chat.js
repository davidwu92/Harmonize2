import React from 'react'
import './chat.css'

const Chat = () => {

  return (
    <>
      <div className="row">
        <ul id="messages"></ul>
      </div>

      <div className="row">
        <form action="">
          <div className="input-field col s9 white-text">
            <textarea id="message" className="materialize-textarea white-text"></textarea>
            <label for="message">Message</label>
          </div>
          <div className="col s1">
            <button className="btn waves-effect waves-light black" id="sendMsg" type="submit" name="action">Send
              </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Chat