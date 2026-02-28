import { configureStore } from '@reduxjs/toolkit'
import userReducer from './auth/userSlice.js'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})