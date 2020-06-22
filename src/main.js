import Vue from 'vue'
import App from './App.vue'
import Router from '@/router'
import './assets/styles/reset.css'
import './assets/styles/border.css'
import FastClick from 'fastclick'
import './assets/styles/iconfont.css'

Vue.config.productionTip = false
FastClick.attach(document.body);

new Vue({
  Router,
  render: h => h(App),
}).$mount('#app')
