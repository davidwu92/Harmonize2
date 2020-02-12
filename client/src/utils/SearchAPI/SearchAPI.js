import axios from 'axios'

const SearchAPI = {
  //Search for users.
  searchUsers: (query) => axios.get(`/search/${query}`),

  visitProfile: (id) => axios.get(`/visit/${id}`),

  userInfo: (id) => axios.get(`/friendlist/${id}`)
}

export default SearchAPI