import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, Button, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { zidUtilisateur } from "../Redux/userSlice";
import { getAllRoles } from "../AZ_UsersRoles/userRolesSlice";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";

const AjouterUtilisateur = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rolesImport = useSelector((state) => state.userRolesSlice.rolesList);

  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch]);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState([]);
  const [image, setImage] = useState("");

  const rolesOptions = rolesImport.map((r) => ({
    value: r._id,
    label: r.leRole,
  }));

  const handleAjouterUtilisateur = (e) => {
    e.preventDefault();

    const formValue = {
      name,
      password,
      email,
      role,
      image,
    };

    dispatch(zidUtilisateur(formValue));
    navigate("/tdbadmin#");
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      minHeight="600px"
    >
      <Grid item xs={12} md={6} lg={4}>
        <h1>Ajouter un utilisateur</h1>
        <form onSubmit={handleAjouterUtilisateur}>
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
            Ajouter
          </Button>
          <br />
          <Button
            onClick={() => navigate("/tdbadmin#")} // Utilisez le chemin approprié
            type="submit"
            variant="contained"
            color="error"
            fullWidth
            sx={{ marginTop: 1 }}
          >
            Annuler
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default AjouterUtilisateur;
