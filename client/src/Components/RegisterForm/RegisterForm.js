import React, { useContext, useState } from 'react'
import UserContext from '../../utils/UserContext'
import UserAPI from '../../utils/UserAPI'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

import {Select} from 'react-materialize'

import SearchPlace from '../SearchPlace'

const { addUser } = UserAPI

const RegisterForm = () => {
  const history = useHistory()

  const {name, email, username, password, bio, handleInputChange } = useContext(UserContext)
  let skills = []
  // ADD USER/REGISTER BUTTON
  const handleAddUser = event => {
    event.preventDefault()
    addUser({ 
      name,
      email,
      username,
      password,
      //other relevant pf info that can be edited from profile.
      links: [],
      pfPic: ``,
      //HARMONIZE INFO
      bio: bio==='' ? `You currently don't have a bio. Click on the edit profile button to tell others about yourself!` : bio,
      instruments: infoState.instrumentsAdded,
      skills: infoState.skillsAdded,
    })
    .then(({ data }) => {
      history.push('/login')
    })
    .catch(e => {
      //ERROR MESSAGE HANDLE
      console.error(e)
    })
  }

  //INSTRUMENTS, SKILLS VARIABLES:
  const [infoState, setInfoState] = useState({
    // instrument variables
    familyChosen: '',
    familyInstruments: [],
    otherChosen: false,
    otherInstrument: '',
    instrumentsAdded: [],

    // skill variables
    skillChosen:'',
    skillsAdded:[]
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
      case "voice":
        setInfoState({...infoState, familyChosen:document.getElementById('instrumentFamily').value,
          familyInstruments:["Classical: Soprano", "Classical: Alto","Classical: Tenor", "Classical: Bass", "Pop/Rock", "Background", "Other"]
        })
      break;
      default:
        console.log("You selected nothing.")
    }
  }
  //Add selected instrument (from the familyDropdowns), push to infoState.instrumentsAdded.
  const instrumentSelected = () =>{
    if (document.getElementById("instrumentSelection").value!=="Other"){
      let tempInstruments = infoState.instrumentsAdded
      tempInstruments.push(document.getElementById("instrumentSelection").value)
      setInfoState({...infoState, familyChosen:'', otherChosen:false, instrumentsAdded: tempInstruments})
      document.getElementById('instrumentFamily').value='0'
    } else {
      //Selected "Other"
      setInfoState({...infoState, otherChosen: true})
    }
  }
  //"Add 'Other' instrument" button
  const addOther = (event) =>{
    event.preventDefault()
    let tempInstruments = infoState.instrumentsAdded
    tempInstruments.push(document.getElementById("otherInstrument").value)
    setInfoState({...infoState, familyChosen:'', otherChosen:false, instrumentsAdded: tempInstruments})
    document.getElementById('instrumentFamily').value='0'
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
      <Select
      onChange={instrumentSelected}
      id="instrumentSelection"
      options={{classes: '',dropdownOptions: {alignment: 'left',autoTrigger: true,closeOnClick: true,
      constrainWidth: true,container: null,coverTrigger: true,hover: false,inDuration: 150,onCloseEnd: null,
      onCloseStart: null,onOpenEnd: null,onOpenStart: null,outDuration: 250}}}
      >
        <option value="">Add an instrument</option>
        {infoState.familyInstruments.length ? infoState.familyInstruments.map(chosenInstrument =>(
          <option value={chosenInstrument}>{chosenInstrument}</option>
        )):null}
      </Select>
    </div>
    : null
  //text input created upon selecting Other. Disappears once Add Instrument btn clicked.
  const otherSelected = infoState.otherChosen ? 
    <div className="input-field">
      <input placeholder="What instrument?" type="text" id="otherInstrument" name="otherInstrument" value={infoState.otherInstrument} onChange={infoState.handleInputChange} />
      <label htmlFor="otherInstrument"></label>
      <button onClick={addOther}>Add Instrument</button>
    </div>
    : null
    
    //~~~~~~~~~~SKILLS FUNCTIONS~~~~~~~~~~~~~~
  


  return (
    <div className="container">
      <form id="registerForm" action="" className="col s12">
        <h3>Register</h3>
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
        <SearchPlace/>
        {/* BIO--optional */}
        <div className="input-field">
          <input placeholder="(optional) Bio: Tell us about yourself!" type="text" id="bio" name="bio" value={bio} onChange={handleInputChange} />
          <label htmlFor="bio"></label>
        </div>

        {/* INSTRUMENTS--optional*/}
        <div className="row grey lighten-5">
          {/* INSTRUMENT FAMILIES */}
          <Select
            id="instrumentFamily"
            label="What instruments do you play?"
            options={{classes: '',dropdownOptions: {alignment: 'left',
            autoTrigger: true,closeOnClick: true,constrainWidth: true,
            container: null,coverTrigger: true,hover: false,
            inDuration: 150,onCloseEnd: null,onCloseStart: null,
            onOpenEnd: null,onOpenStart: null,outDuration: 250    }
            }}
            onChange={familySelect}
          >
            <option value="0" selected>Choose Family</option>
            <option value="strings">Strings</option>
            <option value="woodwinds">Woodwinds</option>
            <option value="brass">Brass</option>
            <option value="percussion">Percussion</option>
            <option value="voice">Voice</option>
          </Select>
          
          {/* FAMILY'S DROPDOWN */}
          {familyDropdowns}

          {/* INSTRUMENTS ADDED SO FAR */}
          <div className="right-align">
            <h6>Instrument(s) added: </h6>
              {
                infoState.instrumentsAdded ? infoState.instrumentsAdded.map((instrument)=>(
                  <p>
                    {instrument} 
                    <i id={instrument} onClick={removeInstrument} className="tiny material-icons">clear</i>
                  </p>
                )) : null
              }
          </div> 

          {/* "OTHER" INPUT FIELD*/}
          {otherSelected}   
        </div>

        {/* SKILLS--optional*/}
        <div className="row grey lighten-1">
          {/* SELECT SKILL */}
          <Select
            id="skillsDropdown"
            label="What other skills can you list?"
            options={{classes: '',dropdownOptions: {alignment: 'left',
            autoTrigger: true,closeOnClick: true,constrainWidth: true,
            container: null,coverTrigger: true,hover: false,
            inDuration: 150,onCloseEnd: null,onCloseStart: null,
            onOpenEnd: null,onOpenStart: null,outDuration: 250    }
            }}
            onChange={skillSelect}
          >
            <option value="0" selected>Choose Family</option>
            <option value="strings">Strings</option>
            <option value="woodwinds">Woodwinds</option>
            <option value="brass">Brass</option>
            <option value="percussion">Percussion</option>
            <option value="voice">Voice</option>
          </Select>
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