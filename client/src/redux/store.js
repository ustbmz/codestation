import { configureStore } from '@reduxjs/toolkit'

import userRendcer from './userSlice'
import typeRendcer from './typeSlice'
export const store = configureStore({
  reducer: {
    user: userRendcer,
    type: typeRendcer,
  },
})
