// import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import Grid from "@mui/material/Grid";
// import { Link, useParams } from "react-router-dom";
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
//   DialogTitle,
// } from "@mui/material";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FormControl, InputLabel, Select, IconButton } from "@mui/material";
// import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";

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
//   >
//     Account Detail
//   </Link>,

//   <Typography key="4" color="text.primary">
//     Update Account Master
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

// export default function UpdateAccountMaster() {
//   const navigate = useNavigate();

//   const { id } = useParams();
//   const [account, setAccount] = useState({
//     accountId: "",
//     salutation: "",
//     name: "",
//     image: "",
//     lastName: "",
//     username: "",
//     printName: "",
//     companyName: "",
//     address: {
//       streetName: "",
//       houseNumber: "",
//       landmark: "",
//       crossRoad: "",
//       locality: "",
//       relatedLocation: "",
//       otherInstructions: "",
//     },
//     group: "",
//     collectionRoot: "",
//     state: "",
//     city: "",
//     pinCode: "",
//     country: "",
//     customerType: "Retailer",
//     creditLimit: 0,
//     creditDays: 0,
//     creditLimitStrict: "yes",
//     allowCreditSale: false,
//     phoneNumber: "",
//     whatsAppNumber: "",
//     email: "",
//     openingBalance: 0,

//     contactPerson: "",
//     station: "",
//     bankName: null,
//     ifscCode: null,
//   });
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [salutations, setSalutations] = useState([]);

//   useEffect(() => {
//     const fetchAccount = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/accounts/${id}`
//         );
//         setAccount(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

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
//         const indiaCountry = response.data.find(
//           (country) => country.name === "India"
//         );

//         if (indiaCountry) {
//           setCountries([indiaCountry]);
//           setSelectedCountry(indiaCountry.name); // Select India by default
//         } else {
//           toast.error("India not found in country list");
//         }

//         setCountries(response.data);
//       } catch (err) {
//         console.error(err);
//         toast.error("Error fetching countries");
//       }
//     };

//     fetchAccount();
//     fetchCountries();
//   }, [id]);

//   useEffect(() => {
//     if (account.country) {
//       fetchStates(account.country);
//     }
//   }, [account.country]);

//   useEffect(() => {
//     if (account.state) {
//       fetchCities(account.country, account.state);
//     }
//   }, [account.state]);

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
//     } catch (error) {
//       console.error("Error fetching states:", error);
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
//     } catch (error) {
//       console.error("Error fetching cities:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchSalutations = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/salutations');
//         setSalutations(response.data); // Ensure this is an array of objects
//       } catch (err) {
//         console.error(err);
//         toast.error('Error fetching salutations');
//       }
//     };

//     fetchSalutations();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (name.startsWith('address.')) {
//       const addressField = name.split('.')[1];
//       setAccount((prevState) => ({
//         ...prevState,
//         address: {
//           ...prevState.address,
//           [addressField]: type === 'checkbox' ? checked : value,
//         },
//       }));
//     } else {
//       setAccount((prevState) => ({
//         ...prevState,
//         [name]: type === 'checkbox' ? checked : value,
//       }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.size <= 2 * 1024 * 1024) {
//       // file size limit: 2MB
//       setAccount({
//         ...account,
//         image: file,
//       });
//     } else {
//       // Handle error or notify user about image size limit
//       toast.error("Please upload an image file not exceeding 2MB.");
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("image", account.image); // Append the image file if it exists

//       // Append other fields
//       if (account.accountId) formData.append("accountId", account.accountId);
//       formData.append("salutation", account.salutation);
//       formData.append("name", account.name);
//       formData.append("lastName", account.lastName);
//       formData.append("printName", account.printName);
//       formData.append("companyName", account.companyName);

//       // Append address fields
//       if (account.address) {
//         formData.append("address.streetName", account.address.streetName || '');
//         formData.append("address.houseNumber", account.address.houseNumber || '');
//         formData.append("address.landmark", account.address.landmark || '');
//         formData.append("address.crossRoad", account.address.crossRoad || '');
//         formData.append("address.locality", account.address.locality || '');
//         formData.append("address.relatedLocation", account.address.relatedLocation || '');
//         formData.append("address.otherInstructions", account.address.otherInstructions || '');
//       }

