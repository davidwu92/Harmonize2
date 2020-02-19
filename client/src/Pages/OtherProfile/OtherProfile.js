import React, { useState, useEffect } from 'react'
import SearchAPI from '../../utils/SearchAPI'
import ProfileContext from '../../utils/ProfileContext'
import LinksCards from '../../Components/LinksCards'
import UserAPI from '../../utils/UserAPI'
import AddFriendBtn from '../../Components/AddFriendBtn'
import ViewContext from '../../utils/ViewContext'
import default_profile from '../../default_profile.jpg'


const { visitProfile, userInfo } = SearchAPI

const { getOtherYoutube } = UserAPI

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
  // let userId = JSON.parse(JSON.stringify(localStorage.getItem("userId")))
  //need a get new Other User API and route.
  visitProfile(profileId)
    .then(({ data }) => {
      setProfileState({
        ...profileState,
        name: data.name,
        email: data.email,
        username: data.username,
        links: data.links,
        bio: (data.bio === `You currently don't have a bio. Click on the edit profile button to tell others about yourself!`) ? null : data.bio,
        pfPic: data.pfPic,
        instruments: data.instruments,
        skills: data.skills,
        profile: data.profile
      })
    })
    .catch((e) => console.error(e))
  const [listState, setListState] = useState({
    following: false,
    requested: false,
    follow: true,
    friends: [],
  })
  // adding the actual users friends list to profile
  useEffect(() => {
  let profileId = JSON.parse(JSON.stringify(sessionStorage.getItem("token")))
  let userId = JSON.parse(JSON.stringify(localStorage.getItem("userId")))
    userInfo(userId)
      .then(({ data }) => {
        console.log(data.pending)
        if (data.friends.includes(profileId)) {
          setListState({
            ...listState,
            friends: data.friends,
            follow: false,
            following: true
          })
        } else if (data.pending.includes(profileId)) {
          setListState({
            ...listState,
            friends: data.friends,
            follow: false,
            requested: true
          })
        } else {

        }
      })
      .catch((e) => console.error(e))
  }, [listState])

  const [youtubeState, setYoutubeState] = useState({
    links: []
  })

  useEffect(() => {
    let profileId = JSON.parse(JSON.stringify(sessionStorage.getItem("token")))
    getOtherYoutube(profileId)
      .then(({ data }) => {
        let links = []
        links.push(data)
        setYoutubeState({ ...youtubeState, links })
      })
      .catch(e => console.error(e))
  }, [youtubeState])

  // variable for default picture image of other profile 
  const profilePicture = (profileState.profile) ? profileState.profile : default_profile

  // email link variable
  let email = "mailto:" + profileState.email

  return (
    <>
      <div className="container">
        <div className="row">
          {/* PROFILE PIC */}
          <div className="col s4 m2">
            <img className="circle responsive-img" id="img" src={profilePicture} alt="nothing"/>
            <div>
              <ViewContext.Provider value={listState}>
                <AddFriendBtn />
              </ViewContext.Provider>
            </div>
          </div>

          {/* BASIC INFO */}
          <div className="col s8 m3">
            {/* USERNAME */}
            <h4 className="white-text">{profileState.name}</h4>
            {/* NAME */}
            <h5 className="white-text">{profileState.username}</h5>
            {/* EMAIL */}
            <a href={email}>{profileState.email}</a>
            {/* BIO */}
            <h6 className="grey-text">{profileState.bio}</h6>

          </div>

          {/* INSTRUMENTS */}
          <div className="col s6 m3">
            {
              profileState.instruments.length ? <>
                <h5 className="white-text">Instruments</h5>
                {profileState.instruments.map(instrument => (
                  <p className="teal-text">{instrument + " "}</p>
                ))}
              </> :
                null
            }
          </div>
          {/* SKILLS */}
          <div className="col s6 m3">
            {
              profileState.skills.length ? <>
                <h5 className="white-text">Skills</h5>
                {profileState.skills.map(skill => (
                  <p className="teal-text">{skill + " "}</p>
                ))}
              </> : null
            }
          </div>
        </div>

        <div className="divider grey"></div>
        <br></br>

        <div className="row">
          <ProfileContext.Provider value={youtubeState}>
            <LinksCards />
          </ProfileContext.Provider>
        </div>
      </div>
    </>
  )
}

export default OtherProfile