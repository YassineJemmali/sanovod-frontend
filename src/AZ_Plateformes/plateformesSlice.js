import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// zidPlatforme
export const zidPlateforme = createAsyncThunk(
  "plateformes/zidPlateforme",
  async ({ unePlateforme, logoPlateforme }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/plateformes/",
        {
          unePlateforme: unePlateforme,
          logoPlateforme: logoPlateforme,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// getAllPlateformes
export const getAllPlateformes = createAsyncThunk(
  "plateformes/getAllPlateformes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/plateformes/"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// supprimerPlateforme
export const supprimerPlateforme = createAsyncThunk(
  "plateformes/supprimerPlateforme",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/plateformes/${id}`);
      return id; // Return the ID of the deleted plateforme for state update
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// mettreAPlateforme
export const mettreAPlateforme = createAsyncThunk(
  "plateformes/mettreAPlateforme",
  async ({ id, unePlateforme, logoPlateforme }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/plateformes/${id}`,
        {
          unePlateforme: unePlateforme,
          logoPlateforme: logoPlateforme,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const plateformesSlice = createSlice({
  name: "plateformes",
  initialState: {
    plateformeslcol: [], // Initialize the array here
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // ajouter
    builder.addCase(zidPlateforme.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(zidPlateforme.fulfilled, (state, action) => {
      state.plateformeslcol.push(action.payload); // Add the new plateforme to the array
      state.loading = false;
    });
    builder.addCase(zidPlateforme.rejected, (state, action) => {
      state.loading = false;
    });
    //// getAllPlateformes
    builder.addCase(getAllPlateformes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllPlateformes.fulfilled, (state, action) => {
      state.plateformeslcol = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllPlateformes.rejected, (state, action) => {
      state.loading = false;
    });
    //// supprimerPlateforme
    builder.addCase(supprimerPlateforme.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(supprimerPlateforme.fulfilled, (state, action) => {
      const id = action.payload;
      state.plateformeslcol = state.plateformeslcol.filter(
        (plateforme) => plateforme._id !== id
      );
      state.loading = false;
    });
    builder.addCase(supprimerPlateforme.rejected, (state, action) => {
      state.loading = false;
    });
    // mettreAPlateforme
    builder.addCase(mettreAPlateforme.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(mettreAPlateforme.fulfilled, (state, action) => {
      const updatedPlateforme = action.payload;
      state.plateformeslcol = state.plateformeslcol.map((plateforme) =>
        plateforme._id === updatedPlateforme._id
          ? updatedPlateforme
          : plateforme
      );
      state.loading = false;
    });
    builder.addCase(mettreAPlateforme.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default plateformesSlice.reducer;
