import Axios from 'axios'
import session from './session'

const config = {
  baseURL: process.env.MIX_API_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer `,
  },
}

const http = Axios.create(config)

http.interceptors.request.use(
  function (config) {
    console.log('Request ', config)

    if (config.url === '/auth/login') {
      const token = session.getToken()

      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  function (response) {
    console.log('Response ', response)

    return response
  },
  function (error) {
    return Promise.reject(error)
  },
)

export default http
