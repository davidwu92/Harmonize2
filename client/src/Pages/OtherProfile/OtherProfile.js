import React, { useState } from 'react'
import UserAPI from '../../utils/UserAPI'
import axios from 'axios'

//function for making changes to profile
const {getUser} = UserAPI

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
  let profileId = JSON.parse(JSON.stringify(localStorage.getItem("token")))
  //need a get new Other User API and route.
  getUser(profileId)
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

  //Trying some styling stuff.
  let editStyle = {
    position: "relative",
    right: "0px",
  }

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
          {/* EDIT PROFILE BUTTON */}
          <button style={editStyle} id="editProfile">Edit<i className=" fas fa-user-edit"></i></button>
        </div>
        {/* FORM FOR POSTING LINKS */}
        <form>
          <div className="input-field">
            <input placeholder="newLink" type="newLink" id="newLink" name="newLink"/>
            <label htmlFor="newLink"></label>
          </div>
        </form>

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