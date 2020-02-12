import React, { createContext } from 'react'

const ViewContext = createContext({
  friends: [],
  seeFriends: () => {},
  addFriend: () => {}
})

export default ViewContext