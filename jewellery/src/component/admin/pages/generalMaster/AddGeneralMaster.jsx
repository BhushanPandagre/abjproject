// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

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

// const API_URL = "http://localhost:5000/api/data";

// export default function AddGeneralMaster() {
//   const { id } = useParams();
//   const navigate = useNavigate();


//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const [formData, setFormData] = useState({
//     name: "",
//     printName: "",
//     group: "",
//     openingBalance: {
//       amount: "",
//       type: "credit", // Default to 'credit' or 'debit'
//     },
//     credit: "",
//     debit: "",
//     contactDetails: {
//       mobileNumber: "",
//       whatsappNumber: "",
//     },
//     address: {
//       houseNumber: "",
//       streetName: "",
//       landmark: "",
//       crossRoad: "",
//       locality: "",
//       relatedLocation: "",
//     },
//     description: "",
//   });

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (id) {
//       fetchData();
//     }
//   }, [id]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/${id}`);
//       setFormData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const [mainField, subField] = name.split(".");

//     if (mainField === "name" && !subField) {
//       setFormData({
//         ...formData,
//         name: value,
//         printName: value, // Update printName when name changes
//       });
//     } else if (subField) {
//       if (mainField === "openingBalance") {
//         setFormData({
//           ...formData,
//           [mainField]: {
//             ...formData[mainField],
//             [subField]: value,
//           },
//         });
//       } else {
//         setFormData({
//           ...formData,
//           [mainField]: {
//             ...formData[mainField],
//             [subField]: value,
//           },
//         });
//       }
//     } else {
//       setFormData({
//         ...formData,
//         [mainField]: value,
//       });
//     }
//   };

//   const handleOpeningBalanceTypeChange = (e) => {
//     setFormData({
//       ...formData,
//       openingBalance: {
//         ...formData.openingBalance,
//         type: e.target.value,
//       },
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name) newErrors.name = "Name is required";
//     if (!formData.printName) newErrors.printName = "Print Name is required";
//     if (!formData.group) newErrors.group = "Group is required";
//     if (!formData.openingBalance.amount)
//       newErrors.openingBalanceAmount = "Opening Balance Amount is required";
//     if (!formData.contactDetails.mobileNumber)
//       newErrors.mobileNumber = "Mobile Number is required";
//     if (!formData.address.houseNumber)
//       newErrors.houseNumber = "House Number is required";
//     if (!formData.address.streetName)
//       newErrors.streetName = "Street Name is required";
//     if (!formData.address.locality) newErrors.locality = "Locality is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       if (id) {
//         await axios.put(`${API_URL}/${id}`, formData);
        
//         toast.success("General Account Updated successfully!")
//       } else {
//         await axios.post(API_URL, formData);
//         toast.success("General Account Added successfully!")
//       }
      
//       navigate("/general_master_detail"); // Redirect to the data list after submission
    


