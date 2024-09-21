import { configureStore } from '@reduxjs/toolkit'

import userRendcer from './userSlice'

export const store = configureStore({
  reducer: {
    user: userRendcer
  }
})
