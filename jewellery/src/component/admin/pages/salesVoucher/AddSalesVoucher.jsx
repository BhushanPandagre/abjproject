//=========================== Original code ==========================//

// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   TextField,
//   Stack,
//   Grid,
//   Button,
//   FormControl,
//   Paper,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CssBaseline,
//   Autocomplete,
//   Checkbox,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import Header from "../../../schema/Header";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import { styled } from "@mui/material/styles";
// import InputAdornment from "@mui/material/InputAdornment";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import CancelIcon from "@mui/icons-material/Cancel";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import api from "../../../../services/api";

// const breadcrumbs = [
//   <Link key="1" to="/purchase_voucher_list">
//     Purchase Voucher
//   </Link>,
//   <Typography key="3" color="text.secondary">
//     Add Purchase Voucher
//   </Typography>,
// ];

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// export default function AddSalesVoucher() {
//   const [formData, setFormData] = useState({
//     buyerName: "",
//     saleDate: new Date().toISOString().split("T")[0],
//     saleVoucherNo: "",
//     sellerVoucherNo: "",
//     itemsList: [],
//     packingCharges: 0,
//     gstExpenses: 0,
//     otherExpenses: 0,
//     totalItemAmount: 0,
//     billSundryAmount: 0,
//     totalAmount: 0,
//     accountId: "",
//     buyerRateType: "", // To store the rate type
//   });

//   const [itemsList, setItemsList] = useState([
//     { item: "", quantity: "", unit: "", price: "", amount: 0 },
//   ]);
//   const [accounts, setAccounts] = useState([]);
//   const [items, setItems] = useState([]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     // Handle date value
//     if (name === "saleDate") {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//       return;
//     }

//     const updatedValue = parseFloat(value) || 0; // Ensure value is a number
//     let updatedFormData = { ...formData, [name]: updatedValue };

//     if (name === "gstExpenses") {
//       const gstAmount = (formData.totalItemAmount * updatedValue) / 100;
//       updatedFormData = { ...updatedFormData, gstAmount };
//     }

//     const billSundryAmount =
//       updatedFormData.packingCharges +
//       (updatedFormData.gstAmount || updatedFormData.gstExpenses) +
//       updatedFormData.otherExpenses;
//     const totalAmount = updatedFormData.totalItemAmount + billSundryAmount;

//     setFormData({
//       ...updatedFormData,
//       billSundryAmount,
//       totalAmount,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.buyerName) {
//       toast.error("Please select a buyer name.");
//       return;
//     }

//     console.log("Form data before submission:", formData);

//     const finalFormData = {
//       ...formData,
//       itemsList: itemsList.map((item) => ({
//         item: item.item, // Ensure this is set to the ObjectId
//         quantity: item.quantity,
//         unit: item.unit,
//         price: item.price,
//         amount: item.amount,
//       })),
//       transportDetails: showTransportDetails ? transportDetails : {},
//     };

//     console.log("Final form data being sent:", finalFormData);

//     try {
//       const response = await api.post("/api/sale-vouchers/add", finalFormData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.status === 201 || response.status === 200) {
//         toast.success("Sales Voucher Added Successfully!");
//       } else {
//         toast.error("Failed to add Sales Voucher.");
//       }
//     } catch (error) {
//       console.error(
//         "Error during submission:",
//         error.response?.data || error.message
//       );
//       toast.error(
//         "An error occurred while submitting the form. Please try again."
//       );
//     }
//   };

//   // Function to handle item list changes
//   const handleItemChange = (index, e) => {
//     const { name, value } = e.target;
//     const newItemsList = [...itemsList];
//     newItemsList[index][name] = value;

//     // Calculate amount for each item
//     if (name === "quantity" || name === "price") {
//       newItemsList[index].amount =
//         newItemsList[index].quantity * newItemsList[index].price;
//     }

//     setItemsList(newItemsList);

//     // Calculate total item amount
//     const totalItemAmount = newItemsList.reduce(
//       (total, item) => total + item.amount,
//       0
//     );
//     setFormData({ ...formData, itemsList: newItemsList, totalItemAmount });
//   };

//   // Function to add a new item row
//   const addItemRow = () => {
//     setItemsList([
//       ...itemsList,
//       { item: "", quantity: "", unit: "", price: "", amount: 0 },
//     ]);
//   };

//   // Function to delete an item row
//   const deleteItemRow = (index) => {
//     const newItemsList = [...itemsList];
//     newItemsList.splice(index, 1);
//     setItemsList(newItemsList);

//     // Recalculate total item amount after deletion
//     const totalItemAmount = newItemsList.reduce(
//       (total, item) => total + item.amount,
//       0
//     );
//     setFormData({ ...formData, itemsList: newItemsList, totalItemAmount });
//   };

//   // Fetch accounts
//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         const response = await api.get("/api/accounts");
//         setAccounts(response.data);
//       } catch (error) {
//         toast.error("Failed to fetch accounts.");
//       }
//     };
//     fetchAccounts();
//   }, []);

//   // Fetch items
//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await api.get("/api/jewelry-items");
//         setItems(response.data);
//       } catch (error) {
//         toast.error("Failed to fetch items.");
//       }
//     };
//     fetchItems();
//   }, []);

//   // Fetch item data based on buyer's rate type
//   const fetchItemData = async (itemId, rateType) => {
//     try {
//       const response = await api.get(`/api/jewelry-items/${itemId}`);
//       const {
//         _id,
//         unit,
//         retailerPrice,
//         semiWholesellerPrice,
//         wholesellerPrice,
//       } = response.data;

//       const price =
//         rateType === "Retailer"
//           ? retailerPrice
//           : rateType === "Semi Wholeseller"
//           ? semiWholesellerPrice
//           : wholesellerPrice;

//       return { _id, unit, price };
//     } catch (error) {
//       console.error("Error fetching item data:", error);
//       return { _id: itemId, unit: "", price: 0 }; // Fallback
//     }
//   };

//   // Handle buyer selection
//   const handleBuyerSelect = async (value) => {
//     if (value) {
//       setFormData({
//         ...formData,
//         buyerName: value.name,
//         accountId: value._id,
//         buyerRateType: value.rateType, // Set the rate type from the account
//       });
//     }
//   };

//   // Handle item selection
//   const handleItemSelect = async (index, selectedItem) => {
//     const newItemsList = [...itemsList];
//     if (selectedItem) {
//       const { price, unit } = await fetchItemData(
//         selectedItem._id,
//         formData.buyerRateType
//       );
//       newItemsList[index] = {
//         ...newItemsList[index],
//         item: selectedItem._id,
//         unit: unit,
//         price: price,
//         amount: 0, // Reset amount when item changes
//       };
//       setItemsList(newItemsList);
//     }
//   };

//   const [showTransportDetails, setShowTransportDetails] = useState(false);
//   const [transportDetails, setTransportDetails] = useState({
//     transportName: "",
//     vehicleNo: "",
//     date: new Date().toISOString().split("T")[0],
//     stationFrom: "",
//     stationTo: "",
//   });
//   const handleTransportDetailChange = (e) => {
//     const { name, value } = e.target;
//     setTransportDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleCheckboxChange = (e) => {
//     setShowTransportDetails(e.target.checked);
//   };

//   return (
//     <div>
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-xl-12 ">
//             <Box sx={{ display: "flex" }}>
//               <CssBaseline />
//               <Header />
//               <Box component="main" sx={{ flexGrow: 1 }}>
//                 <DrawerHeader />
//                 <div className="container-fluid">
//                   <div className="row">
//                     <div className="col-xl-12">
//                       <div className="row d-flex justify-content-between">
//                         <div className="col-xl-12">
//                           <h4 className="fw-bold text-center">
//                             Add Sales Voucher
//                           </h4>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-xl-12">
//                       <Box component="form" onSubmit={handleSubmit}>
//                         <ToastContainer />
//                         <div className="row">
//                           <div className="col-xl-12 mx-auto p-2">
//                             <div className="row">
//                               <div
//                                 className="row mx-auto d-flex p-3"
//                                 style={{
//                                   border: "1px solid lightgray",
//                                   borderRadius: "5px",
//                                 }}
//                               >
//                                 <div className="row">
//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <Autocomplete
//                                         options={accounts}
//                                         getOptionLabel={(option) => option.name}
//                                         onChange={(event, value) =>
//                                           handleBuyerSelect(value)
//                                         }
//                                         renderInput={(params) => (
//                                           <TextField
//                                             {...params}
//                                             label="Buyer Name"
//                                             size="small"
//                                             variant="outlined"
//                                           />
//                                         )}
//                                       />
//                                     </FormControl>
//                                   </div>
//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <TextField
//                                         label="Sale Date"
//                                         name="saleDate"
//                                         type="date"
//                                         value={formData.saleDate}
//                                         onChange={handleInputChange}
//                                         size="small"
//                                         InputLabelProps={{ shrink: true }}
//                                         required
//                                       />
//                                     </FormControl>
//                                   </div>
//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <TextField
//                                         label="Sale Voucher No"
//                                         name="saleVoucherNo"
//                                         value={formData.saleVoucherNo}
//                                         onChange={handleInputChange}
//                                         size="small"
//                                         InputLabelProps={{ shrink: true }}
//                                         required
//                                       />
//                                     </FormControl>
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <TextField
//                                         label="Seller Voucher No"
//                                         name="sellerVoucherNo"
//                                         value={formData.sellerVoucherNo}
//                                         onChange={handleInputChange}
//                                         size="small"
//                                         InputLabelProps={{ shrink: true }}
//                                         required
//                                       />
//                                     </FormControl>
//                                   </div>
//                                 </div>
//                                 <div className="row">
//                                   <div className="col-xl-12 d-flex justify-content-end mt-2">
//                                     <Button
//                                       type="button"
//                                       variant="contained"
//                                       color="secondary"
//                                       onClick={addItemRow}
//                                       className="me-2"
//                                       size="small"
//                                     >
//                                       Add Item
//                                     </Button>
//                                   </div>
//                                   <div className="col-xl-12 mt-2">
//                                     <TableContainer
//                                       component={Paper}
//                                       sx={{ maxHeight: 300 }}
//                                     >
//                                       <Table>
//                                         <TableHead
//                                           style={{ background: "#bbdefb" }}
//                                         >
//                                           <TableRow>
//                                             <TableCell
//                                               sx={{
//                                                 border: "1px solid lightgray",
//                                                 padding: "4px",
//                                                 background: "#bbdefb",
//                                               }}
//                                               className="p-0 fw-bold"
//                                               align="center"
//                                             >
//                                               #
//                                             </TableCell>
//                                             <TableCell
//                                               sx={{
//                                                 border: "1px solid lightgray",
//                                                 padding: "4px",
//                                                 background: "#bbdefb",
//                                               }}
//                                               className="p-0 fw-bold"
//                                               align="center"
//                                             >
//                                               Item
//                                             </TableCell>
//                                             <TableCell
//                                               sx={{
//                                                 border: "1px solid lightgray",
//                                                 padding: "4px",
//                                                 background: "#bbdefb",
//                                               }}
//                                               className="p-0 fw-bold"
//                                               align="center"
//                                             >
//                                               Quantity
//                                             </TableCell>
//                                             <TableCell
//                                               sx={{
//                                                 border: "1px solid lightgray",
//                                                 padding: "4px",
//                                                 background: "#bbdefb",
//                                               }}
//                                               className="p-0 fw-bold"
//                                               align="center"
//                                             >
//                                               Unit
//                                             </TableCell>
//                                             <TableCell
//                                               sx={{
//                                                 border: "1px solid lightgray",
//                                                 padding: "4px",
//                                                 background: "#bbdefb",
//                                               }}
//                                               className="p-0 fw-bold"
//                                               align="center"
//                                             >
//                                               Price(Rs.)
//                                             </TableCell>
//                                             <TableCell
//                                               sx={{
//                                                 border: "1px solid lightgray",
//                                                 padding: "4px",
//                                                 background: "#bbdefb",
//                                               }}
//                                               className="p-0 fw-bold"
//                                               align="center"
//                                             >
//                                               Amount(Rs.)
//                                             </TableCell>
//                                             <TableCell
//                                               sx={{
//                                                 border: "1px solid lightgray",
//                                                 padding: "4px",
//                                                 background: "#bbdefb",
//                                               }}
//                                               className="p-0 fw-bold"
//                                               align="center"
//                                             >
//                                               Actions
//                                             </TableCell>
//                                           </TableRow>
//                                         </TableHead>

//                                         <TableBody
//                                           sx={{
//                                             background: "white",
//                                             overflowY: "auto",
//                                           }}
//                                         >
//                                           {itemsList.map((item, index) => (
//                                             <TableRow key={index}>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "0px",
//                                                 }}
//                                                 align="center"
//                                               >
//                                                 <span className="ps-2 pe-2 pt-0 pb-0">
//                                                   {index + 1}
//                                                 </span>
//                                               </TableCell>

//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "0px",
//                                                   width: "300px",
//                                                 }}
//                                                 align="center"
//                                               >
//                                                 <FormControl fullWidth>
//                                                   <Autocomplete
//                                                     options={items}
//                                                     getOptionLabel={(option) =>
//                                                       option.name
//                                                     }
//                                                     onChange={(event, value) =>
//                                                       handleItemSelect(
//                                                         index,
//                                                         value
//                                                       )
//                                                     }
//                                                     renderInput={(params) => (
//                                                       <TextField
//                                                         {...params}
//                                                         label=""
//                                                         size="small"
//                                                         variant="standard"
//                                                         required
//                                                       />
//                                                     )}
//                                                   />
//                                                 </FormControl>
//                                               </TableCell>

//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "0px",
//                                                 }}
//                                                 align="center"
//                                               >
//                                                 <TextField
//                                                   name="quantity"
//                                                   value={item.quantity}
//                                                   onChange={(e) =>
//                                                     handleItemChange(index, e)
//                                                   }
//                                                   size="small"
//                                                   variant="standard"
//                                                   required
//                                                 />
//                                               </TableCell>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "0px",
//                                                 }}
//                                                 align="center"
//                                               >
//                                                 <TextField
//                                                   name=""
//                                                   value={item.unit.name}
//                                                   onChange={(e) =>
//                                                     handleItemChange(index, e)
//                                                   }
//                                                   size="small"
//                                                   variant="standard"
//                                                   InputProps={{
//                                                     readOnly: true,
//                                                   }}
//                                                   required
//                                                 />
//                                               </TableCell>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "0px",
//                                                 }}
//                                                 align="center"
//                                               >
//                                                 <TextField
//                                                   name=""
//                                                   value={item.price}
//                                                   onChange={(e) =>
//                                                     handleItemChange(index, e)
//                                                   }
//                                                   size="small"
//                                                   variant="standard"
//                                                   required
//                                                 />
//                                               </TableCell>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "0px",
//                                                 }}
//                                                 align="center"
//                                               >
//                                                 {item.amount.toFixed(2)}
//                                               </TableCell>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "0px",
//                                                 }}
//                                                 align="center"
//                                               >
//                                                 <Button
//                                                   onClick={() =>
//                                                     deleteItemRow(index)
//                                                   }
//                                                   color="error"
//                                                 >
//                                                   <CancelIcon />
//                                                 </Button>
//                                               </TableCell>
//                                             </TableRow>
//                                           ))}
//                                         </TableBody>
//                                       </Table>
//                                     </TableContainer>
//                                     <h5
//                                       gutterBottom
//                                       className="text-end me-2 mt-2"
//                                     >
//                                       <span
//                                         className=" me-2"
//                                         style={{ fontSize: "17px" }}
//                                       >
//                                         Item Amount:
//                                         <span>
//                                           <CurrencyRupeeIcon
//                                             style={{ fontSize: "18px" }}
//                                           />
//                                         </span>
//                                         <span className="fw-bold">
//                                           {formData.totalItemAmount.toFixed(2)}
//                                         </span>
//                                       </span>
//                                     </h5>

//                                     {/* Bill sundry Start */}

//                                     <div className="row mt-3 d justify-content-end">
//                                       <div className="col-xl-6 mt-1 ">
//                                         <TableContainer
//                                           component={Paper}
//                                           sx={{ maxHeight: 320 }}
//                                         >
//                                           <Table>
//                                             <TableHead>
//                                               <TableRow>
//                                                 <TableCell
//                                                   align="center"
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "4px",
//                                                     background: "#bbdefb",
//                                                   }}
//                                                   className="p-0 fw-bold fixed"
//                                                 >
//                                                   No.
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "4px",
//                                                     background: "#bbdefb",
//                                                   }}
//                                                   className="p-0 fw-bold fixed"
//                                                   align="center"
//                                                 >
//                                                   Packeging Charge
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "4px",
//                                                     background: "#bbdefb",
//                                                   }}
//                                                   className="p-0 fw-bold fixed"
//                                                   align="center"
//                                                 >
//                                                   GST
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "4px",
//                                                     background: "#bbdefb",
//                                                   }}
//                                                   className="p-0 fw-bold fixed"
//                                                   align="center"
//                                                 >
//                                                   Other Expenses
//                                                 </TableCell>
//                                               </TableRow>
//                                             </TableHead>
//                                             <TableBody
//                                               sx={{
//                                                 background: "white",
//                                                 overflowY: "auto",
//                                               }}
//                                             >
//                                               <TableRow>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "0px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <span className="ps-2 pe-2"></span>
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "0px",
//                                                     width: "200px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <TextField
//                                                     name="packingCharges"
//                                                     value={
//                                                       formData.packingCharges
//                                                     }
//                                                     onChange={handleInputChange}
//                                                     size="small"
//                                                     fullWidth
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment
//                                                           position="start"
//                                                           style={{
//                                                             marginRight: "-1px",
//                                                             marginBottom: "3px",
//                                                           }}
//                                                         >
//                                                           <CurrencyRupeeIcon
//                                                             style={{
//                                                               fontSize: "15px",
//                                                             }}
//                                                           />
//                                                         </InputAdornment>
//                                                       ),
//                                                     }}
//                                                   />
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "0px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <TextField
//                                                     label=""
//                                                     name="gstExpenses"
//                                                     value={formData.gstExpenses}
//                                                     onChange={handleInputChange}
//                                                     fullWidth
//                                                     size="small"
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment
//                                                           position="start"
//                                                           style={{
//                                                             marginRight: "-1px",
//                                                             marginBottom: "3px",
//                                                           }}
//                                                         >
//                                                           <CurrencyRupeeIcon
//                                                             style={{
//                                                               fontSize: "15px",
//                                                             }}
//                                                           />
//                                                         </InputAdornment>
//                                                       ),
//                                                     }}
//                                                   />
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "0px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <TextField
//                                                     name="otherExpenses"
//                                                     value={
//                                                       formData.otherExpenses
//                                                     }
//                                                     onChange={handleInputChange}
//                                                     size="small"
//                                                     fullWidth
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment
//                                                           position="start"
//                                                           style={{
//                                                             marginRight: "-1px",
//                                                             marginBottom: "3px",
//                                                           }}
//                                                         >
//                                                           <CurrencyRupeeIcon
//                                                             style={{
//                                                               fontSize: "15px",
//                                                             }}
//                                                           />
//                                                         </InputAdornment>
//                                                       ),
//                                                     }}
//                                                   />
//                                                 </TableCell>
//                                               </TableRow>
//                                             </TableBody>
//                                           </Table>
//                                         </TableContainer>

