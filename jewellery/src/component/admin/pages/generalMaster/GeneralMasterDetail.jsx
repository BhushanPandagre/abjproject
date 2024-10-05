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
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import Swal from "sweetalert2";
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

// const API_URL = "http://localhost:5000/api/data";

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// export default function GeneralMasterDetail() {
//   const [dataList, setDataList] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(API_URL);
//       setDataList(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleEdit = (id) => {
//     navigate(`/edit/${id}`);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       fetchData(); // Refresh the data list after deletion
//     } catch (error) {
//       console.error("Error deleting data:", error);
//     }
//   };

//   const handleView = (id) => {
//     navigate(`/view_general_master/${id}`);
//   };


//     // Function to handle search query change
//     const handleSearchChange = (e) => {
//       setSearchQuery(e.target.value);
//     };
  

//   // Filter the data based on search query
//   const filteredDataList = dataList.filter((item) =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.printName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.description.toLowerCase().includes(searchQuery.toLowerCase())
//   );



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
//                           <Button
//                             variant="contained"
//                             color="primary"
//                             onClick={() => {
//                               navigate("/add_general_master");
//                             }}
//                             size="small"
//                             className="fw-bold"
//                           >
//                             Add General Master
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

//                                 type="text"
//                                 // className="form-control"
//                                 // placeholder="Search..."
//                                 value={searchQuery}
//                                 onChange={handleSearchChange}



//                                 size="small"
//                                 fullWidth
//                                 id="search"
//                                 label="Search by Name or Account ID"
//                                 variant="outlined"
//                                 name="searchTerm"
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
//                                 Group/State
//                               </TableCell>
//                               <TableCell align="left" className="fw-bold">
//                                 Opening Balance
//                               </TableCell>
//                               <TableCell align="left" className="fw-bold">
//                                 Mobile Number
//                               </TableCell>
//                               <TableCell align="left" className="fw-bold">
//                                 Description
//                               </TableCell>
//                               <TableCell align="left" className="fw-bold">
//                                 Actions
//                               </TableCell>
//                             </TableRow>
//                           </TableHead>
//                           <TableBody>
//                             {filteredDataList.length > 0 ? (
//                               filteredDataList.map((item, index) => (
//                                 <TableRow
//                                   key={item._id}
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
//                                     {item.name}
//                                   </TableCell>

//                                   <TableCell align="left">
//                                     {item.group}
//                                   </TableCell>

//                                   <TableCell align="left">
//                                     <CurrencyRupeeIcon
//                                       style={{ fontSize: "15px" }}
//                                     />
//                                     {item.openingBalance.amount}(
//                                     {item.openingBalance.type})
//                                   </TableCell>

//                                   <TableCell align="left">
//                                     {item.contactDetails.mobileNumber}
//                                   </TableCell>

//                                   <TableCell align="left">
//                                     {item.description}
//                                   </TableCell>

//                                   <TableCell align="left">
//                                     <Button
//                                       variant="contained"
//                                       color="warning"
//                                       size="small"
//                                       style={{
//                                         marginRight: "10px",
//                                         background: "#ffe0b2",
//                                       }}
//                                       onClick={() => handleView(item._id)}
//                                     >
//                                       <RemoveRedEyeIcon
//                                         style={{ color: "#ff9100" }}
//                                       />
//                                     </Button>

//                                     <Button
//                                       variant="contained"
//                                       color="success"
//                                       size="small"
//                                       style={{
//                                         marginRight: "10px",
//                                         background: "#a5d6a7",
//                                       }}
//                                       className="text-success"
//                                       onClick={() => handleEdit(item._id)}
//                                     >
//                                       <EditRoundedIcon />
//                                     </Button>

//                                     <Button
//                                       variant="contained"
//                                       onClick={() => handleDelete(item._id)}
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
//                               <TableRow>
//                                 <TableCell align="right" className="fw-bold">
//                                   No General acoount found.
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



//==================== Update Live Code ===================================================




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
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Swal from "sweetalert2";
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

// const API_URL = "http://localhost:5000/api/data";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function GeneralMasterDetail() {
  const [dataList, setDataList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get("/api/data");
      setDataList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/data/${id}`);
      fetchData(); // Refresh the data list after deletion
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleView = (id) => {
    navigate(`/view_general_master/${id}`);
  };

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter the data based on search query
  const filteredDataList = dataList.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.printName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                              navigate("/add_general_master");
                            }}
                            size="small"
                            className="fw-bold"
                          >
                            Add General Master
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
                                type="text"
                               
                                value={searchQuery}
                                onChange={handleSearchChange}
                                size="small"
                                fullWidth
                                id="search"
                                label="Search by Name or Account ID"
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
                                Account Group
                              </TableCell>
                              <TableCell align="left" className="fw-bold">
                                Opening Balance
                              </TableCell>
                              <TableCell align="left" className="fw-bold">
                                Mobile Number
                              </TableCell>
                              
                              
                              
                              <TableCell align="left" className="fw-bold">
                                Actions
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredDataList.length > 0 ? (
                              filteredDataList.map((item, index) => (
                                <TableRow
                                  key={item._id}
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
                                    {item.name}
                                  </TableCell>

                                  <TableCell align="left">
                                    {item.group}
                                  </TableCell>

                                  <TableCell align="left">
                                    <CurrencyRupeeIcon
                                      style={{ fontSize: "15px" }}
                                    />
                                    {item.openingBalance.amount}(
                                    {item.openingBalance.type})
                                  </TableCell>

                                  <TableCell align="left">
                                    {item.contactDetails.mobileNumber}
                                  </TableCell>

                              

                                  <TableCell align="left">
                                    <Button
                                      variant="contained"
                                      color="warning"
                                      size="small"
                                      style={{
                                        marginRight: "10px",
                                        background: "#ffe0b2",
                                      }}
                                      onClick={() => handleView(item._id)}
                                    >
                                      <RemoveRedEyeIcon
                                        style={{ color: "#ff9100" }}
                                      />
                                    </Button>

                                    <Button
                                      variant="contained"
                                      color="success"
                                      size="small"
                                      style={{
                                        marginRight: "10px",
                                        background: "#a5d6a7",
                                      }}
                                      className="text-success"
                                      onClick={() => handleEdit(item._id)}
                                    >
                                      <EditRoundedIcon />
                                    </Button>

                                    <Button
                                      variant="contained"
                                      onClick={() => handleDelete(item._id)}
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
                              <TableRow>
                                <TableCell align="right" className="fw-bold">
                                  No General acoount found.
                                </TableCell>
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


