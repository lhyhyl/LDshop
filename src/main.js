/*
入口JS
* */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {Button} from 'mint-ui'

import VueLazyLoad from 'vue-lazyload'
import loading from './common/imgs/loading.gif'

import './filters'
import './mock/mockServer'//加载mockServer即可
//注册全局标签
Vue.component(Button.name,Button)
Vue.use(VueLazyLoad,{
  loading
})
new Vue({
  el:'#app',
  render:h => h(App),
  router,
  store
})
