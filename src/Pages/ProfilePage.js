import React, { useEffect, useState } from "react";
// import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../Redux/userSlice";
import { toast } from "react-toastify";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Typography,
  TextField,
  Box,
  Stack,
  Chip,
  CardMedia,
  FormControl,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { AnnulationRetour } from "../Zactions/AnnulationRMenu";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setImage(userInfo.image);
  }, [userInfo.setEmail, userInfo.setName, userInfo.setImage]);

  // const handleMajUtilisateur = (e) => {
  //   e.preventDefault();

  //   const formValue = {
  //     id: userIdConnected,
  //     name,
  //     password,
  //     email,
  //     image,
  //   };
  //   dispatch(updateProfile({ formValue, toast }));
  //   navigate("/tdbadmin#");
  // };

  // if (!connectedUser || !roleConnected) {
  //   return <div>Loading...</div>;
  // }

  const submitHandler = async (e) => {
    e.preventDefault();

    const formValue = {
      name,
      email,
      password,
      image,
    };
    dispatch(updateProfile({ formValue, toast, navigate }));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ marginBottom: 2, textAlign: "center" }}>
        <Chip
          label="Mettre à jour votre profil"
          color="primary"
          sx={{ fontSize: "1.5rem" }}
        />
      </Box>
      <form onSubmit={submitHandler}>
        <Box mt={3}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box mt={3}>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box mt={3}>
          <TextField
            label="Email Address"
            variant="outlined"
            value={email}
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box mt={3}>
          <TextField
            label="Image URL"
            variant="outlined"
            value={image}
            fullWidth
            onChange={(e) => setImage(e.target.value)}
          />
        </Box>
        <Box mt={3}>
          <TextField
            label="Le Role"
            variant="outlined"
            value={userInfo.leRole}
            fullWidth
            disabled
          />
        </Box>
        <br />
        <Avatar
          src={image} // Insérez l'URL de l'image ici
          alt="User Avatar"
          sx={{
            marginTop: 3,
            width: 100,
            height: 100,
            margin: "0 auto",
            marginBottom: 1,
          }}
        />
        <Box mt={3} sx={{ textAlign: "center" }}>
          {/* <Button type="submit" variant="contained" color="primary">
            Mettre à jour votre profil
          </Button> */}

          <Stack direction="row" justifyContent="center" spacing={2}>
            <Button type="submit" variant="contained" color="primary">
              Mettre à jour votre profil
            </Button>
            <Button
              variant="outlined"
              onClick={() => AnnulationRetour(userInfo.leRole, navigate)}
              className="btn btn-secondary"
            >
              Annuler
            </Button>
          </Stack>
        </Box>
      </form>
    </Container>
  );
};

export default ProfilePage;
