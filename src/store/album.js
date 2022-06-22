import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getPlayList } from 'api/album'
import { setPlayList } from 'store/player'

const initialState = {
  album: {},
}

export const getAlbum = createAsyncThunk(
  'album/getAlbum',
  async (id, { dispatch }) => {
    const { playlist } = await getPlayList({ id })
    dispatch(setPlayList(playlist.tracks ?? []))
    return playlist
  }
) 

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    setAlbum(state, { album }) {
      state.album = album
    }
  },
  extraReducers: {
    [getAlbum.fulfilled]: (state, { payload }) => {
      state.album = payload
    }
  }
})

export const { setAlbum } = albumSlice.actions
export default albumSlice.reducer