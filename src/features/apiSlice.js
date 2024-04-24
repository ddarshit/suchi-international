
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiHandler from '../services/apiHandler';

// Async thunk
export const fetchData = createAsyncThunk('api/fetchData', async ({ method,endpoint,data,headers }) => {
  const response = await apiHandler(method,endpoint,data,headers);
  return response;
});

// Slice
const apiSlice = createSlice({
  name: 'api',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;
