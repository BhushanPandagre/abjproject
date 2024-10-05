// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import Grid from "@mui/material/Grid";
// import { Link } from "react-router-dom";
// import MenuItem from "@mui/material/MenuItem";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Avatar from "@mui/material/Avatar";
// import Header from "../../../schema/Header";
// import Button from "@mui/material/Button";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Stack from "@mui/material/Stack";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import DeleteIcon from "@mui/icons-material/Delete";
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// import EditRoundedIcon from "@mui/icons-material/EditRounded";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from "@mui/material";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Modal from "react-modal";
// import { InputAdornment, IconButton } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const breadcrumbs = [
//   <Link
//     underline="hover"
//     key="1"
//     color="inherit"
//     to="/user_category"
//     className="text-decoration-none"
//     style={{ fontSize: "15px" }}
//   >
//     User Category
//   </Link>,

//   <Typography key="4" color="text.secondary" style={{ fontSize: "15px" }}>
//     Account Master
//   </Typography>,
// ];

// export default function SupplierMasterDetail() {
//   const navigate = useNavigate();
//   const [suppliers, setSuppliers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredSuppliers, setFilteredSuppliers] = useState([]);


//   useEffect(() => {
//     // Fetch suppliers from API
//     axios
//       .get("http://localhost:5000/api/suppliers")
//       .then((response) => {
//         setSuppliers(response.data);
//         setFilteredSuppliers(response.data); // Initialize filteredSuppliers with all suppliers
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching suppliers:", error);
//         setError("Failed to load suppliers.");
//         setLoading(false);
//       });
//   }, []);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this supplier?")) {
//       // Delete supplier from API
//       axios
//         .delete(`http://localhost:5000/api/suppliers/${id}`)
//         .then(() => {
//           // Update local state to remove the deleted supplier
//           setSuppliers(suppliers.filter((s) => s._id !== id));
//           setFilteredSuppliers(filteredSuppliers.filter((s) => s._id !== id)); // Update filtered list
//         })
//         .catch((error) => {
//           console.error("Error deleting supplier:", error);
//           setError("Failed to delete supplier.");
//         });
//     }



//     MySwal.fire({
//       title: "Are you sure?",
//       text: "Do you want to delete it!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//       customClass: {
//         popup: "swal-wide",
//       },
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`http://localhost:5000/api/suppliers/${id}`);
//           setSuppliers(suppliers.filter((s) => s._id !== id));
//           MySwal.fire("Deleted!", "Your Account has been deleted.", "success");
//         } catch (error) {
//           console.error("Error deleting Account:", error);
//           MySwal.fire(
//             "Error!",
//             "There was an error deleting the Account.",
//             "error"
//           );
//         }
//       }
//     });




//   };


//   const handleSearch = (event) => {
//     const query = event.target.value.toLowerCase();
//     setSearchTerm(query);
//     if (query) {
//       setFilteredSuppliers(
//         suppliers.filter(
//           (supplier) =>
//             supplier.firstName.toLowerCase().includes(query) ||
//             supplier.lastName.toLowerCase().includes(query) ||
//             supplier.area.toLowerCase().includes(query) ||
//             supplier.partyCode.toLowerCase().includes(query)
//         )
//       );
//     } else {
//       setFilteredSuppliers(suppliers);
//     }
//   };





//   if (loading) {
//     return (
//       <div className="container mt-4">
//         <p>Loading suppliers...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mt-4">
//         <p className="text-danger">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div>
   

//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-xl-12">
//             <Box sx={{ display: "flex" }}>
//               <CssBaseline />
//               <Header />
//               <Box component="main" sx={{ flexGrow: 1 }}>
//                 <DrawerHeader />
//                 <div className="container-fluid">
//                   <div className="row mt-2">
//                     <div className="col-xl-12">
//                       <div className="row d-flex justify-content-between">
//                         <div className="col-xl-3">
//                           {/* <h4 className="fw-bold">Account Master</h4> */}
//                           <Button
//                             variant="contained"
//                             color="primary"
//                             onClick={() => {
//                               navigate("/add_supplier_master");
//                             }}
//                             size="small"
//                             className="fw-bold"
//                           >
//                             Add Supplier Master
//                           </Button>
//                         </div>
//                         <div className="col-xl-9 d-flex justify-content-end">
//                           <Grid
//                             container
//                             spacing={2}
//                             alignItems="center"
//                             className="d-flex justify-content-end mb-2"
//                           >
//                             <Grid item xs={12} md={6} lg={4} xl={3}>
//                               <TextField
//                                 size="small"
//                                 fullWidth
//                                 id="search"
//                                 label="Search by Name or Account ID"
//                                 variant="outlined"
//                                 name="searchTerm"
//                                 value={searchTerm}
//                                 onChange={handleSearch}

