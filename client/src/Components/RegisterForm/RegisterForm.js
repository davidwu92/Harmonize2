import React, { useContext, useState } from 'react'
import UserContext from '../../utils/UserContext'
import UserAPI from '../../utils/UserAPI'
import { useHistory } from 'react-router-dom'


import { Select } from 'react-materialize'

import SearchPlace from '../SearchPlace'

const { addUser } = UserAPI

const RegisterForm = () => {
  const history = useHistory()

  const {profile, name, email, username, password, bio, handleInputChange, resetPasswordExpires, resetPasswordToken, cityState } = useContext(UserContext)
  // ADD USER/REGISTER BUTTON
  const handleAddUser = event => {
    event.preventDefault()
    addUser({
      name, email, username, cityState,
      password: password,
      //other relevant pf info that can be edited from profile.
      profile: '',
      links: [],
      pfPic: ``,
      //HARMONIZE INFO
      bio: bio === '' ? `You currently don't have a bio. Click on the edit profile button to tell others about yourself!` : bio,
      instruments: infoState.instrumentsAdded,
      skills: infoState.skillsAdded,
      resetPasswordToken: '',
      resetPasswordExpires: ''
  
    })
      .then(({ data }) => {
        console.log(data)
        // need to come back to this for error handling
        if (data === "OK") {
          history.push('/login')
        } else if (data === "password cant be left blank") {
          //Error: Password not long enough/missing.
          document.getElementById('alertMsg').innerHTML = `*Password must be entered`
        } else if (data === 'need more') {
          // Error: passwor not long enough
          document.getElementById('alertMsg').innerHTML = `*Password must be at least 4 characters long`
        } else if (data.e.keyValue.username || null ) {
          //Error: username in use.
          document.getElementById('alertMsg').innerHTML = `*That username is already in use.`
        }  else if (data.e.keyValue.email || null) {
          //Error: email in use. 
          document.getElementById('alertMsg').innerHTML = `*That email is already in use.`
        } else {
          //Default error; most likely never triggers.
          document.getElementById('alertMsg').innerHTML = `*There is an issue with your registration.`
        }
      })
      .catch(e => console.error(e))
  }

  //INSTRUMENTS, SKILLS VARIABLES:
  const [infoState, setInfoState] = useState({
    // instrument variables
    familyChosen: '',
    familyInstruments: [],
    otherInstrumentSelected: false,
    otherInstrument: '',
    instrumentsAdded: [],

    // skill variables
    skillChosen: '',
    skillsAdded: [],
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
        setInfoState({
          ...infoState, familyChosen: document.getElementById('instrumentFamily').value,
          familyInstruments: ["Violin", "Viola", "Cello", "Double-Bass", "Bass Guitar", "Guitar: Classical", "Guitar: Rock", "Other"]
        })
        break;
      case "woodwinds":
        setInfoState({
          ...infoState, familyChosen: document.getElementById('instrumentFamily').value,
          familyInstruments: ["Flute", "Clarinet", "Oboe", "Basoon", "Saxophone", "Other"]
        })
        break;
      case "brass":
        setInfoState({
          ...infoState, familyChosen: document.getElementById('instrumentFamily').value,
          familyInstruments: ["Trumpet", "Trombone", "French Horn", "Tuba", "Other"]
        })
        break;
      case "percussion":
        setInfoState({
          ...infoState, familyChosen: document.getElementById('instrumentFamily').value,
          familyInstruments: ["Drumset", "Orchestral Percussion", "Marimba", "Xylophone", "Glockenspiel", "Other"]
        })
        break;
      case "keyboard":
        setInfoState({
          ...infoState, familyChosen: document.getElementById('instrumentFamily').value,
          familyInstruments: ["Piano", "Organ", "Harpsichord", "Clavichord", "Electric Keyboard", "Other"]
        })
        break;
      case "voice":
        setInfoState({
          ...infoState, familyChosen: document.getElementById('instrumentFamily').value,
          familyInstruments: ["Classical: Soprano", "Classical: Alto", "Classical: Tenor", "Classical: Bass", "Pop/Rock Vocalist", "Jazz Vocalist", "VP/Beatbox", "Other"]
        })
        break;
      default:
        console.log("You selected nothing.")
    }
  }
  //Add selected instrument (from the familyDropdowns), push to infoState.instrumentsAdded.
  const instrumentSelected = () => {
    if (document.getElementById("instrumentSelection").value !== "Other") {
      if (!infoState.instrumentsAdded.includes(document.getElementById("instrumentSelection").value)) {
        let tempInstruments = infoState.instrumentsAdded
        tempInstruments.push(document.getElementById("instrumentSelection").value)
        setInfoState({ ...infoState, familyChosen: '', otherInstrumentSelected: false, instrumentsAdded: tempInstruments })
        document.getElementById('instrumentFamily').value = '0'
      } else {
        alert("You already added that instrument.")
        document.getElementById('instrumentFamily').value = '0'
      }
    } else {
      //Selected "Other"
      setInfoState({ ...infoState, otherInstrumentSelected: true })
    }
  }
  //"Add 'Other' instrument" button
  const addOtherInstrument = (event) => {
    event.preventDefault()
    if (document.getElementById("otherInstrument").value && !infoState.instrumentsAdded.includes(document.getElementById("otherInstrument").value)) {
      let tempInstruments = infoState.instrumentsAdded
      tempInstruments.push(document.getElementById("otherInstrument").value)
      setInfoState({ ...infoState, familyChosen: '', otherInstrument: "", otherInstrumentSelected: false, instrumentsAdded: tempInstruments })
      document.getElementById('instrumentFamily').value = '0'
    } else {
      alert("Invalid instrument input.")
    }
  }
  //Remove an instrument
  const removeInstrument = (event) => {
    event.preventDefault()
    let tempInstruments = infoState.instrumentsAdded.filter(function (value) {
      return value !== event.target.id
    })
    setInfoState({ ...infoState, instrumentsAdded: tempInstruments })
  }
  //dropdown created upon selecting an instrument family. Disappears once an instrument selected.
  const familyDropdowns = (infoState.familyChosen) ?
    <div>
      <Select className="col s12"
        onChange={instrumentSelected}
        id="instrumentSelection"
        options={{
          classes: '', dropdownOptions: {
            alignment: 'left', autoTrigger: true, closeOnClick: true,
            constrainWidth: true, container: null, coverTrigger: true, hover: false, inDuration: 150, onCloseEnd: null,
            onCloseStart: null, onOpenEnd: null, onOpenStart: null, outDuration: 250
          }
        }}
      >
        <option value="">Add an instrument</option>
        {infoState.familyInstruments.length ? infoState.familyInstruments.map(chosenInstrument => (
          <option value={chosenInstrument}>{chosenInstrument}</option>
        )) : null}
      </Select>
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
    if (document.getElementById("skillsDropdown").value !== "Other") {
      if (!infoState.skillsAdded.includes(document.getElementById("skillsDropdown").value)) {
        let tempSkills = infoState.skillsAdded
        tempSkills.push(document.getElementById("skillsDropdown").value)
        setInfoState({ ...infoState, skillsAdded: tempSkills, otherSkillSelected: false })
        document.getElementById('skillsDropdown').value = '0'
      } else {
        document.getElementById('skillsDropdown').value = '0'
        alert("You already added that skill.")
      }
    } else {
      //Selected "Other"
      setInfoState({ ...infoState, otherSkillSelected: true })
    }
  }
  //"Add 'Other' skill" button
  const addOtherSkill = (event) => {
    event.preventDefault()
    if (document.getElementById("otherSkill").value && !infoState.skillsAdded.includes(document.getElementById("otherSkill").value)) {
      let tempSkills = infoState.skillsAdded
      tempSkills.push(document.getElementById("otherSkill").value)
      setInfoState({ ...infoState, otherSkillSelected: false, otherSkill: "", skillssAdded: tempSkills })
      document.getElementById('skillsDropdown').value = '0'
    } else {
      alert("Invalid skill input.")
    }
  }
  //Remove a skill
  const removeSkill = (event) => {
    event.preventDefault()
    let tempSkills = infoState.skillsAdded.filter(function (value) {
      return value !== event.target.id
    })
    setInfoState({ ...infoState, skillsAdded: tempSkills })
  }
  //text input created upon selecting Other skill.
  const otherSkillField = infoState.otherSkillSelected ?
    <div className="input-field">
      <input placeholder="What skill?" type="text" id="otherSkill" name="otherSkill" value={infoState.otherSkill} onChange={infoState.handleInputChange} />
      <label htmlFor="otherSkill"></label>
      <button className="btn black waves-effect waves-light col s12" onClick={addOtherSkill}>Add Skill</button>
    </div>
    : null

  return (
    <div className="row">
      <form id="registerForm" action="" className="col s12">
        <h3>Register</h3>
        <div id="alertMsg" className="red-text"></div>
        <div className="col s12 m6">
          {/* NAME */}
          <div className="input-field">
            <label htmlFor="name"></label>
            <input placeholder="Full Name" type="text" id="name" name="name" value={name} onChange={handleInputChange} />
          </div>
          {/* EMAIL */}
          <div className="input-field">
            <input placeholder="Email" type="text" id="email" name="email" value={email} onChange={handleInputChange} />
            <label htmlFor="email"></label>
          </div>
          {/* USERNAME */}
          <div className="input-field">
            <input placeholder="Username" type="text" id="username" name="username" value={username} onChange={handleInputChange} />
            <label htmlFor="username"></label>
          </div>
          {/* PASSWORD */}
          <div className="input-field">
            <input placeholder="Password" type="password" id="password" name="password" value={password} onChange={handleInputChange} />
            <label htmlFor="password"></label>
          </div>
          {/* SEARCHPLACE */}
          <SearchPlace />
          {/* BIO--optional */}
          <div className="input-field">
            <input placeholder="(optional) Bio: Tell us about yourself!" type="text" id="bio" name="bio" value={bio} onChange={handleInputChange} />
            <label htmlFor="bio"></label>
          </div>
        </div>

        <div className="col s12 m6 grey lighten-4 ">
          {/* INSTRUMENTS FORM--optional*/}
          <br></br>
          <br></br>
          <div className="row">
            {/* DROPDOWN OF FAMILIES */}
            <label id="instrumentsLabel">(Optional) What instruments do you play?</label>
            <div className="col s12 m6">
              <Select
                id="instrumentFamily"
                options={{
                  classes: '', dropdownOptions: {
                    alignment: 'left',
                    autoTrigger: true, closeOnClick: true, constrainWidth: true,
                    container: null, coverTrigger: true, hover: false,
                    inDuration: 150, onCloseEnd: null, onCloseStart: null,
                    onOpenEnd: null, onOpenStart: null, outDuration: 250
                  }
                }}
                //when family selected, run familySelect.
                onChange={familySelect}
              >
                <option value="0" selected>Select Family</option>
                <option value="strings">Strings</option>
                <option value="woodwinds">Woodwinds</option>
                <option value="brass">Brass</option>
                <option value="percussion">Percussion</option>
                <option value="keyboard">Keyboard</option>
                <option value="voice">Voice</option>
              </Select>
            </div>

            {/* INSTRUMENT DROPDOWN of selected family*/}
            <div className="col s12 m6">
              {familyDropdowns}
            </div>

            {/* INSTRUMENTS ADDED SO FAR */}
            <div className="col s12">
              <h6>Instrument(s) added: </h6>
              {
                infoState.instrumentsAdded ? infoState.instrumentsAdded.map((instrument) => (
                  <p>
                    {instrument}
                    <i id={instrument} onClick={removeInstrument} className="tiny material-icons">clear</i>
                  </p>
                )) : null
              }
            </div>

            {/* "OTHER INSTRUMENT" INPUT FIELD*/}
            <div className="row">
              <div className="col">
                {otherInstrumentField}
              </div>
            </div>
          </div>

          {/* SKILLS FORM--optional*/}
          <div className="row">
            <label id="instrumentsLabel">(Optional) What other skills can you list?</label>
            <br></br>
            {/* DROPDOWN OF SKILLS */}
            <div className="col s12">
              <Select
                id="skillsDropdown"
                options={{
                  classes: '', dropdownOptions: {
                    alignment: 'left',
                    autoTrigger: true, closeOnClick: true, constrainWidth: true,
                    container: null, coverTrigger: true, hover: false,
                    inDuration: 150, onCloseEnd: null, onCloseStart: null,
                    onOpenEnd: null, onOpenStart: null, outDuration: 250
                  }
                }}
                //when skill selected, run skillSelect.
                onChange={skillSelect}
              >
                <option value="0" selected>Select Skill(s)</option>
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
              </Select>
            </div>

            {/* SKILLS ADDED SO FAR */}
            <div className="col s12">
              <h6>Skill(s) added: </h6>
              {
                infoState.skillsAdded ? infoState.skillsAdded.map((skill) => (
                  <p>
                    {skill}
                    <i id={skill} onClick={removeSkill} className="tiny material-icons">clear</i>
                  </p>
                )) : null
              }
            </div>
            <div className="row">
              <div className="col">
                {/* "OTHER SKILL" INPUT FIELD */}
                {otherSkillField}
              </div>
            </div>
          </div>
        </div>

        {/* SUBMIT REGISTRATION BUTTON */}
        <button onClick={handleAddUser} id="register" className="btn black waves-effect waves-light col s12" type="submit" name="action">Register
              <i className="material-icons right">send</i>
        </button>
      </form>
    </div>
  )
}

export default RegisterForm
