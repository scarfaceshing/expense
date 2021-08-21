import http from '../js/http'
import Cookie from 'universal-cookie'
const cookie = new Cookie()

export default {
  setToken(token) {
    cookie.set('token', token, { path: '/' })
    cookie.set('auth', true, { path: '/' })
  },

  removeToken() {
    cookie.remove('token', { path: '/' })
    cookie.remove('auth', { path: '/' })
  },

  getToken() {
    return cookie.get('token', { path: '/' })
  },

  getAuth() {
    return cookie.get('auth', { path: '/' })
  },

  getSession() {
    return http.post('/auth/me', {})
  },
}
