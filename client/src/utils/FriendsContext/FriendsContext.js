import { createContext } from 'react'

const FriendsContext = createContext({
  requests: [],
  friends: [],
  seeFriends: () => {},
  acceptFriend: () => {},
  ignoreFriend: () => {},
  followFriend: () => {}
})

export default FriendsContext