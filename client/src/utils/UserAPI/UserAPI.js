import axios from 'axios'

const UserAPI = {
  //to get info on logged-in user.
  getUser: (token) => axios.get('/users', {
      headers: {
        "Authorization": "Bearer " + token}
    }),
    
  //edit profile
  updateUser: (id, values) => axios.put(`/users/${id}`, values),
  



  //add YouTube to profile? CURRENTLY NOT WORKING
  // addYoutube: (id, youtubeLink) => axios.post(`/youtubes/${id}`, youtubeLink),

    addYoutube: (token, youtubeLink) => axios({
      method: 'post',
      url: '/youtubes',
      data: {
        title: youtubeLink.newTitle,
        body: youtubeLink.newBody,
        link: youtubeLink.newLink
      },
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }),

    getYoutube: (token) => axios({
      method: 'get',
      url: '/youtubes',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }),

    deleteYoutube: (token, id) => axios({
      method: 'delete',
      url: '/youtubes',
      data: {
        _id: id
      },
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }),

  getOtherYoutube: (id) => axios.get(`/youtubes/${id}`),

  //Register new user
  addUser: (user) => axios.post('/users', user),
  
  //delete user.
  deleteUser: (id) => axios.delete(`/users/${id}`),
  
  //login existing user.
  loginUser: (user) => axios.post('/login', user)
  
}

export default UserAPI
