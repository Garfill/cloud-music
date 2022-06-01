import React from 'react'
import SvgIcon from 'components/SvgIcon'
import { Top } from './Top'
import TabMenu from './Top'
import routes from 'router'
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";


export default function Layout() {
  return (
    <>
      {/* 顶部菜单栏 */ }
      < Top >
          <span>
            <SvgIcon icon="menu"></SvgIcon>
          </span>
          <span className="title">WebApp</span>
          <span>
            <SvgIcon icon="search"></SvgIcon>
          </span>
      </Top >

      <TabMenu />

      {/* 内容路由区域 */ }
      <Routes>
        {
          routes.map((route, index) => (
            <Route
              path={route.path}
              key={index}
              element={
                <Suspense fallback="...loading...">
                  <route.component />
                </Suspense>
              }>
              {
                route.children && route.children.map((child) => (
                  <Route 
                    key={child.path} 
                    path={child.path} 
                    element={
                      <Suspense fallback="...loading...">
                        <child.component />
                      </Suspense>
                    }></Route>
                ))
              }
            </Route>
          ))
        }
      </Routes>
    </>
  )
}
