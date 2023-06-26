import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './slice/CreateFileSlice'

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
})

export default store
