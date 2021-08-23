const env = 'development'

const config = {
  development: {
    baseURL: 'http://localhost:3000',
    apiAddress: 'http://localhost:3001/api',
  }
}

export default config[env]
