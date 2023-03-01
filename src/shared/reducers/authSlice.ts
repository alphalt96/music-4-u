import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '../../utils/models/user'

interface AuthState {
  user: User | null
}

const initialState: AuthState = {
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      // TODO: fetch get user profile api and dispatch data if browser refreshed
      state.user = action.payload
    },
    unsetCurrentUser: state => {
      state.user = null
    }
  }
})

export const { 
  setCurrentUser, 
  unsetCurrentUser
} = authSlice.actions
export default authSlice.reducer
