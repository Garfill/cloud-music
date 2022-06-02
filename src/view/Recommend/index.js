import Swiper from 'components/Swiper'
import SwiperItem from 'components/Swiper/Item'
import React, { useState, useEffect } from 'react'
import List from './List'

export default function Recommend() {
  const bannerList = [
    "http://p1.music.126.net/Psbo5OrzeRxzLGQnrjIzig==/109951167499120247.jpg?imageView&quality=89",
    "http://p1.music.126.net/hHj81Oi3yQiFEp7BfUhKYQ==/109951167497696790.jpg?imageView&quality=89",
    "http://p1.music.126.net/tBHeY_3kFHwEQ5vJuJrwMA==/109951167497702170.jpg?imageView&quality=89",
    "http://p1.music.126.net/EYoeQf1UO87VsjLSM8UrTA==/109951167498797892.jpg?imageView&quality=89"
  ]

  const [recommendList, setRecommendList] = useState([])
  
  useEffect(() => {
    setRecommendList(new Array(9).fill(null).map(item => {
      return {
        id: 1,
        picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
        playCount: 17171122,
        name: "朴树、许巍、李健、郑钧、老狼、赵雷"
      }
    }))
  }, [])
  

  return (
    <>
      <Swiper>
        {
          bannerList.map((item, index) => (
            <SwiperItem key={index}>
              <img src={item} alt=''></img>
            </SwiperItem>
          ))
        }
      </Swiper>
      <List recommendList={recommendList}></List>
    </>
  )
}
