import axios from 'axios'

const UserAPI = {
  //to get info on logged-in user.
  getUser: (token) => axios.get('/users', {
      headers: {
        "Authorization": "Bearer " + token}
    }),
  
  //Registering
  addUser: (user) => axios.post('/users', user),
  
  //edit profile
  updateUser: (id, values) => axios.put(`/users/${id}`, values),
  
  //delete user.
  deleteUser: (id) => axios.delete(`/users/${id}`),
  
  //login existing user.
  loginUser: (user) => axios.post('/login', user)
}

export default UserAPI
