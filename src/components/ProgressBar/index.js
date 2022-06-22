import React, { useRef, useState } from 'react'
import './style.scss'

export default function ProgressBar(props) {
  const { percentChange } = props;
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
    const maxWidth = progressBar.current.clientWidth;
    const offsetX = Math.min(maxWidth, Math.max(0, touch.leftWitdh + deltaX));
    setOffset(offsetX);
  }
  const handleTouchEnd = e => {
    const endTouch = JSON.parse(JSON.stringify(touch));
    endTouch.init = false;
    setTouch(endTouch);

    _changePercent(progress.current.clientWidth / progressBar.current.clientWidth)
  }
  const handleClick = e => {
    const left = e.pageX - progressBar.current.getBoundingClientRect().left;
    const offset = Math.min(left, progressBar.current.clientWidth)
    setOffset(offset)

    _changePercent(progress.current.clientWidth / progressBar.current.clientWidth)
  }

  const _changePercent = (percent) => {
    if (percentChange) {
      percentChange(percent)
    }
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
