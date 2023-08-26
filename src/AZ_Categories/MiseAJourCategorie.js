import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { mettreAJourCategorie } from "../AZ_Categories/categoriesSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const MiseAJourCategorie = ({ open, onClose, categorieToUpdate }) => {
  const dispatch = useDispatch();
  const [updatedCategory, setUpdatedCategory] = useState(
    categorieToUpdate.categorie
  );

  const handleUpdateCategory = () => {
    dispatch(
      mettreAJourCategorie({
        id: categorieToUpdate._id,
        categorie: updatedCategory,
      })
    );
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Mettre à jour la catégorie</DialogTitle>
      <form onSubmit={handleUpdateCategory}>
        <DialogContent>
          <TextField
            label="Nouveau nom de la catégorie"
            variant="outlined"
            fullWidth
            value={updatedCategory}
            onChange={(e) => setUpdatedCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Annuler</Button>
          <Button type="submit" color="primary">
            Mettre à jour
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MiseAJourCategorie;
