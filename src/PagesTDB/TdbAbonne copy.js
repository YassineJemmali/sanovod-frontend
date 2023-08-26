import React from "react";
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
  Avatar,
} from "@mui/material"; // Assurez-vous d'ajuster les imports en fonction de MUI
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import IM from "../IM";

const TdbAbonne = () => {
  const films = useSelector((state) => state.filmsSlice.listeFilms); // Remplacez par le bon nom du slice de films
  const PlateformesImport = useSelector(
    (state) => state.plateformeRD.plateformeslcol
  );
  const { userIdConnected, roleConnected } = IM();

  const favorisFilms = films.filter((film) =>
    film.favoris.includes(userIdConnected)
  );

  return (
    <Container>
      <Grid container spacing={1}>
        {favorisFilms.map((film) => (
          <Grid
            item
            xs={12}
            key={film._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
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
                    <Typography
                      variant="h1"
                      sx={{ fontSize: "36px", fontWeight: "bold" }}
                    >
                      {film.titre}
                    </Typography>
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
                      Les notes externes :
                      {/* ... Autres chips pour les notes externes */}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      color="text.secondary"
                    >
                      Le nombre des noteurs externes :
                      {/* ... Autres chips pour le nombre de noteurs externes */}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link
                      to={`/film/${film._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="outlined"
                        size="medium"
                        sx={{ color: "#0b41a4" }}
                      >
                        Voir détails
                      </Button>
                    </Link>
                  </CardActions>
                </div>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TdbAbonne;
