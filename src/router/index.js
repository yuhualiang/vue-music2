import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'components/rank/Rank'
import Singer from 'components/singer/Singer'
import SingerDetail from 'components/singer-detail/singer-detail'
import Search from 'components/search/Search'
import Recommend from 'components/recommend/Recommend'
import Disc from 'components/disc/disc'

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
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    }
  ]
})
