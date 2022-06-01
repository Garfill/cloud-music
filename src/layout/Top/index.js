import styled from 'styled-components';
import { NavLink } from 'react-router-dom'
import React from 'react';

export const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px;
  background: var(--theme-color);
  &>span {
    line-height: 40px;
    color: #f1f1f1;
    font-size: 20px;
    &.iconfont {
      font-size: 25px;
    }
  }
`

export const Tab = styled.div`
  display: flex;
  justify-content: space-around;
  height: 44px;
  background: var(--theme-color);
  a {
    flex: 1;
    padding: 2px 0;
    font-size: 14px;
    color: #e4e4e4;
    &.selected {
      span {
        padding: 3px 0;
        font-weight: 700;
        color: #f1f1f1;
        border-bottom: 2px solid #f1f1f1;
      }
    }
  }
`

export const TabItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

function TabMenu() {
  let activeStyle = {
    textDecoration: "underline",
  };

  return (
    <Tab>
      <TabItem>
        <NavLink to='/recommend' style={({ isActive }) => isActive ? activeStyle : null}>
          <span>推荐</span>
        </NavLink>
      </TabItem>
      <TabItem>
        <NavLink to='/singer' style={({ isActive }) => isActive ? activeStyle : null}>
          <span>歌手</span>
        </NavLink>
      </TabItem>
      <TabItem>
        <NavLink to='/rank' style={({ isActive }) => isActive ? activeStyle : null}>
          <span>排行榜</span>
        </NavLink>
      </TabItem>
    </Tab>

  )
}

export default React.memo(TabMenu)