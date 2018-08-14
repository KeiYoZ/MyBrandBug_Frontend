import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account'
import posts from './modules/posts'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    sideBarToggled: false
  },
  getters: {
    loading: state => {
      return state.loading
    },
    sideBarToggled: state => {
      return state.sideBarToggled
    }
  },
  mutations: {
    switchLoading (state) {
      state.loading = !state.loading
    },
    toggleSideBar (state) {
      state.sideBarToggled = !state.sideBarToggled
    },
    turnOffSideBar (state) {
      state.sideBarToggled = true
    },
    turnOffLoading (state) {
      state.loading = false
    }
  },
  actions: {
    switchLoading ({commit}) {
      commit('switchLoading')
    },
    toggleSideBar ({commit}) {
      commit('toggleSideBar')
    },
    turnOffSideBar ({commit}) {
      commit('turnOffSideBar')
    },
    turnOffLoading ({commit}) {
      commit('turnOffLoading')
    }
  },
  modules: {
    account,
    posts
  }
})
