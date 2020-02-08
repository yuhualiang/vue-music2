import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'components/rank/Rank'
import Singer from 'components/singer/Singer'
import Search from 'components/search/Search'
import Recommend from 'components/recommend/Recommend'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: Singer
    }
  ]
})
