import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { zidCategories } from "../AZ_Categories/categoriesSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const AjouterCategorie = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    dispatch(zidCategories({ categorie: newCategory }));
    onClose();
    setNewCategory(""); // Réinitialiser l'état du champ
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ajouter une nouvelle catégorie</DialogTitle>
      <form onSubmit={handleAddCategory}>
        <DialogContent>
          <TextField
            label="Nom de la catégorie"
            variant="outlined"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Annuler</Button>
          <Button type="submit" color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AjouterCategorie;
