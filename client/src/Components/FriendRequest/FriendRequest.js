import React, { useContext } from 'react'
import FriendsContext from '../../utils/FriendsContext'
import { useHistory } from 'react-router-dom'
import default_profile from '../../default_profile.jpg'


const FriendRequest = () => {

  let history = useHistory()

  const { requests, acceptFriend, ignoreFriend } = useContext(FriendsContext)

  const visitProfile = (id) => {
    sessionStorage.setItem("token", id)
    history.push('/otherprofile')
  }

  return (
    <div>
      <h4 className="white-text center-align">REQUESTS</h4>
      
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
            let ignore = {
              requester: req._id,
              recipient: userId,
              status: 3
            }

            const profilePicture = (req.userRequest.profile) ? req.userRequest.profile : default_profile

            return (
              <div className="container">
                <div id="pfRow" className="row grey lighten-3">
                  <div className="col s4 m2">
                    <img onClick={() => visitProfile(ids)} id="img" src={profilePicture} alt="Profile Img" className="circle responsive-img" />
                  </div>
                  <div className="col s8 m10">
                    <h5 onClick={() => visitProfile(ids)} className="black-text center-align">{req.userRequest.name} Would like to connect with you</h5>
                    <button id="editBtn" className="waves-effect waves-light btn col s12" type="submit" onClick={() => acceptFriend(id, request)}>Accept</button>
                    <button id="editBtn" className="waves-effect waves-light btn col s12" type="submit" onClick={() => ignoreFriend(id, ignore)}>Ignore</button>
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