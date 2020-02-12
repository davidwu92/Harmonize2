import React, { useState, useEffect } from 'react'
import SearchedAPI from '../../utils/SearchAPI'
import ProfileContext from '../../utils/ProfileContext'
import LinksCards from '../../Components/LinksCards'
import UserAPI from '../../utils/UserAPI'
import AddFriendBtn from '../../Components/AddFriendBtn'
import OtherContext from '../../utils/OtherContext'
import ViewContext from '../../utils/ViewContext'


const {visitProfile, userInfo} = SearchedAPI

const { getOtherYoutube, addFriend } = UserAPI

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
    friends: []
  })


  //use an ID TO GRAB user data; ID is grabbed from Search page.
  let profileId = JSON.parse(JSON.stringify(sessionStorage.getItem("token")))
   let userId = JSON.parse(JSON.stringify(localStorage.getItem("userId")))
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
const [listState, setListState] = useState({
  following: false,
  requested: false,
  follow: true,
  friends: [],
})
// adding the actual users friends list to profile
useEffect(() => {
    userInfo(userId)
        .then(({data}) => {
          console.log(data.pending)
          if (data.friends.includes(profileId)) {
            setListState({ ...listState, 
            friends: data.friends,
            follow: false,
            following: true
          })
          } else if (data.pending.includes(profileId))  {
            setListState({ ...listState, 
            friends: data.friends,
            follow:false,
            requested:true
          })
          } else {

          }
        })
        .catch((e) => console.error(e))
}, [])

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
          <>
          <ViewContext.Provider value={listState}>
          <AddFriendBtn />
          </ViewContext.Provider>
          </>
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