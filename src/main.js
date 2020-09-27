// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'lib-flexible/flexible.js'
import router from './router'
import axios from "axios";
import * as custom from './utils/filters' // 引入我们刚刚创建的文件

import { NavBar } from 'vant';
import { Tab, Tabs } from 'vant'
import { Lazyload } from 'vant'
import { Tabbar, TabbarItem } from 'vant';
import { Image as VanImage } from 'vant';
 
import { List } from 'vant';
import { Notify } from 'vant';
import { Toast } from 'vant';
import { Empty } from 'vant';
import { PullRefresh } from 'vant';
import { Sticky } from 'vant';

Vue.config.productionTip = false
Object.keys(custom).forEach(key => { Vue.filter(key, custom[key])})
Vue.use(NavBar);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Lazyload);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(VanImage);
 
Vue.use(List);
Vue.use(Notify);
Vue.use(Toast);
Vue.use(Empty);
Vue.use(PullRefresh);
Vue.use(Sticky);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})
