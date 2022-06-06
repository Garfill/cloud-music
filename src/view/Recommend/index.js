import Swiper from 'components/Swiper'
import SwiperItem from 'components/Swiper/Item'
import React, { useState, useEffect } from 'react'
import List from './List'
import styled from 'styled-components';
import Scroll from 'components/Scroll';

// recoil state
import { useRecoilState } from 'recoil';
import { bannerState, recommendState } from 'store/home';

// api
import { getBanner, getRecommend } from 'api/home';

const Content = styled.div`
  height: calc(100vh - 94px);
`
export default function Recommend() {
  const [banner, setBanner] = useRecoilState(bannerState);
  const [recommendList, setRecommendList] = useRecoilState(recommendState)
  
  async function initData() {
    const [{ banners }, { result }] = await Promise.all([
      getBanner(),
      getRecommend()
    ]);
    setBanner(banners);
    setRecommendList(result)
  }

  useEffect(() => {
    initData()
  }, [])
  

  return (
    <Content>
      <Scroll className="list">
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
