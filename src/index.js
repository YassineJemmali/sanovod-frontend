import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// autres paramètre
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Import de redux
import store from "./Redux/store";
import { Provider } from "react-redux";
// import Private Routes
import PrivateRoutes from "./Components/PrivateRoutes";
import IM from "./IM";

// {/*Routes publiques */}
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import FilmPlateforme from "./Pages/FilmPlateforme";
import FilmClassement from "./Pages/FilmClassement";
import Film from "./AZT_Films/Film";

// {/*TDB des Roles */}
import TdbAdmin from "./PagesTDB/TdbAdmin";
import TdbModerateur from "./PagesTDB/TdbModérateur";
import TdbAbonne from "./PagesTDB/TdbAbonne";

import ProfilePage from "./Pages/ProfilePage";

// Modifier film
import AjouterFilm from "./AZT_Films/AjouterFilm";
import ModifierFilm from "./AZT_Films/ModifierFilm";

// Modifier role
import AjouterRole from "./AZ_UsersRoles/AjouterRole";
import ModifierRole from "./AZ_UsersRoles/ModifierRole";

// Modifier utilisateur
import AjouterUtilisateur from "./AZ_Users/AjouterUlisateur";
import ModifierUtilisateur from "./AZ_Users/MajUtilisateurs";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/film/:id" element={<Film />} />
      <Route path="/filmplateforme/" element={<FilmPlateforme />} />
      <Route path="/filmclassement/" element={<FilmClassement />} />

      {/* PrivateRoutes */}
      {/* Routes privées (nécessitent une connexion) */}
      <Route path="" element={<PrivateRoutes />}>
        <Route path="/profile" element={<ProfilePage />} />
        {/* Les Tableaux de board */}
        <Route path="/tdbadmin" element={<TdbAdmin />} />
        <Route path="/tdbmoderateur" element={<TdbModerateur />} />
        <Route path="/tdbabonne" element={<TdbAbonne />} />

        {/* Les actions */}
        {/* Les Films */}
        <Route path="/ajouterfilm" element={<AjouterFilm />} />
        <Route path="/modifierfilm/:id" element={<ModifierFilm />} />
        {/* Les roles */}
        <Route path="/ajouterrole/" element={<AjouterRole />} />
        <Route path="/modifierrole/:id" element={<ModifierRole />} />
        {/* Les utilisateurs */}
        <Route path="/ajouterutilisateur" element={<AjouterUtilisateur />} />
        <Route
          path="/modifierutilisateur/:id"
          element={<ModifierUtilisateur />}
        />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
