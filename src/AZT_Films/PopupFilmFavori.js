import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const PopupFilmFavori = ({ open, onClose }) => {
  const hoverStyle = { backgroundColor: "#45685C", color: "white" }; // Couleurs de fond et de texte

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Connectez-vous ou créez un compte</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Pour ajouter ce film à vos favoris, veuillez vous connecter ou créer
          un compte.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
        <Button
          color="primary"
          variant="contained"
          component={Link}
          to="/login"
          sx={{ "&:hover": hoverStyle }} // Appliquer le style de hover
        >
          Se connecter
        </Button>
        <Button
          color="secondary"
          variant="contained"
          component={Link}
          to="/register"
          sx={{ "&:hover": hoverStyle }} // Appliquer le style de hover
        >
          S'inscrire
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupFilmFavori;