//                                         <h5 className="text-end me-2 mt-2">
//                                           <span
//                                             className="fw-bold me-2"
//                                             style={{ fontSize: "15px" }}
//                                           >
//                                             Bill Sundry Amount:
//                                             <CurrencyRupeeIcon
//                                               style={{ fontSize: "15px" }}
//                                             />
//                                             {formData.billSundryAmount.toFixed(
//                                               2
//                                             )}
//                                           </span>
//                                         </h5>

//                                         <h5 className="text-end me-2 mt-2">
//                                           <span
//                                             className="fw-bold me-2"
//                                             style={{ fontSize: "15px" }}
//                                           >
//                                             Total Amount:
//                                             <CurrencyRupeeIcon
//                                               style={{ fontSize: "15px" }}
//                                             />
//                                             {formData.totalAmount.toFixed(2)}
//                                           </span>
//                                         </h5>
//                                       </div>
//                                     </div>

//                                     {/* Bill sundry End */}

//                                     {/* Transport Detail Start */}
//                                     <div className="row">
//                                       <div className="col-xl-12">
//                                         <div>
//                                           <FormControlLabel
//                                             control={
//                                               <Checkbox
//                                                 checked={showTransportDetails}
//                                                 onChange={handleCheckboxChange}
//                                               />
//                                             }
//                                             label="Add Transport Details"
//                                           />
//                                           {showTransportDetails && (
//                                             <TableContainer
//                                               component={Paper}
//                                               sx={{
//                                                 maxHeight: 320,
//                                                 marginTop: 2,
//                                               }}
//                                             >
//                                               <Table>
//                                                 <TableHead>
//                                                   <TableRow>
//                                                     <TableCell
//                                                       align="center"
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "4px",
//                                                         background: "#bbdefb",
//                                                       }}
//                                                       className="p-0 fw-bold fixed"
//                                                     >
//                                                       Transport Name
//                                                     </TableCell>
//                                                     <TableCell
//                                                       align="center"
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "4px",
//                                                         background: "#bbdefb",
//                                                       }}
//                                                       className="p-0 fw-bold fixed"
//                                                     >
//                                                       Vehicle No.
//                                                     </TableCell>
//                                                     <TableCell
//                                                       align="center"
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "4px",
//                                                         background: "#bbdefb",
//                                                       }}
//                                                       className="p-0 fw-bold fixed"
//                                                     >
//                                                       Date
//                                                     </TableCell>
//                                                     <TableCell
//                                                       align="center"
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "4px",
//                                                         background: "#bbdefb",
//                                                       }}
//                                                       className="p-0 fw-bold fixed"
//                                                     >
//                                                       Station From
//                                                     </TableCell>
//                                                     <TableCell
//                                                       align="center"
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "4px",
//                                                         background: "#bbdefb",
//                                                       }}
//                                                       className="p-0 fw-bold fixed"
//                                                     >
//                                                       Station To
//                                                     </TableCell>
//                                                   </TableRow>
//                                                 </TableHead>
//                                                 <TableBody
//                                                   sx={{
//                                                     background: "white",
//                                                     overflowY: "auto",
//                                                   }}
//                                                 >
//                                                   <TableRow>
//                                                     <TableCell
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "0px",
//                                                       }}
//                                                       align="center"
//                                                     >
//                                                       <TextField
//                                                         name="transportName"
//                                                         type="text"
//                                                         value={
//                                                           transportDetails.transportName
//                                                         }
//                                                         onChange={
//                                                           handleTransportDetailChange
//                                                         }
//                                                         size="small"
//                                                         variant="standard"
//                                                       />
//                                                     </TableCell>
//                                                     <TableCell
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "0px",
//                                                       }}
//                                                       align="center"
//                                                     >
//                                                       <TextField
//                                                         name="vehicleNo"
//                                                         type="text"
//                                                         value={
//                                                           transportDetails.vehicleNo
//                                                         }
//                                                         onChange={
//                                                           handleTransportDetailChange
//                                                         }
//                                                         size="small"
//                                                         variant="standard"
//                                                       />
//                                                     </TableCell>
//                                                     <TableCell
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "0px",
//                                                       }}
//                                                       align="center"
//                                                     >
//                                                       <TextField
//                                                         name="date"
//                                                         type="date"
//                                                         value={
//                                                           transportDetails.date
//                                                         }
//                                                         onChange={
//                                                           handleTransportDetailChange
//                                                         }
//                                                         size="small"
//                                                         variant="standard"
//                                                       />
//                                                     </TableCell>
//                                                     <TableCell
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "0px",
//                                                       }}
//                                                       align="center"
//                                                     >
//                                                       <TextField
//                                                         name="stationFrom"
//                                                         type="text"
//                                                         value={
//                                                           transportDetails.stationFrom
//                                                         }
//                                                         onChange={
//                                                           handleTransportDetailChange
//                                                         }
//                                                         size="small"
//                                                         variant="standard"
//                                                       />
//                                                     </TableCell>
//                                                     <TableCell
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "0px",
//                                                       }}
//                                                       align="center"
//                                                     >
//                                                       <TextField
//                                                         name="stationTo"
//                                                         type="text"
//                                                         value={
//                                                           transportDetails.stationTo
//                                                         }
//                                                         onChange={
//                                                           handleTransportDetailChange
//                                                         }
//                                                         size="small"
//                                                         variant="standard"
//                                                       />
//                                                     </TableCell>
//                                                   </TableRow>
//                                                 </TableBody>
//                                               </Table>
//                                             </TableContainer>
//                                           )}
//                                         </div>
//                                       </div>
//                                     </div>
//                                     {/* Transport Detail End */}

//                                     <div className="row mt-3">
//                                       <div className="col-xl-12">
//                                         <Button
//                                           type="submit"
//                                           variant="contained"
//                                           color="primary"
//                                           className="fw-bold"
//                                         >
//                                           Save
//                                         </Button>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
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
//       <ToastContainer />
//     </div>
//   );
// }

//====================== I am Working On it =======================//

// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   TextField,
//   Stack,
//   Grid,
//   Button,
//   FormControl,
//   Paper,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CssBaseline,
//   Autocomplete,
//   Checkbox,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import Header from "../../../schema/Header";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import axios from "axios";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import { styled } from "@mui/material/styles";
// import InputAdornment from "@mui/material/InputAdornment";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import CancelIcon from "@mui/icons-material/Cancel";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import api from "../../../../services/api";

// const breadcrumbs = [
//   <Link key="1" to="/purchase_voucher_list">
//     Purchase Voucher
//   </Link>,
//   <Typography key="3" color="text.secondary">
//     Add Purchase Voucher
//   </Typography>,
// ];

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// export default function AddSalesVoucher() {
//   const [formData, setFormData] = useState({
//     buyerName: "",
//     saleDate: new Date().toISOString().split("T")[0],
//     saleVoucherNo: "",
//     sellerVoucherNo: "",
//     itemsList: [],
//     packingCharges: 0,
//     gstExpenses: 0,
//     otherExpenses: 0,
//     totalItemAmount: 0,
//     billSundryAmount: 0,
//     totalAmount: 0,
//     accountId: "",
//     buyerRateType: "", // To store the rate type
//   });

//   const [itemsList, setItemsList] = useState([
//     { item: "", quantity: "", unit: "", price: "", amount: 0 },
//   ]);
//   const [accounts, setAccounts] = useState([]);
//   const [items, setItems] = useState([]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     // Handle date value
//     if (name === "saleDate") {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//       return;
//     }

//     const updatedValue = parseFloat(value) || 0; // Ensure value is a number
//     let updatedFormData = { ...formData, [name]: updatedValue };

//     if (name === "gstExpenses") {
//       const gstAmount = (formData.totalItemAmount * updatedValue) / 100;
//       updatedFormData = { ...updatedFormData, gstAmount };
//     }

//     const billSundryAmount =
//       updatedFormData.packingCharges +
//       (updatedFormData.gstAmount || updatedFormData.gstExpenses) +
//       updatedFormData.otherExpenses;
//     const totalAmount = updatedFormData.totalItemAmount + billSundryAmount;

//     setFormData({
//       ...updatedFormData,
//       billSundryAmount,
//       totalAmount,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.buyerName) {
//       toast.error("Please select a buyer name.");
//       return;
//     }

//     console.log("Form data before submission:", formData);

//     const finalFormData = {
//       ...formData,
//       itemsList: itemsList.map((item) => ({
//         item: item.item, // Ensure this is set to the ObjectId
//         quantity: item.quantity,
//         unit: item.unit,
//         price: item.price,
//         amount: item.amount,
//       })),
//       transportDetails: showTransportDetails ? transportDetails : {},
//     };

//     console.log("Final form data being sent:", finalFormData);

//     try {
//       const response = await api.post("/api/sale-vouchers/add", finalFormData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.status === 201 || response.status === 200) {
//         toast.success("Sales Voucher Added Successfully!");
//         resetForm(); // Reset the form on success
//       } else {
//         toast.error("Failed to add Sales Voucher.");
//       }
//     } catch (error) {
//       console.error(
//         "Error during submission:",
//         error.response?.data || error.message
//       );
//       toast.error(
//         "An error occurred while submitting the form. Please try again."
//       );
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       buyerName: "",
//       saleDate: new Date().toISOString().split("T")[0],
//       saleVoucherNo: "",
//       sellerVoucherNo: "",
//       itemsList: [],
//       packingCharges: 0,
//       gstExpenses: 0,
//       otherExpenses: 0,
//       totalItemAmount: 0,
//       billSundryAmount: 0,
//       totalAmount: 0,
//       accountId: "",
//       buyerRateType: "",
//     });

//     setItemsList([{ item: "", quantity: "", unit: "", price: "", amount: 0 }]);

//     setTransportDetails({
//       builtNumber: "",
//       transporter: "",
//       date: "",
//       lotSize: "",
//       lotOpen: "",
//       lotPending: "",
//     });

//     setShowTransportDetails(false);
//   };

//   // Function to handle item list changes
//   const handleItemChange = (index, e) => {
//     const { name, value } = e.target;
//     const newItemsList = [...itemsList];
//     newItemsList[index][name] = value;

//     // Calculate amount for each item
//     if (name === "quantity" || name === "price") {
//       newItemsList[index].amount =
//         newItemsList[index].quantity * newItemsList[index].price;
//     }

//     setItemsList(newItemsList);

//     // Calculate total item amount
//     const totalItemAmount = newItemsList.reduce(
//       (total, item) => total + item.amount,
//       0
//     );
//     setFormData({ ...formData, itemsList: newItemsList, totalItemAmount });
//   };

//   // Function to add a new item row
//   const addItemRow = () => {
//     setItemsList([
//       ...itemsList,
//       { item: "", quantity: "", unit: "", price: "", amount: 0 },
//     ]);
//   };

//   // Function to delete an item row
//   const deleteItemRow = (index) => {
//     const newItemsList = [...itemsList];
//     newItemsList.splice(index, 1);
//     setItemsList(newItemsList);

//     // Recalculate total item amount after deletion
//     const totalItemAmount = newItemsList.reduce(
//       (total, item) => total + item.amount,
//       0
//     );
//     setFormData({ ...formData, itemsList: newItemsList, totalItemAmount });
//   };

//   // Fetch accounts
//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         const response = await api.get("/api/accounts");
//         setAccounts(response.data);
//       } catch (error) {
//         toast.error("Failed to fetch accounts.");
//       }
//     };
//     fetchAccounts();
//   }, []);

//   // Fetch items
//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await api.get("/api/jewelry-items");
//         setItems(response.data);
//       } catch (error) {
//         toast.error("Failed to fetch items.");
//       }
//     };
//     fetchItems();
//   }, []);

//   // Fetch item data based on buyer's rate type
//   const fetchItemData = async (itemId, rateType) => {
//     try {
//       const response = await api.get(`/api/jewelry-items/${itemId}`);
//       const {
//         _id,
//         unit,
//         retailerPrice,
//         semiWholesellerPrice,
//         wholesellerPrice,
//       } = response.data;

//       const price =
//         rateType === "Retailer"
//           ? retailerPrice
//           : rateType === "Semi Wholeseller"
//           ? semiWholesellerPrice
//           : wholesellerPrice;

//       return { _id, unit, price };
//     } catch (error) {
//       console.error("Error fetching item data:", error);
//       return { _id: itemId, unit: "", price: 0 }; // Fallback
//     }
//   };

//   // Handle buyer selection
//   const handleBuyerSelect = async (value) => {
//     if (value) {
//       setFormData({
//         ...formData,
//         buyerName: value.name,
//         accountId: value._id,
//         buyerRateType: value.rateType, // Set the rate type from the account
//       });
//     }
//   };

//   // Handle item selection
//   const handleItemSelect = async (index, selectedItem) => {
//     const newItemsList = [...itemsList];
//     if (selectedItem) {
//       const { price, unit } = await fetchItemData(
//         selectedItem._id,
//         formData.buyerRateType
//       );
//       newItemsList[index] = {
//         ...newItemsList[index],
//         item: selectedItem._id,
//         unit: unit,
//         price: price,
//         amount: 0, // Reset amount when item changes
//       };
//       setItemsList(newItemsList);
//     }
//   };

//   const [showTransportDetails, setShowTransportDetails] = useState(false);
//   const [transportDetails, setTransportDetails] = useState({
//     builtNumber: "",
//     transporter: "",
//     date: "",
//     lotSize: "",
//     lotOpen: "",
//     lotPending: "",
//   });
//   const handleTransportDetailChange = (e) => {
//     const { name, value } = e.target;
//     setTransportDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleCheckboxChange = (e) => {
//     setShowTransportDetails(e.target.checked);
//   };

//   return (
//     <div>
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-xl-12 ">
//             <Box sx={{ display: "flex" }}>
//               <CssBaseline />
//               <Header />
//               <Box component="main" sx={{ flexGrow: 1 }}>
//                 <DrawerHeader />
//                 <div className="container-fluid">
//                   <div className="row">
//                     <div className="col-xl-12">
//                       <div className="row d-flex justify-content-between">
//                         <div className="col-xl-12">
//                           <h4 className="fw-bold text-center">
//                             Add Sales Voucher
//                           </h4>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-xl-12">
//                       <Box component="form" onSubmit={handleSubmit}>
//                         <div className="row">
//                           <div className="col-xl-12 mx-auto p-2">
//                             <div className="row">
//                               <div
//                                 className="row mx-auto d-flex p-3"
//                                 style={{
//                                   border: "1px solid lightgray",
//                                   borderRadius: "5px",
//                                 }}
//                               >
//                                 <div className="row">
//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <Autocomplete
//                                         options={accounts}
//                                         getOptionLabel={(option) => option.name}
//                                         onChange={(event, value) =>
//                                           handleBuyerSelect(value)
//                                         }
//                                         renderInput={(params) => (
//                                           <TextField
//                                             {...params}
//                                             label="Buyer Name"
//                                             size="small"
//                                             variant="outlined"
//                                           />
//                                         )}
//                                       />
//                                     </FormControl>
//                                   </div>
//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <TextField
//                                         label="Sale Date"
//                                         name="saleDate"
//                                         type="date"
//                                         value={formData.saleDate}
//                                         onChange={handleInputChange}
//                                         size="small"
//                                         InputLabelProps={{ shrink: true }}
//                                         required
//                                       />
//                                     </FormControl>
//                                   </div>
//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <TextField
//                                         label="Sale Voucher No"
//                                         name="saleVoucherNo"
//                                         value={formData.saleVoucherNo}
//                                         onChange={handleInputChange}
//                                         size="small"
//                                         InputLabelProps={{ shrink: true }}
//                                         required
//                                       />
//                                     </FormControl>
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <TextField
//                                         label="Seller Voucher No"
//                                         name="sellerVoucherNo"
//                                         value={formData.sellerVoucherNo}
//                                         onChange={handleInputChange}
//                                         size="small"
//                                         InputLabelProps={{ shrink: true }}
//                                         required
//                                       />
//                                     </FormControl>
//                                   </div>
//                                 </div>
//                                 <div className="row">
//                                   <div className="col-xl-12 d-flex justify-content-end mt-2">
//                                     <Button
//                                       type="button"
//                                       variant="contained"
//                                       color="secondary"
//                                       onClick={addItemRow}
//                                       className="me-2"
//                                       size="small"
//                                     >
//                                       Add Item
//                                     </Button>
//                                   </div>
//                                   <div className="col-xl-12 mt-2">
//                                     <TableContainer
//                                       component={Paper}
//                                       sx={{ maxHeight: 300 }}
//                                     >
//                                       <Table>
//                                         <TableHead
//                                           style={{ background: "#bbdefb" }}
//                                         >
//                                           <TableRow>
//                                             <TableCell
//                                               sx={{
//                                                 border: "1px solid lightgray",
//                                                 padding: "4px",
//                                                 background: "#bbdefb",
//                                               }}
//                                               className="p-0 fw-bold"
//                                               align="center"
//                                             >
//                                               #
//                                             </TableCell>
//                                             <TableCell
//                                               sx={{
//                                                 border: "1px solid lightgray",
//                                                 padding: "4px",
//                                                 background: "#bbdefb",
//                                               }}
//                                               className="p-0 fw-bold"
//                                               align="center"
//                                             >
//                                               Item
//                                             </TableCell>
//                                             <TableCell
//                                               sx={{
//                                                 border: "1px solid lightgray",
//                                                 padding: "4px",
//                                                 background: "#bbdefb",
//                                               }}
//                                               className="p-0 fw-bold"
//                                               align="center"
//                                             >
//                                               Quantity
//                                             </TableCell>
//                                             <TableCell
//                                               sx={{
//                                                 border: "1px solid lightgray",
//                                                 padding: "4px",
//                                                 background: "#bbdefb",
//                                               }}
//                                               className="p-0 fw-bold"
//                                               align="center"
//                                             >
//                                               Unit
//                                             </TableCell>
//                                             <TableCell
//                                               sx={{
//                                                 border: "1px solid lightgray",
//                                                 padding: "4px",
//                                                 background: "#bbdefb",
//                                               }}
//                                               className="p-0 fw-bold"
//                                               align="center"
//                                             >
//                                               Price(Rs.)
//                                             </TableCell>
//                                             <TableCell
//                                               sx={{
//                                                 border: "1px solid lightgray",
//                                                 padding: "4px",
//                                                 background: "#bbdefb",
//                                               }}
//                                               className="p-0 fw-bold"
//                                               align="center"
//                                             >
//                                               Amount(Rs.)
//                                             </TableCell>
//                                             <TableCell
//                                               sx={{
//                                                 border: "1px solid lightgray",
//                                                 padding: "4px",
//                                                 background: "#bbdefb",
//                                               }}
//                                               className="p-0 fw-bold"
//                                               align="center"
//                                             >
//                                               Actions
//                                             </TableCell>
//                                           </TableRow>
//                                         </TableHead>

