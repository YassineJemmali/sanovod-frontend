import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { login } from "../Redux/userSlice";
import { toast } from "react-toastify";
import IM from "../IM";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Dispatch de l'action de connexion pour obtenir les informations de l'utilisateur
      await dispatch(login({ formValue, toast }));

      // Redirection en utilisant les informations de rôle directement depuis le composant IM
      const { roleConnected } = IM();

      if (roleConnected === "Admin") {
        // Rediriger vers la page d'administration
        navigate("/tdbadmin");
      } else if (roleConnected === "Modérateur") {
        // Rediriger vers la page de modérateur
        navigate("/tdbmoderateur");
      } else if (roleConnected === "Abonné") {
        // Rediriger vers la page d'abonné
        navigate("/tdbabonne");
      } else {
        // Rediriger vers la page par défaut (peut être personnalisée)
        navigate("/");
      }
    } catch (error) {
      // Gérer les erreurs ici (par exemple, afficher un message d'erreur)
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Se Connecter{" "}
        </Typography>
        <Box
          component="form"
          onSubmit={submitHandler}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={changeHandler}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={changeHandler}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }} // Custom styles here
          >
            Se Connecter{" "}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="http://localhost:3000/register" variant="body2">
                {"Pas de compte ? Inscrivez-vous"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
