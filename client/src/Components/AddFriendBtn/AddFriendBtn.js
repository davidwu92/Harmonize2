import React, { useContext, useState } from 'react'
import UserAPI from '../../utils/UserAPI'
import ViewContext from '../../utils/ViewContext'


const { addFriend } = UserAPI

const AddFriendBtn = () => {

  
  const { friends, following, requested, follow } = useContext(ViewContext)
 

let friendId = JSON.parse(JSON.stringify(sessionStorage.getItem("token")))
let userId = JSON.parse(JSON.stringify(localStorage.getItem("userId")))
let request =  {
  requester: userId,
  recipient: friendId,
  status: 1
}

let changeReq = (request) => {
  addFriend(request)
    .then(({data}) => {
      window.location.reload(false)
      console.log(data)
    })
    .catch(e => console.error(e))
}

  return (
    <>
    {following && (
      <button>Following</button>
    )} 
    {follow && (
      <button type="submit" onClick={() => changeReq(request)}>Follow</button>
    )}
    {
      requested && (
        <button>Requested</button>
      )
    }
    </>
  )
  
}

export default AddFriendBtn