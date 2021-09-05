const env = process.env.REACT_APP_BUILD_ENV || 'development'

const config = {
  development: {
    baseURL: 'http://localhost:3000',
    apiAddress: 'http://localhost:9191/api',
  },
  production: {
    baseURL: 'http://develop.d1byy9xadzuk7b.amplifyapp.com',
    apiAddress: 'http://13.238.218.243:9191/api'
  }
}

export default config[env]
