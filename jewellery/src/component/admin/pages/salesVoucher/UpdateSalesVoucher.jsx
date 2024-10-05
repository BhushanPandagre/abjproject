// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { styled } from "@mui/material/styles";

// import CancelIcon from "@mui/icons-material/Cancel";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import InputAdornment from "@mui/material/InputAdornment";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import {
//   Box,
//   CssBaseline,
//   TextField,
//   FormControl,
//   Autocomplete,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import Header from "../../../schema/Header";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// export default function UpdateSalesVoucher() {
//   return (
//     <div>
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-xl-12 ">
//               <Box sx={{ display: "flex" }}>
//                 <CssBaseline />
//                 <Header />
//                 <Box component="main" sx={{ flexGrow: 1 }}>
//                   <DrawerHeader />
//                   <div className="container-fluid">
//                     <div className="row">
//                       <div className="col-xl-12">
//                         <div className="row d-flex justify-content-between">
//                           <div className="col-xl-12">
//                             <h4 className="fw-bold text-center">
//                               Update Sales Voucher
//                             </h4>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row">
//                       <div className="col-xl-12">
//                         <Box component="form" 
//                         // onSubmit={handleSubmit}
//                         >
//                           <ToastContainer />
//                           <div className="row">
//                             <div className="col-xl-12 mx-auto p-4">
//                               <div className="row">
//                                 <div
//                                   className="row mx-auto d-flex p-3"
//                                   style={{
//                                     border: "1px solid lightgray",
//                                     borderRadius: "5px",
//                                   }}
//                                 >
//                                   <div className="row">
//                                     <div className="col-xl-3">
//                                       {/* <FormControl fullWidth>
//                                     <Autocomplete
//                                       options={suppliers}
//                                       getOptionLabel={(option) => option.name}
//                                       value={selectedSupplier}
//                                       onChange={handleSupplierChange}
//                                       renderInput={(params) => (
//                                         <TextField
//                                           {...params}
//                                           label="Select Supplier"
//                                           size="small"
//                                         />
//                                       )}
//                                     />
//                                   </FormControl> */}

//                                       <FormControl fullWidth margin="normal">
//                                         <Autocomplete
//                                         //   options={companies.map(
//                                         //     (company) => company.name
//                                         //   )}
//                                         //   value={formData.companyName || ""}
//                                         //   onChange={(e, newValue) => {
//                                         //     const selectedCompany =
//                                         //       companies.find(
//                                         //         (company) =>
//                                         //           company.name === newValue
//                                         //       );
//                                         //     const supplierName = selectedCompany
//                                         //       ? selectedCompany.supplierName
//                                         //       : "";

//                                         //     setFormData((prevState) => ({
//                                         //       ...prevState,
//                                         //       companyName: newValue,
//                                         //       supplierName,
//                                         //     }));

//                                         //     const selectedSupplier =
//                                         //       suppliers.find(
//                                         //         (supplier) =>
//                                         //           supplier.name === supplierName
//                                         //       );
//                                         //     setSelectedSupplier(selectedSupplier);
//                                         //   }}
//                                           renderInput={(params) => (
//                                             <TextField
//                                               {...params}
//                                               label="Company Name"
//                                               size="small"
//                                               variant="outlined"
//                                             />
//                                           )}
//                                         />
//                                       </FormControl>
//                                     </div>
//                                     <div className="col-xl-3">
//                                       {/* <FormControl fullWidth>
//                                     <TextField
//                                       name="voucherNo"
//                                       label="Voucher No"
//                                       // value={formData.voucherNo}
//                                       // onChange={handleChange}
//                                       required
//                                       size="small"
//                                     />
//                                   </FormControl> */}

//                                       <FormControl fullWidth margin="normal">
//                                         <Autocomplete
//                                         //   options={suppliers.map(
//                                         //     (supplier) => supplier.name
//                                         //   )}
//                                         //   value={formData.supplierName || ""}
//                                         //   onChange={(e, newValue) => {
//                                         //     setFormData((prevState) => ({
//                                         //       ...prevState,
//                                         //       supplierName: newValue,
//                                         //     }));

//                                         //     const selectedSupplier =
//                                         //       suppliers.find(
//                                         //         (supplier) =>
//                                         //           supplier.name === newValue
//                                         //       );
//                                         //     setSelectedSupplier(selectedSupplier);
//                                         //   }}
//                                           renderInput={(params) => (
//                                             <TextField
//                                             //   {...params}
//                                             //   label="Supplier Name"
//                                             //   size="small"
//                                             //   variant="outlined"

//                                             {...params}
//                                             label="Supplier Name"
//                                             size="small"
//                                             variant="outlined"


//                                             />
//                                           )}
//                                         />
//                                       </FormControl>
//                                     </div>
//                                     <div className="col-xl-3">
                                    

