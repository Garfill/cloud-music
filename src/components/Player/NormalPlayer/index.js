import ProgressBar from 'components/ProgressBar';
import React, { memo } from 'react'
import { CSSTransition } from 'react-transition-group';
import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
} from "./style";
import './style.scss'

function NormalPlayer(props) {
  const { song, fullScreen, togglePlayer } = props;
  return (
    <CSSTransition
      classNames="normal"
      in={fullScreen}
      timeout={500}
      mountOnEnter
      unmountOnExit
    >
      <NormalPlayerContainer>
        <div className="background">
          <img
            src={song.al.picUrl + "?param=300x300"}
            width="100%"
            height="100%"
            alt="歌曲图片"
          />
        </div>
        <div className="background layer"></div>
        <Top className="top">
          <div className="back">
            <i className="iconfont icon-back" onClick={togglePlayer}>&lt;</i>
          </div>
          <h1 className="title">{song.name}</h1>
          <h1 className="subtitle">{song.ar[0]?.name}</h1>
        </Top>
        <Middle>
          <CDWrapper className='cd-wrapper'>
            <div className="cd">
              <img
                className="image"
                src={song.al.picUrl + "?param=400x400"}
                alt=""
              />
            </div>
          </CDWrapper>
        </Middle>
        <Bottom className="bottom">
          <div className='progress-bar-box'>
            <span className="time time-l">0:00</span>
            <div className='progress-bar'>
              <ProgressBar></ProgressBar>
            </div>
            <div className="time time-r">4:17</div>
          </div>
          <Operators>
            <div className="icon i-left" >
              <i className="iconfont">圈</i>
            </div>
            <div className="icon i-left">
              <i className="iconfont">上</i>
            </div>
            <div className="icon i-center">
              <i className="iconfont">播</i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">下</i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">待</i>
            </div>
          </Operators>
        </Bottom>
      </NormalPlayerContainer>
    </CSSTransition>
  );
}

export default memo(NormalPlayer);