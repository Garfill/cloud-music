import React, { useEffect, useRef, useState } from 'react'
import { setStyle } from 'utils'
import SwiperInner from './Inner'
import './style.scss'

let timer = null

export default function Swiper(props) {
  const { banner, duration = 5000 } = props

  const [active, setActive] = useState(0)
  const swiperRef = useRef(null)

  function changeItemTransition() {
    let el = swiperRef.current;
    el.style.transition = 'opacity 1.5s ease-out'
    setStyle(el, 'opacity', 0)

    setTimeout(() => {
      el.style.transition = 'none 0s ease'
      setStyle(el, 'opacity', 1)
    }, 1500);
  }

  function run(index) {
    changeItemTransition()

    let nextIndex = (index + 1) % banner.length
    setTimeout(() => {
      setActive(nextIndex)
    }, 700);
  }

  useEffect(() => {
    timer = setTimeout(() => {
      run(active)
    }, duration);

    return () => {
      clearTimeout(timer)
    }
  }, [active])

  

  return (
    <div className='swiper-container'>
      <div ref={swiperRef} className='swiper-item-container'>
        <SwiperInner
          url={banner[active]}
        ></SwiperInner>
      </div>
      <div className='swiper-indicator-container'>
        {
          banner.map((item, index) => {
            return <div key={index} className={`swiper-indicator-item ${index == active ? 'active' : ''}`}></div>
          })
        }
      </div>
    </div>
  )
}
