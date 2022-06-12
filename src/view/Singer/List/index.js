import {
  ListContainer,
  List,
  ListItem,
  ListFooter,
} from "./style";

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Scroll from "components/Scroll";

// store
import { getHotSinger } from 'store/home'

const STEP = 20;

export default function SingerList() {
  const singerList = useSelector(state => state.home.singerList);
  const listEnd = useSelector(state => state.home.listEnd);
  const listLoading = useSelector(state => state.home.listLoading);
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const getMoreSinger = (count) => {
    if (listEnd || listLoading) return;
    if (count === undefined) count = offset + STEP;
    dispatch(getHotSinger(count))
    setOffset(count)
  }

  useEffect(() => {
    if (!singerList.length) {
      getMoreSinger(0);
    }
  }, [])
  

  const renderListFooter = () => {
    return (
      <ListFooter>
        {
          listEnd 
            ? '没有更多了'
            : listLoading ?
              (<span>加载中...</span>) : (null)
        }
      </ListFooter>
    )
  }

  return (
    <ListContainer>
      <Scroll
        pullUp={getMoreSinger}
      >
        <List>
          {
            singerList.map((item, index) => {
              return (
                <ListItem key={item.accountId + "" + index}>
                  <div className="img_wrapper">
                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                  </div>
                  <span className="name">{item.name}</span>
                </ListItem>
              )
            })
          }
          {renderListFooter()}
        </List>
      </Scroll>
    </ListContainer>
  )
}

