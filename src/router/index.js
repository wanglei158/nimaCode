import Vue from 'vue'
import Router from 'vue-router'
import Aside from '@/components/aside'

import Index from '@/view/home';

import Login from '@/view/login';

import I_Index from '@/view/info'
import BaseInfo from '@/view/info/baseInfo';
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
          name:'基础信息',
          redirect:'/info/base',
          component:I_Index,
          children:[
            {
              path:'/info/base',
              name:'商家信息',
              component:BaseInfo
            },
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
