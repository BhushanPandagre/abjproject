// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../../../../services/api";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS


// import axios from "axios";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Tooltip from "@mui/material/Tooltip";

// import { styled } from "@mui/material/styles";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar from "@mui/material/AppBar";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Grid from "@mui/material/Grid";

// import { Link } from "react-router-dom";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";


// import Backdrop from "@mui/material/Backdrop";
// import Modal from "@mui/material/Modal";
// import Fade from "@mui/material/Fade";
// import Button from "@mui/material/Button";

// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Stack from "@mui/material/Stack";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// import { FormControl, InputLabel, Select, IconButton } from "@mui/material";
// import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
// import AddIcon from "@mui/icons-material/Add";

// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";

// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Header from "../../../schema/Header";

// const blue = {
//   100: "#DAECFF",
//   200: "#b6daff",
//   400: "#3399FF",
//   500: "#007FFF",
//   600: "#0072E5",
//   900: "#003A75",
// };

// const grey = {
//   50: "#F3F6F9",
//   100: "#E5EAF2",
//   200: "#DAE2ED",
//   300: "#C7D0DD",
//   400: "#B0B8C4",
//   500: "#9DA8B7",
//   600: "#6B7A90",
//   700: "#434D5B",
//   800: "#303740",
//   900: "#1C2025",
// };

// const Textarea = styled(BaseTextareaAutosize)(
//   ({ theme }) => `
//     box-sizing: border-box;
//     width: 320px;
//     font-family: 'IBM Plex Sans', sans-serif;
//     font-size: 0.875rem;
//     font-weight: 400;
//     line-height: 1.5;
//     padding: 8px 12px;
//     border-radius: 8px;
//     color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
//     background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
//     border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
//     box-shadow: 0px 2px 2px ${
//       theme.palette.mode === "dark" ? grey[900] : grey[50]
//     };
  
//     &:hover {
//       border-color: ${blue[400]};
//     }
  
//     &:focus {
//       border-color: ${blue[400]};
//       box-shadow: 0 0 0 3px ${
//         theme.palette.mode === "dark" ? blue[600] : blue[200]
//       };
//     }
  
//     // firefox
//     &:focus-visible {
//       outline: 0;
//     }
//   `
// );

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// export default function AddSupplierMaster() {
//   const [supplier, setSupplier] = useState({
//     partyName: "",
//     firstName: "",
//     lastName: "",
//     area: "",
//     partyCode: "",
//     openingBalance: { amount: 0, type: "credit" }, // default value
//     address: {
//       houseNumber: "",
//       streetName: "",
//       locality: "",
//       landmark: "",
//       crossRoad: "",
//       relatedLocation: "",
//       pinCode: "",
//     },
//     contactNumbers: [{ number: "", name: "" }],
//     bankDetails: [
//       { accountNumber: "", firmName: "", bankName: "", ifscCode: "" },
//     ],
//     associatedCounter: "",
//     associatedSalesman: "",
//   });

//   const [numberOfBankDetails, setNumberOfBankDetails] = useState(1);
//   const [showModal, setShowModal] = useState(false); // State to manage modal visibility
//   const [editing, setEditing] = useState(false);
//   const [showAddressDetails, setShowAddressDetails] = useState(false);
//   const [departments, setDepartments] = useState([]); // State for departments
//   const [areas, setAreas] = useState([]); // State for areas
//   const [existingSuppliers, setExistingSuppliers] = useState([]); // State for existing suppliers

//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [isDepartmentDialogOpen, setIsDepartmentDialogOpen] = useState(false);

//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleDepartmentDialogOpen = () => {
//     setIsDepartmentDialogOpen(true);
//   };

//   const handleDepartmentDialogClose = () => {
//     setIsDepartmentDialogOpen(false);
//   };


//   useEffect(() => {
//     if (id) {
//       setEditing(true);
//       api
//         .get(`/api/suppliers/${id}`)
//         .then((response) => {
//           const data = response.data;
//           setSupplier(data);
//           setNumberOfBankDetails(data.bankDetails.length);
//         })
//         .catch((error) => console.error("Error fetching supplier:", error));
//     }
//   }, [id]);

//   useEffect(() => {
//     api
//       .get("/departments") // Fetch departments from API
//       .then((response) => {
//         setDepartments(response.data); // Set the departments state
//       })
//       .catch((error) => console.error("Error fetching departments:", error));
//   }, []);

//   useEffect(() => {
//     async function fetchAreas() {
//       try {
//         const response = await api.get("/api/areas");
//         setAreas(response.data);
//       } catch (error) {
//         console.error("Error fetching areas:", error);
//       }
//     }
//     fetchAreas();
//   }, []);

//   useEffect(() => {
//     if (supplier.area) {
//       api
//         .get(`/api/suppliers?area=${supplier.area}`)
//         .then((response) => {
//           setExistingSuppliers(response.data);
//           generatePartyCode(supplier.area, response.data);
//         })
//         .catch((error) =>
//           console.error("Error fetching existing suppliers:", error)
//         );
//     }
//   }, [supplier.area]);

