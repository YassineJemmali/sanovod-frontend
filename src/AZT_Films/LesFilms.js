import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFilms, supprimerFilm } from "./filmsSlice";
import { useNavigate, Link } from "react-router-dom";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Alert,
  Stack,
  AlertTitle,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { formatDate } from "./FormattedDate"; // Assurez-vous d'ajuster le chemin
import IM from "../IM"; // Importez le composant IM ici

const LesFilms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filmsImport = useSelector((state) => state.filmsSlice.listeFilms);
  const { roleConnected } = IM(); // Obtenir les informations de l'utilisateur connecté

  // useEffect pour actualiser la liste des films
  useEffect(() => {
    dispatch(getAllFilms());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(supprimerFilm(id));
  };

  // pour faire la modification

  return (
    <div>
      {/* // c'est la partie header avant le tableau */}
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="success">
          <AlertTitle>
            <strong>Liste des films</strong>
          </AlertTitle>
          Le nombre de films disponibles est{" "}
          <strong>{filmsImport.length}</strong>
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
          {filmsImport.length}
        </Button>
        <Button
          variant="contained"
          color="success"
          style={{ marginLeft: "8px" }}
        >
          Nombre de films disponibles :{" "}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/ajouterfilm")} // Utilisation de la nouvelle fonction de redirection
          style={{ marginLeft: "8px" }}
        >
          Ajouter
        </Button>
      </div>
      <br />
      {/* // c'est la partie header du tableau */}

      <TableContainer>
        <TableHead>
          <TableRow>
            <TableCell>Titre</TableCell>
            {/* <TableCell>Description</TableCell> */}
            <TableCell>Date de sortie</TableCell>
            <TableCell>Année</TableCell>
            <TableCell>Genres</TableCell>
            <TableCell>Plateformes</TableCell>
            <TableCell>Pays d'origine</TableCell>
            {/* <TableCell>Image</TableCell>
            <TableCell>Video</TableCell> */}
            {/* <TableCell>Note IMDB (*)</TableCell>
            <TableCell>Noteur IMDB (*)</TableCell>
            <TableCell>Lien IMDB (*)</TableCell>
            <TableCell>Note JustWatch (*)</TableCell>
            <TableCell>Noteur JustWatch (*)</TableCell>
            <TableCell>Lien JustWatch (*)</TableCell> */}
            <TableCell>Note</TableCell>
            <TableCell>Noteurs</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        {/* // c'est la partie body du tableau */}
        <TableBody>
          {filmsImport &&
            filmsImport.map((film) => (
              <TableRow key={film._id}>
                <TableCell>{film.titre}</TableCell>
                {/* <TableCell>{film.description}</TableCell> */}
                <TableCell>{formatDate(film.dateSortie)}</TableCell>
                <TableCell>{film.annee}</TableCell>
                <TableCell>
                  {film.genre.map((g) => g.categorie).join(", ")}
                </TableCell>
                <TableCell>
                  {film.plateformes.map((p) => p.unePlateforme).join(", ")}
                </TableCell>
                <TableCell>
                  {film.paysOrigine.map((p) => p.lePays).join(", ")}
                </TableCell>
                {/* ... autres champs */}
                {/* <TableCell>{film.image}</TableCell>
                <TableCell>{film.bandeAnnonce}</TableCell> */}
                {/* ... autres champs */}
                {/* <TableCell>{film.imdbNote}</TableCell>
                <TableCell>{film.imdbNoteurs}</TableCell>
                <TableCell>{film.imdbLien}</TableCell> */}
                {/* ... autres champs */}
                {/* <TableCell>{film.justWatchNote}</TableCell>
                <TableCell>{film.justWatchNoteurs}</TableCell>
                <TableCell>{film.justWatchLien}</TableCell> */}
                {/* ... autres champs */}
                {/* <TableCell>{film.moyenneNotes}</TableCell>
                <TableCell>{film.moyenneNoteurs}</TableCell> */}
                <TableCell>
                  {film.moyenneNotes ? film.moyenneNotes.toFixed(1) : ""}
                </TableCell>
                <TableCell>
                  {film.moyenneNoteurs ? film.moyenneNoteurs.toFixed(1) : ""}
                </TableCell>

                <TableRow key={film._id}>
                  {/* ... (autres cellules de la ligne existantes) */}
                  <TableCell>
                    <Stack direction="row">
                      <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`/modifierfilm/${film._id}`}
                        startIcon={<Edit />}
                      ></Button>
                      {roleConnected === "Admin" && ( // Vérifier le rôle de l'utilisateur
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDelete(film._id)}
                          startIcon={<Delete />}
                        ></Button>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableRow>
            ))}
        </TableBody>
      </TableContainer>
    </div>
  );
};

export default LesFilms;
