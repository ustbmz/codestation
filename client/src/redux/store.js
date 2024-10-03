import { configureStore } from '@reduxjs/toolkit'

import userRendcer from './userSlice'
import typeRendcer from './typeSlice'
import interviewRendcer from './interviewSlice'

export const store = configureStore({
  reducer: {
    user: userRendcer,
    type: typeRendcer,
    interview: interviewRendcer,
  },
})