//                                 InputProps={{
//                                   startAdornment: (
//                                     <InputAdornment position="start">
//                                       <IconButton>
//                                         <SearchIcon />
//                                       </IconButton>
//                                     </InputAdornment>
//                                   ),
//                                 }}
//                               />
//                             </Grid>
//                           </Grid>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   {/* <div className="row">
//                     <div className="col-xl-12">
//                       <Stack spacing={2}>
//                         <Breadcrumbs
//                           separator={<NavigateNextIcon fontSize="small" />}
//                           aria-label="breadcrumb"
//                         >
//                           {breadcrumbs}
//                         </Breadcrumbs>
//                       </Stack>
//                     </div>
//                   </div> */}
//                   <div className="row mt-1">
//                     <div className="col-xl-12">
//                       <TableContainer
//                         component={Paper}
//                         className="d-flex justify-content-center"
//                       >
//                         <Table
//                           sx={{ minWidth: 650 }}
//                           size="small"
//                           aria-label="a dense table"
//                           className="bordered"
//                         >
//                           <TableHead>
//                             <TableRow style={{ background: "#bbdefb" }}>
//                               <TableCell align="left" className="fw-bold">
//                                 #
//                               </TableCell>
//                               <TableCell align="left" className="fw-bold">
//                                 Name
//                               </TableCell>

//                               <TableCell align="left" className="fw-bold">
//                                 Area
//                               </TableCell>
//                               <TableCell align="left" className="fw-bold">
//                                 Party Code
//                               </TableCell>
//                               <TableCell align="left" className="fw-bold">
//                                 Opening Balance
//                               </TableCell>
//                               {/* <TableCell align="left" className="fw-bold">Created At</TableCell> */}
//                               <TableCell align="left" className="fw-bold">
//                                 Actions
//                               </TableCell>
//                             </TableRow>
//                           </TableHead>
//                           <TableBody>
//                             {filteredSuppliers.length > 0 ? (
//                               filteredSuppliers.map((supplier, index) => (
//                                 <TableRow
//                                   key={supplier._id}
//                                   sx={{
//                                     "&:last-child td, &:last-child th": {
//                                       border: 0,
//                                     },
//                                   }}
//                                 >
//                                   <TableCell align="left">
//                                     {index + 1}
//                                   </TableCell>
//                                   <TableCell align="left">
//                                     {supplier.firstName} {supplier.lastName}
//                                   </TableCell>
//                                   <TableCell align="left">
//                                     {supplier.area}
//                                   </TableCell>

//                                   <TableCell align="left">
//                                     {supplier.partyCode}
//                                   </TableCell>

//                                   <TableCell align="left">
//                                     {supplier.openingBalance.amount} (
//                                     {supplier.openingBalance.type})
//                                   </TableCell>

//                                   <TableCell align="left">
//                                     <Link
//                                       to={`/view_supplier_master/${supplier._id}`}
//                                     >
//                                       <Button
//                                         variant="contained"
//                                         color="warning"
//                                         size="small"
//                                         style={{
//                                           marginRight: "10px",
//                                           background: "#ffe0b2",
//                                         }}
//                                       >
//                                         <RemoveRedEyeIcon
//                                           style={{ color: "#ff9100" }}
//                                         />
//                                       </Button>
//                                     </Link>

//                                     <Link
//                                       to={`/update_supplier_master/${supplier._id}`}
//                                     >
//                                       <Button
//                                         variant="contained"
//                                         color="success"
//                                         size="small"
//                                         style={{
//                                           marginRight: "10px",
//                                           background: "#a5d6a7",
//                                         }}
//                                         className="text-success"
//                                       >
//                                         <EditRoundedIcon />
//                                       </Button>
//                                     </Link>

//                                     <Button
//                                       variant="contained"
//                                       onClick={() => handleDelete(supplier._id)}
//                                       color="error"
//                                       size="small"
//                                       style={{ background: "#ffab91" }}
//                                     >
//                                       <DeleteIcon className="text-danger" />
//                                     </Button>
//                                   </TableCell>
//                                 </TableRow>
//                               ))
//                             ) : (
//                               <TableRow className="d-fl">
//                                 <TableCell>
                                 
//                                   No suppliers found.
                                  
//                                 </TableCell>
//                               </TableRow>
//                             )}
//                           </TableBody>
//                         </Table>
//                       </TableContainer>
//                     </div>
//                   </div>
//                 </div>
//               </Box>
//             </Box>
//             <ToastContainer />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








// ======================================= Live Update Code ================================



