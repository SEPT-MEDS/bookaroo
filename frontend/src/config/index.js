const env = window.process.env.NODE_ENV

const config = {
  development: {
    baseURL: 'http://localhost:3000',
    apiAddress: 'http://localhost:9191/api',
  },
  production: {
    baseURL: 'http://localhost:3000',
    apiAddress: 'http://localhost:9191/api',
  }
}

export default config[env]
