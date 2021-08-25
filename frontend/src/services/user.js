import api from './'

export const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password })
  return response.data.data
}

export const signup = async fields => {
  // TODO: validate fields
  const response = await api.post('/user/signup', { ...fields })
  return response.data.success
}