//                                       <FormControl fullWidth margin="normal">
//                                         <TextField
//                                         //   name="purchaseDate"
//                                           label="Sales Date"
//                                           type="date"
//                                         //   value={formData.purchaseDate || ""}
//                                         //   onChange={handleChange}
//                                           variant="outlined"
//                                           InputLabelProps={{
//                                             shrink: true,
//                                           }}
//                                           size="small"
//                                         />
//                                       </FormControl>
//                                     </div>

//                                     <div className="col-xl-3">
//                                       <FormControl fullWidth margin="normal">
//                                         <TextField
//                                           name="invoiceDate"
//                                           label="Invoice Date"
//                                           type="date"
//                                         //   value={formData.invoiceDate || ""}
//                                         //   onChange={handleChange}
//                                           variant="outlined"
//                                           InputLabelProps={{
//                                             shrink: true,
//                                           }}
//                                           size="small"
//                                         />
//                                       </FormControl>
//                                     </div>

//                                     <div className="col-xl-3">
//                                       <FormControl fullWidth margin="normal">
//                                         <TextField
//                                           name="supplierVoucherNo"
//                                           label="Supplier Voucher No"
//                                         //   value={formData.supplierVoucherNo || ""}
//                                         //   onChange={handleChange}
//                                           variant="outlined"
//                                           size="small"
//                                         />
//                                       </FormControl>
//                                     </div>
//                                     <div className="col-xl-3">
//                                       <FormControl fullWidth margin="normal">
//                                         <TextField
//                                         //   name="purchaseVoucherNo"
//                                           label="Sales Voucher No"
//                                         //   value={formData.purchaseVoucherNo || ""}
//                                         //   onChange={handleChange}
//                                           variant="outlined"
//                                           size="small"
//                                         />
//                                       </FormControl>
//                                     </div>
//                                   </div>
//                                   <div className="row">
//                                     <div className="col-xl-12 mt-3">
//                                       <TableContainer
//                                         component={Paper}
//                                         sx={{ maxHeight: 300 }}
//                                       >
//                                         <Table>
//                                           <TableHead
//                                             style={{ background: "#bbdefb" }}
//                                           >
//                                             <TableRow>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold"
//                                                 align="center"
//                                               >
//                                                 #
//                                               </TableCell>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold"
//                                                 align="center"
//                                               >
//                                                 Item
//                                               </TableCell>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold"
//                                                 align="center"
//                                               >
//                                                 Quantity
//                                               </TableCell>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold"
//                                                 align="center"
//                                               >
//                                                 Unit
//                                               </TableCell>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold"
//                                                 align="center"
//                                               >
//                                                 Price(Rs.)
//                                               </TableCell>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold"
//                                                 align="center"
//                                               >
//                                                 Amount(Rs.)
//                                               </TableCell>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold"
//                                                 align="center"
//                                               >
//                                                 Actions
//                                               </TableCell>
//                                             </TableRow>
//                                           </TableHead>

//                                           <TableBody
//                                             sx={{
//                                               background: "white",
//                                               overflowY: "auto",
//                                             }}
//                                           >
                                          
//                                             {/* {formData.itemsList.map(
//                                               (item, index) => ( */}
//                                                 {/* <TableRow key={index}>
//                                                   <TableCell
//                                                     sx={{
//                                                       border:
//                                                         "1px solid lightgray",
//                                                       padding: "0px",
//                                                     }}
//                                                     align="center"
//                                                   >
//                                                     <span className="ps-2 pe-2 pt-0 pb-0">
//                                                       {index + 1}
//                                                     </span>
//                                                   </TableCell>

//                                                   <TableCell
//                                                     sx={{
//                                                       border:
//                                                         "1px solid lightgray",
//                                                       padding: "0px",
//                                                       width: "300px",
//                                                     }}
//                                                     align="center"
//                                                   >
//                                                     <FormControl fullWidth>
//                                                       <Autocomplete
//                                                     options={getAvailableItems()}
//                                                     getOptionLabel={(
//                                                       option
//                                                     ) => option.name || ""}
//                                                     value={item.item || {}} // Pass an empty object if item.item is null or undefined
//                                                     onChange={(e, value) =>
//                                                       handleItemChange(
//                                                         index,
//                                                         value ? value._id : ""
//                                                       )
//                                                     }
//                                                     renderInput={(params) => (
//                                                       <TextField
//                                                         {...params}
//                                                         label=""
//                                                         variant="standard"
//                                                       />
//                                                     )}
//                                                   />

