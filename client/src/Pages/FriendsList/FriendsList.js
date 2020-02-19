import React, { useState, useEffect } from 'react'
import axios from 'axios'
import UserAPI from '../../utils/UserAPI'
import FriendsContext from '../../utils/FriendsContext'
import LoggedinNav from '../../Components/LoggedinNav'
import FriendRequest from '../../Components/FriendRequest'
import { BrowserRouter, useHistory } from 'react-router-dom'


const { getRequest, acceptRequest, ignoreRequest, seeFriends } = UserAPI

const FriendsList = () => {

    let history = useHistory()

  const [friendState, setFriendState] = useState({
    requests: [],
    friends: []
  })


  let userId = JSON.parse(JSON.stringify(localStorage.getItem("userId")))

  // see requests
  useEffect(() => {

    getRequest(userId)
      .then(({ data }) => {
        console.log(data)
        let requests = []
        requests.push(data)
        setFriendState({ ...friendState, requests })
      })
      .catch(e => console.error(e))
  }, [])


  // accept friend
  friendState.acceptFriend = (id, requests) => {
    let approve = {
      status: 2
    }
    acceptRequest(id, approve)
      .then(() => {
        getRequest(userId)
          .then(({ data }) => {
            console.log(data)
            let requests = []
            requests.push(data)
            setFriendState({ ...friendState, requests })
          })
          .then(() => {
            window.location.reload()
       })
    })
      .catch(e => console.error(e))
  }
  


  // ignore friend
  friendState.ignoreFriend = (id, request) => {
    let ignore = {
      status: 3
    }
    acceptRequest(id, ignore)
      .then(() => {
        getRequest(userId)
          .then(({ data }) => {
            let requests = []
            requests.push(data)
            setFriendState({ ...friendState, requests })
          })
          .then(() => {
            window.location.reload()
          })
      })
      .catch(e => console.error(e))
  }



  return (
    <FriendsContext.Provider value={friendState}>
      <FriendRequest />
      <div className="container">
        <br></br>
        <div className="divider"></div>
      </div>
    </FriendsContext.Provider>
  )

}

export default FriendsList