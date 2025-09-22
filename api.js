import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

const client = axios.create({ baseURL: API_BASE, withCredentials: false })

client.interceptors.request.use(cfg => {
  const token = localStorage.getItem('cs_token')
  if(token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

export const auth = {
  login: (email, password) => client.post('/auth/login', { email, password }).then(r => r.data),
  register: (payload) => client.post('/auth/register', payload).then(r => r.data),
}

export const bots = {
  create: (payload) => client.post('/bots', payload).then(r => r.data),
  list: () => client.get('/bots').then(r => r.data),
  detail: (id) => client.get(`/bots/${id}`).then(r => r.data),
}

export default client
