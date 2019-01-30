import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'

import './registerServiceWorker'

import ProgressBar from '@/components/ProgressBar.vue'
// global progress bar
const bar = (Vue.prototype.$bar = new Vue(ProgressBar).$mount())
document.body.appendChild(bar.$el)

Vue.config.productionTip = false
Vue.use(Antd)

router.onReady(() => {
  router.beforeResolve((to: any, from: any, next: any) => {
    bar.start()
    next()
    bar.finish()
  })
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
