import React, { useRef, useState } from 'react'
import './style.scss'

const halfBtnWidth = 4; // 以按钮中心设置距离，4是按钮宽度 / 2

export default function ProgressBar() {
  const progressBar = useRef(null)
  const progress = useRef(null)
  const progressBtn = useRef(null)
  const [touch, setTouch] = useState({});

  const setOffset = offset => {
    progress.current.style.width = offset + 'px';
    progressBtn.current.style.transform = `translate3d(${offset}px, 0, 0)`;
  }
  const handleTouchStart = e => {
    const startTouch = {};
    startTouch.init = true;
    startTouch.startX = e.touches[0].clientX;
    startTouch.leftWitdh = progress.current.clientWidth;
    setTouch(startTouch)
  }
  const handleTouchMove = e => {
    if (!touch.init) return;
    // 滑动距离
    const deltaX = e.touches[0].clientX - touch.startX;
    const maxWidth = progressBar.current.clientWidth - halfBtnWidth;
    const offsetX = Math.min(maxWidth, Math.max(0, touch.leftWitdh + deltaX));
    setOffset(offsetX);
  }
  const handleTouchEnd = e => {
    const endTouch = JSON.parse(JSON.stringify(touch));
    endTouch.init = false;
    setTouch(endTouch);
  }
  const handleClick = e => {
    const left = e.pageX - progressBar.current.getBoundingClientRect().left;
    const offset = Math.min(left, progressBar.current.clientWidth - halfBtnWidth)
    setOffset(offset)
  }
  return (
    <div className='bar-wrapper'>
      <div className="bar-inner" ref={progressBar} onClick={handleClick}>
        <div className="progress" ref={progress}></div>
        <div className="progress-btn-wrapper" ref={progressBtn}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="progress-btn"></div>
        </div>
      </div>
    </div>
  )
}