//                                                       <Autocomplete
//                                                         options={getAvailableItems().map(
//                                                           (item) => item.name
//                                                         )}
//                                                         value={
//                                                           item.item.name || ""
//                                                         }
//                                                         onChange={(
//                                                           e,
//                                                           newValue
//                                                         ) => {
//                                                           const selectedItem =
//                                                             items.find(
//                                                               (item) =>
//                                                                 item.name ===
//                                                                 newValue
//                                                             );
//                                                           handleItemChange(
//                                                             index,
//                                                             selectedItem._id
//                                                           );
//                                                         }}
//                                                         renderInput={(params) => (
//                                                           <TextField
//                                                             {...params}
//                                                             label=""
//                                                             variant="standard"
                                                            
//                                                           />
//                                                         )}
//                                                       />
//                                                     </FormControl>
//                                                   </TableCell>

//                                                   <TableCell
//                                                     sx={{
//                                                       border:
//                                                         "1px solid lightgray",
//                                                       padding: "0px",
//                                                     }}
//                                                     align="center"
//                                                   >
//                                                     <TextField
                                                      
                                                    
//                                                       fullWidth
//                                                       inputProps={{ min: "0" }}
//                                                       required
//                                                       variant="standard"

//                                                       name="quantity"
//                                                       value={item.quantity || ""}
//                                                       onChange={(e) => handleItemFieldChange(index, e)}
//                                                     />
//                                                   </TableCell>
//                                                   <TableCell
//                                                     sx={{
//                                                       border:
//                                                         "1px solid lightgray",
//                                                       padding: "0px",
//                                                     }}
//                                                     align="center"
//                                                   >
//                                                     <TextField
//                                                       value={
//                                                         item.unit?.name || ""
//                                                       }
//                                                       disabled
//                                                       fullWidth
//                                                       variant="standard"
                                                    
//                                                     />
//                                                   </TableCell>
//                                                   <TableCell
//                                                     sx={{
//                                                       border:
//                                                         "1px solid lightgray",
//                                                       padding: "0px",
//                                                     }}
//                                                     align="center"
//                                                   >
//                                                     <TextField
                                                    
//                                                       fullWidth
//                                                       inputProps={{ min: "0" }}
//                                                       required
//                                                       variant="standard"
//                                                       InputProps={{
//                                                         startAdornment: (
//                                                           <InputAdornment position="center">
//                                                             <CurrencyRupeeIcon
//                                                               style={{
//                                                                 fontSize: "15px",
//                                                               }}
//                                                             />
//                                                           </InputAdornment>
//                                                         ),
//                                                       }}

//                                                       name="price"
//                                                       value={item.price || ""}
//                                                       onChange={(e) => handleItemFieldChange(index, e)}
//                                                     />
//                                                   </TableCell>
//                                                   <TableCell
//                                                     sx={{
//                                                       border:
//                                                         "1px solid lightgray",
//                                                       padding: "0px",
//                                                     }}
//                                                     align="center"
//                                                   >
//                                                     <TextField
//                                                       name="price"
//                                                       value={item.amount || ""}
//                                                       disabled
//                                                       fullWidth
//                                                       variant="standard"
//                                                       inputProps={{ min: "0" }}
//                                                       required
//                                                       InputProps={{
//                                                         startAdornment: (
//                                                           <InputAdornment position="center">
//                                                             <CurrencyRupeeIcon
//                                                               style={{
//                                                                 fontSize: "15px",
//                                                               }}
//                                                             />
//                                                           </InputAdornment>
//                                                         ),
//                                                       }}

                                                    
//                                                     />
//                                                   </TableCell>
//                                                   <TableCell
//                                                     sx={{
//                                                       border:
//                                                         "1px solid lightgray",
//                                                       padding: "0px",
//                                                     }}
//                                                     align="center"
//                                                   >
//                                                     <Button
                                                    
//                                                       onClick={() => handleDeleteItem(index)}
//                                                       color="error"
//                                                     >
//                                                       <CancelIcon />
//                                                     </Button>
//                                                   </TableCell>
//                                                 </TableRow> */}
//                                               {/* )
//                                             )} */}
//                                           </TableBody>
//                                         </Table>
//                                       </TableContainer>
//                                       <h5
//                                         gutterBottom
//                                         className="text-end me-2 mt-2"
//                                       >
//                                         <span className=" me-2" style={{fontSize:'17px'}}>
//                                           Total Amount:
//                                           <span>
//                                             <CurrencyRupeeIcon
//                                               style={{ fontSize: "18px" }}
//                                             />
//                                           </span>
//                                           <span className="fw-bold">
//                                           {/* {formData.totalItemAmount || ""} */}

//                                           </span>
//                                         </span>
//                                       </h5>





//           {/* Bill sundry Start */}


//           <div className="row mt-3 d justify-content-end">
                                      
