import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./auhSlice";
import categoriesSlice from "../AZ_Categories/categoriesSlice";
import plateformesSlice from "../AZ_Plateformes/plateformesSlice";
import paysSlice from "../AZ_Pays/paysSlice";
import filmsSlice from "../AZT_Films/filmsSlice";
import userRolesSlice from "../AZ_UsersRoles/userRolesSlice";
import userRolesPermissionsSlice from "../AZ_UsersRolesPermissions/userRolesPermissionsSlice";
import favoriesSlice from "../AZT_Favories/favoriesSlice";

const store = configureStore({
  reducer: {
    userRd: userReducer,
    auth: authReducer,
    categorieRD: categoriesSlice,
    plateformeRD: plateformesSlice,
    paysSlice: paysSlice,
    filmsSlice: filmsSlice,
    userRolesSlice: userRolesSlice,
    userRolesPermissionsSlice: userRolesPermissionsSlice,
    favoriesSlice: favoriesSlice,
  },
  devTools: true,
});

export default store;
