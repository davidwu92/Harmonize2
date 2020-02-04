import React from 'react'


const SkillsForm = props =>{
    return(

        <form>

    <h1>Skill</h1>
     
 <p>
   <label>
     <input type="checkbox" />
     <span> Single Instrument</span>
   </label>
 </p>
 <p>
   <label>
     <input type="checkbox" />
     <span>Multiple Instruments and Singing</span>
   </label>
 </p>
 <p>  <label htmlFor = "skills">OtherSkills</label>  
        <textarea name="skills" id="skills" cols ="40" rows="4" onChange = {props.handleInputChange} value = {props.skills}></textarea>
      </p>
         <button type="submit" value="submit" onClick={props.handleFormSubmit}> Submit</button>
 
 </form>
        
    )
}
 
export default SkillsForm;
 