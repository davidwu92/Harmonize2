import React, {useState} from 'react'
import './App.css'

// Using Pages
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from 'react-router-dom'
import Navbar from './Components/Navbar'
import LoggedinNav from './Components/LoggedinNav'
import Home from './Pages/Home'
import LogIn from './Pages/LogIn'
import Register from './Pages/Register'
import MyProfile from './Pages/MyProfile'
import OtherProfile from './Pages/OtherProfile'
import Search from './Pages/Search'
import UserContext from './utils/UserContext'
import UserAPI from './utils/UserAPI'
import './App.css'

const { addUser } = UserAPI

//useState into PAGEs.
//useContext goes into components.


function App() {
  const [userState, setUserState] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    bio: '',
  })
  

  // Working handleInputchange: call for any Text-Input field.
  userState.handleInputChange = (event) => {
    setUserState({ ...userState, [event.target.name]: event.target.value })
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
          <Route path="/otherprofile">
            <LoggedinNav />
            <OtherProfile />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  )
}

export default App