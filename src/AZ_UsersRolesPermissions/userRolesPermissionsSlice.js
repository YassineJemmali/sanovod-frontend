import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const tousPermissionsAction = createAsyncThunk(
  "permissions/tousPermissionsAction",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://sanovod-api.onrender.com/api/permissions/"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const permissionsSlice = createSlice({
  name: "permissions",
  initialState: {
    permissionsList: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(tousPermissionsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(tousPermissionsAction.fulfilled, (state, action) => {
        state.permissionsList = action.payload;
        state.loading = false;
      })
      .addCase(tousPermissionsAction.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default permissionsSlice.reducer;
