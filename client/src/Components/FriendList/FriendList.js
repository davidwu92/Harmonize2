import React, { useContext, useState } from 'react'
import ViewContext from '../../utils/ViewContext'
import { useHistory } from 'react-router-dom'
import SearchAPI from '../../utils/SearchAPI'
import default_profile from '../../default_profile.jpg'


const FriendList = () => {
  let history = useHistory()

  const { friends, acceptFriend } = useContext(ViewContext)

  const visitProfile = (id) => {
    sessionStorage.setItem("token", id)
    history.push('/otherprofile')
  }

  return (
    <>
      <h4 className="white-text center-align">CONNECTIONS</h4>
      {friends.map(friend => friend.map(frie => {
        const profilePicture = (frie.profile) ? frie.profile : default_profile
        let id = frie._id
        return (
          <>
            <div className="container">
              <div id="pfRow" class="row grey valign-wrapper" onClick={() => visitProfile(id)}>
                <div class="col s4 m3">
                  <img id="img" src={profilePicture} alt="" class="circle responsive-img" />
                </div>
                <div class="col s8 m9">
                  <span class="black-text">
                    <h5>{frie.name}</h5>
                    <button id="editBtn" className="waves-effect waves-light btn col s12" type="submit">unfollow</button>
                  </span>
                </div>
              </div>
            </div>
          </>
        )
      }))}
    </>
  )
}

export default FriendList