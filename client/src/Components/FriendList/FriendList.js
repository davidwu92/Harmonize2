import React, { useContext, useState } from 'react'
import ViewContext from '../../utils/ViewContext'
import { useHistory } from 'react-router-dom'
import SearchAPI from '../../utils/SearchAPI'
import default_profile from '../../default_profile.jpg'


const FriendList = () => {
   let history = useHistory()

 const { friends, acceptFriend, unfollowFriend } = useContext(ViewContext)

 const styleImg = {
   width: "200px",
   height: "200px"
 }

  const visitProfile = (id) => {
    sessionStorage.setItem("token", id)
    history.push('/otherprofile')
  }

return (
  <div>
  {
 friends.length ?  friends.map(friend => friend.map(frie => {
    

const profilePicture = (frie.profile) ? frie.profile : default_profile
let userId = JSON.parse(JSON.stringify(localStorage.getItem("userId")))

    let id = frie._id

    let friendIds = {
      friendId:  id
    }

    return(
    
    <div class="row">
        <div class="col s12 m7">
          <div class="card">
            <div class="card-image">
              <img style={styleImg} src={profilePicture}/>
            </div>
            <div class="card-content">
              <h4 onClick={() => visitProfile(id)}>{frie.name}</h4>
            </div>
            <div class="card-action">
              <button onClick={() => unfollowFriend(userId, friendIds)}>unfollow</button>
            </div>
          </div>
        </div>
      </div>
    )
    
  })) : null }
  </div>
)
}

export default FriendList