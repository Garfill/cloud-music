import Scroll from 'components/Scroll';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { Container, List, ListItem, SongList } from './style'
import { getRankData } from 'store/home';


const filterIndex = rankList => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
};

export default function Rank() {
  const nav = useNavigate();
  const enterDetail = (detail) => {
    nav(`/rank/${detail.id}`);
  }
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {
          list.map((item) => {
            return (
              <ListItem key={item.coverImgId} tracks={item.tracks} onClick={() => enterDetail(item)}>
                <div className="img_wrapper">
                  <img src={item.coverImgUrl} alt="" />
                  <div className="decorate"></div>
                  <span className="update_frequecy">{item.updateFrequency}</span>
                </div>
                {renderSongList(item.tracks)}
              </ListItem>
            )
          })
        }
      </List>
    )
  }
  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {
          list.map((item, index) => {
            return <li key={index}>{index + 1}. {item.first} - {item.second}</li>
          })
        }
      </SongList>
    ) : null;
  }
  const dispatch = useDispatch()
  const rankList = useSelector(state => state.home.rankList);
  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);

  useEffect(() => {
    if (!rankList.length) {
      dispatch(getRankData())
    }
  }, [])
  
  

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical"> 官方榜 </h1>
          {renderRankList(officialList)}
          <h1 className="global"> 全球榜 </h1>
          {renderRankList(globalList, true)}
        </div>
      </Scroll>
      <Outlet></Outlet>
    </Container>  )
}
