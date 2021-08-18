import api from './'

export const login = async (username, password) => {
  const response = await api.post('/login', { username, password })
  return response.data
}

export const signup = async fields => {
  // TODO: validate fields
  const response = await api.post('/signup', { ...fields })
  return response.data
}
