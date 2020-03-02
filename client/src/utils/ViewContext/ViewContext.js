import { createContext } from 'react'

const ViewContext = createContext({
  friends: [],
  seeFriends: () => {},
  addFriend: () => {},
  unfollowFriend: () => {}
})

export default ViewContext