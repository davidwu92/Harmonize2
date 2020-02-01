//Landing Page
import React from 'react'
import LinksCards from '../../Components/LinksCards'

const Home = () => {
  return (
    <>
    <LinksCards />
      <h4 className="center-align">Helping musicians find musicians since 2020.</h4>
      <img id="homeimg" src="https://cdn10.bostonmagazine.com/wp-content/uploads/2015/08/shutterstock_band.jpg" />
    </>
  )
}

export default Home