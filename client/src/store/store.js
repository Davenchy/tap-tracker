import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  mutations: {
    login (state, data) {
      if (!data.token || !data.user) {
        state.isUserLoggedIn = false
        return
      }

      state.token = data.token
      state.user = data.user
      state.isUserLoggedIn = true
    },
    logout (state) {
      state.token = null
      state.user = null
      state.isUserLoggedIn = false
    }
  },
  actions: {
    login ({ commit }, data) {
      commit('login', data)
    }
  }
})
