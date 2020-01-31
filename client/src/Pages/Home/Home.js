//Landing Page
import React from 'react'


const Home = () => {
  return (
    <>
      <h4 className="center-align">Helping musicians find musicians since 2020.</h4>
      <img id="homeimg" src="https://cdn10.bostonmagazine.com/wp-content/uploads/2015/08/shutterstock_band.jpg" />
      <div className="container">
        <div className="box1">           
            <p>
               <h5>
                 Welcome! 
               </h5> 
                I always encourage musicians to play with others as much as possible.  However, it can feel a bit daunting to find musicians, jam buddies or band members in your area.
                Don't worry! There are always bands and musicians of all levels looking for someone to jam or collaborate with near you. All you have to do is find them! With Harmonize this is made very simple.
                Search through hundreds of profiles that will have you jamming in no time.
            </p>             
        </div>
         <div className="box2">
            <div className="guitar">
              <img src="http://24.media.tumblr.com/9814d224ae7e606b22797b0d90df3d8d/tumblr_mzdh1vLGdb1toamj8o2_r1_500.gif" 
              // style="width:100%;"
              />
            </div>
        </div>     
    </div>
    </>
  )
}

export default Home