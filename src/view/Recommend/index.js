import Swiper from 'components/Swiper'
import SwiperItem from 'components/Swiper/Item'
import React, { useEffect } from 'react'
import List from './List'
import styled from 'styled-components';
import Scroll from 'components/Scroll';

// store
import { useSelector, useDispatch } from 'react-redux';
import { getHomeData } from 'store/home'

import { forceCheck } from 'react-lazyload';

const Content = styled.div`
  height: calc(100vh - 94px);
`
export default function Recommend() {

  const banner = useSelector(state => state.home.banner);
  const recommendList = useSelector(state => state.home.recommendList);
  const dispatch = useDispatch()
  
  async function initData() {
    if (banner.length > 0 && recommendList.length > 0) return;
    dispatch(getHomeData())
  }

  useEffect(() => {
    initData()
  }, [])
  

  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Swiper>
            {
              banner.map((item, index) => (
                <SwiperItem key={index}>
                  <img src={item.imageUrl} alt=''></img>
                </SwiperItem>
              ))
            }
          </Swiper>
          <List recommendList={recommendList}></List>
        </div>
      </Scroll>
    </Content>
  )
}
