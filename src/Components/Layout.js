import React from "react";
import Grid from "@mui/material/Grid";
import LesCategories from "../AZ_Categories/lesCategories";

const Layout = ({ children }) => {
  return (
    <Grid container direction="column">
      {/* Partie de la navigation */}

      {/* Partie du contenu principal */}
      <Grid item container>
        {/* Ajoutez ici d'autres composants pour le contenu principal */}
        <Grid item xs={12} md={3}>
          Les catégories
          {/* Colonne pour la navigation */}
          {/* Vous pouvez ajouter votre Sidebar ici */}
        </Grid>
        <Grid item xs={12} md={9}>
          {/* Colonne pour le contenu principal */}
          {children}
          <LesCategories />

          {/* Afficher le contenu principal passé en tant qu'enfant */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Layout;
