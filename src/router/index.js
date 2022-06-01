import { lazy } from 'react'

const wrap = (Component) => {
  return lazy(() => import(/* webpackChunkName: 'contant-route' */ `view/${Component}`))
}

const routes = [
  {
    path: '/',
    component: wrap('Home'),
    children: [
      {
        path: 'singer',
        component: wrap('Singer'),
      },
      {
        path: 'recommend',
        component: wrap('Recommend'),
      },
      {
        path: 'rank',
        component: wrap('Rank'),
      },
      {
        path: '*',
        component: wrap('NotFound'),
      }
    ]
  },
]

export default routes