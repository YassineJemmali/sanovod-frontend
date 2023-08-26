import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ... vos autres imports

// Ajoutez l'ID de l'utilisateur au tableau 'favoris' du film
export const ajouterUtilisateurAuxFavoris = createAsyncThunk(
  "favoris/ajouterUtilisateurAuxFavoris",
  async ({ filmId, userId }) => {
    try {
      const response = await axios.patch(
        `https://sanovod-api.onrender.com/api/favories/${filmId}/ajouter-a-favoris`,
        { userId }
      );
      return response.data;
    } catch (error) {
      throw new Error("Erreur lors de l'ajout du favori.");
    }
  }
);

// Supprimez l'ID de l'utilisateur du tableau 'favoris' du film
export const supprimerUtilisateurDesFavoris = createAsyncThunk(
  "favoris/supprimerUtilisateurDesFavoris",
  async ({ filmId, userId }) => {
    try {
      const response = await axios.patch(
        `https://sanovod-api.onrender.com/api/favories/${filmId}/suppimer-de-favoris`,
        { userId }
      );
      return response.data;
    } catch (error) {
      throw new Error("Erreur lors de la suppression du favori.");
    }
  }
);

const favoriesSlice = createSlice({
  name: "favoris",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(supprimerUtilisateurDesFavoris.fulfilled, (state, action) => {
        // Mise à jour de l'état après suppression du favori
        // Vous pouvez filtrer le tableau 'state' pour retirer l'ID du film
        // de la liste des favoris de l'utilisateur
      })
      .addCase(ajouterUtilisateurAuxFavoris.fulfilled, (state, action) => {
        // Mise à jour de l'état après ajout du favori
        // Vous pouvez ajouter l'ID du film à la liste des favoris de l'utilisateur
      });
  },
});

export default favoriesSlice.reducer;
