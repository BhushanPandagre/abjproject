//=======================My code [14/09/2024]=========================//
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import api from "../../../../../services/api"; // Make sure this path is correct
// import { useNavigate } from "react-router-dom";

// const PackagingList = () => {
//   const navigate = useNavigate()
//   const [packagingList, setPackagingList] = useState([]);
//   const [selectedPackaging, setSelectedPackaging] = useState(null);

//   useEffect(() => {
//     fetchPackagingList();
//   }, []);

//   const fetchPackagingList = async () => {
//     try {
//       const response = await api.get("/api/packaging");
//       setPackagingList(response.data);
//     } catch (error) {
//       console.error("Error fetching packaging list:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await api.delete(`/api/packaging/${id}`);
//       alert("Packaging deleted successfully!");
//       fetchPackagingList(); // Refresh the list
//     } catch (error) {
//       console.error("Error deleting packaging:", error);
//       alert("Error deleting packaging");
//     }
//   };

//   const handleView = (id) => {
//     // setSelectedPackaging(packaging);
    
//       navigate(`/packaging/${id}`);
   
//   };

//   const handleUpdate = async (id) => {
//     // Redirect to an update form or show an update modal
//     // For simplicity, assume you redirect to an update page
//     window.location.href = `/packaging/update/${id}`;
//   };

//   return (
//     <div>
//       <h2>Packaging List</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Item </th>
//             <th>Company Name</th>
//             <th>Supplier Name</th>
//             <th>Purchase Voucher Number</th>
//             <th>Quantity</th>
//             <th>Unit</th>
//             <th>Alternative Unit </th>
//             <th>Price</th>
//             <th>Amount</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {packagingList.map((packaging) => (
//             <tr key={packaging._id}>
//               <td>{packaging.item}</td>
//               <td>{packaging.companyName}</td>
//               <td>{packaging.supplierName}</td>
//               <td>{packaging.purchaseVoucherNo}</td>
//               <td>{packaging.quantity}</td>
//               <td>{packaging.unit}</td>
//               <td>{packaging.alternativeunit}</td>
//               <td>{packaging.price}</td>
//               <td>{packaging.amount}</td>
//               <td>
//               <button onClick={() => handleView(packaging._id)}>View</button>
//                 <button onClick={() => handleUpdate(packaging._id)}>
//                   Update
//                 </button>
//                 <button onClick={() => handleDelete(packaging._id)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {selectedPackaging && (
//         <div>
//           <h3>Packaging Details</h3>
//           <p>
//             <strong>Item Name:</strong> {selectedPackaging.itemName}
//           </p>
//           <p>
//             <strong>Company Name:</strong> {selectedPackaging.companyName}
//           </p>
//           <p>
//             <strong>Supplier Name:</strong> {selectedPackaging.supplierName}
//           </p>
//           <p>
//             <strong>Purchase Voucher Number:</strong>{" "}
//             {selectedPackaging.purchaseVoucherNumber}
//           </p>
//           <p>
//             <strong>Quantity:</strong> {selectedPackaging.quantity}
//           </p>
//           <p>
//             <strong>Unit:</strong> {selectedPackaging.unit}
//           </p>
//           <p>
//             <strong>Price:</strong> {selectedPackaging.price}
//           </p>
//           <p>
//             <strong>Amount:</strong> {selectedPackaging.amount}
//           </p>
//           <p>
//             <strong>Box Count:</strong>{" "}
//             {selectedPackaging.packagingDetails.boxCount}
//           </p>
//           <p>
//             <strong>Total Boxes:</strong> {selectedPackaging.totalBoxes}
//           </p>
//           <p>
//             <strong>Total Pieces:</strong> {selectedPackaging.totalPieces}
//           </p>
//           <button onClick={() => setSelectedPackaging(null)}>Close</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PackagingList;





//===============================With style ========================//

import React, { useState, useEffect } from "react";
import api from "../../../../../services/api";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PrintIcon from "@mui/icons-material/Print";
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import { InputAdornment, IconButton } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Header from "../../../../schema/Header";


