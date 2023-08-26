import React from "react";
import { Route, Routes } from "react-router-dom";
import TdbAdmin from "../PagesTDB/TdbAdmin";
import TdbModerateur from "../PagesTDB/TdbModérateur";

import AjouterFilm from "../AZT_Films/AjouterFilm";
import ModifierFilm from "../AZT_Films/ModifierFilm";
import AjouterRole from "../AZ_UsersRoles/AjouterRole";
import ModifierRole from "../AZ_UsersRoles/ModifierRole";
import AjouterUtilisateur from "../AZ_Users/AjouterUlisateur";
import ModifierUtilisateur from "../AZ_Users/MajUtilisateurs";
import ProfilePage from "../Pages/ProfilePage";
import PrivateRoutes from "../Components/PrivateRoutes";

const RoutesAdmin = () => {
  return (
    <Routes>
      <Route path="" element={<PrivateRoutes />}>
        <Route path="/" element={<TdbAdmin />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/tdbadmin" element={<TdbAdmin />} />
        <Route path="/tdbmmoderateur" element={<TdbModerateur />} />
        {/* Modifier film */}
        <Route path="/ajouterfilm" element={<AjouterFilm />} />
        <Route path="/modifierfilm/:id" element={<ModifierFilm />} />
        {/* Modifier role */}
        <Route path="/ajouterrole/" element={<AjouterRole />} />
        <Route path="/modifierrole/" element={<ModifierRole />} />
        {/* Modifier utilisateur */}
        <Route path="/ajouterutilisateur" element={<AjouterUtilisateur />} />
        <Route
          path="/modifierutilisateur/:id"
          element={<ModifierUtilisateur />}
        />
      </Route>
    </Routes>
  );
};

export default RoutesAdmin;
