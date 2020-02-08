import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Join = () => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  return (
    <div className="container">
      <h1>join</h1>
      <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
      <input placeholder="Room" className="joinInput" type="text" onChange={(event) => setRoom(event.target.value)} />
      <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
        <button className="btn black white-text" type="submit">Join In</button>
      </Link>
    </div>
  )
}

export default Join