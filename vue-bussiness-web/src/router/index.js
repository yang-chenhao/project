import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/page/index'
import DetailPage from '@/page/detail'
import OrderListPage from '@/page/orderList'
import DetailAnaPage from '@/page/detail/analysis'
import DetailCouPage from '@/page/detail/count'
import DetailForPage from '@/page/detail/forecast'
import DetailPubPage from '@/page/detail/publish'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: OrderListPage
    },
    {
      path: '/detail',
      name: 'DetailPage',
      component: DetailPage,
      redirect: '/detail/analysis',
      children: [
        {
          path: 'forecast',
          component: DetailForPage
        },
        {
          path: 'analysis',
          component: DetailAnaPage
        },
        {
          path: 'count',
          component: DetailCouPage
        },
        {
          path: 'publish',
          component: DetailPubPage
        },
      ]
    }
  ]
})
