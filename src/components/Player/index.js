import React from 'react'
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

  const currentSong = {
    al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
    name: "木偶人",
    ar: [{ name: "薛之谦" }]
  }

  return (
    <div>
      <MiniPlayer song={currentSong} fullScreen={fullScreen} togglePlayer={togglePlayer}></MiniPlayer>
      <NormalPlayer song={currentSong} fullScreen={fullScreen} togglePlayer={togglePlayer}></NormalPlayer>
    </div>
  )
}
