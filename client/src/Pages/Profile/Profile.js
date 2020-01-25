import React from 'react'

const Profile = () =>{
  return (
    <>
      <div class="container">
        <div class="row valign-wrapper">
          <div class="col s2">
            {/* PROFILE PIC */}
            <img
            class ="circle responsive-img"
            src="https://preview.redd.it/4bsnuu9wpue11.jpg?width=640&crop=smart&auto=webp&s=212294834cfa17f23e370cbadc655c7d6ca48c95"
            alt="Louise"/>
          </div>
          <div class="col s10">
            <h3 class="black-text">
              {/* NAME */}
              Louise Belcher
            </h3>
            <h5 class="grey-text">
              {/* BIO */}
              My main instrument is the cup-and-straw. I'm all about that jam sesh life!
            </h5>
          </div>        
        </div>
        <div>
          <p>Embedded Video</p>
          <p>Embedded Video</p>
          <p>Embedded Video</p>
          <p>Embedded Video</p>
          <p>Embedded Video</p>
          <p>Embedded Video</p>
        </div>


      </div>
    </>
  )
}

export default Profile