//                                         <TableBody
//                                           sx={{
//                                             background: "white",
//                                             overflowY: "auto",
//                                           }}
//                                         >
//                                           {itemsList.map((item, index) => (
//                                             <TableRow key={index}>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "0px",
//                                                 }}
//                                                 align="center"
//                                               >
//                                                 <span className="ps-2 pe-2 pt-0 pb-0">
//                                                   {index + 1}
//                                                 </span>
//                                               </TableCell>

//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "0px",
//                                                   width: "300px",
//                                                 }}
//                                                 align="center"
//                                               >
//                                                 <FormControl fullWidth>
//                                                   <Autocomplete
//                                                     options={items}
//                                                     getOptionLabel={(option) =>
//                                                       option.name
//                                                     }
//                                                     onChange={(event, value) =>
//                                                       handleItemSelect(
//                                                         index,
//                                                         value
//                                                       )
//                                                     }
//                                                     renderInput={(params) => (
//                                                       <TextField
//                                                         {...params}
//                                                         label=""
//                                                         size="small"
//                                                         variant="standard"
//                                                         required
//                                                       />
//                                                     )}
//                                                   />
//                                                 </FormControl>
//                                               </TableCell>

//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "0px",
//                                                 }}
//                                                 align="center"
//                                               >
//                                                 <TextField
//                                                   name="quantity"
//                                                   value={item.quantity}
//                                                   onChange={(e) =>
//                                                     handleItemChange(index, e)
//                                                   }
//                                                   size="small"
//                                                   variant="standard"
//                                                   required
//                                                 />
//                                               </TableCell>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "0px",
//                                                 }}
//                                                 align="center"
//                                               >
//                                                 <TextField
//                                                   name=""
//                                                   value={item.unit.name}
//                                                   onChange={(e) =>
//                                                     handleItemChange(index, e)
//                                                   }
//                                                   size="small"
//                                                   variant="standard"
//                                                   InputProps={{
//                                                     readOnly: true,
//                                                   }}
//                                                   required
//                                                 />
//                                               </TableCell>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "0px",
//                                                 }}
//                                                 align="center"
//                                               >
//                                                 <TextField
//                                                   name=""
//                                                   value={item.price}
//                                                   onChange={(e) =>
//                                                     handleItemChange(index, e)
//                                                   }
//                                                   size="small"
//                                                   variant="standard"
//                                                   required
//                                                 />
//                                               </TableCell>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "0px",
//                                                 }}
//                                                 align="center"
//                                               >
//                                                 {item.amount.toFixed(2)}
//                                               </TableCell>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "0px",
//                                                 }}
//                                                 align="center"
//                                               >
//                                                 <Button
//                                                   onClick={() =>
//                                                     deleteItemRow(index)
//                                                   }
//                                                   color="error"
//                                                 >
//                                                   <CancelIcon />
//                                                 </Button>
//                                               </TableCell>
//                                             </TableRow>
//                                           ))}
//                                         </TableBody>
//                                       </Table>
//                                     </TableContainer>
//                                     <h5
//                                       gutterBottom
//                                       className="text-end me-2 mt-2"
//                                     >
//                                       <span
//                                         className=" me-2"
//                                         style={{ fontSize: "17px" }}
//                                       >
//                                         Item Amount:
//                                         <span>
//                                           <CurrencyRupeeIcon
//                                             style={{ fontSize: "18px" }}
//                                           />
//                                         </span>
//                                         <span className="fw-bold">
//                                           {formData.totalItemAmount.toFixed(2)}
//                                         </span>
//                                       </span>
//                                     </h5>

//                                     {/* Bill sundry Start */}

//                                     <div className="row mt-3 d justify-content-end">
//                                       <div className="col-xl-6 mt-1 ">
//                                         <TableContainer
//                                           component={Paper}
//                                           sx={{ maxHeight: 320 }}
//                                         >
//                                           <Table>
//                                             <TableHead>
//                                               <TableRow>
//                                                 <TableCell
//                                                   align="center"
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "4px",
//                                                     background: "#bbdefb",
//                                                   }}
//                                                   className="p-0 fw-bold fixed"
//                                                 >
//                                                   No.
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "4px",
//                                                     background: "#bbdefb",
//                                                   }}
//                                                   className="p-0 fw-bold fixed"
//                                                   align="center"
//                                                 >
//                                                   Packeging Charge
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "4px",
//                                                     background: "#bbdefb",
//                                                   }}
//                                                   className="p-0 fw-bold fixed"
//                                                   align="center"
//                                                 >
//                                                   GST
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "4px",
//                                                     background: "#bbdefb",
//                                                   }}
//                                                   className="p-0 fw-bold fixed"
//                                                   align="center"
//                                                 >
//                                                   Other Expenses
//                                                 </TableCell>
//                                               </TableRow>
//                                             </TableHead>
//                                             <TableBody
//                                               sx={{
//                                                 background: "white",
//                                                 overflowY: "auto",
//                                               }}
//                                             >
//                                               <TableRow>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "0px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <span className="ps-2 pe-2"></span>
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "0px",
//                                                     width: "200px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <TextField
//                                                     name="packingCharges"
//                                                     value={
//                                                       formData.packingCharges
//                                                     }
//                                                     onChange={handleInputChange}
//                                                     size="small"
//                                                     fullWidth
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment
//                                                           position="start"
//                                                           style={{
//                                                             marginRight: "-1px",
//                                                             marginBottom: "3px",
//                                                           }}
//                                                         >
//                                                           <CurrencyRupeeIcon
//                                                             style={{
//                                                               fontSize: "15px",
//                                                             }}
//                                                           />
//                                                         </InputAdornment>
//                                                       ),
//                                                     }}
//                                                   />
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "0px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <TextField
//                                                     label=""
//                                                     name="gstExpenses"
//                                                     value={formData.gstExpenses}
//                                                     onChange={handleInputChange}
//                                                     fullWidth
//                                                     size="small"
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment
//                                                           position="start"
//                                                           style={{
//                                                             marginRight: "-1px",
//                                                             marginBottom: "3px",
//                                                           }}
//                                                         >
//                                                           <CurrencyRupeeIcon
//                                                             style={{
//                                                               fontSize: "15px",
//                                                             }}
//                                                           />
//                                                         </InputAdornment>
//                                                       ),
//                                                     }}
//                                                   />
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "0px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <TextField
//                                                     name="otherExpenses"
//                                                     value={
//                                                       formData.otherExpenses
//                                                     }
//                                                     onChange={handleInputChange}
//                                                     size="small"
//                                                     fullWidth
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment
//                                                           position="start"
//                                                           style={{
//                                                             marginRight: "-1px",
//                                                             marginBottom: "3px",
//                                                           }}
//                                                         >
//                                                           <CurrencyRupeeIcon
//                                                             style={{
//                                                               fontSize: "15px",
//                                                             }}
//                                                           />
//                                                         </InputAdornment>
//                                                       ),
//                                                     }}
//                                                   />
//                                                 </TableCell>
//                                               </TableRow>
//                                             </TableBody>
//                                           </Table>
//                                         </TableContainer>

//                                         <h5 className="text-end me-2 mt-2">
//                                           <span
//                                             className="fw-bold me-2"
//                                             style={{ fontSize: "15px" }}
//                                           >
//                                             Bill Sundry Amount:
//                                             <CurrencyRupeeIcon
//                                               style={{ fontSize: "15px" }}
//                                             />
//                                             {formData.billSundryAmount.toFixed(
//                                               2
//                                             )}
//                                           </span>
//                                         </h5>

//                                         <h5 className="text-end me-2 mt-2">
//                                           <span
//                                             className="fw-bold me-2"
//                                             style={{ fontSize: "15px" }}
//                                           >
//                                             Total Amount:
//                                             <CurrencyRupeeIcon
//                                               style={{ fontSize: "15px" }}
//                                             />
//                                             {formData.totalAmount.toFixed(2)}
//                                           </span>
//                                         </h5>
//                                       </div>
//                                     </div>

//                                     {/* Bill sundry End */}

//                                     {/* Transport Detail Start */}
//                                     <div className="row">
//                                       <div className="col-xl-12">
//                                         <div>
//                                           <FormControlLabel
//                                             control={
//                                               <Checkbox
//                                                 checked={showTransportDetails}
//                                                 onChange={handleCheckboxChange}
//                                               />
//                                             }
//                                             label="Add Transport Details"
//                                           />
//                                           {showTransportDetails && (
//                                             <TableContainer
//                                               component={Paper}
//                                               sx={{
//                                                 maxHeight: 320,
//                                                 marginTop: 2,
//                                               }}
//                                             >
//                                               <Table>
//                                                 <TableHead>
//                                                   <TableRow>
//                                                     <TableCell
//                                                       align="center"
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "4px",
//                                                         background: "#bbdefb",
//                                                       }}
//                                                       className="p-0 fw-bold fixed"
//                                                     >
//                                                       Built Number
//                                                     </TableCell>
//                                                     <TableCell
//                                                       align="center"
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "4px",
//                                                         background: "#bbdefb",
//                                                       }}
//                                                       className="p-0 fw-bold fixed"
//                                                     >
//                                                       Transporter
//                                                     </TableCell>
//                                                     <TableCell
//                                                       align="center"
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "4px",
//                                                         background: "#bbdefb",
//                                                       }}
//                                                       className="p-0 fw-bold fixed"
//                                                     >
//                                                       Date
//                                                     </TableCell>
//                                                     <TableCell
//                                                       align="center"
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "4px",
//                                                         background: "#bbdefb",
//                                                       }}
//                                                       className="p-0 fw-bold fixed"
//                                                     >
//                                                       Lot Size
//                                                     </TableCell>
//                                                     <TableCell
//                                                       align="center"
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "4px",
//                                                         background: "#bbdefb",
//                                                       }}
//                                                       className="p-0 fw-bold fixed"
//                                                     >
//                                                       Lot Open
//                                                     </TableCell>
//                                                     <TableCell
//                                                       align="center"
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "4px",
//                                                         background: "#bbdefb",
//                                                       }}
//                                                       className="p-0 fw-bold fixed"
//                                                     >
//                                                       Lot Pending
//                                                     </TableCell>
//                                                   </TableRow>
//                                                 </TableHead>
//                                                 <TableBody
//                                                   sx={{
//                                                     background: "white",
//                                                     overflowY: "auto",
//                                                   }}
//                                                 >
//                                                   <TableRow>
//                                                     <TableCell
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "0px",
//                                                       }}
//                                                       align="center"
//                                                     >
//                                                       <TextField
//                                                         name="builtNumber"
//                                                         type="number"
//                                                         value={
//                                                           transportDetails.builtNumber
//                                                         }
//                                                         onChange={
//                                                           handleTransportDetailChange
//                                                         }
//                                                         size="small"
//                                                         variant="standard"
//                                                       />
//                                                     </TableCell>
//                                                     <TableCell
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "0px",
//                                                       }}
//                                                       align="center"
//                                                     >
//                                                       <TextField
//                                                         name="transporter"
//                                                         type="text"
//                                                         value={
//                                                           transportDetails.transporter
//                                                         }
//                                                         onChange={
//                                                           handleTransportDetailChange
//                                                         }
//                                                         size="small"
//                                                         variant="standard"
//                                                       />
//                                                     </TableCell>
//                                                     <TableCell
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "0px",
//                                                       }}
//                                                       align="center"
//                                                     >
//                                                       <TextField
//                                                         name="date"
//                                                         type="date"
//                                                         value={
//                                                           transportDetails.date
//                                                         }
//                                                         onChange={
//                                                           handleTransportDetailChange
//                                                         }
//                                                         size="small"
//                                                         variant="standard"
//                                                       />
//                                                     </TableCell>
//                                                     <TableCell
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "0px",
//                                                       }}
//                                                       align="center"
//                                                     >
//                                                       <TextField
//                                                         name="lotSize"
//                                                         type="number"
//                                                         value={
//                                                           transportDetails.lotSize
//                                                         }
//                                                         onChange={
//                                                           handleTransportDetailChange
//                                                         }
//                                                         size="small"
//                                                         variant="standard"
//                                                       />
//                                                     </TableCell>
//                                                     <TableCell
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "0px",
//                                                       }}
//                                                       align="center"
//                                                     >
//                                                       <TextField
//                                                         name="lotOpen"
//                                                         type="number"
//                                                         value={
//                                                           transportDetails.lotOpen
//                                                         }
//                                                         onChange={
//                                                           handleTransportDetailChange
//                                                         }
//                                                         size="small"
//                                                         variant="standard"
//                                                       />
//                                                     </TableCell>
//                                                     <TableCell
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "0px",
//                                                       }}
//                                                       align="center"
//                                                     >
//                                                       <TextField
//                                                         name="lotPending"
//                                                         type="number"
//                                                         value={
//                                                           transportDetails.lotPending
//                                                         }
//                                                         onChange={
//                                                           handleTransportDetailChange
//                                                         }
//                                                         size="small"
//                                                         variant="standard"
//                                                       />
//                                                     </TableCell>
//                                                   </TableRow>
//                                                 </TableBody>
//                                               </Table>
//                                             </TableContainer>
//                                           )}
//                                         </div>
//                                       </div>
//                                     </div>
//                                     {/* Transport Detail End */}

//                                     <div className="row mt-3">
//                                       <div className="col-xl-12">
//                                         <Button
//                                           type="submit"
//                                           variant="contained"
//                                           color="primary"
//                                           className="fw-bold"
//                                         >
//                                           Save
//                                         </Button>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
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
//       <ToastContainer />
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   TextField,
//   Stack,
//   Grid,
//   Button,
//   FormControl,
//   Paper,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CssBaseline,
//   Autocomplete,
//   Checkbox,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import Header from "../../../schema/Header";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import { styled } from "@mui/material/styles";
// import InputAdornment from "@mui/material/InputAdornment";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import CancelIcon from "@mui/icons-material/Cancel";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import api from "../../../../services/api";

// const breadcrumbs = [
//   <Link key="1" to="/purchase_voucher_list">
//     Purchase Voucher
//   </Link>,
//   <Typography key="3" color="text.secondary">
//     Add Purchase Voucher
//   </Typography>,
// ];

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// export default function AddSalesVoucher() {
//   const [formData, setFormData] = useState({
//     buyerName: "",
//     saleDate: new Date().toISOString().split("T")[0],
//     saleVoucherNo: "",
//     sellerVoucherNo: "",
//     itemsList: [],
//     packingCharges: 0,
//     gstExpenses: 0,
//     otherExpenses: 0,
//     totalItemAmount: 0,
//     billSundryAmount: 0,
//     totalAmount: 0,
//     accountId: "",
//     buyerRateType: "", // To store the rate type
//   });

//   const [itemsList, setItemsList] = useState([
//     { item: "", quantity: "", unit: "", price: "", amount: 0 },
//   ]);
//   const [accounts, setAccounts] = useState([]);
//   const [items, setItems] = useState([]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     // Handle date value
//     if (name === "saleDate") {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//       return;
//     }

//     const updatedValue = parseFloat(value) || 0; // Ensure value is a number
//     let updatedFormData = { ...formData, [name]: updatedValue };

//     if (name === "gstExpenses") {
//       const gstAmount = (formData.totalItemAmount * updatedValue) / 100;
//       updatedFormData = { ...updatedFormData, gstAmount };
//     }

//     const billSundryAmount =
//       updatedFormData.packingCharges +
//       (updatedFormData.gstAmount || updatedFormData.gstExpenses) +
//       updatedFormData.otherExpenses;
//     const totalAmount = updatedFormData.totalItemAmount + billSundryAmount;

//     setFormData({
//       ...updatedFormData,
//       billSundryAmount,
//       totalAmount,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.buyerName) {
//       toast.error("Please select a buyer name.");
//       return;
//     }

//     console.log("Form data before submission:", formData);

//     const finalFormData = {
//       ...formData,
//       itemsList: itemsList.map((item) => ({
//         item: item.item, // Ensure this is set to the ObjectId
//         quantity: item.quantity,
//         unit: item.unit,
//         price: item.price,
//         amount: item.amount,
//       })),
//       transportDetails: showTransportDetails ? transportDetails : {},
//     };

//     console.log("Final form data being sent:", finalFormData);

