import api from './'

export const getUser = async id => {
  const { data } = await api.get(`/user/${id}`)
  return data.user
}

export const login = async (username, password) => {
  // TODO Catch error
  const response = await api.post('/auth/login', { username, password })
  return response.data.data
}

export const signup = async fields => {
  // TODO Catch error
  const response = await api.post('/user/signup', fields)
  return response
}

export const getAllUsers = async () => {
  const { data } = await api.get('/user/')
  return data
}

export const setAccountStatus = async (userId, isEnabled) => {
  const response = await api.patch('/user/status', { userId, isEnabled })
  return response
}