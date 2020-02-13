import axios from 'axios'

const GigAPI  = {
  postGig: (newGig) => axios.post('/gigs', newGig),

  getGigs: () => axios.get('/gigs'),

  filterGigs: (query) => axios.get(`/gigs/${query}`)
}

export default GigAPI