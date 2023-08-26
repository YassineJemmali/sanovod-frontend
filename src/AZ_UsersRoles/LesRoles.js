import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { getAllRoles, deleteRole } from "./userRolesSlice"; // Importez supprimerRole
import IM from "../IM"; // Assurez-vous d'importer correctement IM

const LesRoles = () => {
  const dispatch = useDispatch();
  const rolesList = useSelector((state) => state.userRolesSlice.rolesList);
  const { roleConnected } = IM(); // Obtenez le rôle connecté

  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteRole(id)); // Appel à l'action pour supprimer le rôle
  };

  return (
    <Container maxWidth="md">
      <Box mt={3}>
        <Typography variant="h4" gutterBottom>
          Liste des Rôles
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="/ajouterrole"
          color="primary"
        >
          Ajouter un rôle
        </Button>
      </Box>
      <Divider sx={{ my: 2 }} />
      <List>
        {rolesList.map((role) => (
          <ListItem key={role._id}>
            <ListItemButton
              component={RouterLink}
              to={`/modifierrole/${role._id}`}
            >
              <ListItemText primary={role.leRole} />
            </ListItemButton>
            {roleConnected === "Admin" && ( // Afficher le bouton Supprimer pour l'administrateur seulement
              <Button
                variant="outlined"
                onClick={() => handleDelete(role._id)}
                sx={{ ml: 2 }}
              >
                Supprimer
              </Button>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default LesRoles;
