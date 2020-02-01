import React, { useContext } from 'react'
import ProfileContext from '../../utils/ProfileContext'
import MyProfile from '../../Pages/MyProfile'


const LinksCards = () => {


  const { links } =useContext(ProfileContext)

  return(
         <div>
          {
            links.map(link => link.map(ylink => {
             let str = ylink.link
           
           if (str.includes('soundcloud')) {
              let sound = str.split(/"/)[11]
                return (
                  <div>
                    <iframe width="400" height="315" scrolling="no" frameborder="no" allow="autoplay" src={sound}></iframe>
                  </div>
              )
           } else {
             let youtube = str.split(/"/)[5]
              return (
                <div>
                {<iframe width="400" height="315" src={youtube} frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>}
                </div>
              )}}))
          }
        </div>
        
  )
}
export default LinksCards