import React, { useContext, useState } from 'react'
import ViewContext from '../../utils/ViewContext'
import { useHistory } from 'react-router-dom'
import SearchAPI from '../../utils/SearchAPI'
import default_profile from '../../default_profile.jpg'
import UserAPI from '../../utils/UserAPI'

const { unfollowFriends } = UserAPI

const FriendList = () => {
  let history = useHistory()

  const { friends, acceptFriend, unfollowFriend } = useContext(ViewContext)

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
        let userId = JSON.parse(JSON.stringify(localStorage.getItem("userId")))

        let ids = {
          friendId: frie._id
        }
        return (
          <>
            <div>
              <div id="pfRow" class="row grey valign-wrapper">
                <div class="col s4 m3">
                  <img id="img" src={profilePicture} alt="" class="circle responsive-img" />
                </div>
                <div class="col s8 m9">
                  <span class="black-text">
                    <h5 onClick={() => visitProfile(id)}>{frie.name}</h5>
                    <button id="editBtn" className="waves-effect waves-light btn col s12" type="submit" onClick={() => unfollowFriend(userId, ids)}>unfollow</button>
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