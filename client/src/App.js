import React from 'react';

//Using Pages
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import LogIn from './Pages/LogIn'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import Search from './Pages/Search'

function App() {
  return (
    <Router>
      <Link to="/">Log In</Link>
      <Link to="/register">Register</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/search">Search</Link>
      <Switch>
        <Route exact path="/">
          <LogIn/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/profile">
          <Profile/>
        </Route>
        <Route path="/search">
          <Search/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
