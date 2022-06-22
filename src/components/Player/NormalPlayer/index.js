import ProgressBar from 'components/ProgressBar';
import React, { memo, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group';
import { isEmptyObj } from 'utils';
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
  const { song, fullScreen, togglePlayer, playing, currentTime, duration } = props;
  const { clickPlay, onProgressChange } = props;

  const handleClick = (e) => {
    e.stopPropagation();
    clickPlay(!playing)
  }

  const formatTime = (time) => {
    time = time | 0;
    const minute = (time / 60) | 0;
    const second = (time % 60).toString().padStart(2, '0')
    return `${minute}:${second}`
  }  
  return (
    <>
      {
        isEmptyObj(song) ? null : 
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
                      className={`image play ${playing ? "" : "pause"}`}
                    src={song.al.picUrl + "?param=400x400"}
                    alt=""
                  />
                </div>
              </CDWrapper>
            </Middle>
            <Bottom className="bottom">
              <div className='progress-bar-box'>
                <span className="time time-l">{ formatTime(currentTime)}</span>
                <div className='progress-bar'>
                  <ProgressBar percentChange={onProgressChange} percent={props.percent}></ProgressBar>
                </div>
                <div className="time time-r">{ formatTime(duration) }</div>
              </div>
              <Operators>
                <div className="icon i-left" >
                  <i className="iconfont">圈</i>
                </div>
                <div className="icon i-left">
                  <i className="iconfont">上</i>
                </div>
                <div className="icon i-center" onClick={handleClick}>
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
      }
    </>
  );
}

export default memo(NormalPlayer);