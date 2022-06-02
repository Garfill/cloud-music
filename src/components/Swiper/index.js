import React, { useEffect, useState } from 'react'
import './swiper.scss'

export default function Swiper(props) {
  const { duration = 5000, children, activeClass = 'active', activeDotClass = 'active' } = props

  const [active, setActive] = useState(0)
  const [timer, setTimer] = useState(null)

  function run(index) {
    let timerId = setTimeout(() => {
      setActive((index + 1) % children.length)
    }, duration);
    setTimer(timerId)
  }

  useEffect(() => {
    run(active)
    return () => { clearTimeout(timer) }
  }, [active])

  return (
    <div className='swiper-container'>
      <div className='swiper-banner-container'>
        {
          children.map((child, index) => (
            <div className={`swiper-item-container ${active === index ? activeClass : ''}`} key={index}>
              {child}
            </div>
          ))
        }
      </div>
      <div className='swiper-indicator-container'>
        {
          children.map((item, index) => {
            return <div key={index} className={`swiper-indicator-item ${index == active ? activeDotClass : ''}`}></div>
          })
        }
      </div>
    </div>
  )
}
