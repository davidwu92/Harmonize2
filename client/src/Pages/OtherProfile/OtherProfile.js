import React, { useState } from 'react'
import SearchedAPI from '../../utils/SearchAPI'
import axios from 'axios'

const {visitProfile} = SearchedAPI

const OtherProfile = () => {
  
  //Setting up variables for data to be rendered on profile
  const [profileState, setProfileState] = useState({
    name: '',
    email: '',
    username: '',
    bio: '',
    links: [],
    pfPic: ''
  })


  //use an ID TO GRAB user data.
  let profileId = JSON.parse(JSON.stringify(sessionStorage.getItem("token")))
  //need a get new Other User API and route.
  visitProfile(profileId)
    .then(({data})=>{
      setProfileState({ ...profileState, 
        name: data.name,
        email: data.email,
        username: data.username,
        links: data.links,
        bio: data.bio,
        pfPic: data.pfPic
      })
    })
    .catch((e)=>console.error(e))

  return (
    <>
      <div className="container">
        <div className="row valign-wrapper">
          <div className="col s2">
            <img
              className="circle responsive-img"
              //PROFILE PIC
              src={profileState.pfPic}
              alt="Your pf pic"/>
          </div>
          <div className="col s10">
            <h4 className="black-text">
              {/* USERNAME */}
              {profileState.username}
            </h4>
            <h6 className="grey-text">
              {/* NAME */}
              {profileState.name}
              {/* BIO */}
              {profileState.bio}
            </h6>
          </div>
        </div>

        <div>
          {/* LINKS/POSTS HERE */}
          {
            profileState.links.length ? profileState.links.map((link)=>{
              // <span>{link}</span>
              console.log("hi")
            })
            : null
          }
        </div>
      </div>
    </>
  )
}

export default OtherProfile