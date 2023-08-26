import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import Film from "../AZT_Films/Film";
import FilmPlateforme from "../Pages/FilmPlateforme";

const RoutesPubliques = () => {
  return (
    <Routes>
      <Route index={true} element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/film/:id" element={<Film />} />
      <Route path="/filmplateforme/" element={<FilmPlateforme />} />
    </Routes>
  );
};

export default RoutesPubliques;
