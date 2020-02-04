import React,{Component} from 'react'
import InstrumentsForm from '../../Components/InstrumentsForm'
import Instdisplay from '../../Components/Instdisplay'

class Instruments extends Component {

  state = {
   
    other: '',
    dispOther: ''
  }

  handleInputChange =event => {
    this.setState({[event.target.name]: event.target.value})

  }
handleFormSubmit = event => {
  event.preventDefault()
  this.setState({
    
    dispOther: this.state.other,
    other:''
  })
}

  render (){
    return(
      <>
    <InstrumentsForm 
    handleFormSubmit={this.handleFormSubmit}
    handleInputChange ={this.handleInputChange}
    
    other= {this.state.other}
    />
    <Instdisplay
     dispOther = {this.state.dispOther}
    />
    </>
    )
  }
}
export default Instruments
