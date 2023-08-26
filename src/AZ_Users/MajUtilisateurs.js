import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Grid,
  Button,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";

import Box from "@mui/material/Box";
import { getAllUtilisateurs, AdminUpdateUtilisateur } from "../Redux/userSlice";
import { getAllRoles } from "../AZ_UsersRoles/userRolesSlice";

const ModifierUtilisateur = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUtilisateurs());
    dispatch(getAllRoles());
  }, [dispatch]);

  const utilisateursImport = useSelector(
    (state) => state.userRd.utilisateurslkol
  );
  const rolesImport = useSelector((state) => state.userRolesSlice.rolesList);

  const params = useParams();
  const idUtilisateurMaj = params.id;

  const utilisateurAMaj = utilisateursImport.find(
    (u) => u._id === idUtilisateurMaj
  );

  const [name, setName] = useState(utilisateurAMaj.name);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(utilisateurAMaj.email);
  const [role, setRole] = useState([utilisateurAMaj.role]);
  const [image, setImage] = useState(utilisateurAMaj.image);

  const rolesOptions = rolesImport.map((r) => ({
    value: r._id,
    label: r.leRole,
  }));

  const handleMajUtilisateur = (e) => {
    e.preventDefault();

    const formValue = {
      id: utilisateurAMaj._id,
      name,
      password,
      email,
      role,
      image,
    };

    dispatch(AdminUpdateUtilisateur(formValue));
    navigate("/tdbadmin#");
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      minHeight="100%"
    >
      <Grid item xs={12} md={6} lg={4}>
        <h1>Mettre à jour l'utilisateur</h1>
        <form onSubmit={handleMajUtilisateur}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="Role">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="Role"
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value)}
            >
              {rolesOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Image"
            variant="outlined"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Avatar
            src={image} // Insérez l'URL de l'image ici
            alt="User Avatar"
            sx={{
              width: 100,
              height: 100,
              margin: "0 auto",
              marginBottom: 2,
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Mettre à jour
          </Button>
          <Button
            onClick={() => navigate("/tdbadmin#")} // Utilisez le chemin approprié
            variant="contained"
            color="error" // Vous pouvez ajuster la couleur ici
            fullWidth
            sx={{ marginTop: 1 }}
          >
            Retour
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default ModifierUtilisateur;
