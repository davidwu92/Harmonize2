//Landing Page
import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './home.css'

const Home = () => {
  return (
    <>
      {/* <div className="row">
        <div className="col s12">
          <div className="container">
            <h5 className="center-align teal-text">HELPING MUSICIANS FIND MUSICIANS</h5>
            <h6 className="center-align">
              Looking to find musicians, jam buddies or band members in your area?<br></br>
              Don't worry!  With HARMONIZE you can find bands and musicians of all levels looking for someone to jam and collaborate with near you!<br></br>
              <h6><a><Link to="/register">Create Your Account To Get Started!</Link></a></h6>
            </h6>

            <img id="homeimg" src="https://cdn10.bostonmagazine.com/wp-content/uploads/2015/08/shutterstock_band.jpg" />
          </div>
        </div>
      </div> */}

      {/* TEST */}
      <div className="container center-align">
        <h5 className="white-text">FIND MUSICIONS, JAM BUDDIES, OR BAND MEMBERS IN YOUR AREA.</h5>
        <div id="homeCard" className="row">
          <div className="col s12">
            <div className="sp-container">
              <div className="sp-content">
                <div className="sp-globe"></div>
                <h4 className="frame-1">PLAY MUSIC!</h4>
                <h4 className="frame-2">JAM</h4>
                <h4 className="frame-3">COLLABORATE</h4>
                <h4 className="frame-4">HARMONIZE</h4>
                <h4 className="frame-5">
                  <span>HELPING MUSICIANS, </span>
                  <span>FIND </span>
                  <span>MUSICIANS.</span>
                </h4>
                <a className="sp-circle-link"><Link to="/login">Let's Go<i className="material-icons">send</i></Link></a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home