//     } catch (error) {
//       console.error("Error saving data:", error);
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
//               <Box component="main" sx={{ flexGrow: 1 }}>
//                 <DrawerHeader />
//                 <div className="container-fluid">
//                   <div className="row d-flex justify-content-between">
//                     <div className="col-xl-6">
//                       <h4 className="fw-bold text-start">
//                         {/* {editing ? "Edit Supplier" : "Create Supplier"} */}
//                         {id ? "Edit General Account" : "Add General Account"}
//                       </h4>
//                     </div>


                    
//                     <div className="col-xl-6 text-end">
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
//                                       label="Name"
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       type="text"
//                                       id="name"
//                                       name="name"
//                                       value={formData.name}
//                                       onChange={handleChange}
//                                       required
//                                     />
//                                     <p>
//                                       {" "}
//                                       {errors.name && (
//                                         <div className="text-danger">
//                                           {errors.name}
//                                         </div>
//                                       )}
//                                     </p>
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Print Name"
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       type="text"
//                                       id="printName"
//                                       name="printName"
//                                       value={formData.printName}
//                                       onChange={handleChange}
//                                       required
//                                     />
//                                     <p>
//                                       {" "}
//                                       {errors.printName && (
//                                         <div className="text-danger">
//                                           {errors.printName}
//                                         </div>
//                                       )}
//                                     </p>
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Group"
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       type="text"
//                                       id="group"
//                                       name="group"
//                                       value={formData.group}
//                                       onChange={handleChange}
//                                       required
//                                     />
//                                     {errors.group && (
//                                       <div className="text-danger">
//                                         {errors.group}
//                                       </div>
//                                     )}
//                                   </div>
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="Opening Balance"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     type="number"
//                                     id="openingBalanceAmount"
//                                     name="openingBalance.amount"
//                                     value={formData.openingBalance.amount}
//                                     onChange={handleChange}
//                                     required
//                                   />
//                                   <p>
//                                     {" "}
//                                     {errors.openingBalanceAmount && (
//                                       <div className="text-danger">
//                                         {errors.openingBalanceAmount}
//                                       </div>
//                                     )}
//                                   </p>
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
//                                         label="Balance Type"
//                                         id="openingBalanceType"
//                                         name="openingBalance.type"
//                                         value={formData.openingBalance.type}
//                                         onChange={
//                                           handleOpeningBalanceTypeChange
//                                         }
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

//                               <div
//                                 className="row mx-auto d-flex p-3 mt-3"
//                                 style={{
//                                   border: "1px solid gray",
//                                   borderRadius: "5px",
//                                 }}
//                               >
//                                 <div className="col-xl-12 mt-3">
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
//                                 </div>

//                                 <div className="col-xl-6">
//                                   <div className="row">
//                                     <div className="col-xl-12">
//                                       <div className="row d-flex">
//                                         <div className="col-xl-6">
//                                           <TextField
//                                             label="Mobile Number"
//                                             fullWidth
//                                             margin="normal"
//                                             size="small"
//                                             type="text"
//                                             id="mobileNumber"
//                                             name="contactDetails.mobileNumber"
//                                             value={
//                                               formData.contactDetails
//                                                 .mobileNumber
//                                             }
//                                             onChange={handleChange}
//                                             required
//                                           />
//                                           <p>
//                                             {" "}
//                                             {errors.mobileNumber && (
//                                               <div className="text-danger">
//                                                 {errors.mobileNumber}
//                                               </div>
//                                             )}
//                                           </p>
//                                         </div>

//                                         <div className="col-xl-6">
//                                           <TextField
//                                             label="Whatsapp Number"
//                                             fullWidth
//                                             margin="normal"
//                                             size="small"
//                                             type="text"
//                                             id="whatsappNumber"
//                                             name="contactDetails.whatsappNumber"
//                                             className="form-control"
//                                             value={
//                                               formData.contactDetails
//                                                 .whatsappNumber
//                                             }
//                                             onChange={handleChange}
//                                           />
//                                         </div>
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
//                                 <div className="col-xl-12 mt-2">
//                                   <h4>
//                                     <span
//                                       style={{
//                                         fontSize: "20px",
//                                         color: "rgb(1, 87, 155)",
//                                       }}
//                                       className="fw-bold"
//                                     >
//                                       Address
//                                     </span>
//                                   </h4>
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="House Number"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     type="text"
//                                     id="houseNumber"
//                                     name="address.houseNumber"
//                                     value={formData.address.houseNumber}
//                                     onChange={handleChange}
//                                     required
//                                   />
//                                   <p>
//                                     {" "}
//                                     {errors.houseNumber && (
//                                       <div className="text-danger">
//                                         {errors.houseNumber}
//                                       </div>
//                                     )}
//                                   </p>
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="Street Name"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     type="text"
//                                     id="streetName"
//                                     name="address.streetName"
//                                     value={formData.address.streetName}
//                                     onChange={handleChange}
//                                     required
//                                   />
//                                   <p>
//                                     {errors.streetName && (
//                                       <div className="text-danger">
//                                         {errors.streetName}
//                                       </div>
//                                     )}
//                                   </p>
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="Landmark"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     type="text"
//                                     id="landmark"
//                                     name="address.landmark"
//                                     value={formData.address.landmark}
//                                     onChange={handleChange}
//                                   />
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="Cross Road"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     type="text"
//                                     id="crossRoad"
//                                     name="address.crossRoad"
//                                     value={formData.address.crossRoad}
//                                     onChange={handleChange}
//                                   />
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="Locality"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     type="text"
//                                     id="locality"
//                                     name="address.locality"
//                                     value={formData.address.locality}
//                                     onChange={handleChange}
//                                     required
//                                   />
//                                   <p>
//                                     {errors.locality && (
//                                       <div className="text-danger">
//                                         {errors.locality}
//                                       </div>
//                                     )}
//                                   </p>
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="Related Location"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     type="text"
//                                     id="relatedLocation"
//                                     name="address.relatedLocation"
//                                     value={formData.address.relatedLocation}
//                                     onChange={handleChange}
//                                   />
//                                 </div>
//                               </div>

