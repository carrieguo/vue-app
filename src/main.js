import Vue from 'vue'
import App from './App.vue'
import Router from '@/router'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style
//import 'swiper/css/swiper.css'
// If you use Swiper 6.0.0 or higher
import 'swiper/swiper-bundle.css'
import './assets/styles/reset.css'
import './assets/styles/border.css'
import FastClick from 'fastclick'
import './assets/styles/iconfont.css'

Vue.config.productionTip = false
FastClick.attach(document.body);
Vue.use(VueAwesomeSwiper /* { default options with global component } */)

new Vue({
  Router,
  render: h => h(App),
}).$mount('#app')
