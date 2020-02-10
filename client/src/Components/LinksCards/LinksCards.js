import React, { useContext } from 'react'
import ProfileContext from '../../utils/ProfileContext'
import MyProfile from '../../Pages/MyProfile'
import './linkCards.css'


const LinksCards = () => {

  let token = JSON.parse(JSON.stringify(localStorage.getItem("token")))
  const { links, deleteVideo } = useContext(ProfileContext)

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
                    <span className="card-title grey-text text-darken-4"><i className="material-icons white-text right">close</i></span>
                    <h5>Would you like to delete this post?</h5>
                    <a id="delPost" href="#" onClick={() => deleteVideo(token, ylink._id)}><i className="material-icons white-text">delete</i></a>
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
                    <span className="card-title grey-text text-darken-4"><i className="material-icons  white-text right">close</i></span>
                    <h5>Would you like to delete this post?</h5>
                    <button id="delPost" className="btn waves-effect waves-light black col s12 white-text" href="#" onClick={() => deleteVideo(token, ylink._id)}>Delete</button>
                  </div>
                </div>
              </div>
            )
          }
        }).reverse()
        )
      }
    </div>

  )
}
export default LinksCards