//     try {
//       const response = await api.post("/api/sale-vouchers/add", finalFormData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.status === 201 || response.status === 200) {
//         toast.success("Sales Voucher Added Successfully!");
//         resetForm(); // Reset the form on success
//       } else {
//         toast.error("Failed to add Sales Voucher.");
//       }
//     } catch (error) {
//       console.error(
//         "Error during submission:",
//         error.response?.data || error.message
//       );
//       toast.error(
//         "An error occurred while submitting the form. Please try again."
//       );
//     }
//   };

//     const resetForm = () => {
//     setFormData({
//       buyerName: "",
//       saleDate: new Date().toISOString().split("T")[0],
//       saleVoucherNo: "",
//       sellerVoucherNo: "",
//       itemsList: [],
//       packingCharges: 0,
//       gstExpenses: 0,
//       otherExpenses: 0,
//       totalItemAmount: 0,
//       billSundryAmount: 0,
//       totalAmount: 0,
//       accountId: "",
//       buyerRateType: "",
//     });

//     setItemsList([{ item: "", quantity: "", unit: "", price: "", amount: 0 }]);

//     setTransportDetails({
//       builtNumber: "",
//       transporter: "",
//       date: "",
//       lotSize: "",
//       lotOpen: "",
//       lotPending: "",
//     });

//     setShowTransportDetails(false);
//   };

//   // Function to handle item list changes
//   const handleItemChange = (index, e) => {
//     const { name, value } = e.target;
//     const newItemsList = [...itemsList];
//     newItemsList[index][name] = value;

//     // Calculate amount for each item
//     if (name === "quantity" || name === "price") {
//       newItemsList[index].amount =
//         newItemsList[index].quantity * newItemsList[index].price;
//     }

//     setItemsList(newItemsList);

//     // Calculate total item amount
//     const totalItemAmount = newItemsList.reduce(
//       (total, item) => total + item.amount,
//       0
//     );
//     setFormData({ ...formData, itemsList: newItemsList, totalItemAmount });
//   };

//   // Function to add a new item row
//   const addItemRow = () => {
//     setItemsList([
//       ...itemsList,
//       { item: "", quantity: "", unit: "", price: "", amount: 0 },
//     ]);
//   };

//   // Function to delete an item row
//   const deleteItemRow = (index) => {
//     const newItemsList = [...itemsList];
//     newItemsList.splice(index, 1);
//     setItemsList(newItemsList);

//     // Recalculate total item amount after deletion
//     const totalItemAmount = newItemsList.reduce(
//       (total, item) => total + item.amount,
//       0
//     );
//     setFormData({ ...formData, itemsList: newItemsList, totalItemAmount });
//   };

//   // Fetch accounts
//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         const response = await api.get("/api/accounts");
//         setAccounts(response.data);
//       } catch (error) {
//         toast.error("Failed to fetch accounts.");
//       }
//     };
//     fetchAccounts();
//   }, []);

//   // Fetch items
//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await api.get("/api/jewelry-items");
//         setItems(response.data);
//       } catch (error) {
//         toast.error("Failed to fetch items.");
//       }
//     };
//     fetchItems();
//   }, []);

//   // Fetch item data based on buyer's rate type
//   const fetchItemData = async (itemId, rateType) => {
//     try {
//       const response = await api.get(`/api/jewelry-items/${itemId}`);
//       const {
//         _id,
//         unit,
//         retailerPrice,
//         semiWholesellerPrice,
//         wholesellerPrice,
//       } = response.data;

//       const price =
//         rateType === "Retailer"
//           ? retailerPrice
//           : rateType === "Semi Wholeseller"
//           ? semiWholesellerPrice
//           : wholesellerPrice;

//       return { _id, unit, price };
//     } catch (error) {
//       console.error("Error fetching item data:", error);
//       return { _id: itemId, unit: "", price: 0 }; // Fallback
//     }
//   };

//   // Handle buyer selection
//   const handleBuyerSelect = async (value) => {
//     if (value) {
//       setFormData({
//         ...formData,
//         buyerName: value.name,
//         accountId: value._id,
//         buyerRateType: value.rateType, // Set the rate type from the account
//       });
//     }
//   };

//   // Handle item selection
//   const handleItemSelect = async (index, selectedItem) => {
//     const newItemsList = [...itemsList];
//     if (selectedItem) {
//       const { price, unit } = await fetchItemData(
//         selectedItem._id,
//         formData.buyerRateType
//       );
//       newItemsList[index] = {
//         ...newItemsList[index],
//         item: selectedItem._id,
//         unit: unit,
//         price: price,
//         amount: 0, // Reset amount when item changes
//       };
//       setItemsList(newItemsList);
//     }
//   };

//    const [showTransportDetails, setShowTransportDetails] = useState(false);
//   const [transportDetails, setTransportDetails] = useState({
//     builtNumber: "",
//     transporter: "",
//     date: "",
//     lotSize: "",
//     lotOpen: "",
//     lotPending: "",
//   });

//   const handleTransportDetailChange = (e) => {
//     const { name, value } = e.target;
//     setTransportDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleCheckboxChange = (e) => {
//     setShowTransportDetails(e.target.checked);
//   };

//   return (
//     <div>
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-xl-12 ">
//             <Box sx={{ display: "flex" }}>
//               <CssBaseline />
//               <Header />
//               <Box component="main" sx={{ flexGrow: 1 }}>
//                 <DrawerHeader />
//                 <div className="container-fluid">
//                   <div className="row">
//                     <div className="col-xl-12">
//                       <div className="row d-flex justify-content-between">
//                         <div className="col-xl-12">
//                           <h4 className="fw-bold text-center">
//                             Add Sales Voucher
//                           </h4>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-xl-12">
//                       <Box component="form" onSubmit={handleSubmit}>
//                         <ToastContainer />
//                         <div className="row">
//                           <div className="col-xl-12 mx-auto p-2">
//                             <div className="row">
//                               <div
//                                 className="row mx-auto d-flex p-3"
//                                 style={{
//                                   border: "1px solid lightgray",
//                                   borderRadius: "5px",
//                                 }}
//                               >
//                                 <div className="row">
//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <Autocomplete
//                                         options={accounts}
//                                         getOptionLabel={(option) => option.name}
//                                         onChange={(event, value) =>
//                                           handleBuyerSelect(value)
//                                         }
//                                         renderInput={(params) => (
//                                           <TextField
//                                             {...params}
//                                             label="Buyer Name"
//                                             size="small"
//                                             variant="outlined"
//                                           />
//                                         )}
//                                       />
//                                     </FormControl>
//                                   </div>
//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <TextField
//                                         label="Sale Date"
//                                         name="saleDate"
//                                         type="date"
//                                         value={formData.saleDate}
//                                         onChange={handleInputChange}
//                                         size="small"
//                                         InputLabelProps={{ shrink: true }}
//                                         required
//                                       />
//                                     </FormControl>
//                                   </div>
//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <TextField
//                                         label="Sale Voucher No"
//                                         name="saleVoucherNo"
//                                         value={formData.saleVoucherNo}
//                                         onChange={handleInputChange}
//                                         size="small"
//                                         InputLabelProps={{ shrink: true }}
//                                         required
//                                       />
//                                     </FormControl>
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <TextField
//                                         label="Seller Voucher No"
//                                         name="sellerVoucherNo"
//                                         value={formData.sellerVoucherNo}
//                                         onChange={handleInputChange}
//                                         size="small"
//                                         InputLabelProps={{ shrink: true }}
//                                         required
//                                       />
//                                     </FormControl>
//                                   </div>
//                                 </div>

//                                 <div className="row">
//                                   <div className="col-xl-12 d-flex justify-content-end mt-2">
//                                     <Button
//                                       type="button"
//                                       variant="contained"
//                                       color="secondary"
//                                       onClick={addItemRow}
//                                       className="me-2"
//                                       size="small"
//                                     >
//                                       Add Item
//                                     </Button>
//                                   </div>
//                                   <div className="col-xl-12 mt-2">
//                                     <TableContainer
//                                       component={Paper}
//                                       sx={{ maxHeight: 300 }}
//                                     >

//                                     <Table>
//   <TableHead style={{ background: "#bbdefb" }}>
//     <TableRow>
//       <TableCell
//         sx={{
//           border: "1px solid lightgray",
//           padding: "4px",
//           background: "#bbdefb",
//         }}
//         className="p-0 fw-bold"
//         align="center"
//       >
//         #
//       </TableCell>
//       <TableCell
//         sx={{
//           border: "1px solid lightgray",
//           padding: "4px",
//           background: "#bbdefb",
//         }}
//         className="p-0 fw-bold"
//         align="center"
//       >
//         Item
//       </TableCell>
//       <TableCell
//         sx={{
//           border: "1px solid lightgray",
//           padding: "4px",
//           background: "#bbdefb",
//         }}
//         className="p-0 fw-bold"
//         align="center"
//       >
//         Quantity
//       </TableCell>
//       <TableCell
//         sx={{
//           border: "1px solid lightgray",
//           padding: "4px",
//           background: "#bbdefb",
//         }}
//         className="p-0 fw-bold"
//         align="center"
//       >
//         Unit
//       </TableCell>
//       <TableCell
//         sx={{
//           border: "1px solid lightgray",
//           padding: "4px",
//           background: "#bbdefb",
//         }}
//         className="p-0 fw-bold"
//         align="center"
//       >
//         Price(Rs.)
//       </TableCell>
//       <TableCell
//         sx={{
//           border: "1px solid lightgray",
//           padding: "4px",
//           background: "#bbdefb",
//         }}
//         className="p-0 fw-bold"
//         align="center"
//       >
//         Amount(Rs.)
//       </TableCell>
//       <TableCell
//         sx={{
//           border: "1px solid lightgray",
//           padding: "4px",
//           background: "#bbdefb",
//         }}
//         className="p-0 fw-bold"
//         align="center"
//       >
//         Actions
//       </TableCell>
//     </TableRow>
//   </TableHead>
//   <TableBody sx={{ background: "white", overflowY: "auto" }}>
//   {Array.from({ length: 10 }).map((_, index) => (
//     <TableRow
//       key={index}
//       sx={{
//         height: "15px",
//         borderBottom: "1px solid lightgray", // Same border styling between rows
//       }}
//     >
//       <TableCell
//         sx={{
//           fontWeight: "bold",
//           position: "sticky",
//           top: 0,
//           zIndex: 1,
//           padding: "1px",
//           fontSize: "13px",
//           textAlign: "center",
//           borderRight: "1px solid lightgray", // Same border between columns
//         }}
//       >
//         <span>{index + 1}</span>
//       </TableCell>

//       <TableCell
//         sx={{
//           padding: "0px",
//           width: "300px",
//           fontSize: "10px",
//           borderRight: "1px solid lightgray", // Same border between columns
//         }}
//         align="center"
//       >
//         <FormControl fullWidth>
//           <Autocomplete
//             options={items}
//             getOptionLabel={(option) => option.name}
//             onChange={(event, value) => handleItemSelect(index, value)}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label=""
//                 size="small"
//                 variant="standard"
//                 required
//                 InputProps={{
//                   ...params.InputProps,
//                   disableUnderline: true,
//                 }}
//                 sx={{
//                   "& .MuiInputBase-input": {
//                     height: "20px",
//                     fontSize: "13px",
//                     textAlign: "center",
//                   },
//                 }}
//               />
//             )}
//           />
//         </FormControl>
//       </TableCell>

//       <TableCell
//         sx={{
//           padding: "0px",
//           width: "150px",
//           fontSize: "10px",
//           borderRight: "1px solid lightgray", // Same border between columns
//         }}
//         align="center"
//       >
//         <TextField
//           name="quantity"
//           value={itemsList[index]?.quantity || ""}
//           onChange={(e) => handleItemChange(index, e)}
//           size="small"
//           variant="standard"
//           required
//           InputProps={{
//             disableUnderline: true,
//           }}
//           sx={{
//             "& .MuiInputBase-input": {
//               height: "20px",
//               textAlign: "center",
//             },
//           }}
//         />
//       </TableCell>

//       <TableCell
//         sx={{
//           fontWeight: "bold",
//           padding: "1px",
//           fontSize: "10px",
//           textAlign: "center",
//           width: "170px",
//           borderRight: "1px solid lightgray", // Same border between columns
//         }}
//         align="center"
//       >
//         <TextField
//           name=""
//           value={itemsList[index]?.unit?.name || ""}
//           InputProps={{
//             readOnly: true,
//             disableUnderline: true,
//           }}
//           size="small"
//           variant="standard"
//           required
//           sx={{
//             "& .MuiInputBase-input": {
//               height: "20px",
//               textAlign: "center",
//             },
//           }}
//         />
//       </TableCell>

//       <TableCell
//         sx={{
//           padding: "1px",
//           fontSize: "10px",
//           textAlign: "center",
//           width: "150px",
//           borderRight: "1px solid lightgray", // Same border between columns
//         }}
//         align="center"
//       >
//         <TextField
//           name=""
//           value={itemsList[index]?.price || ""}
//           onChange={(e) => handleItemChange(index, e)}
//           size="small"
//           variant="standard"
//           required
//           InputProps={{
//             disableUnderline: true,
//           }}
//           sx={{
//             "& .MuiInputBase-input": {
//               height: "20px", // Reduced height
//               textAlign: "center",
//             },
//           }}
//         />
//       </TableCell>

//       <TableCell
//         sx={{
//           padding: "1px",
//           fontSize: "10px",
//           textAlign: "center",
//           borderRight: "1px solid lightgray", // Same border between columns
//         }}
//         align="center"
//       >
//         {itemsList[index]?.amount
//           ? itemsList[index].amount.toFixed(2)
//           : "0.00"}
//       </TableCell>

//       <TableCell
//         sx={{
//           padding: "1px",
//           fontSize: "10px",
//           textAlign: "center",
//         }}
//         align="center"
//       >
//         <Button onClick={() => deleteItemRow(index)} color="error">
//           <CancelIcon fontSize="small" />
//         </Button>
//       </TableCell>
//     </TableRow>
//   ))}
// </TableBody>

// </Table>

//                                     </TableContainer>
//                                     <h5
//                                       gutterBottom
//                                       className="text-end me-2 mt-2"
//                                     >
//                                       <span
//                                         className=" me-2"
//                                         style={{ fontSize: "17px" }}
//                                       >
//                                         Item Amount:
//                                         <span>
//                                           <CurrencyRupeeIcon
//                                             style={{ fontSize: "18px" }}
//                                           />
//                                         </span>
//                                         <span className="fw-bold">
//                                           {formData.totalItemAmount.toFixed(2)}
//                                         </span>
//                                       </span>
//                                     </h5>

//                                     {/* Bill sundry Start */}

//                                     <div className="row mt-3 d justify-content-end">
//                                       <div className="col-xl-6 mt-1 ">
//                                         <TableContainer
//                                           component={Paper}
//                                           sx={{ maxHeight: 320 }}
//                                         >
//                                           <Table>
//                                             <TableHead>
//                                               <TableRow>
//                                                 <TableCell
//                                                   align="center"
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "4px",
//                                                     background: "#bbdefb",
//                                                   }}
//                                                   className="p-0 fw-bold fixed"
//                                                 >
//                                                   No.
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "4px",
//                                                     background: "#bbdefb",
//                                                   }}
//                                                   className="p-0 fw-bold fixed"
//                                                   align="center"
//                                                 >
//                                                   Packeging Charge
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "4px",
//                                                     background: "#bbdefb",
//                                                   }}
//                                                   className="p-0 fw-bold fixed"
//                                                   align="center"
//                                                 >
//                                                   GST
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "4px",
//                                                     background: "#bbdefb",
//                                                   }}
//                                                   className="p-0 fw-bold fixed"
//                                                   align="center"
//                                                 >
//                                                   Other Expenses
//                                                 </TableCell>
//                                               </TableRow>
//                                             </TableHead>
//                                             <TableBody
//                                               sx={{
//                                                 background: "white",
//                                                 overflowY: "auto",
//                                               }}
//                                             >
//                                               <TableRow>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "0px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <span className="ps-2 pe-2"></span>
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "0px",
//                                                     width: "200px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <TextField
//                                                     name="packingCharges"
//                                                     value={
//                                                       formData.packingCharges
//                                                     }
//                                                     onChange={handleInputChange}
//                                                     size="small"
//                                                     fullWidth
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment
//                                                           position="start"
//                                                           style={{
//                                                             marginRight: "-1px",
//                                                             marginBottom: "3px",
//                                                           }}
//                                                         >
//                                                           <CurrencyRupeeIcon
//                                                             style={{
//                                                               fontSize: "15px",
//                                                             }}
//                                                           />
//                                                         </InputAdornment>
//                                                       ),
//                                                     }}
//                                                   />
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "0px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <TextField
//                                                     label=""
//                                                     name="gstExpenses"
//                                                     value={formData.gstExpenses}
//                                                     onChange={handleInputChange}
//                                                     fullWidth
//                                                     size="small"
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment
//                                                           position="start"
//                                                           style={{
//                                                             marginRight: "-1px",
//                                                             marginBottom: "3px",
//                                                           }}
//                                                         >
//                                                           <CurrencyRupeeIcon
//                                                             style={{
//                                                               fontSize: "15px",
//                                                             }}
//                                                           />
//                                                         </InputAdornment>
//                                                       ),
//                                                     }}
//                                                   />
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "0px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <TextField
//                                                     name="otherExpenses"
//                                                     value={
//                                                       formData.otherExpenses
//                                                     }
//                                                     onChange={handleInputChange}
//                                                     size="small"
//                                                     fullWidth
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment
//                                                           position="start"
//                                                           style={{
//                                                             marginRight: "-1px",
//                                                             marginBottom: "3px",
//                                                           }}
//                                                         >
//                                                           <CurrencyRupeeIcon
//                                                             style={{
//                                                               fontSize: "15px",
//                                                             }}
//                                                           />
//                                                         </InputAdornment>
//                                                       ),
//                                                     }}
//                                                   />
//                                                 </TableCell>
//                                               </TableRow>
//                                             </TableBody>
//                                           </Table>
//                                         </TableContainer>

