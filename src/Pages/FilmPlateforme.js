import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Chip,
  CardMedia,
} from "@mui/material"; // Assurez-vous d'ajuster les imports en fonction de MUI
import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";

import { useDispatch, useSelector } from "react-redux";
import { getAllFilms } from "../AZT_Films/filmsSlice";
import { getAllPlateformes } from "../AZ_Plateformes/plateformesSlice";
import { Link } from "react-router-dom";

const PlatformPageWithFilters = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPlateformes());
    dispatch(getAllFilms());
  }, [dispatch]);

  const PlateformesImport = useSelector(
    (state) => state.plateformeRD.plateformeslcol
  );

  const FilmImport = useSelector((state) => state.filmsSlice.listeFilms);

  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const handlePlatformClick = (platformId) => {
    setSelectedPlatform(platformId);
  };

  const filteredFilms = FilmImport.filter((film) => {
    if (selectedPlatform) {
      return film.plateformes.some((p) => p._id === selectedPlatform);
    }
    return true;
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <Container>
      <Grid container>
        <Grid xs={12}>
          <Alert
            variant="filled"
            style={{
              backgroundColor: "#cc0033",
              fontSize: "23px",
              fontWeight: "bold",
            }}
          >
            Toutes les plateformes{" "}
          </Alert>
          <div>
            {PlateformesImport.map((platform) => (
              <Button
                key={platform._id}
                onClick={() => handlePlatformClick(platform._id)}
                variant={
                  selectedPlatform === platform._id ? "contained" : "outlined"
                }
                color="primary"
                startIcon={
                  <Avatar
                    alt={platform.unePlateforme}
                    src={platform.logoPlateforme}
                  />
                }
                sx={{ m: 1 }}
              >
                {platform.unePlateforme}
              </Button>
            ))}
            <Button
              onClick={() => setSelectedPlatform(null)}
              variant="outlined"
              color="primary"
              sx={{ m: 1 }}
            >
              Toutes
            </Button>
          </div>
        </Grid>
        <Grid xs={12} paddingBottom={1}>
          <Alert
            variant="filled"
            width="100%"
            style={{
              backgroundColor: "#f4be5b",
              fontSize: "23px",
              fontWeight: "bold",
            }}
          >
            Les nouveaux films
          </Alert>
        </Grid>
        <Grid container spacing={1}>
          {filteredFilms.map((film) => (
            <Grid
              item
              xs={12}
              key={film._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Card>
                <div style={{ display: "flex" }}>
                  <div style={{ flex: 1 }}>
                    <CardMedia
                      component="img"
                      alt={film.titre}
                      width="100%"
                      height="100%"
                      image={film.image}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          {/* Partie du titre au-dessus */}
                          <Typography
                            variant="h1"
                            sx={{
                              fontSize: "36px",
                              fontWeight: "bold",
                            }}
                          >
                            {film.titre}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          {/* Partie des détails */}
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="text.secondary"
                          >
                            Genres :{" "}
                            {film.genre.map((g) => (
                              <Chip
                                key={g._id}
                                label={g.categorie}
                                variant="outlined"
                              />
                            ))}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="text.secondary"
                          >
                            Les notes externes :{" "}
                            <Chip
                              label={film.imdbNote}
                              avatar={
                                <Avatar src="https://cdn.icon-icons.com/icons2/70/PNG/512/imdb_14058.png" />
                              }
                              variant="outlined"
                            />
                            <Chip
                              label={film.justWatchNote}
                              avatar={
                                <Avatar src="https://www.justwatch.com/blog/images/icon.png" />
                              }
                              variant="outlined"
                            />
                            <Chip
                              label={film.moyenneNotes.toFixed(2)}
                              avatar={
                                <Avatar src="https://icon-library.com/images/score-icon-png/score-icon-png-18.jpg" />
                              }
                              variant="outlined"
                            />
                            {/* ... Autres chips pour les notes externes */}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            color="text.secondary"
                          >
                            Le nombre des noteurs externes :{" "}
                            <Chip
                              label={film.imdbNoteurs}
                              avatar={
                                <Avatar src="https://cdn.icon-icons.com/icons2/70/PNG/512/imdb_14058.png" />
                              }
                              variant="outlined"
                            />
                            <Chip
                              label={film.justWatchNoteurs}
                              avatar={
                                <Avatar src="https://www.justwatch.com/blog/images/icon.png" />
                              }
                              variant="outlined"
                            />
                            <Chip
                              label={film.moyenneNoteurs}
                              avatar={
                                <Avatar src="https://icon-library.com/images/score-icon-png/score-icon-png-18.jpg" />
                              }
                              variant="outlined"
                            />
                            {/* ... Autres chips pour le nombre de noteurs externes */}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          {/* Partie du bouton en bas */}
                          <CardActions>
                            <Link
                              to={`/film/${film._id}`}
                              style={{ textDecoration: "none" }}
                            >
                              <Button
                                variant="outlined"
                                size="medium"
                                sx={{
                                  color: "#0b41a4",
                                }}
                              >
                                Voir détails
                              </Button>
                            </Link>
                          </CardActions>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlatformPageWithFilters;
