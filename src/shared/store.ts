import { configureStore } from '@reduxjs/toolkit'

import playingReducer from './reducers/playerSlice'

export const store = configureStore({
  reducer: {
    player: playingReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
