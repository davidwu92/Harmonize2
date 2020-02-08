import React, { useState, useEffect } from 'react'
import SearchedAPI from '../../utils/SearchAPI'
import axios from 'axios'
import ProfileContext from '../../utils/ProfileContext'
import LinksCards from '../../Components/LinksCards'
import UserAPI from '../../utils/UserAPI'


const {visitProfile} = SearchedAPI

const { getUser, updateUser, addYoutube, getYoutube, deleteYoutube, getOtherYoutube } = UserAPI

const OtherProfile = () => {
  
  //Setting up variables for data to be rendered on profile
  const [profileState, setProfileState] = useState({
    name: '',
    email: '',
    username: '',
    bio: '',
    links: [],
    pfPic: '',
    instruments: [],
    skills: [],
    profile: '',
  })


  //use an ID TO GRAB user data; ID is grabbed from Search page.
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
        pfPic: data.pfPic,
        instruments: data.instruments,
        skills: data.skills,
        profile: data.profile
      })
    })
    .catch((e)=>console.error(e))

 const [youtubeState, setYoutubeState] = useState({
    links: []
  })

 useEffect(() => {
    getOtherYoutube(profileId)
      .then(({ data }) => {
        let links = []
        links.push(data)
        setYoutubeState({ ...youtubeState, links })
      })
      .catch(e => console.error(e))
  }, [])  

  return (
    <>
      <div className="container">
        <div className="row">
          {/* PROFILE PIC */}
          <div className="col s4 m2">
            <img className="circle responsive-img" src={profileState.profile} alt="Profile Picture" />
          </div>
          {/* BASIC INFO */}
          <div className="col s8 m10">
            {/* USERNAME */}
            <h4 className="black-text">{profileState.name}</h4>
            {/* NAME */}
            <h5>{profileState.username}</h5>
            {/* EMAIL */}
            <h6>{profileState.email}</h6>
            {/* BIO */}
            <h6 className="grey-text">{profileState.bio}</h6>
          </div>
        </div>

        <div className="row">
        <ProfileContext.Provider value={youtubeState}>
            <LinksCards />
          </ProfileContext.Provider>
        </div>
          {/* SKILLS */}
        <div className="col s6 m6">
          {
            profileState.skills.length ? <>
            <h6>My Skills</h6>
            {profileState.skills.map(skill => (
              <p>{skill + " "}</p>
            ))}
            </> : null
          }
        </div>
      </div>
        
      {/* LINKS/POSTS HERE */}
      <div>
        {/* {
          profileState.links.length ? profileState.links.map((link)=>{
            
          })
          : null
        } */}
      </div>
    </>
  )
}

export default OtherProfile