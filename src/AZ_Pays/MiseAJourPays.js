import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { majPays } from "./paysSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Avatar,
  Stack,
} from "@mui/material";

const MiseAJourPays = ({ open, onClose, paysToUpdate }) => {
  const dispatch = useDispatch();

  const [majPaysJs, setMajPaysJs] = useState({
    mj_id: paysToUpdate._id,
    mjlePays: paysToUpdate.lePays,
    mjleDrapeau: paysToUpdate.leDrapeau,
  });

  const handleUpdatePays = (e) => {
    e.preventDefault();
    dispatch(
      majPays({
        id: majPaysJs.mj_id,
        lePays: majPaysJs.mjlePays,
        leDrapeau: majPaysJs.mjleDrapeau,
      })
    );
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Mettre à jour le pays</DialogTitle>
      <form onSubmit={handleUpdatePays}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Nouveau nom du pays"
              variant="outlined"
              fullWidth
              margin="normal"
              value={majPaysJs.mjlePays}
              onChange={(e) =>
                setMajPaysJs({ ...majPaysJs, mjlePays: e.target.value })
              }
            />
            <TextField
              label="Nouveau lien du drapeau"
              variant="outlined"
              fullWidth
              margin="normal"
              value={majPaysJs.mjleDrapeau}
              onChange={(e) =>
                setMajPaysJs({ ...majPaysJs, mjleDrapeau: e.target.value })
              }
            />
            <Box display="flex" justifyContent="center">
              <Avatar
                alt="Drapeau"
                src={majPaysJs.mjleDrapeau}
                sx={{ width: 100, height: 100, marginTop: 2 }}
              />
            </Box>
          </Stack>
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

export default MiseAJourPays;
