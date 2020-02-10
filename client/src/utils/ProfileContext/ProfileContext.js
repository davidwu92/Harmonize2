import React, { createContext } from 'react'

const ProfileContext = createContext({
  links: [],
  deleteVideo: () => {}
})

export default ProfileContext