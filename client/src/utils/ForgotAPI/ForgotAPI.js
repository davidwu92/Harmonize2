import axios from 'axios'

const ForgotAPI  = {

sendForgot: (email) => axios.post('/forgotPassword', email),



}

export default ForgotAPI