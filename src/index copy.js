import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import store from "./Redux/store";
import { Provider } from "react-redux";
import ProfilePage from "./Pages/ProfilePage";
import PrivateRoutes from "./Components/PrivateRoutes";
import Tdb from "./PagesTDB/TdbAdmin";
import AjouterFilm from "./AZT_Films/AjouterFilm";
import ModifierFilm from "./AZT_Films/ModifierFilm";
import Film from "./AZT_Films/Film";
import FilmPlateforme from "./Pages/FilmPlateforme";
// {/*URL des Routes */}
import AjouterRole from "./AZ_UsersRoles/AjouterRole";
import ModifierRole from "./AZ_UsersRoles/ModifierRole";
// {/*URL de gestion des utilisateurs */}
import AjouterUtilisateur from "./AZ_Users/AjouterUlisateur";
import ModifierUtilisateur from "./AZ_Users/MajUtilisateurs";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />

      {/*URL des logins */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/*URL pour gérer les utilisateurs pour l'admin */}
      <Route path="/ajouterutilisateur" element={<AjouterUtilisateur />} />
      <Route
        path="/modifierutilisateur/:id"
        element={<ModifierUtilisateur />}
      />

      {/*URL des films */}
      <Route path="/ajouterfilm" element={<AjouterFilm />} />
      <Route path="/modifierfilm/:id" element={<ModifierFilm />} />

      {/*URL pour afficher un film */}
      <Route path="/film/:id" element={<Film />} />

      {/*URL pour afficher les films selon un tri */}
      <Route path="/filmplateforme/" element={<FilmPlateforme />} />

      {/*URL des roles */}
      <Route path="/ajouterrole/" element={<AjouterRole />} />
      <Route path="/modifierrole/" element={<ModifierRole />} />

      {/* PrivateRoutes */}
      <Route path="" element={<PrivateRoutes />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/tdb" element={<Tdb />} />
        {/* <Route path="/tdb/lescategories" element={<LesCategories />} /> */}
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
