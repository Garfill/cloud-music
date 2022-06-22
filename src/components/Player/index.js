import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPlayer } from 'store/player'
import MiniPlayer from './MiniPlayer'
import NormalPlayer from './NormalPlayer'

export default function Player(props) {
  const fullScreen = useSelector(state => state.player.fullScreen)
  const dispatch = useDispatch()
  const togglePlayer = () => {
    dispatch(setPlayer({
      fullScreen: !fullScreen
    }))
  }

  const currentSong = useSelector(state => state.player.currentSong)
  const audioRef = useRef(null)

  return (
    <div>
      <MiniPlayer song={currentSong} fullScreen={fullScreen} togglePlayer={togglePlayer}></MiniPlayer>
      <NormalPlayer song={currentSong} fullScreen={fullScreen} togglePlayer={togglePlayer}></NormalPlayer>
      <audio ref={audioRef}></audio>
    </div>
  )
}
