import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import NavHeader from "./NavHeader"; // Import du composant NavHeader
import Footer from "./Footer"; // Import du composant NavHeader

const PrivateRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div>
      {/* <NavHeader /> Afficher le composant NavHeader */}
      <br />
      {userInfo ? <Outlet /> : <Navigate to="/login" replace />}
      <br />
      {/* <Footer /> Afficher le composant NavHeader */}
    </div>
  );
};

export default PrivateRoutes;
