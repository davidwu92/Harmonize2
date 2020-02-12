import React, { useState, useEffect } from 'react'
import UserAPI from '../../utils/UserAPI'
import LinksCards from '../../Components/LinksCards'
import ProfileContext from '../../utils/ProfileContext'
import AddFriendBtn from '../../Components/AddFriendBtn'
import {
   Modal,
    Button,
     TextInput
     } from 'react-materialize'
import axios from 'axios'
import { Redirect, useHistory } from 'react-router-dom'

//function for making changes to profile
const { getUser, updateUser, addYoutube, getYoutube, deleteYoutube } = UserAPI

const MyProfile = () => {
  let history = useHistory()
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
    instruments: [],
    skills: [],
    profile: '',
    cityState: '',
    friends: [],
    request: [],
    pending:[]
  })

  let token = JSON.parse(JSON.stringify(localStorage.getItem("token")))
  //using token to grab MY user data.
  useEffect(() => {
  getUser(token)
    .then(({ data }) => {
      localStorage.setItem('userId', data._id)
      setProfileState({
        ...profileState,
        name: data.name,
        email: data.email,
        username: data.username,
        links: data.links,
        bio: data.bio,
        pfPic: data.pfPic,
        id: data._id,
        instruments: data.instruments,
        skills: data.skills,
        profile: data.profile,
        cityState: data.cityState,
        friends: data.friends,
        request: data.request,
        pending: data.pending
      })
    })
    .catch((e) => console.error(e))

  }, [])

  //Setting up editState VARIABLES: Allows us to edit values before submitting PUT requests to db
  const [editState, setEditState] = useState({
    name: '', email: '', username: '', bio: '', pfPic: '',
    newLink: '',
    instruments: [],
    skills: [],
    profile: '',
    cityState: ''
  })

  //handles input changes for EDITING FORMS on this page.
  editState.handleInputChange = (event) => {
    setEditState({ ...editState, [event.target.name]: event.target.value })
  }

  const editPicture = (event) => {
    event.preventDefault()
  const file = document.getElementById('inputGroupFile01').files
  const formData = new FormData()

  formData.append('img', file[0])
    //Any empty fields in editState will PUT old profile information.
     let token = JSON.parse(JSON.stringify(localStorage.getItem("token")))
      document.getElementById('img').setAttribute('src', `http://localhost:3000/${file[0].name}`)
      
    axios({
      method: 'post',
      url: '/',
      data: formData,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(({ data }) => {
        
        let profile = JSON.parse(JSON.stringify(file[0].name))
     setProfileState({ ...profileState, profile })
      })
       updateUser(profileState.id, {
      profile: file[0].name
    })
      .then(() => {
        console.log("You edited the profile.")
      })
      .catch(e => console.error(e))
      // .catch(e => console.error(e))
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
  

  youtubeState.deleteVideo = (token, id) => {
    deleteYoutube(token, { _id: id })
      .then(() => {
          getYoutube(token)
            .then(({ data }) => {
              let links = []
              links.push(data)
              setYoutubeState({ ...youtubeState, links })
            })
            .catch(e => console.error(e))
      })
      .catch(e => console.error(e))
  }

  //EDITING PROFILE: FORM SUBMISSION
  const editPfButton = <button id="editBtn" className="waves-effect waves-light right"><i id="editBtnIcon" className="fas fa-user-edit"></i></button>;
  // When edit button is clicked, update infoState's instrumentsAdded/skillsAdded arrays.
  const updateInfoState =(event)=>{
    if(event.target.id === "editBtnIcon"){
      setInfoState({
        ...infoState,
        instrumentsAdded: profileState.instruments,
        skillsAdded: profileState.skills
      })
    }
  }
  document.addEventListener('click', updateInfoState)

  const editProfile = (event) => {
    event.preventDefault()
    //Any empty fields in editState will PUT old profile information.
    updateUser(profileState.id, {
      name: (editState.name === "") ? profileState.name : editState.name,
      email: (editState.email === "") ? profileState.email : editState.email,
      cityState: (editState.cityState === "") ? profileState.cityState : editState.cityState,
      bio: (editState.bio === "") ? profileState.bio : editState.bio,
      pfPic: (editState.pfPic === "") ? profileState.pfPic : editState.pfPic,
      instruments: infoState.instrumentsAdded,
      skills: infoState.skillsAdded,
      profile: (editState.profile === '') ? profileState.profile : editState.profile
    })
      .then(() => {
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
        id: data._id,
        instruments: data.instruments,
        skills: data.skills,
        profile: data.profile,
        cityState: data.cityState,
        friends: data.friends,
        requests: data.requests
      })
    })
    .catch((e) => console.error(e))
        console.log("You edited the profile.")
      })
      .catch(e => console.error(e))
  }



  //~~~~EDITING INSTRUMENTS/SKILLS STUFF~~~~~~
  const [infoState, setInfoState] = useState({
    // instrument variables
    familyChosen: '',
    familyInstruments: [],
    otherInstrumentSelected: false,
    otherInstrument: '',
    instrumentsAdded: [],

    // skill variables
    skillChosen:'',
    skillsAdded:[],
    otherSkill: '',
    otherSkillSelected: false
  })
  infoState.handleInputChange = (event) => {
    setInfoState({ ...infoState, [event.target.name]: event.target.value })
  }

    //~~~~~~~~~~INSTRUMENT FUNCTIONS~~~~~~~~~~~~~~
  //Selecting instrument Family.
  const familySelect = () => {
    switch (document.getElementById('instrumentFamily').value) {
      case "strings":
        setInfoState({...infoState, familyChosen:document.getElementById('instrumentFamily').value,
        familyInstruments:["Violin", "Viola", "Cello", "Double-Bass", "Bass Guitar", "Guitar: Classical", "Guitar: Rock","Other"]})
      break;
      case "woodwinds":
        setInfoState({...infoState, familyChosen:document.getElementById('instrumentFamily').value,
        familyInstruments:["Flute", "Clarinet", "Oboe", "Basoon", "Saxophone", "Other"]})
      break;
      case "brass":
        setInfoState({...infoState, familyChosen:document.getElementById('instrumentFamily').value,
        familyInstruments:["Trumpet", "Trombone", "French Horn", "Tuba", "Other"]})
      break;
      case "percussion":
        setInfoState({...infoState, familyChosen:document.getElementById('instrumentFamily').value,
        familyInstruments:["Drumset", "Orchestral Percussion", "Marimba", "Xylophone", "Glockenspiel", "Other"]})
      break;
      case "keyboard":
        setInfoState({...infoState, familyChosen:document.getElementById('instrumentFamily').value,
        familyInstruments:["Piano", "Organ", "Harpsichord", "Clavichord", "Electric Keyboard", "Other"]})
      break;
      case "voice":
        setInfoState({...infoState, familyChosen:document.getElementById('instrumentFamily').value,
          familyInstruments:["Classical: Soprano", "Classical: Alto","Classical: Tenor", "Classical: Bass", "Pop/Rock Vocalist", "Jazz Vocalist", "VP/Beatbox", "Other"]
        })
      break;
      default:
        console.log("You selected nothing.")
    }
  }
  //Add selected instrument (from the familyDropdowns), push to infoState.instrumentsAdded.
  const instrumentSelected = () =>{
    if (document.getElementById("instrumentSelection").value!=="Other"){
      if (!infoState.instrumentsAdded.includes(document.getElementById("instrumentSelection").value)){
        let tempInstruments = infoState.instrumentsAdded
        tempInstruments.push(document.getElementById("instrumentSelection").value)
        setInfoState({...infoState, familyChosen:'', otherInstrumentSelected:false, instrumentsAdded: tempInstruments})
        document.getElementById('instrumentFamily').value='0'
      } else {
        alert("You already added that instrument.")
        document.getElementById('instrumentFamily').value='0'
      }
    } else {
      //Selected "Other"
      setInfoState({...infoState, otherInstrumentSelected: true})
    }
  }
  //"Add 'Other' instrument" button
  const addOtherInstrument = (event) =>{
    event.preventDefault()
    if(document.getElementById("otherInstrument").value && !infoState.instrumentsAdded.includes(document.getElementById("otherInstrument").value)){
      let tempInstruments = infoState.instrumentsAdded
      tempInstruments.push(document.getElementById("otherInstrument").value)
      setInfoState({...infoState, familyChosen:'', otherInstrument:"", otherInstrumentSelected:false, instrumentsAdded: tempInstruments})
      document.getElementById('instrumentFamily').value='0'
    } else {
      alert("Invalid instrument input.")
    }
  }
  //Remove an instrument
  const removeInstrument = (event) =>{
    event.preventDefault()
    let tempInstruments= infoState.instrumentsAdded.filter(function(value){
      return value!==event.target.id
    })
    setInfoState({...infoState, instrumentsAdded: tempInstruments})
  }
  //dropdown created upon selecting an instrument family. Disappears once an instrument selected.
  const familyDropdowns = (infoState.familyChosen) ?
    <div>
      <select
      onChange={instrumentSelected}
      id="instrumentSelection"
      className="browser-default"
      style={{"width":"60%"}}
      >
        <option value="">Select an Instrument</option>
        {infoState.familyInstruments.length ? infoState.familyInstruments.map(chosenInstrument =>(
          <option value={chosenInstrument}>{chosenInstrument}</option>
        )):null}
      </select>
    </div>
    : null
  //text input created upon selecting Other. Disappears once Add Instrument btn clicked.
  const otherInstrumentField = infoState.otherInstrumentSelected ? 
    <div className="input-field">
      <input placeholder="What instrument?" type="text" id="otherInstrument" name="otherInstrument" value={infoState.otherInstrument} onChange={infoState.handleInputChange} />
      <label htmlFor="otherInstrument"></label>
      <button className="btn black waves-effect waves-light col s12" onClick={addOtherInstrument}>Add Instrument</button>
    </div>
    : null
    
    //~~~~~~~~~~SKILLS FUNCTIONS~~~~~~~~~~~~~~
  //Selecting a Skill from Dropdown
  const skillSelect = () => {
    //Add a skill from the dropdown.
    if (document.getElementById("skillsDropdown").value!=="Other"){
      if(!infoState.skillsAdded.includes(document.getElementById("skillsDropdown").value)){
        let tempSkills = infoState.skillsAdded
        tempSkills.push(document.getElementById("skillsDropdown").value)
        setInfoState({...infoState, skillsAdded: tempSkills, otherSkillSelected: false})
        document.getElementById('skillsDropdown').value='0'
      } else {
        document.getElementById('skillsDropdown').value='0'
        alert("You already added that skill.")
      }
    } else {
      //Selected "Other"
      setInfoState({...infoState, otherSkillSelected: true})
    }
  }
  //"Add 'Other' skill" button
  const addOtherSkill = (event) =>{
    event.preventDefault()
    if(document.getElementById("otherSkill").value && !infoState.skillsAdded.includes(document.getElementById("otherSkill").value)){
      let tempSkills = infoState.skillsAdded
      tempSkills.push(document.getElementById("otherSkill").value)
      setInfoState({...infoState, otherSkillSelected:false, otherSkill: "", skillssAdded: tempSkills})
      document.getElementById('skillsDropdown').value='0'
    } else {
      alert("Invalid skill input.")
    }
  }
  //Remove a skill
  const removeSkill = (event) =>{
    event.preventDefault()
    let tempSkills= infoState.skillsAdded.filter(function(value){
      return value!==event.target.id
    })
    setInfoState({...infoState, skillsAdded: tempSkills})
  }
  //text input created upon selecting Other skill.
  const otherSkillField = infoState.otherSkillSelected ? 
  <div className="input-field">
    <input placeholder="What skill?" type="text" id="otherSkill" name="otherSkill" value={infoState.otherSkill} onChange={infoState.handleInputChange} />
    <label htmlFor="otherSkill"></label>
    <button className="btn black waves-effect waves-light col s12" onClick={addOtherSkill}>Add Skill</button>
  </div>
  : null