//       formData.append("group", account.group);
//       formData.append("collectionRoot", account.collectionRoot);
//       formData.append("state", account.state);
//       formData.append("city", account.city);
//       formData.append("pinCode", account.pinCode || '');
//       formData.append("country", account.country || '');
//       formData.append("customerType", account.customerType);
//       formData.append("creditLimit", account.creditLimit);
//       formData.append("creditDays", account.creditDays);
//       formData.append("creditLimitStrict", account.creditLimitStrict);
//       formData.append("allowCreditSale", account.allowCreditSale);
//       formData.append("phoneNumber", account.phoneNumber);
//       formData.append("whatsAppNumber", account.whatsAppNumber);
//       formData.append("email", account.email || '');

//       await axios.put(`http://localhost:5000/api/accounts/${account._id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       toast.success("Account updated successfully");
//       navigate("/account_master_detail");
//     } catch (error) {
//       console.error('Error updating account:', error.response ? error.response.data : error.message);
//       toast.error("Failed to update account");
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
//                 <ToastContainer />
//                 <DrawerHeader />
//                 <div className="container-fluid">

//                       <div className="row d-flex justify-content-between">
//                         <div className="col-xl-12">
//                           <h4 className="fw-bold text-center">Update Account Master</h4>
//                         </div>
//                       </div>

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
//                   <div className="row">
//                     <div className="col-xl-12">
//                       <Box
//                         component="form"

//                         onSubmit={handleUpdate}
//                       >
//                         <div className="row">
//                           <div
//                             className="col-xl-12 mx-auto p-4"
//                             // style={{
//                             //   border: "1px solid gray",
//                             //   borderRadius: "8px",
//                             // }}
//                           >
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

//                                 <div className="col-xl-3">
//                                   {/* <Box
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
//                                         Salutation
//                                       </InputLabel>
//                                       <Select
//                                         labelId="alternativeunit-label"
//                                         label="salutation"
//                                         fullWidth
//                                         margin="normal"
//                                         size="small"
//                                         required
//                                         name="salutation"
//                                         value={account.salutation}
//                                         onChange={handleChange}
//                                       >
//                                         <MenuItem value="">
//                                           Select Salutation
//                                         </MenuItem>

//                                         <MenuItem value="Mr.">Mr.</MenuItem>
//                                         <MenuItem value="Mrs.">Mrs.</MenuItem>
//                                       </Select>
//                                     </FormControl>
//                                   </Box> */}

// <TextField
//                                       select
//                                       label="Salutation"
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       required
//                                       name="salutation"
//                                       value={account.salutation}
//                                       onChange={handleChange}
//                                     >
//                                       {salutations.map((salutationObj) => (
//                                         <MenuItem key={salutationObj._id} value={salutationObj.salutation}>
//                                           {salutationObj.salutation}
//                                         </MenuItem>
//                                       ))}
//                                     </TextField>
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="First Name"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     required
//                                     type="text"
//                                     name="name"
//                                     value={account.name}
//                                     onChange={handleChange}
//                                   />
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="Last Name"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     required
//                                     type="text"
//                                     name="lastName"
//                                     value={account.lastName}
//                                     onChange={handleChange}
//                                   />
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     type="file"
//                                     accept="image/*"
//                                     name="image"
//                                     onChange={handleImageChange}
//                                     size="small"
//                                     margin="normal"
//                                   />
//                                   {/* {account.image && (
//                                     <div>
//                                       <img
//                                         src={`http://localhost:5000/${account.image}`}
//                                         alt="Account"
//                                         style={{
//                                           width: "100px",
//                                           height: "100px",
//                                           marginTop: "10px",
//                                         }}
//                                       />
//                                     </div>
//                                   )} */}
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="Print Name"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     required
//                                     type="text"
//                                     name="printName"
//                                     value={account.printName}
//                                     onChange={handleChange}
//                                   />
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="Company Name"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     required
//                                     type="text"
//                                     name="companyName"
//                                     value={account.companyName}
//                                     onChange={handleChange}
//                                   />
//                                 </div>