//                                         <h5 className="text-end me-2 mt-2">
//                                           <span
//                                             className="fw-bold me-2"
//                                             style={{ fontSize: "15px" }}
//                                           >
//                                             Bill Sundry Amount:
//                                             <CurrencyRupeeIcon
//                                               style={{ fontSize: "15px" }}
//                                             />
//                                             {formData.billSundryAmount.toFixed(
//                                               2
//                                             )}
//                                           </span>
//                                         </h5>

//                                         <h5 className="text-end me-2 mt-2">
//                                           <span
//                                             className="fw-bold me-2"
//                                             style={{ fontSize: "15px" }}
//                                           >
//                                             Total Amount:
//                                             <CurrencyRupeeIcon
//                                               style={{ fontSize: "15px" }}
//                                             />
//                                             {formData.totalAmount.toFixed(2)}
//                                           </span>
//                                         </h5>
//                                       </div>
//                                     </div>

//                                     {/* Bill sundry End */}

//                                     {/* Transport Detail Start */}

//                                     <div className="row">
//                                      <div className="col-xl-12">
//                                        <div>
//                                           <FormControlLabel
//                                             control={
//                                               <Checkbox
//                                                 checked={showTransportDetails}
//                                                 onChange={handleCheckboxChange}
//                                               />
//                                             }
//                                             label="Add Transport Details"
//                                           />
//                                           {showTransportDetails && (
//                                             <TableContainer
//                                               component={Paper}
//                                               sx={{
//                                                 maxHeight: 320,
//                                                 marginTop: 2,
//                                               }}
//                                             >
//                                               <Table>
//                                                 <TableHead>
//                                                   <TableRow>
//                                                     <TableCell
//                                                       align="center"
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "4px",
//                                                         background: "#bbdefb",
//                                                       }}
//                                                       className="p-0 fw-bold fixed"
//                                                     >
//                                                       Built Number
//                                                     </TableCell>
//                                                     <TableCell
//                                                       align="center"
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "4px",
//                                                         background: "#bbdefb",
//                                                       }}
//                                                       className="p-0 fw-bold fixed"
//                                                     >
//                                                       Transporter
//                                                     </TableCell>
//                                                     <TableCell
//                                                       align="center"
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "4px",
//                                                         background: "#bbdefb",
//                                                       }}
//                                                       className="p-0 fw-bold fixed"
//                                                     >
//                                                       Date
//                                                     </TableCell>
//                                                     <TableCell
//                                                       align="center"
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "4px",
//                                                         background: "#bbdefb",
//                                                       }}
//                                                       className="p-0 fw-bold fixed"
//                                                     >
//                                                       Lot Size
//                                                     </TableCell>
//                                                     <TableCell
//                                                       align="center"
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "4px",
//                                                         background: "#bbdefb",
//                                                       }}
//                                                       className="p-0 fw-bold fixed"
//                                                     >
//                                                       Lot Open
//                                                     </TableCell>
//                                                     <TableCell
//                                                       align="center"
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "4px",
//                                                         background: "#bbdefb",
//                                                       }}
//                                                       className="p-0 fw-bold fixed"
//                                                     >
//                                                       Lot Pending
//                                                     </TableCell>
//                                                   </TableRow>
//                                                 </TableHead>
//                                                 <TableBody
//                                                   sx={{
//                                                     background: "white",
//                                                     overflowY: "auto",
//                                                   }}
//                                                 >
//                                                   <TableRow>
//                                                     <TableCell
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "0px",
//                                                       }}
//                                                       align="center"
//                                                     >
//                                                       <TextField
//                                                         name="builtNumber"
//                                                         type="number"
//                                                         value={
//                                                           transportDetails.builtNumber
//                                                         }
//                                                         onChange={
//                                                           handleTransportDetailChange
//                                                         }
//                                                         size="small"
//                                                         variant="standard"
//                                                       />
//                                                     </TableCell>
//                                                     <TableCell
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "0px",
//                                                       }}
//                                                       align="center"
//                                                     >
//                                                       <TextField
//                                                         name="transporter"
//                                                         type="text"
//                                                         value={
//                                                           transportDetails.transporter
//                                                         }
//                                                         onChange={
//                                                           handleTransportDetailChange
//                                                         }
//                                                         size="small"
//                                                         variant="standard"
//                                                       />
//                                                     </TableCell>
//                                                     <TableCell
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "0px",
//                                                       }}
//                                                       align="center"
//                                                     >
//                                                       <TextField
//                                                         name="date"
//                                                         type="date"
//                                                         value={
//                                                           transportDetails.date
//                                                         }
//                                                         onChange={
//                                                           handleTransportDetailChange
//                                                         }
//                                                         size="small"
//                                                         variant="standard"
//                                                       />
//                                                     </TableCell>
//                                                     <TableCell
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "0px",
//                                                       }}
//                                                       align="center"
//                                                     >
//                                                       <TextField
//                                                         name="lotSize"
//                                                         type="number"
//                                                         value={
//                                                           transportDetails.lotSize
//                                                         }
//                                                         onChange={
//                                                           handleTransportDetailChange
//                                                         }
//                                                         size="small"
//                                                         variant="standard"
//                                                       />
//                                                     </TableCell>
//                                                     <TableCell
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "0px",
//                                                       }}
//                                                       align="center"
//                                                     >
//                                                       <TextField
//                                                         name="lotOpen"
//                                                         type="number"
//                                                         value={
//                                                           transportDetails.lotOpen
//                                                         }
//                                                         onChange={
//                                                           handleTransportDetailChange
//                                                         }
//                                                         size="small"
//                                                         variant="standard"
//                                                       />
//                                                     </TableCell>
//                                                     <TableCell
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "0px",
//                                                       }}
//                                                       align="center"
//                                                     >
//                                                       <TextField
//                                                         name="lotPending"
//                                                         type="number"
//                                                         value={
//                                                           transportDetails.lotPending
//                                                         }
//                                                         onChange={
//                                                           handleTransportDetailChange
//                                                         }
//                                                         size="small"
//                                                         variant="standard"
//                                                       />
//                                                     </TableCell>
//                                                   </TableRow>
//                                                 </TableBody>
//                                               </Table>
//                                             </TableContainer>
//                                           )}
//                                         </div>
//                                       </div>
//                                     </div>

//                                     {/* Transport Detail End */}

//                                     <div className="row mt-3">
//                                       <div className="col-xl-12">
//                                         <Button
//                                           type="submit"
//                                           variant="contained"
//                                           color="primary"
//                                           className="fw-bold"
//                                         >
//                                           Save
//                                         </Button>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>

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
//       <ToastContainer />
//     </div>
//   );
// }

//================================ From boss Bhushan [updated with sales voucher Number ]============================//

// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   TextField,
//   Stack,
//   Grid,
//   Button,
//   FormControl,
//   Paper,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CssBaseline,
//   Autocomplete,
//   Checkbox,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import Header from "../../../schema/Header";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import { styled } from "@mui/material/styles";
// import InputAdornment from "@mui/material/InputAdornment";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import CancelIcon from "@mui/icons-material/Cancel";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import api from "../../../../services/api";

// const breadcrumbs = [
//   <Link key="1" to="/purchase_voucher_list">
//     Purchase Voucher
//   </Link>,
//   <Typography key="3" color="text.secondary">
//     Add Purchase Voucher
//   </Typography>,
// ];

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// export default function AddSalesVoucher() {
//   const [formData, setFormData] = useState({
//     buyerName: "",
//     saleDate: new Date().toISOString().split("T")[0],
//     saleVoucherNo: "",
//     sellerVoucherNo: "",
//     itemsList: [],
//     packingCharges: 0,
//     gstExpenses: 0,
//     otherExpenses: 0,
//     totalItemAmount: 0,
//     billSundryAmount: 0,
//     totalAmount: 0,
//     accountId: "",
//     buyerRateType: "", // To store the rate type
//   });

//   const [itemsList, setItemsList] = useState(
//     Array.from({ length: 10 }, () => ({
//       item: "",
//       quantity: "",
//       unit: "",
//       price: "",
//       amount: 0,
//     }))
//   );

//   const [accounts, setAccounts] = useState([]);
//   const [items, setItems] = useState([]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     // Handle date value
//     if (name === "saleDate") {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//       return;
//     }

//     const updatedValue = parseFloat(value) || 0; // Ensure value is a number
//     let updatedFormData = { ...formData, [name]: updatedValue };

//     if (name === "gstExpenses") {
//       const gstAmount = (formData.totalItemAmount * updatedValue) / 100;
//       updatedFormData = { ...updatedFormData, gstAmount };
//     }

//     const billSundryAmount =
//       updatedFormData.packingCharges +
//       (updatedFormData.gstAmount || updatedFormData.gstExpenses) +
//       updatedFormData.otherExpenses;
//     const totalAmount = updatedFormData.totalItemAmount + billSundryAmount;

//     setFormData({
//       ...updatedFormData,
//       billSundryAmount,
//       totalAmount,
//     });
//   };

//   useEffect(() => {
//     // Fetch the next sales voucher number when the component loads
//     const fetchNextSalesVoucherNo = async () => {
//       try {
//         const response = await api.get("/api/get-next-sales-voucher-no");
//         const nextVoucherNo = response.data.nextVoucherNo;
//         setFormData((prevData) => ({
//           ...prevData,
//           saleVoucherNo: nextVoucherNo, // Update the key to match your form data
//         }));
//       } catch (error) {
//         console.error("Failed to fetch next sales voucher number:", error);
//       }
//     };

//     fetchNextSalesVoucherNo();
//   }, []);

//   // Optionally, you can also keep the separate fetch function if needed
//   const fetchNextSalesVoucherNo = async () => {
//     try {
//       const response = await api.get("/api/get-next-sales-voucher-no");
//       return response.data.nextVoucherNo;
//     } catch (error) {
//       console.error("Failed to fetch next sales voucher number:", error);
//       throw new Error("Error fetching next voucher number");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.buyerName) {
//       toast.error("Please select a buyer name.");
//       return;
//     }

//     console.log("Form data before submission:", formData);

//     // Filter out items with empty fields
//     const nonEmptyItemsList = itemsList.filter(
//       (item) => item.item && item.quantity && item.unit && item.price
//     );

//     const finalFormData = {
//       ...formData,
//       itemsList: nonEmptyItemsList.map((item) => ({
//         item: item.item, // Ensure this is set to the ObjectId
//         quantity: item.quantity,
//         unit: item.unit,
//         price: item.price,
//         amount: item.amount,
//       })),
//       transportDetails: showTransportDetails ? transportDetails : {},
//     };

//     console.log("Final form data being sent:", finalFormData);

//     try {
//       const response = await api.post("/api/sale-vouchers/add", finalFormData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.status === 201 || response.status === 200) {
//         toast.success("Sales Voucher Added Successfully!");
//         // resetForm(); // Reset the form on success

//         const nextVoucherNo = await fetchNextSalesVoucherNo();
//         resetForm(nextVoucherNo);
//       } else {
//         toast.error("Failed to add Sales Voucher.");
//       }
//     } catch (error) {
//       console.error(
//         "Error during submission:",
//         error.response?.data || error.message
//       );
//       toast.error(
//         "An error occurred while submitting the form. Please try again."
//       );
//     }
//   };

//   // const resetForm = () => {
//   //   setFormData({
//   //     buyerName: "",
//   //     saleDate: new Date().toISOString().split("T")[0],
//   //     saleVoucherNo: "",
//   //     sellerVoucherNo: "",
//   //     itemsList: [],
//   //     packingCharges: 0,
//   //     gstExpenses: 0,
//   //     otherExpenses: 0,
//   //     totalItemAmount: 0,
//   //     billSundryAmount: 0,
//   //     totalAmount: 0,
//   //     accountId: "",
//   //     buyerRateType: "",
//   //   });

//   const resetForm = () => {
//     setFormData({
//       buyerName: "",
//       saleDate: new Date().toISOString().split("T")[0],
//       saleVoucherNo: "",
//       sellerVoucherNo: "",
//       itemsList: Array(10).fill({
//         item: "",
//         quantity: null,
//         unit: "",
//         // alternativeunit: "",
//         price: "",
//         // alternativeUnitQuantity: "", // New field
//         // alternativeUnitPrice: "", // New field
//         amount: "",
//         // barcode: "",
//       }),
//       packingCharges: 0,
//       gstExpenses: 0,
//       otherExpenses: 0,
//       totalItemAmount: 0,
//       billSundryAmount: 0,
//       totalAmount: 0,
//       accountId: "",
//       buyerRateType: "",
//     });

//     // setItemsList([{ item: "", quantity: "", unit: "", price: "", amount: 0 }]);

//     // Reset itemsList to 10 empty fields
//     setItemsList(
//       Array.from({ length: 10 }, () => ({
//         item: "",
//         quantity: "",
//         unit: "",
//         price: "",
//         amount: 0,
//       }))
//     );

//     // Reset transport details if applicable
//     setTransportDetails({
//       builtNumber: "",
//       transporter: "",
//       date: "",
//       lotSize: "",
//       lotOpen: "",
//       lotPending: "",
//     });
//     setShowTransportDetails(false);
//   };

//   // Function to handle item list changes
//   const handleItemChange = (index, e) => {
//     const { name, value } = e.target;
//     const newItemsList = [...itemsList];
//     newItemsList[index][name] = value;

//     // Calculate amount for each item
//     if (name === "quantity" || name === "price") {
//       newItemsList[index].amount =
//         newItemsList[index].quantity * newItemsList[index].price;
//     }

//     setItemsList(newItemsList);

//     // Calculate total item amount
//     const totalItemAmount = newItemsList.reduce(
//       (total, item) => total + item.amount,
//       0
//     );
//     setFormData({ ...formData, itemsList: newItemsList, totalItemAmount });
//   };

//   // Function to add a new item row
//   const addItemRow = () => {
//     setItemsList([
//       ...itemsList,
//       { item: "", quantity: "", unit: "", price: "", amount: 0 },
//     ]);
//   };

//   // Function to delete an item row
//   const deleteItemRow = (index) => {
//     const newItemsList = [...itemsList];
//     newItemsList.splice(index, 1);
//     setItemsList(newItemsList);

//     // Recalculate total item amount after deletion
//     const totalItemAmount = newItemsList.reduce(
//       (total, item) => total + item.amount,
//       0
//     );
//     setFormData({ ...formData, itemsList: newItemsList, totalItemAmount });
//   };

//   // Fetch accounts
//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         const response = await api.get("/api/accounts");
//         setAccounts(response.data);
//       } catch (error) {
//         toast.error("Failed to fetch accounts.");
//       }
//     };
//     fetchAccounts();
//   }, []);

//   // Fetch items
//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await api.get("/api/jewelry-items");
//         setItems(response.data);
//       } catch (error) {
//         toast.error("Failed to fetch items.");
//       }
//     };
//     fetchItems();
//   }, []);

//   // Fetch item data based on buyer's rate type
//   const fetchItemData = async (itemId, rateType) => {
//     try {
//       const response = await api.get(`/api/jewelry-items/${itemId}`);
//       const {
//         _id,
//         unit,
//         retailerPrice,
//         semiWholesellerPrice,
//         wholesellerPrice,
//       } = response.data;

//       const price =
//         rateType === "Retailer"
//           ? retailerPrice
//           : rateType === "Semi Wholeseller"
//           ? semiWholesellerPrice
//           : wholesellerPrice;

//       return { _id, unit, price };
//     } catch (error) {
//       console.error("Error fetching item data:", error);
//       return { _id: itemId, unit: "", price: 0 }; // Fallback
//     }
//   };

//   // Handle buyer selection
//   const handleBuyerSelect = async (value) => {
//     if (value) {
//       setFormData({
//         ...formData,
//         buyerName: value.name,
//         accountId: value._id,
//         buyerRateType: value.rateType, // Set the rate type from the account
//       });
//     }
//   };

//   // Handle item selection
//   const handleItemSelect = async (index, selectedItem) => {
//     const newItemsList = [...itemsList];
//     if (selectedItem) {
//       const { price, unit } = await fetchItemData(
//         selectedItem._id,
//         formData.buyerRateType
//       );
//       newItemsList[index] = {
//         ...newItemsList[index],
//         item: selectedItem._id,
//         unit: unit,
//         price: price,
//         amount: 0, // Reset amount when item changes
//       };
//       setItemsList(newItemsList);
//     }
//   };

//   const [showTransportDetails, setShowTransportDetails] = useState(false);
//   const [transportDetails, setTransportDetails] = useState({
//     builtNumber: "",
//     transporter: "",
//     date: "",
//     lotSize: "",
//     lotOpen: "",
//     lotPending: "",
//   });

//   const handleTransportDetailChange = (e) => {
//     const { name, value } = e.target;
//     let newValue = value;

//     // If the value is meant to be a number, convert it
//     if (name === "lotSize" || name === "lotOpen") {
//       newValue = parseFloat(value) || 0;
//     }

//     setTransportDetails((prevDetails) => {
//       const updatedDetails = {
//         ...prevDetails,
//         [name]: newValue,
//       };

//       // Calculate lotPending if both lotSize and lotOpen are defined
//       if (updatedDetails.lotSize !== "" && updatedDetails.lotOpen !== "") {
//         updatedDetails.lotPending =
//           updatedDetails.lotSize - updatedDetails.lotOpen;
//       }

//       return updatedDetails;
//     });
//   };

//   const handleCheckboxChange = (e) => {
//     setShowTransportDetails(e.target.checked);
//   };

