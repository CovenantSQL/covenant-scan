import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import CQL from 'cql.js'

import './registerServiceWorker'

import ProgressBar from '@/components/ProgressBar.vue'
// global progress bar
const bar = (Vue.prototype.$bar = new Vue(ProgressBar).$mount())
document.body.appendChild(bar.$el)

// global cql
const BP_ENDPOINT = 'ws://bp00.cn.gridb.io:15150'
const cql = (Vue.prototype.$cql = new CQL(BP_ENDPOINT))
cql.connect()

Vue.config.productionTip = false
Vue.use(Antd)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
