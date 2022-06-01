import Swiper from 'components/Swiper'
import SwiperItem from 'components/Swiper/Item'
import React from 'react'

export default function Recommend() {
  const bannerList = [
    "http://p1.music.126.net/Psbo5OrzeRxzLGQnrjIzig==/109951167499120247.jpg?imageView&quality=89",
    "http://p1.music.126.net/hHj81Oi3yQiFEp7BfUhKYQ==/109951167497696790.jpg?imageView&quality=89",
    "http://p1.music.126.net/tBHeY_3kFHwEQ5vJuJrwMA==/109951167497702170.jpg?imageView&quality=89",
    "http://p1.music.126.net/EYoeQf1UO87VsjLSM8UrTA==/109951167498797892.jpg?imageView&quality=89"
  ]
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
    </>
  )
}
