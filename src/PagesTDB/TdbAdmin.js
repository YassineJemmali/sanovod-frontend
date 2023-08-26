import React, { useState } from "react";
import {
  MDBIcon,
  MDBCollapse,
  MDBRipple,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import LesCategories from "../AZ_Categories/lesCategories";
import LesPlateformes from "../AZ_Plateformes/LesPlateformes";
import LesUtilisateurs from "../AZ_Users/LesUtilisateurs";
import LesPays from "../AZ_Pays/LesPays";
import LesFilms from "../AZT_Films/LesFilms";
import LesRoles from "../AZ_UsersRoles/LesRoles";

const Sidebar = ({ onSelectSidebarItem }) => {
  return (
    <MDBCollapse show tag="nav" className="d-lg-block bg-white sidebar">
      <div className="position-sticky">
        <MDBListGroup flush className="mx-3 mt-4">
          <MDBRipple
            rippleTag="span"
            onClick={() => onSelectSidebarItem("Films")}
          >
            <MDBListGroupItem
              tag="a"
              href="#"
              action
              className="border-0 border-bottom rounded rounded"
            >
              <MDBIcon fas icon="tachometer-alt me-3" />
              Les Films{" "}
            </MDBListGroupItem>
          </MDBRipple>

          <MDBRipple
            rippleTag="span"
            onClick={() => onSelectSidebarItem("Plateformes")}
          >
            <MDBListGroupItem
              tag="a"
              href="#"
              action
              className="border-0 border-bottom rounded rounded"
            >
              <MDBIcon fas icon="tachometer-alt me-3" />
              Les Plateformes{" "}
            </MDBListGroupItem>
          </MDBRipple>
          <MDBRipple
            rippleTag="span"
            onClick={() => onSelectSidebarItem("categories")}
          >
            <MDBListGroupItem
              tag="a"
              href="#"
              action
              className="border-0 border-bottom rounded rounded"
            >
              <MDBIcon fas icon="tachometer-alt me-3" />
              Les Catégories{" "}
            </MDBListGroupItem>
          </MDBRipple>
          <MDBRipple
            rippleTag="span"
            onClick={() => onSelectSidebarItem("Pays")}
          >
            <MDBListGroupItem
              tag="a"
              href="#"
              action
              className="border-0 border-bottom rounded"
            >
              <MDBIcon fas icon="chart-line me-3" />
              Les Pays
            </MDBListGroupItem>
          </MDBRipple>
          <MDBRipple
            rippleTag="span"
            onClick={() => onSelectSidebarItem("Utilisateurs")}
          >
            <MDBListGroupItem
              tag="a"
              href="#"
              action
              className="border-0 border-bottom rounded"
            >
              <MDBIcon fas icon="chart-line me-3" />
              Utilisateurs
            </MDBListGroupItem>
          </MDBRipple>
          <MDBRipple
            rippleTag="span"
            onClick={() => onSelectSidebarItem("Roles")}
          >
            <MDBListGroupItem
              tag="a"
              href="#"
              action
              className="border-0 border-bottom rounded"
            >
              <MDBIcon fas icon="chart-line me-3" />
              Roles
            </MDBListGroupItem>
          </MDBRipple>
        </MDBListGroup>
      </div>
    </MDBCollapse>
  );
};

const MainContent = ({ selectedItem }) => {
  // Rendre le composant approprié en fonction de l'élément sélectionné
  if (selectedItem === "categories") {
    return <LesCategories />;
  }
  if (selectedItem === "Films") {
    return <LesFilms />;
  }
  if (selectedItem === "Plateformes") {
    return <LesPlateformes />;
  }
  if (selectedItem === "Utilisateurs") {
    return <LesUtilisateurs />;
  }
  if (selectedItem === "Pays") {
    return <LesPays />;
  }
  if (selectedItem === "Roles") {
    return <LesRoles />;
  }

  // Ajoutez plus de conditions pour d'autres composants si nécessaire

  return null; // Ne rien afficher si aucun élément n'est sélectionné
};

const Tdb = () => {
  const [selectedItem, setSelectedItem] = useState("Films");

  const handleSidebarItemClick = (selectedItem) => {
    setSelectedItem(selectedItem);
  };

  return (
    <div style={{ display: "flex" }}>
      {/* 3/12 Sidebar */}
      <div
        style={{
          flex: 1,
          maxWidth: "20%",
        }}
      >
        <Sidebar onSelectSidebarItem={handleSidebarItemClick} />
      </div>

      {/* 9/12 Main Content */}
      <div style={{ flex: 1, maxWidth: "100%" }}>
        <MainContent selectedItem={selectedItem} />
      </div>
    </div>
  );
};

export default Tdb;