import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
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
import Header from "../../../schema/Header";
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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import api from "../../../../services/api";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const breadcrumbs = [
  <Link
    underline="hover"
    key="1"
    color="inherit"
    to="/user_category"
    className="text-decoration-none"
    style={{ fontSize: "15px" }}
  >
    User Category
  </Link>,

  <Typography key="4" color="text.secondary" style={{ fontSize: "15px" }}>
    Account Master
  </Typography>,
];

export default function SupplierMasterDetail() {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);

  useEffect(() => {
    // Fetch suppliers from API
    api
      .get("/api/suppliers")
      .then((response) => {
        setSuppliers(response.data);
        setFilteredSuppliers(response.data); // Initialize filteredSuppliers with all suppliers
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching suppliers:", error);
        setError("Failed to load suppliers.");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      // Delete supplier from API
      api
        .delete(`/api/suppliers/${id}`)
        .then(() => {
          // Update local state to remove the deleted supplier
          setSuppliers(suppliers.filter((s) => s._id !== id));
          setFilteredSuppliers(filteredSuppliers.filter((s) => s._id !== id)); // Update filtered list
        })
        .catch((error) => {
          console.error("Error deleting supplier:", error);
          setError("Failed to delete supplier.");
        });
    }

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
          await api.delete(`/api/suppliers/${id}`);
          setSuppliers(suppliers.filter((s) => s._id !== id));
          MySwal.fire("Deleted!", "Your Account has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting Account:", error);
          MySwal.fire(
            "Error!",
            "There was an error deleting the Account.",
            "error"
          );
        }
      }
    });
  };
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);
    if (query) {
      setFilteredSuppliers(
        suppliers.filter(
          (supplier) =>
            supplier.firstName.toLowerCase().includes(query) ||
            supplier.lastName.toLowerCase().includes(query) ||
            supplier.area.toLowerCase().includes(query) ||
            supplier.partyCode.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredSuppliers(suppliers);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <p>Loading suppliers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

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
                  <div className="row mt-2">
                    <div className="col-xl-12">
                      <div className="row d-flex justify-content-between">
                        <div className="col-xl-3">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              navigate("/add_supplier_master");
                            }}
                            size="small"
                            className="fw-bold"
                          >
                            Add Supplier Master
                          </Button>
                        </div>
                        <div className="col-xl-9 d-flex justify-content-end">
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
                                label="Search by Name or Account ID"
                                variant="outlined"
                                name="searchTerm"
                                value={searchTerm}
                                onChange={handleSearch}
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
                          </Grid>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-1">
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
                                Name
                              </TableCell>

                              <TableCell align="left" className="fw-bold">
                                Area
                              </TableCell>
                              <TableCell align="left" className="fw-bold">
                                Party Code
                              </TableCell>
                              <TableCell align="left" className="fw-bold">
                                Opening Balance
                              </TableCell>

                              <TableCell align="left" className="fw-bold">
                                Actions
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredSuppliers.length > 0 ? (
                              filteredSuppliers.map((supplier, index) => (
                                <TableRow
                                  key={supplier._id}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell align="left">
                                    {index + 1}
                                  </TableCell>

                                  <TableCell align="left">
                                    {supplier.partyName}
                                  </TableCell>

                                  <TableCell align="left">
                                    {supplier.area}
                                  </TableCell>

                                  <TableCell align="left">
                                    {supplier.partyCode}
                                  </TableCell>

                                  <TableCell align="left">
                                    {supplier.openingBalance.amount} (
                                    {supplier.openingBalance.type})
                                  </TableCell>

                                  <TableCell align="left">
                                    <Link
                                      to={`/view_supplier_master/${supplier._id}`}
                                    >
                                      <Button
                                        variant="contained"
                                        color="warning"
                                        size="small"
                                        style={{
                                          marginRight: "10px",
                                          background: "#ffe0b2",
                                        }}
                                      >
                                        <RemoveRedEyeIcon
                                          style={{ color: "#ff9100" }}
                                        />
                                      </Button>
                                    </Link>

                                    <Link
                                      to={`/update_supplier_master/${supplier._id}`}
                                    >
                                      <Button
                                        variant="contained"
                                        color="success"
                                        size="small"
                                        style={{
                                          marginRight: "10px",
                                          background: "#a5d6a7",
                                        }}
                                        className="text-success"
                                      >
                                        <EditRoundedIcon />
                                      </Button>
                                    </Link>

                                    <Button
                                      variant="contained"
                                      onClick={() => handleDelete(supplier._id)}
                                      color="error"
                                      size="small"
                                      style={{ background: "#ffab91" }}
                                    >
                                      <DeleteIcon className="text-danger" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow className="d-fl">
                                <TableCell>No suppliers found.</TableCell>
                              </TableRow>
                            )}
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
