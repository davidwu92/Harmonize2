import axios from 'axios'

const GigAPI  = {
  postGig: (newGig) => axios.post('/gigs', newGig),

  getGigs: () => axios.get('/gigs'),

  filterGigs: (query) => axios.get(`/gigs/${query}`),
  
  removeGig: (id) => axios.delete(`/gigs/${id}`),
  
  updateGig: (id, values) => axios.put(`/gigs/${id}`, values)
}

export default GigAPI