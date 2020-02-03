import React, { useContext } from 'react'
import ProfileContext from '../../utils/ProfileContext'
import MyProfile from '../../Pages/MyProfile'


const LinksCards = () => {


  const { links } = useContext(ProfileContext)

  return (
    <div>
      {
        links.map(link => link.map(ylink => {
          let str = ylink.link

          if (str.includes('soundcloud')) {
            let sound = str.split(/"/)[11]
            return (
              <div className="col s12 m6 l4">
                <div className="card black">
                  <div className="card-img">
                    <iframe id="iframe" className="activator" scrolling="no" frameborder="no" allow="autoplay" src={sound}></iframe>
                  </div>
                  <div className="card-action">
                    <span className="activator"><i className="material-icons right white-text">more_vert</i></span>
                    <br></br>
                  </div>
                  <div id="cardReveal" className="card-reveal">
                    <span class="card-title grey-text text-darken-4"><i class="material-icons white-text right">close</i></span>
                    <h5>Would you like to delete this post?</h5>
                    <a id="delPost" href="#"><i className="material-icons white-text">delete</i></a>
                  </div>
                </div>
              </div>
            )
          } else {
            let youtube = str.split(/"/)[5]
            return (
              <div className="col s12 m6 l4">
                <div className="card black">
                  <div className="card-img">
                    {<iframe id="iframe" className="activator" src={youtube} frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>}
                  </div>
                  <div className="card-action">
                    <span className="activator"><i className="material-icons right white-text">more_vert</i></span>
                    <br></br>
                  </div>
                  <div id="cardReveal" className="card-reveal">
                    <span class="card-title grey-text text-darken-4"><i class="material-icons  white-text right">close</i></span>
                    <h5>Would you like to delete this post?</h5>
                    <a id="delPost" href="#"><i className="material-icons white-text ">delete</i></a>
                  </div>
                </div>
              </div>
            )
          }
        }))
      }
    </div>

  )
}
export default LinksCards