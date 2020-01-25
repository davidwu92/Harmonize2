import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'


const Navbar = () => {
  return (
      <nav className="nav-extended">
        <div className="nav-wrapper">
          <a href="#" className="brand-logo"><Link to="/">Home</Link></a>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        </div>
        <div className="nav-content">
          <ul className="tabs tabs-transparent">
            <li className="tab"><Link to="/register">Register</Link></li>
            <li className="tab"><Link to="/profile">Profile</Link></li>
            <li className="tab"><Link to="/login">Log In</Link></li>
            <li className="tab"><Link to="/search">Search</Link></li>
          </ul>
        </div>
      </nav>
  )
}

export default Navbar