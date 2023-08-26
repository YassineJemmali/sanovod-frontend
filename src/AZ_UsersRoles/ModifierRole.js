import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
import { updateRole, getAllRoles } from "./userRolesSlice";
import { tousPermissionsAction } from "../AZ_UsersRolesPermissions/userRolesPermissionsSlice";
import IM from "../IM";

const ModifierRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roleConnected } = IM();

  useEffect(() => {
    dispatch(getAllRoles());
    dispatch(tousPermissionsAction());
  }, [dispatch]);

  const rolesListImport = useSelector(
    (state) => state.userRolesSlice.rolesList
  );
  const permissionsImport = useSelector(
    (state) => state.userRolesPermissionsSlice.permissionsList
  );

  const permissionsOptions = permissionsImport.map((permission) => ({
    value: permission._id,
    label: permission.action,
  }));

  const params = useParams();
  const idRoleMaj = params.id;

  const roleAModifier = rolesListImport.find((role) => role._id === idRoleMaj);

  const [leRole, setLeRole] = useState(roleAModifier.leRole);
  const [permissions, setPermissions] = useState(roleAModifier.permissions);

  const handleMajRole = (e) => {
    e.preventDefault();

    const roleMaj = {
      id: idRoleMaj,
      leRole,
      permissions,
    };
    dispatch(updateRole(roleMaj));
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
        <Typography variant="h4" align="center" gutterBottom>
          Modifier un Rôle
        </Typography>

        <form onSubmit={handleMajRole}>
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
            Mettre à jour le Rôle
          </Button>
        </form>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            if (roleConnected === "Admin") {
              navigate("/tdbadmin");
            } else if (roleConnected === "Modérateur") {
              navigate("/tdbmoderateur");
            } else if (roleConnected === "Abonné") {
              navigate("/tdbabonne");
            } else {
              navigate("/");
            }
          }}
          fullWidth
          sx={{ mt: 2 }}
        >
          Retour à la liste des rôles
        </Button>
      </Grid>
    </Grid>
  );
};

export default ModifierRole;
