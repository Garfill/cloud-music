import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  banner: [],
  recommendList: [],
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setBanner(state, { payload }) {
      state.banner = payload
    },
    setRecommend(state, { payload }) {
      state.recommendList = payload
    }
  }
})

export const { setBanner, setRecommend } = homeSlice.actions
export default homeSlice.reducer