// import * as React from "react";
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
// import {
//   InputAdornment,
//   IconButton,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const breadcrumbs = [
//   <Link underline="hover" key="1" color="inherit" to="/user_category" className="text-decoration-none"  style={{ fontSize: "15px" }}>
//    User Category
//   </Link>,

//   <Typography key="4" color="text.secondary"  style={{ fontSize: "15px" }}>
//     Account Master
//   </Typography>,
// ];

// export default function AccountMasterDetail() {
//   const navigate = useNavigate();
//   const [accounts, setAccounts] = useState([]);
//   const [selectedAccount, setSelectedAccount] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredAccounts, setFilteredAccounts] = useState([]);
//   const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);




//   useEffect(() => {
//     fetchAccounts();
//   }, []);

//   useEffect(() => {
//     setFilteredAccounts(
//       accounts.filter(account =>
//         account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         account.customId.toString().toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   }, [accounts, searchTerm]);

//   const fetchAccounts = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/accounts');
//       setAccounts(response.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };




//   const handleDelete = async (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`http://localhost:5000/api/accounts/${id}`);
//           setAccounts(accounts.filter((account) => account._id !== id));
//           toast.success("Account deleted successfully");
//         } catch (err) {
//           console.error(err);
//           toast.error("Error deleting account");
//         }
//       }
//     });
//   };




//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'searchTerm') {
//       setSearchTerm(value);
//     } else if (selectedAccount) {
//       setSelectedAccount({
//         ...selectedAccount,
//         [name]: value
//       });
//     }
//   };

//   return (
//     <div>
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-xl-12">
//             <Box sx={{ display: "flex" }}>
//               <CssBaseline />
//               <Header />
//               <Box component="main" sx={{ flexGrow: 1}}>
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
//                               navigate("/account_master");
//                             }}
//                             size="small"
//                             className="fw-bold"
//                           >
//                             Add Account Master
//                           </Button>
//                         </div>
//                         <div className="col-xl-9 d-flex justify-content-end">
//                           {/* <Button
//                             variant="contained"
//                             color="primary"
//                             onClick={() => {
//                               navigate("/account_master");
//                             }}
//                             size="small"
//                             className="fw-bold"
//                           >
//                             Add Account Master
//                           </Button> */}
//                            <Grid
//                         container
//                         spacing={2}
//                         alignItems="center"
//                         className="d-flex justify-content-end mb-2"
//                       >
//                         <Grid item xs={12} md={6} lg={4} xl={3}>
//                           <TextField
//                             size="small"
//                             fullWidth
//                             id="search"
//                             label="Search by Name or Account ID"
//                             variant="outlined"
//                               name="searchTerm"
//                               value={searchTerm}
//                               onChange={handleChange}
                           
//                             InputProps={{
//                               startAdornment: (
//                                 <InputAdornment position="start">
//                                   <IconButton>
//                                     <SearchIcon />
//                                   </IconButton>
//                                 </InputAdornment>
//                               ),
//                             }}
//                           />
//                           {showNoResultsMessage && (
//                             <Typography
//                               variant="body2"
//                               color="textSecondary"
//                               style={{ marginTop: "8px" }}
//                             >
//                               No results found.
//                             </Typography>
//                           )}
//                         </Grid>
//                       </Grid>
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

//                   {/* <div className="col-xl-12 d-flex justify-content-end">
//                       <Grid
//                         container
//                         spacing={2}
//                         alignItems="center"
//                         className="d-flex justify-content-end mb-2"
//                       >
//                         <Grid item xs={12} md={6} lg={4} xl={3}>
//                           <TextField
//                             size="small"
//                             fullWidth
//                             id="search"
//                             label="Search by Name or Account ID"
//                             variant="outlined"
//                               name="searchTerm"
//                               value={searchTerm}
//                               onChange={handleChange}
                           
//                             InputProps={{
//                               startAdornment: (
//                                 <InputAdornment position="start">
//                                   <IconButton>
//                                     <SearchIcon />
//                                   </IconButton>
//                                 </InputAdornment>
//                               ),
//                             }}
//                           />
//                           {showNoResultsMessage && (
//                             <Typography
//                               variant="body2"
//                               color="textSecondary"
//                               style={{ marginTop: "8px" }}
//                             >
//                               No results found.
//                             </Typography>
//                           )}
//                         </Grid>
//                       </Grid>
//                     </div> */}

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
//                                ID
//                               </TableCell>
//                               <TableCell align="left" className="fw-bold">
//                                 Name
//                               </TableCell>

