import SvgIcon from 'components/SvgIcon'
import React from 'react'
import { Top } from './Top'

export default function Home() {
  return (
    <div>
      <Top>
        <span>
          <SvgIcon icon="menu"></SvgIcon>
        </span>
        <span className="title">WebApp</span>
        <span>
          <SvgIcon icon="search"></SvgIcon>
        </span>
      </Top>
    </div>
  )
}
