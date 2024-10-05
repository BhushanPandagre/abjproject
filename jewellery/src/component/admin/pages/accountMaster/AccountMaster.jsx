//================================= Update Live code ======================================

// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar from "@mui/material/AppBar";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
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
// import Backdrop from "@mui/material/Backdrop";
// import Modal from "@mui/material/Modal";
// import Fade from "@mui/material/Fade";
// import Menu from "@mui/material/Menu";
// import Button from "@mui/material/Button";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Stack from "@mui/material/Stack";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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
// import api from "../../../../services/api";

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
// }));

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

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
//     to="/account_master_detail"
//     className="text-decoration-none"
//     style={{ fontSize: "15px" }}
//   >
//     Ac. Master Detail
//   </Link>,

//   <Typography key="3" color="text.secondary" style={{ fontSize: "15px" }}>
//     Item Master
//   </Typography>,
// ];

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
//   box-sizing: border-box;
//   width: 320px;
//   font-family: 'IBM Plex Sans', sans-serif;
//   font-size: 0.875rem;
//   font-weight: 400;
//   line-height: 1.5;
//   padding: 8px 12px;
//   border-radius: 8px;
//   color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
//   background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
//   border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
//   box-shadow: 0px 2px 2px ${
//     theme.palette.mode === "dark" ? grey[900] : grey[50]
//   };

//   &:hover {
//     border-color: ${blue[400]};
//   }

//   &:focus {
//     border-color: ${blue[400]};
//     box-shadow: 0 0 0 3px ${
//       theme.palette.mode === "dark" ? blue[600] : blue[200]
//     };
//   }

//   // firefox
//   &:focus-visible {
//     outline: 0;
//   }
// `
// );

// export default function AccountMaster() {
//   const [countries, setCountries] = useState([]);
//   const [filteredCountries, setFilteredCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [filteredStates, setFilteredStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [filteredCities, setFilteredCities] = useState([]);
//   const navigate = useNavigate();
//   const [phoneNumberError, setPhoneNumberError] = useState(false);
//   const [whatsAppNumberError, setWhatsAppNumberError] = useState(false);
//   const [accountIdError, setAccountIdError] = useState(false);
//   const [pinCodeError, setPinCodeError] = useState(false);
//   const [image, setImage] = useState(null);
//   const [imageError, setImageError] = useState(false);
//   const [imageUrl, setImageUrl] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [ifscError, setIfscError] = useState("");
//   const [showBankDetails, setShowBankDetails] = useState(false);
//   const [showCreditDetails, setShowCreditDetails] = useState(false);
//   const [showAddressDetails, setShowAddressDetails] = useState(false);
//   const [salutations, setSalutations] = useState([]);

//   const [accountData, setAccountData] = useState({
//     salutation: "",
//     name: "",
//     printName: "",
//     image: null,
//     openingBalance: { amount: 0, type: "credit" },
//     rateType: "Semi Wholesaler",
//     customerType: "case customer",
//     visibility: "general",
//     group: "",
//     collectionRoot: "",
//     country: "India",
//     state: "",
//     city: "",
//     address: {
//       streetName: "",
//       houseNumber: "",
//       landmark: "",
//       crossRoad: "",
//       locality: "",
//       relatedLocation: "",
//       otherInstructions: "",
//     },
//     pinCode: "",
//     phoneNumber: "",
//     whatsAppNumber: "",
//     email: "",
//     bankName: "",
//     accountId: "",
//     ifscCode: "",
//     creditLimit: 0,
//     creditDays: 0,
//     creditLimitStrict: "yes",
//     // allowCreditSale: false,

//     // station: "",
//   });
//   const [autoFillWhatsApp, setAutoFillWhatsApp] = useState(false); // State for checkbox
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   //for enter func
//   const salutationRef = useRef(null);
//   const nameRef = useRef(null);
//   const printNameRef = useRef(null);
//   const openingBalanceRef = useRef(null);
//   const rateTypeRef = useRef(null);
//   const customerTypeRef = useRef(null);
//   const visibilityRef = useRef(null);
//   const groupRef = useRef(null);
//   const collectionRootRef = useRef(null);
//   const countryRef = useRef(null);
//   const stateRef = useRef(null);
//   const cityRef = useRef(null);
//   const streetNameRef = useRef(null);
//   const houseNumberRef = useRef(null);
//   const landmarkRef = useRef(null);
//   const crossRoadRef = useRef(null);
//   const localityRef = useRef(null);
//   const relatedLocationRef = useRef(null);
//   const pinCodeRef = useRef(null);
//   const otherInstructionsRef = useRef(null);
//   // const image = useref(null);
//   const phoneNumberRef = useRef(null);
//   const whatsAppNumberRef = useRef(null);
//   const emailRef = useRef(null);
//   const bankNameRef = useRef(null);
//   const creditLimitRef = useRef(null);
//   const creditDaysRef = useRef(null);
//   const creditLimitStrictRef = useRef(null);
//   const accountIdRef = useRef(null);
//   const ifscCodeRef = useRef(null);

