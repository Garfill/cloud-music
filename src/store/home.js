import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBanner, getRecommend } from 'api/home';

const initialState = {
  banner: [],
  recommendList: [],
}

export const getHomeData = createAsyncThunk(
  'home/getHomeData',
  async (_, { dispatch }) => {
    const [{ banners }, { result }] = await Promise.all([
      getBanner(),
      getRecommend()
    ]);
    return {
      banner: banners,
      recommend: result
    }
  }
)

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
  },
  extraReducers: {
    [getHomeData.fulfilled]: (state, { payload }) => {
      state.banner = payload.banner;
      state.recommendList = payload.recommend
    }
  }
})

export const { setBanner, setRecommend } = homeSlice.actions
export default homeSlice.reducer