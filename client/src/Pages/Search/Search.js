import React from 'react'

const Search = () => {
  return (
    <>
      <div className="container">
        <h4 className="center-align">Search for a musician</h4>
        <br></br>
        <form id="searchForm" action="">
          <input id="searchInput" type="search" />
          <i className="fa fa-search"></i>
        </form>
      </div>
    </>
  )
}

export default Search