//   return (
//     <div>
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-xl-12 ">
//             <Box sx={{ display: "flex" }}>
//               <CssBaseline />
//               <Header />
//               <Box component="main" sx={{ flexGrow: 1 }}>
//                 <DrawerHeader />
//                 <div className="container-fluid">
//                   <div className="row">
//                     <div className="col-xl-12">
//                       <div className="row d-flex justify-content-between">
//                         <div className="col-xl-12">
//                           <h4 className="fw-bold text-center">
//                             Add Sales Voucher
//                           </h4>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-xl-12">
//                       <Box component="form" onSubmit={handleSubmit}>
//                         <div className="row">
//                           <div className="col-xl-12 mx-auto p-2">
//                             <div className="row">
//                               <div
//                                 className="row mx-auto d-flex p-3"
//                                 style={{
//                                   border: "1px solid lightgray",
//                                   borderRadius: "5px",
//                                 }}
//                               >
//                                 <div className="row">
//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <Autocomplete
//                                         options={accounts}
//                                         getOptionLabel={(option) => option.name}
//                                         onChange={(event, value) =>
//                                           handleBuyerSelect(value)
//                                         }
//                                         renderInput={(params) => (
//                                           <TextField
//                                             {...params}
//                                             label="Buyer Name"
//                                             size="small"
//                                             variant="outlined"
//                                           />
//                                         )}
//                                       />
//                                     </FormControl>
//                                   </div>
//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <TextField
//                                         label="Sale Date"
//                                         name="saleDate"
//                                         type="date"
//                                         value={formData.saleDate}
//                                         onChange={handleInputChange}
//                                         size="small"
//                                         InputLabelProps={{ shrink: true }}
//                                         required
//                                       />
//                                     </FormControl>
//                                   </div>
//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <TextField
//                                         label="Sale Voucher No"
//                                         name="saleVoucherNo"
//                                         value={formData.saleVoucherNo}
//                                         onChange={handleInputChange}
//                                         size="small"
//                                         InputLabelProps={{ shrink: true }}
//                                         required
//                                       />
//                                     </FormControl>
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <TextField
//                                         label="Seller Voucher No"
//                                         name="sellerVoucherNo"
//                                         value={formData.sellerVoucherNo}
//                                         onChange={handleInputChange}
//                                         size="small"
//                                         InputLabelProps={{ shrink: true }}
//                                         required
//                                       />
//                                     </FormControl>
//                                   </div>
//                                 </div>
//                                 <div className="row">
//                                   <div className="col-xl-12 d-flex justify-content-end mt-2">
//                                     <Button
//                                       type="button"
//                                       variant="contained"
//                                       color="secondary"
//                                       onClick={addItemRow}
//                                       className="me-2"
//                                       size="small"
//                                     >
//                                       Add Item
//                                     </Button>
//                                   </div>
//                                   <div className="col-xl-12 mt-2">
//                                     <TableContainer
//                                       component={Paper}
//                                       sx={{ maxHeight: 300 }}
//                                     >
//                                       <Table>
//                                         <TableHead
//                                           style={{ background: "#bbdefb" }}
//                                         >
//                                           <TableRow>
//                                             <TableCell
//                                               sx={{
//                                                 border: "1px solid lightgray",
//                                                 padding: "4px",
//                                                 background: "#bbdefb",
//                                               }}
//                                               className="p-0 fw-bold"
//                                               align="center"
//                                             >
//                                               #
//                                             </TableCell>
//                                             <TableCell
//                                               sx={{
//                                                 border: "1px solid lightgray",
//                                                 padding: "4px",
//                                                 background: "#bbdefb",
//                                               }}
//                                               className="p-0 fw-bold"
//                                               align="center"
//                                             >
//                                               Item
//                                             </TableCell>
//                                             <TableCell
//                                               sx={{
//                                                 border: "1px solid lightgray",
//                                                 padding: "4px",
//                                                 background: "#bbdefb",
//                                               }}
//                                               className="p-0 fw-bold"
//                                               align="center"
//                                             >
//                                               Quantity
//                                             </TableCell>
//                                             <TableCell
//                                               sx={{
//                                                 border: "1px solid lightgray",
//                                                 padding: "4px",
//                                                 background: "#bbdefb",
//                                               }}
//                                               className="p-0 fw-bold"
//                                               align="center"
//                                             >
//                                               Unit
//                                             </TableCell>
//                                             <TableCell
//                                               sx={{
//                                                 border: "1px solid lightgray",
//                                                 padding: "4px",
//                                                 background: "#bbdefb",
//                                               }}
//                                               className="p-0 fw-bold"
//                                               align="center"
//                                             >
//                                               Price(Rs.)
//                                             </TableCell>
//                                             <TableCell
//                                               sx={{
//                                                 border: "1px solid lightgray",
//                                                 padding: "4px",
//                                                 background: "#bbdefb",
//                                               }}
//                                               className="p-0 fw-bold"
//                                               align="center"
//                                             >
//                                               Amount(Rs.)
//                                             </TableCell>
//                                             <TableCell
//                                               sx={{
//                                                 border: "1px solid lightgray",
//                                                 padding: "4px",
//                                                 background: "#bbdefb",
//                                               }}
//                                               className="p-0 fw-bold"
//                                               align="center"
//                                             >
//                                               Actions
//                                             </TableCell>
//                                           </TableRow>
//                                         </TableHead>

//                                         <TableBody sx={{ background: "white" }}>
//                                           {itemsList.map((item, index) => (
//                                             <TableRow
//                                               key={index}
//                                               sx={{
//                                                 height: "15px",
//                                                 borderBottom:
//                                                   "1px solid lightgray",
//                                               }}
//                                             >
//                                               <TableCell
//                                                 sx={{
//                                                   fontWeight: "bold",
//                                                   position: "sticky",
//                                                   top: 0,
//                                                   zIndex: 1,
//                                                   padding: "1px",
//                                                   fontSize: "13px",
//                                                   textAlign: "center",
//                                                   borderRight:
//                                                     "1px solid lightgray",
//                                                 }}
//                                               >
//                                                 <span>{index + 1}</span>
//                                               </TableCell>
//                                               <TableCell
//                                                 sx={{
//                                                   padding: "0px",
//                                                   width: "250px",
//                                                   fontSize: "10px",
//                                                   borderRight:
//                                                     "1px solid lightgray",
//                                                 }}
//                                               >
//                                                 <FormControl fullWidth>
//                                                   <Autocomplete
//                                                     options={items}
//                                                     getOptionLabel={(option) =>
//                                                       option.name
//                                                     }
//                                                     onChange={(event, value) =>
//                                                       handleItemSelect(
//                                                         index,
//                                                         value
//                                                       )
//                                                     }
//                                                     renderInput={(params) => (
//                                                       <TextField
//                                                         {...params}
//                                                         label=""
//                                                         size="small"
//                                                         variant="standard"
//                                                         InputProps={{
//                                                           ...params.InputProps,
//                                                           disableUnderline: true,
//                                                         }}
//                                                         sx={{
//                                                           "& .MuiInputBase-input":
//                                                             {
//                                                               height: "20px",
//                                                               fontSize: "13px",
//                                                               textAlign:
//                                                                 "center",
//                                                             },
//                                                         }}
//                                                       />
//                                                     )}
//                                                   />
//                                                 </FormControl>
//                                               </TableCell>
//                                               <TableCell
//                                                 sx={{
//                                                   padding: "0px",
//                                                   width: "150px",
//                                                   fontSize: "10px",
//                                                   borderRight:
//                                                     "1px solid lightgray",
//                                                 }}
//                                               >
//                                                 <TextField
//                                                   name="quantity"
//                                                   type="number"
//                                                   value={item.quantity || ""}
//                                                   fullWidth
//                                                   onChange={(e) =>
//                                                     handleItemChange(index, e)
//                                                   }
//                                                   size="small"
//                                                   variant="standard"
//                                                   InputProps={{
//                                                     disableUnderline: true,
//                                                   }}
//                                                   sx={{
//                                                     "& .MuiInputBase-input": {
//                                                       height: "20px",
//                                                       textAlign: "center",
//                                                     },
//                                                   }}
//                                                 />
//                                               </TableCell>
//                                               <TableCell
//                                                 sx={{
//                                                   fontWeight: "bold",
//                                                   position: "sticky",
//                                                   top: 0,
//                                                   marginTop: "5px",
//                                                   padding: "1px",
//                                                   fontSize: "10px",
//                                                   textAlign: "center",
//                                                   width: "170px",
//                                                   borderRight:
//                                                     "1px solid lightgray",
//                                                 }}
//                                               >
//                                                 <TextField
//                                                   name="unit"
//                                                   value={item.unit.name || ""}
//                                                   InputProps={{
//                                                     readOnly: true,
//                                                     disableUnderline: true,
//                                                   }}
//                                                   size="small"
//                                                   variant="standard"
//                                                   sx={{
//                                                     "& .MuiInputBase-input": {
//                                                       height: "20px",
//                                                       textAlign: "center",
//                                                     },
//                                                   }}
//                                                 />
//                                               </TableCell>
//                                               <TableCell
//                                                 sx={{
//                                                   fontWeight: "bold",
//                                                   position: "sticky",
//                                                   top: 0,
//                                                   marginTop: "5px",
//                                                   padding: "1px",
//                                                   fontSize: "10px",
//                                                   textAlign: "center",
//                                                   width: "150px",
//                                                   borderRight:
//                                                     "1px solid lightgray",
//                                                 }}
//                                               >
//                                                 <TextField
//                                                   name="price"
//                                                   type="number"
//                                                   value={item.price || ""}
//                                                   onChange={(e) =>
//                                                     handleItemChange(index, e)
//                                                   }
//                                                   size="small"
//                                                   variant="standard"
//                                                   InputProps={{
//                                                     disableUnderline: true,
//                                                   }}
//                                                   sx={{
//                                                     "& .MuiInputBase-input": {
//                                                       height: "20px",
//                                                       textAlign: "center",
//                                                     },
//                                                   }}
//                                                 />
//                                               </TableCell>
//                                               <TableCell
//                                                 sx={{
//                                                   padding: "0px",
//                                                   fontSize: "10px",
//                                                   borderRight:
//                                                     "1px solid lightgray",
//                                                 }}
//                                                 align="center"
//                                               >
//                                                 <TextField
//                                                   name="amount"
//                                                   type="number"
//                                                   value={
//                                                     item.amount.toFixed(2) || ""
//                                                   }
//                                                   InputProps={{
//                                                     readOnly: true,
//                                                     disableUnderline: true,
//                                                   }}
//                                                   size="small"
//                                                   variant="standard"
//                                                   sx={{
//                                                     "& .MuiInputBase-input": {
//                                                       height: "20px",
//                                                       textAlign: "center",
//                                                     },
//                                                   }}
//                                                 />
//                                               </TableCell>
//                                               <TableCell
//                                                 sx={{
//                                                   padding: "0px",
//                                                   fontSize: "10px",
//                                                 }}
//                                                 align="center"
//                                               >
//                                                 <Button
//                                                   onClick={() =>
//                                                     deleteItemRow(index)
//                                                   }
//                                                   color="error"
//                                                 >
//                                                   <CancelIcon fontSize="small" />
//                                                 </Button>
//                                               </TableCell>
//                                             </TableRow>
//                                           ))}
//                                         </TableBody>
//                                       </Table>
//                                     </TableContainer>
//                                     <h5
//                                       gutterBottom
//                                       className="text-end me-2 mt-2"
//                                     >
//                                       <span
//                                         className=" me-2"
//                                         style={{ fontSize: "17px" }}
//                                       >
//                                         Item Amount:
//                                         <span>
//                                           <CurrencyRupeeIcon
//                                             style={{ fontSize: "18px" }}
//                                           />
//                                         </span>
//                                         <span className="fw-bold">
//                                           {formData.totalItemAmount.toFixed(2)}
//                                         </span>
//                                       </span>
//                                     </h5>

//                                     {/* Bill sundry Start */}

//                                     <div className="row mt-3 d justify-content-end">
//                                       <div className="col-xl-6 mt-1 ">
//                                         <TableContainer
//                                           component={Paper}
//                                           sx={{ maxHeight: 320 }}
//                                         >
//                                           <Table>
//                                             <TableHead>
//                                               <TableRow>
//                                                 <TableCell
//                                                   align="center"
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "4px",
//                                                     background: "#bbdefb",
//                                                   }}
//                                                   className="p-0 fw-bold fixed"
//                                                 >
//                                                   No.
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "4px",
//                                                     background: "#bbdefb",
//                                                   }}
//                                                   className="p-0 fw-bold fixed"
//                                                   align="center"
//                                                 >
//                                                   Packeging Charge
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "4px",
//                                                     background: "#bbdefb",
//                                                   }}
//                                                   className="p-0 fw-bold fixed"
//                                                   align="center"
//                                                 >
//                                                   GST
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "4px",
//                                                     background: "#bbdefb",
//                                                   }}
//                                                   className="p-0 fw-bold fixed"
//                                                   align="center"
//                                                 >
//                                                   Other Expenses
//                                                 </TableCell>
//                                               </TableRow>
//                                             </TableHead>
//                                             <TableBody
//                                               sx={{
//                                                 background: "white",
//                                                 overflowY: "auto",
//                                               }}
//                                             >
//                                               <TableRow>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "0px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <span className="ps-2 pe-2"></span>
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "0px",
//                                                     width: "200px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <TextField
//                                                     name="packingCharges"
//                                                     value={
//                                                       formData.packingCharges
//                                                     }
//                                                     onChange={handleInputChange}
//                                                     size="small"
//                                                     fullWidth
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment
//                                                           position="start"
//                                                           style={{
//                                                             marginRight: "-1px",
//                                                             marginBottom: "3px",
//                                                           }}
//                                                         >
//                                                           <CurrencyRupeeIcon
//                                                             style={{
//                                                               fontSize: "15px",
//                                                             }}
//                                                           />
//                                                         </InputAdornment>
//                                                       ),
//                                                     }}
//                                                   />
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "0px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <TextField
//                                                     label=""
//                                                     name="gstExpenses"
//                                                     value={formData.gstExpenses}
//                                                     onChange={handleInputChange}
//                                                     fullWidth
//                                                     size="small"
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment
//                                                           position="start"
//                                                           style={{
//                                                             marginRight: "-1px",
//                                                             marginBottom: "3px",
//                                                           }}
//                                                         >
//                                                           <CurrencyRupeeIcon
//                                                             style={{
//                                                               fontSize: "15px",
//                                                             }}
//                                                           />
//                                                         </InputAdornment>
//                                                       ),
//                                                     }}
//                                                   />
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "0px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <TextField
//                                                     name="otherExpenses"
//                                                     value={
//                                                       formData.otherExpenses
//                                                     }
//                                                     onChange={handleInputChange}
//                                                     size="small"
//                                                     fullWidth
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment
//                                                           position="start"
//                                                           style={{
//                                                             marginRight: "-1px",
//                                                             marginBottom: "3px",
//                                                           }}
//                                                         >
//                                                           <CurrencyRupeeIcon
//                                                             style={{
//                                                               fontSize: "15px",
//                                                             }}
//                                                           />
//                                                         </InputAdornment>
//                                                       ),
//                                                     }}
//                                                   />
//                                                 </TableCell>
//                                               </TableRow>
//                                             </TableBody>
//                                           </Table>
//                                         </TableContainer>

//                                         <h5 className="text-end me-2 mt-2">
//                                           <span
//                                             className="fw-bold me-2"
//                                             style={{ fontSize: "15px" }}
//                                           >
//                                             Bill Sundry Amount:
//                                             <CurrencyRupeeIcon
//                                               style={{ fontSize: "15px" }}
//                                             />
//                                             {formData.billSundryAmount.toFixed(
//                                               2
//                                             )}
//                                           </span>
//                                         </h5>

//                                         <h5 className="text-end me-2 mt-2">
//                                           <span
//                                             className="fw-bold me-2"
//                                             style={{ fontSize: "15px" }}
//                                           >
//                                             Total Amount:
//                                             <CurrencyRupeeIcon
//                                               style={{ fontSize: "15px" }}
//                                             />
//                                             {formData.totalAmount.toFixed(2)}
//                                           </span>
//                                         </h5>
//                                       </div>
//                                     </div>

//                                     {/* Bill sundry End */}

//                                     {/* Transport Detail Start */}
//                                     <div className="row">
//                                       <div className="col-xl-12">
//                                         <div>
//                                           <FormControlLabel
//                                             control={
//                                               <Checkbox
//                                                 checked={showTransportDetails}
//                                                 onChange={handleCheckboxChange}
//                                               />
//                                             }
//                                             label="Add Transport Details"
//                                           />
//                                           {showTransportDetails && (
//                                             <TableContainer
//                                               component={Paper}
//                                               sx={{
//                                                 maxHeight: 320,
//                                                 marginTop: 2,
//                                               }}
//                                             >
//                                               <Table>
//                                                 <TableHead>
//                                                   <TableRow>
//                                                     <TableCell
//                                                       align="center"
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "4px",
//                                                         background: "#bbdefb",
//                                                       }}
//                                                       className="p-0 fw-bold fixed"
//                                                     >
//                                                       Date
//                                                     </TableCell>
//                                                     <TableCell
//                                                       align="center"
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "4px",
//                                                         background: "#bbdefb",
//                                                       }}
//                                                       className="p-0 fw-bold fixed"
//                                                     >
//                                                       Built Number
//                                                     </TableCell>
//                                                     <TableCell
//                                                       align="center"
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "4px",
//                                                         background: "#bbdefb",
//                                                       }}
//                                                       className="p-0 fw-bold fixed"
//                                                     >
//                                                       Transporter
//                                                     </TableCell>

//                                                     <TableCell
//                                                       align="center"
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "4px",
//                                                         background: "#bbdefb",
//                                                       }}
//                                                       className="p-0 fw-bold fixed"
//                                                     >
//                                                       Lot Size
//                                                     </TableCell>
//                                                     <TableCell
//                                                       align="center"
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "4px",
//                                                         background: "#bbdefb",
//                                                       }}
//                                                       className="p-0 fw-bold fixed"
//                                                     >
//                                                       Lot Open
//                                                     </TableCell>
//                                                     <TableCell
//                                                       align="center"
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "4px",
//                                                         background: "#bbdefb",
//                                                       }}
//                                                       className="p-0 fw-bold fixed"
//                                                     >
//                                                       Lot Pending
//                                                     </TableCell>
//                                                   </TableRow>
//                                                 </TableHead>
//                                                 <TableBody
//                                                   sx={{
//                                                     background: "white",
//                                                     overflowY: "auto",
//                                                   }}
//                                                 >
//                                                   <TableRow>
//                                                     <TableCell
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "0px",
//                                                       }}
//                                                       align="center"
//                                                     >
//                                                       <TextField
//                                                         name="date"
//                                                         type="date"
//                                                         value={
//                                                           transportDetails.date
//                                                         }
//                                                         onChange={
//                                                           handleTransportDetailChange
//                                                         }
//                                                         size="small"
//                                                         variant="standard"
//                                                       />
//                                                     </TableCell>
//                                                     <TableCell
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "0px",
//                                                       }}
//                                                       align="center"
//                                                     >
//                                                       <TextField
//                                                         name="builtNumber"
//                                                         type="number"
//                                                         value={
//                                                           transportDetails.builtNumber
//                                                         }
//                                                         onChange={
//                                                           handleTransportDetailChange
//                                                         }
//                                                         size="small"
//                                                         variant="standard"
//                                                       />
//                                                     </TableCell>
//                                                     <TableCell
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "0px",
//                                                       }}
//                                                       align="center"
//                                                     >
//                                                       <TextField
//                                                         name="transporter"
//                                                         type="text"
//                                                         value={
//                                                           transportDetails.transporter
//                                                         }
//                                                         onChange={
//                                                           handleTransportDetailChange
//                                                         }
//                                                         size="small"
//                                                         variant="standard"
//                                                       />
//                                                     </TableCell>

