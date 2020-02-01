//Landing Page
import React from 'react'


const Home = () => {
  return (
    <>
      <h5 className="center-align">Helping musicians find musicians since 2020.</h5>
      <img id="homeimg" src="https://cdn10.bostonmagazine.com/wp-content/uploads/2015/08/shutterstock_band.jpg" />
      <div className="row">
        <div className="col s12">           
            <p>
               <h5>
                 Welcome! 
               </h5> 
                I always encourage musicians to play with others as much as possible.  However, it can feel a bit daunting to find musicians, jam buddies or band members in your area.
                Don't worry! There are always bands and musicians of all levels looking for someone to jam or collaborate with near you. All you have to do is find them with HARMONIZE!
            </p>             
        </div>
         <div className="col s6">
            <div className="guitar">
              <img src="https://24.media.tumblr.com/4168812b2f1dbbec1159be8341eee03d/tumblr_ml96f34grU1qzoxl6o1_500.gif"
              // style="width:100%;"
              />
            </div>
        </div>     
    </div>
    </>
  )
}

export default Home