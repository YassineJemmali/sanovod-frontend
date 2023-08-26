import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const creerRole = createAsyncThunk(
  "roles/createRole",
  async ({ leRole, permissions }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://sanovod-api.onrender.com/api/roles/",
        {
          leRole,
          permissions,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllRoles = createAsyncThunk(
  "roles/getAllRoles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://sanovod-api.onrender.com/api/roles/"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async ({ id, leRole, permissions }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `https://sanovod-api.onrender.com/api/roles/${id}`,
        {
          leRole,
          permissions,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`https://sanovod-api.onrender.com/api/roles/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const rolesSlice = createSlice({
  name: "roles",
  initialState: {
    rolesList: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Ajouter Role
      .addCase(creerRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(creerRole.fulfilled, (state, action) => {
        state.rolesList.push(action.payload);
        state.loading = false;
      })
      .addCase(creerRole.rejected, (state, action) => {
        state.loading = false;
      })

      // tous les roles
      .addCase(getAllRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllRoles.fulfilled, (state, action) => {
        state.rolesList = action.payload;
        state.loading = false;
      })
      .addCase(getAllRoles.rejected, (state, action) => {
        state.loading = false;
      })
      // maj Role
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        const updatedRole = action.payload;
        state.rolesList = state.rolesList.map((role) =>
          role._id === updatedRole._id ? updatedRole : role
        );
        state.loading = false;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
      })
      // Supprimer Role
      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        const id = action.payload;
        state.rolesList = state.rolesList.filter((role) => role._id !== id);
        state.loading = false;
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default rolesSlice.reducer;
