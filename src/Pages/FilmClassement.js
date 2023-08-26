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
  FormControl,
  Select,
  MenuItem,
  Avatar,
  Alert,
} from "@mui/material"; // Assurez-vous d'ajuster les imports en fonction de MUI
import { useDispatch, useSelector } from "react-redux";
import { getAllFilms } from "../AZT_Films/filmsSlice";
import { getAllPlateformes } from "../AZ_Plateformes/plateformesSlice";
import { Link } from "react-router-dom";

const FilmClassement = () => {
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
  const [sortBy, setSortBy] = useState("noteMoyenne");

  const handlePlatformClick = (platformId) => {
    setSelectedPlatform(platformId);
  };

  const sortOptions = [
    { value: "noteMoyenne", label: "Note Moyenne" },
    { value: "noteursMoyens", label: "Noteurs Moyens" },
  ];

  const getSortValue = (film) => {
    if (sortBy === "noteMoyenne") {
      return film.moyenneNotes;
    } else if (sortBy === "noteursMoyens") {
      return film.moyenneNoteurs;
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  //   const filteredFilms = FilmImport.filter((film) => {
  //     if (selectedPlatform) {
  //       return film.plateformes.some((p) => p._id === selectedPlatform);
  //     }
  //     return true;
  //   }).sort((a, b) => getSortValue(b) - getSortValue(a));

  const filteredFilms = FilmImport.filter((film) => {
    if (selectedPlatform) {
      return film.plateformes.some((p) => p._id === selectedPlatform);
    }
    return true;
  }).sort((a, b) => getSortValue(b) - getSortValue(a));

  return (
    <Container>
      <Grid container>
        <Grid xs={12}>
          {/* <Alert
            variant="filled"
            style={{
              backgroundColor: "#cc0033",
              fontSize: "23px",
              fontWeight: "bold",
            }}
          >
            Toutes les plateformes{" "}
          </Alert> */}
          <Alert
            variant="filled"
            style={{
              backgroundColor: "#cc0033",
              fontSize: "23px",
              fontWeight: "bold",
            }}
          >
            Toutes les plateformes{" "}
            {filteredFilms.length > 0 && `(${filteredFilms.length} films)`}
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
        <Grid xs={12}>
          <FormControl fullWidth variant="filled">
            <Select value={sortBy} onChange={handleSortChange} sx={{ m: 2 }}>
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid container spacing={1}>
          {/* {filteredFilms.map((film) => (
            <Grid
              item
              xs={12}
              key={film._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            > */}
          {filteredFilms.map((film, index) => (
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
                            {index + 1}. {film.titre}
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

export default FilmClassement;
