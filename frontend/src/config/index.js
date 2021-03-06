const env = process.env.REACT_APP_BUILD_ENV || 'development'

const config = {
  development: {
    baseURL: 'http://localhost:3000',
    apiAddress: 'http://localhost:9191/api',
  },
  production: {
    baseURL: 'https://develop.d1byy9xadzuk7b.amplifyapp.com',
    apiAddress: 'https://cors-everywhere.herokuapp.com/http://54.252.129.50:9191/api'
  }
}

export default config[env]