//                                 <div className="row">
//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Opening Balance"
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       required
//                                       type="number"
//                                       name="openingBalance"
//                                       value={account.openingBalance}
//                                       onChange={handleChange}
//                                     />
//                                   </div>
//                                 </div>

//                                 {/* <div className="col-xl-3">
//                                 <TextField
//                                   label="Company Name"
//                                   fullWidth
//                                   margin="normal"
//                                   size="small"
//                                   required
//                                   type="text"
//                                   name="companyName"
//                                   value={account.companyName}
//                                   onChange={handleChange}
//                                 />
//                               </div> */}
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
//                                     required
//                                     type="text"
//                                     name="address.houseNumber"
//                                     value={account.address ? account.address.houseNumber : ''}
//                                     onChange={handleChange}
//                                   />
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="Street Name"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     required
//                                     type="text"
//                                     name="address.streetName"
//                                     value={account.address ? account.address.streetName : ''}
//                                     onChange={handleChange}
//                                   />
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="Landmark"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     required
//                                     type="text"
//                                     name="address.landmark"
//                                     value={account.address ? account.address.landmark : ''}
//                                     onChange={handleChange}
//                                   />
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="Cross Road"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     required
//                                     type="text"
//                                     name="address.crossRoad"
//                                     value={account.address ? account.address.crossRoad : ''}
//                                     onChange={handleChange}
//                                   />
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="Locality"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     required
//                                     type="text"
//                                     name="address.locality"
//                                     value={account.address ? account.address.locality : ''}
//                                     onChange={handleChange}
//                                   />
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="Related Location"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     required
//                                     type="text"
//                                     name="address.relatedLocation"
//                                     value={account.address ? account.address.relatedLocation : ''}
//                                     onChange={handleChange}
//                                   />
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="Area Group"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     required
//                                     type="text"
//                                     name="group"
//                                     value={account.group}
//                                     onChange={handleChange}
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
//                                         Collection Root
//                                       </InputLabel>
//                                       <Select
//                                         labelId="alternativeunit-label"
//                                         label="Collection Root"
//                                         fullWidth
//                                         margin="normal"
//                                         size="small"
//                                         required
//                                         name="collectionRoot"
//                                         value={account.collectionRoot}
//                                         onChange={handleChange}
//                                       >
//                                         <MenuItem value="">
//                                           Select Collection Root
//                                         </MenuItem>

//                                         <MenuItem value="collectable">
//                                           Collectable
//                                         </MenuItem>
//                                         <MenuItem value="not_collectable">
//                                           Not Collectable
//                                         </MenuItem>
//                                       </Select>
//                                     </FormControl>
//                                   </Box>
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <Box
//                                   display="flex"
//                                   alignItems="center"
//                                   margin="normal"
//                                 >
//                                   <FormControl
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                   >
//                                     <InputLabel id="alternativeunit-label">
//                                       City
//                                     </InputLabel>
//                                     <Select
//                                       labelId="alternativeunit-label"
//                                       label="Country"
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       required
//                                       name="city"
//                                       value={account.city}
//                                       onChange={handleChange}
//                                     >
//                                       <MenuItem value="">
//                                         Select Country
//                                       </MenuItem>
//                                       {cities.map((city) => (
//                                         <MenuItem
//                                           key={city.name}
//                                           value={city.name}
//                                         >
//                                           {" "}
//                                           {city.name}
//                                         </MenuItem>
//                                       ))}
//                                     </Select>
//                                   </FormControl>
//                                 </Box>

