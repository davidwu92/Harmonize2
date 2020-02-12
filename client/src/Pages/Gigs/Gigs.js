import React, {useState, useEffect} from 'react'
import UserAPI from '../../utils/UserAPI'
import GigAPI from '../../utils/GigAPI'
import {
  Modal,
  Button,
  TextInput,
  Textarea,
} from 'react-materialize'
import SearchPlace from '../../Components/SearchPlace'

const { getUser } = UserAPI

const { postGig, getGigs } = GigAPI

const Gigs = () => {

  //set up state variables for this page.
  const [gigState, setGigState] = useState({
    gigTitle: '',
    gigLocation: '',
    gigBody: '',
    authorName: '',
    authorId: '',
    authorEmail: '',
    authorPic: ''
  })
  gigState.handleInputChange = (event) => {
    setGigState({ ...gigState, [event.target.name]: event.target.value })
  }

  let token = JSON.parse(JSON.stringify(localStorage.getItem("token")))
  //using token to grab MY user data.
  useEffect(() => {
    getUser(token)
      .then(({ data }) => {
        localStorage.setItem('userId', data._id)
        setGigState({
        ...gigState,
        authorName: data.name,
        authorEmail: data.email,
        authorId: data._id,
        authorPic: data.profile,
      })})
      .catch((e) => console.error(e))
  }, [])

  //submit gig posting.
  const submitGig = (event) => {
    event.preventDefault()
    console.log('You posted a gig.')
    postGig({
      gigTitle: gigState.gigTitle,
      gigBody: gigState.gigBody,
      authorName: gigState.authorName,
      authorEmail: gigState.authorEmail,
      authorId: gigState.authorId,
      authorPic: gigState.authorPic,
    })
    .then(()=>{console.log("Hooray")})
    .catch(e=>console.error(e))
  }

  return(
    <>
      <div className="container">        
        <h4 className="white-text">Post a Gig</h4>
        {/* Recently-Posted Gigs */}
        <div>

        </div>

        {/* Post a Gig */}
        <div>
          <form>
            <TextInput label="Title" placeholder="Harpist Needed for Wedding" type="" id="gigTitle" name="gigTitle" value={gigState.gigTitle} onChange={gigState.handleInputChange} />
            {/* <TextInput label="Location" placeholder="" type="" id="gigLocation" name="gigLocation" value={gigState.gigLocation} onChange={gigState.handleInputChange} /> */}
            <SearchPlace/>
            <Textarea label="Post Body" placeholder="Tell us more about what you're looking for!" type="" id="gigBody" name="gigBody" value={gigState.gigBody} onChange={gigState.handleInputChange} />
            <button onClick={submitGig} id="postGig" className="waves-effect waves-light btn grey darken-2" type="submit" name="action"><i className="material-icons">publish</i></button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Gigs