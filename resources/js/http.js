import Axios from 'axios'
import session from './session'

const token = session.getToken()

const config = {
  baseURL: process.env.MIX_API_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
}

const http = Axios.create(config)

http.interceptors.request.use(
  function (config) {
    console.log('Request ', config)

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
