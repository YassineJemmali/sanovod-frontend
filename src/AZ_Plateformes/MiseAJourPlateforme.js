import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { mettreAPlateforme } from "./plateformesSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Avatar,
} from "@mui/material";

const MiseAJourPlateforme = ({ open, onClose, plateformeToUpdate }) => {
  const dispatch = useDispatch();

  const [updatedPlateforme, setUpdatedPlateforme] = useState(
    plateformeToUpdate.unePlateforme
  );
  const [updatedLogo, setUpdatedLogo] = useState(
    plateformeToUpdate.logoPlateforme
  );

  const handleUpdatePlateforme = (e) => {
    e.preventDefault();
    dispatch(
      mettreAPlateforme({
        id: plateformeToUpdate._id,
        unePlateforme: updatedPlateforme,
        logoPlateforme: updatedLogo,
      })
    );
    onClose();
    // Réinitialiser les champs après la soumission
    setUpdatedPlateforme({
      unePlateforme: "",
      logoPlateforme: "",
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Mettre à jour la plateforme</DialogTitle>
      <form onSubmit={handleUpdatePlateforme}>
        <DialogContent>
          <TextField
            label="Nouveau nom de la plateforme"
            variant="outlined"
            fullWidth
            value={updatedPlateforme}
            onChange={(e) => setUpdatedPlateforme(e.target.value)}
          />
          <TextField
            label="Nouveau lien du logo"
            variant="outlined"
            fullWidth
            value={updatedLogo}
            onChange={(e) => setUpdatedLogo(e.target.value)}
          />
          <Box display="flex" justifyContent="center">
            <Avatar
              alt="Logo Plateforme"
              src={updatedLogo}
              sx={{ width: 100, height: 100, marginTop: 2 }}
            />
          </Box>
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

export default MiseAJourPlateforme;