//                                         <div className="col-xl-6 mt-1 ">
//                                           <TableContainer
//                                             component={Paper}
//                                             sx={{ maxHeight: 320 }}
//                                           >
//                                             <Table>
//                                               <TableHead>
//                                                 <TableRow>
//                                                   <TableCell
//                                                     align="center"
//                                                     sx={{
//                                                       border: "1px solid lightgray",
//                                                       padding: "4px",
//                                                       background: "#bbdefb",
//                                                     }}
//                                                     className="p-0 fw-bold fixed"
//                                                   >
//                                                     No.
//                                                   </TableCell>
//                                                   <TableCell
//                                                     sx={{
//                                                       border: "1px solid lightgray",
//                                                       padding: "4px",
//                                                       background: "#bbdefb",
//                                                     }}
//                                                     className="p-0 fw-bold fixed"
//                                                     align="center"
//                                                   >
//                                                     Packeging Charge
//                                                   </TableCell>
//                                                   <TableCell
//                                                     sx={{
//                                                       border: "1px solid lightgray",
//                                                       padding: "4px",
//                                                       background: "#bbdefb",
//                                                     }}
//                                                     className="p-0 fw-bold fixed"
//                                                     align="center"
//                                                   >
//                                                     GST
//                                                   </TableCell>
//                                                   <TableCell
//                                                     sx={{
//                                                       border: "1px solid lightgray",
//                                                       padding: "4px",
//                                                       background: "#bbdefb",
//                                                     }}
//                                                     className="p-0 fw-bold fixed"
//                                                     align="center"
//                                                   >
//                                                     Other Expenses
//                                                   </TableCell>
                                                  
                                                
//                                                 </TableRow>
//                                               </TableHead>
//                                               <TableBody
//                                                 sx={{
//                                                   background: "white",
//                                                   overflowY: "auto",
//                                                 }}
//                                               >
                                              
//                                                     <TableRow>
//                                                       <TableCell
//                                                         sx={{
//                                                           border: "1px solid lightgray",
//                                                           padding: "0px",
//                                                         }}
//                                                         align="center"
//                                                       >
//                                                         <span className="ps-2 pe-2">
                                                        
//                                                         </span>
//                                                       </TableCell>
//                                                       <TableCell
//                                                         sx={{
//                                                           border: "1px solid lightgray",
//                                                           padding: "0px",
//                                                           width: "200px",
//                                                         }}
//                                                         align="center"
//                                                       >
                                                      

//         <TextField
//           name="packingCharges"
//           type="number"
//         //   value={formData.packingCharges || ""}
//         //   onChange={handleChange}
//           size="small"
//           variant="standard"
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start" style={{ marginRight: '-1px',marginBottom:'3px' }}>
//                 <CurrencyRupeeIcon style={{ fontSize: "15px"}} />
//               </InputAdornment>
//             ),
//           }}
//         />
                                                      
//                                                       </TableCell>
//                                                       <TableCell
//                                                         sx={{
//                                                           border: "1px solid lightgray",
//                                                           padding: "0px",
//                                                         }}
//                                                         align="center"
//                                                       >
                                                        

//         <TextField
//                                                       name="gstExpenses"
//                                                       type="number"
                                                    
//                                                     //   value={formData.gstExpenses || ""}
//                                                     //   onChange={handleChange}
//                                                       size="small"
//                                                       variant="standard"
//                                                       InputProps={{
//                                                         startAdornment: (
//                                                           <InputAdornment position="start" style={{ marginRight: '-1px',marginBottom:'3px' }}>
//                                                             <CurrencyRupeeIcon style={{ fontSize: "15px"}} />
//                                                           </InputAdornment>
//                                                         ),
//                                                       }}
//                                                     />
//                                                       </TableCell>
//                                                       <TableCell
//                                                         sx={{
//                                                           border: "1px solid lightgray",
//                                                           padding: "0px",
//                                                         }}
//                                                         align="center"
//                                                       >
                                                        

//         <TextField
//                                                       name="otherExpenses"
//                                                       type="number"
                                                    
//                                                     //   value={formData.otherExpenses || ""}
//                                                     //   onChange={handleChange}
//                                                       size="small"
//                                                       variant="standard"
//                                                       InputProps={{
//                                                         startAdornment: (
//                                                           <InputAdornment position="start" style={{ marginRight: '-1px',marginBottom:'3px' }}>
//                                                             <CurrencyRupeeIcon style={{ fontSize: "15px"}} />
//                                                           </InputAdornment>
//                                                         ),
//                                                       }}
//                                                     />
//                                                       </TableCell>
                                                      
                                                    
//                                                     </TableRow>
                                                
//                                               </TableBody>
//                                             </Table>



                                          
                                          
//                                           </TableContainer>

