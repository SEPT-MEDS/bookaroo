import axios from 'axios'
import config from '../config'
import { getTokenRaw } from 'hooks/useAuth'

export const instance = axios.create({
  baseURL: config.apiAddress,
  timeout: 1000 * 30,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(async config => {
  config.headers.Authorization = getTokenRaw()
  console.log('using token', config.headers.Authorization)
  return config
})

const api = {
  get: (endpoint, data) =>
    instance.get(endpoint, { params: data }),

  post: (endpoint, data, type = 'application/json') =>
    instance.post(endpoint, data, {
      headers: {
        'Content-Type': type,
      },
    }),

  patch: (endpoint, data, type = 'application/json') =>
    instance.patch(endpoint, data, {
      headers: {
        'Content-Type': type,
      },
    }),

  put: instance.put,
  delete: instance.delete
}

export * from './user'
export * from './book'

export default api
