// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import preventClick from './utils/clickStatefrom'  // 根据自己的路径
import router from './router'

import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(router)
Vue.use(preventClick)

/* eslint-disable no-new */
// axios.defaults.baseURL = '/api'
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
