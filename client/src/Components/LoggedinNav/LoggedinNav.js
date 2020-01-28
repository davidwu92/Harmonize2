import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const LoggedinNav = () => {
  return (
    <nav id="bottomNav" className="nav-extended black">
      <div className="nav-wrapper" id="navWrapper">
        <a href="#" className="brand-logo" id="nav"><Link to="/">Harmonize</Link></a>
      </div>
      <div className="nav-content">
        <ul className="tabs tabs-transparent">
          <li className="tab left"><Link to="/search"><i className="far fa-compass"></i></Link></li>
          <li className="tab"><Link to="/profile"><i className="fas fa-user-circle"></i></Link></li>
          <li className="tab right"><Link to="/"><i className="fas fa-sign-out-alt"></i></Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default LoggedinNav