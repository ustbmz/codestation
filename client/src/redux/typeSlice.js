import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getTypes } from '../api/type'

export const getTypeList = createAsyncThunk(
  'type/getTypeList',
  async (_, thunkAPI) => {
    const result = await getTypes()
    return result.data
  }
)

export const TypeSlice = createSlice({
  name: 'type',
  initialState: {
    typeList: [],
    issueTypeId: 'all',
    bookTypeId: 'all',
  },
  reducers: {
    // // 初始化类型列表
    // initTypeList: (state, { payload }) => {
    //   state.typeList = payload
    // },
    updateIssueTypeId: (state, { payload }) => {
      state.issueTypeId = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTypeList.fulfilled, (state, action) => {
      state.typeList = action.payload
    })
  },
})

export const { updateIssueTypeId } = TypeSlice.actions
export default TypeSlice.reducer
