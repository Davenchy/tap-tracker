import api from './api'

export default {
  register: credentials => api().post('register', credentials),
  login: credentials => api().post('login', credentials)
}
