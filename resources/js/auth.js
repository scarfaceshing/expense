import http from './http'

export default {
  login(user, pass) {
    return http.post('/auth/login', {
      name: user,
      password: pass,
    })
  },
  logout() {
    return http.post('/auth/logout', {})
  },
}
