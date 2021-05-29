// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueGoogleCharts from 'vue-google-charts'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueGoogleCharts)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
