import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useState, useEffect } from "react";
import { Button, Modal } from "@mui/material";
import axios from "axios";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

import Header from "../../../../schema/Header";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SearchIcon from "@mui/icons-material/Search";
import {

  InputAdornment,
  IconButton,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { Button,  Modal, Typography} from '@mui/material';

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #ffc107",
  boxShadow: 24,
  p: 4,
  borderRadius:'5px'
};



const breadcrumbs = [
  <Link
    underline="hover"
    key="1"
    color="inherit"
    to="/item_master"
    className="text-decoration-none"
    style={{ fontSize: "15px" }}
  >
    Item List
  </Link>,
  <Typography
    key="4"
    color="text.primary"
    style={{ fontSize: "15px", color: "gray" }}
  >
   Group
  </Typography>,
];

export default function AltUnit() {
  const [alternativeUnits, setAlternativeUnits] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [formData, setFormData] = useState({ name: "" });
  const [editingUnit, setEditingUnit] = useState(null);
  const [viewingUnit, setViewingUnit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);

  const fetchAlternativeUnits = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/alternative-units"
      );
      setAlternativeUnits(response.data);
      setFilteredUnits(response.data);
    } catch (error) {
      console.error("Error fetching alternative units:", error);
    }
  };

  useEffect(() => {
    fetchAlternativeUnits();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredUnits(
      alternativeUnits.filter((unit) => unit.name.toLowerCase().includes(value))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUnit) {
        // Update the alternative unit
        await axios.put(
          `http://localhost:5000/api/alternative-units/${editingUnit._id}`,
          formData
        );
        toast.success("Alternative Unit updated successfully!");
      } else {
        // Add the alternative unit
        await axios.post(
          "http://localhost:5000/api/alternative-units",
          formData
        );
        toast.success("Alternative & Main Unit added successfully!");
  
        // Also add the unit to the 'units' database
        await axios.post(
          "http://localhost:5000/api/units",
          { name: formData.name }
        );
        // toast.success("Unit added to Units database successfully!");
      }
  
      // Clear form data and close modal
      setFormData({ name: "" });
      setEditingUnit(null);
      fetchAlternativeUnits(); // Refresh the list of alternative units
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error saving alternative unit:", error);
    }
  };

  const handleEdit = (unit) => {
    setFormData({ name: unit.name });
    setEditingUnit(unit);
    handleOpen();
  };

  const handleView = (unit) => {
    setViewingUnit(unit);
    setViewOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/alternative-units/${id}`);
      fetchAlternativeUnits();
    } catch (error) {
      console.error("Error deleting alternative unit:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditingUnit(null);
  };

  const handleViewClose = () => setViewOpen(false);

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      to="/item_master"
      className="text-decoration-none"
      style={{ fontSize: "15px" }}
    >
      Item List
    </Link>,
   
    <Typography
      key="4"
      color="text.primary"
      style={{ fontSize: "15px", color: "gray" }}
    >
      Item Master
    </Typography>,
  ];

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <Header />
              <Box component="main" sx={{ flexGrow: 1}}>
                <DrawerHeader />
                <ToastContainer />
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="row d-flex justify-content-between">
                        <div className="col-xl-6">
                          <div className="row">
                            <div className="col-xl-6">
                            <Button
                            variant="contained"
                            color="primary"
                            onClick={handleOpen}
                            size="small"
                            className="fw-bold"
                          >
                            Add Alter Unit
                          </Button>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6 d-flex justify-content-end">
                        <Grid item xs={12} md={6} lg={4} xl={3}>
                          <TextField
                            size="small"
                            fullWidth
                            id="search"
                            label="Search by Name"
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <IconButton>
                                    <SearchIcon />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                          {showNoResultsMessage && (
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              style={{ marginTop: "8px" }}
                            >
                              No results found.
                            </Typography>
                          )}
                        </Grid>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-12 d-xl-none mt-0 pt-0">
                      <Stack spacing={2}>
                        <Breadcrumbs
                          separator={<NavigateNextIcon fontSize="small" />}
                          aria-label="breadcrumb"
                        >
                          {breadcrumbs}
                        </Breadcrumbs>
                      </Stack>
                    </div>
                  </div>

                  <div className="row mt-4">

                 


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
                                Category Name
                              </TableCell>
                              <TableCell align="center" className="fw-bold">
                                Action
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredUnits.map((unit, index) => (
                              <TableRow key={unit._id}>
                                <TableCell align="right">{index + 1}</TableCell>
                                <TableCell align="right">{unit.name}</TableCell>

                                <TableCell align="center">
                                  <Button
                                    variant="contained"
                                    color="warning"
                                    onClick={() => handleView(unit)}
                                    size="small"
                                  >
                                    <RemoveRedEyeIcon />
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => handleEdit(unit)}
                                    style={{ marginLeft: "10px" }}
                                    size="small"
                                  >
                                    <EditRoundedIcon />
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDelete(unit._id)}
                                    style={{ marginLeft: "10px" }}
                                    size="small"
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      <Modal open={open} onClose={handleClose}>
                        <Box sx={style}>
                        {/* <h4 className="text-center">Add Alternative Unit</h4> */}
                          <form onSubmit={handleSubmit}>
                            <TextField
                              label="Alternative Unit Name"
                              name="name"
                              value={formData.name.replace(
                                /\b\w/g,
                                (char) => char.toUpperCase()
                              )}
                              onChange={handleChange}
                              fullWidth
                              margin="normal"
                              size="small"
                            />
                            <div className="d-flex justify-content-end">
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              className="d-flex justify-content-end me-2"
                            >
                              
                              {editingUnit ? "Update" : "Add"}
                            </Button>

                            <Button
                              type="submit"
                              variant="contained"
                              color="error"
                              className="d-flex justify-content-end"
                              onClick={handleClose}
                            >
                              Cancel
                             
                            </Button>     
                            </div>
                                              
                                               </form>
                        </Box>
                      </Modal>

                      <Modal open={viewOpen} onClose={handleViewClose}>
                        <Box sx={style}>
                          <h2>View Alternative Unit</h2>
                          {viewingUnit && (
                            <div>
                              <p>
                                <strong>Name:</strong> {viewingUnit.name}
                              </p>
                            </div>
                          )}
                        </Box>
                      </Modal>
                    </div>
                  </div>
                </div>
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}
