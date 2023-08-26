import React from "react";
import { Route, Routes } from "react-router-dom";
import TdbAbonne from "../PagesTDB/TdbAbonne";

const RoutesAbonnes = () => {
  return (
    <Routes>
      <Route path="/" element={<TdbAbonne />} />
    </Routes>
  );
};

export default RoutesAbonnes;
