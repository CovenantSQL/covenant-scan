import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    runningStatus: {
      block_height: 182414,
      count_accounts: 103,
      count_databases: 9124,
      qps: 10241,
    },
  },
  mutations: {},
  actions: {},
})
