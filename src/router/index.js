import { lazy } from 'react'
import { Route, Navigate } from "react-router-dom";
import { Suspense } from "react";

const wrap = (Component) => {
  return lazy(() => import(/* webpackChunkName: 'contant-route' */ `view/${Component}`))
}

const routes = [
  {
    path: '/',
    component: wrap('Home'),
    children: [
      {
        path: '',
        redirect: true,
        to: '/recommend',
      },
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
    ],
  },
  {
    path: '/album/:id',
    component: wrap('Album'),
  },
  {
    path: '/rank/:id',
    component: wrap('Album'),
  }

]

export default routes

export function renderRoutes(routes) {
  return (
    <>
      {
        routes.map((route, index) => (
          <Route
            path={route.path}
            key={index}
            element={
              <Suspense fallback="...loading...">
                {
                  route.component
                    ? <route.component />
                    : <Navigate to={route.to} replace></Navigate>
                }
              </Suspense>
            }>
            {
              route.children ? renderRoutes(route.children) : null
            }
          </Route>
        ))
      }
    </>
  )
}
