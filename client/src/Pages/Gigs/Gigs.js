//client/src/Pages/Gigs/Gigs.js
import React, {useState, useEffect} from 'react'
import {  Modal,  Button,  TextInput,  Textarea, DatePicker } from 'react-materialize'
import UserAPI from '../../utils/UserAPI'
import GigAPI from '../../utils/GigAPI'
import { useHistory } from 'react-router-dom'
import default_profile from '../../default_profile.jpg'
// import SearchPlace from '../../Components/SearchPlace'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './gig.css'
import moment from 'moment'

const { getUser } = UserAPI

const { postGig, getGigs } = GigAPI

const Gigs = () => {
  let history = useHistory()
  const [gigState, setGigState] = useState({
    //Gig Info
    gigTitle: '',    gigLocation: '',    gigDate: '',    gigBody: '', gigTags: [],
    //Gig Author Info: updated upon pageload
    gigAuthorName: '',    gigAuthorId: '',    gigAuthorEmail: '',    gigAuthorPic: '',
    //All gigs stored in db
    foundGigs: [],
  })
  gigState.handleInputChange = (event) => {
    setGigState({ ...gigState, [event.target.name]: event.target.value })
  }

  const [dateState, setDateState] = useState({
    gigDate: '',
  })
  dateState.handleDatePick = (date) => {
    setDateState({gigDate: date})
  }

  const [filterState, setFilterState] = useState({
    filterGigs: '',
    filteredGigs: []
  })
  filterState.handleInputChange = (event) => {
    setFilterState({ ...filterState, [event.target.name]: event.target.value })
  }
  const filterSubmit = (event) =>{
    event.preventDefault()

  }

  let token = JSON.parse(JSON.stringify(localStorage.getItem("token")))
  //using token to grab MY user data on pageload.
  useEffect(() => {
    getUser(token)
      .then(({ data: author }) => {
        localStorage.setItem('userId', author._id)
        setGigState({
          ...gigState,
          gigAuthorName: author.name,
          gigAuthorId: author._id,
          gigAuthorEmail: author.email,
          gigAuthorPic: author.profile,
        })
        getGigs()
        .then(({data: gigs})=>{
          setGigState({...gigState, foundGigs: gigs})
        })
        .catch(e=>console.error(e))
      })
      .catch((e) => console.error(e))
  }, [])

  const postGigButton = <button id="editBtn" className="waves-effect waves-light right white-text col s12">
      Post a gig opportunity <i id="editBtnIcon" className="fas fa-guitar"></i>
    </button>
  //configure error message.
  toast.configure();
  const errorToast = {autoClose: 5000,hideProgressBar: true,type: "error"}
  const successToast = {autoClose: 5000,hideProgressBar: true,type: "success"}
  
  //Submit Form for new Gig
  const submitGig = (event) => {
    event.preventDefault()
    if(gigState.gigTitle === '') {
      return (toast(`Your posting needs a title.`, errorToast))
    } else if (gigState.gigBody ==='') {
      return (toast(`Your posting needs a body.`, errorToast))
    } else{ 
      postGig({
        gigTitle: gigState.gigTitle,
        gigLocation: gigState.gigLocation,
        gigDate: dateState.gigDate,
        gigBody: gigState.gigBody,
        gigTags: gigState.gigTags,
        gigAuthorName: gigState.gigAuthorName,
        gigAuthorId: gigState.gigAuthorId,
        gigAuthorEmail: gigState.gigAuthorEmail,
        gigAuthorPic: gigState.gigAuthorPic
      })
      return (toast(`Your gig "${gigState.gigTitle}" has been successfully posted.`, successToast))
    }
  }

  const visitProfile = (id) => {
    sessionStorage.setItem("token", id)
    history.push('/otherprofile')
  }

  return (
    <>
      <div className="container">      
        <h4 className="center-align white-text">Gig Postings</h4>
        {/* POST A NEW GIG */}
        <div className="row">
          <Modal id="postGigModal" className="center-align"
              actions={[
                <Button flat modal="close" node="button" className="waves-effect waves-light" id="editBtn" >
                  Close
                  </Button>,
                <span>       </span>,
                <Button onClick={submitGig} flat modal="close" node="button" className="waves-effect waves-light" id="editBtn">
                  Submit
                  </Button>
              ]}
              header="Post A Gig Opportunity"
              options={{
                dismissible: true, endingTop: '10%', inDuration: 250, onCloseEnd: null,
                onCloseStart: null, onOpenEnd: null, onOpenStart: null, opacity: 0.5,
                outDuration: 250, preventScrolling: true, startingTop: '4%'
              }}
              trigger={postGigButton}
            >
            <form>
              {/* <h6 className="grey-text">Post a New Gig</h6> */}
              <br></br>
              <TextInput 
                label="Title (required)" 
                placeholder="i.e. Harpist Wanted for Wedding" 
                type="" id="" name="gigTitle" 
                value={gigState.gigTitle} onChange={gigState.handleInputChange} />
                <br/>
                
              <TextInput label="Location" placeholder="(Optional) Where's this gig located?" 
                type="" id="" name="gigLocation" 
                value={gigState.gigLocation} onChange={gigState.handleInputChange} />          
              <br/>
              <DatePicker
                label="Date"
                placeholder="(Optional) Gig Date"
                className=""
                options={{
                  autoClose: false,    container: null,    defaultDate: null,    disableDayFn: null,
                  disableWeekends: false,    events: [],    firstDay: 0,    format: 'mmm dd, yyyy',
                  i18n: {cancel: 'Cancel',clear: 'Clear',done: 'Ok',
                    months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
                    monthsShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                    nextMonth: '›',
                    previousMonth: '‹',
                    weekdays: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
                    weekdaysAbbrev: ['S','M','T','W','T','F','S'],
                    weekdaysShort: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
                  },
                  isRTL: false,maxDate: null,minDate: new Date(),onClose: null,onDraw: null,onOpen: null,onSelect: null,
                  parse: null,setDefaultDate: false,showClearBtn: false,showDaysInNextAndPreviousMonths: false,showMonthAfterYear: false,
                  yearRange: 10
                }}
                onChange={dateState.handleDatePick}
              />
              <br/>
              <Textarea label="Body (required)" placeholder="Tell users more about your gig." 
                // id="newBody" 
                name="gigBody" 
                value={gigState.gigBody} onChange={gigState.handleInputChange} />
            </form>
          </Modal>
        </div>

        {/* GIGS POSTED */}
        <div className="row">
          <div className="row">
            <h4 className="white-text">Gig Postings</h4>
            {/* FILTER GIGS BY TAG */}
            <TextInput
              label="Filter Postings" 
              placeholder="Search Gigs" 
              type="" id="newBody" name="filterGigs" 
              value={filterState.filterGigs} onChange={filterState.handleInputChange} 
            />
          </div>
          {/* FOUND GIGS */}
          <div className="row">
          {
            gigState.foundGigs.length ? gigState.foundGigs.map((gig, index)=>(
              
            <div id="pfRow" className={(index % 2) ? "row grey lighten-1" : "row grey lighten-2"}>
              <div className="center-align">
                  <h4>{gig.gigTitle}</h4>
                  <h6 className="left">Date: {moment(gig.gigDate).format("MMM Do, YYYY")}</h6>
                  <h6 className="right">Located: {gig.gigLocation}</h6>
                <div className="row">
                  <div className="col s4 m4">
                    {/* PICTURE */}
                    {(gig.gigAuthorPic) ? <img onClick={() => visitProfile(gig.gigAuthorId)} className="circle responsive-img" alt="Your pf pic" id="img" src={gig.gigAuthorPic}/> : <img onClick={() => visitProfile(gig.gigAuthorId)} className="circle responsive-img" alt="Your pf pic" id="img" src={default_profile}/>}                  
                  </div>
                  <div className="col s8 m8">
                    <h5>Details</h5>
                    <h6 className="left-align">{gig.gigBody}</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col s4 m4">
                    <h6 onClick={() => visitProfile(gig.gigAuthorId)}>Posted by {gig.gigAuthorName}</h6>
                  </div>
                  <div className="col s8 m8">
                    <p>Contact: <a href={"mailto:" + gig.gigAuthorEmail}>{gig.gigAuthorEmail}</a></p>
                  </div>
                </div>
              </div>
            </div>
            )).reverse(): <><h5>No gigs found.</h5></>
          }
          </div>
        </div>
        
      </div> {/* Container end */}
    </>
  )
}

export default Gigs