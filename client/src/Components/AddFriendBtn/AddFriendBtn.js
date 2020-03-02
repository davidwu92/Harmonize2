import React, { useContext } from 'react'
import UserAPI from '../../utils/UserAPI'
import ViewContext from '../../utils/ViewContext'


const { addFriend } = UserAPI

const AddFriendBtn = () => {


  const { following, requested, follow } = useContext(ViewContext)


  let friendId = JSON.parse(JSON.stringify(sessionStorage.getItem("token")))
  let userId = JSON.parse(JSON.stringify(localStorage.getItem("userId")))
  let request = {
    requester: userId,
    recipient: friendId,
    status: 1
  }

  let changeReq = (request) => {
    addFriend(request)
      .then(({ data }) => {
        window.location.reload(false)
        console.log(data)
      })
      .catch(e => console.error(e))
  }

  return (
    <>
      {following && (
        <h6 className="white-text">Following</h6>
      )}
      {follow && (
        <button className="btn-small" type="submit" onClick={() => changeReq(request)}>Follow</button>
      )}
      {
        requested && (
          <h6 className="grey-text">Requested</h6>
        )
      }
    </>
  )

}

export default AddFriendBtn