import api from './'

export const getUser = async id => {
  const { data } = await api.get(`/user/${id}`)
  return data.user
}

export const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password })
  return response.data.data
}

export const signup = async fields => {
  const response = await api.post('/user/signup', fields)
  return response
}

export const getAllUsers = async () => {
  const { data } = await api.get('/user')
  return data.users
}

export const setAccountStatus = async (userId, isEnabled) => {
  const response = await api.patch('/user/status', { userId, isEnabled })
  return response
}

export const deleteUser = async userId => {
  const response = await api.delete(`user/${userId}`)
  return response
}
