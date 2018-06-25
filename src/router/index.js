import Vue from 'vue'
import Router from 'vue-router'
import Aside from '@/components/aside'

import Index from '@/view/home';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Index
    }
  ]
})
