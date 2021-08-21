import http from './http'

export default {
  login(user, pass) {
    return http.post('/auth/login', {
      name: user,
      password: pass,
    })
  },
}
