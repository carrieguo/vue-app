import Vue from 'vue'
import App from './App.vue'
import Router from '@/router'
import './assets/styles/H-ui.reset.css'
import './assets/styles/border.css'
import FastClick from 'fastclick'

Vue.config.productionTip = false
FastClick.attach(document.body);

new Vue({
  Router,
  render: h => h(App),
}).$mount('#app')
