import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getInterviewTitle } from '../api/interview'

export const getInterviewTitleAsync = createAsyncThunk(
  'interview/getInterviewTitleAsync',
  async (_, thunkAPI) => {
    const result = await getInterviewTitle()
    console.log('🐤 ≂ result:', result)
    thunkAPI.dispatch(initInterviewTitleList(result.data))
  }
)

export const interviewSlice = createSlice({
  name: 'interview',
  initialState: {
    interviewTitleList: [],
  },

  reducers: {
    initInterviewTitleList(state, action) {
      state.interviewTitleList = action.payload
    },
  },
//   extraReducers: (builder) => {
//     builder.addCase(getInterviewTitleAsync.fulfilled, (state, action) => {
//       console.log('🐤 ≂ action:', action)
//       state.interviewTitleList = action.payload
//     })
//   },
})

export const { initInterviewTitleList } = interviewSlice.actions
export default interviewSlice.reducer
