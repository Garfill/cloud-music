import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getHotSong, getSinger } from 'api/singer'
import './style.scss'
import SongList from 'components/SongList'
import Scroll from 'components/Scroll'

export default function Singer(props) {
  const { id } = useParams()
  const [singer, setSinger] = useState({})
  const [hotSong, setHotSong] = useState([])
  async function getSingerData(id) {
    const [{ data }, { songs }] = await Promise.all([
      getSinger(id),
      getHotSong(id)
    ])
    setSinger(data)
    setHotSong(songs)
  }

  const scrollRef = useRef()
  const songScrollRef = useRef()
  const imgRef = useRef()
  const initHeight = useRef()

  useEffect(() => {
    getSingerData(id).then(() => {
      const h = imgRef.current.offsetHeight;
      scrollRef.current.style.top = h + 'px';
      initHeight.current = h;
      songScrollRef.current.refresh();
    })
  }, [])


  const handleScroll = (pos) => {
    const { y } = pos;
    const percent = Math.abs(y / initHeight.current);
    const imageDOM = imgRef.current;
    const minScrollY = -initHeight.current;

    if (y > 0) {
      imageDOM.style['transform'] = `scale(${1 + percent})`;
    } else if (y >= minScrollY) {
      imageDOM.style.paddingBottom = "83%";
      imageDOM.style.height = 0;
      imageDOM.style.zIndex = -1;

      scrollRef.current.style.top = initHeight.current - Math.abs(y) + 'px';
    } else if (y < minScrollY) {
      imageDOM.style.paddingBottom = 0;
      imageDOM.style.zIndex = 99;
    }
  }

  return (
    <div>
      <div className='singer-hd' ref={imgRef}>
        <img src={singer.artist?.cover}></img>
      </div>
      <div className='singer-hot-song' ref={scrollRef}>
        <Scroll ref={songScrollRef} onScroll={handleScroll}>
          <SongList songs={hotSong}></SongList>
        </Scroll>
      </div>
    </div>
  )
}
