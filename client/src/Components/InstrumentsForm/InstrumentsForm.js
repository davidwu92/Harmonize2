import React from 'react'


const InstrumentsForm = props =>{
    return(

<form action="#">
<h1>Instruments</h1>
 <p>
   <label>
     <input type="checkbox" />
     <span>Guitar</span>
   </label>
 </p>
 <p>
   <label>
     <input type="checkbox" />
     <span>Drum Kit</span>
   </label>
 </p>
 <p>
   <label>
     <input type="checkbox" />
     <span>Banjo</span>
   </label>
 </p>
 <p>
   <label>
     <input type="checkbox" />
     <span>Trumpet</span>
   </label>
 </p>
 <p>
   <label>
     <input type="checkbox" />
     <span>Violin</span>
   </label>
 </p>
 <p>
   <label>
     <input type="checkbox" />
     <span>Piano</span>
   </label>
 </p>
 <p>
   <label>
     <input type="checkbox" />
     <span>Harp</span>
   </label>
 </p>
 <p>
   <label>
     <input type="checkbox" />
     <span>Flute</span>
   </label>
 </p>
 <p>
   <label>
     <input type="checkbox" />
     <span>Saxophone</span>
   </label>
 </p>
 <p>
   <label>
     <input type="checkbox" />
     <span>Tuba</span>
   </label>
 </p>
 <p>
   <label>
     <input type="checkbox" />
     <span>Harmonica</span>
   </label>
 </p>
 <p>
   <label>
     <input type="checkbox" />
     <span>Euphonium</span>
   </label>
 </p>

 <p>
    <label htmlFor = "other">Other</label>
    <textarea name="other" id="other" cols ="40" rows="8" onChange = {props.handleInputChange} value = {props.other}></textarea>
  </p>
 
<button type="submit" value="submit" onClick={props.handleFormSubmit}> Submit</button>
 </form>
        
    )
}

export default InstrumentsForm;
 