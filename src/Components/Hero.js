// import des Hooks de React
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
// import des states
import { getAllFilms } from "../AZT_Films/filmsSlice";
import { getAllCategories } from "../AZ_Categories/categoriesSlice";
import { getAllPlateformes } from "../AZ_Plateformes/plateformesSlice";
import { obtenirTousLesPays } from "../AZ_Pays/paysSlice";
// import bibliothèque de MUI
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  CardMedia,
} from "@mui/material"; // Assurez-vous d'ajuster les imports en fonction de MUI
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
// import IM from "../IM";

const Hero = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { userIdLS, roleConnected } = IM(); // Utilisez les données extraites du composant IM
  // console.log(`mon ID :${userIdLS} et mon Role est :${roleConnected}`);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllPlateformes());
    dispatch(obtenirTousLesPays());
    dispatch(getAllFilms());
  }, [dispatch]);

  const CategoriesImport = useSelector(
    (state) => state.categorieRD.categorieslcol
  );
  const PlateformesImport = useSelector(
    (state) => state.plateformeRD.plateformeslcol
  );
  const PaysImport = useSelector((state) => state.paysSlice.payslcol);

  const FilmImport = useSelector((state) => state.filmsSlice.listeFilms);

  console.log(CategoriesImport);
  console.log(PlateformesImport);
  console.log(PaysImport);
  console.log(FilmImport);

  // État pour les champs de recherche et les filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  // Filtrer les films en fonction des critères
  const filteredFilms = FilmImport.filter((film) => {
    // Appliquer les filtres si sélectionnés
    const genreMatch = selectedGenre
      ? film.genre.some((g) => g._id === selectedGenre)
      : true;
    const platformMatch = selectedPlatform
      ? film.plateformes.some((p) => p.unePlateforme === selectedPlatform)
      : true;
    const countryMatch = selectedCountry
      ? film.paysOrigine.some((c) => c._id === selectedCountry)
      : true;

    // Filtrer en fonction du terme de recherche
    const searchMatch = film.titre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return genreMatch && platformMatch && countryMatch && searchMatch;
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Tri par date de publication décroissante

  return (
    <Container>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={3}>
          {/* Section de recherche */}
          <FormControl fullWidth variant="filled">
            <InputLabel id="search-label">Rechercher un film</InputLabel>
            <TextField
              labelId="search-label"
              fullWidth
              variant="filled"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          {/* Label pour le filtre par genre */}
          <FormControl fullWidth variant="filled">
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <MenuItem value="">
                <em>Tous</em>
              </MenuItem>
              {CategoriesImport.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.categorie}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          {/* Filtre par plateforme */}
          <FormControl fullWidth variant="filled">
            <InputLabel id="platform-label">Plateforme</InputLabel>
            <Select
              labelId="platform-label"
              id="platform-select"
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
            >
              <MenuItem value="">
                <em>Toutes</em>
              </MenuItem>
              {PlateformesImport.map((plateforme) => (
                <MenuItem key={plateforme._id} value={plateforme.unePlateforme}>
                  {plateforme.unePlateforme}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Filtre par pays d'origine */}
        <Grid item xs={12} md={3}>
          {/* Label pour le filtre par pays d'origine */}
          {/* Filtre par pays d'origine */}
          <FormControl fullWidth variant="filled">
            <InputLabel id="country-label">Pays d'origine</InputLabel>
            <Select
              labelId="country-label"
              id="country-select"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <MenuItem value="">
                <em>Tous</em>
              </MenuItem>
              {PaysImport.map((pays) => (
                <MenuItem key={pays._id} value={pays._id}>
                  {pays.lePays}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {filteredFilms.map((film) => (
          <Grid item xs={12} md={4} key={film._id}>
            <Card>
              <CardMedia
                component="img"
                alt={film.titre}
                width="100%"
                image={film.image} // Assurez-vous que chaque film a une propriété "image"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
              <CardContent>
                <Stack sx={{ justifyContent: "center", maxHeight: "80px" }}>
                  <Typography
                    align="center"
                    sx={{ fontSize: "23px", fontWeight: "bold" }}
                  >
                    {film.titre}
                  </Typography>
                  ;
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: "center" }}
                >
                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,
                    }}
                    alt="Remy Sharp"
                    src={film.plateformes[0].logoPlateforme}
                  />
                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,
                    }}
                    alt="Remy Sharp"
                    src={film.paysOrigine[0].leDrapeau}
                  />
                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,
                      backgroundColor: "#cc0033", // Couleur du cercle
                      color: "#fff", // Couleur du texte à l'intérieur du cercle
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {film.annee}
                  </Avatar>
                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,
                      backgroundColor: "#0b41a4", // Couleur du cercle
                      color: "#fff", // Couleur du texte à l'intérieur du cercle
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {film.moyenneNotes.toFixed(1)}
                  </Avatar>
                </Stack>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Link
                  to={`/film/${film._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="outlined"
                    size="medium"
                    sx={{
                      color: "#0b41a4", // Couleur du texte à l'intérieur du cercle
                    }}
                  >
                    Voir détails
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Hero;
