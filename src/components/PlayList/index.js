import React from 'react'
import { useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import './style.js'
import './style.scss'
import { PlayListWrapper, ScrollWrapper } from './style'
import SongList from 'components/SongList/index.js'
export default function PlayList(props) {
  const showPlayList = useSelector(state => state.player.showPlayList)
  const {playList = []} = props
  const { onBackClick } = props;
  const handleClick = (e) => {
    e.stopPropagation()
    if(e.target.matches('.list-box')) {
      onBackClick && onBackClick()
    }
  }
  return (
    <CSSTransition
      in={showPlayList}
      appear
      timeout={300}
      mountOnEnter
      classNames="rise-up"
    >
      <PlayListWrapper className='list-box' onClick={handleClick}>
        <div className="list-wrapper">
          <ScrollWrapper>
            <SongList songs={playList}></SongList>
          </ScrollWrapper>
        </div>
      </PlayListWrapper>
    </CSSTransition>
  )
}
