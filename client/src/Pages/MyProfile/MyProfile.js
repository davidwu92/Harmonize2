import React, { useState } from 'react'
import UserAPI from '../../utils/UserAPI'
import axios from 'axios'
import {Modal, Button} from 'react-materialize'

//function for making changes to profile
const {getUser, updateUser, addYoutube} = UserAPI

const MyProfile = () => {

  //Setting up profileState Variables: CAN'T BE EDITED.
  const [profileState, setProfileState] = useState({
    name: '',
    email: '',
    username: '',
    bio: '',
    links: [],
    pfPic: '',
    //For put requests later...
    id: '',
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
        pfPic: data.pfPic,
        id: data._id
      })
    })
    .catch((e)=>console.error(e))

  //Setting up editState VARIABLES: Allows us to edit values before submitting PUT requests to db
  const [editState, setEditState] = useState({
    name: '', email: '', username: '', bio: '', pfPic: '',
    newLink: '',
  })

  //handles input changes for EDITING FORMS on this page.
  editState.handleInputChange =   (event) => {
    setEditState({ ...editState, [event.target.name]: event.target.value })
  }

  //addLink form CURRENTLY NOT WORKING: UNAUTHORIZED ERROR CODE.
  const addLink = (event) => {
    event.preventDefault()
    console.log(editState)
    console.log("adding link")
    addYoutube(token, editState.newLink)
      .then(()=>{console.log("Link added.")})
      .catch(e=>console.error(e))
  }

  //EDITING PROFILE: FORM SUBMISSION
  const editPfButton = <Button className="btn black waves-effect right hoverable">Edit <i className="fas fa-user-edit"></i></Button>;
  const editProfile = (event) => {
    event.preventDefault()
    //Any empty fields in editState will PUT old profile information.
    updateUser(profileState.id, {
      name: (editState.name==="") ? profileState.name : editState.name,
      email: (editState.email==="") ? profileState.email : editState.email,
      username: (editState.username==="") ? profileState.username : editState.username,
      bio: (editState.bio==="") ? profileState.bio : editState.bio,
      pfPic: (editState.pfPic==="") ? profileState.pfPic : editState.pfPic,
    })
      .then(()=>{
        console.log("You edited the profile.")
      })
      .catch(e=>console.error(e))
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
            <h5>{profileState.email}</h5>
            {/* BIO */}
            <h6 className="grey-text">{profileState.bio}</h6>
          </div>
        </div>

        {/* POST A NEW LINK  */}
        <div className="row valign-wrapper">
          <form>
            <div className="input-field">
              <input placeholder="Add a link" type="newLink" id="newLink" name="newLink" value={editState.newLink} onChange={editState.handleInputChange}/>
              {/* <label htmlFor="newLink"></label> */}
            </div>
            <button onClick={addLink} id="addLink" className="btn black waves-effect waves-light col s12 hoverable" type="submit" name="action">Add
                      <i className="material-icons right">send</i>
            </button>
          </form>
        </div>

          {/* LINKS/POSTS HERE */}
        <div>
          {
            profileState.links.length ? profileState.links.map(link=>(
              <span>{link}</span>
            ))
            : null
          }
        </div>

        {/* EDIT PROFILE MODAL BUTTON: MODAL needs to be repositioned or floated. Form inside needs styling. */}
        <Modal 
          actions={[
            <Button onClick={editProfile} modal="close" node="button" className="black waves-effect waves-light white-text hoverable col s12" >
              Save Changes <i className="material-icons right">send</i>
            </Button>,
            <span> </span>, //Janky way to create space between buttons? LOL
            <Button flat modal="close" node="button" className="black waves-effect waves-light white-text hoverable col s12" >
              Close
            </Button>
          ]}
          header="Edit Your Basic Info" trigger={editPfButton}>
            <form>
              <div className="input-field">
                <span>Username: </span>
                <input placeholder={profileState.username} type="newUsername" id="newUsername" name="username" value={editState.username} onChange={editState.handleInputChange}/>
              </div>
              <div className="input-field">
                <span>Full Name: </span>
                <input placeholder={profileState.name} type="newName" id="newName" name="name" value={editState.name} onChange={editState.handleInputChange}/>
              </div>
              <div className="input-field">
                <span>Email: </span>
                <input placeholder={profileState.email} type="newEmail" id="newEmail" name="email" value={editState.email} onChange={editState.handleInputChange}/>
              </div>
              <div className="input-field">
                {/* Needs a bigger input field for bio */}
                <span>Bio: </span>
                <input placeholder={profileState.bio} type="newBio" id="newBio" name="bio" value={editState.bio} onChange={editState.handleInputChange}/>
              </div>
            </form>
        </Modal>
      </div>
    </>
  )
}

export default MyProfile