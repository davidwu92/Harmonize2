import React, { useContext, useState } from 'react'
import FriendsContext from '../../utils/FriendsContext'
import UserAPI from '../../utils/UserAPI'
import { useHistory } from 'react-router-dom'
import './friendRequest.css'

const FriendRequest = () => {

  let history = useHistory()

  const { requests, acceptFriend, ignoreFriend } = useContext(FriendsContext)

  return (
    <div>
      {
        requests.map(request => request.map(req => {

          if (req.status === 1) {
            let userId = JSON.parse(JSON.stringify(localStorage.getItem("userId")))
            let id = req._id
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

            return (
              <div className="container">
                <div className="card-panel grey lighten-5 z-depth-1">
                  <div className="row">
                    <div className="col s4 m2">
                      <img src={req.userRequest.profile} alt="Profile Img" className="circle responsive-img" />
                    </div>
                    <div className="col s8 m10">
                      <h5>{req.userRequest.name} Would like to connect with you</h5>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s6">
                      <button className="waves-effect waves-light btn col s6" type="submit" onClick={() => acceptFriend(id, request)}>Accept</button>
                    </div>
                    <div className="col s6">
                      <button className="waves-effect waves-light btn col s6" type="submit" onClick={() => ignoreFriend(req.userRequest._id, requests)}>Ignore</button>
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