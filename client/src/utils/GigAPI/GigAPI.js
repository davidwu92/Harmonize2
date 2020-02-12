import axios from 'axios'

const GigAPI  = {

  postGigs: (newGig) => axios.post('/gigs', newGig),

  getGigs: () => axios.get('/gigs')

}

export default GigAPI