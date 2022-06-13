import React from 'react'
import SvgIcon from 'components/SvgIcon'
import { Top } from './Top'
import TabMenu from './Top'

export default function Layout(props) {
  return (
    <>
      {/* 顶部菜单栏 */}
      <Top>
        <span>
          <SvgIcon icon="menu"></SvgIcon>
        </span>
        <span className="title">WebApp</span>
        <span>
          <SvgIcon icon="search"></SvgIcon>
        </span>
      </Top>

      <TabMenu />

      {/* 内容路由区域 */}
      {
        props.children
      }

    </>
  )
}
