import React, { memo } from 'react'
import './style.scss'
const SongList = React.forwardRef((props, ref) => {
  const { songs, handleClick } = props
  return (
    <div ref={ref}>
      {
        songs.map((item, index) => {
          return (
            <div className='pl-item' key={item.id} onClick={() => handleClick(item.id)}>
              <div className='pl-item-num'>{index + 1}</div>
              <div className='pl-item-info'>
                <div className='pl-item-name'>{item.name}</div>
                <div className='pl-item-album'>
                  {item.ar[0]?.name} - {item.al?.name}
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
})


export default memo(SongList)