import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const zidCategories = createAsyncThunk(
  "categories/zidCategories",
  async ({ categorie }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        "https://sanovod-api.onrender.com/api/categories",
        {
          categorie,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Créer un extrareducer pour récupérer toutes les catégories
export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://sanovod-api.onrender.com/api/categories/tous"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// supprimer catégorie
export const supCategorie = createAsyncThunk(
  "categories/supCategorie",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `https://sanovod-api.onrender.com/api/categories/${id}`
      );
      return id; // Renvoyer l'ID de la catégorie supprimée pour la mise à jour de l'état
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//mettre à jour
export const mettreAJourCategorie = createAsyncThunk(
  "categories/mettreAJourCategorie",
  async ({ id, categorie }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.put(
        `https://sanovod-api.onrender.com/api/categories/${id}`,
        {
          categorie,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categorie",
  initialState: {
    categorieslcol: [], // Assurez-vous que categorieslcol est initialisé avec un tableau vide.
    loading: false,
  },
  extraReducers: (builder) => {
    // ajouter
    builder.addCase(zidCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(zidCategories.fulfilled, (state, action) => {
      state.categorieslcol.push(action.payload); // Ajouter la nouvelle catégorie à la liste
      state.loading = false;
    });
    builder.addCase(zidCategories.rejected, (state, action) => {
      state.loading = false;
    });
    //// getall
    builder.addCase(getAllCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categorieslcol = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllCategories.rejected, (state, action) => {
      state.loading = false;
    });
    //// Supprimer
    builder.addCase(supCategorie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(supCategorie.fulfilled, (state, action) => {
      const id = action.payload;
      state.categorieslcol = state.categorieslcol.filter(
        (categorie) => categorie._id !== id
      ); // Supprimer la catégorie du tableau en utilisant l'ID
      state.loading = false;
    });
    builder.addCase(supCategorie.rejected, (state, action) => {
      state.loading = false;
    });
    // mise à jour
    builder.addCase(mettreAJourCategorie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(mettreAJourCategorie.fulfilled, (state, action) => {
      const updatedCategorie = action.payload;
      state.categorieslcol = state.categorieslcol.map((categorie) =>
        categorie._id === updatedCategorie._id ? updatedCategorie : categorie
      );
      state.loading = false;
    });
    builder.addCase(mettreAJourCategorie.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default categoriesSlice.reducer;
