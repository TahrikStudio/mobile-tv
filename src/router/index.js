import Vue from 'vue'
import Router from 'vue-router'
import Menu from '@/components/Menu'
import Category from '@/components/Category'
import Channel from '@/components/Channel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/category/:categoryId',
      name: 'Category',
      component: Category
    },
    {
      path: '/category/:categoryId/channel/:channelId',
      name: 'Channel',
      component: Channel
    }
  ]
})
