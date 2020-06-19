import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home/Home'
import List from '../pages/List/List'

Vue.use(Router)

export default new Router({
    routers: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },{
            path: '/list',
            name: 'List',
            component: List
        }
    ]
})