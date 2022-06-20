import {
  ListContainer,
  List,
  ListItem,
} from "./style";

import React, { useEffect, useMemo, useContext } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Scroll from "components/Scroll";

// store
import { getHotSinger } from 'store/home'
import { debounce } from "utils";
// context 
import { DataContext } from 'context/data';
import { useNavigate } from "react-router-dom";


const STEP = 20;

export default function SingerList() {
  const singerList = useSelector(state => state.home.singerList);
  const listEnd = useSelector(state => state.home.listEnd);
  const listLoading = useSelector(state => state.home.listLoading);
  const dispatch = useDispatch();

  const data = useContext(DataContext);
  const { dispatch: dataDispatch } = data;
  const offset = data.state.count

  const getMoreSinger = (count) => {
    if (listEnd || listLoading) return;
    if (count === undefined) count = offset + STEP;
    dispatch(getHotSinger(count))
    dataDispatch({
      type: 'SET_COUNT',
      payload: count,
    })
  }
  const debounceGetMoreSinger = useMemo(() => debounce(getMoreSinger, 300), [getMoreSinger])

  useEffect(() => {
    if (!singerList.length) {
      getMoreSinger(0);
    }
  }, [])


  const nav = useNavigate()
  const enterDetail = (detail) => {
    nav(`/singer/${detail.id}`);
  }
  
  return (
    <ListContainer>
      <Scroll
        pullUp={debounceGetMoreSinger}
        pullUpLoading={listLoading}
        end={listEnd}
      >
        <List>
          {
            singerList.map((item, index) => {
              return (
                <ListItem key={item.accountId + "" + index} onClick={() => {enterDetail(item)}}>
                  <div className="img_wrapper">
                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                  </div>
                  <span className="name">{item.name}</span>
                </ListItem>
              )
            })
          }
        </List>
      </Scroll>
    </ListContainer>
  )
}

