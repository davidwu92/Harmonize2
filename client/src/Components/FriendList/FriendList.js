import React, { useContext, useState } from 'react'
import ViewContext from '../../utils/ViewContext'
import { useHistory } from 'react-router-dom'
import SearchAPI from '../../utils/SearchAPI'


const FriendList = () => {
   let history = useHistory()

 const { friends, acceptFriend } = useContext(ViewContext)

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
  {friends.map(friend => friend.map(frie => {
    let id = frie._id
    return(
    <div class="row">
        <div class="col s12 m7">
          <div class="card">
            <div class="card-image">
              <img style={styleImg} src={frie.profile}/>
            </div>
            <div class="card-content">
              <h4 onClick={() => visitProfile(id)}>{frie.name}</h4>
            </div>
            <div class="card-action">
              <button>unfollow</button>
            </div>
          </div>
        </div>
      </div>
    )
  }))}
  </div>
)
}

export default FriendList