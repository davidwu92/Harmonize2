import React, { useState } from 'react'
import './App.css'

// Using Pages
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Navbar from './Components/Navbar'
import LoggedinNav from './Components/LoggedinNav'
import Join from './Components/Join'
import Chat from './Components/Chat'
import Home from './Pages/Home'
import LogIn from './Pages/LogIn'
import Register from './Pages/Register'
import MyProfile from './Pages/MyProfile'
import OtherProfile from './Pages/OtherProfile'
import Search from './Pages/Search'
import ForgotLogin from './Pages/ForgotLogin'
import ResetPass from './Pages/ResetPass'
import UserContext from './utils/UserContext'
import UserAPI from './utils/UserAPI'
import './App.css'
import Messages from './Pages/Messages'



//useState into PAGEs.
//useContext goes into components.


function App() {
  const [userState, setUserState] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    bio: '',
    cityState: '',
  })


  // Working handleInputchange: call for any Text-Input field.
  userState.handleInputChange = (event) => {
    setUserState({ ...userState, [event.target.name]: event.target.value })
  }

  //setting cityState
  userState.setCityState = (value) => {
    setUserState({ ...userState, cityState: value })
  }


  return (
    <UserContext.Provider value={userState}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Navbar />
            <Home />
          </Route>
          <Route path="/login">
            <Navbar />
            <LogIn />
          </Route>
          <Route path="/register">
            <Navbar />
            <Register />
          </Route>
          <Route path="/myprofile">
            <LoggedinNav />
            <MyProfile />
          </Route>
          <Route path="/search">
            <LoggedinNav />
            <Search />
          </Route>
          <Route>
            <Route path="/messages">
              <LoggedinNav />
              <Messages />
            </Route>
            <Route path="/chat">
              <LoggedinNav />
              <Chat />
            </Route>
          </Route>
          <Route path="/otherprofile">
            <LoggedinNav />
            <OtherProfile />
          </Route>
          <Route path="/forgotPassword">
            <ForgotLogin />
          </Route>
          <Route path="/reset/:token">
            <ResetPass />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  )
}

export default App