import axios from './node_modules/axios'

const UserAPI = {
  getUsers: () => axios.get('/users'),
  addUser: (user) => axios.post('/users', user),
  updateUser: (id, values) => axios.put(`/users/${id}`, values),
  deleteUser: (id) => axios.delete(`/users/${id}`),
  loginUser: (user) => axios.post('/login', user)
}

export default UserAPI
