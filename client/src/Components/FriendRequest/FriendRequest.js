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
              requester: req._id,
              recipient: userId,
              status: 2
            }
            let requests = {
              requester: req._id,
              recipient: userId,
              status: 3
            }

            const visitProfile = (ids) => {
              sessionStorage.setItem("token", ids)
              history.push('/otherprofile')
            }

            const profilePicture = (req.userRequest.profile) ? req.userRequest.profile : default_profile

            return (
              <div className="container">
                <br></br>
                <div id="pfRow" className="row grey">
                  <div className="col s4 m2">
                    <img src={req.userRequest.profile} alt="Profile Img" className="circle responsive-img" />
                  </div>
                  <div className="col s8 m10">
                    <h5 className="black-text center-align">{req.userRequest.name} Would like to connect with you</h5>
                    <button id="editBtn" className="waves-effect waves-light btn col s12" type="submit" onClick={() => acceptFriend(id, request)}>Accept</button>

                    <button id="editBtn" className="waves-effect waves-light btn col s12" type="submit" onClick={() => ignoreFriend(req.userRequest._id, requests)}>Ignore</button>
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