//   const handleKeyDown = (e, nextFieldRef) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       if (nextFieldRef && nextFieldRef.current) {
//         nextFieldRef.current.focus();
//       }
//     }
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleAutoFillChange = (e) => {
//     setAutoFillWhatsApp(e.target.checked);

//     if (e.target.checked) {
//       setAccountData((prevState) => ({
//         ...prevState,
//         whatsAppNumber: accountData.phoneNumber,
//       }));
//     } else {
//       setAccountData((prevState) => ({
//         ...prevState,
//         whatsAppNumber: "",
//       }));
//     }
//   };

//   // Add a flag to track manual updates to printName
//   const [isPrintNameManuallyUpdated, setIsPrintNameManuallyUpdated] =
//     useState(false);

//   useEffect(() => {
//     const fetchSalutations = async () => {
//       try {
//         const response = await api.get("/api/salutations");
//         setSalutations(response.data); // Ensure this is an array of objects
//       } catch (err) {
//         console.error(err);
//         toast.error("Error fetching salutations");
//       }
//     };

//     fetchSalutations();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     if (type !== "file") {
//       if (name.includes(".")) {
//         const [parent, child] = name.split(".");
//         setAccountData((prevState) => ({
//           ...prevState,
//           [parent]: {
//             ...prevState[parent],
//             [child]: value,
//           },
//         }));
//       } else {
//         setAccountData((prevState) => {
//           const isNameField = name === "name";
//           const isPrintNameField = name === "printName";
//           const newState = {
//             ...prevState,
//             [name]: type === "checkbox" ? checked : value,
//           };

//           if (isNameField) {
//             if (!isPrintNameManuallyUpdated) {
//               newState.printName = formatName(value);
//             }
//           }

//           if (isPrintNameField) {
//             setIsPrintNameManuallyUpdated(true);
//             newState.printName = value;
//           }

//           return newState;
//         });
//       }
//     } else {
//       const file = files[0];
//       setAccountData((prevState) => ({
//         ...prevState,
//         image: file,
//       }));
//     }

//     // Handle dependent fields (country, state, city)
//     if (name === "country") {
//       const selectedCountry = countries.find(
//         (country) => country.name === value
//       );
//       if (selectedCountry) {
//         fetchStates(selectedCountry.iso2);
//       }
//       filterCountries(value);
//     }

//     if (name === "state") {
//       const selectedState = states.find((state) => state.name === value);
//       const selectedCountry = countries.find(
//         (country) => country.name === accountData.country
//       );
//       if (selectedState && selectedCountry) {
//         fetchCities(selectedCountry.iso2, selectedState.iso2);
//       }
//       filterStates(value);
//     }

//     if (name === "city") {
//       filterCities(value);
//     }

//     // Validate fields
//     if (name === "phoneNumber") {
//       const phoneRegex = /^[0-9]{10}$/;
//       setPhoneNumberError(!phoneRegex.test(value));
//     }

//     if (name === "whatsAppNumber") {
//       const whatsAppRegex = /^[0-9]{10}$/;
//       setWhatsAppNumberError(!whatsAppRegex.test(value));
//     }

//     if (name === "pinCode") {
//       const pinCodeRegex = /^[0-9]{6}$/;
//       setPinCodeError(!pinCodeRegex.test(value));
//     }

//     if (name === "ifscCode") {
//       const ifscRegex = /^[A-Z]{4}\d{7}$/;
//       setIfscError(!ifscRegex.test(value));
//     }

//     // Auto-fill WhatsApp number if enabled
//     if (autoFillWhatsApp && name === "phoneNumber") {
//       setAccountData((prevState) => ({
//         ...prevState,
//         whatsAppNumber: value,
//       }));
//     }
//   };

//   // Function to format the name with capitalized words
//   const formatName = (name) => {
//     return name.replace(/\b\w/g, (char) => char.toUpperCase());
//   };

//   const handleImageChange = (e) => {
//     const selectedFile = e.target.files[0];
//     const fileSizeLimit = 2 * 1024 * 1024; // 2MB
//     if (selectedFile && selectedFile.size <= fileSizeLimit) {
//       // Update image state
//       setImage(selectedFile);
//       // Optionally update accountData state if you need it
//       setAccountData({
//         ...accountData,
//         image: selectedFile,
//       });
//       setImageError(false);
//     } else {
//       setImageError(true);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form fields before submission
//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("accountId", accountData.accountId);
//       formData.append("salutation", accountData.salutation);
//       formData.append("name", accountData.name);

//       formData.append("printName", accountData.printName);
//       formData.append("image", accountData.image); // Append image file
//       formData.append("address.streetName", accountData.address.streetName);
//       formData.append("address.houseNumber", accountData.address.houseNumber);
//       formData.append("address.landmark", accountData.address.landmark);
//       formData.append("address.crossRoad", accountData.address.crossRoad);
//       formData.append("address.locality", accountData.address.locality);
//       formData.append(
//         "address.relatedLocation",
//         accountData.address.relatedLocation
//       );
//       formData.append(
//         "address.otherInstructions",
//         accountData.address.otherInstructions
//       );
//       formData.append("group", accountData.group);
//       formData.append("collectionRoot", accountData.collectionRoot);
//       formData.append("state", accountData.state);
//       formData.append("city", accountData.city);
//       formData.append("pinCode", accountData.pinCode);
//       formData.append("country", accountData.country);
//       formData.append("customerType", accountData.customerType);

//       formData.append("rateType", accountData.rateType);

//       formData.append("creditLimit", accountData.creditLimit);
//       formData.append("creditDays", accountData.creditDays);
//       formData.append("creditLimitStrict", accountData.creditLimitStrict);
//       formData.append("allowCreditSale", accountData.allowCreditSale);
//       formData.append("phoneNumber", accountData.phoneNumber);

//       formData.append("whatsAppNumber", accountData.whatsAppNumber);
//       formData.append("email", accountData.email);
//       //   formData.append("openingBalance", accountData.openingBalance);

//       formData.append(
//         "openingBalance.amount",
//         accountData.openingBalance.amount
//       );
//       formData.append("openingBalance.type", accountData.openingBalance.type);
//       formData.append("dealerType", accountData.dealerType);

//       formData.append("station", accountData.station);
//       formData.append("bankName", accountData.bankName);
//       formData.append("ifscCode", accountData.ifscCode);
//       formData.append("visibility", accountData.visibility);

//       const response = await api.post("/api/accounts", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       toast.success("Account created successfully");

//       const uploadedImageUrl = response.data.imageUrl;

//       // Optionally, reset form data after successful submission
//       setAccountData({
//         accountId: "",
//         salutation: "",
//         name: "",
//         image: "",
//         printName: "",
//         address: {
//           streetName: "",
//           houseNumber: "",
//           landmark: "",
//           crossRoad: "",
//           locality: "",
//           relatedLocation: "",
//           otherInstructions: "",
//         },
//         group: "",
//         collectionRoot: "",
//         state: "Jharkhand",
//         city: "Dhanbad",
//         pinCode: "",
//         country: "India",
//         customerType: "case customer",
//         rateType: "Semi Wholesaler",
//         creditLimit: 0,
//         creditDays: 0,
//         creditLimitStrict: "yes",
//         allowCreditSale: false,
//         phoneNumber: "",
//         whatsAppNumber: "",
//         email: "",
//         openingBalance: { amount: 0, type: "credit" },

//         station: "",
//         bankName: "",
//         ifscCode: "",
//         visibility: "general",
//       });

//       setImageUrl(uploadedImageUrl);
//     } catch (err) {
//       console.error("Error:", err);
//       if (err.response) {
//         toast.error(err.response.data.message || "Server Error");
//       } else if (err.request) {
//         toast.error("No response received from server");
//       } else {
//         toast.error("Error setting up request");
//       }
//     }
//   };

//   const VisuallyHiddenInput = styled("input")({
//     clip: "rect(0 0 0 0)",
//     clipPath: "inset(50%)",
//     height: 1,
//     overflow: "hidden",
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     whiteSpace: "nowrap",
//     width: 1,
//   });

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get(
//           "https://api.countrystatecity.in/v1/countries",
//           {
//             headers: {
//               "X-CSCAPI-KEY":
//                 "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
//             },
//           }
//         );
//         // Filter out only India
//         const indiaCountry = response.data.find(
//           (country) => country.name === "India"
//         );
//         if (indiaCountry) {
//           setCountries([indiaCountry]);
//           setSelectedCountry(indiaCountry.name); // Select India by default
//         } else {
//           toast.error("India not found in country list");
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error("Error fetching countries");
//       }
//     };

//     fetchCountries();
//   }, []);

//   const handleCountryChange = (event) => {
//     setSelectedCountry(event.target.value);
//     handleChange(event); // Propagate change event to parent component if needed
//   };

//   const filterCountries = (inputValue) => {
//     const filtered = countries.filter((country) =>
//       country.name.toLowerCase().includes(inputValue.toLowerCase())
//     );
//     setFilteredCountries(filtered);
//   };

//   const filterStates = (inputValue) => {
//     const filtered = states.filter((state) =>
//       state.name.toLowerCase().includes(inputValue.toLowerCase())
//     );
//     setFilteredStates(filtered);
//   };

//   const filterCities = (inputValue) => {
//     const filtered = cities.filter((city) =>
//       city.name.toLowerCase().includes(inputValue.toLowerCase())
//     );
//     setFilteredCities(filtered);
//   };

//   const fetchStates = async (countryIso2) => {
//     try {
//       const response = await axios.get(
//         `https://api.countrystatecity.in/v1/countries/${countryIso2}/states`,
//         {
//           headers: {
//             "X-CSCAPI-KEY":
//               "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
//           },
//         }
//       );
//       setStates(response.data);
//       setFilteredStates(response.data); // Initialize filtered states with all states
//       setCities([]); // Clear cities when country changes
//       setFilteredCities([]); // Clear filtered cities
//     } catch (err) {
//       console.error(err);
//       toast.error("Error fetching states");
//     }
//   };

//   const fetchCities = async (countryIso2, stateIso2) => {
//     try {
//       const response = await axios.get(
//         `https://api.countrystatecity.in/v1/countries/${countryIso2}/states/${stateIso2}/cities`,
//         {
//           headers: {
//             "X-CSCAPI-KEY":
//               "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
//           },
//         }
//       );
//       setCities(response.data);
//       setFilteredCities(response.data); // Initialize filtered cities with all cities
//     } catch (err) {
//       console.error(err);
//       toast.error("Error fetching cities");
//     }
//   };

//   const validateForm = () => {
//     let isValid = true;

//     if (!accountData.name) {
//       isValid = false;
//       toast.error("Please enter First Name");
//     }

//     if (!accountData.country) {
//       isValid = false;
//       toast.error("Please select a Country");
//     }

//     if (!accountData.state) {
//       isValid = false;
//       toast.error("Please select a State");
//     }

//     if (!accountData.city) {
//       isValid = false;
//       toast.error("Please select a City");
//     }

//     if (!accountData.pinCode) {
//       isValid = false;
//       toast.error("Please fetch pin code for the selected city");
//       setPinCodeError(true);
//     }

//     return isValid;
//   };

//   const handleCheckboxChange = (e) => {
//     setShowBankDetails(e.target.checked);
//   };

//   const handleCheckboxChange2 = (e) => {
//     setShowAddressDetails(e.target.checked);
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-xl-12">
//           <Box sx={{ display: "flex" }}>
//             <CssBaseline />
//             <Header />
//             <Box component="main" sx={{ flexGrow: 1 }}>
//               <DrawerHeader />
//               <div className="container-fluid">
//                 <div className="row">
//                   <div className="col-xl-6 d-flex justify-content-start">
//                     <h5 className="fw-bold text-start">
//                       Add Customer Account Master
//                     </h5>
//                   </div>
//                   <div className="col-xl-6 text-end">
//                     <Link to={"/account_master_detail"}>
//                       <Button
//                         variant="contained"
//                         size="small"
//                         className="me-2"
//                         color="secondary"
//                       >
//                         List
//                       </Button>
//                     </Link>

//                     <Button
//                       aria-controls={open ? "dropdown-menu" : undefined}
//                       aria-haspopup="true"
//                       onClick={handleClick}
//                       variant="contained"
//                       size="small"
//                     >
//                       Select Masters
//                     </Button>
//                     <Menu
//                       id="dropdown-menu"
//                       anchorEl={anchorEl}
//                       open={open}
//                       onClose={handleClose}
//                     >
//                       <MenuItem onClick={handleClose}>
//                         <Link
//                           to="/account_master"
//                           style={{ textDecoration: "none", color: "inherit" }}
//                         >
//                           Customer Master
//                         </Link>
//                       </MenuItem>
//                       <MenuItem onClick={handleClose}>
//                         <Link
//                           to="/add_supplier_master"
//                           style={{ textDecoration: "none", color: "inherit" }}
//                         >
//                           Supplier Master
//                         </Link>
//                       </MenuItem>
//                       <MenuItem onClick={handleClose}>
//                         <Link
//                           to="/add_general_master"
//                           style={{ textDecoration: "none", color: "inherit" }}
//                         >
//                           Journal Master
//                         </Link>
//                       </MenuItem>
//                     </Menu>
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-xl-12">
//                     <Box component="form" onSubmit={handleSubmit}>
//                       <ToastContainer />
//                       <div className="row">
//                         <div className="col-xl-12 mx-auto mt-2">
//                           <div className="row">
//                             <div
//                               className="row mx-auto d-flex position-relative"
//                               style={{
//                                 border: "1px solid gray",
//                                 borderRadius: "5px",
//                               }}
//                             >
//                               <div className="col-xl-12 mt-1">
//                                 <h4>
//                                   <span
//                                     style={{
//                                       fontSize: "15px",
//                                       color: "rgb(1, 87, 155)",
//                                     }}
//                                     className="fw-bold"
//                                   >
//                                     Personal Information
//                                   </span>
//                                 </h4>
//                               </div>

//                               <div className="row">
//                                 <div className="col-xl-2">
//                                   <TextField
//                                     select
//                                     label="Salutation"
//                                     fullWidth
//                                     size="small"
//                                     required
//                                     name="salutation"
//                                     value={accountData.salutation}
//                                     onChange={handleChange}
//                                     onKeyDown={(e) => handleKeyDown(e, nameRef)}
//                                     ref={salutationRef}
//                                     MenuProps={{
//                                       PaperProps: {
//                                         style: {
//                                           maxHeight: 1,
//                                           overflowY: "auto",
//                                         },
//                                       },
//                                     }}
//                                     InputProps={{
//                                       style: {
//                                         fontSize: "0.875rem",
//                                       },
//                                     }}
//                                     InputLabelProps={{
//                                       style: { fontSize: "0.875rem" },
//                                     }}
//                                   >
//                                     {salutations.map((salutationObj) => (
//                                       <MenuItem
//                                         key={salutationObj._id}
//                                         value={salutationObj.salutation}
//                                       >
//                                         {salutationObj.salutation}
//                                       </MenuItem>
//                                     ))}
//                                   </TextField>
//                                 </div>

//                                 <div className="col-xl-4">
//                                   <TextField
//                                     label="Name"
//                                     fullWidth
//                                     size="small"
//                                     required
//                                     type="text"
//                                     name="name"
//                                     value={accountData.name}
//                                     onChange={handleChange}
//                                     onKeyDown={(e) =>
//                                       handleKeyDown(e, phoneNumberRef)
//                                     }
//                                     ref={nameRef}
//                                     InputProps={{
//                                       style: {
//                                         fontSize: "0.875rem",
//                                       },
//                                     }}
//                                     InputLabelProps={{
//                                       style: { fontSize: "0.875rem" },
//                                     }}
//                                   />
//                                 </div>

//                                 <div className="col-xl-4">
//                                   <TextField
//                                     label="Print Name"
//                                     fullWidth
//                                     size="small"
//                                     required
//                                     type="text"
//                                     name="printName"
//                                     value={accountData.printName}
//                                     onChange={handleChange}
//                                     ref={printNameRef}
//                                     InputProps={{
//                                       style: {
//                                         fontSize: "0.875rem",
//                                       },
//                                     }}
//                                     InputLabelProps={{
//                                       style: { fontSize: "0.875rem" },
//                                     }}
//                                   />
//                                 </div>

//                                 <div className="col-xl-2">
//                                   <TextField
//                                     type="file"
//                                     accept="image/*"
//                                     name="image"
//                                     onChange={handleImageChange}
//                                     size="small"
//                                     label="Add Image"
//                                     InputProps={{
//                                       style: {
//                                         fontSize: "0.875rem",
//                                       },
//                                     }}
//                                     InputLabelProps={{
//                                       shrink: true,
//                                       style: { fontSize: "0.875rem" },
//                                     }}
//                                   />
//                                   {imageError && (
//                                     <span style={{ color: "red" }}>
//                                       Please upload an image file not exceeding
//                                       2MB
//                                     </span>
//                                   )}
//                                 </div>
//                               </div>

//                               <div className="row">
//                                 <div className="col-xl-2">
//                                   <TextField
//                                     id="openingBalance.amount"
//                                     name="openingBalance.amount"
//                                     label="Opening Balance Amount"
//                                     type="number"
//                                     value={accountData.openingBalance.amount}
//                                     onChange={handleChange}
//                                     ref={openingBalanceRef}
//                                     required
//                                     size="small"
//                                     margin="normal"
//                                     fullWidth
//                                     InputProps={{
//                                       style: {
//                                         fontSize: "0.875rem",
//                                       },
//                                     }}
//                                     InputLabelProps={{
//                                       style: { fontSize: "0.875rem" },
//                                     }}
//                                   />
//                                 </div>

//                                 <div className="col-xl-2 mt-3">
//                                   <Box
//                                     display="flex"
//                                     alignItems="center"
//                                     sx={{ fontSize: "0.875rem" }}
//                                   >
//                                     <FormControl
//                                       fullWidth
//                                       size="small"
//                                       sx={{ minWidth: 120 }}
//                                     >
//                                       <InputLabel
//                                         id="openingBalance.type-label"
//                                         sx={{ fontSize: "0.875rem" }}
//                                       >
//                                         Opening Balance Type
//                                       </InputLabel>
//                                       <Select
//                                         labelId="openingBalance.type-label"
//                                         id="openingBalance.type"
//                                         name="openingBalance.type"
//                                         value={accountData.openingBalance.type}
//                                         onChange={handleChange}
//                                         ref={openingBalanceRef.type}
//                                         required
//                                         label="Opening Balance Type"
//                                         margin="normal"
//                                         sx={{ fontSize: "0.875rem" }}
//                                       >
//                                         <MenuItem value="credit">
//                                           Credit
//                                         </MenuItem>
//                                         <MenuItem value="debit">Debit</MenuItem>
//                                       </Select>
//                                     </FormControl>
//                                   </Box>
//                                 </div>

//                                 <div className="col-xl-2 mt-3">
//                                   <Box
//                                     display="flex"
//                                     alignItems="center"
//                                     sx={{ fontSize: "0.875rem" }}
//                                   >
//                                     <FormControl
//                                       fullWidth
//                                       size="small"
//                                       sx={{ minWidth: 120 }}
//                                     >
//                                       <InputLabel
//                                         id="rateType-label"
//                                         sx={{ fontSize: "0.875rem" }}
//                                       >
//                                         Rate Type
//                                       </InputLabel>
//                                       <Select
//                                         labelId="rateType-label"
//                                         label="Rate type"
//                                         name="rateType"
//                                         value={accountData.rateType}
//                                         onChange={handleChange}
//                                         ref={rateTypeRef}
//                                         sx={{ fontSize: "0.875rem" }}
//                                       >
//                                         <MenuItem value="Semi Wholesaler">
//                                           Rate A
//                                         </MenuItem>
//                                         <MenuItem value="Wholesaler">
//                                           Rate B
//                                         </MenuItem>
//                                         <MenuItem value="Retailer">
//                                           Rate R
//                                         </MenuItem>
//                                       </Select>
//                                     </FormControl>
//                                   </Box>
//                                 </div>

//                                 <div className="col-xl-2 mt-3">
//                                   <Box
//                                     display="flex"
//                                     alignItems="center"
//                                     sx={{ fontSize: "0.875rem" }}
//                                   >
//                                     <FormControl
//                                       fullWidth
//                                       size="small"
//                                       sx={{ minWidth: 120 }}
//                                     >
//                                       <InputLabel
//                                         id="customerType-label"
//                                         sx={{ fontSize: "0.875rem" }}
//                                       >
//                                         Customer Type
//                                       </InputLabel>
//                                       <Select
//                                         labelId="customerType-label"
//                                         label="Customer Type"
//                                         name="customerType"
//                                         value={accountData.customerType}
//                                         onChange={handleChange}
//                                         ref={customerTypeRef}
//                                         sx={{ fontSize: "0.875rem" }}
//                                       >
//                                         <MenuItem value="case customer">
//                                           Case Customer
//                                         </MenuItem>
//                                         <MenuItem value="credit customer">
//                                           Credit Customer
//                                         </MenuItem>
//                                       </Select>
//                                     </FormControl>
//                                   </Box>
//                                 </div>

//                                 <div className="col-xl-2">
//                                   <TextField
//                                     select
//                                     label="Account Type"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     required
//                                     name="visibility"
//                                     id="visibility"
//                                     value={accountData.visibility}
//                                     onChange={handleChange}
//                                     ref={visibilityRef}
//                                     InputProps={{
//                                       style: {
//                                         fontSize: "0.875rem",
//                                       },
//                                     }}
//                                     InputLabelProps={{
//                                       shrink: true,
//                                       style: { fontSize: "0.875rem" },
//                                     }}
//                                   >
//                                     <MenuItem value="general">General</MenuItem>
//                                     <MenuItem value="private">Private</MenuItem>
//                                   </TextField>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>

//                           <div>
//                             <div className="form-group">
//                               <FormControlLabel
//                                 control={
//                                   <Checkbox
//                                     type="checkbox"
//                                     checked={showAddressDetails}
//                                     onChange={handleCheckboxChange2}
//                                     ref={groupRef}
//                                     color="success"
//                                     size="small"
//                                   />
//                                 }
//                                 label="Show Address Details"
//                               />
//                             </div>

//                             {showAddressDetails && (
//                               <div
//                                 className="row  d-flex"
//                                 style={{
//                                   border: "1px solid gray",
//                                   borderRadius: "5px",
//                                 }}
//                               >
//                                 <div className="col-xl-12 mt-1">
//                                   <h4>
//                                     <span
//                                       style={{
//                                         fontSize: "15px",
//                                         color: "rgb(1, 87, 155)",
//                                       }}
//                                       className="fw-bold"
//                                     >
//                                       Address
//                                     </span>
//                                   </h4>
//                                 </div>

//                                 <div className="row">
//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Account group"
//                                       fullWidth
//                                       size="small"
//                                       type="text"
//                                       name="group"
//                                       value={accountData.group.replace(
//                                         /\b\w/g,
//                                         (char) => char.toUpperCase()
//                                       )}
//                                       onChange={handleChange}
//                                       InputProps={{
//                                         style: {
//                                           fontSize: "0.875rem", // Reduce the font size
//                                         },
//                                       }}
//                                       InputLabelProps={{
//                                         style: { fontSize: "0.875rem" }, // Reduce label font size
//                                       }}
//                                     />
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <Box
//                                       display="flex"
//                                       alignItems="center"
//                                       sx={{ fontSize: "0.875rem" }}
//                                     >
//                                       <FormControl
//                                         fullWidth
//                                         size="small"
//                                         sx={{ minWidth: 120 }}
//                                       >
//                                         <InputLabel
//                                           id="alternativeunit-label"
//                                           sx={{ fontSize: "0.875rem" }}
//                                         >
//                                           Collection Root
//                                         </InputLabel>
//                                         <Select
//                                           labelId="alternativeunit-label"
//                                           label="collection Root"
//                                           fullWidth
//                                           size="small"
//                                           name="collectionRoot"
//                                           value={accountData.collectionRoot}
//                                           onChange={handleChange}
//                                           ref={collectionRootRef}
//                                           sx={{ fontSize: "0.875rem" }}
//                                         >
//                                           <MenuItem value="">
//                                             Select collection Root
//                                           </MenuItem>

//                                           <MenuItem value="collectable">
//                                             Collectable
//                                           </MenuItem>
//                                           <MenuItem value="not_collectable">
//                                             Not Collectable
//                                           </MenuItem>
//                                         </Select>
//                                       </FormControl>
//                                     </Box>
//                                   </div>
//                                 </div>

//                                 <div className="row">
//                                   <div className="col-xl-2 mt-3">
//                                     <Box
//                                       display="flex"
//                                       alignItems="center"
//                                       sx={{ fontSize: "0.875rem" }}
//                                     >
//                                       <FormControl
//                                         fullWidth
//                                         sx={{ minWidth: 120 }}
//                                         size="small"
//                                       >
//                                         <InputLabel
//                                           id="country-label"
//                                           sx={{ fontSize: "0.875rem" }}
//                                         >
//                                           Country
//                                         </InputLabel>
//                                         <Select
//                                           labelId="country-label"
//                                           label="Country"
//                                           fullWidth
//                                           size="small"
//                                           name="country"
//                                           value={selectedCountry}
//                                           onChange={handleCountryChange}
//                                           ref={countryRef}
//                                           sx={{ fontSize: "0.875rem" }}
//                                         >
//                                           <MenuItem value="">
//                                             Select Country
//                                           </MenuItem>
//                                           {countries.map((country) => (
//                                             <MenuItem
//                                               key={country.iso2}
//                                               value={country.name}
//                                             >
//                                               {country.name}
//                                             </MenuItem>
//                                           ))}
//                                         </Select>
//                                       </FormControl>
//                                     </Box>
//                                   </div>

//                                   <div className="col-xl-3 mt-3">
//                                     <Box
//                                       display="flex"
//                                       alignItems="center"
//                                       sx={{ fontSize: "0.875rem" }}
//                                     >
//                                       <FormControl
//                                         fullWidth
//                                         sx={{ minWidth: 120 }}
//                                         size="small"
//                                       >
//                                         <InputLabel
//                                           id="alternativeunit-label"
//                                           sx={{ fontSize: "0.875rem" }}
//                                         >
//                                           State
//                                         </InputLabel>
//                                         <Select
//                                           labelId="alternativeunit-label"
//                                           label="State"
//                                           name="state"
//                                           value={accountData.state}
//                                           onChange={handleChange}
//                                           ref={stateRef}
//                                           fullWidth
//                                           sx={{ fontSize: "0.875rem" }}
//                                         >
//                                           <MenuItem value="">
//                                             Select State
//                                           </MenuItem>
//                                           {filteredStates.map((state) => (
//                                             <MenuItem
//                                               key={state.iso2}
//                                               value={state.name}
//                                             >
//                                               {" "}
//                                               {state.name}
//                                             </MenuItem>
//                                           ))}
//                                         </Select>
//                                       </FormControl>
//                                     </Box>
//                                   </div>

//                                   <div className="col-xl-3 mt-3">
//                                     <Box
//                                       display="flex"
//                                       alignItems="center"
//                                       sx={{ fontSize: "0.875rem" }}
//                                     >
//                                       <FormControl
//                                         fullWidth
//                                         sx={{ minWidth: 120 }}
//                                         size="small"
//                                       >
//                                         <InputLabel
//                                           id="alternativeunit-label"
//                                           sx={{ fontSize: "0.875rem" }}
//                                         >
//                                           City
//                                         </InputLabel>
//                                         <Select
//                                           labelId="alternativeunit-label"
//                                           name="city"
//                                           value={accountData.city}
//                                           onChange={handleChange}
//                                           ref={cityRef}
//                                           label="City"
//                                           fullWidth
//                                           margin="normal"
//                                           size="small"
//                                           sx={{ fontSize: "0.875rem" }}
//                                         >
//                                           <MenuItem value="">
//                                             Select City
//                                           </MenuItem>
//                                           {filteredCities.map((city) => (
//                                             <MenuItem
//                                               key={city.name}
//                                               value={city.name}
//                                             >
//                                               {city.name}
//                                             </MenuItem>
//                                           ))}
//                                         </Select>
//                                       </FormControl>
//                                     </Box>
//                                   </div>
//                                 </div>

//                                 <div className="row">
//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Address Line 1"
//                                       fullWidth
//                                       size="small"
//                                       margin="normal"
//                                       type="text"
//                                       name="address.houseNumber"
//                                       value={accountData.address.houseNumber}
//                                       onChange={handleChange}
//                                       ref={houseNumberRef}
//                                       InputProps={{
//                                         style: {
//                                           fontSize: "0.875rem", // Reduce the font size
//                                         },
//                                       }}
//                                       InputLabelProps={{
//                                         style: { fontSize: "0.875rem" }, // Reduce label font size
//                                       }}
//                                     />
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Address Line 2"
//                                       fullWidth
//                                       size="small"
//                                       margin="normal"
//                                       type="text"
//                                       name="address.streetName"
//                                       value={accountData.address.streetName.replace(
//                                         /\b\w/g,
//                                         (char) => char.toUpperCase()
//                                       )}
//                                       onChange={handleChange}
//                                       ref={streetNameRef}
//                                       InputProps={{
//                                         style: {
//                                           fontSize: "0.875rem", // Reduce the font size
//                                         },
//                                       }}
//                                       InputLabelProps={{
//                                         style: { fontSize: "0.875rem" }, // Reduce label font size
//                                       }}
//                                     />
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Landmark"
//                                       fullWidth
//                                       size="small"
//                                       margin="normal"
//                                       type="text"
//                                       name="address.landmark"
//                                       value={accountData.address.landmark.replace(
//                                         /\b\w/g,
//                                         (char) => char.toUpperCase()
//                                       )}
//                                       onChange={handleChange}
//                                       ref={landmarkRef}
//                                       InputProps={{
//                                         style: {
//                                           fontSize: "0.875rem", // Reduce the font size
//                                         },
//                                       }}
//                                       InputLabelProps={{
//                                         style: { fontSize: "0.875rem" }, // Reduce label font size
//                                       }}
//                                     />
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Cross Road"
//                                       fullWidth
//                                       size="small"
//                                       margin="normal"
//                                       type="text"
//                                       name="address.crossRoad"
//                                       value={accountData.address.crossRoad.replace(
//                                         /\b\w/g,
//                                         (char) => char.toUpperCase()
//                                       )}
//                                       onChange={handleChange}
//                                       ref={crossRoadRef}
//                                       InputProps={{
//                                         style: {
//                                           fontSize: "0.875rem", // Reduce the font size
//                                         },
//                                       }}
//                                       InputLabelProps={{
//                                         style: { fontSize: "0.875rem" }, // Reduce label font size
//                                       }}
//                                     />
//                                   </div>
//                                 </div>

//                                 <div className="row">
//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Locality"
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       type="text"
//                                       name="address.locality"
//                                       value={accountData.address.locality.replace(
//                                         /\b\w/g,
//                                         (char) => char.toUpperCase()
//                                       )}
//                                       onChange={handleChange}
//                                       ref={localityRef}
//                                       InputProps={{
//                                         style: {
//                                           fontSize: "0.875rem", // Reduce the font size
//                                         },
//                                       }}
//                                       InputLabelProps={{
//                                         style: { fontSize: "0.875rem" }, // Reduce label font size
//                                       }}
//                                     />
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Related Location"
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       type="text"
//                                       name="address.relatedLocation"
//                                       value={accountData.address.relatedLocation.replace(
//                                         /\b\w/g,
//                                         (char) => char.toUpperCase()
//                                       )}
//                                       onChange={handleChange}
//                                       ref={relatedLocationRef}
//                                       InputProps={{
//                                         style: {
//                                           fontSize: "0.875rem", // Reduce the font size
//                                         },
//                                       }}
//                                       InputLabelProps={{
//                                         style: { fontSize: "0.875rem" }, // Reduce label font size
//                                       }}
//                                     />
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Pin Code"
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       type="text"
//                                       name="pinCode"
//                                       value={accountData.pinCode}
//                                       onChange={handleChange}
//                                       ref={pinCodeRef}
//                                       InputProps={{
//                                         style: {
//                                           fontSize: "0.875rem", // Reduce the font size
//                                         },
//                                       }}
//                                       InputLabelProps={{
//                                         style: { fontSize: "0.875rem" }, // Reduce label font size
//                                       }}
//                                     />

//                                     {pinCodeError && (
//                                       <span style={{ color: "red" }}>
//                                         Pin Code Must be 6 digit
//                                       </span>
//                                     )}
//                                   </div>
//                                 </div>
//                                 <div className="col-xl-12">
//                                   <Textarea
//                                     maxRows={4}
//                                     placeholder="Other Instructions......."
//                                     style={{ width: "100%" }}
//                                     className="p-4 mt-1"
//                                     name="address.otherInstructions"
//                                     value={accountData.address.otherInstructions.replace(
//                                       /\b\w/g,
//                                       (char) => char.toUpperCase()
//                                     )}
//                                     onChange={handleChange}
//                                     ref={otherInstructionsRef}
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     InputProps={{
//                                       style: {
//                                         fontSize: "0.875rem", // Reduce the font size
//                                       },
//                                     }}
//                                     InputLabelProps={{
//                                       style: { fontSize: "0.875rem" }, // Reduce label font size
//                                     }}
//                                   />
//                                 </div>
//                               </div>
//                             )}
//                           </div>

//                           <div
//                             className="row d-flex mt-2"
//                             style={{
//                               border: "1px solid gray",
//                               borderRadius: "5px",
//                               position: "relative",
//                             }}
//                           >
//                             <div className="col-xl-12">
//                               <h4>
//                                 <span
//                                   style={{
//                                     fontSize: "15px",
//                                     color: "rgb(1, 87, 155)",
//                                   }}
//                                   className="fw-bold"
//                                 >
//                                   Contact Detail
//                                 </span>
//                               </h4>
//                             </div>

//                             <div className="col-xl-6">
//                               <div className="row">
//                                 <div className="col-xl-12">
//                                   <div className="row">
//                                     <div className="col-xl-6">
//                                       <TextField
//                                         label="Phone Number"
//                                         fullWidth
//                                         size="small"
//                                         required
//                                         type="number"
//                                         name="phoneNumber"
//                                         value={accountData.phoneNumber}
//                                         onChange={handleChange}
//                                         ref={phoneNumberRef}
//                                         onKeyDown={(e) =>
//                                           handleKeyDown(e, null)
//                                         } // No next field
//                                         InputProps={{
//                                           style: {
//                                             fontSize: "0.875rem", // Reduce the font size
//                                           },
//                                         }}
//                                         InputLabelProps={{
//                                           style: { fontSize: "0.875rem" }, // Reduce label font size
//                                         }}
//                                       />
//                                       {phoneNumberError && (
//                                         <p
//                                           style={{
//                                             color: "red",
//                                             fontSize: "13px",
//                                           }}
//                                         >
//                                           Please enter a valid 10-digit Phone
//                                           Number
//                                         </p>
//                                       )}
//                                     </div>
//                                     <div className="col-xl-6">
//                                       <TextField
//                                         label="WhatsApp Number"
//                                         fullWidth
//                                         size="small"
//                                         required
//                                         type="number"
//                                         name="whatsAppNumber"
//                                         value={accountData.whatsAppNumber}
//                                         onChange={handleChange}
//                                         ref={whatsAppNumberRef}
//                                         disabled={autoFillWhatsApp}
//                                         InputProps={{
//                                           style: {
//                                             fontSize: "0.875rem", // Reduce the font size
//                                           },
//                                         }}
//                                         InputLabelProps={{
//                                           style: { fontSize: "0.875rem" }, // Reduce label font size
//                                         }}
//                                       />
//                                       {whatsAppNumberError && (
//                                         <p
//                                           style={{
//                                             color: "red",
//                                             fontSize: "12px",
//                                           }}
//                                         >
//                                           Please enter a valid 10-digit WhatsApp
//                                           Number
//                                         </p>
//                                       )}
//                                     </div>
//                                     <div className="col-xl-12">
//                                       <FormControlLabel
//                                         control={
//                                           <Checkbox
//                                             checked={autoFillWhatsApp}
//                                             onChange={handleAutoFillChange}
//                                             name="autoFillWhatsApp"
//                                             color="primary"
//                                             size="small"
//                                           />
//                                         }
//                                         label="Autofill WhatsApp from Phone"
//                                       />
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="col-xl-3">
//                               <TextField
//                                 label="Email"
//                                 fullWidth
//                                 size="small"
//                                 type="email"
//                                 name="email"
//                                 value={accountData.email}
//                                 ref={emailRef}
//                                 onChange={handleChange}
//                                 InputProps={{
//                                   style: {
//                                     fontSize: "0.875rem", // Reduce the font size
//                                   },
//                                 }}
//                                 InputLabelProps={{
//                                   style: { fontSize: "0.875rem" }, // Reduce label font size
//                                 }}
//                               />
//                             </div>
//                           </div>

//                           <div className="">
//                             <div className="form-group">
//                               <FormControlLabel
//                                 control={
//                                   <Checkbox
//                                     type="checkbox"
//                                     checked={showBankDetails}
//                                     onChange={handleCheckboxChange}
//                                     color="success"
//                                     size="small"
//                                   />
//                                 }
//                                 label=" Show Bank Details"
//                               />
//                             </div>

//                             {showBankDetails && (
//                               <div
//                                 className="row d-flex"
//                                 style={{
//                                   border: "1px solid gray",
//                                   borderRadius: "5px",
//                                 }}
//                               >
//                                 <div className="col-xl-12 mt-1">
//                                   <h4>
//                                     <span
//                                       style={{
//                                         fontSize: "15px",
//                                         color: "rgb(1, 87, 155)",
//                                       }}
//                                       className="fw-bold pb-2"
//                                     >
//                                       Bank Detail
//                                     </span>
//                                   </h4>
//                                 </div>
//                                 <div className="row mb-2">
//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Bank Name"
//                                       fullWidth
//                                       size="small"
//                                       type="text"
//                                       name="bankName"
//                                       value={accountData.bankName}
//                                       onChange={handleChange}
//                                       ref={bankNameRef}
//                                       InputProps={{
//                                         style: {
//                                           fontSize: "0.875rem", // Reduce the font size
//                                         },
//                                       }}
//                                       InputLabelProps={{
//                                         style: { fontSize: "0.875rem" }, // Reduce label font size
//                                       }}
//                                     />
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Account Number"
//                                       fullWidth
//                                       size="small"
//                                       type="number"
//                                       name="accountId"
//                                       value={accountData.accountId}
//                                       onChange={handleChange}
//                                       ref={accountIdRef}
//                                       InputProps={{
//                                         style: {
//                                           fontSize: "0.875rem", // Reduce the font size
//                                         },
//                                       }}
//                                       InputLabelProps={{
//                                         style: { fontSize: "0.875rem" }, // Reduce label font size
//                                       }}
//                                     />

//                                     {accountIdError && (
//                                       <span style={{ color: "red" }}>
//                                         Please enter a valid Account Number
//                                         (9-18 digits)
//                                       </span>
//                                     )}
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="IFSC Code"
//                                       fullWidth
//                                       size="small"
//                                       type="text"
//                                       name="ifscCode"
//                                       value={accountData.ifscCode}
//                                       onChange={handleChange}
//                                       ref={ifscCodeRef}
//                                       InputProps={{
//                                         style: {
//                                           fontSize: "0.875rem", // Reduce the font size
//                                         },
//                                       }}
//                                       InputLabelProps={{
//                                         style: { fontSize: "0.875rem" }, // Reduce label font size
//                                       }}
//                                     />

//                                     {ifscError && (
//                                       <span style={{ color: "#ff5252" }}>
//                                         Invalid IFSC code. Must be in the
//                                         format: ABCD0123456
//                                       </span>
//                                     )}
//                                   </div>
//                                 </div>
//                               </div>
//                             )}
//                           </div>

//                           <div>
//                             {(accountData.customerType === "credite customer" ||
//                               showCreditDetails) && (
//                               <div
//                                 className="row  d-flex mt-2"
//                                 style={{
//                                   border: "1px solid gray",
//                                   borderRadius: "5px",
//                                 }}
//                               >
//                                 <div className="col-xl-12">
//                                   <h4>
//                                     <span
//                                       style={{
//                                         fontSize: "15px",
//                                         color: "rgb(1, 87, 155)",
//                                       }}
//                                       className="fw-bold"
//                                     >
//                                       Credit Detail
//                                     </span>
//                                   </h4>
//                                 </div>

//                                 <div className="col-xl-12">
//                                   <h6>
//                                     <span
//                                       style={{
//                                         fontSize: "13px",
//                                       }}
//                                       className="fw-bold"
//                                     >
//                                       Allow Credit Sale:
//                                     </span>
//                                   </h6>
//                                 </div>

//                                 <div className="row mb-2">
//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Credit Limit"
//                                       fullWidth
//                                       size="small"
//                                       required
//                                       type="number"
//                                       name="creditLimit"
//                                       value={accountData.creditLimit}
//                                       onChange={handleChange}
//                                       ref={creditLimitRef}
//                                       InputProps={{
//                                         style: {
//                                           fontSize: "0.875rem",
//                                         },
//                                       }}
//                                       InputLabelProps={{
//                                         style: { fontSize: "0.875rem" },
//                                       }}
//                                     />
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Credit Days"
//                                       fullWidth
//                                       size="small"
//                                       required
//                                       type="number"
//                                       name="creditDays"
//                                       value={accountData.creditDays}
//                                       onChange={handleChange}
//                                       ref={creditDaysRef}
//                                       InputProps={{
//                                         style: {
//                                           fontSize: "0.875rem",
//                                         },
//                                       }}
//                                       InputLabelProps={{
//                                         style: { fontSize: "0.875rem" },
//                                       }}
//                                     />
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <Box
//                                       display="flex"
//                                       alignItems="center"
//                                       sx={{ fontSize: "0.875rem", p: 0 }}
//                                     >
//                                       <FormControl
//                                         fullWidth
//                                         size="small"
//                                         sx={{ minWidth: 120 }}
//                                       >
//                                         <InputLabel
//                                           id="creditLimitStrict-label"
//                                           sx={{ fontSize: "0.875rem" }}
//                                         >
//                                           Credit Limit Strict
//                                         </InputLabel>
//                                         <Select
//                                           labelId="creditLimitStrict-label"
//                                           label="Credit Limit Strict"
//                                           fullWidth
//                                           size="small"
//                                           required
//                                           name="creditLimitStrict"
//                                           value={accountData.creditLimitStrict}
//                                           onChange={handleChange}
//                                           ref={creditLimitStrictRef}
//                                           sx={{ fontSize: "0.875rem" }}
//                                         >
//                                           <MenuItem value="">
//                                             Select Credit Limit Strict
//                                           </MenuItem>
//                                           <MenuItem value="yes">Yes</MenuItem>
//                                           <MenuItem value="no">No</MenuItem>
//                                         </Select>
//                                       </FormControl>
//                                     </Box>
//                                   </div>
//                                 </div>
//                               </div>
//                             )}
//                           </div>

//                           <div className="col-xl-12 mt-3">
//                             <span
//                               className="fw-bold mb-3"
//                               style={{
//                                 color: "rgb(34, 153, 84)",
//                                 fontSize: "17px",
//                               }}
//                             >
//                               Rate Type
//                             </span>
//                             <ul className="d-flex mt-2">
//                               <li
//                                 className="me-5"
//                                 style={{
//                                   color: "rgb(233, 30, 99)",
//                                   fontWeight: "500",
//                                 }}
//                               >
//                                 Rate A - Semi-Wholesaler
//                               </li>
//                               <li
//                                 className="me-5"
//                                 style={{ color: "gray", fontWeight: "500" }}
//                               >
//                                 Rate B - Wholesaler
//                               </li>
//                               <li
//                                 style={{
//                                   color: "rgb(0, 188, 212)",
//                                   fontWeight: "500",
//                                 }}
//                               >
//                                 Rate R - Retailer
//                               </li>
//                             </ul>
//                           </div>

//                           <div className="col-xl-2 ">
//                             <Button
//                               type="submit"
//                               variant="contained"
//                               color="primary"
//                               fullWidth
//                               sx={{ mt: 1 }}
//                               className=" fw-bold"
//                             >
//                               Create Account
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     </Box>
//                   </div>
//                 </div>
//               </div>
//             </Box>
//           </Box>
//         </div>
//       </div>
//     </div>
//   );
// }

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
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
    to="/account_master_detail"
    className="text-decoration-none"
    style={{ fontSize: "15px" }}
  >
    Ac. Master Detail
  </Link>,

  <Typography key="3" color="text.secondary" style={{ fontSize: "15px" }}>
    Item Master
  </Typography>,
];

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

export default function AccountMaster() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const navigate = useNavigate();
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [whatsAppNumberError, setWhatsAppNumberError] = useState(false);
  const [accountIdError, setAccountIdError] = useState(false);
  const [pinCodeError, setPinCodeError] = useState(false);
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [ifscError, setIfscError] = useState("");
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [showCreditDetails, setShowCreditDetails] = useState(false);
  const [showAddressDetails, setShowAddressDetails] = useState(false);
  const [salutations, setSalutations] = useState([]);

  const [accountData, setAccountData] = useState({
    accountId: "",
    salutation: "",
    name: "",
    image: null,
    printName: "",
    address: {
      streetName: "",
      houseNumber: "",
      landmark: "",
      crossRoad: "",
      locality: "",
      relatedLocation: "",
      otherInstructions: "",
    },
    group: "",
    collectionRoot: "",
    state: "",
    city: "",
    pinCode: "",
    country: "India",
    customerType: "case customer",
    rateType: "Semi Wholesaler",
    creditLimit: 0,
    creditDays: 0,
    creditLimitStrict: "yes",
    allowCreditSale: false,
    phoneNumber: "",
    whatsAppNumber: "",
    email: "",
    openingBalance: { amount: 0, type: "credit" },
    station: "",
    bankName: "",
    ifscCode: "",
    visibility: "general", // Reset visibility to default
    colorCode: "green",
  });
  const [autoFillWhatsApp, setAutoFillWhatsApp] = useState(false); // State for checkbox
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAutoFillChange = (e) => {
    setAutoFillWhatsApp(e.target.checked);

    if (e.target.checked) {
      setAccountData((prevState) => ({
        ...prevState,
        whatsAppNumber: accountData.phoneNumber,
      }));
    } else {
      setAccountData((prevState) => ({
        ...prevState,
        whatsAppNumber: "",
      }));
    }
  };

  // Add a flag to track manual updates to printName
  const [isPrintNameManuallyUpdated, setIsPrintNameManuallyUpdated] =
    useState(false);

  useEffect(() => {
    const fetchSalutations = async () => {
      try {
        const response = await api.get("/api/salutations");
        setSalutations(response.data); // Ensure this is an array of objects
      } catch (err) {
        console.error(err);
        toast.error("Error fetching salutations");
      }
    };

    fetchSalutations();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type !== "file") {
      if (name.includes(".")) {
        const [parent, child] = name.split(".");
        setAccountData((prevState) => ({
          ...prevState,
          [parent]: {
            ...prevState[parent],
            [child]: value,
          },
        }));
      } else {
        setAccountData((prevState) => {
          const isNameField = name === "name";
          const isPrintNameField = name === "printName";
          const newState = {
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
          };

          if (isNameField) {
            if (!isPrintNameManuallyUpdated) {
              newState.printName = formatName(value);
            }
          }

          if (isPrintNameField) {
            setIsPrintNameManuallyUpdated(true);
            newState.printName = value;
          }

          return newState;
        });
      }
    } else {
      const file = files[0];
      setAccountData((prevState) => ({
        ...prevState,
        image: file,
      }));
    }

    // Handle dependent fields (country, state, city)
    if (name === "country") {
      const selectedCountry = countries.find(
        (country) => country.name === value
      );
      if (selectedCountry) {
        fetchStates(selectedCountry.iso2);
      }
      filterCountries(value);
    }

    if (name === "state") {
      const selectedState = states.find((state) => state.name === value);
      const selectedCountry = countries.find(
        (country) => country.name === accountData.country
      );
      if (selectedState && selectedCountry) {
        fetchCities(selectedCountry.iso2, selectedState.iso2);
      }
      filterStates(value);
    }

    if (name === "city") {
      filterCities(value);
    }

    // Validate fields
    if (name === "phoneNumber") {
      const phoneRegex = /^[0-9]{10}$/;
      setPhoneNumberError(!phoneRegex.test(value));
    }

    if (name === "whatsAppNumber") {
      const whatsAppRegex = /^[0-9]{10}$/;
      setWhatsAppNumberError(!whatsAppRegex.test(value));
    }

    if (name === "pinCode") {
      const pinCodeRegex = /^[0-9]{6}$/;
      setPinCodeError(!pinCodeRegex.test(value));
    }

    if (name === "ifscCode") {
      const ifscRegex = /^[A-Z]{4}\d{7}$/;
      setIfscError(!ifscRegex.test(value));
    }

    // Auto-fill WhatsApp number if enabled
    if (autoFillWhatsApp && name === "phoneNumber") {
      setAccountData((prevState) => ({
        ...prevState,
        whatsAppNumber: value,
      }));
    }
  };

  // Function to format the name with capitalized words
  const formatName = (name) => {
    return name.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileSizeLimit = 2 * 1024 * 1024; // 2MB
    if (selectedFile && selectedFile.size <= fileSizeLimit) {
      // Update image state
      setImage(selectedFile);
      // Optionally update accountData state if you need it
      setAccountData({
        ...accountData,
        image: selectedFile,
      });
      setImageError(false);
    } else {
      setImageError(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields before submission
    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("accountId", accountData.accountId);
      formData.append("salutation", accountData.salutation);
      formData.append("name", accountData.name);

      formData.append("printName", accountData.printName);
      formData.append("image", accountData.image); // Append image file
      formData.append("address.streetName", accountData.address.streetName);
      formData.append("address.houseNumber", accountData.address.houseNumber);
      formData.append("address.landmark", accountData.address.landmark);
      formData.append("address.crossRoad", accountData.address.crossRoad);
      formData.append("address.locality", accountData.address.locality);
      formData.append(
        "address.relatedLocation",
        accountData.address.relatedLocation
      );
      formData.append(
        "address.otherInstructions",
        accountData.address.otherInstructions
      );
      formData.append("group", accountData.group);
      formData.append("collectionRoot", accountData.collectionRoot);
      formData.append("state", accountData.state);
      formData.append("city", accountData.city);
      formData.append("pinCode", accountData.pinCode);
      formData.append("country", accountData.country);
      formData.append("customerType", accountData.customerType);

      formData.append("rateType", accountData.rateType);

      formData.append("creditLimit", accountData.creditLimit);
      formData.append("creditDays", accountData.creditDays);
      formData.append("creditLimitStrict", accountData.creditLimitStrict);
      formData.append("allowCreditSale", accountData.allowCreditSale);
      formData.append("phoneNumber", accountData.phoneNumber);

      formData.append("whatsAppNumber", accountData.whatsAppNumber);
      formData.append("email", accountData.email);
      //   formData.append("openingBalance", accountData.openingBalance);

      formData.append(
        "openingBalance.amount",
        accountData.openingBalance.amount
      );
      formData.append("openingBalance.type", accountData.openingBalance.type);
      formData.append("dealerType", accountData.dealerType);

      formData.append("station", accountData.station);
      formData.append("bankName", accountData.bankName);
      formData.append("ifscCode", accountData.ifscCode);
      formData.append("visibility", accountData.visibility);
      formData.append("colorCode", accountData.colorCode);

      const response = await api.post("/api/accounts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Account created successfully");

      const uploadedImageUrl = response.data.imageUrl;

      // Optionally, reset form data after successful submission
      setAccountData({
        accountId: "",
        salutation: "",
        name: "",
        image: "",

        printName: "",

        address: {
          streetName: "",
          houseNumber: "",
          landmark: "",
          crossRoad: "",
          locality: "",
          relatedLocation: "",
          otherInstructions: "",
        },
        group: "",
        collectionRoot: "",
        state: "Jharkhand",
        city: "Dhanbad",
        pinCode: "",
        country: "India",
        customerType: "case customer",
        rateType: "Semi Wholesaler",
        creditLimit: 0,
        creditDays: 0,
        creditLimitStrict: "yes",
        allowCreditSale: false,
        phoneNumber: "",
        whatsAppNumber: "",
        email: "",
        openingBalance: { amount: 0, type: "credit" },
        station: "",
        bankName: "",
        ifscCode: "",
        visibility: "general", // Reset visibility to default
        colorCode: "green", // Reset visibility to default
      });

      setImageUrl(uploadedImageUrl);
    } catch (err) {
      console.error("Error:", err);
      if (err.response) {
        toast.error(err.response.data.message || "Server Error");
      } else if (err.request) {
        toast.error("No response received from server");
      } else {
        toast.error("Error setting up request");
      }
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://api.countrystatecity.in/v1/countries",
          {
            headers: {
              "X-CSCAPI-KEY":
                "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
            },
          }
        );
        // Filter out only India
        const indiaCountry = response.data.find(
          (country) => country.name === "India"
        );
        if (indiaCountry) {
          setCountries([indiaCountry]);
          setSelectedCountry(indiaCountry.name); // Select India by default
        } else {
          toast.error("India not found in country list");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching countries");
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    handleChange(event); // Propagate change event to parent component if needed
  };

  const filterCountries = (inputValue) => {
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const filterStates = (inputValue) => {
    const filtered = states.filter((state) =>
      state.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredStates(filtered);
  };

  const filterCities = (inputValue) => {
    const filtered = cities.filter((city) =>
      city.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  const fetchStates = async (countryIso2) => {
    try {
      const response = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${countryIso2}/states`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
          },
        }
      );
      setStates(response.data);
      setFilteredStates(response.data); // Initialize filtered states with all states
      setCities([]); // Clear cities when country changes
      setFilteredCities([]); // Clear filtered cities
    } catch (err) {
      console.error(err);
      toast.error("Error fetching states");
    }
  };

  const fetchCities = async (countryIso2, stateIso2) => {
    try {
      const response = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${countryIso2}/states/${stateIso2}/cities`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
          },
        }
      );
      setCities(response.data);
      setFilteredCities(response.data); // Initialize filtered cities with all cities
    } catch (err) {
      console.error(err);
      toast.error("Error fetching cities");
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!accountData.name) {
      isValid = false;
      toast.error("Please enter First Name");
    }

    if (!accountData.country) {
      isValid = false;
      toast.error("Please select a Country");
    }

    if (!accountData.state) {
      isValid = false;
      toast.error("Please select a State");
    }

    if (!accountData.city) {
      isValid = false;
      toast.error("Please select a City");
    }

    if (!accountData.pinCode) {
      isValid = false;
      toast.error("Please fetch pin code for the selected city");
      setPinCodeError(true);
    }

    return isValid;
  };

  const handleCheckboxChange = (e) => {
    setShowBankDetails(e.target.checked);
  };

  //   const handleCheckboxChange1 = (e) => {
  //     setShowCreditDetails(e.target.checked);
  //   };

  const handleCheckboxChange2 = (e) => {
    setShowAddressDetails(e.target.checked);
  };

  return (
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
                  <div className="col-xl-6 d-flex justify-content-start">
                    <h4 className="fw-bold text-start">
                      Add Customer Account Master
                    </h4>
                  </div>
                  <div className="col-xl-6 text-end">
                    <Link to={"/account_master_detail"}>
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
                                    select
                                    label="Salutation"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    required
                                    name="salutation"
                                    value={accountData.salutation}
                                    onChange={handleChange}
                                  >
                                    {salutations.map((salutationObj) => (
                                      <MenuItem
                                        key={salutationObj._id}
                                        value={salutationObj.salutation}
                                      >
                                        {salutationObj.salutation}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="Name"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    required
                                    type="text"
                                    name="name"
                                    value={accountData.name}
                                    onChange={handleChange}
                                  />
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="Print Name"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    required
                                    type="text"
                                    name="printName"
                                    value={accountData.printName}
                                    onChange={handleChange}
                                  />
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    onChange={handleImageChange}
                                    margin="normal"
                                    size="small"
                                    label="Add Image"
                                    InputLabelProps={{ shrink: true }}
                                  />
                                  {imageError && (
                                    <span style={{ color: "red" }}>
                                      Please upload an image file not exceeding
                                      2MB
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="col-xl-3">
                                <TextField
                                  id="openingBalance.amount"
                                  name="openingBalance.amount"
                                  label="Opening Balance Amount"
                                  type="number"
                                  value={accountData.openingBalance.amount}
                                  onChange={handleChange}
                                  required
                                  size="small"
                                  margin="normal"
                                  fullWidth
                                />
                              </div>

                              <div className="col-xl-3">
                                <FormControl
                                  fullWidth
                                  margin="normal"
                                  size="small"
                                >
                                  <InputLabel id="openingBalance.type-label">
                                    Opening Balance Type
                                  </InputLabel>
                                  <Select
                                    labelId="openingBalance.type-label"
                                    id="openingBalance.type"
                                    name="openingBalance.type"
                                    value={accountData.openingBalance.type}
                                    onChange={handleChange}
                                    required
                                    label="Opening Balance Type "
                                    margin="normal"
                                  >
                                    <MenuItem value="credit">Credit</MenuItem>
                                    <MenuItem value="debit">Debit</MenuItem>
                                  </Select>
                                </FormControl>
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
                                    <InputLabel id="rateType-label">
                                      Rate Type
                                    </InputLabel>
                                    <Select
                                      labelId="rateType-label"
                                      label="Rate type"
                                      name="rateType"
                                      value={accountData.rateType}
                                      onChange={handleChange}
                                    >
                                      <MenuItem value="Semi Wholesaler">
                                        Rate A
                                      </MenuItem>
                                      <MenuItem value="Wholesaler">
                                        Rate B
                                      </MenuItem>
                                      <MenuItem value="Retailer">
                                        Rate R
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                                </Box>
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
                                    <InputLabel id="customerType-label">
                                      Customer Type
                                    </InputLabel>
                                    <Select
                                      labelId="customerType-label"
                                      label="Customer Type"
                                      name="customerType"
                                      value={accountData.customerType}
                                      onChange={handleChange}
                                    >
                                      <MenuItem value="case customer">
                                        Cash Customer
                                      </MenuItem>
                                      <MenuItem value="credite customer">
                                        Credit Customer
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                                </Box>
                              </div>

                              <div className="col-xl-3">
                                <TextField
                                  select
                                  label="Account Type"
                                  fullWidth
                                  margin="normal"
                                  size="small"
                                  required
                                  name="visibility"
                                  id="visibility"
                                  value={accountData.visibility}
                                  onChange={handleChange}
                                >
                                  <MenuItem value="general">General</MenuItem>
                                  <MenuItem value="private">Private</MenuItem>
                                </TextField>
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
                                <div className="col-xl-12 mt-3">
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
                                    label="Account group"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    type="text"
                                    name="group"
                                    value={accountData.group.replace(
                                      /\b\w/g,
                                      (char) => char.toUpperCase()
                                    )}
                                    onChange={handleChange}
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
                                        Collection Root
                                      </InputLabel>
                                      <Select
                                        labelId="alternativeunit-label"
                                        label="collection Root"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        name="collectionRoot"
                                        value={accountData.collectionRoot}
                                        onChange={handleChange}
                                      >
                                        <MenuItem value="">
                                          Select collection Root
                                        </MenuItem>

                                        <MenuItem value="collectable">
                                          Collectable
                                        </MenuItem>
                                        <MenuItem value="not_collectable">
                                          Not Collectable
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Box>
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
                                        <InputLabel id="country-label">
                                          Country
                                        </InputLabel>
                                        <Select
                                          labelId="country-label"
                                          label="Country"
                                          fullWidth
                                          margin="normal"
                                          size="small"
                                          name="country"
                                          value={selectedCountry}
                                          onChange={handleCountryChange}
                                        >
                                          <MenuItem value="">
                                            Select Country
                                          </MenuItem>
                                          {countries.map((country) => (
                                            <MenuItem
                                              key={country.iso2}
                                              value={country.name}
                                            >
                                              {country.name}
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </FormControl>
                                    </Box>
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
                                          State
                                        </InputLabel>
                                        <Select
                                          labelId="alternativeunit-label"
                                          label="State"
                                          name="state"
                                          value={accountData.state}
                                          onChange={handleChange}
                                        >
                                          <MenuItem value="">
                                            Select State
                                          </MenuItem>
                                          {filteredStates.map((state) => (
                                            <MenuItem
                                              key={state.iso2}
                                              value={state.name}
                                            >
                                              {" "}
                                              {state.name}
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </FormControl>
                                    </Box>
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
                                          City
                                        </InputLabel>
                                        <Select
                                          labelId="alternativeunit-label"
                                          name="city"
                                          value={accountData.city}
                                          onChange={handleChange}
                                          label="City"
                                          fullWidth
                                          margin="normal"
                                          size="small"
                                        >
                                          <MenuItem value="">
                                            Select City
                                          </MenuItem>
                                          {filteredCities.map((city) => (
                                            <MenuItem
                                              key={city.name}
                                              value={city.name}
                                            >
                                              {city.name}
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </FormControl>
                                    </Box>
                                  </div>
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="Address Line 1"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    type="text"
                                    name="address.houseNumber"
                                    value={accountData.address.houseNumber}
                                    onChange={handleChange}
                                  />
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="Address Line 2"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    type="text"
                                    name="address.streetName"
                                    value={accountData.address.streetName.replace(
                                      /\b\w/g,
                                      (char) => char.toUpperCase()
                                    )}
                                    onChange={handleChange}
                                  />
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="Landmark"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    type="text"
                                    name="address.landmark"
                                    value={accountData.address.landmark.replace(
                                      /\b\w/g,
                                      (char) => char.toUpperCase()
                                    )}
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
                                    name="address.crossRoad"
                                    value={accountData.address.crossRoad.replace(
                                      /\b\w/g,
                                      (char) => char.toUpperCase()
                                    )}
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
                                    name="address.locality"
                                    value={accountData.address.locality.replace(
                                      /\b\w/g,
                                      (char) => char.toUpperCase()
                                    )}
                                    onChange={handleChange}
                                  />
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="Related Location"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    type="text"
                                    name="address.relatedLocation"
                                    value={accountData.address.relatedLocation.replace(
                                      /\b\w/g,
                                      (char) => char.toUpperCase()
                                    )}
                                    onChange={handleChange}
                                  />
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="Pin Code"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    type="text"
                                    name="pinCode"
                                    value={accountData.pinCode}
                                    onChange={handleChange}
                                  />

                                  {pinCodeError && (
                                    <span style={{ color: "red" }}>
                                      Pin Code Must be 6 digit
                                    </span>
                                  )}
                                </div>

                                <div className="col-xl-12">
                                  <Textarea
                                    maxRows={4}
                                    placeholder="Other Instructions......."
                                    style={{ width: "100%" }}
                                    className="p-4 mt-3"
                                    name="address.otherInstructions"
                                    value={accountData.address.otherInstructions.replace(
                                      /\b\w/g,
                                      (char) => char.toUpperCase()
                                    )}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    size="small"
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
                                  Contact Detail
                                </span>
                              </h4>
                            </div>

                            <div className="col-xl-6">
                              <div className="row">
                                <div className="col-xl-12">
                                  <div className="row">
                                    <div className="col-xl-6">
                                      <TextField
                                        label="Phone Number"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        required
                                        type="number"
                                        name="phoneNumber"
                                        value={accountData.phoneNumber}
                                        onChange={handleChange}
                                      />
                                      {phoneNumberError && (
                                        <p
                                          style={{
                                            color: "red",
                                            fontSize: "13px",
                                          }}
                                        >
                                          Please enter a valid 10-digit Phone
                                          Number
                                        </p>
                                      )}
                                    </div>
                                    <div className="col-xl-6">
                                      <TextField
                                        label="WhatsApp Number"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        required
                                        type="number"
                                        name="whatsAppNumber"
                                        value={accountData.whatsAppNumber}
                                        onChange={handleChange}
                                        disabled={autoFillWhatsApp}
                                      />
                                      {whatsAppNumberError && (
                                        <p
                                          style={{
                                            color: "red",
                                            fontSize: "12px",
                                          }}
                                        >
                                          Please enter a valid 10-digit WhatsApp
                                          Number
                                        </p>
                                      )}
                                    </div>
                                    <div className="col-xl-12">
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            checked={autoFillWhatsApp}
                                            onChange={handleAutoFillChange}
                                            name="autoFillWhatsApp"
                                            color="primary"
                                          />
                                        }
                                        label="Autofill WhatsApp from Phone"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-3">
                              <TextField
                                label="Email"
                                fullWidth
                                margin="normal"
                                size="small"
                                type="email"
                                name="email"
                                value={accountData.email}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="">
                            <div className="form-group">
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    type="checkbox"
                                    checked={showBankDetails}
                                    onChange={handleCheckboxChange}
                                    color="success"
                                  />
                                }
                                label=" Show Bank Details"
                              />
                            </div>

                            {showBankDetails && (
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
                                      Bank Detail
                                    </span>
                                  </h4>
                                </div>
                                <div className="col-xl-3">
                                  <TextField
                                    label="Bank Name"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    type="text"
                                    name="bankName"
                                    value={accountData.bankName}
                                    onChange={handleChange}
                                  />
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="Account Number"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    type="number"
                                    name="accountId"
                                    value={accountData.accountId}
                                    onChange={handleChange}
                                  />

                                  {accountIdError && (
                                    <span style={{ color: "red" }}>
                                      Please enter a valid Account Number (9-18
                                      digits)
                                    </span>
                                  )}
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="IFSC Code"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    type="text"
                                    name="ifscCode"
                                    value={accountData.ifscCode}
                                    onChange={handleChange}
                                  />

                                  {ifscError && (
                                    <span style={{ color: "#ff5252" }}>
                                      Invalid IFSC code. Must be in the format:
                                      ABCD0123456
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          <div>
                            {(accountData.customerType === "credite customer" ||
                              showCreditDetails) && (
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
                                      Credit Detail
                                    </span>
                                  </h4>
                                </div>

                                <div className="col-xl-12 mt-3">
                                  <h6>
                                    <span
                                      style={{
                                        fontSize: "15px",
                                      }}
                                      className="fw-bold"
                                    >
                                      Allow Credit Sale:
                                    </span>
                                    <input
                                      type="checkbox"
                                      name="allowCreditSale"
                                      checked={accountData.allowCreditSale}
                                      onChange={handleChange}
                                      className="ms-2"
                                    />
                                  </h6>
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="Credit Limit"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    required
                                    type="number"
                                    name="creditLimit"
                                    value={accountData.creditLimit}
                                    onChange={handleChange}
                                  />
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="Credit Days"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    required
                                    type="number"
                                    name="creditDays"
                                    value={accountData.creditDays}
                                    onChange={handleChange}
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
                                      <InputLabel id="creditLimitStrict-label">
                                        Credit Limit Strict
                                      </InputLabel>
                                      <Select
                                        labelId="creditLimitStrict-label"
                                        label="Credit Limit Strict"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        required
                                        name="creditLimitStrict"
                                        value={accountData.creditLimitStrict}
                                        onChange={handleChange}
                                      >
                                        <MenuItem value="">
                                          Select Credit Limit Strict
                                        </MenuItem>
                                        <MenuItem value="yes">Yes</MenuItem>
                                        <MenuItem value="no">No</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Box>
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
                                      <InputLabel id="colorCode-label">
                                        Color Code
                                      </InputLabel>
                                      <Select
                                        labelId="colorCode-label"
                                        label="color Code"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        required
                                        name="colorCode"
                                        value={accountData.colorCode}
                                        onChange={handleChange}
                                      >
                                        <MenuItem value="">
                                          Select Color Code
                                        </MenuItem>
                                        <MenuItem value="green">Green</MenuItem>
                                        <MenuItem value="red">Red</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Box>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="col-xl-12 mt-3">
                            <span
                              className="fw-bold mb-3"
                              style={{
                                color: "rgb(34, 153, 84)",
                                fontSize: "17px",
                              }}
                            >
                              Rate Type
                            </span>
                            <ul className="d-flex mt-2">
                              <li
                                className="me-5"
                                style={{
                                  color: "rgb(233, 30, 99)",
                                  fontWeight: "500",
                                }}
                              >
                                Rate A - Semi-Wholesaler
                              </li>
                              <li
                                className="me-5"
                                style={{ color: "gray", fontWeight: "500" }}
                              >
                                Rate B - Wholesaler
                              </li>
                              <li
                                style={{
                                  color: "rgb(0, 188, 212)",
                                  fontWeight: "500",
                                }}
                              >
                                Rate R - Retailer
                              </li>
                            </ul>
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
                              Create Account
                            </Button>
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
  );
}
