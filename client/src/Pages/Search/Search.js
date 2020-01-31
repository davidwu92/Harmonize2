import React, {useState} from 'react'
import SearchAPI from '../../utils/SearchAPI'
import { useHistory } from 'react-router-dom'

const {searchUsers} = SearchAPI

const Search = () => {
  let history = useHistory()

  const [searchState, setSearchState] = useState({
    searchBar: '',
    searchedUsers: []
  })

  searchState.handleInputChange = (event) => {
    setSearchState({ ...searchState, [event.target.name]: event.target.value })
  }

  //SIMPLE SEARCH FORM: finds users using username or name.
  const handleSearch = (event) => {
    event.preventDefault()
    if(searchState.searchBar) {
      searchUsers(searchState.searchBar)
        .then(({data})=>{
          setSearchState({
            searchedUsers: data
          })
        })
        .catch(e=>console.error(e))
    }
  }
  
  //save chosen user's id to sessionStorage, render OtherProfile.js
  const visitProfile = (id) => {
    sessionStorage.setItem("token", id)
    history.push('/otherprofile')
  }

  return (
    <>
      <div className="container">
        <h4 className="center-align">Search for a musician</h4>
        <br></br>
        <form id="searchForm">
          <input id="searchInput" type="search" name="searchBar" value={searchState.searchBar} onChange={searchState.handleInputChange}/>
          <button onClick={handleSearch}><i className="fa fa-search"></i></button>
        </form>
      </div>
      <div>
        {/* FOUND USERS POPULATE HERE; need styling. */}
        {
          searchState.searchedUsers.length ? searchState.searchedUsers.map(user =>(
            <div>
              {/* USERNAME is clickable; needs styling. */}
              <h3 onClick={()=>visitProfile(user._id)}>{user.name}</h3>
              <h5>{user.username}</h5>
              <h6>{user.email}</h6>
            </div>
          )) : <p>No users found.</p>
        }
      </div>
    </>
  )
}

export default Search