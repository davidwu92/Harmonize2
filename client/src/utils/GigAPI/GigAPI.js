import axios from 'axios'

const GigAPI  = {
  postGig: (newGig) => axios.post('/gigs', newGig),

  getGigs: () => axios.get('/gigs')
}

export default GigAPI