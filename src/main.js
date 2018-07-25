// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入axios
import axios from 'axios'
import qs from 'qs'
import VueAxios from 'vue-axios'

// 引入store.js 管理状态
import store from './store'


// 把qs缀在vue的原型链上
Vue.prototype.qs = qs.stringify;


// 使用
Vue.use(VueAxios, axios)


// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  //判断是否存在token，如果存在将每个页面header都添加token
  if (store.state.token) {
    config.headers.common['authorization'] = store.state.token
  }
  return config;
},);

// http response 拦截器,把返回值做修改
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      // 401为权限问题，直接跳转到登录页面
      switch (error.response.status) {
        case 401:
        console.log(store);
          store.commit('del_token'); // 401时，没有用户权限，删除session token,给store 删除token状态
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            } //登录成功后跳入浏览的当前页面
          })
      }
    }
    return Promise.reject(error.response.data)
  });
// 设置axios的默认请求头
// axios.defaults.headers.common['authorization'] = store.state.token;


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 引入router
  router,
  // 引入store组件
  store,
  // 引入主要组件'app'
  components: {
    App
  },
  template: '<App/>'
})
