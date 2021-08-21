require('./bootstrap')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from './vuetify'
import './http'
import '@mdi/font/css/materialdesignicons.css'

const app = new Vue({
  router,
  vuetify: Vuetify,
  render: (h) => h(App),
}).$mount('#app')
