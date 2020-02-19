import React, { useState, useEffect } from 'react'
import UserAPI from '../../utils/UserAPI'
import ViewContext from '../../utils/ViewContext'
import FriendList from '../../Components/FriendList'


const {  seeFriends, unfollowFriends } = UserAPI

const FriendsView = () => {

  const [viewState, setViewState] = useState({
    friends: []
  })

  let userId = JSON.parse(JSON.stringify(localStorage.getItem("userId")))

  useEffect(() => {
      let userId = JSON.parse(JSON.stringify(localStorage.getItem("userId")))
    seeFriends(userId)
      .then(({ data }) => {
        let friends = []
        friends.push(data)
        setViewState({ ...viewState, friends })
      })
      .catch(e => console.error(e))

  }, [])


  viewState.unfollowFriend = (id, friendId) => {

    unfollowFriends(id, friendId)
      .then(() => {
        seeFriends(userId)
          .then(({data }) => {
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