//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="Pin Code"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     required
//                                     type="text"
//                                     name="pinCode"
//                                     value={account.pinCode}
//                                     onChange={handleChange}
//                                   />
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <Box
//                                   display="flex"
//                                   alignItems="center"
//                                   margin="normal"
//                                 >
//                                   <FormControl
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                   >
//                                     <InputLabel id="alternativeunit-label">
//                                       Country
//                                     </InputLabel>
//                                     <Select
//                                       labelId="alternativeunit-label"
//                                       label="Country"
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       required
//                                       name="country"
//                                       value={account.country}
//                                       onChange={handleChange}
//                                     >
//                                       <MenuItem value="">
//                                         Select Country
//                                       </MenuItem>
//                                       {countries.map((country) => (
//                                         <MenuItem
//                                           key={country.iso2}
//                                           value={country.iso2}
//                                         >
//                                           {" "}
//                                           {country.name}
//                                         </MenuItem>
//                                       ))}
//                                     </Select>
//                                   </FormControl>
//                                 </Box>

//                                   {/* <TextField
//                                     label="Country"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     required
//                                     type="text"
//                                     name="country"
//                                     value={account.country}
//                                     onChange={handleChange}
//                                     disabled
//                                   /> */}
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <Box
//                                   display="flex"
//                                   alignItems="center"
//                                   margin="normal"
//                                 >
//                                   <FormControl
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                   >
//                                     <InputLabel id="alternativeunit-label">
//                                       State
//                                     </InputLabel>
//                                     <Select
//                                       labelId="alternativeunit-label"
//                                       label="State"
//                                       name="state"
//                                       value={account.state}
//                                       onChange={handleChange}
//                                       required
//                                     >
//                                       <MenuItem value="">Select State</MenuItem>
//                                       {states.map((state) => (
//                                         <MenuItem
//                                           key={state.iso2}
//                                           value={state.iso2}
//                                         >
//                                           {state.name}
//                                         </MenuItem>
//                                       ))}
//                                     </Select>
//                                   </FormControl>
//                                 </Box>

//                                   {/* <TextField
//                                     label="State"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     required
//                                     type="text"
//                                     name="state"
//                                     value={account.state}
//                                     onChange={handleChange}
//                                     disabled
//                                   /> */}
//                                 </div>

//                                 <div className="col-xl-8">

//                                   <Textarea
//                                     maxRows={4}
//                                     placeholder="Other Instructions......."
//                                     style={{ width: "100%" }}
//                                     className="p-4 mt-3"
//                                     // label="Description"
//                                     name="address.otherInstructions"
//                                     value={account.address.otherInstructions}
//                                     onChange={handleChange}
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     required
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
//                                 <div className="col-xl-12">
//                                   <h4>
//                                     <span
//                                       style={{
//                                         fontSize: "20px",
//                                         color: "rgb(1, 87, 155)",
//                                       }}
//                                       className="fw-bold"
//                                     >
//                                       Contact
//                                     </span>
//                                   </h4>
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="Phone Number"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     required
//                                     type="text"
//                                     name="phoneNumber"
//                                     value={account.phoneNumber}
//                                     onChange={handleChange}
//                                   />
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="whatsApp Number "
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     required
//                                     type="number"
//                                     name="whatsAppNumber"
//                                     value={account.whatsAppNumber}
//                                     onChange={handleChange}
//                                   />
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="Email"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     type="email"
//                                     name="email"
//                                     value={account.email}
//                                     onChange={handleChange}
//                                   />
//                                 </div>

//                                 <div className="row">
//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="contact Person"
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       required
//                                       type="text"
//                                       name="contactPerson"
//                                       value={account.contactPerson}
//                                       onChange={handleChange}
//                                     />
//                                   </div>
//                                   <div className="col-xl-4">
//                                     <TextField
//                                       label="Station"
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       required
//                                       type="text"
//                                       name="station"
//                                       value={account.station}
//                                       onChange={handleChange}
//                                     />
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
//                                 <div className="col-xl-12 mt-3">
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
//                                 </div>
//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="Bank Name"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     type="text"
//                                     name="bankName"
//                                     value={account.bankName}
//                                     onChange={handleChange}
//                                   />
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="Bank Account Number"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     type="text"
//                                     name="accountId"
//                                     value={account.accountId}
//                                     onChange={handleChange}
//                                   />
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="IFSC Code"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     type="text"
//                                     name="ifscCode"
//                                     value={account.ifscCode}
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
//                                 <div className="col-xl-12">
//                                   <h4>
//                                     <span
//                                       style={{
//                                         fontSize: "20px",
//                                         color: "rgb(1, 87, 155)",
//                                       }}
//                                       className="fw-bold"
//                                     >
//                                       Credit Detail
//                                     </span>
//                                   </h4>
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="Customer Type"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     required
//                                     type="text"
//                                     name="customerType"
//                                     value={account.customerType}
//                                     onChange={handleChange}
//                                     select
//                                   >
//                                     <MenuItem value="Retailer">
//                                       Retailer
//                                     </MenuItem>
//                                     <MenuItem value="Semi Wholesaler">
//                                       Semi Wholesaler
//                                     </MenuItem>
//                                     <MenuItem value="Wholesaler">
//                                       Wholesaler
//                                     </MenuItem>
//                                   </TextField>
//                                 </div>

