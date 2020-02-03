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
                <div className="card">
                  <div className="card-content">
                    <iframe id="iframe" scrolling="no" frameborder="no" allow="autoplay" src={sound}></iframe>
                    <div className="card-action">
                      <a id="delPost" href="#">Delete This Post</a>
                    </div>
                  </div>
                </div>
              </div>
            )
          } else {
            let youtube = str.split(/"/)[5]
            return (
              <div className="col s12 m6 l4">
                <div className="card">
                  <div className="card-content">
                    {<iframe id="iframe" src={youtube} frameborder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>}
                    <div className="card-action">
                      <a id="delPost" href="#"> Delete This Post</a>
                    </div>
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