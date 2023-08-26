import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { zidPays } from "../AZ_Pays/paysSlice";
import { getAllUtilisateurs } from "../Redux/userSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Avatar,
  Stack,
} from "@mui/material";

const AjouterPays = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [newPays, setNewPays] = useState({
    lePays: "",
    leDrapeau: "",
    publiePar: "",
  });

  const utilisateurs = useSelector((state) => state.userRd.utilisateurslkol);

  useEffect(() => {
    dispatch(getAllUtilisateurs());
  }, [dispatch]);

  const handleAddPays = (e) => {
    e.preventDefault();

    if (utilisateurs) {
      dispatch(
        zidPays({
          lePays: newPays.lePays,
          leDrapeau: newPays.leDrapeau,
          publiePar: newPays.publiePar,
        })
      );
      onClose();
    } else {
      console.log("Les utilisateurs ne sont pas encore disponibles.");
    }
    setNewPays({
      lePays: "",
      leDrapeau: "",
      publiePar: "",
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Ajouter un nouveau pays</DialogTitle>
      <form onSubmit={handleAddPays}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Nom du pays"
              variant="outlined"
              fullWidth
              value={newPays.lePays}
              onChange={(e) =>
                setNewPays({ ...newPays, lePays: e.target.value })
              }
            />
            <TextField
              label="Lien du drapeau"
              variant="outlined"
              fullWidth
              value={newPays.leDrapeau}
              onChange={(e) =>
                setNewPays({ ...newPays, leDrapeau: e.target.value })
              }
            />
            <FormControl fullWidth>
              <InputLabel>ID de l'utilisateur</InputLabel>
              <Select
                value={newPays.publiePar}
                onChange={(e) =>
                  setNewPays({ ...newPays, publiePar: e.target.value })
                }
              >
                {utilisateurs.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box display="flex" justifyContent="center">
              <Avatar
                alt="Drapeau"
                src={newPays.leDrapeau}
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

export default AjouterPays;
