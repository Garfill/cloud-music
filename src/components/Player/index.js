import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlayer } from 'store/player'
import MiniPlayer from './MiniPlayer'
import NormalPlayer from './NormalPlayer'

import { getLyric, getSongUrl } from 'api/song'
import { isEmptyObj, throttle } from 'utils'
import PlayList from 'components/PlayList'
import Lyric from 'components/Lyric'

export default function Player(props) {
  const fullScreen = useSelector(state => state.player.fullScreen)
  const currentSong = useSelector(state => state.player.currentSong)
  const currentIndex = useSelector(state => state.player.currentIndex)
  const playing = useSelector(state => state.player.playing)
  const showList = useSelector(state => state.player.showPlayList)
  const dispatch = useDispatch()

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;
  const audioRef = useRef(null)

  const togglePlayer = () => {
    dispatch(setPlayer({
      fullScreen: !fullScreen
    }))
  }

  const clickPlay = (isPlay) => {
    if (isEmptyObj(currentSong)) return;
    let currentTime = (audioRef.current.currentTime * 1000) | 0
    toggleMusic(isPlay)
    if (lyricRef.current) {
      lyricRef.current.togglePlay(currentTime)
    }
  }
  const toggleMusic = (isPlay) => {
    if (isPlay) {
      audioRef.current.play().then(() => {
        dispatch(setPlayer({
          playing: isPlay
        }))
      })
    } else {
      audioRef.current.pause()
      dispatch(setPlayer({
        playing: isPlay
      }))
    }
  }

  const playList = useSelector(state => state.player.playList)
  const findIndexOfList = (song) => {
    return playList.findIndex(item => song.id == item.id)
  }

  const lyricRef = useRef(null)
  const currentLine = useRef(0)
  const [playingLyric, setPlayingLyric] = useState('')
  const handleLyric = ({ txt, lineNum }) => {
    if (!lyricRef.current) return;
    currentLine.current = lineNum;
    setPlayingLyric(txt)
  }
  const getLyricData = async (id) => {
    const { lrc: { lyric } } = await getLyric(id)
    if (!lyric) {
      lyricRef.current = null
      return;
    }
    lyricRef.current = new Lyric(lyric, handleLyric);
    lyricRef.current.reset();
    lyric.current.stop();
    currentLine.current = 0;
    return lyric
  }

  useEffect(() => {
    if (isEmptyObj(currentSong)) {
      setCurrentTime(0)
      setDuration(0)
      return;
    };
    // 歌词
    getLyricData(currentSong.id)
    // 音源
    clickPlay(false)
    audioRef.current.src = getSongUrl(currentSong.id)
    setCurrentTime(0)
    setDuration((currentSong.dt / 1000) | 0);
    // 设置标识位
    let index = findIndexOfList(currentSong)
    dispatch(setPlayer({
      currentIndex: index
    }))

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
    if (lyricRef.current) {
      lyricRef.current.seek(newTime * 1000)
    }
  }

  const togglePlayList = () => {
    dispatch(setPlayer({
      showPlayList: !showList,
    }))
  }
  
  /**
   * 
   * @param {number} type 切换前后，1是下一首，-1是前一首
   */
  const changeSong = (type) => {
    let next
    if (currentIndex == -1) {
      // 不属于该列表的歌曲
      next = 0
    } else {
      if (type == 1) {
        next = currentIndex + 1 > playList.length ? 0 : currentIndex + 1 ;
      } else {
        next = currentIndex == 0 ? playList.length - 1 : currentIndex - 1;
      }
    }

    dispatch(setPlayer({
      currentSong: playList[next]
    }))
  }

  return (
    <div>
      <MiniPlayer
        song={currentSong}
        fullScreen={fullScreen}
        playing={playing}
        togglePlayer={togglePlayer}
        clickPlay={clickPlay}></MiniPlayer>
      <NormalPlayer 
        song={currentSong} 
        fullScreen={fullScreen} 
        playing={playing}
        currentTime={currentTime}
        duration={duration}
        percent={percent}
        togglePlayer={togglePlayer}
        clickPlay={clickPlay}
        onProgressChange={onProgressChange}
        openList={togglePlayList}
        onChangeSong={changeSong}
        lyric={lyricRef.current}
        playingLyric={playingLyric}
        currentLine={currentLine.current}
      ></NormalPlayer>
      <PlayList onBackClick={togglePlayList} playList={playList}></PlayList>
      <audio ref={audioRef} onTimeUpdate={onTimeUpdate}></audio>
    </div>
  )
}
