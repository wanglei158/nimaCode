import Vue from 'vue'
import Router from 'vue-router'
import Aside from '@/components/aside'

import Index from '@/view/home';

import Login from '@/view/login';

import ChangePwd from '@/view/info/change_pwd';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Index,
      children:[
        {
          path:'/info',
          name:'基本信息',
          redirect:'/info/changepwd',
          component:ChangePwd,
          children:[
            {
              path:'/info/changepwd',
              name:'修改密码',
              component:ChangePwd
            }
          ]
        }
      ]
    },
    {
      path:'/login',
      name:'',
      component:Login
    }
  ]
})
