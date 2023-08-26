import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Grid,
  Button,
  Typography,
  Chip,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Box,
  TextField,
} from "@mui/material";
import { creerRole } from "./userRolesSlice";
import { tousPermissionsAction } from "../AZ_UsersRolesPermissions/userRolesPermissionsSlice";
import IM from "../IM";

const AjouterRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roleConnected } = IM();

  useEffect(() => {
    dispatch(tousPermissionsAction());
  }, [dispatch]);

  const permissionsImport = useSelector(
    (state) => state.userRolesPermissionsSlice.permissionsList
  );

  const [leRole, setLeRole] = useState("");
  const [permissions, setPermissions] = useState([]);

  const permissionsOptions = permissionsImport.map((permission) => ({
    value: permission._id,
    label: permission.action,
  }));

  const handleAjouterRole = (e) => {
    e.preventDefault();

    const nouveauRole = {
      leRole,
      permissions,
    };
    dispatch(creerRole(nouveauRole));
    if (roleConnected === "Admin") {
      navigate("/tdbadmin");
    } else if (roleConnected === "Modérateur") {
      navigate("/tdbmoderateur");
    } else if (roleConnected === "Abonné") {
      navigate("/tdbabonne");
    } else {
      navigate("/");
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      minHeight="600px"
    >
      <Grid item xs={12} md={6} lg={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Ajouter un Rôle
        </Typography>

        <form onSubmit={handleAjouterRole}>
          <TextField
            fullWidth
            variant="outlined"
            label="Nom du Rôle"
            value={leRole}
            onChange={(e) => setLeRole(e.target.value)}
            margin="normal"
          />

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-multiple-chip-label">Permissions</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={permissions}
              onChange={(e) => setPermissions(e.target.value)}
              input={
                <OutlinedInput id="select-multiple-chip" label="Permissions" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={
                        permissionsOptions.find(
                          (option) => option.value === value
                        )?.label
                      }
                    />
                  ))}
                </Box>
              )}
            >
              {permissionsOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Créer le Rôle
          </Button>
        </form>

        <Button
          variant="outlined"
          component={RouterLink}
          to="/tdbadmin"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Retour à la liste des rôles
        </Button>
      </Grid>
    </Grid>
  );
};

export default AjouterRole;