//                                           <h5 className="text-end me-2 mt-2">
//                                             <span className="fw-bold me-2" style={{fontSize:'15px'}}>
//                                             {/* Amount: {formData.billSundryAmount} */}
//                                             Amount: 
//                                             <CurrencyRupeeIcon
//                                               style={{ fontSize: "15px" }}
//                                             />
//                                             {/* {formData.billSundryAmount || ""} */}
//                                             </span>
//                                           </h5>
//                                         </div>
//                                       </div>

//                                       {/* Bill sundry End */}













//                                       <div className="row mt-3">
//                                         <div className="col-xl-12">
//                                           <Button
//                                             type="button"
//                                             variant="contained"
//                                             color="secondary"
//                                             // onClick={handleAddItem}
//                                             className="me-2"
//                                           >
//                                             Add Item
//                                           </Button>
//                                           <Button
//                                             // type="submit"
//                                             variant="contained"
//                                             color="primary"
//                                             className="fw-bold"
//                                           >
//                                             Update Purchase Item
//                                           </Button>
//                                         </div>
//                                       </div>
//                                     </div>


//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </Box>
//                       </div>
//                     </div>
//                   </div>
//                 </Box>
//               </Box>
//             </div>
//           </div>
//         </div>
//    <ToastContainer />
//     </div>
//   )
// }






















// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   TextField,
//   Stack,
//   Button,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Autocomplete,
//   Checkbox,
// } from "@mui/material";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const UpdateSalesVoucher = () => {
//   const { id } = useParams();
//   const [formData, setFormData] = useState({
//     buyerName: "",
//     saleDate: "",
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
//     buyerRateType: "",
//   });

//   const [itemsList, setItemsList] = useState([]);
//   const [accounts, setAccounts] = useState([]);
//   const [items, setItems] = useState([]);
//   const [showTransportDetails, setShowTransportDetails] = useState(false);
//   const [transportDetails, setTransportDetails] = useState({
//     transportName: "",
//     vehicleNo: "",
//     date: new Date().toISOString().split("T")[0],
//     stationFrom: "",
//     stationTo: "",
//   });

//   useEffect(() => {
//     const fetchVoucher = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/sale-vouchers/${id}`
//         );
//         const data = response.data;

//         setFormData({
//           ...data,
//           saleDate: data.saleDate.split("T")[0],
//         });

//         setItemsList(
//           data.itemsList.map((item) => ({
//             ...item,
//             item: item.item._id,
//             unit: item.unit, // Ensure unit is correctly fetched from the response
//           }))
//         );

//         if (data.transportDetails) {
//           setTransportDetails(data.transportDetails);
//           setShowTransportDetails(true);
//         } else {
//           setShowTransportDetails(false);
//         }
//       } catch (error) {
//         toast.error("Failed to fetch voucher details.");
//       }
//     };

//     fetchVoucher();
//   }, [id]);

//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/accounts");
//         setAccounts(response.data);
//       } catch (error) {
//         toast.error("Failed to fetch accounts.");
//       }
//     };
//     fetchAccounts();
//   }, []);

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/jewelry-items"
//         );
//         setItems(response.data);
//       } catch (error) {
//         toast.error("Failed to fetch items.");
//       }
//     };
//     fetchItems();
//   }, []);

//   const fetchItemData = async (itemId, rateType) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/jewelry-items/${itemId}`
//       );
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

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     const updatedValue = parseFloat(value) || 0;

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

//   const handleItemChange = (index, e) => {
//     const { name, value } = e.target;
//     const newItemsList = [...itemsList];
//     newItemsList[index][name] = value;

//     if (name === "quantity" || name === "price") {
//       newItemsList[index].amount =
//         newItemsList[index].quantity * newItemsList[index].price;
//     }

//     setItemsList(newItemsList);

//     const totalItemAmount = newItemsList.reduce(
//       (total, item) => total + item.amount,
//       0
//     );
//     setFormData({ ...formData, itemsList: newItemsList, totalItemAmount });
//   };

//   const handleItemSelect = async (index, selectedItem) => {
//     if (selectedItem) {
//       const { price, unit } = await fetchItemData(
//         selectedItem._id,
//         formData.buyerRateType
//       );
//       const newItemsList = [...itemsList];
//       newItemsList[index] = {
//         ...newItemsList[index],
//         item: selectedItem._id,
//         unit: unit, // Make sure to set unit correctly
//         price: price,
//         amount: 0,
//       };
//       setItemsList(newItemsList);
//     }
//   };

//   const addItemRow = () => {
//     setItemsList([
//       ...itemsList,
//       { item: "", quantity: "", unit: "", price: "", amount: 0 },
//     ]);
//   };

//   const deleteItemRow = (index) => {
//     const newItemsList = [...itemsList];
//     newItemsList.splice(index, 1);
//     setItemsList(newItemsList);

