import Vue from 'vue'
import Router from 'vue-router'
import Aside from '@/components/aside'

import Index from '@/view/home';

import Login from '@/view/login';

import I_Index from '@/view/info'
import BaseInfo from '@/view/info/baseInfo';
import ChangePwd from '@/view/info/change_pwd';

import Goods from '@/view/goods';
import AddGoods from '@/view/goods/add.vue';
import Factory from '@/view/goods/localfactory';
import store from './../store'

Vue.use(Router);

if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'))
}

const router = new Router({
  mode: 'history', // 使用历史缓存？
  routes: [{
      path: '/',
      name: '首页',
      component: Index,
      children: [{
          path: '/info',
          name: '基础信息',
          redirect: '/info/base',
          component: I_Index,
          children: [{
              path: '/info/base',
              name: '商家信息',
              component: BaseInfo
            },
            {
              path: '/info/changepwd',
              name: '修改密码',
              component: ChangePwd
            }
          ]
        },
        {
          path: '/goods',
          name: '商品管理',
          redirect: '/goods/add',
          component: Goods,
          children: [{
              path: '/goods/add',
              name: '新增商品',
              component: AddGoods
            },
            {
              path: '/goods/factory',
              name: '本地仓库商品',
              component: Factory
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: '',
      component: Login
    }
  ]
});


router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) { //这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
    if (store.state.token) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next();
  }
})

export default router;
