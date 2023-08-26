import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mettreAFilm, getAllFilms } from "./filmsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategories } from "../AZ_Categories/categoriesSlice";
import { getAllPlateformes } from "../AZ_Plateformes/plateformesSlice";
import { obtenirTousLesPays } from "../AZ_Pays/paysSlice";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import de Bootstrap CSS
// import { MDBInput } from "mdb-react-ui-kit"; // Importer les composants MDB nécessaires
// import Select from "react-select";
// import SelectMUI from "react-select"; // Utilisez le composant Select de MUI si disponible

// Import MUI
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  Stack,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
} from "@mui/material";

import IM from "../IM";
import { AnnulationRetour } from "../Zactions/AnnulationRMenu";

import { generateYoutubeIframe } from "./LienVideo";
import { formatDate } from "./FormattedDate"; // Assurez-vous d'ajuster le chemin

const ModifierFilm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { roleConnected } = IM();

  //import des states

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

  // déclaration de l'ID de film à modifier
  const params = useParams();
  const idFilmAModifier = params.id; // Supposons que le paramètre s'appelle 'id'

  const filmAModifier = FilmImport.find((film) => film._id === idFilmAModifier);

  console.log(filmAModifier.genre);
  console.log(filmAModifier.genre.categorie);

  // déclaration de l'etat local des champs
  // {formatDate(filmAModifier.dateSortie)}
  const [titre, setTitre] = useState(filmAModifier.titre);
  const [description, setDescription] = useState(filmAModifier.description);
  const [dateSortie, setDateSortie] = useState(
    formatDate(filmAModifier.dateSortie)
  );
  const [annee, setAnnee] = useState(filmAModifier.annee);
  const [genre, setGenre] = useState(
    filmAModifier.genre.map((genre) => genre._id)
  );
  const [plateformes, setPlateformes] = useState(
    filmAModifier.plateformes.map((plate) => plate._id)
  );
  const [paysOrigine, setPaysOrigine] = useState(
    filmAModifier.paysOrigine.map((pays) => pays._id)
  );
  const [image, setImage] = useState(filmAModifier.image);
  const [bandeAnnonce, setBandeAnnonce] = useState(filmAModifier.bandeAnnonce);
  const [imdbNote, setImdbNote] = useState(filmAModifier.imdbNote);
  const [imdbNoteurs, setImdbNoteurs] = useState(filmAModifier.imdbNoteurs);
  const [imdbLien, setImdbLien] = useState(filmAModifier.imdbLien);
  const [justWatchNote, setJustWatchNote] = useState(
    filmAModifier.justWatchNote
  );
  const [justWatchNoteurs, setJustWatchNoteurs] = useState(
    filmAModifier.justWatchNoteurs
  );
  const [justWatchLien, setJustWatchLien] = useState(
    filmAModifier.justWatchLien
  );
  const [moyenneNotes, setMoyenneNotes] = useState(filmAModifier.moyenneNotes);
  const [moyenneNoteurs, setMoyenneNoteurs] = useState(
    filmAModifier.moyenneNoteurs
  );

  // ajouter le calcul pour les notes et les noteurs
  const moyenneNotesCalc =
    (imdbNote + justWatchNote) / 2 || imdbNote || justWatchNote;

  // Calcul de la moyenne des noteurs si imdbNoteurs et justWatchNoteurs sont présents
  const moyenneNoteursCalc =
    (imdbNoteurs + justWatchNoteurs) / 2 || imdbNoteurs || justWatchNoteurs;

  // Options pour les champs de sélection
  const genreOptions = CategoriesImport.map((category) => ({
    value: category._id,
    label: category.categorie,
  }));

  const plateformesOptions = PlateformesImport.map((plateforme) => ({
    value: plateforme._id,
    label: plateforme.unePlateforme,
  }));
  const paysOrigineOptions = PaysImport.map((pays) => ({
    value: pays._id,
    label: pays.lePays,
  }));

  const handleModifierFilm = (e) => {
    e.preventDefault();

    // création des champs

    const mettreAJourFilm = {
      id: idFilmAModifier, // Utilisez l'ID du film à modifier
      titre,
      description,
      dateSortie,
      annee,
      genre,
      plateformes,
      paysOrigine,
      image,
      bandeAnnonce,
      imdbNote,
      imdbNoteurs,
      imdbLien,
      justWatchNote,
      justWatchNoteurs,
      justWatchLien,
      moyenneNotes: moyenneNotesCalc,
      moyenneNoteurs: moyenneNoteursCalc,
    };
    dispatch(mettreAFilm(mettreAJourFilm));
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
    <Container className="mt-5">
      <Typography
        variant="h1"
        style={{
          fontSize: "34px",
          fontWeight: "bold",
          textAlign: "center",
          paddingBottom: "10px",
        }}
      >
        Modifier le film
      </Typography>{" "}
      <form onSubmit={handleModifierFilm}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Titre"
                focused
                type="text"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Description"
                focused
                type="text"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </Grid>

          {/* Champ dateSortie */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label="Date de sortie"
                focused
                type="date"
                value={dateSortie}
                onChange={(e) => {
                  setDateSortie(e.target.value);
                  setAnnee(new Date(e.target.value).getFullYear());
                }}
              />
            </FormControl>
          </Grid>

          {/* Champ année */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label="Année"
                disabled
                InputProps={{
                  style: {
                    backgroundColor: "#ffcccc", // Couleur de fond rouge clair
                  },
                  readOnly: true, // Rend le champ en lecture seule
                }}
                type="text"
                value={annee}
                onChange={(e) => setAnnee(e.target.value)}
              />
            </FormControl>
          </Grid>

          {/* Champ genre */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Genre</InputLabel>
              <Select
                id="genre"
                multiple
                label="Genre"
                focused
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={
                          genreOptions.find((option) => option.value === value)
                            ?.label
                        }
                      />
                    ))}
                  </Box>
                )}
              >
                {genreOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Plateformes</InputLabel>
              <Select
                id="plateformes"
                multiple
                label="Plateformes"
                value={plateformes}
                onChange={(e) => setPlateformes(e.target.value)}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={
                          plateformesOptions.find(
                            (option) => option.value === value
                          )?.label
                        }
                      />
                    ))}
                  </Box>
                )}
              >
                {plateformesOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Pays d'origine</InputLabel>
              <Select
                id="paysOrigine"
                multiple
                label="Pays"
                value={paysOrigine}
                onChange={(e) => setPaysOrigine(e.target.value)}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={
                          paysOrigineOptions.find(
                            (option) => option.value === value
                          )?.label
                        }
                      />
                    ))}
                  </Box>
                )}
              >
                {paysOrigineOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Pour l'image et la bandeAnnonce */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label="Image"
                focused
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label="Bande-annonce"
                focused
                type="text"
                value={bandeAnnonce}
                onChange={(e) => setBandeAnnonce(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "315px",
                border: "2px solid green", // Ajoutez cette ligne pour la bordure verte
              }}
            >
              {image ? (
                <img
                  src={image}
                  alt="Aperçu"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "315px",
                    maxHeight: "315px",
                    width: "100%",
                  }}
                />
              ) : (
                <img
                  src="https://img.freepik.com/vecteurs-libre/modele-film-cinema_1284-47781.jpg"
                  alt="Aperçu Indicatif"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "315px",
                    maxHeight: "315px",
                    width: "100%",
                  }}
                />
              )}
            </div>
          </Grid>

          {/* <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Bande-annonce"
                focused
                type="text"
                value={bandeAnnonce}
                onChange={(e) => setBandeAnnonce(e.target.value)}
              />
            </FormControl>
          </Grid> */}

          <Grid item xs={6}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "315px",
                maxHeight: "315px",
                width: "100%",
                border: "2px solid green", // Ajoutez cette ligne pour la bordure verte
              }}
            >
              {generateYoutubeIframe(bandeAnnonce)}
            </div>
          </Grid>

          {/* Pour imdb */}
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                label="Note IMDb"
                focused
                type="number"
                value={imdbNote}
                onChange={(e) => setImdbNote(parseFloat(e.target.value))}
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                label="Noteurs IMDb"
                focused
                type="number"
                value={imdbNoteurs}
                onChange={(e) => setImdbNoteurs(parseFloat(e.target.value))}
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                label="Lien IMDb"
                focused
                type="text"
                value={imdbLien}
                onChange={(e) => setImdbLien(e.target.value)}
              />
            </FormControl>
          </Grid>

          {/* Pour juste watch */}
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                label="Note JustWatch"
                focused
                type="number"
                value={justWatchNote}
                onChange={(e) => setJustWatchNote(parseFloat(e.target.value))}
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                label="Noteurs JustWatch"
                focused
                type="number"
                value={justWatchNoteurs}
                onChange={(e) =>
                  setJustWatchNoteurs(parseFloat(e.target.value))
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                label="Lien JustWatch"
                focused
                type="text"
                value={justWatchLien}
                onChange={(e) => setJustWatchLien(e.target.value)}
              />
            </FormControl>
          </Grid>

          {/* Champs pour moyenneNotes */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label="Note Moyenne"
                disabled
                InputProps={{
                  style: {
                    backgroundColor: "#ffcccc", // Couleur de fond rouge clair
                  },
                  readOnly: true, // Rend le champ en lecture seule
                }}
                type="number"
                value={moyenneNotesCalc}
                onChange={(e) => setMoyenneNotes(parseFloat(e.target.value))}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label="Noteurs Moyens"
                disabled
                InputProps={{
                  style: {
                    backgroundColor: "#ffcccc", // Couleur de fond rouge clair
                  },
                  readOnly: true, // Rend le champ en lecture seule
                }}
                type="number"
                value={moyenneNoteursCalc}
                onChange={(e) => setMoyenneNoteurs(parseFloat(e.target.value))}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="center" spacing={2}>
              <Button type="submit" variant="contained" color="primary">
                Modifier
              </Button>
              <Button
                variant="outlined"
                onClick={() => AnnulationRetour(roleConnected, navigate)}
                className="btn btn-secondary"
              >
                Annuler
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ModifierFilm;