// see friend request
  const visitFriends = () => {
    history.push('/friends')
  }
// see friends list
  const friendsList = () => {
    history.push('/list')
  }
console.log(profileState.requests  === undefined)
  return (
    <>
      <div className="container">
        <div className="row"> {/* TOP ROW: PF PIC, BASIC INFO */}
          {/* PROFILE PIC */}
          <div className="col s4 m2">
            <img className="circle responsive-img"  alt="Your pf pic" id="img" src={profileState.profile} />
            <button type= "submit" onClick={visitFriends}>Friend Request</button>
            <h4 onClick={friendsList}>{profileState.friends.length}</h4>
            <h4>Following</h4>
            <Modal
              actions={[
                <Button onClick={editPicture} modal="close" node="button" className="black waves-effect waves-light white-text hoverable" >
                  Upload <i className="material-icons right">send</i>
                </Button>,
                <span> </span>,
                <Button flat modal="close" node="button" className="black waves-effect waves-light white-text hoverable" >
                  Close
                </Button>
              ]}
              header="Edit Your Profile Picture" trigger={editPfButton}>
              <form action="#">
                <div class="file-field input-field">
                  <div class="btn">
                    <span>File</span>
                    <input type="file"
                      className="custom-file-input"
                      id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01"
                    ></input>
                  </div>
                  <div class="file-path-wrapper">
                    <input class="file-path validate" type="text"></input>
                  </div>
                </div>
              </form>
              {/* <form>
                <h6>Profile Picture: </h6>
                <TextInput placeholder={profileState.pfPicture} type="newPfPicture" id="newPfpicture" name="pfPic" value={editState.pfPic} onChange={editState.handleInputChange} />
              </form> */}
            </Modal>
          </div>
          {/* BASIC INFO */}
          <div className="col s8 m10">
            {/* NAME */}
            <h5>{profileState.name}</h5>
            {/* EMAIL */}
            <h6>{profileState.email}</h6>
            {/* CITY/STATE*/}
            <h4 className="black-text">{profileState.cityState}</h4>
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
              options={{dismissible: true, endingTop: '10%', inDuration: 250, onCloseEnd: null,
                        onCloseStart: null, onOpenEnd: null, onOpenStart: null, opacity: 0.5,
                        outDuration: 250, preventScrolling: true, startingTop: '4%'
                      }}
              trigger={editPfButton}
            >
              <form>
                <h6>FULL NAME</h6>
                <TextInput placeholder={profileState.name} type="newName" id="newName" name="name" value={editState.name} onChange={editState.handleInputChange} />
                <h6>EMAIL</h6>
                <TextInput placeholder={profileState.email} type="newEmail" id="newEmail" name="email" value={editState.email} onChange={editState.handleInputChange} />
                <h6>CITY/STATE</h6>
                <TextInput placeholder={profileState.cityState} type="newcityState" id="cityState" name="cityState" value={editState.cityState} onChange={editState.handleInputChange} />
                <h6>BIO</h6>
                <TextInput placeholder={profileState.bio} type="newBio" id="newBio" name="bio" value={editState.bio} onChange={editState.handleInputChange} />
                {/* INSTRUMENTS FORM--optional*/}
                <div className="row grey lighten-4">
                  {/* DROPDOWN OF FAMILIES */}
                  <select
                    id="instrumentFamily"
                    label="(Optional) What instruments do you play?"
                    className="browser-default"
                    //when family selected, run familySelect.
                    onChange={familySelect}
                    style={{"width": "60%"}}
                  >
                    <option value="0" selected>Add an Instrument</option>
                    <option value="strings">Strings</option>
                    <option value="woodwinds">Woodwinds</option>
                    <option value="brass">Brass</option>
                    <option value="percussion">Percussion</option>
                    <option value="keyboard">Keyboard</option>
                    <option value="voice">Voice</option>
                  </select>
                  {/* INSTRUMENT DROPDOWN of selected family*/}
                  {familyDropdowns}
                  {/* "OTHER INSTRUMENT" INPUT FIELD*/}
                  {otherInstrumentField}   
                  {/* INSTRUMENTS ADDED SO FAR */}
                  <div className="right-align black-text">
                    <h6>Instrument(s) added: </h6>
                      {
                        infoState.instrumentsAdded ? infoState.instrumentsAdded.map((instrument)=>(
                          <p >
                            {instrument} 
                            <i id={instrument} onClick={removeInstrument} className="tiny material-icons">clear</i>
                          </p>
                        )) : null
                      }
                  </div>
                </div>

                {/* SKILLS FORM--optional*/}
                <div className="row grey lighten-4">
                  {/* DROPDOWN OF SKILLS */}
                  <select
                    id="skillsDropdown"
                    label="(Optional) What other skills can you list?"
                    className="browser-default"
                    style={{"width": "60%"}}
                    //when skill selected, run skillSelect.
                    onChange={skillSelect}
                  >
                    <option value="0" selected>Add a Skill</option>
                    <option value="Live Performer">Live Performer</option>
                    <option value="Recording Artist">Recording Artist</option>
                    <option value="DJ">DJ</option>
                    <option value="Producer">Producer</option>
                    <option value="Composer (Classical)">Composer (Classical)</option>
                    <option value="Songwriter (Pop/Rock)">Songwriter (Pop/Rock)</option>
                    <option value="Lyricist">Lyricist</option>
                    <option value="Arranger">Arranger</option>
                    <option value="Amateur/Enthusiast">Amateur/Enthusiast</option>
                    <option value="Other">Other</option>
                  </select>
                  {/* "OTHER SKILL" INPUT FIELD */}
                  {otherSkillField}
                  {/* SKILLS ADDED SO FAR */}
                  <div className="right-align black-text">
                  <h6>Skill(s) added: </h6>
                    {
                      infoState.skillsAdded ? infoState.skillsAdded.map((skill)=>(
                        <p>
                          {skill} 
                          <i id={skill} onClick={removeSkill} className="tiny material-icons">clear</i>
                        </p>
                      )) : null
                    }
                  </div>
                </div>


              </form>
            </Modal>
          </div>
        </div>

        <div className="row grey lighten-5"> {/* INSTRUMENTS/SKILLS */}
            {/* INSTRUMENTS */}
          <div className="col s6 m6">
            {
              profileState.instruments.length ? <>
                <h6>My Instruments</h6>
                {profileState.instruments.map(instrument => (
                  <p>{instrument + " "}</p>
                ))}
              </> : null
            }
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
        <div className="row">
          {/* LINKS/POSTS HERE */}
          <ProfileContext.Provider value={youtubeState}>
            <LinksCards />
          </ProfileContext.Provider>
        </div>
      </div>
    </>
  )
}

export default MyProfile
