import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import api from "../../../../../services/api";
import Header from "../../../../schema/Header";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function Salutation() {
  const [salutation, setSalutation] = useState("");
  const [salutations, setSalutations] = useState([]);
  const [error, setError] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleOpenDialog = (salutation = "", id = null) => {
    setSalutation(salutation);
    setEditId(id);
    setIsEditing(!!id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSalutation("");
    setEditId(null);
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/api/salutation/${editId}`, { salutation });
      } else {
        await api.post("/api/salutation", { salutation });
      }
      setSalutation("");
      handleCloseDialog();
      fetchSalutations(); // Refresh the list after adding/updating
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSalutations = async () => {
    try {
      const response = await api.get("/api/salutations");
      setSalutations(response.data);
    } catch (error) {
      console.error("Error fetching salutations:", error);
      setError("Failed to fetch salutations");
    }
  };

  useEffect(() => {
    fetchSalutations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/salutation/${id}`);
      setSalutations(salutations.filter((salutation) => salutation._id !== id));
    } catch (error) {
      console.error("Error deleting salutation:", error);
      setError("Failed to delete salutation");
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <Header />
              <Box component="main" sx={{ flexGrow: 1 }}>
                <DrawerHeader />
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="row d-flex justify-content-between">
                        <div className="col-xl-4">
                          <Button
                            variant="contained"
                            color="primary"
                            className="fw-bold"
                            size="small"
                            onClick={() => handleOpenDialog()}
                          >
                            Add Salutation
                          </Button>
                        </div>
                        <div className="col-xl-8 d-flex justify-content-end">
                          <Grid
                            container
                            spacing={2}
                            alignItems="center"
                            className="d-flex justify-content-end mb-2"
                          >
                            <Grid item xs={12} md={6} lg={4} xl={3}>
                              <TextField
                                size="small"
                                fullWidth
                                id="search"
                                label="Search by Name"
                                variant="outlined"
                              />
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-xl-12">
                      <TableContainer component={Paper}>
                        <Table
                          sx={{ minWidth: 650 }}
                          size="small"
                          aria-label="a dense table"
                          className="bordered"
                        >
                          <TableHead>
                            <TableRow style={{ background: "#bbdefb" }}>
                              <TableCell align="right" className="fw-bold">
                                #
                              </TableCell>
                              <TableCell align="right" className="fw-bold">
                                Salutation
                              </TableCell>
                              <TableCell align="center" className="fw-bold">
                                Action
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {salutations.length === 0 ? (
                              <TableRow>
                                <TableCell
                                  colSpan={3}
                                  align="center"
                                  className="text-secondary"
                                >
                                  No salutations available.
                                </TableCell>
                              </TableRow>
                            ) : (
                              salutations.map((salutation, index) => (
                                <TableRow key={salutation._id}>
                                  <TableCell align="right">
                                    <span>{index + 1}</span>
                                  </TableCell>
                                  <TableCell align="right">
                                    {salutation.salutation}
                                  </TableCell>
                                  <TableCell align="center">
                                    <Button
                                      variant="contained"
                                      color="success"
                                      style={{
                                        marginRight: "10px",
                                        background: "#a5d6a7",
                                      }}
                                      size="small"
                                      onClick={() =>
                                        handleOpenDialog(
                                          salutation.salutation,
                                          salutation._id
                                        )
                                      }
                                    >
                                      <EditRoundedIcon className="text-success" />
                                    </Button>
                                    <Button
                                      variant="contained"
                                      color="error"
                                      size="small"
                                      onClick={() =>
                                        handleDelete(salutation._id)
                                      }
                                      style={{ background: "#ffab91" }}
                                    >
                                      <DeleteIcon className="text-danger" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </div>
                </div>
              </Box>
            </Box>
          </div>
        </div>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {isEditing ? "Edit Salutation" : "Add Salutation"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="salutation"
              label="Salutation"
              type="text"
              size="small"
              fullWidth
              value={salutation}
              onChange={(e) => setSalutation(e.target.value)}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="error" variant="contained">
              Cancel
            </Button>
            <Button type="submit" color="success" variant="contained">
              {isEditing ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