//                               <TableCell align="left" className="fw-bold">
//                                 Email
//                               </TableCell>
//                               {/* <TableCell align="left" className="fw-bold">Created At</TableCell> */}
//                               <TableCell align="left" className="fw-bold">
//                                 Actions
//                               </TableCell>
//                             </TableRow>
//                           </TableHead>
//                           <TableBody>
//                             {/* {accounts.map((account, index) => ( */}
//                             {filteredAccounts.map((account, index) => (
//                               <TableRow
//                                 key={account._id}
//                                 sx={{
//                                   "&:last-child td, &:last-child th": {
//                                     border: 0,
//                                   },
//                                 }}
//                               >
//                                 <TableCell align="left">{index + 1}</TableCell>
//                                 <TableCell align="left">
//                                   {account.customId}
//                                 </TableCell>
//                                 <TableCell align="left" className="d-flex">
//                                 <Avatar
//                                               src={`http://localhost:5000/${account.image}`}
//                                               alt={account.name}
//                                               style={{
//                                                 // width: "2rem",
//                                                 // height: "2rem",
//                                                 border: "1px solid lightgray",
//                                               }}
                                              
//                                             />
//                                             <span className="mt-2 ms-2 fw-bold" style={{color:'#01579b'}}>
//                                             {account.name} {account.lastName}
//                                             </span>
                                 
//                                 </TableCell>

//                                 <TableCell align="left">
//                                   {account.email}
//                                 </TableCell>

//                                 <TableCell align="left">
//                                 <Link
//                                     to={`/view_account_master/${account._id}`}
//                                   >
//                                   <Button
//                                     variant="contained"
//                                     color="warning"
//                                     size="small"
//                                     style={{ marginRight: "10px",background:'#ffe0b2'}}
//                                   >
//                                     <RemoveRedEyeIcon style={{color:'#ff9100'}} />
//                                   </Button>
//                                   </Link>
//                                   <Link
//                                     to={`/update_account_master/${account._id}`}
//                                   >
//                                     <Button
//                                       variant="contained"
//                                       color="success"
//                                       size="small"
//                                       style={{ marginRight: "10px",background:'#a5d6a7' }}
//                                       className="text-success"
//                                     >
//                                       <EditRoundedIcon />
//                                     </Button>
//                                   </Link>

//                                   <Button
//                                     variant="contained"
//                                     onClick={() => handleDelete(account._id)}
//                                     color="error"
//                                     size="small"
//                                     style={{background:'#ffab91'}}
//                                   >
//                                     <DeleteIcon className="text-danger"/>
//                                   </Button>
//                                 </TableCell>
//                               </TableRow>
//                             ))}
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
















//==================================== Update Live code ===================================


import * as React from "react";
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

export default function AccountMasterDetail() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    setFilteredAccounts(
      accounts.filter(
        (account) =>
          account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          account.customId
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      )
    );
  }, [accounts, searchTerm]);

  const fetchAccounts = async () => {
    try {
      const response = await api.get("/api/accounts");
      setAccounts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want you to delete it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/api/accounts/${id}`);
          setAccounts(accounts.filter((account) => account._id !== id));
          toast.success("Account deleted successfully");
        } catch (err) {
          console.error(err);
          toast.error("Error deleting account");
        }
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchTerm") {
      setSearchTerm(value);
    } else if (selectedAccount) {
      setSelectedAccount({
        ...selectedAccount,
        [name]: value,
      });
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
                        <div className="col-xl-4">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              navigate("/account_master");
                            }}
                            size="small"
                            className="fw-bold"
                          >
                            Add Customer Account Master
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
                            label="Search by Name or Account ID"
                            variant="outlined"
                            name="searchTerm"
                            value={searchTerm}
                            onChange={handleChange}
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
                    <div className="col-xl-12">
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
                                ID
                              </TableCell>
                              <TableCell align="left" className="fw-bold">
                                Name
                              </TableCell>

                              <TableCell align="left" className="fw-bold">
                                Email
                              </TableCell>

                              <TableCell align="left" className="fw-bold">
                                Actions
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredAccounts.map((account, index) => (
                              <TableRow
                                key={account._id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="left">{index + 1}</TableCell>
                                <TableCell align="left">
                                  {account.customId}
                                </TableCell>
                                <TableCell align="left" className="d-flex">
                                  <Avatar
                                     src={`https://api.abjwork.com/${account.image}`}
                                    
                                    alt={account.name}
                                    style={{
                                      border: "1px solid lightgray",
                                    }}
                                  />
                                  <span className="mt-2 ms-2 fw-bold" style={{color:'#01579b'}}>
                                    {account.name}  {account.lastName} 
                                    
                                  </span>
                                </TableCell>

                                <TableCell align="left">
                                  {account.email}
                                </TableCell>

                                <TableCell align="left">
                                  <Link
                                    to={`/view_account_master/${account._id}`}
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
                                    to={`/update_account_master/${account._id}`}
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
                                    onClick={() => handleDelete(account._id)}
                                    color="error"
                                    size="small"
                                    style={{ background: "#ffab91" }}
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
