import api from './'

export const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password })
  return response.data.data
}

export const signup = async fields => {
  const response = await api.post('/user/signup', fields)
  console.log('Response ' + response)
  console.log(JSON.stringify(response))
  return response.data
}
