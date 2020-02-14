//Landing Page
import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './home.css'

const Home = () => {
  return (
    <>
      <div className="container center-align">
        <h5 className="white-text">FIND MUSICIANS, JAM BUDDIES, OR BAND MEMBERS IN YOUR AREA.</h5>
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
                <div className="sp-circle-link"><Link to="/login">Let's Go<i className="material-icons">send</i></Link></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home