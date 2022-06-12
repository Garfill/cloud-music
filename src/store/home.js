import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBanner, getRecommend } from 'api/home';
import { getHotSingerListRequest } from 'api/singer'


const initialState = {
  banner: [],
  recommendList: [],


  singerList: [],
  listEnd: false,
  listLoading: false,
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

export const getHotSinger = createAsyncThunk(
  'home/getHotSingerData',
  async (count, { dispatch }) => {
    dispatch({
      type: 'home/setLoading',
      payload: true
    });
    const { artists, more } = await getHotSingerListRequest(count);
    dispatch({
      type: 'home/setLoading',
      payload: false
    });
    return {artists, more};
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
    },
    setSingerList(state, { payload }) {
      state.singerList = payload
    },
    setLoading(state, { payload }) {
      state.listLoading = payload
    }
  },
  extraReducers: {
    [getHomeData.fulfilled]: (state, { payload }) => {
      state.banner = payload.banner;
      state.recommendList = payload.recommend;
    },
    [getHotSinger.fulfilled]: (state, { payload }) => {
      if (!payload.more) {
        state.listEnd = true;
      }
      state.singerList = state.singerList.concat(payload.artists);
    }
  }
})

export const { setBanner, setRecommend } = homeSlice.actions
export default homeSlice.reducer