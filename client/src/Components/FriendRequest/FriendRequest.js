import React, { useContext, useState } from 'react'
import FriendsContext from '../../utils/FriendsContext'
import UserAPI from '../../utils/UserAPI'
import { useHistory } from 'react-router-dom'
import default_profile from '../../default_profile.jpg'


const { acceptRequest } = UserAPI

const FriendRequest = () => {
  
  let history = useHistory()

 const { requests, acceptFriend, ignoreFriend } = useContext(FriendsContext)

 const styleImg = {
   width: "100px",
   height: "100px"
 }



return (
  <div>
  {
  requests.map(request => request.map(req => {

    if (req.status === 1) {
    let userId = JSON.parse(JSON.stringify(localStorage.getItem("userId")))
    let id = req._id
    let ids = req.userRequest._id
    let request = {
      requester: req._id ,
      recipient: userId,
      status: 2
    }
    let requests = {
      requester: req._id ,
      recipient: userId,
      status: 3
    }

  const visitProfile = (ids) => {
    sessionStorage.setItem("token", ids)
    history.push('/otherprofile')
  }

  const profilePicture = (req.userRequest.profile) ? req.userRequest.profile : default_profile


    return(
        <div class="row">
        <div class="col s12 m7">
          <div class="card">
            <div class="card-image">
              <img style={styleImg} src={profilePicture}/>
            </div>
            <div class="card-content">
              <h4 onClick={() => visitProfile(ids)}>{req.userRequest.name}</h4>
            </div>
            <div class="card-action">
               <button type="submit" onClick={() => acceptFriend(id, request)}>Accept</button>
               <button type="submit" onClick={() => ignoreFriend(req.userRequest._id, requests)}>Ignore</button>
            </div>
          </div>
        </div>
      </div>
    )
    } else if (req.status === 2 && req.status === 3) {
      return (
        null
      )
    } else {
      return (
        null
      )
    }
  }))
  }
  </div>
)

}

export default FriendRequest