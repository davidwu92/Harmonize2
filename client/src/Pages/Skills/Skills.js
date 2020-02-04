import React,{Component} from 'react'
import SkillsForm from '../../Components/SkillsForm'
import Skilldisplay from '../../Components/Skilldisplay'

class Skills extends Component {

  state = {
   
    skills: '',
    dispSkills: ''
  }

  handleInputChange =event => {
    this.setState({[event.target.name]: event.target.value})

  }
handleFormSubmit = event => {
  event.preventDefault()
  this.setState({
    
    dispSkills: this.state.skills,
    skills:''
  })
}

  render (){
    return(
      <>
    <SkillsForm
    handleFormSubmit={this.handleFormSubmit}
    handleInputChange ={this.handleInputChange}
    skills= {this.state.skills}
    />
    <Skilldisplay
     dispSkills = {this.state.dispSkills}
    />
    </>
    )
  }
}
export default Skills
