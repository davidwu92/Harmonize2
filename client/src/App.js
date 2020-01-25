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

import UserContext from './utils/UserContext'

import UserAPI from './utils/UserAPI'

const { addUser } = UserAPI

function App() {
  const [userState, setUserState] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  })

  // Working handleInputchange: call for any Text-Input field.
  userState.handleInputChange = (event) => {
    setUserState({...userState, [event.target.name]: event.target.value})
  }

  userState.handleAddUser = event => {
    event.preventDefault()
    addUser({ 
      name: userState.name,
      email: userState.email,
      username: userState.username,
      password: userState.password
    })
    .then(({ data }) => {
      console.log('succecss')
      setUserState({ ...userState, name: '', email: '', username: '', password: ''})
    })
    .catch(e => console.error(e))
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