import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const zidPays = createAsyncThunk(
  "pays/zidPays",
  async (
    { lePays, leDrapeau, publiePar },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/pays/zid", {
        lePays,
        leDrapeau,
        publiePar,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Action asynchrone pour obtenir tous les pays
export const obtenirTousLesPays = createAsyncThunk(
  "pays/obtenirTousLesPays",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/pays/lkol");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const supprimerPays = createAsyncThunk(
  "pays/supprimerPays",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/pays/sup/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const majPays = createAsyncThunk(
  "pays/majPays",
  async (
    { id, lePays, leDrapeau, publiePar },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/pays/maj/${id}`,
        {
          lePays,
          leDrapeau,
          publiePar,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const paysSlice = createSlice({
  name: "pays",
  initialState: {
    payslcol: [], // Assurez-vous que payslcol est initialisé avec un tableau vide.
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    // Ajouter un pays
    builder.addCase(zidPays.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(zidPays.fulfilled, (state, action) => {
      state.payslcol.push(action.payload); // Utilisez payslcol au lieu de lesPays
      state.loading = false;
    });
    builder.addCase(zidPays.rejected, (state, action) => {
      state.loading = false;
    });

    // Récupérer tous les pays
    builder.addCase(obtenirTousLesPays.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(obtenirTousLesPays.fulfilled, (state, action) => {
      state.payslcol = action.payload; // Mettez à jour la propriété payslcol avec les données reçues
      state.loading = false;
      state.error = null;
    });
    builder.addCase(obtenirTousLesPays.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Mettez à jour la propriété error avec l'erreur reçue
    });

    // Supprimer un pays
    builder.addCase(supprimerPays.fulfilled, (state, action) => {
      const id = action.payload;
      state.payslcol = state.payslcol.filter((pays) => pays._id !== id);
      state.loading = false;
    });

    // Mettre à jour un pays
    builder.addCase(majPays.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(majPays.fulfilled, (state, action) => {
      const updatedPays = action.payload;
      state.payslcol = state.payslcol.map((pays) =>
        pays._id === updatedPays._id ? updatedPays : pays
      ); // Utilisez state.payslcol ici au lieu de state.lesPays
      state.loading = false;
    });
    builder.addCase(majPays.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default paysSlice.reducer;
