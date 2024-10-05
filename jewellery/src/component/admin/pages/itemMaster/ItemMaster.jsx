import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Header from "../../../schema/Header";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode } from '@fortawesome/free-solid-svg-icons'; 

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import Swal from "sweetalert2";
// import { useRef } from "react";
import withReactContent from "sweetalert2-react-content";
// import "./ItemMaster.css"
import Barcode from "react-barcode";
import CloseIcon from "@mui/icons-material/Close";
import Unit from "./unit/Unit";

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
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function ItemMaster() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const navigate = useNavigate();
  const [jewelryItems, setJewelryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  // const anchorRef = useRef(null);

  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);
  const [barcodeToScan, setBarcodeToScan] = useState("");
  const [barcodeItem, setBarcodeItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [units, setUnits] = useState([]);

  const handleView = (id) => {
    navigate(`/view_item/${id}`);
  };

  const handleUpdate = (id) => {
    navigate(`/update_item/${id}`);
  };

  const handleDelete = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Do you want to delete it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "swal-wide",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/jewelry-items/${id}`);
          setJewelryItems(jewelryItems.filter((item) => item._id !== id));
          setFilteredItems(filteredItems.filter((item) => item._id !== id));
          MySwal.fire("Deleted!", "Your item has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting jewelry item:", error);
          MySwal.fire(
            "Error!",
            "There was an error deleting the item.",
            "error"
          );
        }
      }
    });
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    setDropdownVisible(true);

    // Filter items based on search term
    const filtered = jewelryItems.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
  };


  useEffect(() => {
    const fetchUnits = async () => {
      try {
        // const response = await axios.get('http://localhost:5000/api/units');
        const response = await axios.get(`http://localhost:5000/api/units/${units._id}/items`);

        setUnits(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching units:', error);
      }
    };

    fetchUnits();
  }, []);

  useEffect(() => {
    // fetchData();
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/jewelry-items"
      );
      console.log(response.data);
      setJewelryItems(response.data);
      setFilteredItems(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };


  const filteredUnits = units.filter(unit =>
    unit.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  ///  Barcode start

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  const handleBarcodeChange = async (event) => {
    const barcode = event.target.value;
    setBarcodeToScan(mainUnitBarcode);
    if (mainUnitBarcode) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/jewelry-items/mainUnitBarcode/${mainUnitBarcode}`
        );
        console.log("mainUnitBarcode response:", response.data); // Debugging line
        if (response.data) {
          setBarcodeItem(response.data);
        } else {
          setBarcodeItem(null);
        }
      } catch (error) {
        console.error("Error fetching item by barcode:", error);
        setBarcodeItem(null);
      }
    } else {
      setBarcodeItem(null);
    }
  };

  const breadcrumbs = [
    <Link
      underline="hover"
      key="2"
      color="inherit"
      to="/add_group"
      style={{ fontSize: "15px" }}
      className="text-decoration-none"
    >
      Group
    </Link>,
    <Link
      underline="hover"
      key="3"
      color="inherit"
      to="/add_unit"
      style={{ fontSize: "15px" }}
      className="text-decoration-none"
    >
      Unit
    </Link>,
    <Typography
      key="4"
      color="text.primary"
      className="text-secondary"
      style={{ fontSize: "15px" }}
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
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="row d-flex justify-content-between">
                        <div className="col-xl-6">
                       

                      <Button
                            variant="contained"
                            color="info"
                            onClick={() => {
                              navigate("/add_item");
                            }}
                            style={{ fontWeight: "bold" }}
                            // onClick={handleOpen}
                          >
                            Add Item
                          </Button>
                          <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            slots={{ backdrop: Backdrop }}
                            slotProps={{
                              backdrop: {
                                timeout: 500,
                              },
                            }}
                          >
                            <Fade in={open}>
                              <Box sx={style} style={{ borderRadius: "8px" }}>
                                <Typography
                                  id="transition-modal-title"
                                  variant="h6"
                                  component="h2"
                                >
                                  Add User
                                </Typography>
                                <Typography
                                  id="transition-modal-description"
                                  sx={{ mt: 2 }}
                                >
                                  <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id=""
                                    label="First Name"
                                    name=""
                                    autoComplete=""
                                    autoFocus
                                  />
                                  <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id=""
                                    label="Last Name"
                                    name=""
                                    autoComplete=""
                                    autoFocus
                                  />
                                  <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id=""
                                    label="Email"
                                    name=""
                                    autoComplete=""
                                    autoFocus
                                  />
                                  <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                  />

                                  <TextField
                                    margin="normal"
                                    required
                                    id="outlined-select-currenc"
                                    select
                                    label="Select"
                                    defaultValue="EUR"
                                    // helperText="Please select your currency"
                                    fullWidth
                                  >
                                    <MenuItem>Sub User</MenuItem>
                                    <MenuItem>Cashier</MenuItem>
                                  </TextField>
                                </Typography>
                                <Typography>
                                  <div>
                                    <div className="row">
                                      <div className="col-xl-12 d-flex justify-content-end mt-3">
                                        <span className="">
                                          <Button
                                            size="small"
                                            variant="contained"
                                            color="info"
                                            className="me-2"
                                            onClick={handleClose}
                                          >
                                            close
                                          </Button>
                                        </span>
                                        <span className="">
                                          <Button
                                            size="small"
                                            variant="contained"
                                            color="success"
                                          >
                                            Submit
                                          </Button>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </Typography>
                              </Box>
                            </Fade>
                          </Modal>
                        </div>
                        <div className="col-xl-6 d-flex justify-content-end">
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
                          </Grid>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row d-xl-none">
                    <div className="col-xl-12 ">
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
                    {/* <div className="col-xl-12 d-flex justify-content-end ">
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
                        </Grid>
                    </div> */}

                    <div className="col-xl-12">
                      <TableContainer
                        component={Paper}
                        className="d-flex justify-content-center"
                      >
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
                              <TableCell align="left" className="fw-bold">
                                Item Name
                              </TableCell>
                              <TableCell align="left" className="fw-bold">
                                Mani Unit Stock
                              </TableCell>
                              <TableCell align="center" className="fw-bold">
                                Mani Unit Stock
                              </TableCell>
                              <TableCell align="right" className="fw-bold">
                                Action
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredItems.length === 0 ? (
                              <TableRow>
                                <TableCell
                                  colSpan={5}
                                  align="center"
                                  className="p-3"
                                >
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    No data available
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            ) : (
                              filteredItems.map((item, index) => (
                                <TableRow
                                  key={item._id}
                                  
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell align="right">
                                    {index + 1}
                                  </TableCell>
                                  <TableCell align="left">
                                    <div className="d-flex">
                                      
                                      <span className="ms-2 mt-2 fw-bold">
                                        {item.name}
                                      </span>
                                    </div>
                                  </TableCell>
                                  <TableCell align="left">
                                    {item.group
                                      ? item.group.name
                                      : "No Group Name"}
                                  </TableCell>
                                 
                               

                          
                                  
                                 
                                  <TableCell align="right">
                                    <Button
                                      variant="contained"
                                      color="warning"
                                      size="small"
                                      onClick={() => handleView(item._id)}
                                      style={{ marginRight: "10px",background:'#ffe0b2' }}
                                    >
                                      <RemoveRedEyeIcon style={{color:'#ff9100'}} />
                                    </Button>
                                    <Button
                                      variant="contained"
                                      color="success"
                                      size="small"
                                      onClick={() => handleUpdate(item._id)}
                                      style={{ marginRight: "10px",background:'#a5d6a7'}}
                                      className="text-success"
                                    >
                                      <EditRoundedIcon />
                                    </Button>

                                    <Button
                                      variant="contained"
                                      color="error"
                                      size="small"
                                      onClick={() => handleDelete(item._id)}
                                      style={{background:'#ffab91'}}
                                    >
                                      <DeleteIcon className="text-danger" />
                                    </Button>

                                   

                                    <Tooltip
                                    title="Show Barcode"
                                    placement="top-start"
                                  >
                                    {/* <IconButton
                                      onClick={handleUnitDialogOpen}
                                      sx={{ ml: 1 }}
                                      style={{
                                        background: "#ffe0b2",
                                        width: "30px",
                                        height: "30px",
                                      }}
                                      className="mt-2"
                                    >
                                      <AddIcon />
                                    </IconButton> */}


<Button
                                      variant="contained"
                                      size="small"
                                      // onClick={() => handleUpdate(item._id)}
                                      style={{
                                        marginLeft: "10px",
                                        background: "#e0e0e0",
                                           fontWeight: "bold",
                                        color:'#3e2723',
                                        padding:'9px'
                                      }}
                                      onClick={() => handleOpenModal(item)}
                                    >
                                      {/* <QrCodeScannerIcon/> */}
                                      <FontAwesomeIcon icon={faBarcode} />
                                    </Button>
                                  </Tooltip>


                                  </TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      {/* Modal for barcode details */}
                      <Dialog
                        open={modalOpen}
                        onClose={handleCloseModal}
                        maxWidth="sm"
                        fullWidth
                      >
                     
                          <div className="col-xl-6">
                            <DialogTitle className="fw-bold" style={{color:'rgb(1, 87, 155)'}}>
                              BARCODE DETAIL
                            </DialogTitle>
                          </div>

                       
                       
                        {/* <DialogContent>
                          {selectedItem && (
                            <div>
                              <Typography variant="h6">
                                <span className="fw-bold">Name:</span>{" "}
                                {selectedItem.name}
                              </Typography>
                              <Typography variant="h6">
                                {" "}
                                <span className="fw-bold">
                                  Group Name:
                                </span>{" "}
                                {selectedItem.group
                                  ? selectedItem.group.name
                                  : "No Group"}
                              </Typography>
                              <Typography variant="h6">
                                {" "}
                                <span className="fw-bold">
                                  Barcode ID::
                                </span>{" "}
                                {selectedItem.barcode}
                              </Typography>
                              <Barcode value={selectedItem.barcode} />
                            </div>
                          )}
                        </DialogContent> */}


<DialogContent>
                          {selectedItem && (
                            <div>
                              <Typography variant="h6">
                                <span className="fw-bold">Name:</span>{" "}
                                {selectedItem.name}
                              </Typography>
                              <Typography variant="h6">
                                {" "}
                                <span className="fw-bold">
                                  Group Name:
                                </span>{" "}
                                {selectedItem.group
                                  ? selectedItem.group.name
                                  : "No Group"}
                              </Typography>
                              <Typography variant="h6">
                                {" "}
                                <span className="fw-bold">
                                  Main Unit  Barcode ID::
                                </span>{" "}
                                {selectedItem.mainUnitBarcode}
                              </Typography>
                              <Barcode value={selectedItem.mainUnitBarcode} />

                              <Typography variant="h6" style={{ marginTop: '20px' }}>
                                <span className="fw-bold">Alternative Unit Barcode ID::</span>{" "}
                                {selectedItem.alternativeUnitBarcode}
                              </Typography>
                              <Barcode value={selectedItem.alternativeUnitBarcode} />
                            </div>
                          )}
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={handleCloseModal}
                            color="primary"
                            variant="contained"
                          >
                            Close
                          </Button>
                        </DialogActions>
                      </Dialog>
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
