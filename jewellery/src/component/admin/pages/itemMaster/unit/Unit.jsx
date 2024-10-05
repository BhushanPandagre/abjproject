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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Header from "../../../../schema/Header";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Modal,
  Typography,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import axios from "axios";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
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
    color="text.secondary"
    style={{ fontSize: "15px" }}
  >
   Unit
  </Typography>,
];


export default function Unit() {

  const [units, setUnits] = useState([]);
  const [unitName, setUnitName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Add state for Add Unit modal
  const [updatedName, setUpdatedName] = useState('');
  const [itemsUsingUnit, setItemsUsingUnit] = useState([]);
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/units');
        setUnits(response.data);
      } catch (error) {
        console.error('Error fetching units:', error);
      }
    };

    fetchUnits();
  }, []);



  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredUnits(
      alternativeUnits.filter((unit) => unit.name.toLowerCase().includes(value))
    );
  };


  const handleAddUnit = async () => {
    try {
      // Add the unit to the 'units' database
      const response = await axios.post("http://localhost:5000/api/units", {
        name: unitName,
      });
      const addedUnit = response.data;
  
      // Also add the unit to the 'alternative-units' database
      await axios.post("http://localhost:5000/api/alternative-units", {
        name: unitName,
      });
  
      // Update the state with the new unit
      setUnits((prevUnits) => [...prevUnits, addedUnit]);
      setUnitName("");
      setIsAddModalOpen(false); // Close the modal after adding the unit
    } catch (error) {
      console.error("Error adding unit:", error);
    }
  };

  const handleDeleteUnit = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/units/${id}`);
      setUnits(units.filter(unit => unit._id !== id));
    } catch (error) {
      if (error.response && error.response.data.items) {
        setItemsUsingUnit(error.response.data.items);
        setSelectedUnit(units.find(unit => unit._id === id));
        setIsViewModalOpen(true);
      } else {
        console.error('Error deleting unit:', error);
      }
    }
  };

  // const handleViewUnit = (unit) => {
  //   setSelectedUnit(unit);
  //   setIsViewModalOpen(true);
  // };

  const handleViewUnit = async (unit) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/units/${unit._id}/items`);
      setItemsUsingUnit(response.data);
      setSelectedUnit(unit);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error('Error fetching items for unit:', error);
    }
  };

  const handleUpdateUnit = (unit) => {
    setSelectedUnit(unit);
    setIsUpdateModalOpen(true);
    setUpdatedName(unit.name);
  };

  const handleUpdateUnitData = (updatedUnit) => {
    const updatedUnits = units.map(unit =>
      unit._id === updatedUnit._id ? updatedUnit : unit
    );
    setUnits(updatedUnits);
  };

  const handleUpdateUnitModalClose = () => {
    setIsUpdateModalOpen(false);
    setUpdatedName('');
  };

  const filteredUnits = units.filter(unit =>
    unit.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateUnitSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/units/${selectedUnit._id}`, { name: updatedName });
      handleUpdateUnitData(response.data);
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error('Error updating unit:', error);
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
              <Box component="main" sx={{ flexGrow: 1}}>
                <DrawerHeader />
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="row d-flex justify-content-between">
                        <div className="col-xl-6">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setIsAddModalOpen(true)}
                            size="small"
                          >
                            Add Unit
                          </Button>
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

                      <div className="row">
                    <div className="col-xl-12 d-xl-none">
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
                                Unit
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
                                    style={{ marginRight: "10px" }}
                                    size="small"
                                    onClick={() => handleViewUnit(unit)}
                                  >
                                    <RemoveRedEyeIcon />
                                  </Button>

                                  <Button
                                    variant="contained"
                                    color="success"
                                    style={{ marginRight: "10px" }}
                                    size="small"
                                    onClick={() => handleUpdateUnit(unit)}
                                  >
                                    <EditRoundedIcon />
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    onClick={() => handleDeleteUnit(unit._id)}
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      {/* View Unit Modal */}
                      {/* <Modal
                        open={isViewModalOpen}
                        onClose={() => setIsViewModalOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            minWidth: 400,
                          }}
                        >
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            gutterBottom
                          >
                            {selectedUnit
                              ? `Unit: ${selectedUnit.name}`
                              : "Unit"}
                          </Typography>
                          <Typography id="modal-modal-description" gutterBottom>
                            {selectedUnit ? `Unit ID: ${selectedUnit._id}` : ""}
                          </Typography>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => setIsViewModalOpen(false)}
                          >
                            Close
                          </Button>
                        </Box>
                      </Modal> */}




                       {/* Add Unit Modal */}
      <Modal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        aria-labelledby="modal-add-unit-title"
        aria-describedby="modal-add-unit-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          minWidth: 400,
        }}>
          <Typography id="modal-add-unit-title" variant="h6" component="h2" gutterBottom>
            Add Unit
          </Typography>
          <TextField
            label="Unit Name"
            value={unitName.replace(
              /\b\w/g,
              (char) => char.toUpperCase()
            )}
            onChange={(e) => setUnitName(e.target.value)}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <div className="d-flex justify-content-end">
          <Button variant="contained" color="primary" onClick={handleAddUnit}>
            Add
          </Button>
          <Button variant="contained" color="error" onClick={() => setIsAddModalOpen(false)} style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
          </div>
         
        </Box>
      </Modal>


<Modal
  open={isViewModalOpen}
  onClose={() => setIsViewModalOpen(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    minWidth: 400,
  }}>
    <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
      {selectedUnit ? `Unit: ${selectedUnit.name}` : 'Unit'}
    </Typography>
    <Typography id="modal-modal-description" gutterBottom>
      {selectedUnit ? `Unit ID: ${selectedUnit._id}` : ''}
    </Typography>
    <Typography variant="body1" component="p">
      Items using this unit:
    </Typography>
    <ul>
      {itemsUsingUnit.length > 0 ? (
        itemsUsingUnit.map(item => (
          <li key={item._id}>{item.name}</li>
        ))
      ) : (
        <li>No items using this unit</li>
      )}
    </ul>
    <Button variant="contained" onClick={() => setIsViewModalOpen(false)}>
      Close
    </Button>
  </Box>
</Modal>

                      {/* Update Unit Modal */}
                      <Modal
                        open={isUpdateModalOpen}
                        onClose={handleUpdateUnitModalClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            minWidth: 400,
                          }}
                        >
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            gutterBottom
                          >
                            {selectedUnit
                              ? `Update Unit: ${selectedUnit.name}`
                              : "Update Unit"}
                          </Typography>
                          <TextField
                            label="Unit Name"
                          
                            value={updatedName.replace(
                              /\b\w/g,
                              (char) => char.toUpperCase()
                            )}
                            onChange={(e) => setUpdatedName(e.target.value)}
                            variant="outlined"
                            fullWidth
                            style={{ marginBottom: "10px", marginTop: "10px" }}
                          />
                          <div className="d-flex justify-content-end mt-1">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleUpdateUnitSubmit}
                            >
                              Update
                            </Button>
                            <Button
                              variant="contained"
                              onClick={handleUpdateUnitModalClose}
                              style={{ marginLeft: "10px" }}
                              color="error"
                            >
                              Cancel
                            </Button>
                          </div>
                        </Box>
                      </Modal>

                      {/* Add Unit Modal */}
                      {/* <Modal
                        open={isAddModalOpen}
                        onClose={() => setIsAddModalOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            minWidth: 400,
                          }}
                        >
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            gutterBottom
                          >
                            Add Unit
                          </Typography>
                          <TextField
                            label="Unit Name"
                            value={unitName}
                            onChange={(e) => setUnitName(e.target.value)}
                            variant="outlined"
                            fullWidth
                            style={{ marginBottom: "10px", marginTop: "10px" }}
                          />
                          <div className="d-flex justify-content-end mt-1">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleAddUnit}
                            >
                              Add
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() => setIsAddModalOpen(false)}
                              style={{ marginLeft: "10px" }}
                              color="error"
                            >
                              Cancel
                            </Button>
                          </div>
                        </Box>
                      </Modal> */}

                      
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
