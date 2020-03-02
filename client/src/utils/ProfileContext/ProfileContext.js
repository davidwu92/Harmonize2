import { createContext } from 'react'

const ProfileContext = createContext({
  links: [],
  friends: [],
  deleteVideo: () => {}
})

export default ProfileContext