import MusicNote from 'components/MusicNote'
import React, { memo, useRef } from 'react'
import styled from 'styled-components'
import './style.scss'
const Btn = styled.span`
  padding: 0 20px;
`
const SongList = React.forwardRef((props, ref) => {
  const { songs, handleClick, handleChangeSong } = props
  const noteRef = useRef(null)

  const onClick = (e, item, index) => {
    e.stopPropagation();
    noteRef.current.startAnimate({
      x: e.pageX,
      y: e.pageY,
    })
    handleChangeSong(item, index)
  }
  return (
    <div ref={ref}>
      {
        songs.map((item, index) => {
          return (
            <div className='pl-item' key={item.id} onClick={(e) => handleClick(item.id)}>
              <div className='pl-item-num'>{index + 1}</div>
              <div className='pl-item-info'>
                <div className='pl-item-name'>{item.name}</div>
                <div className='pl-item-album'>
                  {item.ar[0]?.name} - {item.al?.name}
                </div>
              </div>
              <Btn onClick={(e) => onClick(e, item, index)}>播</Btn>
            </div>
          )
        })
      }
      <MusicNote ref={noteRef}></MusicNote>
    </div>
  )
})


export default memo(SongList)