//                                 <div className="col-xl-12">
//                                   <h4>
//                                     <span
//                                       style={{
//                                         fontSize: "15px",
//                                       }}
//                                       className="fw-bold"
//                                     >
//                                       Allow Credit Sale:
//                                       <input
//                                         type="checkbox"
//                                         name="allowCreditSale"
//                                         checked={account.allowCreditSale}
//                                         onChange={handleChange}
//                                         className="ms-2"
//                                       />
//                                     </span>
//                                   </h4>
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="Credit Limit"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     required
//                                     type="number"
//                                     name="creditLimit"
//                                     value={account.creditLimit}
//                                     onChange={handleChange}
//                                     disabled={!account.allowCreditSale}
//                                   />
//                                 </div>

//                                 <div className="col-xl-3">
//                                   <TextField
//                                     label="Credit Days"
//                                     fullWidth
//                                     margin="normal"
//                                     size="small"
//                                     required
//                                     type="number"
//                                     name="creditDays"
//                                     value={account.creditDays}
//                                     onChange={handleChange}
//                                     disabled={!account.allowCreditSale}
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
//                                       <InputLabel id="creditLimitStrict-label">
//                                         Credit Limit Strict
//                                       </InputLabel>
//                                       <Select
//                                         labelId="creditLimitStrict-label"
//                                         label="Credit Limit Strict"
//                                         fullWidth
//                                         margin="normal"
//                                         size="small"
//                                         required
//                                         name="creditLimitStrict"
//                                         value={account.creditLimitStrict}
//                                         onChange={handleChange}
//                                         disabled={!account.allowCreditSale}
//                                       >
//                                         <MenuItem value="">
//                                           Select Credit Limit Strict
//                                         </MenuItem>
//                                         <MenuItem value="yes">Yes</MenuItem>
//                                         <MenuItem value="no">No</MenuItem>
//                                       </Select>
//                                     </FormControl>
//                                   </Box>
//                                 </div>
//                               </div>

//                               <div className="col-xl-4 d-flex justify-content-center mx-auto">
//                                 <Button
//                                   variant="contained"
//                                   color="primary"
//                                   type="submit"
//                                   fullWidth
//                                   sx={{ mt: 2 }}
//                                   className="p-2"
//                                 >
//                                   Update Account
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

//=============================== Update Live code ==================================

import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Link, useParams } from "react-router-dom";
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
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormControl, InputLabel, Select, IconButton } from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
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
    to="/account_master_detail"
    className="text-decoration-none"
  >
    Account Detail
  </Link>,

  <Typography key="4" color="text.primary">
    Update Account Master
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