const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function PackagingList() {
  const navigate = useNavigate("");
  const [packagingList, setPackagingList] = useState([]);

  useEffect(() => {
    fetchPackagingList();
  }, []);

  const fetchPackagingList = async () => {
    try {
      const response = await api.get("/api/packaging");
      setPackagingList(response.data);
    } catch (error) {
      console.error("Error fetching packaging list:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/packaging/${id}`);
      alert("Packaging deleted successfully!");
      fetchPackagingList(); // Refresh the list
    } catch (error) {
      console.error("Error deleting packaging:", error);
      alert("Error deleting packaging");
    }
  };

  const handleView = (id) => {
    navigate(`/packaging/${id}`);
  };

  const handleUpdate = async (id) => {
    // Redirect to an update form or show an update modal
    // For simplicity, assume you redirect to an update page
    navigate(`/packaging/update/${id}`);
    // window.location.href = `/packaging/update/${id}`;
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
                            onClick={() => {
                              navigate("/add_packaging");
                            }}
                            size="small"
                            className="fw-bold"
                          >
                            Add Packaging
                          </Button>
                        </div>
                        <div className="col-xl-8 d-flex justify-content-start"></div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-xl-12 mb-2">
                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        className="d-flex justify-content-start mb-2"
                      >
                        <Grid
                          item
                          xs={12}
                          md={6}
                          lg={3}
                          xl={3}
                          className="d-flex justify-content-start"
                        >
                          <TextField
                            size="small"
                            fullWidth
                            id="search"
                            label="Search by Supplier Name"
                            variant="outlined"
                            name="searchTerm"
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
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          md={6}
                          lg={3}
                          xl={3}
                          className="d-flex justify-content-end"
                        >
                          <TextField
                            size="small"
                            fullWidth
                            id="startDate"
                            label="Start Date"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          md={6}
                          lg={3}
                          xl={3}
                          className="d-flex justify-content-end"
                        >
                          <TextField
                            size="small"
                            fullWidth
                            id="endDate"
                            label="End Date"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                      </Grid>
                    </div>

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
                              <TableCell align="left" className="fw-bold">
                                #
                              </TableCell>
                              <TableCell align="left" className="fw-bold">
                                Item Name
                              </TableCell>
                              <TableCell align="left" className="fw-bold">
                                Company Name
                              </TableCell>

                              <TableCell align="left" className="fw-bold">
                                Purchase Voucher Number
                              </TableCell>
                              <TableCell align="left" className="fw-bold">
                                Quantity
                              </TableCell>
                              <TableCell align="left" className="fw-bold">
                                Main Unit
                              </TableCell>
                              <TableCell align="left" className="fw-bold">
                                Alt Unit
                              </TableCell>

                              <TableCell align="left" className="fw-bold">
                                Actions
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {packagingList.map((packaging, index) => (
                              <TableRow
                                key={packaging._id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="left">{index + 1}</TableCell>
                                <TableCell align="left">
                                  {packaging.item}
                                </TableCell>
                                <TableCell align="left">
                                  {packaging.companyName}
                                </TableCell>

                                <TableCell align="left">
                                  {packaging.purchaseVoucherNo}
                                </TableCell>
                                <TableCell align="left">
                                  {packaging.quantity}
                                </TableCell>
                                <TableCell align="left">
                                  {packaging.unit}
                                </TableCell>
                                <TableCell align="left">
                                  {packaging.alternativeunit}
                                </TableCell>

                                <TableCell align="left">
                                  <Button
                                    variant="contained"
                                    color="warning"
                                    size="small"
                                    onClick={() => handleView(packaging._id)}
                                    style={{
                                      marginRight: "10px",
                                      background: "#ffe0b2",
                                    }}
                                  >
                                    <RemoveRedEyeIcon
                                      style={{ color: "#ff9100" }}
                                    />
                                  </Button>

                                  <Button
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    onClick={() => handleUpdate(packaging._id)}
                                    style={{
                                      marginRight: "10px",
                                      background: "#a5d6a7",
                                    }}
                                    className="text-success"
                                  >
                                    <EditRoundedIcon />
                                  </Button>
                                  {/* </Link> */}

                                  <Button
                                    variant="contained"
                                    onClick={() => handleDelete(packaging._id)}
                                    color="error"
                                    size="small"
                                    style={{
                                      background: "#ffab91",
                                      marginRight: "10px",
                                    }}
                                  >
                                    <DeleteIcon className="text-danger" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>

                    
                    </div>
                  </div>
                </div>
              </Box>
            </Box>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