//                               <div
//                                 className="row mx-auto d-flex p-3 mt-3"
//                                 style={{
//                                   border: "1px solid gray",
//                                   borderRadius: "5px",
//                                 }}
//                               >
//                                 <div className="col-xl-12 mt-3">
//                                   <h4>
//                                     <span
//                                       style={{
//                                         fontSize: "20px",
//                                         color: "rgb(1, 87, 155)",
//                                       }}
//                                       className="fw-bold"
//                                     >
//                                       Description
//                                     </span>
//                                   </h4>
//                                 </div>

//                                 <div className="col-xl-12">
//                                   <Textarea
//                                     maxRows={4}
//                                     placeholder="Other Instructions......."
//                                     style={{ width: "100%" }}
//                                     className="p-4 mt-3"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     required
//                                     id="description"
//                                     name="description"
//                                     value={formData.description}
//                                     onChange={handleChange}
//                                   />
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
//                                   {id ? "Update" : "Add"} Data
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
//     </div>
//   );
// }








// ====================== Live Update Code ================================================




import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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
import api from "../../../../services/api";

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

// const API_URL = "http://localhost:5000/api/data";

export default function AddGeneralMaster() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAddressDetails, setShowAddressDetails] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [formData, setFormData] = useState({
    name: "",
    printName: "",
    group: "",
    openingBalance: {
      amount: "",
      type: "credit", // Default to 'credit' or 'debit'
    },
    credit: "",
    debit: "",
    contactDetails: {
      mobileNumber: "",
      whatsappNumber: "",
    },
    address: {
      houseNumber: "",
      streetName: "",
      landmark: "",
      crossRoad: "",
      locality: "",
      relatedLocation: "",
      pinCode: "",
    },
    description: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await api.get(`/api/data/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [mainField, subField] = name.split(".");

    if (mainField === "name" && !subField) {
      setFormData({
        ...formData,
        name: value,
        printName: value, // Update printName when name changes
      });
    } else if (subField) {
      if (mainField === "openingBalance") {
        setFormData({
          ...formData,
          [mainField]: {
            ...formData[mainField],
            [subField]: value,
          },
        });
      } else {
        setFormData({
          ...formData,
          [mainField]: {
            ...formData[mainField],
            [subField]: value,
          },
        });
      }
    } else {
      setFormData({
        ...formData,
        [mainField]: value,
      });
    }
  };

  const handleOpeningBalanceTypeChange = (e) => {
    setFormData({
      ...formData,
      openingBalance: {
        ...formData.openingBalance,
        type: e.target.value,
      },
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.printName) newErrors.printName = "Print Name is required";
    if (!formData.group) newErrors.group = "Group is required";
    if (!formData.openingBalance.amount)
      newErrors.openingBalanceAmount = "Opening Balance Amount is required";
    if (!formData.contactDetails.mobileNumber)
      newErrors.mobileNumber = "Mobile Number is required";
    if (!formData.address.houseNumber)
      newErrors.houseNumber = "House Number is required";
    if (!formData.address.streetName)
      newErrors.streetName = "Street Name is required";
    if (!formData.address.locality) newErrors.locality = "Locality is required";

    if (!formData.address.pinCode) newErrors.pinCode = " Pincode Is required ";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (id) {
        await api.put(`/api/data/${id}`, formData);

        toast.success("General Account Updated successfully!");
      } else {
        await api.post("/api/data", formData);
        toast.success("General Account Added successfully!");
      }

      navigate("/general_master_detail"); // Redirect to the data list after submission
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleCheckboxChange2 = (e) => {
    setShowAddressDetails(e.target.checked);
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
                  <div className="row d-flex justify-content-between">
                    <div className="col-xl-6">
                      <h4 className="fw-bold text-start">
                        {/* {editing ? "Edit Supplier" : "Create Supplier"} */}
                        {id ? "Edit Journal Account" : "Add Journal Account"}
                      </h4>
                    </div>

                    <div className="col-xl-6 text-end">
                    
                      <Link to={"/general_master_detail"}>
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
                                      label="Name"
                                      fullWidth
                                      margin="normal"
                                      size="small"
                                      type="text"
                                      id="name"
                                      name="name"
                                      value={formData.name}
                                      onChange={handleChange}
                                      required
                                    />
                                    <p>
                                      {" "}
                                      {errors.name && (
                                        <div className="text-danger">
                                          {errors.name}
                                        </div>
                                      )}
                                    </p>
                                  </div>

                                  <div className="col-xl-3">
                                    <TextField
                                      label="Print Name"
                                      fullWidth
                                      margin="normal"
                                      size="small"
                                      type="text"
                                      id="printName"
                                      name="printName"
                                      value={formData.printName}
                                      onChange={handleChange}
                                      required
                                    />
                                    <p>
                                      {" "}
                                      {errors.printName && (
                                        <div className="text-danger">
                                          {errors.printName}
                                        </div>
                                      )}
                                    </p>
                                  </div>

                                  <div className="col-xl-3">
                                    <TextField
                                      label="Group"
                                      fullWidth
                                      margin="normal"
                                      size="small"
                                      type="text"
                                      id="group"
                                      name="group"
                                      value={formData.group}
                                      onChange={handleChange}
                                      required
                                    />
                                    {errors.group && (
                                      <div className="text-danger">
                                        {errors.group}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="Opening Balance"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    type="number"
                                    id="openingBalanceAmount"
                                    name="openingBalance.amount"
                                    value={formData.openingBalance.amount}
                                    onChange={handleChange}
                                    required
                                  />
                                  <p>
                                    {" "}
                                    {errors.openingBalanceAmount && (
                                      <div className="text-danger">
                                        {errors.openingBalanceAmount}
                                      </div>
                                    )}
                                  </p>
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
                                        label="Balance Type"
                                        id="openingBalanceType"
                                        name="openingBalance.type"
                                        value={formData.openingBalance.type}
                                        onChange={
                                          handleOpeningBalanceTypeChange
                                        }
                                        required
                                      >
                                        <MenuItem value="credit">
                                          Credit
                                        </MenuItem>
                                        <MenuItem value="debit">Debit</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Box>
                                </div>
                              </div>

                              <div
                                className="row mx-auto d-flex p-3 mt-3"
                                style={{
                                  border: "1px solid gray",
                                  borderRadius: "5px",
                                }}
                              >
                                <div className="col-xl-12 mt-3">
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
                                </div>

                                <div className="col-xl-6">
                                  <div className="row">
                                    <div className="col-xl-12">
                                      <div className="row d-flex">
                                        <div className="col-xl-6">
                                          <TextField
                                            label="Mobile Number"
                                            fullWidth
                                            margin="normal"
                                            size="small"
                                            type="text"
                                            id="mobileNumber"
                                            name="contactDetails.mobileNumber"
                                            value={
                                              formData.contactDetails
                                                .mobileNumber
                                            }
                                            onChange={handleChange}
                                            required
                                          />
                                          <p>
                                            {" "}
                                            {errors.mobileNumber && (
                                              <div className="text-danger">
                                                {errors.mobileNumber}
                                              </div>
                                            )}
                                          </p>
                                        </div>

                                        <div className="col-xl-6">
                                          <TextField
                                            label="Whatsapp Number"
                                            fullWidth
                                            margin="normal"
                                            size="small"
                                            type="text"
                                            id="whatsappNumber"
                                            name="contactDetails.whatsappNumber"
                                            className="form-control"
                                            value={
                                              formData.contactDetails
                                                .whatsappNumber
                                            }
                                            onChange={handleChange}
                                          />
                                        </div>
                                      </div>
                                    </div>
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
                                        type="text"
                                        id="houseNumber"
                                        name="address.houseNumber"
                                        value={formData.address.houseNumber}
                                        onChange={handleChange}
                                   
                                      />
                                      <p>
                                        {" "}
                                        {errors.houseNumber && (
                                          <div className="text-danger">
                                            {errors.houseNumber}
                                          </div>
                                        )}
                                      </p>
                                    </div>

                                    <div className="col-xl-3">
                                      <TextField
                                        label="Address Line 2"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        type="text"
                                        id="streetName"
                                        name="address.streetName"
                                        value={formData.address.streetName}
                                        onChange={handleChange}
                             
                                      />
                                      <p>
                                        {errors.streetName && (
                                          <div className="text-danger">
                                            {errors.streetName}
                                          </div>
                                        )}
                                      </p>
                                    </div>

                                    <div className="col-xl-3">
                                      <TextField
                                        label="Landmark"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        type="text"
                                        id="landmark"
                                        name="address.landmark"
                                        value={formData.address.landmark}
                                        onChange={handleChange}
                                      />
                                    </div>

                                    <div className="col-xl-3">
                                      <TextField
                                        label="Cross Road"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        type="text"
                                        id="crossRoad"
                                        name="address.crossRoad"
                                        value={formData.address.crossRoad}
                                        onChange={handleChange}
                                      />
                                    </div>

                                    <div className="col-xl-3">
                                      <TextField
                                        label="Locality"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        type="text"
                                        id="locality"
                                        name="address.locality"
                                        value={formData.address.locality}
                                        onChange={handleChange}
                                     
                                      />
                                      <p>
                                        {errors.locality && (
                                          <div className="text-danger">
                                            {errors.locality}
                                          </div>
                                        )}
                                      </p>
                                    </div>

                                    <div className="col-xl-3">
                                      <TextField
                                        label="Related Location"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        type="text"
                                        id="relatedLocation"
                                        name="address.relatedLocation"
                                        value={formData.address.relatedLocation}
                                        onChange={handleChange}
                                      />
                                    </div>

                                    <div className="col-xl-3">
                                      <TextField
                                        label="Pin Code "
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        type="number"
                                        id="pinCode"
                                        name="address.pinCode"
                                        value={formData.address.pinCode}
                                        onChange={handleChange}
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
                                <div className="col-xl-12 mt-3">
                                  <h4>
                                    <span
                                      style={{
                                        fontSize: "20px",
                                        color: "rgb(1, 87, 155)",
                                      }}
                                      className="fw-bold"
                                    >
                                      Description
                                    </span>
                                  </h4>
                                </div>

                                <div className="col-xl-12">
                                  <Textarea
                                    maxRows={4}
                                    placeholder="Other Instructions......."
                                    style={{ width: "100%" }}
                                    className="p-4 mt-3"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    required
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                  />
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
                                  {id ? "Update" : "Save"} Data
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
    </div>
  );
}
