import { createSlice } from '@reduxjs/toolkit'

const dataSlice = createSlice({
  name: 'data',
  initialState: [],
  reducers: {
    addData: (state, action) => {
      state.push(action.payload)
    },
    removeData: (state, action) => {
      return state.filter((data) => data.fileName !== action.payload)
    },
  },
})

export const { addData, removeData } = dataSlice.actions

export default dataSlice.reducer