//     const totalItemAmount = newItemsList.reduce(
//       (total, item) => total + item.amount,
//       0
//     );
//     setFormData({ ...formData, itemsList: newItemsList, totalItemAmount });
//   };

//   const handleBuyerSelect = (event, value) => {
//     if (value) {
//       setFormData({
//         ...formData,
//         buyerName: value.name,
//         accountId: value._id,
//         buyerRateType: value.rateType,
//       });
//     }
//   };

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

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.buyerName) {
//       toast.error("Please select a buyer name.");
//       return;
//     }

//     const finalFormData = {
//       ...formData,
//       itemsList: itemsList.map((item) => ({
//         item: item.item,
//         quantity: item.quantity,
//         unit: item.unit._id,
//         price: item.price,
//         amount: item.amount,
//       })),
//       transportDetails: showTransportDetails ? transportDetails : {},
//     };

//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/sale-vouchers/${id}`,
//         finalFormData,
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       toast.success("Sales voucher updated successfully.");
//     } catch (error) {
//       toast.error("Failed to update sales voucher.");
//     }
//   };

//   return (
//     <Paper style={{ padding: 20 }}>
//       <Typography variant="h4" gutterBottom>
//         Update Sales Voucher
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <Stack spacing={2}>
//           <Autocomplete
//             options={accounts}
//             getOptionLabel={(option) => option.name}
//             value={
//               accounts.find((acc) => acc.name === formData.buyerName) || null
//             }
//             onChange={handleBuyerSelect}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Buyer Name"
//                 variant="outlined"
//                 fullWidth
//               />
//             )}
//           />
//           <TextField
//             name="saleDate"
//             label="Sale Date"
//             type="date"
//             value={formData.saleDate}
//             onChange={(e) =>
//               setFormData({ ...formData, saleDate: e.target.value })
//             }
//             InputLabelProps={{ shrink: true }}
//             fullWidth
//           />
//           <TextField
//             name="saleVoucherNo"
//             label="Sale Voucher No"
//             value={formData.saleVoucherNo}
//             onChange={(e) =>
//               setFormData({ ...formData, saleVoucherNo: e.target.value })
//             }
//             fullWidth
//           />
//           <TextField
//             name="sellerVoucherNo"
//             label="Seller Voucher No"
//             value={formData.sellerVoucherNo}
//             onChange={(e) =>
//               setFormData({ ...formData, sellerVoucherNo: e.target.value })
//             }
//             fullWidth
//           />
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Item</TableCell>
//                   <TableCell>Quantity</TableCell>
//                   <TableCell>Unit</TableCell>
//                   <TableCell>Price</TableCell>
//                   <TableCell>Amount</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {itemsList.map((item, index) => (
//                   <TableRow key={index}>
//                     <TableCell>
//                       <Autocomplete
//                         options={items}
//                         getOptionLabel={(option) => option.name}
//                         value={items.find((i) => i._id === item.item) || null}
//                         onChange={(e, value) => handleItemSelect(index, value)}
//                         renderInput={(params) => (
//                           <TextField
//                             {...params}
//                             label="Item"
//                             variant="outlined"
//                             fullWidth
//                           />
//                         )}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <TextField
//                         name="quantity"
//                         type="number"
//                         value={item.quantity}
//                         onChange={(e) => handleItemChange(index, e)}
//                         fullWidth
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <TextField
//                         name="unit"
//                         value={item.unit.name} // Directly use item.unit as a string
//                         InputProps={{ readOnly: true }} // Make it read-only if needed
//                         fullWidth
//                       />
//                     </TableCell>

//                     <TableCell>
//                       <TextField
//                         name="price"
//                         type="number"
//                         value={item.price}
//                         onChange={(e) => handleItemChange(index, e)}
//                         fullWidth
//                       />
//                     </TableCell>
//                     <TableCell>{item.amount}</TableCell>
//                     <TableCell>
//                       <Button
//                         variant="outlined"
//                         color="error"
//                         onClick={() => deleteItemRow(index)}
//                       >
//                         Delete
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <Button variant="contained" color="primary" onClick={addItemRow}>
//             Add Item
//           </Button>
//           <TextField
//             name="packingCharges"
//             label="Packing Charges"
//             type="number"
//             value={formData.packingCharges}
//             onChange={handleInputChange}
//             fullWidth
//           />
//           <TextField
//             name="gstExpenses"
//             label="GST Expenses (%)"
//             type="number"
//             value={formData.gstExpenses}
//             onChange={handleInputChange}
//             fullWidth
//           />
//           <TextField
//             name="otherExpenses"
//             label="Other Expenses"
//             type="number"
//             value={formData.otherExpenses}
//             onChange={handleInputChange}
//             fullWidth
//           />
//           <TextField
//             label="Total Item Amount"
//             value={formData.totalItemAmount}
//             InputProps={{ readOnly: true }}
//             fullWidth
//           />
//           <TextField
//             label="Bill Sundry Amount"
//             value={formData.billSundryAmount}
//             InputProps={{ readOnly: true }}
//             fullWidth
//           />
//           <TextField
//             label="Total Amount"
//             value={formData.totalAmount}
//             InputProps={{ readOnly: true }}
//             fullWidth
//           />
//           <Checkbox
//             checked={showTransportDetails}
//             onChange={handleCheckboxChange}
//           />
//           <label>Show Transport Details</label>
//           {showTransportDetails && (
//             <Stack spacing={2}>
//               <TextField
//                 name="transportName"
//                 label="Transport Name"
//                 value={transportDetails.transportName}
//                 onChange={handleTransportDetailChange}
//                 fullWidth
//               />
//               <TextField
//                 name="vehicleNo"
//                 label="Vehicle No"
//                 value={transportDetails.vehicleNo}
//                 onChange={handleTransportDetailChange}
//                 fullWidth
//               />
//               <TextField
//                 name="date"
//                 label="Date"
//                 type="date"
//                 value={transportDetails.date}
//                 onChange={handleTransportDetailChange}
//                 InputLabelProps={{ shrink: true }}
//                 fullWidth
//               />
//               <TextField
//                 name="stationFrom"
//                 label="Station From"
//                 value={transportDetails.stationFrom}
//                 onChange={handleTransportDetailChange}
//                 fullWidth
//               />
//               <TextField
//                 name="stationTo"
//                 label="Station To"
//                 value={transportDetails.stationTo}
//                 onChange={handleTransportDetailChange}
//                 fullWidth
//               />
//             </Stack>
//           )}
//           <Button type="submit" variant="contained" color="primary">
//             Update Sales Voucher
//           </Button>
//         </Stack>
//       </form>
//       <ToastContainer />
//     </Paper>
//   );
// };

// export default UpdateSalesVoucher;








import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Stack,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Autocomplete,
  Checkbox,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateSalesVoucher = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    buyerName: "",
    saleDate: "",
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
    buyerRateType: "",
  });

  const [itemsList, setItemsList] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [items, setItems] = useState([]);
  const [showTransportDetails, setShowTransportDetails] = useState(false);
  const [transportDetails, setTransportDetails] = useState({
    transportName: "",
    vehicleNo: "",
    date: new Date().toISOString().split("T")[0],
    stationFrom: "",
    stationTo: "",
  });

  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/sale-vouchers/${id}`
        );
        const data = response.data;

        setFormData({
          ...data,
          saleDate: data.saleDate.split("T")[0],
        });

        setItemsList(
          data.itemsList.map((item) => ({
            ...item,
            item: item.item._id,
            unit: item.unit, // Ensure unit is correctly fetched from the response
          }))
        );

        if (data.transportDetails) {
          setTransportDetails(data.transportDetails);
          setShowTransportDetails(true);
        } else {
          setShowTransportDetails(false);
        }
      } catch (error) {
        toast.error("Failed to fetch voucher details.");
      }
    };

    fetchVoucher();
  }, [id]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/accounts");
        setAccounts(response.data);
      } catch (error) {
        toast.error("Failed to fetch accounts.");
      }
    };
    fetchAccounts();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/jewelry-items"
        );
        setItems(response.data);
      } catch (error) {
        toast.error("Failed to fetch items.");
      }
    };
    fetchItems();
  }, []);

  const fetchItemData = async (itemId, rateType) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/jewelry-items/${itemId}`
      );
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = parseFloat(value) || 0;

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

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItemsList = [...itemsList];
    newItemsList[index][name] = value;

    if (name === "quantity" || name === "price") {
      newItemsList[index].amount =
        newItemsList[index].quantity * newItemsList[index].price;
    }

    setItemsList(newItemsList);

    const totalItemAmount = newItemsList.reduce(
      (total, item) => total + item.amount,
      0
    );
    setFormData({ ...formData, itemsList: newItemsList, totalItemAmount });
  };

  const handleItemSelect = async (index, selectedItem) => {
    if (selectedItem) {
      const { price, unit } = await fetchItemData(
        selectedItem._id,
        formData.buyerRateType
      );
      const newItemsList = [...itemsList];
      newItemsList[index] = {
        ...newItemsList[index],
        item: selectedItem._id,
        unit: unit, // Make sure to set unit correctly
        price: price,
        amount: 0,
      };
      setItemsList(newItemsList);
    }
  };

  const addItemRow = () => {
    setItemsList([
      ...itemsList,
      { item: "", quantity: "", unit: "", price: "", amount: 0 },
    ]);
  };

  const deleteItemRow = (index) => {
    const newItemsList = [...itemsList];
    newItemsList.splice(index, 1);
    setItemsList(newItemsList);

    const totalItemAmount = newItemsList.reduce(
      (total, item) => total + item.amount,
      0
    );
    setFormData({ ...formData, itemsList: newItemsList, totalItemAmount });
  };

  const handleBuyerSelect = (event, value) => {
    if (value) {
      setFormData({
        ...formData,
        buyerName: value.name,
        accountId: value._id,
        buyerRateType: value.rateType,
      });
    }
  };

  const handleTransportDetailChange = (e) => {
    const { name, value } = e.target;
    setTransportDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setShowTransportDetails(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.buyerName) {
      toast.error("Please select a buyer name.");
      return;
    }

    const finalFormData = {
      ...formData,
      itemsList: itemsList.map((item) => ({
        item: item.item,
        quantity: item.quantity,
        unit: item.unit,
        price: item.price,
        amount: item.amount,
      })),
      transportDetails: showTransportDetails ? transportDetails : {},
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/sale-vouchers/${id}`,
        finalFormData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Sales voucher updated successfully.");
    } catch (error) {
      toast.error("Failed to update sales voucher.");
    }
  };

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Update Sales Voucher
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Autocomplete
            options={accounts}
            getOptionLabel={(option) => option.name}
            value={
              accounts.find((acc) => acc.name === formData.buyerName) || null
            }
            onChange={handleBuyerSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buyer Name"
                variant="outlined"
                fullWidth
              />
            )}
          />
          <TextField
            name="saleDate"
            label="Sale Date"
            type="date"
            value={formData.saleDate}
            onChange={(e) =>
              setFormData({ ...formData, saleDate: e.target.value })
            }
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            name="saleVoucherNo"
            label="Sale Voucher No"
            value={formData.saleVoucherNo}
            onChange={(e) =>
              setFormData({ ...formData, saleVoucherNo: e.target.value })
            }
            fullWidth
          />
          <TextField
            name="sellerVoucherNo"
            label="Seller Voucher No"
            value={formData.sellerVoucherNo}
            onChange={(e) =>
              setFormData({ ...formData, sellerVoucherNo: e.target.value })
            }
            fullWidth
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Unit</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itemsList.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Autocomplete
                        options={items}
                        getOptionLabel={(option) => option.name}
                        value={items.find((i) => i._id === item.item) || null}
                        onChange={(e, value) => handleItemSelect(index, value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Item"
                            variant="outlined"
                            fullWidth
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="quantity"
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, e)}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="unit"
                        value={item.unit} // Directly use item.unit as a string
                        InputProps={{ readOnly: true }} // Make it read-only if needed
                        fullWidth
                      />
                    </TableCell>

                    <TableCell>
                      <TextField
                        name="price"
                        type="number"
                        value={item.price}
                        onChange={(e) => handleItemChange(index, e)}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => deleteItemRow(index)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" color="primary" onClick={addItemRow}>
            Add Item
          </Button>
          <TextField
            name="packingCharges"
            label="Packing Charges"
            type="number"
            value={formData.packingCharges}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="gstExpenses"
            label="GST Expenses (%)"
            type="number"
            value={formData.gstExpenses}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="otherExpenses"
            label="Other Expenses"
            type="number"
            value={formData.otherExpenses}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Total Item Amount"
            value={formData.totalItemAmount}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="Bill Sundry Amount"
            value={formData.billSundryAmount}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="Total Amount"
            value={formData.totalAmount}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <Checkbox
            checked={showTransportDetails}
            onChange={handleCheckboxChange}
          />
          <label>Show Transport Details</label>
          {showTransportDetails && (
            <Stack spacing={2}>
              <TextField
                name="transportName"
                label="Transport Name"
                value={transportDetails.transportName}
                onChange={handleTransportDetailChange}
                fullWidth
              />
              <TextField
                name="vehicleNo"
                label="Vehicle No"
                value={transportDetails.vehicleNo}
                onChange={handleTransportDetailChange}
                fullWidth
              />
              <TextField
                name="date"
                label="Date"
                type="date"
                value={transportDetails.date}
                onChange={handleTransportDetailChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <TextField
                name="stationFrom"
                label="Station From"
                value={transportDetails.stationFrom}
                onChange={handleTransportDetailChange}
                fullWidth
              />
              <TextField
                name="stationTo"
                label="Station To"
                value={transportDetails.stationTo}
                onChange={handleTransportDetailChange}
                fullWidth
              />
            </Stack>
          )}
          <Button type="submit" variant="contained" color="primary">
            Update Sales Voucher
          </Button>
        </Stack>
      </form>
      <ToastContainer />
    </Paper>
  );
};

export default UpdateSalesVoucher;

