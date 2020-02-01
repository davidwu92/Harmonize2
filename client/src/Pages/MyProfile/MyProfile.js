import React, { useState, useEffect } from 'react'
import UserAPI from '../../utils/UserAPI'
import axios from 'axios'
import { Modal, Button, TextInput, Textarea } from 'react-materialize'

//function for making changes to profile
const { getUser, updateUser, addYoutube, getYoutube } = UserAPI

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
    .then(({ data }) => {
      setProfileState({
        ...profileState,
        name: data.name,
        email: data.email,
        username: data.username,
        links: data.links,
        bio: data.bio,
        pfPic: data.pfPic,
        id: data._id
      })
    })
    .catch((e) => console.error(e))

  //Setting up editState VARIABLES: Allows us to edit values before submitting PUT requests to db
  const [editState, setEditState] = useState({
    name: '', email: '', username: '', bio: '', pfPic: '',
    newLink: '',
  })

  //handles input changes for EDITING FORMS on this page.
  editState.handleInputChange = (event) => {
    setEditState({ ...editState, [event.target.name]: event.target.value })
  }
  const [youtubeState, setYoutubeState] = useState({
    links: []
  })

  // on page load
  useEffect(() => {
    getYoutube(token)
      .then(({ data }) => {
        let links = []
        links.push(data)
        setYoutubeState({ ...youtubeState, links })
      })
      .catch(e => console.error(e))
  }, [])


  // Add link is working now 01/31/20 with json token authorization
  const addLink = (event) => {
    event.preventDefault()
    let token = JSON.parse(JSON.stringify(localStorage.getItem("token")))
    let youtubeLink = editState.newLink

    if (youtubeLink.includes("<iframe")) {
      addYoutube(token, youtubeLink)
        .then(() => {
          setEditState({ ...editState, newLink: '' })
          getYoutube(token)
            .then(({ data }) => {
              let links = []
              links.push(data)
              setYoutubeState({ ...youtubeState, links })
            })
            .catch(e => console.error(e))
        })
        .catch(e => console.error(e))
    } else {
      setEditState({ ...editState, newLink: '' })
      // need front end error message saying it has to be a youtube embedded Link
      console.log('error')
    }
  }

  //EDITING PROFILE: FORM SUBMISSION
  const editPfButton = <button id="editBtn" className="waves-effect waves-light right"><i className="fas fa-user-edit"></i></button>;
  const editProfile = (event) => {
    event.preventDefault()
    //Any empty fields in editState will PUT old profile information.
    updateUser(profileState.id, {
      name: (editState.name === "") ? profileState.name : editState.name,
      email: (editState.email === "") ? profileState.email : editState.email,
      username: (editState.username === "") ? profileState.username : editState.username,
      bio: (editState.bio === "") ? profileState.bio : editState.bio,
      pfPic: (editState.pfPic === "") ? profileState.pfPic : editState.pfPic,
    })
      .then(() => {
        console.log("You edited the profile.")
      })
      .catch(e => console.error(e))
  }

  return (
    <>
      <div className="container">
        <div className="row">
          {/* PROFILE PIC */}
          <div className="col s4 m2">
            <img className="circle responsive-img" src={profileState.pfPic} alt="Your pf pic" />
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


            {/* EDIT PROFILE MODAL BUTTON */}
            <Modal id="edProfModal" className="center-align"
              actions={[
                <Button flat modal="close" node="button" className="waves-effect waves-light" id="editBtn" >
                  Close
                </Button>,

                <Button onClick={editProfile} flat modal="close" node="button" className="waves-effect waves-light" id="editBtn">
                  Save Changes
                </Button>
              ]}
              header="Edit Profile"
              options={{
                dismissible: true,
                endingTop: '10%',
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                opacity: 0.5,
                outDuration: 250,
                preventScrolling: true,
                startingTop: '4%'
              }}
              trigger={editPfButton}
            >

              <form>
                <h6>USERNAME</h6>
                <TextInput placeholder={profileState.username} type="newUsername" id="newUsername" name="username" value={editState.username} onChange={editState.handleInputChange} />

                <h6>FULL NAME</h6>
                <TextInput placeholder={profileState.name} type="newName" id="newName" name="name" value={editState.name} onChange={editState.handleInputChange} />

                <h6>EMAIL</h6>
                <TextInput placeholder={profileState.email} type="newEmail" id="newEmail" name="email" value={editState.email} onChange={editState.handleInputChange} />

                {/* BIO */}
                <h6>BIO</h6>
                <TextInput placeholder={profileState.bio} type="newBio" id="newBio" name="bio" value={editState.bio} onChange={editState.handleInputChange} />
              </form>
            </Modal>
          </div>
        </div>

        <div className="divider"></div>
      </div>

      {/* POST A NEW LINK  */}
      <div className="container">
        <div className="row">
          <form>
            <TextInput placeholder="Add a link" type="newLink" id="newLink" name="newLink" value={editState.newLink} onChange={editState.handleInputChange} />

            <button onClick={addLink} id="addLink" className="waves-effect waves-light" type="submit" name="action"><i className="material-icons">publish</i>
            </button>
          </form>
        </div>
      </div>
      {/* EMBEDED LINKS/POSTS HERE */}
      <div>
        {
          youtubeState.links.map(link => link.map(ylink => {
            // let newstr = `"></iframe>`
            // let str = ylink.link.slice(15, -27) + `${newstr}`
            let str = ylink.link
            let newStr = str.split(/"/)[5]


            return (
              <>
                <div className="container">
                  <div className="row">
                    <div className="col">
                      {<iframe id="vidLink" src={newStr} frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>}
                    </div>
                  </div>
                </div>
              </>
            )
          }))
        }
      </div>
    </>
  )
}

export default MyProfile