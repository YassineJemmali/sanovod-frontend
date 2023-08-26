import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlateformes, supprimerPlateforme } from "./plateformesSlice";
import AjouterPlateforme from "./AjouterPlateforme";
import MiseAJourPlateforme from "./MiseAJourPlateforme";
// import iM
import IM from "../IM"; // Importer le composant iM
// import MUI
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

const LesPlateformes = () => {
  const dispatch = useDispatch();

  const { roleConnected } = IM();

  const plateformesImport = useSelector(
    (state) => state.plateformeRD.plateformeslcol
  );

  console.log(plateformesImport);

  useEffect(() => {
    dispatch(getAllPlateformes());
  }, [dispatch]);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [plateformeToUpdate, setPlateformeToUpdate] = useState(null);

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleDelete = (id) => {
    dispatch(supprimerPlateforme(id));
  };

  const handleUpdate = (plateforme) => {
    setPlateformeToUpdate(plateforme);
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    setPlateformeToUpdate(null);
  };

  return (
    <div>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="success">
          <AlertTitle>
            <strong>La liste des plateformes</strong>
          </AlertTitle>
          Le nombre des plateformes disponibles est{" "}
          <strong>{plateformesImport.length}</strong>
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
          {plateformesImport.length}
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
      <AjouterPlateforme open={openAddDialog} onClose={handleCloseAddDialog} />
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom de la plateforme</TableCell>
              <TableCell>Logo de la plateforme</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plateformesImport &&
              plateformesImport.map((el) => (
                <TableRow key={el._id}>
                  <TableCell>{el.unePlateforme}</TableCell>
                  <TableCell>
                    <img
                      src={el.logoPlateforme}
                      alt={`Logo indisponible`}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdate(el)}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(el._id)}
                      style={{
                        display: roleConnected === "Admin" ? "block" : "none",
                      }}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {plateformeToUpdate && (
        <MiseAJourPlateforme
          open={openUpdateDialog}
          onClose={handleCloseUpdateDialog}
          plateformeToUpdate={plateformeToUpdate}
        />
      )}
    </div>
  );
};

export default LesPlateformes;
