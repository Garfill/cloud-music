import React, { memo, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';


// api
import { getPlayList } from 'api/album'
// style
import './style.scss'
import SongList from 'components/SongList';

function Album() {
  const [show, setShow] = useState(true);
  const nav = useNavigate();
  function back() {
    nav(-1)
  }

  const [album, setAlbum] = useState({});
  const [songs, setSongs] = useState([]);
  async function getAlbum(id) {
    const { playlist } = await getPlayList({ id });
    setAlbum(playlist);
    setSongs(playlist.tracks??[]);
  }
  const { id } = useParams();
  const headBackStyle = useMemo(() => {
    return album.coverImgUrl ? { backgroundImage: 'url(' + album.coverImgUrl + ')' } : { backgroundImage: '' }
  }, [album])
  useEffect(() => {
    getAlbum(id);
  }, [])

  const navToSong = (id) => {
    nav('/song/' + id);
  }


  return (
    <CSSTransition
      in={show}
      appear={true}
      unmountOnExit
      timeout={200}
      classNames="page-animate"
      onExited={back}
    >
      <section>
        <div className='pl-head'>
          <div className='pl-head-bg abs-all-zero' style={headBackStyle}></div>
          <div className='pl-head-wrap'>
            <div className='pl-head-img'>
              <img src={album.coverImgUrl}></img>
            </div>
            <div className='pl-head-info'>
              <div className='pl-head-title two-line'>{album.name}</div>
              <div className='pl-head-person'>
                <div className='pl-head-avatar'>
                  <img src={album.creator?.avatarUrl}></img>
                </div>
                {album.creator?.nickname}
              </div>
            </div>
          </div>
        </div>

        <div className='pl-body'>
          <div className='pl-body-title'>
            歌曲列表
          </div>
          <div className='pl-body-list'>
            <SongList songs={songs} handleClick={navToSong}></SongList>
          </div>
        </div>
      </section>
    </CSSTransition>
  )
}

export default memo(Album)