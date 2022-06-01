import React from 'react'

export default function SwiperInner(props) {
  const { url } = props

  return (
    <div>
      <img src={url} alt='banner'></img>
    </div>
  )
}
