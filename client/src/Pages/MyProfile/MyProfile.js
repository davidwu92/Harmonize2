import React, { useState } from 'react'
import UserAPI from '../../utils/UserAPI'
import axios from 'axios'

//function for making changes to profile
const {getUser, updateUser} = UserAPI

const MyProfile = () => {
  
  //Setting up profileState Variables: CAN'T BE EDITED.
  const [profileState, setProfileState] = useState({
    name: '',
    email: '',
    username: '',
    bio: '',
    links: [],
    pfPic: '',
  })
  
  //using token to grab MY user data.
  let token = JSON.parse(JSON.stringify(localStorage.getItem("token")))
  getUser(token)
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

  //Setting up PROFILE EDITING VARIABLES
  //Allows us to edit values before submitting PUT requests to db
  const [editState, setEditState] = useState({
    newName: '', newEmail: '', newUsername: '', newBio: '', newLinks: [], newPfPic: '',
    newLink: '',
  })
  //handles input changes for EDITING FORMS on this page.
  editState.handleInputChange =   (event) => {
    setEditState({ ...editState, [event.target.name]: event.target.value })
  }
  //addLink form.
  const addLink = (event) => {
    event.preventDefault()
    console.log(editState.newLink)
  }

  return (
    <>
      <div className="container">
        <div className="row valign-wrapper">
          {/* PROFILE PIC */}
          <div className="col s2">
            <img className="circle responsive-img" src={profileState.pfPic} alt="Your pf pic"/>
          </div>
          {/* BASIC INFO */}
          <div className="col s10"> 
            {/* USERNAME */}
            <h4 className="black-text">{profileState.username}</h4>
            {/* NAME */}
            <h5>{profileState.name}</h5>
            {/* BIO */}
            <h6 className="grey-text">{profileState.bio}</h6>
          </div>
          {/* EDIT PROFILE BUTTON */}
          <button id="editProfile">Edit<i className=" fas fa-user-edit"></i></button>
        </div>

        {/* POST A NEW LINK  */}
        <div className="row valign-wrapper">
          <form>
            <div className="input-field">
              <input placeholder="Add a link" type="newLink" id="newLink" name="newLink" value={editState.newLink} onChange={editState.handleInputChange}/>
              {/* <label htmlFor="newLink"></label> */}
            </div>
            <button onClick={addLink} id="addLink" className="btn black waves-effect waves-light col s12" type="submit" name="action">Add
                      <i className="material-icons right">send</i>
            </button>
          </form>
        </div>

        <div>
          {/* LINKS/POSTS HERE */}
          {
            profileState.links.length ? profileState.links.map(link=>(
              <span>{link}</span>
            ))
            : null
          }
        </div>
      </div>
    </>
  )
}

export default MyProfile