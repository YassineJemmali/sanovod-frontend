import React from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <AppBar
      position="static"
      color="primary"
      style={{ backgroundColor: "#0b41a4" }}
    >
      <Toolbar>
        <Container maxWidth="md">
          <Typography variant="body1" color="inherit">
            &copy; {new Date().getFullYear()} SANOVOD. Tous droits réservés.
            Réalisé avec amour par{" "}
            <Link
              href="https://www.facebook.com/yassine.ejjammali"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#ffffff", // Couleur par défaut du texte
                transition: "color 0.3s", // Transition fluide
                textDecoration: "none", // Supprimer le soulignement
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#cc0033"; // Couleur au survol
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#ffffff"; // Retour à la couleur par défaut
              }}
            >
              Yassine Jemmali
            </Link>
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
