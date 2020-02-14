import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './loggedinNav.css'

const LoggedinNav = () => {

  const logout = (e) => {
    e.preventDefault()
    localStorage.clear('token')
  }

  return (
    <nav id="bottomNav" className="nav-extended black">
      <div className="nav-wrapper" id="navWrapper">
        <div className="brand-logo" id="nav">Harmonize</div>
      </div>
      <div className="nav-content">
        <ul className="tabs tabs-transparent">
          {/* <li id="hovEffect" className="tab left"><Link to="/messages"><i className="fas fa-comment"></i></Link></li> */}
          <li id="hovEffect" className="tab"><Link to="/friends"><i className="fas fa-user-friends"></i></Link></li>
          <li id="hovEffect" className="tab left"><Link to="/gigpostings"><i className="fas fa-guitar"></i></Link></li>
          <li id="hovEffect" className="tab"><Link to="/search"><i className="far fa-compass"></i></Link></li>
          <li id="hovEffect" className="tab"><Link to="/myprofile"><i className="fas fa-user-alt"></i></Link></li>
          <li id="hovEffect" className="tab right" onClick={logout}><Link to="/"><i className="fas fa-sign-out-alt"></i></Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default LoggedinNav