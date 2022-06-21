import React, { memo } from 'react'
import { CSSTransition } from 'react-transition-group';
import './style.scss'


function MiniPlayer(props) {
  const { song, fullScreen, togglePlayer } = props;
  return (
    <CSSTransition
      in={!fullScreen}
      timeout={500}
      classNames="mini"
      unmountOnExit
      mountOnEnter
      appear={true}
    >
      <div className='mini-player-container' onClick={togglePlayer}>
        <div className="icon">
          <div className="imgWrapper">
            <img src={song.al.picUrl} width="40" height="40" alt="img" />
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{song.ar[0]?.name}</p>
        </div>
        <div className="control">
          <span className="iconfont">播</span>
        </div>
        <div className="control">
          <span className="iconfont">下</span>
        </div>
      </div>
    </CSSTransition>
  )
}

export default memo(MiniPlayer)