import SvgIcon from 'components/SvgIcon';
import React, { memo } from 'react'
import { getCount } from 'utils'
import LazyLoad from 'react-lazyload';
import './style.scss'

function RecommendList(props) {
  const { recommendList = [] } = props;

  return (
    <div className="list-wrapper">
      <div className="title">推荐歌单</div>
      <div className="list">
        {
          recommendList.map((item, index) => {
            return (
              <div className="list-item" key={item.id + index}>
                <div className="img_wrapper">
                  <LazyLoad
                    height='100%'
                    once
                    placeholder={
                      <img src='https://img.zcool.cn/community/01f4055864c2c3a8012060c8dc7eca.gif' width="100%" height="100%"></img>
                    }
                  >
                    <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music" />
                  </LazyLoad>
                  <div className="play_count">
                    <i className='play_icon'>
                      <SvgIcon icon="headphone"></SvgIcon>
                    </i>
                    <span className="count">{getCount(item.playCount)}</span>
                  </div>
                </div>
                <div className="desc">{item.name}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default memo(RecommendList)
