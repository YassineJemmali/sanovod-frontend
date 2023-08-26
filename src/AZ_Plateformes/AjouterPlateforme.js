import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { zidPlateforme } from "../AZ_Plateformes/plateformesSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Stack,
  Avatar,
} from "@mui/material";

const AjouterPlateforme = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [newPlateforme, setNewPlateforme] = useState({
    unePlateforme: "",
    logoPlateforme: "",
  });
  const [logoPreview, setLogoPreview] = useState(""); // Nouvel état pour l'aperçu du logo

  const handleAddPlateforme = (e) => {
    e.preventDefault();

    dispatch(zidPlateforme(newPlateforme));
    onClose();
    // Réinitialiser les champs après la soumission
    setNewPlateforme({
      unePlateforme: "",
      logoPlateforme: "",
    });
  };

  useEffect(() => {
    setLogoPreview(newPlateforme.logoPlateforme);
  }, [newPlateforme.logoPlateforme]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Ajouter une nouvelle plateforme</DialogTitle>
      <form onSubmit={handleAddPlateforme}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Nom de la plateforme"
              variant="outlined"
              fullWidth
              value={newPlateforme.unePlateforme}
              onChange={(e) =>
                setNewPlateforme({
                  ...newPlateforme,
                  unePlateforme: e.target.value,
                })
              }
            />
            <TextField
              label="Lien du logo"
              variant="outlined"
              fullWidth
              value={newPlateforme.logoPlateforme}
              onChange={(e) =>
                setNewPlateforme({
                  ...newPlateforme,
                  logoPlateforme: e.target.value,
                })
              }
            />
            <Box display="flex" justifyContent="center">
              <Avatar
                alt="Logo Plateforme"
                src={logoPreview}
                sx={{ width: 100, height: 100, marginTop: 2 }}
              />
            </Box>
          </Stack>
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

export default AjouterPlateforme;
