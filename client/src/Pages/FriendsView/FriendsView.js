import React, { useState, useEffect } from 'react'
import axios from 'axios'
import UserAPI from '../../utils/UserAPI'
import ViewContext from '../../utils/ViewContext'
import LoggedinNav from '../../Components/LoggedinNav'
import FriendRequest from '../../Components/FriendRequest'
import { BrowserRouter } from 'react-router-dom'
import FriendList from '../../Components/FriendList'


const { getRequest, seeFriends, unfollowFriends } = UserAPI

const FriendsView = () => {

  const [viewState, setViewState] = useState({
    friends: []
  })

  let userId = JSON.parse(JSON.stringify(localStorage.getItem("userId")))

  useEffect(() => {
    seeFriends(userId)
      .then(({ data }) => {
        console.log(data)
        let friends = []
        friends.push(data)
        setViewState({ ...viewState, friends })
      })
      .catch(e => console.error(e))

  }, [])


  viewState.unfollowFriend = (id, friendId) => {

    unfollowFriends(id, friendId)
      .then(() => {
        console.log('hi')
        seeFriends(userId)
          .then(({data }) => {
            console.log(data)
           let friends = []
          friends.push(data)
          setViewState({ ...viewState, friends })
          })
          .catch(e => console.error(e))
      })
      .catch(e => console.error(e))
  }
  console.log(viewState.friends)

  return (
    <ViewContext.Provider value={viewState}>
      <div class="container">
        <FriendList />
      </div>
    </ViewContext.Provider>
  )


}

export default FriendsView