//   const generatePartyCode = (areaName, existingSuppliers) => {
//     if (!areaName) return;
//     const areaInitial = areaName.charAt(0).toUpperCase();
//     const similarSuppliers = existingSuppliers.filter((supplier) =>
//       supplier.partyCode.startsWith(areaInitial)
//     );
//     const nextNumber = similarSuppliers.length + 1;
//     const newPartyCode = `${areaInitial}${nextNumber}`;
//     setSupplier((prev) => ({
//       ...prev,
//       partyCode: newPartyCode,
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSupplier((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setSupplier((prev) => ({
//       ...prev,
//       address: {
//         ...prev.address,
//         [name]: value,
//       },
//     }));
//   };

//   const handleBankDetailsChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedBankDetails = [...supplier.bankDetails];
//     updatedBankDetails[index][name] = value;
//     setSupplier((prev) => ({
//       ...prev,
//       bankDetails: updatedBankDetails,
//     }));
//   };

//   const handleContactChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedContactNumbers = [...supplier.contactNumbers];
//     updatedContactNumbers[index][name] = value;
//     setSupplier((prev) => ({
//       ...prev,
//       contactNumbers: updatedContactNumbers,
//     }));
//   };

//   const handleAddBankDetails = () => {
//     const newBankDetails = Array.from(
//       { length: numberOfBankDetails },
//       (_, i) => ({
//         accountNumber: "",
//         firmName: "",
//         bankName: "",
//         ifscCode: "",
//       })
//     );
//     setSupplier((prevData) => ({
//       ...prevData,
//       bankDetails: newBankDetails,
//     }));
//     setShowModal(false); // Close the modal after updating the bank details
//   };

//   const handleNumberOfBankDetailsChange = (e) => {
//     setNumberOfBankDetails(Number(e.target.value));
//   };

//   const handleOpeningBalanceChange = (e) => {
//     const { name, value } = e.target;
//     setSupplier((prev) => ({
//       ...prev,
//       openingBalance: {
//         ...prev.openingBalance,
//         [name]: value,
//       },
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editing) {
//       api
//         .put(`/api/suppliers/${id}`, supplier)
//         .then(() => navigate("/supplier_detail"))
//         .catch((error) => console.error("Error updating supplier:", error));
//     } else {
//       api
//         .post("/api/suppliers", supplier)
//         .then(() => navigate("/supplier_detail"))
//         .catch((error) => console.error("Error creating supplier:", error));
//     }
//   };


//   const handleCheckboxChange2 = (e) => {
//     setShowAddressDetails(e.target.checked);
//   };





//   return (
//     <>
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-xl-12">
//             <Box sx={{ display: "flex" }}>
//               <CssBaseline />
//               <Header />
//               <Box component="main" sx={{ flexGrow: 1 }}>
//                 <DrawerHeader />
//                 <div className="container-fluid">
//                   <div className="row d-flex justify-content-between">
//                     <div className="col-xl-6">
//                       <h4 className="fw-bold text-start">
//                         {editing ? "Edit Supplier" : "Create Supplier"}
//                       </h4>
//                     </div>
//                     <div className="col-xl-6 text-end">
//                       <Link to={"/supplier_detail"}>
//                         <Button
//                           variant="contained"
//                           size="small"
//                           className="me-2"
//                         >
//                           List
//                         </Button>
//                       </Link>
//                       <Button
//                         aria-controls={open ? "dropdown-menu" : undefined}
//                         aria-haspopup="true"
//                         onClick={handleClick}
//                         variant="contained"
//                         size="small"
//                       >
//                         Select Masters
//                       </Button>
//                       <Menu
//                         id="dropdown-menu"
//                         anchorEl={anchorEl}
//                         open={open}
//                         onClose={handleClose}
//                       >
//                         <MenuItem onClick={handleClose}>
//                           <Link
//                             to="/account_master"
//                             style={{ textDecoration: "none", color: "inherit" }}
//                           >
//                             Customer Master
//                           </Link>
//                         </MenuItem>
//                         <MenuItem onClick={handleClose}>
//                           <Link
//                             to="/add_supplier_master"
//                             style={{ textDecoration: "none", color: "inherit" }}
//                           >
//                             Supplier Master
//                           </Link>
//                         </MenuItem>
//                         <MenuItem onClick={handleClose}>
//                           <Link
//                             to="/add_general_master"
//                             style={{ textDecoration: "none", color: "inherit" }}
//                           >
//                             General Master
//                           </Link>
//                         </MenuItem>
//                       </Menu>
//                     </div>
//                   </div>
//                   <div className="row"></div>
//                   <div className="row">
//                     <div className="col-xl-12">
//                       <Box component="form" onSubmit={handleSubmit}>
//                         <ToastContainer />
//                         <div className="row">
//                           <div className="col-xl-12 mx-auto p-4">
//                             <div className="row">
//                               <div
//                                 className="row mx-auto d-flex p-3"
//                                 style={{
//                                   border: "1px solid gray",
//                                   borderRadius: "5px",
//                                 }}
//                               >
//                                 <div className="col-xl-12">
//                                   <h4>
//                                     <span
//                                       style={{
//                                         fontSize: "20px",
//                                         color: "rgb(1, 87, 155)",
//                                       }}
//                                       className="fw-bold"
//                                     >
//                                       Personal Information
//                                     </span>
//                                   </h4>
//                                 </div>

//                                 <div className="row">
//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Party Name"
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       id="partyName"
//                                       name="partyName"
//                                       type="text"
//                                       className="form-control form-control-sm"
//                                       value={supplier.partyName}
//                                       onChange={handleChange}
//                                       required
//                                     />
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="First Name"
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       id="firstName"
//                                       name="firstName"
//                                       type="text"
//                                       value={supplier.firstName}
//                                       onChange={handleChange}
//                                     />
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Last Name"
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       id="lastName"
//                                       name="lastName"
//                                       type="text"
//                                       value={supplier.lastName}
//                                       onChange={handleChange}
//                                     />
//                                   </div>
//                                 </div>

//                                 <div className="row">
//                                   <div className="col-xl-3">
//                                     <Box
//                                       display="flex"
//                                       alignItems="center"
//                                       margin="normal"
//                                     >
//                                       <FormControl
//                                         fullWidth
//                                         margin="normal"
//                                         size="small"
//                                       >
//                                         <InputLabel id="alternativeunit-label">
//                                           Area
//                                         </InputLabel>
//                                         <Select
//                                           label="Area"
//                                           fullWidth
//                                           margin="normal"
//                                           size="small"
//                                           id="area"
//                                           name="area"
//                                           value={supplier.area}
//                                           onChange={handleChange}
//                                           required
//                                         >
//                                           <MenuItem value="">
//                                             Select Area
//                                           </MenuItem>
//                                           {areas.map((area) => (
//                                             <MenuItem
//                                               key={area.id}
//                                               value={area.name}
//                                             >
//                                               {area.name}
//                                             </MenuItem>
//                                           ))}
//                                         </Select>
//                                       </FormControl>
//                                     </Box>
//                                   </div>
//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Party Code"
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       id="partyCode"
//                                       name="partyCode"
//                                       type="text"
//                                       className="form-control form-control-sm"
//                                       value={supplier.partyCode}
//                                       onChange={handleChange}
//                                       required
//                                     />
//                                   </div>
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="Opening Balance"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     id="openingBalanceAmount"
//                                     name="amount"
//                                     type="number"
//                                     value={supplier.openingBalance.amount}
//                                     onChange={handleOpeningBalanceChange}
//                                     required
//                                   />
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <Box
//                                     display="flex"
//                                     alignItems="center"
//                                     margin="normal"
//                                   >
//                                     <FormControl
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                     >
//                                       <InputLabel id="alternativeunit-label">
//                                         Balance Type
//                                       </InputLabel>
//                                       <Select
//                                         labelId="alternativeunit-label"
//                                         label="Balance Type"
//                                         id="openingBalanceType"
//                                         name="type"
//                                         value={supplier.openingBalance.type}
//                                         onChange={handleOpeningBalanceChange}
//                                         required
//                                       >
//                                         <MenuItem value="credit">
//                                           Credit
//                                         </MenuItem>
//                                         <MenuItem value="debit">Debit</MenuItem>
//                                       </Select>
//                                     </FormControl>
//                                   </Box>
//                                 </div>
//                               </div>

//                               <div>
//                                 <div className="form-group">
//                                   <FormControlLabel
//                                     control={
//                                       <Checkbox
//                                         type="checkbox"
//                                         checked={showAddressDetails}
//                                         onChange={handleCheckboxChange2}
//                                         color="success"
//                                       />
//                                     }
//                                     label="Show Address Details"
//                                   />
//                                 </div>

//                                 {showAddressDetails && (
                                
//                                   <div
//                                   className="row mx-auto d-flex p-3 mt-3"
//                                   style={{
//                                     border: "1px solid gray",
//                                     borderRadius: "5px",
//                                   }}
//                                 >
//                                   <div className="col-xl-12 mt-2">
//                                     <h4>
//                                       <span
//                                         style={{
//                                           fontSize: "20px",
//                                           color: "rgb(1, 87, 155)",
//                                         }}
//                                         className="fw-bold"
//                                       >
//                                         Address
//                                       </span>
//                                     </h4>
//                                   </div>
  
//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Address Line 1"
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       id="houseNumber"
//                                       name="houseNumber"
//                                       type="text"
//                                       value={supplier.address.houseNumber}
//                                       onChange={handleAddressChange}
//                                       required
//                                     />
//                                   </div>
  
//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Address Line 2"
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       id="streetName"
//                                       name="streetName"
//                                       type="text"
//                                       value={supplier.address.streetName}
//                                       onChange={handleAddressChange}
//                                     />
//                                   </div>
  
//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Locality"
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       id="locality"
//                                       name="locality"
//                                       type="text"
//                                       value={supplier.address.locality}
//                                       onChange={handleAddressChange}
//                                     />
//                                   </div>
  
//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Landmark"
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       id="landmark"
//                                       name="landmark"
//                                       type="text"
//                                       value={supplier.address.landmark}
//                                       onChange={handleAddressChange}
//                                     />
//                                   </div>
  
//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Cross Road"
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       id="crossRoad"
//                                       name="crossRoad"
//                                       type="text"
//                                       value={supplier.address.crossRoad}
//                                       onChange={handleAddressChange}
//                                     />
//                                   </div>
  
//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Related Location"
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       id="relatedLocation"
//                                       name="relatedLocation"
//                                       type="text"
//                                       value={supplier.address.relatedLocation}
//                                       onChange={handleAddressChange}
//                                     />
//                                   </div>
  
//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Pin Code"
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       id="pinCode"
//                                       name="pinCode"
//                                       type="text"
//                                       value={supplier.address.pinCode}
//                                       onChange={handleAddressChange}
//                                     />
//                                   </div>
//                                 </div> 
//                                 )}
//                               </div>

//                               <div
//                                 className="row mx-auto d-flex p-3 mt-3"
//                                 style={{
//                                   border: "1px solid gray",
//                                   borderRadius: "5px",
//                                 }}
//                               >
//                                 <div className="col-xl-12  d-flex">
//                                   <h4>
//                                     <span
//                                       style={{
//                                         fontSize: "20px",
//                                         color: "rgb(1, 87, 155)",
//                                       }}
//                                       className="fw-bold"
//                                     >
//                                       Bank Detail
//                                     </span>
//                                   </h4>

//                                   <Tooltip
//                                     title="Add Bank Detail"
//                                     placement="top-start"
//                                   >
//                                     <IconButton
//                                       onClick={() => setShowModal(true)}
//                                       sx={{ ml: 1 }}
//                                       style={{
//                                         background: "#ffe0b2",
//                                         width: "30px",
//                                         height: "30px",
//                                       }}
//                                       className="mt-0"
//                                     >
//                                       <AddIcon />
//                                     </IconButton>
//                                   </Tooltip>
//                                 </div>
//                                 {supplier.bankDetails.map((bank, index) => (
//                                   <div className="row" key={index}>
//                                     <div className="col-xl-3">
//                                       <TextField
//                                         label="Firm Name"
//                                         fullWidth
//                                         margin="normal"
//                                         size="small"
                                        

//                                         id={`firmName${index}`}
//                                         name="firmName"
//                                         type="text"
//                                         value={bank.firmName}
//                                         onChange={(e) =>
//                                           handleBankDetailsChange(index, e)
//                                         }
//                                       />
//                                     </div>

//                                     <div className="col-xl-3">
//                                       <TextField
//                                         label="Account Number"
//                                         fullWidth
//                                         margin="normal"
//                                         size="small"
                                      

//                                         id={`accountNumber${index}`}
//                                         name="accountNumber"
//                                         type="text"
//                                         value={bank.accountNumber}
//                                         onChange={(e) =>
//                                           handleBankDetailsChange(index, e)
//                                         }
//                                       />
//                                     </div>

//                                     <div className="col-xl-3">
//                                       <TextField
//                                         label="Bank Name"
//                                         fullWidth
//                                         margin="normal"
//                                         size="small"
//                                         id={`bankName${index}`}
//                                         name="bankName"
//                                         type="text"
//                                         value={bank.bankName}
//                                         onChange={(e) =>
//                                           handleBankDetailsChange(index, e)
//                                         }
//                                       />
//                                     </div>

//                                     <div className="col-xl-3">
//                                       <TextField
//                                         label="IFSC Code"
//                                         fullWidth
//                                         margin="normal"
//                                         size="small"
//                                         id={`ifscCode${index}`}
//                                         name="ifscCode"
//                                         type="text"
//                                         className="form-control form-control-sm"
//                                         value={bank.ifscCode}
//                                         onChange={(e) =>
//                                           handleBankDetailsChange(index, e)
//                                         }
//                                       />
//                                     </div>
//                                   </div>
//                                 ))}
                               
//                               </div>

//                               <div
//                                 className="row mx-auto d-flex p-3 mt-3"
//                                 style={{
//                                   border: "1px solid gray",
//                                   borderRadius: "5px",
//                                 }}
//                               >
//                                 <div className="col-xl-12 d-flex">
//                                   <h4>
//                                     <span
//                                       style={{
//                                         fontSize: "20px",
//                                         color: "rgb(1, 87, 155)",
//                                       }}
//                                       className="fw-bold"
//                                     >
//                                       Contact Number
//                                     </span>
//                                   </h4>

//                                   <Tooltip
//                                     title="Add Contact"
//                                     placement="top-start"
//                                   >
//                                     <IconButton
//                                       onClick={() =>
//                                         setSupplier((prev) => ({
//                                           ...prev,
//                                           contactNumbers: [
//                                             ...prev.contactNumbers,
//                                             { number: "", name: "" },
//                                           ],
//                                         }))
//                                       }
//                                       sx={{ ml: 1 }}
//                                       style={{
//                                         background: "#ffe0b2",
//                                         width: "30px",
//                                         height: "30px",
//                                       }}
//                                       className="mt-0"
//                                     >
//                                       <AddIcon />
//                                     </IconButton>
//                                   </Tooltip>
//                                 </div>

//                                 <div className="col-xl-6">
//                                   <div className="row">
//                                     <div className="col-xl-12">
//                                       <div className="row d-flex">
                                       

//                                         {supplier.contactNumbers.map(
//                                           (contact, index) => (
                                           

//                                             <div className="row" key={index}>
//                                               <div className="col-xl-6">
//                                                 <TextField
//                                                   label="Contact Number"
//                                                   fullWidth
//                                                   margin="normal"
//                                                   size="small"
//                                                   type="text"
//                                                   name="number"
//                                                   value={contact.number}
//                                                   onChange={(e) =>
//                                                     handleContactChange(
//                                                       index,
//                                                       e
//                                                     )
//                                                   }
//                                                   placeholder={`Contact Number ${
//                                                     index + 1
//                                                   }`}
//                                                 />
//                                               </div>

//                                               <div className="col-xl-6">
//                                                 <TextField
//                                                   label="Contact Name"
//                                                   fullWidth
//                                                   margin="normal"
//                                                   size="small"
//                                                   type="text"
//                                                   name="name"
//                                                   value={contact.name}
//                                                   onChange={(e) =>
//                                                     handleContactChange(
//                                                       index,
//                                                       e
//                                                     )
//                                                   }
//                                                   placeholder={`Contact Name ${
//                                                     index + 1
//                                                   }`}
//                                                 />
//                                               </div>
//                                             </div>
//                                           )
//                                         )}

                                      

                                       
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>

//                               <div
//                                 className="row mx-auto d-flex p-3 mt-3"
//                                 style={{
//                                   border: "1px solid gray",
//                                   borderRadius: "5px",
//                                 }}
//                               >
//                                 <div className="col-xl-12">
//                                   <h4>
//                                     <span
//                                       style={{
//                                         fontSize: "20px",
//                                         color: "rgb(1, 87, 155)",
//                                       }}
//                                       className="fw-bold"
//                                     >
//                                       Associated Counter
//                                     </span>
//                                   </h4>
//                                 </div>

//                                 <div className="col-xl-6">
//                                   <div className="row">
//                                     <div className="col-xl-12">
//                                       <div className="row">
//                                         <div className="col-xl-6 d-flex">
//                                           <div className="col-md-12 d-flex">
                                           
//                                             <select
//                                               id="associatedCounter"
//                                               name="associatedCounter"
//                                               className="form-select form-select-sm mt-4"
//                                               value={supplier.associatedCounter}
//                                               onChange={handleChange}
                                              
//                                             >
//                                               <option value="">
//                                                 Select Department
//                                               </option>
//                                               {departments.map((dept) => (
//                                                 <option
//                                                   key={dept.id}
//                                                   value={dept.id}
//                                                 >
//                                                   {dept.name}
//                                                 </option>
//                                               ))}
//                                             </select>


//                                             <span>
//                                             <Tooltip
//                                             title="Add Department"
//                                             placement="top-start"
//                                           >
//                                             <IconButton
//                                               onClick={
//                                                 handleDepartmentDialogOpen
//                                               }
//                                               sx={{ ml: 1 }}
//                                               style={{
//                                                 background: "#ffe0b2",
//                                                 width: "30px",
//                                                 height: "30px",
//                                               }}
//                                               className="mt-4"
//                                             >
//                                               <AddIcon />
//                                             </IconButton>
//                                           </Tooltip>
//                                             </span>

//                                            {/* <Box
//                                             display="flex"
//                                             alignItems="center"
//                                             margin="normal"
//                                           >
//                                             <FormControl
//                                               fullWidth
//                                               margin="normal"
//                                               size="small"
//                                             >
//                                               <InputLabel  id="associatedCounter-label">
//                                                 Department
//                                               </InputLabel>
//                                               <Select
//                                                 label="Department"
//                                                 fullWidth
//                                                 margin="normal"
//                                                 size="small"
//                                                 id="associatedCounter"
//                                                 name="associatedCounter"
//                                                 className="form-select form-select-sm"
//                                                 value={supplier.associatedCounter}
//                                                 onChange={handleChange}
//                                                 required
//                                               >
//                                                 <MenuItem value="">
//                                                   Select Department
//                                                 </MenuItem>
//                                                 {departments.map((dept) => (
//                                                   <MenuItem
//                                                   key={dept.id} value={dept.id}
//                                                   >
//                                                     {dept.name}
//                                                   </MenuItem>
//                                                 ))}
//                                               </Select>
//                                             </FormControl>
//                                           </Box> */}

                                        
//                                           </div>

                                         
//                                         </div>
//                                         <div className="col-xl-6">
//                                           <TextField
//                                             label="Salesman"
//                                             fullWidth
//                                             margin="normal"
//                                             size="small"
//                                             id="associatedSalesman"
//                                             name="associatedSalesman"
//                                             type="text"
//                                             value={supplier.associatedSalesman}
//                                             onChange={handleChange}
//                                           />
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>

//                               <div className="col-xl-4  mx-auto">
//                                 <Button
//                                   type="submit"
//                                   variant="contained"
//                                   color="primary"
//                                   fullWidth
//                                   sx={{ mt: 2 }}
//                                   className="p-2 fw-bold"
//                                 >
//                                   {editing
//                                     ? "Update Supplier Account Master"
//                                     : "Add Supplier Account Master"}
//                                 </Button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </Box>
//                     </div>
//                   </div>
//                 </div>
//               </Box>
//             </Box>
//           </div>
//         </div>
//       </div>

     

//       <Dialog open={showModal} onHide={() => setShowModal(false)}>
//         <DialogTitle>Add Bank Details</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Number of Bank Details"
//             fullWidth
//             type="number"
//             value={numberOfBankDetails}
//             onChange={handleNumberOfBankDetailsChange}
//             min="1"
//             size="small"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button
//             color="error"
//             variant="contained"
//             onClick={() => setShowModal(false)}
//           >
//             Cancel
//           </Button>
//           <Button
//             color="primary"
//             variant="contained"
//             onClick={handleAddBankDetails}
//           >
//             Add
//           </Button>
//         </DialogActions>
//       </Dialog>

     
//     </>
//   );
// }











//================================= Live Update Code =========================


import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../services/api";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";

import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { FormControl, InputLabel, Select, IconButton } from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import AddIcon from "@mui/icons-material/Add";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../../../schema/Header";

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    box-sizing: border-box;
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function AddSupplierMaster() {
  const [supplier, setSupplier] = useState({
    partyName: "",
    firstName: "",
    lastName: "",
    area: "",
    partyCode: "",
    openingBalance: { amount: 0, type: "credit" }, // default value
    address: {
      houseNumber: "",
      streetName: "",
      locality: "",
      landmark: "",
      crossRoad: "",
      relatedLocation: "",
      pinCode: "",
    },
    contactNumbers: [{ number: "", name: "" }],
    bankDetails: [
      { accountNumber: "", firmName: "", bankName: "", ifscCode: "" },
    ],
    associatedCounter: "",
    associatedSalesman: "",
  });

  const [numberOfBankDetails, setNumberOfBankDetails] = useState(1);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [editing, setEditing] = useState(false);
  const [showAddressDetails, setShowAddressDetails] = useState(false);
  const [departments, setDepartments] = useState([]); // State for departments
  const [areas, setAreas] = useState([]); // State for areas
  const [existingSuppliers, setExistingSuppliers] = useState([]); // State for existing suppliers

  const navigate = useNavigate();
  const { id } = useParams();

  const [isDepartmentDialogOpen, setIsDepartmentDialogOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDepartmentDialogOpen = () => {
    setIsDepartmentDialogOpen(true);
  };

  const handleDepartmentDialogClose = () => {
    setIsDepartmentDialogOpen(false);
  };

  useEffect(() => {
    if (id) {
      setEditing(true);
      api
        .get(`/api/suppliers/${id}`)
        .then((response) => {
          const data = response.data;
          setSupplier(data);
          setNumberOfBankDetails(data.bankDetails.length);
        })
        .catch((error) => console.error("Error fetching supplier:", error));
    }
  }, [id]);

  useEffect(() => {
    api
      .get("/departments") // Fetch departments from API
      .then((response) => {
        setDepartments(response.data); // Set the departments state
      })
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);

  useEffect(() => {
    async function fetchAreas() {
      try {
        const response = await api.get("/api/areas");
        setAreas(response.data);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    }
    fetchAreas();
  }, []);

  useEffect(() => {
    if (supplier.area) {
      api
        .get(`/api/suppliers?area=${supplier.area}`)
        .then((response) => {
          setExistingSuppliers(response.data);
          generatePartyCode(supplier.area, response.data);
        })
        .catch((error) =>
          console.error("Error fetching existing suppliers:", error)
        );
    }
  }, [supplier.area]);

  const generatePartyCode = (areaName, existingSuppliers) => {
    if (!areaName) return;
    const areaInitial = areaName.charAt(0).toUpperCase();
    const similarSuppliers = existingSuppliers.filter((supplier) =>
      supplier.partyCode.startsWith(areaInitial)
    );
    const nextNumber = similarSuppliers.length + 1;
    const newPartyCode = `${areaInitial}${nextNumber}`;
    setSupplier((prev) => ({
      ...prev,
      partyCode: newPartyCode,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleBankDetailsChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBankDetails = [...supplier.bankDetails];
    updatedBankDetails[index][name] = value;
    setSupplier((prev) => ({
      ...prev,
      bankDetails: updatedBankDetails,
    }));
  };

  const handleContactChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContactNumbers = [...supplier.contactNumbers];
    updatedContactNumbers[index][name] = value;
    setSupplier((prev) => ({
      ...prev,
      contactNumbers: updatedContactNumbers,
    }));
  };

  const handleAddBankDetails = () => {
    const newBankDetails = Array.from(
      { length: numberOfBankDetails },
      (_, i) => ({
        accountNumber: "",
        firmName: "",
        bankName: "",
        ifscCode: "",
      })
    );
    setSupplier((prevData) => ({
      ...prevData,
      bankDetails: newBankDetails,
    }));
    setShowModal(false); // Close the modal after updating the bank details
  };

  const handleNumberOfBankDetailsChange = (e) => {
    setNumberOfBankDetails(Number(e.target.value));
  };

  const handleOpeningBalanceChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({
      ...prev,
      openingBalance: {
        ...prev.openingBalance,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      api
        .put(`/api/suppliers/${id}`, supplier)
        .then(() => navigate("/supplier_detail"))
        .catch((error) => console.error("Error updating supplier:", error));
    } else {
      api
        .post("/api/suppliers", supplier)
        .then(() => navigate("/supplier_detail"))
        .catch((error) => console.error("Error creating supplier:", error));
    }
  };

  const handleCheckboxChange2 = (e) => {
    setShowAddressDetails(e.target.checked);
  };

  // Function to delete a contact number
  const handleDeleteContact = (index) => {
    const updatedContactNumbers = supplier.contactNumbers.filter(
      (_, i) => i !== index
    );
    setSupplier((prev) => ({
      ...prev,
      contactNumbers: updatedContactNumbers,
    }));
  };

  const handleDeleteBankDetail = (index) => {
    const updatedBankDetails = supplier.bankDetails.filter(
      (_, i) => i !== index
    );
    setSupplier((prev) => ({
      ...prev,
      bankDetails: updatedBankDetails,
    }));
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <Header />
              <Box component="main" sx={{ flexGrow: 1 }}>
                <DrawerHeader />
                <div className="container-fluid">
                  <div className="row d-flex justify-content-between">
                    <div className="col-xl-6">
                      <h4 className="fw-bold text-start">
                        {editing ? "Update Supplier Account Master" : "Add Supplier Account Master "}
                      </h4>
                    </div>
                    <div className="col-xl-6 text-end">
                      <Link to={"/supplier_detail"}>
                        <Button
                          variant="contained"
                          size="small"
                          className="me-2"
                          color="secondary"
                        >
                          List
                        </Button>
                      </Link>
                      <Button
                        aria-controls={open ? "dropdown-menu" : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                        variant="contained"
                        size="small"
                      >
                        Select Masters
                      </Button>
                      <Menu
                        id="dropdown-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleClose}>
                          <Link
                            to="/account_master"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            Customer Master
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <Link
                            to="/add_supplier_master"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            Supplier Master
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <Link
                            to="/add_general_master"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            Journal Master
                          </Link>
                        </MenuItem>
                      </Menu>
                    </div>
                  </div>
                  <div className="row"></div>
                  <div className="row">
                    <div className="col-xl-12">
                      <Box component="form" onSubmit={handleSubmit}>
                        <ToastContainer />
                        <div className="row">
                          <div className="col-xl-12 mx-auto p-4">
                            <div className="row">
                              <div
                                className="row mx-auto d-flex p-3"
                                style={{
                                  border: "1px solid gray",
                                  borderRadius: "5px",
                                }}
                              >
                                <div className="col-xl-12">
                                  <h4>
                                    <span
                                      style={{
                                        fontSize: "20px",
                                        color: "rgb(1, 87, 155)",
                                      }}
                                      className="fw-bold"
                                    >
                                      Personal Information
                                    </span>
                                  </h4>
                                </div>

                                <div className="row">
                                  <div className="col-xl-3">
                                    <TextField
                                      label="Party Name"
                                      fullWidth
                                      margin="normal"
                                      size="small"
                                      id="partyName"
                                      name="partyName"
                                      type="text"
                                      className="form-control form-control-sm"
                                      value={supplier.partyName}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>

                                  <div className="col-xl-3">
                                    <TextField
                                      label="First Name"
                                      fullWidth
                                      margin="normal"
                                      size="small"
                                      id="firstName"
                                      name="firstName"
                                      type="text"
                                      value={supplier.firstName}
                                      onChange={handleChange}
                                    />
                                  </div>

                                  <div className="col-xl-3">
                                    <TextField
                                      label="Last Name"
                                      fullWidth
                                      margin="normal"
                                      size="small"
                                      id="lastName"
                                      name="lastName"
                                      type="text"
                                      value={supplier.lastName}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-xl-3">
                                    <Box
                                      display="flex"
                                      alignItems="center"
                                      margin="normal"
                                    >
                                      <FormControl
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                      >
                                        <InputLabel id="alternativeunit-label">
                                          Area
                                        </InputLabel>
                                        <Select
                                          label="Area"
                                          fullWidth
                                          margin="normal"
                                          size="small"
                                          id="area"
                                          name="area"
                                          value={supplier.area}
                                          onChange={handleChange}
                                          required
                                        >
                                          <MenuItem value="">
                                            Select Area
                                          </MenuItem>
                                          {areas.map((area) => (
                                            <MenuItem
                                              key={area.id}
                                              value={area.name}
                                            >
                                              {area.name}
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </FormControl>
                                    </Box>
                                  </div>

                                  <div className="col-xl-3">
                                    <TextField
                                      label="Party Code"
                                      fullWidth
                                      margin="normal"
                                      size="small"
                                      id="partyCode"
                                      name="partyCode"
                                      type="text"
                                      className="form-control form-control-sm"
                                      value={supplier.partyCode}
                                      onChange={handleChange}
                                      required
                                    />
                                  </div>

                                  <div className="col-xl-3">
                                    <TextField
                                      label="Opening Balance"
                                      fullWidth
                                      margin="normal"
                                      size="small"
                                      id="openingBalanceAmount"
                                      name="amount"
                                      type="number"
                                      value={supplier.openingBalance.amount}
                                      onChange={handleOpeningBalanceChange}
                                      required
                                    />
                                  </div>

                                  <div className="col-xl-3">
                                    <Box
                                      display="flex"
                                      alignItems="center"
                                      margin="normal"
                                    >
                                      <FormControl
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                      >
                                        <InputLabel id="alternativeunit-label">
                                          Balance Type
                                        </InputLabel>
                                        <Select
                                          labelId="alternativeunit-label"
                                          label="Balance Type"
                                          id="openingBalanceType"
                                          name="type"
                                          value={supplier.openingBalance.type}
                                          onChange={handleOpeningBalanceChange}
                                          required
                                        >
                                          <MenuItem value="credit">
                                            Credit
                                          </MenuItem>
                                          <MenuItem value="debit">
                                            Debit
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    </Box>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <div className="form-group">
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        type="checkbox"
                                        checked={showAddressDetails}
                                        onChange={handleCheckboxChange2}
                                        color="success"
                                      />
                                    }
                                    label="Show Address Details"
                                  />
                                </div>

                                {showAddressDetails && (
                                  <div
                                    className="row mx-auto d-flex p-3 mt-3"
                                    style={{
                                      border: "1px solid gray",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    <div className="col-xl-12 mt-2">
                                      <h4>
                                        <span
                                          style={{
                                            fontSize: "20px",
                                            color: "rgb(1, 87, 155)",
                                          }}
                                          className="fw-bold"
                                        >
                                          Address
                                        </span>
                                      </h4>
                                    </div>

                                    <div className="col-xl-3">
                                      <TextField
                                        label="Address Line 1"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        id="houseNumber"
                                        name="houseNumber"
                                        type="text"
                                        value={supplier.address.houseNumber}
                                        onChange={handleAddressChange}
                                        required
                                      />
                                    </div>

                                    <div className="col-xl-3">
                                      <TextField
                                        label="Address Line 2"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        id="streetName"
                                        name="streetName"
                                        type="text"
                                        value={supplier.address.streetName}
                                        onChange={handleAddressChange}
                                      />
                                    </div>

                                    <div className="col-xl-3">
                                      <TextField
                                        label="Locality"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        id="locality"
                                        name="locality"
                                        type="text"
                                        value={supplier.address.locality}
                                        onChange={handleAddressChange}
                                      />
                                    </div>

                                    <div className="col-xl-3">
                                      <TextField
                                        label="Landmark"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        id="landmark"
                                        name="landmark"
                                        type="text"
                                        value={supplier.address.landmark}
                                        onChange={handleAddressChange}
                                      />
                                    </div>

                                    <div className="col-xl-3">
                                      <TextField
                                        label="Cross Road"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        id="crossRoad"
                                        name="crossRoad"
                                        type="text"
                                        value={supplier.address.crossRoad}
                                        onChange={handleAddressChange}
                                      />
                                    </div>

                                    <div className="col-xl-3">
                                      <TextField
                                        label="Related Location"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        id="relatedLocation"
                                        name="relatedLocation"
                                        type="text"
                                        value={supplier.address.relatedLocation}
                                        onChange={handleAddressChange}
                                      />
                                    </div>

                                    <div className="col-xl-3">
                                      <TextField
                                        label="Pin Code"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        id="pinCode"
                                        name="pinCode"
                                        type="text"
                                        value={supplier.address.pinCode}
                                        onChange={handleAddressChange}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div
                                className="row mx-auto d-flex p-3 mt-3"
                                style={{
                                  border: "1px solid gray",
                                  borderRadius: "5px",
                                }}
                              >
                                <div className="col-xl-12  d-flex">
                                  <h4>
                                    <span
                                      style={{
                                        fontSize: "20px",
                                        color: "rgb(1, 87, 155)",
                                      }}
                                      className="fw-bold"
                                    >
                                      Bank Detail
                                    </span>
                                  </h4>

                                  <Tooltip
                                    title="Add Bank Detail"
                                    placement="top-start"
                                  >
                                    <IconButton
                                      onClick={() => setShowModal(true)}
                                      sx={{ ml: 1 }}
                                      style={{
                                        background: "#ffe0b2",
                                        width: "30px",
                                        height: "30px",
                                      }}
                                      className="mt-0"
                                    >
                                      <AddIcon />
                                    </IconButton>
                                  </Tooltip>
                                </div>
                                {supplier.bankDetails.map((bank, index) => (
                                  <div className="row" key={index}>
                                    <div className="col-xl-3">
                                      <TextField
                                        label="Firm Name"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        id={`firmName${index}`}
                                        name="firmName"
                                        type="text"
                                        value={bank.firmName}
                                        onChange={(e) =>
                                          handleBankDetailsChange(index, e)
                                        }
                                      />
                                    </div>

                                    <div className="col-xl-2">
                                      <TextField
                                        label="Account Number"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        id={`accountNumber${index}`}
                                        name="accountNumber"
                                        type="text"
                                        value={bank.accountNumber}
                                        onChange={(e) =>
                                          handleBankDetailsChange(index, e)
                                        }
                                      />
                                    </div>

                                    <div className="col-xl-3">
                                      <TextField
                                        label="Bank Name"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        id={`bankName${index}`}
                                        name="bankName"
                                        type="text"
                                        value={bank.bankName}
                                        onChange={(e) =>
                                          handleBankDetailsChange(index, e)
                                        }
                                      />
                                    </div>

                                    <div className="col-xl-2">
                                      <TextField
                                        label="IFSC Code"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        id={`ifscCode${index}`}
                                        name="ifscCode"
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={bank.ifscCode}
                                        onChange={(e) =>
                                          handleBankDetailsChange(index, e)
                                        }
                                      />
                                    </div>

                                    <div className="col-xl-2">
                                      <Tooltip
                                        title="Delete "
                                        placement="top-start"
                                      >
                                        <IconButton
                                          onClick={() =>
                                            handleDeleteBankDetail(index)
                                          }
                                          sx={{ ml: 1 }}
                                          style={{
                                            background: "#ffe0b2",
                                            width: "30px",
                                            height: "30px",
                                            marginTop: "20px",
                                          }}
                                        >
                                          <DeleteIcon className="text-danger" />
                                        </IconButton>
                                      </Tooltip>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div
                                className="row mx-auto d-flex p-3 mt-3"
                                style={{
                                  border: "1px solid gray",
                                  borderRadius: "5px",
                                }}
                              >
                                <div className="col-xl-12 d-flex">
                                  <h4>
                                    <span
                                      style={{
                                        fontSize: "20px",
                                        color: "rgb(1, 87, 155)",
                                      }}
                                      className="fw-bold"
                                    >
                                      Contact Number
                                    </span>
                                  </h4>

                                  <Tooltip
                                    title="Add Contact"
                                    placement="top-start"
                                  >
                                    <IconButton
                                      onClick={() =>
                                        setSupplier((prev) => ({
                                          ...prev,
                                          contactNumbers: [
                                            ...prev.contactNumbers,
                                            { number: "", name: "" },
                                          ],
                                        }))
                                      }
                                      sx={{ ml: 1 }}
                                      style={{
                                        background: "#ffe0b2",
                                        width: "30px",
                                        height: "30px",
                                      }}
                                      className="mt-0"
                                    >
                                      <AddIcon />
                                    </IconButton>
                                  </Tooltip>
                                </div>

                                <div className="col-xl-6">
                                  <div className="row">
                                    <div className="col-xl-12">
                                      <div className="row d-flex">
                                        {supplier.contactNumbers.map(
                                          (contact, index) => (
                                            <div className="row" key={index}>
                                              <div className="col-xl-5">
                                                <TextField
                                                  label="Contact Number"
                                                  fullWidth
                                                  margin="normal"
                                                  size="small"
                                                  type="text"
                                                  name="number"
                                                  value={contact.number}
                                                  onChange={(e) =>
                                                    handleContactChange(
                                                      index,
                                                      e
                                                    )
                                                  }
                                                  placeholder={`Contact Number ${
                                                    index + 1
                                                  }`}
                                                />
                                              </div>

                                              <div className="col-xl-5">
                                                <TextField
                                                  label="Contact Name"
                                                  fullWidth
                                                  margin="normal"
                                                  size="small"
                                                  type="text"
                                                  name="name"
                                                  value={contact.name}
                                                  onChange={(e) =>
                                                    handleContactChange(
                                                      index,
                                                      e
                                                    )
                                                  }
                                                  placeholder={`Contact Name ${
                                                    index + 1
                                                  }`}
                                                />
                                              </div>
                                              <div className="col-xl-2">
                                                <Tooltip
                                                  title="Delete "
                                                  placement="top-start"
                                                >
                                                  <IconButton
                                                    onClick={() =>
                                                      handleDeleteContact(index)
                                                    }
                                                    sx={{ ml: 1 }}
                                                    style={{
                                                      background: "#ffe0b2",
                                                      width: "30px",
                                                      height: "30px",
                                                      marginTop: "20px",
                                                    }}
                                                    // className="mt-3"
                                                  >
                                                    <DeleteIcon className="text-danger" />
                                                  </IconButton>
                                                </Tooltip>
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div
                                className="row mx-auto d-flex p-3 mt-3"
                                style={{
                                  border: "1px solid gray",
                                  borderRadius: "5px",
                                }}
                              >
                                <div className="col-xl-12">
                                  <h4>
                                    <span
                                      style={{
                                        fontSize: "20px",
                                        color: "rgb(1, 87, 155)",
                                      }}
                                      className="fw-bold"
                                    >
                                      Associated Counter
                                    </span>
                                  </h4>
                                </div>

                                <div className="col-xl-6">
                                  <div className="row">
                                    <div className="col-xl-12">
                                      <div className="row">
                                        <div className="col-xl-6 d-flex">
                                            <select
                                              id="associatedCounter"
                                              name="associatedCounter"
                                              className="form-select form-select-md mt-4"
                                              value={supplier.associatedCounter}
                                              onChange={handleChange}
                                            >
                                              <option value="">
                                                Select Department
                                              </option>
                                              {departments.map((dept) => (
                                                <option
                                                  key={dept.id}
                                                  value={dept.id}
                                                >
                                                  {dept.name}
                                                </option>
                                              ))}
                                            </select>


{/* 
                                            <TextField
                                      select
                                      fullWidth
                                      margin="normal"
                                      size="small"
                                      required

label="Department"




                                      id="associatedCounter"
                                      name="associatedCounter"
                                      className="form-select form-select-sm "
                                      value={supplier.associatedCounter}
                                      onChange={handleChange}
                                    
                                    >
                                        <MenuItem value="">
                                        Select Department
                                        </MenuItem>
                                        
                                        {departments.map((dept) => (
                                        <MenuItem   key={dept.id}
                                        value={dept.id}
                                      >
                                        {dept.name}
                                        </MenuItem>
   ))}
                                    </TextField> */}









                                            <span>
                                              <Tooltip
                                                title="Add Department"
                                                placement="top-start"
                                              >
                                                <IconButton
                                                  onClick={
                                                    handleDepartmentDialogOpen
                                                  }
                                                  sx={{ ml: 1 }}
                                                  style={{
                                                    background: "#ffe0b2",
                                                    width: "30px",
                                                    height: "30px",
                                                  }}
                                                  className="mt-3"
                                                >
                                                  <AddIcon />
                                                </IconButton>
                                              </Tooltip>
                                            </span>
                                        </div>
                                        <div className="col-xl-6">
                                          <TextField
                                            label="Salesman"
                                            fullWidth
                                            margin="normal"
                                            size="small"
                                            id="associatedSalesman"
                                            name="associatedSalesman"
                                            type="text"
                                            value={supplier.associatedSalesman}
                                            onChange={handleChange}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-xl-4  mx-auto">
                                <Button
                                  type="submit"
                                  variant="contained"
                                  color="primary"
                                  fullWidth
                                  sx={{ mt: 2 }}
                                  className="p-2 fw-bold"
                                >
                                  {editing
                                    ? "Update Supplier Account Master"
                                    : "Add Supplier Account Master"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Box>
                    </div>
                  </div>
                </div>
              </Box>
            </Box>
          </div>
        </div>
      </div>

      <Dialog open={showModal} onHide={() => setShowModal(false)}>
        <DialogTitle>Add Bank Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Number of Bank Details"
            fullWidth
            type="number"
            value={numberOfBankDetails}
            onChange={handleNumberOfBankDetailsChange}
            min="1"
            size="small"
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            variant="contained"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleAddBankDetails}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


