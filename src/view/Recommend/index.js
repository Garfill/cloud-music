import Swiper from 'components/Swiper'
import SwiperItem from 'components/Swiper/Item'
import React, { useEffect } from 'react'
import List from './List'
import styled from 'styled-components';
import Scroll from 'components/Scroll';

// api
import { getBanner, getRecommend } from 'api/home';
import { useSelector, useDispatch } from 'react-redux';
import { setBanner, setRecommend } from 'store/home';

const Content = styled.div`
  height: calc(100vh - 94px);
`
export default function Recommend() {

  const banner = useSelector(state => state.home.banner);
  const recommendList = useSelector(state => state.home.recommendList);
  const dispatch = useDispatch()
  
  async function initData() {
    const [{ banners }, { result }] = await Promise.all([
      getBanner(),
      getRecommend()
    ]);
    dispatch(setBanner(banners));
    dispatch(setRecommend(result));
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
