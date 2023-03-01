import { configureStore } from '@reduxjs/toolkit'

import playingReducer from './reducers/playerSlice'
import authReducer from './reducers/authSlice'

export const store = configureStore({
  reducer: {
    player: playingReducer,
    auth: authReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
