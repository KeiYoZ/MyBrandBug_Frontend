// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app'
import router from './router'
import store from './store'
import Vuebar from 'vuebar'
import es6Promise from 'es6-promise'
import axios from 'axios'
import VueMq from 'vue-mq'
import SocialSharing from 'vue-social-sharing'

const ENV = 'live'
const baseURL = ENV === 'local' ? 'http://beezymail.com/mybrandbug' : 'http://mybrandbug.com/mybrandbug'
axios.defaults.baseURL = baseURL

es6Promise.polyfill()

Vue.use(SocialSharing)
Vue.use(Vuebar)
Vue.use(VueMq, {
  breakpoints: {
    mobile: 720,
    tablet: 1024,
    laptop: 1366,
    desktop: Infinity
  }
})
Vue.config.productionTip = false

window.Event = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
