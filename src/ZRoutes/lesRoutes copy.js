// lesRoutes.js

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
///////
import App from "../App";
import PrivateRoutes from "../Components/PrivateRoutes";
// config
import { Provider } from "react-redux";
import store from "../Redux/store";
// pages publiques
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import Film from "../AZT_Films/Film";
import FilmPlateforme from "../Pages/FilmPlateforme";
// page perso
import ProfilePage from "../Pages/ProfilePage";
// page privée qui nécessite une connexion
import TdbAdmin from "../PagesTDB/TdbAdmin";
import TdbModerateur from "../PagesTDB/TdbModérateur";

import AjouterFilm from "../AZT_Films/AjouterFilm";
import ModifierFilm from "../AZT_Films/ModifierFilm";
import AjouterRole from "../AZ_UsersRoles/AjouterRole";
import ModifierRole from "../AZ_UsersRoles/ModifierRole";
import AjouterUtilisateur from "../AZ_Users/AjouterUlisateur";
import ModifierUtilisateur from "../AZ_Users/MajUtilisateurs";

const AppRoutes = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<App />}>
            <Route index={true} element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/film/:id" element={<Film />} />
            <Route path="/filmplateforme/" element={<FilmPlateforme />} />
          </Route>

          {/* Routes privées (nécessitent une connexion) */}
          <Route path="" element={<PrivateRoutes />}>
            <Route path="/profile" element={<ProfilePage />} />
            {/* Les Tableaux de board */}
            <Route path="/tdbadmin" element={<TdbAdmin />} />
            <Route path="/tdbmmoderateur" element={<TdbModerateur />} />
            {/* Les actions */}
            <Route path="/ajouterfilm" element={<AjouterFilm />} />
            <Route path="/modifierfilm/:id" element={<ModifierFilm />} />
            <Route path="/ajouterrole/" element={<AjouterRole />} />
            <Route path="/modifierrole/" element={<ModifierRole />} />
            <Route
              path="/ajouterutilisateur"
              element={<AjouterUtilisateur />}
            />
            <Route
              path="/modifierutilisateur/:id"
              element={<ModifierUtilisateur />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default AppRoutes;
