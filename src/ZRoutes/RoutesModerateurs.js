import React from "react";
import { Route, Routes } from "react-router-dom";
import TdbModerateur from "../PagesTDB/TdbModérateur";
import AjouterFilm from "../AZT_Films/AjouterFilm";
import ModifierFilm from "../AZT_Films/ModifierFilm";
import AjouterRole from "../AZ_UsersRoles/AjouterRole";
import ModifierRole from "../AZ_UsersRoles/ModifierRole";
import ProfilePage from "../Pages/ProfilePage";
import PrivateRoutes from "../Components/PrivateRoutes";

const RoutesModerateur = () => {
  return (
    <Routes>
      <Route path="" element={<PrivateRoutes />}>
        <Route path="/" element={<TdbModerateur />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/tdbmmoderateur" element={<TdbModerateur />} />
        {/* Modifier film */}
        <Route path="/ajouterfilm" element={<AjouterFilm />} />
        <Route path="/modifierfilm/:id" element={<ModifierFilm />} />
        {/* Modifier role */}
        <Route path="/ajouterrole/" element={<AjouterRole />} />
        <Route path="/modifierrole/" element={<ModifierRole />} />
      </Route>
    </Routes>
  );
};

export default RoutesModerateur;
