import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home'
import record from '@/page/record'
import standard from '@/page/standard'
import personage from '@/page/personage'
import giftlist from '@/page/giftlist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta:{index:0},
      component: home,
    },
    {
      path: '/giftlist',
      name: 'giftlist',
      meta:{index:1},
      component: giftlist
    },
    {
      path: '/record',
      name: 'record',
      meta:{index:2},
      component: record
    },
    {
      path: '/standard',
      name: 'standard',
      meta:{index:3},
      component: standard
    },
    {
      path: '/personage/:id',
      name: 'personage',
      meta:{index:4},
      component: personage
    }
  ]
}) 