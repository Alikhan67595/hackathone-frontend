// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    }
  },
})

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
