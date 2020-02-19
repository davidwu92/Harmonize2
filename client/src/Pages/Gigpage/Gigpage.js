//client/src/Pages/Gigs/Gigs.js
import React, { useState, useEffect } from 'react'
import { Modal, Button, TextInput, Textarea, DatePicker } from 'react-materialize'
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

const { postGig, getGigs, filterGigs, removeGig, updateGig } = GigAPI

const Gigpage = () => {
  
  let history = useHistory()

  //New Gig Posting Variables
  const [gigState, setGigState] = useState({
    gigTitle: '', gigLocation: '', gigDate: '', gigBody: '', gigTags: '',
    //All gigs stored in db: updated upon pageload
    foundGigs: [],
  })
  gigState.handleInputChange = (event) => {
    setGigState({ ...gigState, [event.target.name]: event.target.value })
  }

  //Gig Author Info: updated upon pageload
  const [authorState, setAuthorState] = useState({
    authorName: '', authorUsername: '', authorId: '', authorEmail: '', authorPic: '',
  })

  // Date of new gig.
  const [dateState, setDateState] = useState({
    gigDate: '',
  })
  dateState.handleDatePick = (date) => {
    setDateState({ gigDate: date })
  }

  const [filterState, setFilterState] = useState({
    filterGigs: '',
  })
  filterState.handleInputChange = (event) => {
    setFilterState({ ...filterState, [event.target.name]: event.target.value })
  }
  //SUBMIT FILTER FORM SUBMIT
  const submitFilter = (event) => {
    event.preventDefault()
    filterGigs(filterState.filterGigs)
      .then(({ data }) => {
        setGigState({ ...gigState, foundGigs: data })
      })
      .catch(e => console.error(e))
  }
  //CLEAR FILTERS FUNCTION (Reload "find all gigs")
  const clearFilter = (event) => {
    event.preventDefault()
    setFilterState({ filterGigs: '' })
    getGigs()
    .then(({data: allthegigs})=>{
      setGigState({...gigState, foundGigs: allthegigs})
    })
    .catch(e=>console.error(e))
  }

  let token = JSON.parse(JSON.stringify(localStorage.getItem("token")))
  //using token to grab MY user data on pageload.
  getUser(token)
    .then(({ data: author }) => {
      localStorage.setItem('userId', author._id)
      setAuthorState({
        ...authorState,
        authorName: author.name,
        authorUsername: author.username,
        authorId: author._id,
        authorEmail: author.email,
        authorPic: author.profile,
      })
    })
    .catch((e) => console.error(e))

  useEffect(() => {
    getGigs()
    .then(({data: allthegigs})=>{
      setGigState({...gigState, foundGigs: allthegigs})
    })
    .catch(e=>console.error(e))
  },[])


  const postGigButton = <button id="editBtn" className="waves-effect waves-light right white-text col s12">
    Post a gig opportunity <i id="editBtnIcon" className="fas fa-guitar"></i>
  </button>
  //configure error message.
  toast.configure();
  const errorToast = { autoClose: 5000, hideProgressBar: true, type: "error" }
  const successToast = { autoClose: 5000, hideProgressBar: true, type: "success" }

  //Submit Form for new Gig
  const submitGig = (event) => {
    event.preventDefault()
    if (gigState.gigTitle === '') {
      return (toast(`Your posting needs a title.`, errorToast))
    } else if (gigState.gigBody === '') {
      return (toast(`Your posting needs a body.`, errorToast))
    } else if (gigState.gigLocation === '') {
      return (toast(`Your posting needs a location description.`, errorToast))
    } else if (dateState.gigDate === '') {
      return (toast(`Your posting must have a date!`, errorToast))
    }
    else {
      postGig({
        gigTitle: gigState.gigTitle,
        gigLocation: gigState.gigLocation,
        gigDate: dateState.gigDate,
        gigBody: gigState.gigBody,
        gigTags: gigState.gigTags.split(", "),
        authorName: authorState.authorName,
        authorUsername: authorState.authorUsername,
        authorId: authorState.authorId,
        authorEmail: authorState.authorEmail,
        authorPic: authorState.authorPic
      })
      return (toast(`Your gig "${gigState.gigTitle}" has been successfully posted.`, successToast))
    }
  }

  const visitProfile = (id) => {
    sessionStorage.setItem("token", id)
    history.push('/otherprofile')
  }

  //DELETE A GIG BUTTON FUNCTION
  const deleteGig = (id) => {
    console.log(`Gig ${id} deleted`)
    removeGig(id)
      .then(() => {
        //Refresh Page?
        window.location.reload()
      })
      .catch(e => console.error(e))
  }

  const editGigBtn = <button className="btn-floating grey darken-3 btn-small"><i className="tiny fas fa-edit"></i></button>
  const editGig = (id) => {
    console.log(`Gig ${id} editing window.`)
    updateGig(id, {
      gigTitle: gigState.gigTitle,
      gigLocation: gigState.gigLocation,
      gigDate: dateState.gigDate,
      gigBody: gigState.gigBody,
      gigTags: gigState.gigTags.split(", "),
      authorName: authorState.authorName,
      authorUsername: authorState.authorUsername,
      authorId: authorState.authorId,
      authorEmail: authorState.authorEmail,
      authorPic: authorState.authorPic
    })
      .then(() => {
        window.location.reload()
      })
      .catch(e => console.error(e))
  }

  // const checkStates = (event) => {
  //   event.preventDefault()
  //   console.log(authorState)
  //   console.log(gigState)
  // }

  return (
    <>
      <div className="container">
        {/* CHECK STATES BUTTON */}
        {/* <button onClick={checkStates}>CLICK ME</button>      */}
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
              <TextInput className="white-text"
                label="Title"
                placeholder="i.e. Harpist Wanted for Wedding"
                type="" id="" name="gigTitle"
                value={gigState.gigTitle} onChange={gigState.handleInputChange} />
              <br />

              <TextInput className="white-text" label="Location" placeholder="Where's this gig located?"
                type="" id="" name="gigLocation"
                value={gigState.gigLocation} onChange={gigState.handleInputChange} />
              <br />
              <DatePicker
                label="Date"
                placeholder="Gig Date"
                className=""
                options={{
                  autoClose: false, container: null, defaultDate: null, disableDayFn: null,
                  disableWeekends: false, events: [], firstDay: 0, format: 'mmm dd, yyyy',
                  i18n: {
                    cancel: 'Cancel', clear: 'Clear', done: 'Ok',
                    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    nextMonth: '›',
                    previousMonth: '‹',
                    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                    weekdaysAbbrev: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                  },
                  isRTL: false, maxDate: null, minDate: new Date(), onClose: null, onDraw: null, onOpen: null, onSelect: null,
                  parse: null, setDefaultDate: false, showClearBtn: false, showDaysInNextAndPreviousMonths: false, showMonthAfterYear: false,
                  yearRange: 10
                }}
                onChange={dateState.handleDatePick}
              />
              <br />
              <Textarea className="white-text" label="Body" placeholder="Tell users more about your gig."
                // id="newBody" 
                name="gigBody"
                value={gigState.gigBody} onChange={gigState.handleInputChange} />
              <Textarea className="white-text" label="Tags (Must be separated by commas)" placeholder="Harp, wedding, live performer"
                name="gigTags"
                value={gigState.gigTags} onChange={gigState.handleInputChange}
              />
            </form>
          </Modal>

          <p className="grey-text center">*Note: past gigs will not show up in postings.</p>
        </div>

        <div className="divider"></div>
        {/* GIGS POSTED */}

        <div className="row">
          <form>
            {/* FILTER GIGS BY TAG/LOCATION */}
            <div className="col s12 m12 l4">
              <TextInput
                className="center-align"
                placeholder="Filter by City, Author, or Tags"
                type="" id="newBody" name="filterGigs"
                value={filterState.filterGigs} onChange={filterState.handleInputChange}
              />
            </div>
            <div className="col l2">
              <button onClick={submitFilter} id="filterBtn" className="waves-effect waves-light btn white-text" type="submit" name="action">
                Filter Results<i className="fas fa-tags"></i>
              </button>
            </div>
            <div className="col l2">
              <button onClick={clearFilter} id="filterBtn" className="waves-effect waves-light btn white-text right" type="submit" name="action">
                Clear Filters<i className="fas fa-tags"></i>
              </button>
            </div>
            <div className="col m6 l4"></div>
          </form>
        </div>

        {/* FOUND GIGS */}
        {
          gigState.foundGigs.length ? gigState.foundGigs.filter(
            gig => (moment(gig.gigDate) - moment(Date.now()) > 0)
          ).map((gig, index) => (
            <div id="pfRow" className={(index % 2) ? "row grey lighten-1" : "row grey lighten-2"}>

              <div>
                {/* TITLE, DATE, LOCATION */}
                <h5 className="center-align">{gig.gigTitle}</h5>

                <div className="container">
                  <div className="divider teal"></div>

                  <div className="row">
                    <div className="col s12 m4 center-align">
                      {/* PHOTO */}
                      <div onClick={() => visitProfile(gig.authorId)}>
                        {(gig.authorPic) ? <img className="circle responsive-img" alt="Your pf pic" id="img" src={gig.authorPic} /> : <img className="circle responsive-img" alt="Your pf pic" id="img" src={default_profile} />}
                      </div>
                      <p onClick={() => visitProfile(gig.authorId)}>Posted By: <a>{gig.authorName} ({gig.authorUsername})</a></p>
                    </div>
                    <div className="col s12 m8">
                      <div className="row">
                        <div className="col s6 m4">
                          <p>Posted {moment(gig.createdAt).format("L")}</p>
                          <p>Contact: <a href={"mailto:" + gig.authorEmail}>{gig.authorEmail}</a></p>
                        </div>
                        <div className="col s6 m4">
                          <p><span className="teal-text"><b>DATE:</b></span> {moment(gig.gigDate).format("MMM Do, YYYY")}</p>
                          <p><span className="teal-text">LOCATION:</span>{gig.gigLocation}</p>
                        </div>

                        <div className="col s12">
                          <p><span className="teal-text">DETAILS:</span> {gig.gigBody}</p>
                          <span onClick={() => visitProfile(gig.authorId)}>
                            Tag(s):
                      {gig.gigTags.length > 1 ?
                              gig.gigTags.map(gig => (<span> {gig}</span>)) :
                              <span>{gig.gigTags[0] ? gig.gigTags[0] : " None"}</span>}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* DELETE/EDIT GIG BUTTONS */}
              {
                gig.authorId === localStorage.getItem('userId') ?
                  <div className="right">
                    {/* EDIT GIG MODAL */}
                    <Modal id="postGigModal" className="center-align"
                      actions={[
                        <Button flat modal="close" node="button" className="waves-effect waves-light" id="editBtn" >
                          Close
                      </Button>,
                        <span></span>,
                        <Button onClick={() => editGig(gig._id)} flat modal="close" node="button" className="waves-effect waves-light" id="editBtn">
                          Submit
                      </Button>
                      ]}
                      header="Edit Selected Gig"
                      options={{
                        dismissible: true, endingTop: '10%', inDuration: 250, onCloseEnd: null,
                        onCloseStart: null, onOpenEnd: null, onOpenStart: null, opacity: 0.5,
                        outDuration: 250, preventScrolling: true, startingTop: '4%'
                      }}
                      trigger={editGigBtn}
                    >
                      <form>
                        <br></br>
                        <TextInput
                          className="white-text"
                          label="Title"
                          placeholder={gig.gigTitle}
                          type="" id="" name="gigTitle"
                          value={gigState.gigTitle} onChange={gigState.handleInputChange} />
                        <br />

                        <TextInput className="white-text" label="Location" placeholder={gig.gigLocation}
                          type="" id="" name="gigLocation"
                          value={gigState.gigLocation} onChange={gigState.handleInputChange} />
                        <br />
                        <DatePicker
                          label="Date"
                          placeholder={moment(gig.gigDate).format("MMM Do, YYYY")}
                          className=""
                          options={{
                            autoClose: false, container: null, defaultDate: null, disableDayFn: null,
                            disableWeekends: false, events: [], firstDay: 0, format: 'mmm dd, yyyy',
                            i18n: {
                              cancel: 'Cancel', clear: 'Clear', done: 'Ok',
                              months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                              monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                              nextMonth: '›',
                              previousMonth: '‹',
                              weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                              weekdaysAbbrev: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                              weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                            },
                            isRTL: false, maxDate: null, minDate: new Date(), onClose: null, onDraw: null, onOpen: null, onSelect: null,
                            parse: null, setDefaultDate: false, showClearBtn: false, showDaysInNextAndPreviousMonths: false, showMonthAfterYear: false,
                            yearRange: 10
                          }}
                          onChange={dateState.handleDatePick}
                        />
                        <br />
                        <Textarea className="white-text" label="Body" placeholder={gig.gigBody}
                          name="gigBody"
                          value={gigState.gigBody} onChange={gigState.handleInputChange} />
                        <Textarea className="white-text" label="Tags (Must be separated by commas)"
                          placeholder={gig.gigTags.map(tag => " " + tag)}
                          name="gigTags"
                          value={gigState.gigTags} onChange={gigState.handleInputChange}
                        />
                      </form>
                    </Modal>
                    <span>  </span>
                    {/* DELETE GIG BUTTON */}
                    <button className="btn-floating btn-small" onClick={() => deleteGig(gig._id)}>
                      <i className="tiny fas fa-trash"></i>
                    </button>
                  </div> :
                  null
              }
            </div>
          )).reverse() : <><h5 className="white-text center-align">No gigs found.</h5></>
        }


      </div> {/* Container end */}
    </>
  )
}

export default Gigpage