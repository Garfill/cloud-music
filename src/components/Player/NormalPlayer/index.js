import ProgressBar from 'components/ProgressBar';
import React, { createRef, memo, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import { isEmptyObj } from 'utils';
import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
  LyricContainer,
} from "./style";
import './style.scss'

function NormalPlayer(props) {
  const { song, fullScreen, togglePlayer, playing, currentTime, duration } = props;
  const { clickPlay, onProgressChange, openList, onChangeSong } = props;
  const { lyric, currentLine } = props;

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

  const currentView = useRef('lyric')
  const linesRefs = useRef([])
  const lyricRef = useRef(null)

  useEffect(() => {
    if (!lyric || !fullScreen) return;
    let top = linesRefs.current[currentLine].current.offsetTop
    lyricRef.current.style['transform'] = 'translate(0, ' + -top + 'px)'
  }, [currentLine, fullScreen])
  

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
          <NormalPlayerContainer className='fullscreen-player'>
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
            <Middle className='middle'>
              <CSSTransition
                in={currentView.current == 'cd'}
                timeout={400}
                classNames="fade"
                appear={true}
              >
                  <CDWrapper className={'cd-wrapper ' + (currentView.current == 'cd' ? 'visible-view' : 'hidden-view')}>
                  <div className="cd">
                    <img
                      className={`image play ${playing ? "" : "pause"}`}
                      src={song.al.picUrl + "?param=400x400"}
                      alt=""
                    />
                  </div>
                </CDWrapper>
              </CSSTransition>
              <CSSTransition
                in={currentView.current == 'lyric'}
                timeout={400}
                classNames="fade"
                appear={true}
              >
                {
                  lyric ? 
                    <LyricContainer ref={lyricRef} className={'lyric-container ' + (currentView.current == 'lyric' ? 'visible-view' : 'hidden-view')}>
                      {
                        lyric.lines.map((line, index) => {
                          let ref = createRef()
                          linesRefs.current[index] = ref
                          return (
                            <div ref={ref} className={`lyric-item ${index == currentLine ? 'active' : ''}`} key={index + '-' + line.time}>{ line.txt }</div>
                          )
                        })
                      }
                    </LyricContainer>
                  : <p className="text pure"> 纯音乐，请欣赏。</p>
                }
              </CSSTransition>
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
                <div className="icon i-left" onClick={() => onChangeSong(-1)}>
                  <i className="iconfont">上</i>
                </div>
                <div className="icon i-center" onClick={handleClick}>
                  <i className="iconfont">播</i>
                </div>
                <div className="icon i-right" onClick={() => onChangeSong(1)}>
                  <i className="iconfont">下</i>
                </div>
                <div className="icon i-right" onClick={openList}>
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