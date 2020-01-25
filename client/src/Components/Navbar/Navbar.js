import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'


const Navbar = () => {
  return (
      <nav class="nav-extended">
        <div class="nav-wrapper">
          <a href="#" class="brand-logo"><Link to="/">Home</Link></a>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        </div>
        <div class="nav-content">
          <ul class="tabs tabs-transparent">
            <li class="tab"><Link to="/register">Register</Link></li>
            <li class="tab"><Link to="/profile">Profile</Link></li>
            <li class="tab"><Link to="/login">Log In</Link></li>
            <li class="tab"><Link to="/search">Search</Link></li>
          </ul>
        </div>
      </nav>
  )
}

export default Navbar