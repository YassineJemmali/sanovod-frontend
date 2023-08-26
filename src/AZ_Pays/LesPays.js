import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenirTousLesPays, supprimerPays } from "./paysSlice";
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
import AjouterPays from "./AjouterPays";
import MiseAJourPays from "./MiseAJourPays";
import IM from "../IM"; // Importez le composant IM ici

const LesPays = () => {
  const dispatch = useDispatch();
  const { roleConnected } = IM();

  const pays = useSelector((state) => state.paysSlice.payslcol);

  useEffect(() => {
    dispatch(obtenirTousLesPays());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(supprimerPays(id));
  };

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [paysToUpdate, setPaysToUpdate] = useState(null);

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleUpdate = (pays) => {
    setPaysToUpdate(pays);
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    setPaysToUpdate(null);
  };

  return (
    <div>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="success">
          <AlertTitle>
            <strong>Liste des pays</strong>
          </AlertTitle>
          Le nombre de pays enregistrés est <strong>{pays.length}</strong>
        </Alert>
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
          {pays.length}
        </Button>
        <Button
          variant="contained"
          color="success"
          style={{ marginLeft: "8px" }}
        >
          Nombre de plateformes disponibles :{" "}
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
      <AjouterPays open={openAddDialog} onClose={handleCloseAddDialog} />
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom du pays</TableCell>
              <TableCell>Drapeau</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pays.map((pays) => (
              <TableRow key={pays._id}>
                <TableCell>{pays.lePays}</TableCell>
                <TableCell>
                  <img
                    src={pays.leDrapeau}
                    alt={pays.lePays}
                    style={{ width: "50px", height: "50px" }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(pays)}
                  >
                    Modifier
                  </Button>
                  {roleConnected === "Admin" && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(pays._id)}
                    >
                      Supprimer
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {paysToUpdate && (
              <MiseAJourPays
                open={openUpdateDialog}
                onClose={handleCloseUpdateDialog}
                paysToUpdate={paysToUpdate}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LesPays;