//                                                     <TableCell
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "0px",
//                                                       }}
//                                                       align="center"
//                                                     >
//                                                       <TextField
//                                                         name="lotSize"
//                                                         type="number"
//                                                         value={
//                                                           transportDetails.lotSize
//                                                         }
//                                                         onChange={
//                                                           handleTransportDetailChange
//                                                         }
//                                                         size="small"
//                                                         variant="standard"
//                                                       />
//                                                     </TableCell>
//                                                     <TableCell
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "0px",
//                                                       }}
//                                                       align="center"
//                                                     >
//                                                       <TextField
//                                                         name="lotOpen"
//                                                         type="number"
//                                                         value={
//                                                           transportDetails.lotOpen
//                                                         }
//                                                         onChange={
//                                                           handleTransportDetailChange
//                                                         }
//                                                         size="small"
//                                                         variant="standard"
//                                                       />
//                                                     </TableCell>
//                                                     <TableCell
//                                                       sx={{
//                                                         border:
//                                                           "1px solid lightgray",
//                                                         padding: "0px",
//                                                       }}
//                                                       align="center"
//                                                     >
//                                                       <TextField
//                                                         name="lotPending"
//                                                         type="number"
//                                                         value={
//                                                           transportDetails.lotPending
//                                                         }
//                                                         onChange={
//                                                           handleTransportDetailChange
//                                                         }
//                                                         size="small"
//                                                         variant="standard"
//                                                       />
//                                                     </TableCell>
//                                                   </TableRow>
//                                                 </TableBody>
//                                               </Table>
//                                             </TableContainer>
//                                           )}
//                                         </div>
//                                       </div>
//                                     </div>
//                                     {/* Transport Detail End */}

//                                     <div className="row mt-3">
//                                       <div className="col-xl-12">
//                                         <Button
//                                           type="submit"
//                                           variant="contained"
//                                           color="primary"
//                                           className="fw-bold"
//                                         >
//                                           Save
//                                         </Button>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
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
//       <ToastContainer />
//     </div>
//   );
// }

//=======================================================================================//

import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Stack,
  Grid,
  Button,
  FormControl,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CssBaseline,
  Autocomplete,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../../../schema/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CancelIcon from "@mui/icons-material/Cancel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import api from "../../../../services/api";

