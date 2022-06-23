import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlayer } from 'store/player'
import MiniPlayer from './MiniPlayer'
import NormalPlayer from './NormalPlayer'

import { getSongUrl } from 'api/song'
import { isEmptyObj } from 'utils'

export default function Player(props) {
  const fullScreen = useSelector(state => state.player.fullScreen)
  const currentSong = useSelector(state => state.player.currentSong)
  const playing = useSelector(state => state.player.playing)

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  const dispatch = useDispatch()
  const togglePlayer = () => {
    dispatch(setPlayer({
      fullScreen: !fullScreen
    }))
  }

  const audioRef = useRef(null)

  useEffect(() => {
    setCurrentTime(0)
    setDuration(0)
  }, [])

  const clickPlay = (isPlay) => {
    if (isEmptyObj(currentSong)) return;
    dispatch(setPlayer({
      playing: isPlay
    }))
    toggleMusic(isPlay)
  }
  const toggleMusic = (isPlay) => {
    if (isPlay) {
      try {
        setTimeout(() => {
          audioRef.current.play()
        }, 0);
      } catch {
        return
      }
    } else {
      audioRef.current.pause()
    }
    dispatch(setPlayer({
      playing: isPlay
    }))
  }

  useEffect(() => {
    if (isEmptyObj(currentSong)) return;
    clickPlay(false)
    audioRef.current.src = getSongUrl(currentSong.id)
    setCurrentTime(0)
    setDuration((currentSong.dt / 1000) | 0);
  }, [currentSong])

  const onTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime)
  }

  const onProgressChange = (per) => {
    const newTime = per * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if (!playing) {
      audioRef.current.play()
      dispatch(setPlayer({
        playing: true
      }))
    }
  }
  

  return (
    <div>
      <MiniPlayer
        song={currentSong}
        fullScreen={fullScreen}
        togglePlayer={togglePlayer}
        playing={playing}
        clickPlay={clickPlay}></MiniPlayer>
      <NormalPlayer 
        song={currentSong} 
        fullScreen={fullScreen} 
        togglePlayer={togglePlayer}
        playing={playing}
        clickPlay={clickPlay}
        currentTime={currentTime}
        duration={duration}
        onProgressChange={onProgressChange}
        percent={percent}
      ></NormalPlayer>
      <audio ref={audioRef} onTimeUpdate={onTimeUpdate}></audio>
    </div>
  )
}
