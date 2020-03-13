import Vue from 'vue'
import Router from 'vue-router'
import Menu from '@/components/Menu'
import Category from '@/components/Category'
import Channel from '@/components/Channel'
import Update from '@/components/Update'
import Videos from '@/components/Videos'
import Viewership from '@/components/Viewership'

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
      path: '/category/:categoryId/channel/:channelId/:fromRank?',
      name: 'Channel',
      component: Channel
    },
    {
      path: '/videos/:categoryId/:channelId/:live?',
      name: 'Videos',
      component: Videos
    },
    {
      path: '/update',
      name: 'Update',
      component: Update
    },
    {
      path: '/viewership/:categoryId',
      name: 'Viewership',
      component: Viewership
    }
  ]
})