const breadcrumbs = [
  <Link key="1" to="/purchase_voucher_list">
    Purchase Voucher
  </Link>,
  <Typography key="3" color="text.secondary">
    Add Purchase Voucher
  </Typography>,
];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function AddSalesVoucher() {
  const [formData, setFormData] = useState({
    buyerName: "",
    saleDate: new Date().toISOString().split("T")[0],
    saleVoucherNo: "",
    sellerVoucherNo: "",
    itemsList: [],
    packingCharges: 0,
    gstExpenses: 0,
    otherExpenses: 0,
    totalItemAmount: 0,
    billSundryAmount: 0,
    totalAmount: 0,
    accountId: "",
    buyerRateType: "", // To store the rate type
  });

  const [itemsList, setItemsList] = useState(
    Array.from({ length: 10 }, () => ({
      item: "",
      quantity: "",
      unit: "",
      price: "",
      amount: 0,
    }))
  );

  const [accounts, setAccounts] = useState([]);
  const [items, setItems] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle date value
    if (name === "saleDate") {
      setFormData({
        ...formData,
        [name]: value,
      });
      return;
    }

    const updatedValue = parseFloat(value) || 0; // Ensure value is a number
    let updatedFormData = { ...formData, [name]: updatedValue };

    if (name === "gstExpenses") {
      const gstAmount = (formData.totalItemAmount * updatedValue) / 100;
      updatedFormData = { ...updatedFormData, gstAmount };
    }

    const billSundryAmount =
      updatedFormData.packingCharges +
      (updatedFormData.gstAmount || updatedFormData.gstExpenses) +
      updatedFormData.otherExpenses;
    const totalAmount = updatedFormData.totalItemAmount + billSundryAmount;

    setFormData({
      ...updatedFormData,
      billSundryAmount,
      totalAmount,
    });
  };

  useEffect(() => {
    // Fetch the next sales voucher number when the component loads
    const fetchNextSalesVoucherNo = async () => {
      try {
        const response = await api.get("/api/get-next-sales-voucher-no");
        const nextVoucherNo = response.data.nextVoucherNo;
        setFormData((prevData) => ({
          ...prevData,
          saleVoucherNo: nextVoucherNo, // Update the key to match your form data
        }));
      } catch (error) {
        console.error("Failed to fetch next sales voucher number:", error);
      }
    };

    fetchNextSalesVoucherNo();
  }, []);

  // Optionally, you can also keep the separate fetch function if needed
  const fetchNextSalesVoucherNo = async () => {
    try {
      const response = await api.get("/api/get-next-sales-voucher-no");
      return response.data.nextVoucherNo;
    } catch (error) {
      console.error("Failed to fetch next sales voucher number:", error);
      throw new Error("Error fetching next voucher number");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!formData.buyerName) {
  //     toast.error("Please select a buyer name.");
  //     return;
  //   }

  //   console.log("Form data before submission:", formData);

  //   // Filter out items with empty fields
  //   const nonEmptyItemsList = itemsList.filter(
  //     (item) => item.item && item.quantity && item.unit && item.price
  //   );

  //   const finalFormData = {
  //     ...formData,
  //     itemsList: nonEmptyItemsList.map((item) => ({
  //       item: item.item, // Ensure this is set to the ObjectId
  //       quantity: item.quantity,
  //       unit: item.unit,
  //       price: item.price,
  //       amount: item.amount,
  //     })),
  //     transportDetails: showTransportDetails ? transportDetails : {},
  //   };

  //   console.log("Final form data being sent:", finalFormData);

  //   try {
  //     const response = await api.post("/api/sale-vouchers/add", finalFormData, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.status === 201 || response.status === 200) {
  //       toast.success("Sales Voucher Added Successfully!");
  //       // resetForm(); // Reset the form on success

  //       const nextVoucherNo = await fetchNextSalesVoucherNo();
  //       resetForm(nextVoucherNo);
  //     } else {
  //       toast.error("Failed to add Sales Voucher.");
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Error during submission:",
  //       error.response?.data || error.message
  //     );
  //     toast.error(
  //       "An error occurred while submitting the form. Please try again."
  //     );
  //   }
  // };

  
  // const resetForm = () => {

  //   setFormData({
  //     buyerName: "",
  //     saleDate: new Date().toISOString().split("T")[0],
  //     saleVoucherNo: "",
  //     sellerVoucherNo: "",
  //     itemsList: Array(10).fill({
  //       item: "",
  //       quantity: null,
  //       unit: "",

  //       price: "",

  //       amount: "",
  //     }),
  //     packingCharges: 0,
  //     gstExpenses: 0,
  //     otherExpenses: 0,
  //     totalItemAmount: 0,
  //     billSundryAmount: 0,
  //     totalAmount: 0,
  //     accountId: "",
  //     buyerRateType: "",
  //   });

  //   // Reset itemsList to 10 empty fields
  //   setItemsList(
  //     Array.from({ length: 10 }, () => ({
  //       item: "",
  //       quantity: "",
  //       unit: "",
  //       price: "",
  //       amount: 0,
  //     }))
  //   );

  //   // Reset transport details if applicable
  //   setTransportDetails({
  //     builtNumber: "",
  //     transporter: "",
  //     date: "",
  //     lotSize: "",
  //     lotOpen: "",
  //     lotPending: "",
  //   });
  //   setShowTransportDetails(false);
  // };



const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.buyerName) {
    toast.error("Please select a buyer name.");
    return;
  }

  console.log("Form data before submission:", formData);

  // Filter out items with empty fields
  const nonEmptyItemsList = itemsList.filter(
    (item) => item.item && item.quantity && item.unit && item.price
  );

  const finalFormData = {
    ...formData,
    itemsList: nonEmptyItemsList.map((item) => ({
      item: item.item,
      quantity: item.quantity,
      unit: item.unit,
      price: item.price,
      amount: item.amount,
    })),
    transportDetails: showTransportDetails ? transportDetails : {},
  };

  console.log("Final form data being sent:", finalFormData);

  try {
    const response = await api.post("/api/sale-vouchers/add", finalFormData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201 || response.status === 200) {
      toast.success("Sales Voucher Added Successfully!");

      // Fetch the next voucher number and reset form
      const nextVoucherNo = await fetchNextSalesVoucherNo();
      resetForm(nextVoucherNo);
    } else {
      toast.error("Failed to add Sales Voucher.");
    }
  } catch (error) {
    console.error("Error during submission:", error.response?.data || error.message);
    toast.error("An error occurred while submitting the form. Please try again.");
  }
};

  const resetForm = async (nextVoucherNo) => {
    // Set formData to initial state
    setFormData({
      buyerName: "",
      saleDate: new Date().toISOString().split("T")[0],
      saleVoucherNo: nextVoucherNo || "", // Use nextVoucherNo if provided
      sellerVoucherNo: "",
      itemsList: Array.from({ length: 10 }, () => ({
        item: "",
        quantity: "",
        unit: "",
        price: "",
        amount: 0,
      })),
      packingCharges: 0,
      gstExpenses: 0,
      otherExpenses: 0,
      totalItemAmount: 0,
      billSundryAmount: 0,
      totalAmount: 0,
      accountId: "",
      buyerRateType: "",
    });
  
    // Reset transport details if applicable
    setTransportDetails({
      builtNumber: "",
      transporter: "",
      date: "",
      lotSize: "",
      lotOpen: "",
      lotPending: "",
    });
  
    setShowTransportDetails(false);
  };
  
  // Function to handle item list changes
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItemsList = [...itemsList];
    newItemsList[index][name] = value;

    // Calculate amount for each item
    if (name === "quantity" || name === "price") {
      newItemsList[index].amount =
        newItemsList[index].quantity * newItemsList[index].price;
    }

    setItemsList(newItemsList);

    // Calculate total item amount
    const totalItemAmount = newItemsList.reduce(
      (total, item) => total + item.amount,
      0
    );
    setFormData({ ...formData, itemsList: newItemsList, totalItemAmount });
  };

  // Function to add a new item row
  const addItemRow = () => {
    setItemsList([
      ...itemsList,
      { item: "", quantity: "", unit: "", price: "", amount: 0 },
    ]);
  };

  // Function to delete an item row
  const deleteItemRow = (index) => {
    const newItemsList = [...itemsList];
    newItemsList.splice(index, 1);
    setItemsList(newItemsList);

    // Recalculate total item amount after deletion
    const totalItemAmount = newItemsList.reduce(
      (total, item) => total + item.amount,
      0
    );
    setFormData({ ...formData, itemsList: newItemsList, totalItemAmount });
  };

  // Fetch accounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await api.get("/api/accounts");
        setAccounts(response.data);
      } catch (error) {
        toast.error("Failed to fetch accounts.");
      }
    };
    fetchAccounts();
  }, []);

  // Fetch items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get("/api/jewelry-items");
        setItems(response.data);
      } catch (error) {
        toast.error("Failed to fetch items.");
      }
    };
    fetchItems();
  }, []);

  // Fetch item data based on buyer's rate type
  const fetchItemData = async (itemId, rateType) => {
    try {
      const response = await api.get(`/api/jewelry-items/${itemId}`);
      const {
        _id,
        unit,
        retailerPrice,
        semiWholesellerPrice,
        wholesellerPrice,
      } = response.data;

      const price =
        rateType === "Retailer"
          ? retailerPrice
          : rateType === "Semi Wholeseller"
          ? semiWholesellerPrice
          : wholesellerPrice;

      return { _id, unit, price };
    } catch (error) {
      console.error("Error fetching item data:", error);
      return { _id: itemId, unit: "", price: 0 }; // Fallback
    }
  };

  // Handle buyer selection
  const handleBuyerSelect = async (value) => {
    if (value) {
      setFormData({
        ...formData,
        buyerName: value.name,
        accountId: value._id,
        buyerRateType: value.rateType, // Set the rate type from the account
      });
    }
  };

  // Handle item selection
  const handleItemSelect = async (index, selectedItem) => {
    const newItemsList = [...itemsList];
    if (selectedItem) {
      const { price, unit } = await fetchItemData(
        selectedItem._id,
        formData.buyerRateType
      );
      newItemsList[index] = {
        ...newItemsList[index],
        item: selectedItem._id,
        unit: unit,
        price: price,
        amount: 0, // Reset amount when item changes
      };
      setItemsList(newItemsList);
    }
  };

  const [showTransportDetails, setShowTransportDetails] = useState(false);
  const [transportDetails, setTransportDetails] = useState({
    builtNumber: "",
    transporter: "",
    date: "",
    lotSize: "",
    lotOpen: "",
    lotPending: "",
  });

  const handleTransportDetailChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // If the value is meant to be a number, convert it
    if (name === "lotSize" || name === "lotOpen") {
      newValue = parseFloat(value) || 0;
    }

    setTransportDetails((prevDetails) => {
      const updatedDetails = {
        ...prevDetails,
        [name]: newValue,
      };

      // Calculate lotPending if both lotSize and lotOpen are defined
      if (updatedDetails.lotSize !== "" && updatedDetails.lotOpen !== "") {
        updatedDetails.lotPending =
          updatedDetails.lotSize - updatedDetails.lotOpen;
      }

      return updatedDetails;
    });
  };

  const handleCheckboxChange = (e) => {
    setShowTransportDetails(e.target.checked);
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 ">
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <Header />
              <Box component="main" sx={{ flexGrow: 1 }}>
                <DrawerHeader />
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="row d-flex justify-content-between">
                        <div className="col-xl-12">
                          <h4 className="fw-bold text-center">
                            Add Sales Voucher
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <Box component="form" onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-xl-12 mx-auto p-2">
                            <div className="row">
                              <div
                                className="row mx-auto d-flex p-3"
                                style={{
                                  border: "1px solid lightgray",
                                  borderRadius: "5px",
                                }}
                              >
                                <div className="row">
                                  <div className="col-xl-3">
                                    <FormControl fullWidth>
                                      <Autocomplete
                                        options={accounts}
                                        getOptionLabel={(option) => option.name}
                                        onChange={(event, value) =>
                                          handleBuyerSelect(value)
                                        }
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            label="Buyer Name"
                                            size="small"
                                            variant="outlined"
                                          />
                                        )}
                                      />
                                    </FormControl>
                                  </div>
                                  <div className="col-xl-3">
                                    <FormControl fullWidth>
                                      <TextField
                                        label="Sale Date"
                                        name="saleDate"
                                        type="date"
                                        value={formData.saleDate}
                                        onChange={handleInputChange}
                                        size="small"
                                        InputLabelProps={{ shrink: true }}
                                        required
                                      />
                                    </FormControl>
                                  </div>
                                  <div className="col-xl-3">
                                    <FormControl fullWidth>
                                      <TextField
                                        label="Sale Voucher No"
                                        name="saleVoucherNo"
                                        value={formData.saleVoucherNo}
                                        onChange={handleInputChange}
                                        size="small"
                                        InputLabelProps={{ shrink: true }}
                                        required
                                      />
                                    </FormControl>
                                  </div>

                                  <div className="col-xl-3">
                                    <FormControl fullWidth>
                                      <TextField
                                        label="Seller Voucher No"
                                        name="sellerVoucherNo"
                                        value={formData.sellerVoucherNo}
                                        onChange={handleInputChange}
                                        size="small"
                                        InputLabelProps={{ shrink: true }}
                                        required
                                      />
                                    </FormControl>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-xl-12 d-flex justify-content-end mt-2">
                                    <Button
                                      type="button"
                                      variant="contained"
                                      color="secondary"
                                      onClick={addItemRow}
                                      className="me-2"
                                      size="small"
                                    >
                                      Add Item
                                    </Button>
                                  </div>
                                  <div className="col-xl-12 mt-2">
                                    <TableContainer
                                      component={Paper}
                                      sx={{ maxHeight: 300 }}
                                    >
                                      <Table>
                                        <TableHead
                                          style={{ background: "#bbdefb" }}
                                        >
                                          <TableRow>
                                            <TableCell
                                              sx={{
                                                border: "1px solid lightgray",
                                                padding: "4px",
                                                background: "#bbdefb",
                                              }}
                                              className="p-0 fw-bold"
                                              align="center"
                                            >
                                              #
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                border: "1px solid lightgray",
                                                padding: "4px",
                                                background: "#bbdefb",
                                              }}
                                              className="p-0 fw-bold"
                                              align="center"
                                            >
                                              Item
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                border: "1px solid lightgray",
                                                padding: "4px",
                                                background: "#bbdefb",
                                              }}
                                              className="p-0 fw-bold"
                                              align="center"
                                            >
                                              Quantity
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                border: "1px solid lightgray",
                                                padding: "4px",
                                                background: "#bbdefb",
                                              }}
                                              className="p-0 fw-bold"
                                              align="center"
                                            >
                                              Unit
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                border: "1px solid lightgray",
                                                padding: "4px",
                                                background: "#bbdefb",
                                              }}
                                              className="p-0 fw-bold"
                                              align="center"
                                            >
                                              Price(Rs.)
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                border: "1px solid lightgray",
                                                padding: "4px",
                                                background: "#bbdefb",
                                              }}
                                              className="p-0 fw-bold"
                                              align="center"
                                            >
                                              Amount(Rs.)
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                border: "1px solid lightgray",
                                                padding: "4px",
                                                background: "#bbdefb",
                                              }}
                                              className="p-0 fw-bold"
                                              align="center"
                                            >
                                              Actions
                                            </TableCell>
                                          </TableRow>
                                        </TableHead>

                                        <TableBody sx={{ background: "white" }}>
                                          {itemsList.map((item, index) => (
                                            <TableRow
                                              key={index}
                                              sx={{
                                                height: "15px",
                                                borderBottom:
                                                  "1px solid lightgray",
                                              }}
                                            >
                                              <TableCell
                                                sx={{
                                                  fontWeight: "bold",
                                                  position: "sticky",
                                                  top: 0,
                                                  zIndex: 1,
                                                  padding: "1px",
                                                  fontSize: "13px",
                                                  textAlign: "center",
                                                  borderRight:
                                                    "1px solid lightgray",
                                                }}
                                              >
                                                <span>{index + 1}</span>
                                              </TableCell>
                                              <TableCell
                                                sx={{
                                                  padding: "0px",
                                                  width: "250px",
                                                  fontSize: "10px",
                                                  borderRight:
                                                    "1px solid lightgray",
                                                }}
                                              >
                                                <FormControl fullWidth>
                                                  <Autocomplete
                                                    options={items}
                                                    getOptionLabel={(option) =>
                                                      option.name
                                                    }
                                                    onChange={(event, value) =>
                                                      handleItemSelect(
                                                        index,
                                                        value
                                                      )
                                                    }
                                                    renderInput={(params) => (
                                                      <TextField
                                                        {...params}
                                                        label=""
                                                        size="small"
                                                        variant="standard"
                                                        InputProps={{
                                                          ...params.InputProps,
                                                          disableUnderline: true,
                                                        }}
                                                        sx={{
                                                          "& .MuiInputBase-input":
                                                            {
                                                              height: "20px",
                                                              fontSize: "13px",
                                                              textAlign:
                                                                "center",
                                                            },
                                                        }}
                                                      />
                                                    )}
                                                  />
                                                </FormControl>
                                              </TableCell>
                                              <TableCell
                                                sx={{
                                                  padding: "0px",
                                                  width: "150px",
                                                  fontSize: "10px",
                                                  borderRight:
                                                    "1px solid lightgray",
                                                }}
                                              >
                                                <TextField
                                                  name="quantity"
                                                  type="number"
                                                  value={item.quantity || ""}
                                                  fullWidth
                                                  onChange={(e) =>
                                                    handleItemChange(index, e)
                                                  }
                                                  size="small"
                                                  variant="standard"
                                                  InputProps={{
                                                    disableUnderline: true,
                                                  }}
                                                  sx={{
                                                    "& .MuiInputBase-input": {
                                                      height: "20px",
                                                      textAlign: "center",
                                                    },
                                                  }}
                                                />
                                              </TableCell>
                                              <TableCell
                                                sx={{
                                                  fontWeight: "bold",
                                                  position: "sticky",
                                                  top: 0,
                                                  marginTop: "5px",
                                                  padding: "1px",
                                                  fontSize: "10px",
                                                  textAlign: "center",
                                                  width: "170px",
                                                  borderRight:
                                                    "1px solid lightgray",
                                                }}
                                              >
                                                <TextField
                                                  name="unit"
                                                  value={item.unit.name || ""}
                                                  InputProps={{
                                                    readOnly: true,
                                                    disableUnderline: true,
                                                  }}
                                                  size="small"
                                                  variant="standard"
                                                  sx={{
                                                    "& .MuiInputBase-input": {
                                                      height: "20px",
                                                      textAlign: "center",
                                                    },
                                                  }}
                                                />
                                              </TableCell>
                                              <TableCell
                                                sx={{
                                                  fontWeight: "bold",
                                                  position: "sticky",
                                                  top: 0,
                                                  marginTop: "5px",
                                                  padding: "1px",
                                                  fontSize: "10px",
                                                  textAlign: "center",
                                                  width: "150px",
                                                  borderRight:
                                                    "1px solid lightgray",
                                                }}
                                              >
                                                <TextField
                                                  name="price"
                                                  type="number"
                                                  value={item.price || ""}
                                                  onChange={(e) =>
                                                    handleItemChange(index, e)
                                                  }
                                                  size="small"
                                                  variant="standard"
                                                  InputProps={{
                                                    disableUnderline: true,
                                                  }}
                                                  sx={{
                                                    "& .MuiInputBase-input": {
                                                      height: "20px",
                                                      textAlign: "center",
                                                    },
                                                  }}
                                                />
                                              </TableCell>
                                              <TableCell
                                                sx={{
                                                  padding: "0px",
                                                  fontSize: "10px",
                                                  borderRight:
                                                    "1px solid lightgray",
                                                }}
                                                align="center"
                                              >
                                                <TextField
                                                  name="amount"
                                                  type="number"
                                                  value={
                                                    item.amount.toFixed(2) || ""
                                                  }
                                                  InputProps={{
                                                    readOnly: true,
                                                    disableUnderline: true,
                                                  }}
                                                  size="small"
                                                  variant="standard"
                                                  sx={{
                                                    "& .MuiInputBase-input": {
                                                      height: "20px",
                                                      textAlign: "center",
                                                    },
                                                  }}
                                                />
                                              </TableCell>
                                              <TableCell
                                                sx={{
                                                  padding: "0px",
                                                  fontSize: "10px",
                                                }}
                                                align="center"
                                              >
                                                <Button
                                                  onClick={() =>
                                                    deleteItemRow(index)
                                                  }
                                                  color="error"
                                                >
                                                  <CancelIcon fontSize="small" />
                                                </Button>
                                              </TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                    <h5
                                      gutterBottom
                                      className="text-end me-2 mt-2"
                                    >
                                      <span
                                        className=" me-2"
                                        style={{ fontSize: "17px" }}
                                      >
                                        Item Amount:
                                        <span>
                                          <CurrencyRupeeIcon
                                            style={{ fontSize: "18px" }}
                                          />
                                        </span>
                                        <span className="fw-bold">
                                          {formData.totalItemAmount.toFixed(2)}
                                        </span>
                                      </span>
                                    </h5>

                                    {/* Bill sundry Start */}

                                    <div className="row mt-3 d justify-content-end">
                                      <div className="col-xl-6 mt-1 ">
                                        <TableContainer
                                          component={Paper}
                                          sx={{ maxHeight: 320 }}
                                        >
                                          <Table>
                                            <TableHead>
                                              <TableRow>
                                                <TableCell
                                                  align="center"
                                                  sx={{
                                                    border:
                                                      "1px solid lightgray",
                                                    padding: "4px",
                                                    background: "#bbdefb",
                                                  }}
                                                  className="p-0 fw-bold fixed"
                                                >
                                                  No.
                                                </TableCell>
                                                <TableCell
                                                  sx={{
                                                    border:
                                                      "1px solid lightgray",
                                                    padding: "4px",
                                                    background: "#bbdefb",
                                                  }}
                                                  className="p-0 fw-bold fixed"
                                                  align="center"
                                                >
                                                  Packeging Charge
                                                </TableCell>
                                                <TableCell
                                                  sx={{
                                                    border:
                                                      "1px solid lightgray",
                                                    padding: "4px",
                                                    background: "#bbdefb",
                                                  }}
                                                  className="p-0 fw-bold fixed"
                                                  align="center"
                                                >
                                                  GST
                                                </TableCell>
                                                <TableCell
                                                  sx={{
                                                    border:
                                                      "1px solid lightgray",
                                                    padding: "4px",
                                                    background: "#bbdefb",
                                                  }}
                                                  className="p-0 fw-bold fixed"
                                                  align="center"
                                                >
                                                  Other Expenses
                                                </TableCell>
                                              </TableRow>
                                            </TableHead>
                                            <TableBody
                                              sx={{
                                                background: "white",
                                                overflowY: "auto",
                                              }}
                                            >
                                              <TableRow>
                                                <TableCell
                                                  sx={{
                                                    border:
                                                      "1px solid lightgray",
                                                    padding: "0px",
                                                  }}
                                                  align="center"
                                                >
                                                  <span className="ps-2 pe-2"></span>
                                                </TableCell>
                                                <TableCell
                                                  sx={{
                                                    border:
                                                      "1px solid lightgray",
                                                    padding: "0px",
                                                    width: "200px",
                                                  }}
                                                  align="center"
                                                >
                                                  <TextField
                                                    name="packingCharges"
                                                    value={
                                                      formData.packingCharges
                                                    }
                                                    onChange={handleInputChange}
                                                    size="small"
                                                    fullWidth
                                                    variant="standard"
                                                    InputProps={{
                                                      startAdornment: (
                                                        <InputAdornment
                                                          position="start"
                                                          style={{
                                                            marginRight: "-1px",
                                                            marginBottom: "3px",
                                                          }}
                                                        >
                                                          <CurrencyRupeeIcon
                                                            style={{
                                                              fontSize: "15px",
                                                            }}
                                                          />
                                                        </InputAdornment>
                                                      ),
                                                    }}
                                                  />
                                                </TableCell>
                                                <TableCell
                                                  sx={{
                                                    border:
                                                      "1px solid lightgray",
                                                    padding: "0px",
                                                  }}
                                                  align="center"
                                                >
                                                  <TextField
                                                    label=""
                                                    name="gstExpenses"
                                                    value={formData.gstExpenses}
                                                    onChange={handleInputChange}
                                                    fullWidth
                                                    size="small"
                                                    variant="standard"
                                                    InputProps={{
                                                      startAdornment: (
                                                        <InputAdornment
                                                          position="start"
                                                          style={{
                                                            marginRight: "-1px",
                                                            marginBottom: "3px",
                                                          }}
                                                        >
                                                          <CurrencyRupeeIcon
                                                            style={{
                                                              fontSize: "15px",
                                                            }}
                                                          />
                                                        </InputAdornment>
                                                      ),
                                                    }}
                                                  />
                                                </TableCell>
                                                <TableCell
                                                  sx={{
                                                    border:
                                                      "1px solid lightgray",
                                                    padding: "0px",
                                                  }}
                                                  align="center"
                                                >
                                                  <TextField
                                                    name="otherExpenses"
                                                    value={
                                                      formData.otherExpenses
                                                    }
                                                    onChange={handleInputChange}
                                                    size="small"
                                                    fullWidth
                                                    variant="standard"
                                                    InputProps={{
                                                      startAdornment: (
                                                        <InputAdornment
                                                          position="start"
                                                          style={{
                                                            marginRight: "-1px",
                                                            marginBottom: "3px",
                                                          }}
                                                        >
                                                          <CurrencyRupeeIcon
                                                            style={{
                                                              fontSize: "15px",
                                                            }}
                                                          />
                                                        </InputAdornment>
                                                      ),
                                                    }}
                                                  />
                                                </TableCell>
                                              </TableRow>
                                            </TableBody>
                                          </Table>
                                        </TableContainer>

                                        <h5 className="text-end me-2 mt-2">
                                          <span
                                            className="fw-bold me-2"
                                            style={{ fontSize: "15px" }}
                                          >
                                            Bill Sundry Amount:
                                            <CurrencyRupeeIcon
                                              style={{ fontSize: "15px" }}
                                            />
                                            {formData.billSundryAmount.toFixed(
                                              2
                                            )}
                                          </span>
                                        </h5>

                                        <h5 className="text-end me-2 mt-2">
                                          <span
                                            className="fw-bold me-2"
                                            style={{ fontSize: "15px" }}
                                          >
                                            Total Amount:
                                            <CurrencyRupeeIcon
                                              style={{ fontSize: "15px" }}
                                            />
                                            {formData.totalAmount.toFixed(2)}
                                          </span>
                                        </h5>
                                      </div>
                                    </div>

                                    {/* Bill sundry End */}

                                    {/* Transport Detail Start */}
                                    <div className="row">
                                      <div className="col-xl-12">
                                        <div>
                                          <FormControlLabel
                                            control={
                                              <Checkbox
                                                checked={showTransportDetails}
                                                onChange={handleCheckboxChange}
                                              />
                                            }
                                            label="Add Transport Details"
                                          />
                                          {showTransportDetails && (
                                            <TableContainer
                                              component={Paper}
                                              sx={{
                                                maxHeight: 320,
                                                marginTop: 2,
                                              }}
                                            >
                                              <Table>
                                                <TableHead>
                                                  <TableRow>
                                                    <TableCell
                                                      align="center"
                                                      sx={{
                                                        border:
                                                          "1px solid lightgray",
                                                        padding: "4px",
                                                        background: "#bbdefb",
                                                      }}
                                                      className="p-0 fw-bold fixed"
                                                    >
                                                      Date
                                                    </TableCell>
                                                    <TableCell
                                                      align="center"
                                                      sx={{
                                                        border:
                                                          "1px solid lightgray",
                                                        padding: "4px",
                                                        background: "#bbdefb",
                                                      }}
                                                      className="p-0 fw-bold fixed"
                                                    >
                                                      Built Number
                                                    </TableCell>
                                                    <TableCell
                                                      align="center"
                                                      sx={{
                                                        border:
                                                          "1px solid lightgray",
                                                        padding: "4px",
                                                        background: "#bbdefb",
                                                      }}
                                                      className="p-0 fw-bold fixed"
                                                    >
                                                      Transporter
                                                    </TableCell>

                                                    <TableCell
                                                      align="center"
                                                      sx={{
                                                        border:
                                                          "1px solid lightgray",
                                                        padding: "4px",
                                                        background: "#bbdefb",
                                                      }}
                                                      className="p-0 fw-bold fixed"
                                                    >
                                                      Lot Size
                                                    </TableCell>
                                                    <TableCell
                                                      align="center"
                                                      sx={{
                                                        border:
                                                          "1px solid lightgray",
                                                        padding: "4px",
                                                        background: "#bbdefb",
                                                      }}
                                                      className="p-0 fw-bold fixed"
                                                    >
                                                      Lot Open
                                                    </TableCell>
                                                    <TableCell
                                                      align="center"
                                                      sx={{
                                                        border:
                                                          "1px solid lightgray",
                                                        padding: "4px",
                                                        background: "#bbdefb",
                                                      }}
                                                      className="p-0 fw-bold fixed"
                                                    >
                                                      Lot Pending
                                                    </TableCell>
                                                  </TableRow>
                                                </TableHead>
                                                <TableBody
                                                  sx={{
                                                    background: "white",
                                                    overflowY: "auto",
                                                  }}
                                                >
                                                  <TableRow>
                                                    <TableCell
                                                      sx={{
                                                        border:
                                                          "1px solid lightgray",
                                                        padding: "0px",
                                                      }}
                                                      align="center"
                                                    >
                                                      <TextField
                                                        name="date"
                                                        type="date"
                                                        value={
                                                          transportDetails.date
                                                        }
                                                        onChange={
                                                          handleTransportDetailChange
                                                        }
                                                        size="small"
                                                        variant="standard"
                                                      />
                                                    </TableCell>
                                                    <TableCell
                                                      sx={{
                                                        border:
                                                          "1px solid lightgray",
                                                        padding: "0px",
                                                      }}
                                                      align="center"
                                                    >
                                                      <TextField
                                                        name="builtNumber"
                                                        type="number"
                                                        value={
                                                          transportDetails.builtNumber
                                                        }
                                                        onChange={
                                                          handleTransportDetailChange
                                                        }
                                                        size="small"
                                                        variant="standard"
                                                      />
                                                    </TableCell>
                                                    <TableCell
                                                      sx={{
                                                        border:
                                                          "1px solid lightgray",
                                                        padding: "0px",
                                                      }}
                                                      align="center"
                                                    >
                                                      <TextField
                                                        name="transporter"
                                                        type="text"
                                                        value={
                                                          transportDetails.transporter
                                                        }
                                                        onChange={
                                                          handleTransportDetailChange
                                                        }
                                                        size="small"
                                                        variant="standard"
                                                      />
                                                    </TableCell>

                                                    <TableCell
                                                      sx={{
                                                        border:
                                                          "1px solid lightgray",
                                                        padding: "0px",
                                                      }}
                                                      align="center"
                                                    >
                                                      <TextField
                                                        name="lotSize"
                                                        type="number"
                                                        value={
                                                          transportDetails.lotSize
                                                        }
                                                        onChange={
                                                          handleTransportDetailChange
                                                        }
                                                        size="small"
                                                        variant="standard"
                                                      />
                                                    </TableCell>
                                                    <TableCell
                                                      sx={{
                                                        border:
                                                          "1px solid lightgray",
                                                        padding: "0px",
                                                      }}
                                                      align="center"
                                                    >
                                                      <TextField
                                                        name="lotOpen"
                                                        type="number"
                                                        value={
                                                          transportDetails.lotOpen
                                                        }
                                                        onChange={
                                                          handleTransportDetailChange
                                                        }
                                                        size="small"
                                                        variant="standard"
                                                      />
                                                    </TableCell>
                                                    <TableCell
                                                      sx={{
                                                        border:
                                                          "1px solid lightgray",
                                                        padding: "0px",
                                                      }}
                                                      align="center"
                                                    >
                                                      <TextField
                                                        name="lotPending"
                                                        type="number"
                                                        value={
                                                          transportDetails.lotPending
                                                        }
                                                        onChange={
                                                          handleTransportDetailChange
                                                        }
                                                        size="small"
                                                        variant="standard"
                                                      />
                                                    </TableCell>
                                                  </TableRow>
                                                </TableBody>
                                              </Table>
                                            </TableContainer>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    {/* Transport Detail End */}

                                    <div className="row mt-3">
                                      <div className="col-xl-12">
                                        <Button
                                          type="submit"
                                          variant="contained"
                                          color="primary"
                                          className="fw-bold"
                                        >
                                          Save
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
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
      <ToastContainer />
    </div>
  );
}
