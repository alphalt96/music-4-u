import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Song } from '../../utils/types'

interface PlayerState {
  playingSong: Song | null
  trackList: {
    data: Song[],
    isTrackListLooped: boolean
  }
}

const initialState: PlayerState = {
  playingSong: null,
  trackList: {
    data: [],
    isTrackListLooped: false
  }
}

export const playingSongSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayingSong: (state, action: PayloadAction<Song>) => {
      state.playingSong = action.payload
    },
    unsetPlayingSong: state => {
      state.playingSong = null
    },
    setTrackList: (state, action: PayloadAction<Song[]>) => {
      state.trackList = {
        ...state.trackList,
        data: action.payload
      }
    },
    addToTrackList: (state, action: PayloadAction<Song>) => {
      state.trackList = {
        ...state.trackList,
        data: [ ...state.trackList.data, action.payload ]
      }
    },
    removeFromTracklist: (state, action: PayloadAction<Song>) => {
      const songIndex = state.trackList.data.findIndex(item => item.id === action.payload.id)
      
      if (songIndex !== -1) {
        const refreshedList = state.trackList.data.splice(songIndex, 1)
        state.trackList = {
          ...state.trackList,
          data: refreshedList
        }
      }
    },
    setTrackListLooped: (state, action: PayloadAction<boolean>) => {
      state.trackList = {
        ...state.trackList,
        isTrackListLooped: action.payload
      }
    }
  }
})

export const { 
  setPlayingSong, 
  unsetPlayingSong,
  setTrackList,
  addToTrackList,
  removeFromTracklist,
  setTrackListLooped
} = playingSongSlice.actions
export default playingSongSlice.reducer
