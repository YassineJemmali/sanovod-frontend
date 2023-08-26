import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../AZ_Categories/categoriesSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Alert,
  Stack,
  AlertTitle,
} from "@mui/material";
import AjouterCategorie from "./AjouterCategorie";
import MiseAJourCategorie from "./MiseAJourCategorie";
import IM from "../IM"; // Importez le composant IM ici

import { supCategorie } from "./categoriesSlice";

const LesCategories = () => {
  const dispatch = useDispatch();
  const { roleConnected } = IM(); // Obtenir les informations de l'utilisateur connecté

  const categories = useSelector((state) => state.categorieRD.categorieslcol);

  React.useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  // pour l'ajout d'une catégorie
  const [openAddDialog, setOpenAddDialog] = useState(false); // État pour contrôler l'ouverture de la boîte de dialogue

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  // pour supprimer une catégorie
  const handleDelete = (id) => {
    dispatch(supCategorie(id));
  };

  // pour mettre à jour la catégorie
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [categoryToUpdate, setCategoryToUpdate] = useState(null);
  const [updatedCategory, setUpdatedCategory] = useState("");

  const handleUpdate = (categorie) => {
    setUpdatedCategory(categorie.categorie);
    setCategoryToUpdate(categorie);
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setUpdatedCategory(""); // Réinitialiser l'état à une valeur vide
    setOpenUpdateDialog(false);
    setCategoryToUpdate(null); // Réinitialiser l'état à null
  };

  return (
    <div>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="success">
          <AlertTitle>
            {" "}
            <strong>La liste des catégories</strong>{" "}
          </AlertTitle>
          Le nombre des catégories disponibles est{" "}
          <strong>{categories.length}</strong>
        </Alert>{" "}
      </Stack>
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "8px" }}
        >
          {categories.length}
        </Button>
        <Button
          variant="contained"
          color="success"
          style={{ marginLeft: "8px" }}
        >
          Nombre de catégories disponibles :{" "}
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddDialog}
          style={{ marginLeft: "8px" }}
        >
          Ajouter
        </Button>
      </div>
      <AjouterCategorie open={openAddDialog} onClose={handleCloseAddDialog} />
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom de la catégorie</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map(
              (
                categorie // Utilisez la fonction map pour parcourir la liste des catégories
              ) => (
                <TableRow key={categorie._id}>
                  <TableCell>{categorie.categorie}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdate(categorie)}
                    >
                      Modifier
                    </Button>
                    {roleConnected === "Admin" && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(categorie._id)}
                      >
                        Supprimer
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              )
            )}

            {categoryToUpdate && (
              <MiseAJourCategorie
                open={openUpdateDialog}
                onClose={handleCloseUpdateDialog}
                categorieToUpdate={categoryToUpdate}
                updatedCategory={updatedCategory}
                setUpdatedCategory={setUpdatedCategory}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LesCategories;
