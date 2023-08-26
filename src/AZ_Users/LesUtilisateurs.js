import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllUtilisateurs, supprimerUtilisateur } from "../Redux/userSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Stack,
  AlertTitle,
  Avatar,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const LesUtilisateurs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const utilisateurs = useSelector((state) => state.userRd.utilisateurslkol);
  const rolesList = useSelector((state) => state.userRolesSlice.rolesList);

  useEffect(() => {
    dispatch(getAllUtilisateurs());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(supprimerUtilisateur(id));
    // Mettez à jour l'état de l'application après la suppression
    dispatch(getAllUtilisateurs());
  };

  const findRole = (roleId) => {
    const role = rolesList.find((r) => r._id === roleId);
    return role ? role.leRole : "Rôle inconnu";
  };

  return (
    <div>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="success">
          <AlertTitle>
            <strong>Liste des utilisateurs</strong>
          </AlertTitle>
          Le nombre d'utilisateurs enregistrés est{" "}
          <strong>{utilisateurs.length}</strong>
        </Alert>
      </Stack>
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "8px" }}
        >
          {utilisateurs.length}
        </Button>
        <Button
          variant="contained"
          color="success"
          style={{ marginLeft: "8px" }}
        >
          Nombre des utilisateurs disponibles :{" "}
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/ajouterutilisateur"
          style={{ marginLeft: "8px" }}
        >
          Ajouter
        </Button>
      </div>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom de l'utilisateur</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {utilisateurs &&
              utilisateurs.map((utilisateur) => (
                <TableRow key={utilisateur._id}>
                  <TableCell>{utilisateur.name}</TableCell>
                  <TableCell>{utilisateur.email}</TableCell>
                  <TableCell>{findRole(utilisateur.role)}</TableCell>
                  <TableCell>
                    <Avatar
                      alt="PhotoProfil"
                      src={utilisateur.image}
                      sx={{ width: 50, height: 50 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/modifierutilisateur/${utilisateur._id}`}
                      startIcon={<Edit />}
                    ></Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(utilisateur._id)}
                      startIcon={<Delete />}
                    ></Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LesUtilisateurs;
