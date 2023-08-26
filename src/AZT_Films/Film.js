import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  CardMedia,
  Checkbox,
  Grid,
} from "@mui/material";
import { generateYoutubeIframe } from "./LienVideo";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import IM from "../IM";

import {
  ajouterUtilisateurAuxFavoris,
  supprimerUtilisateurDesFavoris,
} from "../AZT_Favories/favoriesSlice";
import PopupFilmFavori from "./PopupFilmFavori";

const Film = () => {
  const dispatch = useDispatch();
  const filmsImport = useSelector((state) => state.filmsSlice.listeFilms);
  console.log(filmsImport);
  const { userIdConnected, roleConnected } = IM(); // Obtenez le rôle connecté

  const filmId = useParams();
  const leFilm = filmId.id;
  const leUtilisateur = userIdConnected;
  console.log(leUtilisateur);
  const film = filmsImport.find((film) => film._id === leFilm);

  const [estFavori, setEstFavori] = useState(false);

  useEffect(() => {
    if (estFavori) {
      console.log("ID de l'utilisateur :", userIdConnected);
      console.log("ID du film :", leFilm);
    }
  }, [estFavori, userIdConnected, leFilm]);

  // const handleFavoriteToggle = () => {
  //   if (estFavori) {
  //     setEstFavori(false);
  //   } else {
  //     setEstFavori(true);
  //   }
  // };

  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);

  const handleFavoriteToggle = () => {
    if (userIdConnected) {
      if (estFavori) {
        dispatch(
          supprimerUtilisateurDesFavoris({
            filmId: leFilm,
            userId: leUtilisateur,
          })
        )
          .unwrap()
          .then(() => {
            setEstFavori(false);
          })
          .catch((error) => {
            console.log("Erreur lors de la suppression du favori:", error);
          });
      } else {
        dispatch(
          ajouterUtilisateurAuxFavoris({
            filmId: leFilm,
            userId: leUtilisateur,
          })
        )
          .unwrap()
          .then(() => {
            setEstFavori(true);
          })
          .catch((error) => {
            console.log("Erreur lors de l'ajout du favori:", error);
          });
      }
    } else {
      setIsLoginPromptOpen(true);
    }
  };

  // const handleFavoriteToggle = () => {

  // };

  // const handleFavoriteToggle = () => {
  //   // Mettre à jour l'état local en fonction de la valeur précédente
  //   setEstFavori((cocher) => !cocher);
  // };

  console.log(estFavori);

  if (!film) {
    return <div>Le film n'a pas été trouvé.</div>;
  }

  return (
    <Container>
      <Card>
        <CardMedia
          component="img"
          alt={film.titre}
          //   height="720"
          width="100%"
          image={film.image}
        />
        <CardContent>
          <Typography
            variant="h1"
            sx={{
              fontSize: "36px",
              fontWeight: "bold",
              paddingBottom: "10px",
            }}
          >
            {film.titre} {" (Le Film) "}
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              checked={estFavori}
              onClick={handleFavoriteToggle}
              sx={{ cursor: "pointer" }}
            />
            {/*             
            {estFavori ? (
              <Favorite onClick={handleFavoriteToggle} />
            ) : (
              <FavoriteBorder onClick={handleFavoriteToggle} />
            )} */}
            {/* <Checkbox
              {...label}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
            /> */}
            {/* {userIdConnected ? (
              estFavori ? (
                <Favorite onClick={handleFavoriteToggle} />
              ) : (
                <FavoriteBorder onClick={handleFavoriteToggle} />
              )
            ) : (
              <FavoriteBorder onClick={() => setIsLoginPromptOpen(true)} />
            )} */}
          </Typography>
          {/* la partie des données globales */}
          {/* la partie de description */}
          <Typography
            variant="h2"
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            Données sur le film {film.titre}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            Plateformes :{" "}
            {film.plateformes.map((p) => (
              <Chip
                key={p._id}
                avatar={<Avatar src={p.logoPlateforme} />}
                label={p.unePlateforme}
                variant="outlined"
              />
            ))}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            Genres :{" "}
            {film.genre.map((g) => (
              <Chip key={g._id} label={g.categorie} variant="outlined" />
            ))}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            Pays d'origine :{" "}
            {film.paysOrigine.map((c) => (
              <Chip
                key={c._id}
                avatar={<Avatar src={c.leDrapeau} />} // Remplacez par le chemin vers le drapeau
                label={c.lePays}
                variant="outlined"
                sx={{ marginRight: 1 }} // Espacement entre les chips
              />
            ))}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            Année : <Chip label={film.annee} variant="outlined" />
          </Typography>
          {/* la partie des notes du film */}
          <Typography
            variant="h2"
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            Les notes du {film.titre}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
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
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
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
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            La note moyenne :{" "}
            <Chip
              label={film.moyenneNotes.toFixed(2)}
              avatar={
                <Avatar src="https://icon-library.com/images/score-icon-png/score-icon-png-18.jpg" />
              }
              variant="outlined"
            />
          </Typography>

          <Typography gutterBottom variant="body2" color="text.secondary">
            Les noteurs Moyens : :{" "}
            <Chip label={film.moyenneNoteurs} variant="outlined" />
          </Typography>
          {/* la partie de description */}
          <Typography
            gutterBottom
            variant="h2"
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            Le résumé du film {film.titre}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {film.description}
          </Typography>
          {/* la partie de la bonde annonce */}
          <Typography
            gutterBottom
            variant="h2"
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            La bande annonce du film {film.titre}
          </Typography>
          <Grid>{generateYoutubeIframe(film.bandeAnnonce)}</Grid>
        </CardContent>
      </Card>
      <PopupFilmFavori
        open={isLoginPromptOpen}
        onClose={() => setIsLoginPromptOpen(false)}
      />
    </Container>
  );
};

export default Film;
