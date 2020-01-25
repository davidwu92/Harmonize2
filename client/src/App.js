import React, {useState} from 'react'
import './App.css'

// Using Pages
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import LogIn from './Pages/LogIn'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import Search from './Pages/Search'

import UserContext from './Utils/UserContext'



function App() {
  const [userState, setUserState] = useState({
    name: '',
    email: '',
    username: ''
  })

  // Working handleInputchange: call for any Text-Input field.
  userState.handleInputChange = (event) => {
    setUserState({...userState, [event.target.name]: event.target.value})
  }


  return (
    <UserContext.Provider value={userState}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Navbar/>
            <Home />
          </Route>
          <Route path="/login">
            <Navbar/>
            <LogIn />
          </Route>
          <Route path="/register">
            <Navbar/>
            <Register />
          </Route>
          <Route path="/profile">
            <Navbar/>
            <Profile />
          </Route>
          <Route path="/search">
            <Navbar/>
            <Search />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  )
}

export default App