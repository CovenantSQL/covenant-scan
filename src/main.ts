import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import ProgressBar from '@/components/ProgressBar.vue'
// global progress bar
const bar = (Vue.prototype.$bar = new Vue(ProgressBar).$mount())
document.body.appendChild(bar.$el)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
