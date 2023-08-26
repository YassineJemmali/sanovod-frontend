import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// zidFilm
export const zidFilm = createAsyncThunk(
  "films/zidFilm",
  async (nouveauFilm, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "https://sanovod-api.onrender.com/api/films/",
        nouveauFilm
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// getAllFilms
export const getAllFilms = createAsyncThunk(
  "films/getAllFilms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://sanovod-api.onrender.com/api/films/"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// supprimerFilm
export const supprimerFilm = createAsyncThunk(
  "films/supprimerFilm",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`https://sanovod-api.onrender.com/api/films/${id}`);
      return id; // Return the ID of the deleted film for state update
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// mettreAFilm
export const mettreAFilm = createAsyncThunk(
  "films/mettreAFilm",
  async ({ id, ...mettreAJourFilm }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `https://sanovod-api.onrender.com/api/films/${id}`,
        mettreAJourFilm
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const filmsSlice = createSlice({
  name: "films",
  initialState: {
    listeFilms: [], // Initialize the array here
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // ajouter
    builder.addCase(zidFilm.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(zidFilm.fulfilled, (state, action) => {
      state.listeFilms.push(action.payload); // Add the new film to the array
      state.loading = false;
    });
    builder.addCase(zidFilm.rejected, (state, action) => {
      state.loading = false;
    });
    //// getAllFilms
    builder.addCase(getAllFilms.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllFilms.fulfilled, (state, action) => {
      state.listeFilms = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllFilms.rejected, (state, action) => {
      state.loading = false;
    });
    //// supprimerFilm
    builder.addCase(supprimerFilm.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(supprimerFilm.fulfilled, (state, action) => {
      const id = action.payload;
      state.listeFilms = state.listeFilms.filter((film) => film._id !== id);
      state.loading = false;
    });
    builder.addCase(supprimerFilm.rejected, (state, action) => {
      state.loading = false;
    });
    // mettreAFilm
    builder.addCase(mettreAFilm.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(mettreAFilm.fulfilled, (state, action) => {
      const updatedFilm = action.payload;
      state.listeFilms = state.listeFilms.map((film) =>
        film._id === updatedFilm._id ? updatedFilm : film
      );
      state.loading = false;
    });
    builder.addCase(mettreAFilm.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default filmsSlice.reducer;
