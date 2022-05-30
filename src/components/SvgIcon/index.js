import React from 'react'
import './style.scss'

export default function SvgIcon(props) {
  const { icon } = props
  return (
    <svg className="icon svg-icon" aria-hidden="true">
      <use xlinkHref={"#icon-" + icon}></use>
    </svg>
  )
}
