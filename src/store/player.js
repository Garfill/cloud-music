import { createSlice } from '@reduxjs/toolkit'
// 播放模式
export const playMode = {
  sequence: 0,
  loop: 1,
  random: 2
};
const initialState = {
  fullScreen: false,// 播放器是否为全屏模式
  playing: false, // 当前歌曲是否播放
  sequencePlayList: [], // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
  playList: [],
  mode: playMode.sequence,// 播放模式
  currentIndex: -1,// 当前歌曲在播放列表的索引位置
  showPlayList: false,// 是否展示播放列表
  currentSong: {}
}

export const playerSlice = createSlice({
  initialState,
  name: 'player',
  reducers: {
    setPlayer(state, { payload }) {
      for (let p in payload) {
        state[p] = payload[p]
      }
    }
  }
})

export const { setPlayer } = playerSlice.actions
export default playerSlice.reducer