export default function UpdateAccountMaster() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [account, setAccount] = useState({
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
    state: "",
    city: "",
    pinCode: "",
    country: "",
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
    bankName: null,
    ifscCode: null,
    colorCode: "green",
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [salutations, setSalutations] = useState([]);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [showCreditDetails, setShowCreditDetails] = useState(false);
  const [accountIdError, setAccountIdError] = useState(false);
  const [ifscError, setIfscError] = useState("");

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await api.get(`/api/accounts/${id}`);
        setAccount(response.data);
      } catch (error) {
        console.error(error);
      }
    };

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
        const indiaCountry = response.data.find(
          (country) => country.name === "India"
        );

        if (indiaCountry) {
          setCountries([indiaCountry]);
          setSelectedCountry(indiaCountry.name); // Select India by default
        } else {
          toast.error("India not found in country list");
        }

        setCountries(response.data);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching countries");
      }
    };

    fetchAccount();
    fetchCountries();
  }, [id]);

  useEffect(() => {
    if (account.country) {
      fetchStates(account.country);
    }
  }, [account.country]);

  useEffect(() => {
    if (account.state) {
      fetchCities(account.country, account.state);
    }
  }, [account.state]);

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
    } catch (error) {
      console.error("Error fetching states:", error);
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
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

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
    const { name, value, type, checked } = e.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setAccount((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [addressField]: type === "checkbox" ? checked : value,
        },
      }));
    } else if (name === "openingBalance.amount") {
      setAccount((prevState) => ({
        ...prevState,
        openingBalance: {
          ...prevState.openingBalance,
          amount: value,
        },
      }));
    } else if (name === "openingBalance.type") {
      setAccount((prevState) => ({
        ...prevState,
        openingBalance: {
          ...prevState.openingBalance,
          type: value,
        },
      }));
    } else {
      setAccount((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      // file size limit: 2MB
      setAccount({
        ...account,
        image: file,
      });
    } else {
      // Handle error or notify user about image size limit
      toast.error("Please upload an image file not exceeding 2MB.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", account.image); // Append the image file if it exists

      // Append other fields
      if (account.accountId) formData.append("accountId", account.accountId);
      formData.append("salutation", account.salutation);
      formData.append("name", account.name);

      formData.append("printName", account.printName);

      // Append address fields
      if (account.address) {
        formData.append("address.streetName", account.address.streetName || "");
        formData.append(
          "address.houseNumber",
          account.address.houseNumber || ""
        );
        formData.append("address.landmark", account.address.landmark || "");
        formData.append("address.crossRoad", account.address.crossRoad || "");
        formData.append("address.locality", account.address.locality || "");
        formData.append(
          "address.relatedLocation",
          account.address.relatedLocation || ""
        );
        formData.append(
          "address.otherInstructions",
          account.address.otherInstructions || ""
        );
      }

      formData.append("group", account.group);
      formData.append("collectionRoot", account.collectionRoot);
      formData.append("state", account.state);
      formData.append("city", account.city);
      formData.append("pinCode", account.pinCode || "");
      formData.append("country", account.country || "");
      formData.append("customerType", account.customerType);
      formData.append("rateType", account.rateType);
      formData.append("creditLimit", account.creditLimit);
      formData.append("creditDays", account.creditDays);
      formData.append("creditLimitStrict", account.creditLimitStrict);
      formData.append("allowCreditSale", account.allowCreditSale);
      formData.append("phoneNumber", account.phoneNumber);
      formData.append("whatsAppNumber", account.whatsAppNumber);
      formData.append("email", account.email || "");
      formData.append("colorCode", account.colorCode || "");
      formData.append("openingBalance.amount", account.openingBalance.amount);
      formData.append("openingBalance.type", account.openingBalance.type);

      await api.put(`/api/accounts/${account._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Account updated successfully");
      navigate("/account_master_detail");
    } catch (error) {
      console.error(
        "Error updating account:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to update account");
    }
  };

  const handleCheckboxChange = (e) => {
    setShowBankDetails(e.target.checked);
  };

  const handleCheckboxChange1 = (e) => {
    setShowCreditDetails(e.target.checked);
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
                <ToastContainer />
                <DrawerHeader />
                <div className="container-fluid">
                  <div className="row d-flex justify-content-between">
                    <div className="col-xl-12 text-center">
                      <h4 className="fw-bold">Update Account Master</h4>
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
                  <div className="row">
                    <div className="col-xl-12">
                      <Box component="form" onSubmit={handleUpdate}>
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

                                <div className="col-xl-3">
                                  <TextField
                                    select
                                    label="Salutation"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    required
                                    name="salutation"
                                    value={account.salutation}
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
                                    value={account.name}
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
                                    value={account.printName}
                                    onChange={handleChange}
                                  />
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    onChange={handleImageChange}
                                    size="small"
                                    margin="normal"
                                  />
                                </div>

                                <div className="row">
                                  <div className="col-xl-3">
                                    <TextField
                                      fullWidth
                                      label="Opening Balance Amount"
                                      name="openingBalance.amount"
                                      type="number"
                                      value={account.openingBalance.amount}
                                      onChange={handleChange}
                                      margin="normal"
                                      size="small"
                                    />
                                  </div>

                                  <div className="col-xl-3">
                                    <FormControl fullWidth margin="normal">
                                      <InputLabel>
                                        Opening Balance Type
                                      </InputLabel>
                                      <Select
                                        name="openingBalance.type"
                                        value={account.openingBalance.type}
                                        onChange={handleChange}
                                        size="small"
                                        label="   Opening Balance Type"
                                      >
                                        <MenuItem value="credit">
                                          Credit
                                        </MenuItem>
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
                                          label="rateType Type"
                                          name="rateType"
                                          value={account.rateType}
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
                                          customerType
                                        </InputLabel>
                                        <Select
                                          labelId="customerType-label"
                                          label="customerType Type"
                                          name="customerType"
                                          value={account.customerType}
                                          onChange={handleChange}
                                        >
                                          <MenuItem value="case customer">
                                            case customer
                                          </MenuItem>

                                          <MenuItem value="credite customer">
                                            credite customer
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    </Box>
                                  </div>
                                  <div className="col-xl-2">
                                    <TextField
                                      select
                                      label="Account Type"
                                      fullWidth
                                      margin="normal"
                                      size="small"
                                      required
                                      name="visibility"
                                      id="visibility"
                                      value={account.visibility}
                                      onChange={handleChange}
                                      InputProps={{
                                        style: {
                                          fontSize: "0.875rem", // Reduce the font size
                                        },
                                      }}
                                      InputLabelProps={{
                                        shrink: true,
                                        style: { fontSize: "0.875rem" }, // Reduce label font size
                                      }}
                                    >
                                      <MenuItem value="general">
                                        General
                                      </MenuItem>
                                      <MenuItem value="private">
                                        Private
                                      </MenuItem>
                                    </TextField>
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
                                      Address
                                    </span>
                                  </h4>
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="House Number"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    required
                                    type="text"
                                    name="address.houseNumber"
                                    value={
                                      account.address
                                        ? account.address.houseNumber
                                        : ""
                                    }
                                    onChange={handleChange}
                                  />
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="Street Name"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    required
                                    type="text"
                                    name="address.streetName"
                                    value={
                                      account.address
                                        ? account.address.streetName
                                        : ""
                                    }
                                    onChange={handleChange}
                                  />
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="Landmark"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    required
                                    type="text"
                                    name="address.landmark"
                                    value={
                                      account.address
                                        ? account.address.landmark
                                        : ""
                                    }
                                    onChange={handleChange}
                                  />
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="Cross Road"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    required
                                    type="text"
                                    name="address.crossRoad"
                                    value={
                                      account.address
                                        ? account.address.crossRoad
                                        : ""
                                    }
                                    onChange={handleChange}
                                  />
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="Locality"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    required
                                    type="text"
                                    name="address.locality"
                                    value={
                                      account.address
                                        ? account.address.locality
                                        : ""
                                    }
                                    onChange={handleChange}
                                  />
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="Related Location"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    required
                                    type="text"
                                    name="address.relatedLocation"
                                    value={
                                      account.address
                                        ? account.address.relatedLocation
                                        : ""
                                    }
                                    onChange={handleChange}
                                  />
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="Area Group"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    required
                                    type="text"
                                    name="group"
                                    value={account.group}
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
                                        label="Collection Root"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        required
                                        name="collectionRoot"
                                        value={account.collectionRoot}
                                        onChange={handleChange}
                                      >
                                        <MenuItem value="">
                                          Select Collection Root
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
                                        label="Country"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        required
                                        name="city"
                                        value={account.city}
                                        onChange={handleChange}
                                      >
                                        <MenuItem value="">
                                          Select Country
                                        </MenuItem>
                                        {cities.map((city) => (
                                          <MenuItem
                                            key={city.name}
                                            value={city.name}
                                          >
                                            {" "}
                                            {city.name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </Box>
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="Pin Code"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    required
                                    type="text"
                                    name="pinCode"
                                    value={account.pinCode}
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
                                        Country
                                      </InputLabel>
                                      <Select
                                        labelId="alternativeunit-label"
                                        label="Country"
                                        fullWidth
                                        margin="normal"
                                        size="small"
                                        required
                                        name="country"
                                        value={account.country}
                                        onChange={handleChange}
                                      >
                                        <MenuItem value="">
                                          Select Country
                                        </MenuItem>
                                        {countries.map((country) => (
                                          <MenuItem
                                            key={country.iso2}
                                            value={country.iso2}
                                          >
                                            {" "}
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
                                        value={account.state}
                                        onChange={handleChange}
                                        required
                                      >
                                        <MenuItem value="">
                                          Select State
                                        </MenuItem>
                                        {states.map((state) => (
                                          <MenuItem
                                            key={state.iso2}
                                            value={state.iso2}
                                          >
                                            {state.name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </Box>
                                </div>

                                <div className="col-xl-8">
                                  <Textarea
                                    maxRows={4}
                                    placeholder="Other Instructions......."
                                    style={{ width: "100%" }}
                                    className="p-4 mt-3"
                                    name="address.otherInstructions"
                                    value={account.address.otherInstructions}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    required
                                  />
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
                                      Contact
                                    </span>
                                  </h4>
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="Phone Number"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    required
                                    type="text"
                                    name="phoneNumber"
                                    value={account.phoneNumber}
                                    onChange={handleChange}
                                  />
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="whatsApp Number "
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    required
                                    type="number"
                                    name="whatsAppNumber"
                                    value={account.whatsAppNumber}
                                    onChange={handleChange}
                                  />
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="Email"
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    type="email"
                                    name="email"
                                    value={account.email}
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
                                        value={account.bankName.replace(
                                          /\b\w/g,
                                          (char) => char.toUpperCase()
                                        )}
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
                                        value={account.accountId}
                                        onChange={handleChange}
                                      />

                                      {accountIdError && (
                                        <span style={{ color: "red" }}>
                                          Please enter a valid Account Number
                                          (9-18 digits)
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
                                        value={account.ifscCode}
                                        onChange={handleChange}
                                      />

                                      {ifscError && (
                                        <span style={{ color: "#ff5252" }}>
                                          Invalid IFSC code. Must be in the
                                          format: ABCD0123456
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div>
                                <div className="form-group">
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        type="checkbox"
                                        checked={showCreditDetails}
                                        onChange={handleCheckboxChange1}
                                        color="success"
                                      />
                                    }
                                    label="Show Credit Details"
                                  />
                                </div>

                                {showCreditDetails && (
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
                                          checked={account.allowCreditSale}
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
                                        value={account.creditLimit}
                                        onChange={handleChange}
                                        disabled={!account.allowCreditSale} // Disable if credit sale is not allowed
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
                                        value={account.creditDays}
                                        onChange={handleChange}
                                        disabled={!account.allowCreditSale} // Disable if credit sale is not allowed
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
                                            value={account.creditLimitStrict}
                                            onChange={handleChange}
                                            disabled={!account.allowCreditSale}
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
                                            value={account.colorCode}
                                            onChange={handleChange}
                                          >
                                            <MenuItem value="">
                                              Select Color Code
                                            </MenuItem>
                                            <MenuItem value="green">
                                              Green
                                            </MenuItem>
                                            <MenuItem value="red">Red</MenuItem>
                                          </Select>
                                        </FormControl>
                                      </Box>
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="col-xl-4 d-flex justify-content-center mx-auto">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  type="submit"
                                  fullWidth
                                  sx={{ mt: 2 }}
                                  className="p-2"
                                >
                                  Update Account
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
