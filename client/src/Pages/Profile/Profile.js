import React, { useState } from 'react'
import UserAPI from '../../utils/UserAPI'
import axios from 'axios'

//function for making changes to profile
const {getUser, updateUser} = UserAPI

const Profile = () => {
  //THIS WORKS OMG
  let token = JSON.parse(JSON.stringify(localStorage.getItem("token")))
  getUser(token)
    .then((data)=>{console.log(data)})
    .catch((e)=>console.error(e))
  

  const [profileState, setProfileState] = useState({

  })


  return (
    <>
      <div className="container">
        <div className="row valign-wrapper">
          <div className="col s2">
            {/* PROFILE PIC */}
            <img
              className="circle responsive-img"
              src="https://preview.redd.it/4bsnuu9wpue11.jpg?width=640&crop=smart&auto=webp&s=212294834cfa17f23e370cbadc655c7d6ca48c95"
              alt="Louise" />
          </div>
          <div className="col s10">
            <h4 className="black-text">
              {/* NAME */}
              Louise Belcher
            </h4>
            <h6 className="grey-text">
              {/* BIO */}
              My main instrument is the cup-and-straw. I'm all about that jam sesh life!
            </h6>
            {/* NEED EDITING FUNCTIONALITY */}
            <button id="editProfile"><i className=" fas fa-user-edit"></i></button>
          </div>
        </div>
        {/* FORM FOR POSTING LINKS */}
        <form>
          <div className="input-field">
            <input placeholder="newLink" type="newLink" id="newLink" name="newLink"/>
            <label htmlFor="password"></label>
          </div>
        </form>

        <div>
          <p>Embedded Video</p>
          <p>Embedded Video</p>
          <p>Embedded Video</p>
          <p>Embedded Video</p>
          <p>Embedded Video</p>
          <p>Embedded Video</p>
        </div>
      </div>
    </>
  )
}

export default Profile