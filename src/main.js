// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入路由
import router from './router'

// 引入axios
import axios from 'axios'
import qs from 'qs'
import VueAxios from 'vue-axios'

// 引入store.js 管理状态
import store from './store'
// 引入组件
import {
  Loading,
  Message
} from 'element-ui';

// 把qs缀在vue的原型链上
Vue.prototype.qs = qs.stringify;

// 使用
Vue.use(VueAxios, axios)

// 创建loading变量，给后面的实例使用
let loadingInstance;

// 设置默认的请求超时时间
axios.defaults.timeout = 200000;

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  //判断是否存在token，如果存在将每个页面header都添加token
  if (store.state.token) {
    config.headers.common['authorization'] = store.state.token
  }
  loadingInstance = Loading.service({});
  Loading.service({})
  return config;
}, error => {
  loadingInstance.close()
  Message({
    message: '错误+error.message',
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
});

// http response 拦截器,把返回值做修改
axios.interceptors.response.use(
  response => {
    // 请求成功,关闭loading
    loadingInstance.close()
    return response;
  },
  error => {
    // 请求未成功，报错关闭loading
    loadingInstance.close();
    // 请求已发出，但服务器响应的状态码不在2XX的范围内
    if (error.response) {
      console.log(error.response)
      Message({
        message: error.response.data.detail + '请重新登录',
        type: 'error',
        duration: 2000,
        onClose: function () {
          console.log(error.response.status)

          // 401为权限问题，直接跳转到登录页面
          switch (error.response.status) {
            // 401，需要用户验证
            case 401:
              store.commit('del_token'); // 401时，没有用户权限，删除session token,给store 删除token状态
              router.replace({
                path: '/login',
                query: {
                  redirect: router.currentRoute.fullPath
                } //登录成功后跳入浏览的当前页面
              })
              // 登录超时
            case 400:
            store.commit('del_token'); // 401时，没有用户权限，删除session token,给store 删除token状态
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              } //登录成功后跳入浏览的当前页面
            })
          }
        }
      });
    }
    // 在设置引发的错误请求时发生了一些事情，没有请求到数据库，直接浏览器返回
    else {
      if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1) {
        console.log('请求超时');
        Message({
          message: '请求超时,请重新请求',
          type: 'error',
          duration: 2000,
        });
      }
    }
    // 对响应的错误做点什么
    return Promise.reject(error);
  });


// 来关闭生产模式下给出的提示
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
