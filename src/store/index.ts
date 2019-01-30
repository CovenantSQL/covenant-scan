import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import bp from './bp'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    bp,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})
