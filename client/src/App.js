import React from 'react'
import './App.css'

// Using Pages
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Home from './Pages/Home'
import LogIn from './Pages/LogIn'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import Search from './Pages/Search'
import Navbar from './Components/Navbar'

function App() {
  return (
    <Router>
      <Navbar/>
      <Link to="/">Home</Link>
      {/* <Link to="/login">Log In</Link> */}
      {/* <Link to="/register">Register</Link> */}
      {/* <Link to="/profile">Profile</Link> */}
      {/* <Link to="/search">Search</Link> */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
      </Switch>
    </Router>
  )
}

export default App