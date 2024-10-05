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

// const UpdatePurchaseItem = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [items, setItems] = useState([]);
//   const [suppliers, setSuppliers] = useState([]);
//   const [companies, setCompanies] = useState([]);

//   const [selectedSupplier, setSelectedSupplier] = useState(null);
//   const [formData, setFormData] = useState({
//     supplierName: "",
//     companyName: "",
//     purchaseDate: "",
//     invoiceDate: "",
//     supplierVoucherNo: "",
//     purchaseVoucherNo: "",
//     itemsList: [],
//     packingCharges: "",
//     gstExpenses: "",
//     otherExpenses: "",
//     totalItemAmount: "",
//     billSundryAmount: "",
//     totalAmount: "",
//   });
//   const [itemData, setItemData] = useState({});

//   const getAvailableItems = () => {
//     return items;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const purchaseResponse = await axios.get(
//           `http://localhost:5000/api/purchases/${id}`
//         );
//         const purchaseData = purchaseResponse.data;

//         const formattedPurchaseDate = new Date(purchaseData.purchaseDate)
//           .toISOString()
//           .split("T")[0];
//         const formattedInvoiceDate = new Date(purchaseData.invoiceDate)
//           .toISOString()
//           .split("T")[0];

//         setFormData({
//           ...purchaseData,
//           purchaseDate: formattedPurchaseDate,
//           invoiceDate: formattedInvoiceDate,
//         });

//         const suppliersResponse = await axios.get(
//           "http://localhost:5000/api/accounts"
//         );
//         const allSuppliers = suppliersResponse.data;
//         setSuppliers(allSuppliers);

//         const uniqueCompanies = Array.from(
//           new Set(allSuppliers.map((supplier) => supplier.companyName))
//         ).map((companyName) => ({
//           name: companyName,
//           supplierName: allSuppliers.find(
//             (supplier) => supplier.companyName === companyName
//           )?.name,
//         }));
//         setCompanies(uniqueCompanies);

//         const supplier = allSuppliers.find(
//           (s) => s.name === purchaseData.supplierName
//         );
//         setSelectedSupplier(supplier);
//         setFormData((prevState) => ({
//           ...prevState,
//           companyName: supplier ? supplier.companyName : "",
//           supplierName: supplier ? supplier.name : "",
//         }));

//         const itemIds = purchaseData.itemsList.map((item) => item.item._id);
//         const itemResponses = await Promise.all(
//           itemIds.map((itemId) =>
//             axios.get(`http://localhost:5000/api/jewelry-items/${itemId}`)
//           )
//         );
//         const itemsData = itemResponses.reduce((acc, response) => {
//           acc[response.data._id] = response.data;
//           return acc;
//         }, {});
//         setItemData(itemsData);

//         const updatedItemsList = purchaseData.itemsList.map((item) => {
//           const itemDetails = itemsData[item.item._id];
//           const price = getPriceBasedOnCustomerType(
//             itemDetails,
//             supplier.customerType
//           );
//           return {
//             ...item,
//             item: itemDetails,
//             price: item.price || price,
//             unit: itemDetails.unit,
//             amount: (item.quantity * (item.price || price)).toFixed(2),
//             isPredefined: true,
//           };
//         });

//         setFormData((prevState) => ({
//           ...prevState,
//           itemsList: updatedItemsList,
//         }));

//         calculateTotalAmount(updatedItemsList, {
//           packingCharges: purchaseData.packingCharges,
//           gstExpenses: purchaseData.gstExpenses,
//           otherExpenses: purchaseData.otherExpenses,
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         toast.error("Error fetching data");
//       }
//     };

//     fetchData();

//     const fetchItems = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/jewelry-items"
//         );
//         setItems(response.data);
//       } catch (error) {
//         console.error("Error fetching items:", error);
//         toast.error("Error fetching items");
//       }
//     };

//     fetchItems();
//   }, [id]);

//   const handleItemChange = async (index, itemId) => {
//     if (!selectedSupplier) {
//       toast.warn("Please select a supplier first");
//       return;
//     }

//     const customerType = selectedSupplier.customerType;
//     const selectedItem =
//       itemData[itemId] || (await fetchItemData(itemId, customerType));

//     const updatedItemsList = [...formData.itemsList];
//     updatedItemsList[index] = {
//       ...updatedItemsList[index],
//       item: selectedItem,
//       price: getPriceBasedOnCustomerType(selectedItem, customerType),
//       unit: selectedItem.unit,
//       amount: (
//         updatedItemsList[index].quantity *
//         getPriceBasedOnCustomerType(selectedItem, customerType)
//       ).toFixed(2),
//     };

//     setFormData({ ...formData, itemsList: updatedItemsList });
//     calculateTotalAmount(updatedItemsList);
//   };

//   const fetchItemData = async (itemId, customerType) => {
//     try {
//       if (!itemId) throw new Error("Invalid item ID");
//       const response = await axios.get(
//         `http://localhost:5000/api/jewelry-items/${itemId}`
//       );
//       const { retailerPrice, semiWholesellerPrice, wholesellerPrice, unit } =
//         response.data;

//       const price =
//         customerType === "Retailer"
//           ? retailerPrice
//           : customerType === "Semi Wholeseller"
//           ? semiWholesellerPrice
//           : wholesellerPrice;

//       const itemDetails = {
//         ...response.data,
//         price,
//         unit: unit || { name: "" },
//       };

//       setItemData((prevData) => ({
//         ...prevData,
//         [itemId]: itemDetails,
//       }));

//       return itemDetails;
//     } catch (error) {
//       console.error("Error fetching item data:", error);
//       toast.error("Error fetching item data");
//       return { price: 0, unit: { name: "" } };
//     }
//   };

//   const getPriceBasedOnCustomerType = (itemDetails, customerType) => {
//     return customerType === "Retailer"
//       ? itemDetails.retailerPrice
//       : customerType === "Semi Wholeseller"
//       ? itemDetails.semiWholesellerPrice
//       : itemDetails.wholesellerPrice;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));

//     if (
//       name === "packingCharges" ||
//       name === "gstExpenses" ||
//       name === "otherExpenses"
//     ) {
//       calculateTotalAmount(formData.itemsList, {
//         packingCharges:
//           name === "packingCharges" ? value : formData.packingCharges,
//         gstExpenses: name === "gstExpenses" ? value : formData.gstExpenses,
//         otherExpenses:
//           name === "otherExpenses" ? value : formData.otherExpenses,
//       });
//     }
//   };

//   const handleItemFieldChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedItemsList = [...formData.itemsList];

//     const validatedValue = Math.max(0, value);

//     updatedItemsList[index] = {
//       ...updatedItemsList[index],
//       [name]: validatedValue,
//     };

//     if (name === "quantity" || name === "price") {
//       const quantity =
//         name === "quantity" ? validatedValue : updatedItemsList[index].quantity;
//       const price =
//         name === "price" ? validatedValue : updatedItemsList[index].price;
//       updatedItemsList[index].amount = (quantity * price).toFixed(2);
//     }

//     setFormData({ ...formData, itemsList: updatedItemsList });
//     calculateTotalAmount(updatedItemsList);
//   };

//   const handleAddItem = () => {
//     const availableItems = getAvailableItems();
//     if (availableItems.length === 0) {
//       toast.warn("All items have been added already.");
//       return;
//     }

//     const updatedItemsList = [
//       ...formData.itemsList,
//       {
//         item: {},
//         quantity: "",
//         unit: "",
//         price: "",
//         amount: "",
//         isPredefined: false,
//       },
//     ];

//     setFormData((prevState) => ({
//       ...prevState,
//       itemsList: updatedItemsList,
//     }));
//   };

//   const handleDeleteItem = (index) => {
//     const updatedItemsList = [...formData.itemsList];
//     updatedItemsList.splice(index, 1);
//     setFormData((prevState) => ({
//       ...prevState,
//       itemsList: updatedItemsList,
//     }));

//     calculateTotalAmount(updatedItemsList);
//   };

//   const calculateTotalAmount = (
//     itemsList,
//     expenses = {
//       packingCharges: formData.packingCharges,
//       gstExpenses: formData.gstExpenses,
//       otherExpenses: formData.otherExpenses,
//     }
//   ) => {
//     const totalItemAmount = itemsList.reduce(
//       (total, item) => total + parseFloat(item.amount || 0),
//       0
//     );

//     const billSundryAmount =
//       parseFloat(expenses.packingCharges || 0) +
//       parseFloat(expenses.gstExpenses || 0) +
//       parseFloat(expenses.otherExpenses || 0);

//     const totalAmount = totalItemAmount + billSundryAmount;

//     setFormData((prevState) => ({
//       ...prevState,
//       totalItemAmount: totalItemAmount.toFixed(2),
//       billSundryAmount: billSundryAmount.toFixed(2),
//       totalAmount: totalAmount.toFixed(2),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.itemsList.length === 0) {
//       toast.error("Please add at least one item.");
//       return;
//     }

//     try {
//       await axios.put(`http://localhost:5000/api/purchases/${id}`, formData);

//       toast.success("Purchase item updated successfully");
//       navigate("/purchase_voucher_list");
//     } catch (error) {
//       console.error("Error updating purchase item:", error);
//       toast.error("Error updating purchase item");
//     }
//   };

//   return (
// <>
//     {/* <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <Header title="Update Purchase Item" subtitle="Update purchase details" />
//       <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", p: 3 }}>
//         <FormControl fullWidth margin="normal">
//           <Autocomplete
//             options={companies.map((company) => company.name)}
//             value={formData.companyName || ""}
//             onChange={(e, newValue) => {
//               const selectedCompany = companies.find(
//                 (company) => company.name === newValue
//               );
//               const supplierName = selectedCompany
//                 ? selectedCompany.supplierName
//                 : "";

//               setFormData((prevState) => ({
//                 ...prevState,
//                 companyName: newValue,
//                 supplierName,
//               }));

//               const selectedSupplier = suppliers.find(
//                 (supplier) => supplier.name === supplierName
//               );
//               setSelectedSupplier(selectedSupplier);
//             }}
//             renderInput={(params) => (
//               <TextField {...params} label="Company Name" variant="outlined" />
//             )}
//           />
//         </FormControl>
//         <FormControl fullWidth margin="normal">
//           <Autocomplete
//             options={suppliers.map((supplier) => supplier.name)}
//             value={formData.supplierName || ""}
//             onChange={(e, newValue) => {
//               setFormData((prevState) => ({
//                 ...prevState,
//                 supplierName: newValue,
//               }));

//               const selectedSupplier = suppliers.find(
//                 (supplier) => supplier.name === newValue
//               );
//               setSelectedSupplier(selectedSupplier);
//             }}
//             renderInput={(params) => (
//               <TextField {...params} label="Supplier Name" variant="outlined" />
//             )}
//           />
//         </FormControl>
//         <FormControl fullWidth margin="normal">
//           <TextField
//             name="purchaseDate"
//             label="Purchase Date"
//             type="date"
//             value={formData.purchaseDate || ""}
//             onChange={handleChange}
//             variant="outlined"
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//         </FormControl>
//         <FormControl fullWidth margin="normal">
//           <TextField
//             name="invoiceDate"
//             label="Invoice Date"
//             type="date"
//             value={formData.invoiceDate || ""}
//             onChange={handleChange}
//             variant="outlined"
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//         </FormControl>
//         <FormControl fullWidth margin="normal">
//           <TextField
//             name="supplierVoucherNo"
//             label="Supplier Voucher No"
//             value={formData.supplierVoucherNo || ""}
//             onChange={handleChange}
//             variant="outlined"
//           />
//         </FormControl>
//         <FormControl fullWidth margin="normal">
//           <TextField
//             name="purchaseVoucherNo"
//             label="Purchase Voucher No"
//             value={formData.purchaseVoucherNo || ""}
//             onChange={handleChange}
//             variant="outlined"
//           />
//         </FormControl>
//         <TableContainer component={Paper} sx={{ marginTop: 3 }}>
//           <Table aria-label="items table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Item Name</TableCell>
//                 <TableCell>Quantity</TableCell>
//                 <TableCell>Unit</TableCell>
//                 <TableCell>Price</TableCell>
//                 <TableCell>Amount</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {formData.itemsList.map((item, index) => (
//                 <TableRow key={index}>
//                   <TableCell>
//                     <Autocomplete
//                       options={getAvailableItems().map((item) => item.name)}
//                       value={item.item.name || ""}
//                       onChange={(e, newValue) => {
//                         const selectedItem = items.find(
//                           (item) => item.name === newValue
//                         );
//                         handleItemChange(index, selectedItem._id);
//                       }}
//                       renderInput={(params) => (
//                         <TextField
//                           {...params}
//                           label="Item Name"
//                           variant="outlined"
//                         />
//                       )}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <TextField
//                       name="quantity"
//                       value={item.quantity || ""}
//                       onChange={(e) => handleItemFieldChange(index, e)}
//                       variant="outlined"
//                     />
//                   </TableCell>
//                   <TableCell>{item.unit?.name}</TableCell>
//                   <TableCell>
//                     <TextField
//                       name="price"
//                       value={item.price || ""}
//                       onChange={(e) => handleItemFieldChange(index, e)}
//                       variant="outlined"
//                     />
//                   </TableCell>
//                   <TableCell>{item.amount || ""}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       onClick={() => handleDeleteItem(index)}
//                     >
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//               <TableRow>
//                 <TableCell colSpan={5} align="right">
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleAddItem}
//                   >
//                     Add Item
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <FormControl fullWidth margin="normal">
//           <TextField
//             name="packingCharges"
//             label="Packing Charges"
//             value={formData.packingCharges || ""}
//             onChange={handleChange}
//             variant="outlined"
//           />
//         </FormControl>
//         <FormControl fullWidth margin="normal">
//           <TextField
//             name="gstExpenses"
//             label="GST Expenses"
//             value={formData.gstExpenses || ""}
//             onChange={handleChange}
//             variant="outlined"
//           />
//         </FormControl>
//         <FormControl fullWidth margin="normal">
//           <TextField
//             name="otherExpenses"
//             label="Other Expenses"
//             value={formData.otherExpenses || ""}
//             onChange={handleChange}
//             variant="outlined"
//           />
//         </FormControl>
//         <Box sx={{ marginTop: 3 }}>
//           <TextField
//             label="Total Item Amount"
//             value={formData.totalItemAmount || ""}
//             InputProps={{
//               readOnly: true,
//             }}
//             variant="outlined"
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Bill Sundry Amount"
//             value={formData.billSundryAmount || ""}
//             InputProps={{
//               readOnly: true,
//             }}
//             variant="outlined"
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Total Amount"
//             value={formData.totalAmount || ""}
//             InputProps={{
//               readOnly: true,
//             }}
//             variant="outlined"
//             fullWidth
//             margin="normal"
//           />
//         </Box>
//         <Box sx={{ marginTop: 3 }}>
//           <Button type="submit" variant="contained" color="primary">
//             Update Purchase Item
//           </Button>
//         </Box>
//       </Box>
//       <ToastContainer />
//     </Box> */}
//     <div className="container-fluid">
//   <div className="row">
//     <div className="col-xl-12 ">
//       <Box sx={{ display: "flex" }}>
//         <CssBaseline />
//         <Header />
//         <Box component="main" sx={{ flexGrow: 1 }}>
//           <DrawerHeader />
//           <div className="container-fluid">
//             <div className="row">
//               <div className="col-xl-12">
//                 <div className="row d-flex justify-content-between">
//                   <div className="col-xl-12">
//                     <h4 className="fw-bold text-center">
//                       Update Purchase Item
//                     </h4>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-xl-12">
//                 <Box component="form" onSubmit={handleSubmit}>
//                   <ToastContainer />
//                   <div className="row">
//                     <div className="col-xl-12 mx-auto p-4">
//                       <div className="row">
//                         <div
//                           className="row mx-auto d-flex p-3"
//                           style={{
//                             border: "1px solid lightgray",
//                             borderRadius: "5px",
//                           }}
//                         >
//                           <div className="row">
//                             <div className="col-xl-3">
//                               {/* <FormControl fullWidth>
//                             <Autocomplete
//                               options={suppliers}
//                               getOptionLabel={(option) => option.name}
//                               value={selectedSupplier}
//                               onChange={handleSupplierChange}
//                               renderInput={(params) => (
//                                 <TextField
//                                   {...params}
//                                   label="Select Supplier"
//                                   size="small"
//                                 />
//                               )}
//                             />
//                           </FormControl> */}

//                               <FormControl fullWidth margin="normal">
//                                 <Autocomplete
//                                   options={companies.map(
//                                     (company) => company.name
//                                   )}
//                                   value={formData.companyName || ""}
//                                   onChange={(e, newValue) => {
//                                     const selectedCompany =
//                                       companies.find(
//                                         (company) =>
//                                           company.name === newValue
//                                       );
//                                     const supplierName = selectedCompany
//                                       ? selectedCompany.supplierName
//                                       : "";

//                                     setFormData((prevState) => ({
//                                       ...prevState,
//                                       companyName: newValue,
//                                       supplierName,
//                                     }));

//                                     const selectedSupplier =
//                                       suppliers.find(
//                                         (supplier) =>
//                                           supplier.name === supplierName
//                                       );
//                                     setSelectedSupplier(selectedSupplier);
//                                   }}
//                                   renderInput={(params) => (
//                                     <TextField
//                                       {...params}
//                                       label="Company Name"
//                                       size="small"
//                                       variant="outlined"
//                                     />
//                                   )}
//                                 />
//                               </FormControl>
//                             </div>
//                             <div className="col-xl-3">
//                               {/* <FormControl fullWidth>
//                             <TextField
//                               name="voucherNo"
//                               label="Voucher No"
//                               // value={formData.voucherNo}
//                               // onChange={handleChange}
//                               required
//                               size="small"
//                             />
//                           </FormControl> */}

//                               <FormControl fullWidth margin="normal">
//                                 <Autocomplete
//                                   options={suppliers.map(
//                                     (supplier) => supplier.name
//                                   )}
//                                   value={formData.supplierName || ""}
//                                   onChange={(e, newValue) => {
//                                     setFormData((prevState) => ({
//                                       ...prevState,
//                                       supplierName: newValue,
//                                     }));

//                                     const selectedSupplier =
//                                       suppliers.find(
//                                         (supplier) =>
//                                           supplier.name === newValue
//                                       );
//                                     setSelectedSupplier(selectedSupplier);
//                                   }}
//                                   renderInput={(params) => (
//                                     <TextField
//                                       {...params}
//                                       label="Supplier Name"
//                                       size="small"
//                                       variant="outlined"
//                                     />
//                                   )}
//                                 />
//                               </FormControl>
//                             </div>
//                             <div className="col-xl-3">
//                               {/* <FormControl fullWidth>
//                             <TextField
//                               name="date"
//                               label="Date"
//                               type="date"
//                               // value={formData.date}
//                               // onChange={handleChange}
//                               // InputLabelProps={{ shrink: true }}
//                               required
//                               size="small"
//                             />
//                           </FormControl> */}

//                               <FormControl fullWidth margin="normal">
//                                 <TextField
//                                   name="purchaseDate"
//                                   label="Purchase Date"
//                                   type="date"
//                                   value={formData.purchaseDate || ""}
//                                   onChange={handleChange}
//                                   variant="outlined"
//                                   InputLabelProps={{
//                                     shrink: true,
//                                   }}
//                                   size="small"
//                                 />
//                               </FormControl>
//                             </div>

//                             <div className="col-xl-3">
//                               <FormControl fullWidth margin="normal">
//                                 <TextField
//                                   name="invoiceDate"
//                                   label="Invoice Date"
//                                   type="date"
//                                   value={formData.invoiceDate || ""}
//                                   onChange={handleChange}
//                                   variant="outlined"
//                                   InputLabelProps={{
//                                     shrink: true,
//                                   }}
//                                   size="small"
//                                 />
//                               </FormControl>
//                             </div>

//                             <div className="col-xl-3">
//                               <FormControl fullWidth margin="normal">
//                                 <TextField
//                                   name="supplierVoucherNo"
//                                   label="Supplier Voucher No"
//                                   value={formData.supplierVoucherNo || ""}
//                                   onChange={handleChange}
//                                   variant="outlined"
//                                   size="small"
//                                 />
//                               </FormControl>
//                             </div>
//                             <div className="col-xl-3">
//                               <FormControl fullWidth margin="normal">
//                                 <TextField
//                                   name="purchaseVoucherNo"
//                                   label="Purchase Voucher No"
//                                   value={formData.purchaseVoucherNo || ""}
//                                   onChange={handleChange}
//                                   variant="outlined"
//                                   size="small"
//                                 />
//                               </FormControl>
//                             </div>
//                           </div>
//                           <div className="row">
//                             <div className="col-xl-12 mt-3">
//                               <TableContainer
//                                 component={Paper}
//                                 sx={{ maxHeight: 300 }}
//                               >
//                                 <Table>
//                                   <TableHead
//                                     style={{ background: "#bbdefb" }}
//                                   >
//                                     <TableRow>
//                                       <TableCell
//                                         sx={{
//                                           border: "1px solid lightgray",
//                                           padding: "4px",
//                                           background: "#bbdefb",
//                                         }}
//                                         className="p-0 fw-bold"
//                                         align="center"
//                                       >
//                                         #
//                                       </TableCell>
//                                       <TableCell
//                                         sx={{
//                                           border: "1px solid lightgray",
//                                           padding: "4px",
//                                           background: "#bbdefb",
//                                         }}
//                                         className="p-0 fw-bold"
//                                         align="center"
//                                       >
//                                         Item
//                                       </TableCell>
//                                       <TableCell
//                                         sx={{
//                                           border: "1px solid lightgray",
//                                           padding: "4px",
//                                           background: "#bbdefb",
//                                         }}
//                                         className="p-0 fw-bold"
//                                         align="center"
//                                       >
//                                         Quantity
//                                       </TableCell>
//                                       <TableCell
//                                         sx={{
//                                           border: "1px solid lightgray",
//                                           padding: "4px",
//                                           background: "#bbdefb",
//                                         }}
//                                         className="p-0 fw-bold"
//                                         align="center"
//                                       >
//                                         Unit
//                                       </TableCell>
//                                       <TableCell
//                                         sx={{
//                                           border: "1px solid lightgray",
//                                           padding: "4px",
//                                           background: "#bbdefb",
//                                         }}
//                                         className="p-0 fw-bold"
//                                         align="center"
//                                       >
//                                         Price(Rs.)
//                                       </TableCell>
//                                       <TableCell
//                                         sx={{
//                                           border: "1px solid lightgray",
//                                           padding: "4px",
//                                           background: "#bbdefb",
//                                         }}
//                                         className="p-0 fw-bold"
//                                         align="center"
//                                       >
//                                         Amount(Rs.)
//                                       </TableCell>
//                                       <TableCell
//                                         sx={{
//                                           border: "1px solid lightgray",
//                                           padding: "4px",
//                                           background: "#bbdefb",
//                                         }}
//                                         className="p-0 fw-bold"
//                                         align="center"
//                                       >
//                                         Actions
//                                       </TableCell>
//                                     </TableRow>
//                                   </TableHead>

//                                   <TableBody
//                                     sx={{
//                                       background: "white",
//                                       overflowY: "auto",
//                                     }}
//                                   >
//                                     {/* {formData.itemsList.map(
//                                   (item, index) => ( */}
//                                     {formData.itemsList.map(
//                                       (item, index) => (
//                                         <TableRow key={index}>
//                                           <TableCell
//                                             sx={{
//                                               border:
//                                                 "1px solid lightgray",
//                                               padding: "0px",
//                                             }}
//                                             align="center"
//                                           >
//                                             <span className="ps-2 pe-2 pt-0 pb-0">
//                                               {index + 1}
//                                             </span>
//                                           </TableCell>

//                                           <TableCell
//                                             sx={{
//                                               border:
//                                                 "1px solid lightgray",
//                                               padding: "0px",
//                                               width: "300px",
//                                             }}
//                                             align="center"
//                                           >
//                                             <FormControl fullWidth>
//                                               {/* <Autocomplete
//                                             options={getAvailableItems()}
//                                             getOptionLabel={(
//                                               option
//                                             ) => option.name || ""}
//                                             value={item.item || {}} // Pass an empty object if item.item is null or undefined
//                                             onChange={(e, value) =>
//                                               handleItemChange(
//                                                 index,
//                                                 value ? value._id : ""
//                                               )
//                                             }
//                                             renderInput={(params) => (
//                                               <TextField
//                                                 {...params}
//                                                 label=""
//                                                 variant="standard"
//                                               />
//                                             )}
//                                           /> */}

//                                               <Autocomplete
//                                                 options={getAvailableItems().map(
//                                                   (item) => item.name
//                                                 )}
//                                                 value={
//                                                   item.item.name || ""
//                                                 }
//                                                 onChange={(
//                                                   e,
//                                                   newValue
//                                                 ) => {
//                                                   const selectedItem =
//                                                     items.find(
//                                                       (item) =>
//                                                         item.name ===
//                                                         newValue
//                                                     );
//                                                   handleItemChange(
//                                                     index,
//                                                     selectedItem._id
//                                                   );
//                                                 }}
//                                                 renderInput={(params) => (
//                                                   <TextField
//                                                     {...params}
//                                                     label=""
//                                                     variant="standard"

//                                                   />
//                                                 )}
//                                               />
//                                             </FormControl>
//                                           </TableCell>

//                                           <TableCell
//                                             sx={{
//                                               border:
//                                                 "1px solid lightgray",
//                                               padding: "0px",
//                                             }}
//                                             align="center"
//                                           >
//                                             <TextField

//                                               fullWidth
//                                               inputProps={{ min: "0" }}
//                                               required
//                                               variant="standard"

//                                               name="quantity"
//                                               value={item.quantity || ""}
//                                               onChange={(e) => handleItemFieldChange(index, e)}
//                                             />
//                                           </TableCell>
//                                           <TableCell
//                                             sx={{
//                                               border:
//                                                 "1px solid lightgray",
//                                               padding: "0px",
//                                             }}
//                                             align="center"
//                                           >
//                                             <TextField
//                                               value={
//                                                 item.unit?.name || ""
//                                               }
//                                               disabled
//                                               fullWidth
//                                               variant="standard"

//                                             />
//                                           </TableCell>
//                                           <TableCell
//                                             sx={{
//                                               border:
//                                                 "1px solid lightgray",
//                                               padding: "0px",
//                                             }}
//                                             align="center"
//                                           >
//                                             <TextField

//                                               fullWidth
//                                               inputProps={{ min: "0" }}
//                                               required
//                                               variant="standard"
//                                               InputProps={{
//                                                 startAdornment: (
//                                                   <InputAdornment position="center">
//                                                     <CurrencyRupeeIcon
//                                                       style={{
//                                                         fontSize: "15px",
//                                                       }}
//                                                     />
//                                                   </InputAdornment>
//                                                 ),
//                                               }}

//                                               name="price"
//                                               value={item.price || ""}
//                                               onChange={(e) => handleItemFieldChange(index, e)}
//                                             />
//                                           </TableCell>
//                                           <TableCell
//                                             sx={{
//                                               border:
//                                                 "1px solid lightgray",
//                                               padding: "0px",
//                                             }}
//                                             align="center"
//                                           >
//                                             <TextField
//                                               name="price"
//                                               value={item.amount || ""}
//                                               disabled
//                                               fullWidth
//                                               variant="standard"
//                                               inputProps={{ min: "0" }}
//                                               required
//                                               InputProps={{
//                                                 startAdornment: (
//                                                   <InputAdornment position="center">
//                                                     <CurrencyRupeeIcon
//                                                       style={{
//                                                         fontSize: "15px",
//                                                       }}
//                                                     />
//                                                   </InputAdornment>
//                                                 ),
//                                               }}

//                                             />
//                                           </TableCell>
//                                           <TableCell
//                                             sx={{
//                                               border:
//                                                 "1px solid lightgray",
//                                               padding: "0px",
//                                             }}
//                                             align="center"
//                                           >
//                                             <Button

//                                               onClick={() => handleDeleteItem(index)}
//                                               color="error"
//                                             >
//                                               <CancelIcon />
//                                             </Button>
//                                           </TableCell>
//                                         </TableRow>
//                                       )
//                                     )}
//                                   </TableBody>
//                                 </Table>
//                               </TableContainer>
//                               <h5
//                                 gutterBottom
//                                 className="text-end me-2 mt-2"
//                               >
//                                 <span className=" me-2" style={{fontSize:'17px'}}>
//                                   Total Amount:
//                                   <span>
//                                     <CurrencyRupeeIcon
//                                       style={{ fontSize: "18px" }}
//                                     />
//                                   </span>
//                                   <span className="fw-bold">
//                                   {formData.totalItemAmount || ""}

//                                   </span>
//                                 </span>
//                               </h5>

//   {/* Bill sundry Start */}

//   <div className="row mt-3 d justify-content-end">

//                                 <div className="col-xl-6 mt-1 ">
//                                   <TableContainer
//                                     component={Paper}
//                                     sx={{ maxHeight: 320 }}
//                                   >
//                                     <Table>
//                                       <TableHead>
//                                         <TableRow>
//                                           <TableCell
//                                             align="center"
//                                             sx={{
//                                               border: "1px solid lightgray",
//                                               padding: "4px",
//                                               background: "#bbdefb",
//                                             }}
//                                             className="p-0 fw-bold fixed"
//                                           >
//                                             No.
//                                           </TableCell>
//                                           <TableCell
//                                             sx={{
//                                               border: "1px solid lightgray",
//                                               padding: "4px",
//                                               background: "#bbdefb",
//                                             }}
//                                             className="p-0 fw-bold fixed"
//                                             align="center"
//                                           >
//                                             Packeging Charge
//                                           </TableCell>
//                                           <TableCell
//                                             sx={{
//                                               border: "1px solid lightgray",
//                                               padding: "4px",
//                                               background: "#bbdefb",
//                                             }}
//                                             className="p-0 fw-bold fixed"
//                                             align="center"
//                                           >
//                                             GST
//                                           </TableCell>
//                                           <TableCell
//                                             sx={{
//                                               border: "1px solid lightgray",
//                                               padding: "4px",
//                                               background: "#bbdefb",
//                                             }}
//                                             className="p-0 fw-bold fixed"
//                                             align="center"
//                                           >
//                                             Other Expenses
//                                           </TableCell>

//                                         </TableRow>
//                                       </TableHead>
//                                       <TableBody
//                                         sx={{
//                                           background: "white",
//                                           overflowY: "auto",
//                                         }}
//                                       >

//                                             <TableRow>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "0px",
//                                                 }}
//                                                 align="center"
//                                               >
//                                                 <span className="ps-2 pe-2">

//                                                 </span>
//                                               </TableCell>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "0px",
//                                                   width: "200px",
//                                                 }}
//                                                 align="center"
//                                               >
//                                                {/* <TextField
//                                                 name="packingCharges"
//                                               type="number"

//                                               value={formData.packingCharges || ""}
//                                               onChange={handleChange}
//                                               size="small"
//                                               variant="standard"
//                                                /> */}

// <TextField
//   name="packingCharges"
//   type="number"
//   value={formData.packingCharges || ""}
//   onChange={handleChange}
//   size="small"
//   variant="standard"
//   InputProps={{
//     startAdornment: (
//       <InputAdornment position="start" style={{ marginRight: '-1px',marginBottom:'3px' }}>
//         <CurrencyRupeeIcon style={{ fontSize: "15px"}} />
//       </InputAdornment>
//     ),
//   }}
// />

//                                               </TableCell>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "0px",
//                                                 }}
//                                                 align="center"
//                                               >

// <TextField
//                                               name="gstExpenses"
//                                               type="number"

//                                               value={formData.gstExpenses || ""}
//                                               onChange={handleChange}
//                                               size="small"
//                                               variant="standard"
//                                               InputProps={{
//                                                 startAdornment: (
//                                                   <InputAdornment position="start" style={{ marginRight: '-1px',marginBottom:'3px' }}>
//                                                     <CurrencyRupeeIcon style={{ fontSize: "15px"}} />
//                                                   </InputAdornment>
//                                                 ),
//                                               }}
//                                             />
//                                               </TableCell>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "0px",
//                                                 }}
//                                                 align="center"
//                                               >

// <TextField
//                                               name="otherExpenses"
//                                               type="number"

//                                               value={formData.otherExpenses || ""}
//                                               onChange={handleChange}
//                                               size="small"
//                                               variant="standard"
//                                               InputProps={{
//                                                 startAdornment: (
//                                                   <InputAdornment position="start" style={{ marginRight: '-1px',marginBottom:'3px' }}>
//                                                     <CurrencyRupeeIcon style={{ fontSize: "15px"}} />
//                                                   </InputAdornment>
//                                                 ),
//                                               }}
//                                             />
//                                               </TableCell>

//                                             </TableRow>

//                                       </TableBody>
//                                     </Table>

//                                   </TableContainer>

//                                   <h5 className="text-end me-2 mt-2">
//                                     <span className="fw-bold me-2" style={{fontSize:'15px'}}>
//                                     {/* Amount: {formData.billSundryAmount} */}
//                                     Amount:
//                                     <CurrencyRupeeIcon
//                                       style={{ fontSize: "15px" }}
//                                     />
//                                     {formData.billSundryAmount || ""}
//                                     </span>
//                                   </h5>
//                                 </div>
//                               </div>

//                               {/* Bill sundry End */}

//                               <div className="row mt-3">
//                                 <div className="col-xl-12">
//                                   <Button
//                                     type="button"
//                                     variant="contained"
//                                     color="secondary"
//                                     // onClick={handleAddItem}
//                                     onClick={handleAddItem}
//                                     className="me-2"
//                                   >
//                                     Add Item
//                                   </Button>
//                                   <Button
//                                     type="submit"
//                                     variant="contained"
//                                     color="primary"
//                                     className="fw-bold"
//                                   >
//                                     Update Purchase Item
//                                   </Button>
//                                 </div>
//                               </div>
//                             </div>

//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Box>
//               </div>
//             </div>
//           </div>
//         </Box>
//       </Box>
//     </div>
//   </div>
//    </div>
//    <ToastContainer />
// </>

//   );
// };

// export default UpdatePurchaseItem;

//--------------------------original code ---------------------------//

// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { styled } from "@mui/material/styles";
// import PercentIcon from "@mui/icons-material/Percent";
// import CancelIcon from "@mui/icons-material/Cancel";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import InputAdornment from "@mui/material/InputAdornment";
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
// import api from "../../../../services/api";

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const UpdatePurchaseItem = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [items, setItems] = useState([]);
//   const [suppliers, setSuppliers] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [selectedSupplier, setSelectedSupplier] = useState(null);
//   const [formData, setFormData] = useState({
//     supplierName: "",
//     companyName: "",
//     purchaseDate: "",
//     invoiceDate: "",
//     supplierVoucherNo: "",
//     purchaseVoucherNo: "",
//     itemsList: [],
//     packingCharges: "",
//     gstExpenses: "",
//     otherExpenses: "",
//     totalItemAmount: "",
//     billSundryAmount: "",
//     totalAmount: "",
//   });
//   const [itemData, setItemData] = useState({});

//   const getAvailableItems = () => {
//     return items;
//   };

//   const [transportDetails, setTransportDetails] = useState({
//     transportName: "",
//     vehicleNo: "",
//     date: "",
//     stationFrom: "",
//     stationTo: "",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch purchase data
//         const purchaseResponse = await api.get(`/api/purchases/${id}`);
//         const purchaseData = purchaseResponse.data;

//         // Format dates
//         const formattedPurchaseDate = new Date(purchaseData.purchaseDate)
//           .toISOString()
//           .split("T")[0];
//         const formattedInvoiceDate = new Date(purchaseData.invoiceDate)
//           .toISOString()
//           .split("T")[0];

//         setFormData({
//           ...purchaseData,
//           purchaseDate: formattedPurchaseDate,
//           invoiceDate: formattedInvoiceDate,
//         });
//         const formattedTransportDate = new Date(
//           purchaseData.transportDetails.date
//         )
//           .toISOString()
//           .split("T")[0];

//         setTransportDetails({
//           transportName: purchaseData.transportDetails.transportName || "",
//           vehicleNo: purchaseData.transportDetails.vehicleNo || "",
//           date: formattedTransportDate || "",
//           stationFrom: purchaseData.transportDetails.stationFrom || "",
//           stationTo: purchaseData.transportDetails.stationTo || "",
//         });

//         // Fetch suppliers
//         const suppliersResponse = await api.get("/api/suppliers");
//         const allSuppliers = suppliersResponse.data;
//         setSuppliers(allSuppliers);

//         // Map unique companies
//         const uniqueCompanies = Array.from(
//           new Set(allSuppliers.map((supplier) => supplier.partyName))
//         ).map((partyName) => ({
//           name: partyName,
//           supplier: allSuppliers.find(
//             (supplier) => supplier.partyName === partyName
//           ),
//         }));
//         setCompanies(uniqueCompanies);

//         // Find the corresponding supplier
//         const supplier = allSuppliers.find(
//           (s) => `${s.firstName} ${s.lastName}` === purchaseData.supplierName
//         );

//         // Set supplier data and form state
//         if (supplier) {
//           setSelectedSupplier(supplier);
//           setFormData((prevState) => ({
//             ...prevState,
//             companyName: supplier.partyName,
//             supplierName: `${supplier.firstName} ${supplier.lastName}`,
//           }));
//         } else {
//           // Handle case where supplier is not found
//           toast.warn("Supplier not found");
//           setFormData((prevState) => ({
//             ...prevState,
//             companyName: "",
//             supplierName: "",
//           }));
//         }

//         // Fetch item data
//         const itemIds = purchaseData.itemsList.map((item) => item.item._id);
//         const itemResponses = await Promise.all(
//           itemIds.map((itemId) => api.get(`/api/jewelry-items/${itemId}`))
//         );
//         const itemsData = itemResponses.reduce((acc, response) => {
//           acc[response.data._id] = response.data;
//           return acc;
//         }, {});
//         setItemData(itemsData);

//         const updatedItemsList = purchaseData.itemsList.map((item) => {
//           const itemDetails = itemsData[item.item._id] || {};
//           return {
//             ...item,
//             item: itemDetails,
//             price: item.price,
//             unit: itemDetails?.unit || "",
//             amount: (item.quantity * (item.price || 0)).toFixed(2),
//             isPredefined: true,
//           };
//         });
//         console.log("Updated Items List:", updatedItemsList);

//         setFormData((prevState) => ({
//           ...prevState,
//           itemsList: updatedItemsList,
//         }));

//         // Calculate total amount
//         calculateTotalAmount(updatedItemsList, {
//           packingCharges: purchaseData.packingCharges,
//           gstExpenses: purchaseData.gstExpenses,
//           otherExpenses: purchaseData.otherExpenses,
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         toast.error("Error fetching data");
//       }
//     };

//     fetchData();

//     const fetchItems = async () => {
//       try {
//         const response = await api.get("/api/jewelry-items");
//         setItems(response.data);
//       } catch (error) {
//         console.error("Error fetching items:", error);
//         toast.error("Error fetching items");
//       }
//     };

//     fetchItems();
//   }, [id]);

//   const handleItemChange = async (index, itemId) => {
//     if (!selectedSupplier) {
//       toast.warn("Please select a supplier first");
//       return;
//     }

//     const selectedItem = itemData[itemId] || (await fetchItemData(itemId));

//     const updatedItemsList = [...formData.itemsList];
//     updatedItemsList[index] = {
//       ...updatedItemsList[index],
//       item: selectedItem,
//       unit: selectedItem?.unit || "",
//       amount: (
//         updatedItemsList[index].quantity * (updatedItemsList[index].price || 0)
//       ).toFixed(2),
//     };

//     setFormData({ ...formData, itemsList: updatedItemsList });
//     calculateTotalAmount(updatedItemsList);
//   };

//   const fetchItemData = async (itemId) => {
//     try {
//       if (!itemId) throw new Error("Invalid item ID");
//       const response = await api.get(`/api/jewelry-items/${itemId}`);
//       const itemDetails = response.data;

//       setItemData((prevData) => ({
//         ...prevData,
//         [itemId]: itemDetails,
//       }));

//       return itemDetails;
//     } catch (error) {
//       console.error("Error fetching item data:", error);
//       toast.error("Error fetching item data");
//       return { unit: "" }; // Default empty unit if data fetch fails
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));

//     if (
//       name === "packingCharges" ||
//       name === "gstExpenses" ||
//       name === "otherExpenses"
//     ) {
//       calculateTotalAmount(formData.itemsList, {
//         packingCharges:
//           name === "packingCharges" ? value : formData.packingCharges,
//         gstExpenses: name === "gstExpenses" ? value : formData.gstExpenses,
//         otherExpenses:
//           name === "otherExpenses" ? value : formData.otherExpenses,
//       });
//     }
//   };

//   const handleItemFieldChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedItemsList = [...formData.itemsList];

//     const validatedValue = Math.max(0, value);

//     updatedItemsList[index] = {
//       ...updatedItemsList[index],
//       [name]: validatedValue,
//     };

//     if (name === "quantity" || name === "price") {
//       const quantity =
//         name === "quantity" ? validatedValue : updatedItemsList[index].quantity;
//       const price =
//         name === "price" ? validatedValue : updatedItemsList[index].price;
//       updatedItemsList[index].amount = (quantity * price).toFixed(2);
//     }

//     setFormData({ ...formData, itemsList: updatedItemsList });
//     calculateTotalAmount(updatedItemsList);
//   };

//   const handleAddItem = () => {
//     const availableItems = getAvailableItems();
//     if (availableItems.length === 0) {
//       toast.warn("All items have been added already.");
//       return;
//     }

//     const updatedItemsList = [
//       ...formData.itemsList,
//       {
//         item: null, // Default empty item
//         quantity: "",
//         unit: "",
//         price: "",
//         amount: "",
//         isPredefined: false,
//       },
//     ];

//     setFormData((prevState) => ({
//       ...prevState,
//       itemsList: updatedItemsList,
//     }));
//   };

//   const handleDeleteItem = (index) => {
//     const updatedItemsList = [...formData.itemsList];
//     updatedItemsList.splice(index, 1);
//     setFormData((prevState) => ({
//       ...prevState,
//       itemsList: updatedItemsList,
//     }));
//     calculateTotalAmount(updatedItemsList);
//   };

//   const calculateTotalAmount = (itemsList, expenses = {}) => {
//     const totalItemAmount = itemsList.reduce(
//       (total, item) => total + (parseFloat(item.amount) || 0),
//       0
//     );
//     const packingCharges = parseFloat(expenses.packingCharges) || 0;
//     const gstExpenses = parseFloat(expenses.gstExpenses) || 0;
//     const otherExpenses = parseFloat(expenses.otherExpenses) || 0;

//     const totalAmount =
//       totalItemAmount + packingCharges + gstExpenses + otherExpenses;
//     const billSundryAmount =
//       totalItemAmount - (packingCharges + gstExpenses + otherExpenses);

//     setFormData((prevState) => ({
//       ...prevState,
//       totalItemAmount: totalItemAmount.toFixed(2),
//       billSundryAmount: billSundryAmount.toFixed(2),
//       totalAmount: totalAmount.toFixed(2),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.itemsList.length === 0) {
//       toast.error("Please add at least one item.");
//       return;
//     }

//     try {
//       await api.put(
//         `/api/purchases/${id}`,
//         { ...formData, transportDetails } // Include transportDetails here
//       );

//       toast.success("Purchase item updated successfully");
//       navigate("/purchase_voucher_list");
//     } catch (error) {
//       console.error("Error updating purchase item:", error);
//       toast.error("Error updating purchase item");
//     }
//   };

//   return (
//     <>
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
//                             Update Purchase Item
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
//                                         options={companies.map(
//                                           (company) => company.name
//                                         )}
//                                         value={formData.companyName || ""}
//                                         onChange={(e, newValue) => {
//                                           const selectedCompany =
//                                             companies.find(
//                                               (company) =>
//                                                 company.name === newValue
//                                             );
//                                           const supplier = selectedCompany
//                                             ? selectedCompany.supplier
//                                             : {};

//                                           setFormData((prevState) => ({
//                                             ...prevState,
//                                             companyName: newValue,
//                                             supplierName: supplier
//                                               ? `${supplier.firstName} ${supplier.lastName}`
//                                               : "",
//                                           }));

//                                           setSelectedSupplier(supplier);
//                                         }}
//                                         renderInput={(params) => (
//                                           <TextField
//                                             {...params}
//                                             label="Company Name"
//                                             size="small"
//                                             variant="outlined"
//                                           />
//                                         )}
//                                       />
//                                     </FormControl>
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <Autocomplete
//                                         options={suppliers.map(
//                                           (supplier) => supplier.firstName
//                                         )}
//                                         value={formData.supplierName || ""}
//                                         onChange={(e, newValue) => {
//                                           const supplier = suppliers.find(
//                                             (supplier) =>
//                                               `${supplier.firstName} ${supplier.lastName}` ===
//                                               newValue
//                                           );

//                                           setFormData((prevState) => ({
//                                             ...prevState,
//                                             supplierName: newValue,
//                                           }));

//                                           setSelectedSupplier(supplier);
//                                         }}
//                                         renderInput={(params) => (
//                                           <TextField
//                                             {...params}
//                                             label="Supplier Name"
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
//                                         name="purchaseDate"
//                                         label="Purchase Date"
//                                         type="date"
//                                         value={formData.purchaseDate || ""}
//                                         onChange={handleChange}
//                                         variant="outlined"
//                                         InputLabelProps={{
//                                           shrink: true,
//                                         }}
//                                         size="small"
//                                       />
//                                     </FormControl>
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <TextField
//                                         name="invoiceDate"
//                                         label="Invoice Date"
//                                         type="date"
//                                         value={formData.invoiceDate || ""}
//                                         onChange={handleChange}
//                                         variant="outlined"
//                                         InputLabelProps={{
//                                           shrink: true,
//                                         }}
//                                         size="small"
//                                       />
//                                     </FormControl>
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth margin="normal">
//                                       <TextField
//                                         name="supplierVoucherNo"
//                                         label="Supplier Voucher No"
//                                         value={formData.supplierVoucherNo || ""}
//                                         onChange={handleChange}
//                                         variant="outlined"
//                                         size="small"
//                                       />
//                                     </FormControl>
//                                   </div>
//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth margin="normal">
//                                       <TextField
//                                         name="purchaseVoucherNo"
//                                         label="Purchase Voucher No"
//                                         value={formData.purchaseVoucherNo || ""}
//                                         onChange={handleChange}
//                                         variant="outlined"
//                                         size="small"
//                                       />
//                                     </FormControl>
//                                   </div>
//                                 </div>
//                                 <div className="row">
//                                   <div className="col-xl-12 d-flex justify-content-end">
//                                     <Button
//                                       type="button"
//                                       variant="contained"
//                                       color="secondary"
//                                       onClick={handleAddItem}
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
//                                           {formData.itemsList.map(
//                                             (item, index) => (
//                                               <TableRow key={index}>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "0px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <span className="ps-2 pe-2 pt-0 pb-0">
//                                                     {index + 1}
//                                                   </span>
//                                                 </TableCell>

//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "0px",
//                                                     width: "300px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <FormControl fullWidth>
//                                                     <Autocomplete
//                                                       options={getAvailableItems()}
//                                                       getOptionLabel={(
//                                                         option
//                                                       ) => option.name}
//                                                       value={item.item || null}
//                                                       onChange={(e, newValue) =>
//                                                         handleItemChange(
//                                                           index,
//                                                           newValue?._id
//                                                         )
//                                                       }
//                                                       renderInput={(params) => (
//                                                         <TextField
//                                                           {...params}
//                                                           label="Item"
//                                                           variant="outlined"
//                                                         />
//                                                       )}
//                                                     />
//                                                   </FormControl>
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
//                                                     fullWidth
//                                                     inputProps={{ min: "0" }}
//                                                     required
//                                                     variant="standard"
//                                                     name="quantity"
//                                                     value={item.quantity || ""}
//                                                     onChange={(e) =>
//                                                       handleItemFieldChange(
//                                                         index,
//                                                         e
//                                                       )
//                                                     }
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
//                                                     value={
//                                                       item.unit?.name || ""
//                                                     }
//                                                     disabled
//                                                     fullWidth
//                                                     variant="standard"
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
//                                                     fullWidth
//                                                     inputProps={{ min: "0" }}
//                                                     required
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment position="center">
//                                                           <CurrencyRupeeIcon
//                                                             style={{
//                                                               fontSize: "15px",
//                                                             }}
//                                                           />
//                                                         </InputAdornment>
//                                                       ),
//                                                     }}
//                                                     name="price"
//                                                     value={item.price || ""}
//                                                     onChange={(e) =>
//                                                       handleItemFieldChange(
//                                                         index,
//                                                         e
//                                                       )
//                                                     }
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
//                                                     name="price"
//                                                     value={item.amount || ""}
//                                                     disabled
//                                                     fullWidth
//                                                     variant="standard"
//                                                     inputProps={{ min: "0" }}
//                                                     required
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment position="center">
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
//                                                   <Button
//                                                     onClick={() =>
//                                                       handleDeleteItem(index)
//                                                     }
//                                                     color="error"
//                                                   >
//                                                     <CancelIcon />
//                                                   </Button>
//                                                 </TableCell>
//                                               </TableRow>
//                                             )
//                                           )}
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
//                                         Total Item Ammount:
//                                         <span>
//                                           <CurrencyRupeeIcon
//                                             style={{ fontSize: "18px" }}
//                                           />
//                                         </span>
//                                         <span className="fw-bold">
//                                           {formData.totalItemAmount || ""}
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
//                                                     width: "200px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <TextField
//                                                     name="packingCharges"
//                                                     type="number"
//                                                     value={
//                                                       formData.packingCharges ||
//                                                       ""
//                                                     }
//                                                     onChange={handleChange}
//                                                     size="small"
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment
//                                                           position="end"
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
//                                                     name="gstExpenses"
//                                                     type="number"
//                                                     value={
//                                                       formData.gstExpenses || ""
//                                                     }
//                                                     onChange={handleChange}
//                                                     size="small"
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment
//                                                           position="end"
//                                                           style={{
//                                                             marginRight: "-0px",
//                                                             marginBottom: "3px",
//                                                           }}
//                                                         >
//                                                           <PercentIcon
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
//                                                     type="number"
//                                                     value={
//                                                       formData.otherExpenses ||
//                                                       ""
//                                                     }
//                                                     onChange={handleChange}
//                                                     size="small"
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment
//                                                           position="end"
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
//                                             Bil Sundry Amount:
//                                             <CurrencyRupeeIcon
//                                               style={{ fontSize: "15px" }}
//                                             />
//                                             {formData.billSundryAmount || ""}
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
//                                             {formData.totalAmount || ""}
//                                           </span>
//                                         </h5>
//                                       </div>
//                                     </div>

//                                     {/* Bill sundry End */}
//                                     <Box>
//                                       <span>Transport Detail</span>
//                                       <TableContainer component={Paper}>
//                                         <Table>
//                                           <TableHead>
//                                             <TableRow>
//                                               <TableCell
//                                                 align="center"
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold fixed"
//                                               >
//                                                 Date
//                                               </TableCell>
//                                               <TableCell
//                                                 align="center"
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold fixed"
//                                               >
//                                                 Transport Name
//                                               </TableCell>
//                                               <TableCell
//                                                 align="center"
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold fixed"
//                                               >
//                                                 Vehicle No.
//                                               </TableCell>

//                                               <TableCell
//                                                 align="center"
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold fixed"
//                                               >
//                                                 Station From
//                                               </TableCell>
//                                               <TableCell
//                                                 align="center"
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold fixed"
//                                               >
//                                                 Station To
//                                               </TableCell>
//                                             </TableRow>
//                                           </TableHead>
//                                           <TableBody
//                                             sx={{
//                                               background: "white",
//                                               overflowY: "auto",
//                                             }}
//                                           >
//                                             <TableRow>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "0px",
//                                                 }}
//                                                 align="center"
//                                               >
//                                                 <TextField
//                                                   size="small"
//                                                   name="date"
//                                                   label="Date"
//                                                   type="date"
//                                                   value={
//                                                     transportDetails.date || ""
//                                                   }
//                                                   onChange={(e) =>
//                                                     setTransportDetails({
//                                                       ...transportDetails,
//                                                       date: e.target.value,
//                                                     })
//                                                   }
//                                                   variant="standard"
//                                                   InputLabelProps={{
//                                                     shrink: true,
//                                                   }}
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
//                                                   type="text"
//                                                   size="small"
//                                                   variant="standard"
//                                                   name="transportName"
//                                                   value={
//                                                     transportDetails.transportName ||
//                                                     ""
//                                                   }
//                                                   onChange={(e) =>
//                                                     setTransportDetails({
//                                                       ...transportDetails,
//                                                       transportName:
//                                                         e.target.value,
//                                                     })
//                                                   }
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
//                                                   size="small"
//                                                   variant="standard"
//                                                   name="vehicleNo"
//                                                   value={
//                                                     transportDetails.vehicleNo ||
//                                                     ""
//                                                   }
//                                                   onChange={(e) =>
//                                                     setTransportDetails({
//                                                       ...transportDetails,
//                                                       vehicleNo: e.target.value,
//                                                     })
//                                                   }
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
//                                                   size="small"
//                                                   variant="standard"
//                                                   name="stationFrom"
//                                                   value={
//                                                     transportDetails.stationFrom ||
//                                                     ""
//                                                   }
//                                                   onChange={(e) =>
//                                                     setTransportDetails({
//                                                       ...transportDetails,
//                                                       stationFrom:
//                                                         e.target.value,
//                                                     })
//                                                   }
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
//                                                   size="small"
//                                                   variant="standard"
//                                                   name="stationTo"
//                                                   value={
//                                                     transportDetails.stationTo ||
//                                                     ""
//                                                   }
//                                                   onChange={(e) =>
//                                                     setTransportDetails({
//                                                       ...transportDetails,
//                                                       stationTo: e.target.value,
//                                                     })
//                                                   }
//                                                 />
//                                               </TableCell>
//                                             </TableRow>
//                                           </TableBody>
//                                         </Table>
//                                       </TableContainer>
//                                     </Box>

//                                     <div className="row mt-3">
//                                       <div className="col-xl-12">
//                                         <Button
//                                           type="submit"
//                                           variant="contained"
//                                           color="primary"
//                                           className="fw-bold"
//                                         >
//                                           Update Purchase Item
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
//     </>
//   );
// };

// export default UpdatePurchaseItem;

//----------------------------------------for a change ----------------------//

// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { styled } from "@mui/material/styles";
// import PercentIcon from "@mui/icons-material/Percent";
// import CancelIcon from "@mui/icons-material/Cancel";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import InputAdornment from "@mui/material/InputAdornment";
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
// import api from "../../../../services/api";

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const UpdatePurchaseItem = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [items, setItems] = useState([]);
//   const [suppliers, setSuppliers] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [selectedSupplier, setSelectedSupplier] = useState(null);
//   const [formData, setFormData] = useState({
//     supplierName: "",
//     companyName: "",
//     purchaseDate: "",
//     invoiceDate: "",
//     supplierVoucherNo: "",
//     purchaseVoucherNo: "",
//     itemsList: [],
//     packingCharges: "",
//     gstExpenses: "",
//     otherExpenses: "",
//     totalItemAmount: "",
//     billSundryAmount: "",
//     totalAmount: "",
//   });
//   const [itemData, setItemData] = useState({});

//   const getAvailableItems = () => {
//     return items;
//   };

//   const [transportDetails, setTransportDetails] = useState({
//     transportName: "",
//     vehicleNo: "",
//     date: "",
//     stationFrom: "",
//     stationTo: "",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch purchase data
//         const purchaseResponse = await api.get(`/api/purchases/${id}`);
//         const purchaseData = purchaseResponse.data;

//         // Format dates
//         const formattedPurchaseDate = new Date(purchaseData.purchaseDate)
//           .toISOString()
//           .split("T")[0];
//         const formattedInvoiceDate = new Date(purchaseData.invoiceDate)
//           .toISOString()
//           .split("T")[0];

//         setFormData({
//           ...purchaseData,
//           purchaseDate: formattedPurchaseDate,
//           invoiceDate: formattedInvoiceDate,
//         });

//         const formattedTransportDate = new Date(
//           purchaseData.transportDetails.date
//         )
//           .toISOString()
//           .split("T")[0];

//         setTransportDetails({
//           transportName: purchaseData.transportDetails.transportName || "",
//           vehicleNo: purchaseData.transportDetails.vehicleNo || "",
//           date: formattedTransportDate || "",
//           stationFrom: purchaseData.transportDetails.stationFrom || "",
//           stationTo: purchaseData.transportDetails.stationTo || "",
//         });

//         // Fetch suppliers
//         const suppliersResponse = await api.get("/api/suppliers");
//         const allSuppliers = suppliersResponse.data;
//         setSuppliers(allSuppliers);

//         // Map unique companies
//         const uniqueCompanies = Array.from(
//           new Set(allSuppliers.map((supplier) => supplier.partyName))
//         ).map((partyName) => ({
//           name: partyName,
//           supplier: allSuppliers.find(
//             (supplier) => supplier.partyName === partyName
//           ),
//         }));
//         setCompanies(uniqueCompanies);

//         // Find the corresponding supplier
//         const supplier = allSuppliers.find(
//           (s) => `${s.firstName} ${s.lastName}` === purchaseData.supplierName
//         );

//         // Set supplier data and form state
//         if (supplier) {
//           setSelectedSupplier(supplier);
//           setFormData((prevState) => ({
//             ...prevState,
//             companyName: supplier.partyName,
//             supplierName: `${supplier.firstName} ${supplier.lastName}`,
//           }));
//         } else {
//           // Handle case where supplier is not found
//           toast.warn("Supplier not found");
//           setFormData((prevState) => ({
//             ...prevState,
//             companyName: "",
//             supplierName: "",
//           }));
//         }

//         // Fetch item data
//         const itemIds = purchaseData.itemsList.map((item) => item.item._id);
//         const itemResponses = await Promise.all(
//           itemIds.map((itemId) => api.get(`/api/jewelry-items/${itemId}`))
//         );
//         const itemsData = itemResponses.reduce((acc, response) => {
//           acc[response.data._id] = response.data;
//           return acc;
//         }, {});
//         setItemData(itemsData);

//         const updatedItemsList = purchaseData.itemsList.map((item) => {
//           const itemDetails = itemsData[item.item._id] || {};
//           return {
//             ...item,
//             item: itemDetails,
//             price: item.price,
//             unit: itemDetails?.unit || "",
//             amount: (item.quantity * (item.price || 0)).toFixed(2),
//             isPredefined: true,
//           };
//         });
//         console.log("Updated Items List:", updatedItemsList);

//         setFormData((prevState) => ({
//           ...prevState,
//           itemsList: updatedItemsList,
//         }));

//         // Calculate total amount
//         calculateTotalAmount(updatedItemsList, {
//           packingCharges: purchaseData.packingCharges,
//           gstExpenses: purchaseData.gstExpenses,
//           otherExpenses: purchaseData.otherExpenses,
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         toast.error("Error fetching data");
//       }
//     };

//     fetchData();

//     const fetchItems = async () => {
//       try {
//         const response = await api.get("/api/jewelry-items");
//         setItems(response.data);
//       } catch (error) {
//         console.error("Error fetching items:", error);
//         toast.error("Error fetching items");
//       }
//     };

//     fetchItems();
//   }, [id]);

//   const handleItemChange = async (index, itemId) => {
//     if (!selectedSupplier) {
//       toast.warn("Please select a supplier first");
//       return;
//     }

//     const selectedItem = itemData[itemId] || (await fetchItemData(itemId));

//     const updatedItemsList = [...formData.itemsList];
//     updatedItemsList[index] = {
//       ...updatedItemsList[index],
//       item: selectedItem,
//       unit: selectedItem?.unit || "",
//       amount: (
//         updatedItemsList[index].quantity * (updatedItemsList[index].price || 0)
//       ).toFixed(2),
//     };

//     setFormData({ ...formData, itemsList: updatedItemsList });
//     calculateTotalAmount(updatedItemsList);
//   };

//   const fetchItemData = async (itemId) => {
//     try {
//       if (!itemId) throw new Error("Invalid item ID");
//       const response = await api.get(`/api/jewelry-items/${itemId}`);
//       const itemDetails = response.data;

//       setItemData((prevData) => ({
//         ...prevData,
//         [itemId]: itemDetails,
//       }));

//       return itemDetails;
//     } catch (error) {
//       console.error("Error fetching item data:", error);
//       toast.error("Error fetching item data");
//       return { unit: "" }; // Default empty unit if data fetch fails
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));

//     if (
//       name === "packingCharges" ||
//       name === "gstExpenses" ||
//       name === "otherExpenses"
//     ) {
//       calculateTotalAmount(formData.itemsList, {
//         packingCharges:
//           name === "packingCharges" ? value : formData.packingCharges,
//         gstExpenses: name === "gstExpenses" ? value : formData.gstExpenses,
//         otherExpenses:
//           name === "otherExpenses" ? value : formData.otherExpenses,
//       });
//     }
//   };

//   const handleItemFieldChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedItemsList = [...formData.itemsList];

//     const validatedValue = Math.max(0, value);

//     updatedItemsList[index] = {
//       ...updatedItemsList[index],
//       [name]: validatedValue,
//     };

//     if (name === "quantity" || name === "price") {
//       const quantity =
//         name === "quantity" ? validatedValue : updatedItemsList[index].quantity;
//       const price =
//         name === "price" ? validatedValue : updatedItemsList[index].price;
//       updatedItemsList[index].amount = (quantity * price).toFixed(2);
//     }

//     setFormData({ ...formData, itemsList: updatedItemsList });
//     calculateTotalAmount(updatedItemsList);
//   };

//   const handleAddItem = () => {
//     // Only add items that are already part of the original purchase
//     const availableItems = formData.itemsList.map((item) => item.item._id);
//     const newItems = items.filter((item) => !availableItems.includes(item._id));

//     if (newItems.length === 0) {
//       toast.warn("All items have been added already.");
//       return;
//     }

//     const updatedItemsList = [
//       ...formData.itemsList,
//       {
//         item: null, // Default empty item
//         quantity: "",
//         unit: "",
//         price: "",
//         amount: "0.00",
//         isPredefined: false,
//       },
//     ];

//     setFormData({ ...formData, itemsList: updatedItemsList });
//   };

//   const handleDeleteItem = (index) => {
//     const updatedItemsList = [...formData.itemsList];
//     updatedItemsList.splice(index, 1);
//     setFormData((prevState) => ({
//       ...prevState,
//       itemsList: updatedItemsList,
//     }));
//     calculateTotalAmount(updatedItemsList);
//   };

//   const calculateTotalAmount = (itemsList, expenses = {}) => {
//     const totalItemAmount = itemsList.reduce(
//       (total, item) => total + (parseFloat(item.amount) || 0),
//       0
//     );
//     const packingCharges = parseFloat(expenses.packingCharges) || 0;
//     const gstExpenses = parseFloat(expenses.gstExpenses) || 0;
//     const otherExpenses = parseFloat(expenses.otherExpenses) || 0;

//     const totalAmount =
//       totalItemAmount + packingCharges + gstExpenses + otherExpenses;
//     const billSundryAmount =
//       totalItemAmount - (packingCharges + gstExpenses + otherExpenses);

//     setFormData((prevState) => ({
//       ...prevState,
//       totalItemAmount: totalItemAmount.toFixed(2),
//       billSundryAmount: billSundryAmount.toFixed(2),
//       totalAmount: totalAmount.toFixed(2),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/api/purchases/${id}`, formData);
//       toast.success("Purchase updated successfully");
//       navigate("/purchase_voucher_list");
//     } catch (error) {
//       console.error("Error updating purchase:", error);
//       toast.error("Error updating purchase");
//     }
//   };

//   return (
//     <>
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
//                             Update Purchase Item
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
//                                         options={companies.map(
//                                           (company) => company.name
//                                         )}
//                                         value={formData.companyName || ""}
//                                         onChange={(e, newValue) => {
//                                           const selectedCompany =
//                                             companies.find(
//                                               (company) =>
//                                                 company.name === newValue
//                                             );
//                                           const supplier = selectedCompany
//                                             ? selectedCompany.supplier
//                                             : {};

//                                           setFormData((prevState) => ({
//                                             ...prevState,
//                                             companyName: newValue,
//                                             supplierName: supplier
//                                               ? `${supplier.firstName} ${supplier.lastName}`
//                                               : "",
//                                           }));

//                                           setSelectedSupplier(supplier);
//                                         }}
//                                         renderInput={(params) => (
//                                           <TextField
//                                             {...params}
//                                             label="Company Name"
//                                             size="small"
//                                             variant="outlined"
//                                           />
//                                         )}
//                                       />
//                                     </FormControl>
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <Autocomplete
//                                         options={suppliers.map(
//                                           (supplier) => supplier.firstName
//                                         )}
//                                         value={formData.supplierName || ""}
//                                         onChange={(e, newValue) => {
//                                           const supplier = suppliers.find(
//                                             (supplier) =>
//                                               `${supplier.firstName} ${supplier.lastName}` ===
//                                               newValue
//                                           );

//                                           setFormData((prevState) => ({
//                                             ...prevState,
//                                             supplierName: newValue,
//                                           }));

//                                           setSelectedSupplier(supplier);
//                                         }}
//                                         renderInput={(params) => (
//                                           <TextField
//                                             {...params}
//                                             label="Supplier Name"
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
//                                         name="purchaseDate"
//                                         label="Purchase Date"
//                                         type="date"
//                                         value={formData.purchaseDate || ""}
//                                         onChange={handleChange}
//                                         variant="outlined"
//                                         InputLabelProps={{
//                                           shrink: true,
//                                         }}
//                                         size="small"
//                                       />
//                                     </FormControl>
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <TextField
//                                         name="invoiceDate"
//                                         label="Invoice Date"
//                                         type="date"
//                                         value={formData.invoiceDate || ""}
//                                         onChange={handleChange}
//                                         variant="outlined"
//                                         InputLabelProps={{
//                                           shrink: true,
//                                         }}
//                                         size="small"
//                                       />
//                                     </FormControl>
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth margin="normal">
//                                       <TextField
//                                         name="supplierVoucherNo"
//                                         label="Supplier Voucher No"
//                                         value={formData.supplierVoucherNo || ""}
//                                         onChange={handleChange}
//                                         variant="outlined"
//                                         size="small"
//                                       />
//                                     </FormControl>
//                                   </div>
//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth margin="normal">
//                                       <TextField
//                                         name="purchaseVoucherNo"
//                                         label="Purchase Voucher No"
//                                         value={formData.purchaseVoucherNo || ""}
//                                         onChange={handleChange}
//                                         variant="outlined"
//                                         size="small"
//                                       />
//                                     </FormControl>
//                                   </div>
//                                 </div>
//                                 <div className="row">
//                                   <div className="col-xl-12 d-flex justify-content-end">
//                                     <Button
//                                       type="button"
//                                       variant="contained"
//                                       color="secondary"
//                                       onClick={handleAddItem}
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
//                                           {formData.itemsList.map(
//                                             (item, index) =>
//                                               item.item && item.isPredefined ? (
//                                                 <TableRow key={index}>
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
//                                                         options={getAvailableItems()}
//                                                         getOptionLabel={(
//                                                           option
//                                                         ) => option.name}
//                                                         value={
//                                                           item.item || null
//                                                         }
//                                                         onChange={(
//                                                           e,
//                                                           newValue
//                                                         ) =>
//                                                           handleItemChange(
//                                                             index,
//                                                             newValue?._id
//                                                           )
//                                                         }
//                                                         renderInput={(
//                                                           params
//                                                         ) => (
//                                                           <TextField
//                                                             {...params}
//                                                             label="Item"
//                                                             variant="outlined"
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
//                                                       value={
//                                                         item.quantity || ""
//                                                       }
//                                                       onChange={(e) =>
//                                                         handleItemFieldChange(
//                                                           index,
//                                                           e
//                                                         )
//                                                       }
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
//                                                                 fontSize:
//                                                                   "15px",
//                                                               }}
//                                                             />
//                                                           </InputAdornment>
//                                                         ),
//                                                       }}
//                                                       name="price"
//                                                       value={item.price || ""}
//                                                       onChange={(e) =>
//                                                         handleItemFieldChange(
//                                                           index,
//                                                           e
//                                                         )
//                                                       }
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
//                                                                 fontSize:
//                                                                   "15px",
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
//                                                       onClick={() =>
//                                                         handleDeleteItem(index)
//                                                       }
//                                                       color="error"
//                                                     >
//                                                       <CancelIcon />
//                                                     </Button>
//                                                   </TableCell>
//                                                 </TableRow>
//                                               ) : null
//                                           )}
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
//                                         Total Item Ammount:
//                                         <span>
//                                           <CurrencyRupeeIcon
//                                             style={{ fontSize: "18px" }}
//                                           />
//                                         </span>
//                                         <span className="fw-bold">
//                                           {formData.totalItemAmount || ""}
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
//                                                     width: "200px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <TextField
//                                                     name="packingCharges"
//                                                     type="number"
//                                                     value={
//                                                       formData.packingCharges ||
//                                                       ""
//                                                     }
//                                                     onChange={handleChange}
//                                                     size="small"
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment
//                                                           position="end"
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
//                                                     name="gstExpenses"
//                                                     type="number"
//                                                     value={
//                                                       formData.gstExpenses || ""
//                                                     }
//                                                     onChange={handleChange}
//                                                     size="small"
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment
//                                                           position="end"
//                                                           style={{
//                                                             marginRight: "-0px",
//                                                             marginBottom: "3px",
//                                                           }}
//                                                         >
//                                                           <PercentIcon
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
//                                                     type="number"
//                                                     value={
//                                                       formData.otherExpenses ||
//                                                       ""
//                                                     }
//                                                     onChange={handleChange}
//                                                     size="small"
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment
//                                                           position="end"
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
//                                             Bil Sundry Amount:
//                                             <CurrencyRupeeIcon
//                                               style={{ fontSize: "15px" }}
//                                             />
//                                             {formData.billSundryAmount || ""}
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
//                                             {formData.totalAmount || ""}
//                                           </span>
//                                         </h5>
//                                       </div>
//                                     </div>

//                                     {/* Bill sundry End */}
//                                     <Box>
//                                       <span>Transport Detail</span>
//                                       <TableContainer component={Paper}>
//                                         <Table>
//                                           <TableHead>
//                                             <TableRow>
//                                               <TableCell
//                                                 align="center"
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold fixed"
//                                               >
//                                                 Date
//                                               </TableCell>
//                                               <TableCell
//                                                 align="center"
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold fixed"
//                                               >
//                                                 Transport Name
//                                               </TableCell>
//                                               <TableCell
//                                                 align="center"
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold fixed"
//                                               >
//                                                 Vehicle No.
//                                               </TableCell>

//                                               <TableCell
//                                                 align="center"
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold fixed"
//                                               >
//                                                 Station From
//                                               </TableCell>
//                                               <TableCell
//                                                 align="center"
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold fixed"
//                                               >
//                                                 Station To
//                                               </TableCell>
//                                             </TableRow>
//                                           </TableHead>
//                                           <TableBody
//                                             sx={{
//                                               background: "white",
//                                               overflowY: "auto",
//                                             }}
//                                           >
//                                             <TableRow>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "0px",
//                                                 }}
//                                                 align="center"
//                                               >
//                                                 <TextField
//                                                   size="small"
//                                                   name="date"
//                                                   label="Date"
//                                                   type="date"
//                                                   value={
//                                                     transportDetails.date || ""
//                                                   }
//                                                   onChange={(e) =>
//                                                     setTransportDetails({
//                                                       ...transportDetails,
//                                                       date: e.target.value,
//                                                     })
//                                                   }
//                                                   variant="standard"
//                                                   InputLabelProps={{
//                                                     shrink: true,
//                                                   }}
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
//                                                   type="text"
//                                                   size="small"
//                                                   variant="standard"
//                                                   name="transportName"
//                                                   value={
//                                                     transportDetails.transportName ||
//                                                     ""
//                                                   }
//                                                   onChange={(e) =>
//                                                     setTransportDetails({
//                                                       ...transportDetails,
//                                                       transportName:
//                                                         e.target.value,
//                                                     })
//                                                   }
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
//                                                   size="small"
//                                                   variant="standard"
//                                                   name="vehicleNo"
//                                                   value={
//                                                     transportDetails.vehicleNo ||
//                                                     ""
//                                                   }
//                                                   onChange={(e) =>
//                                                     setTransportDetails({
//                                                       ...transportDetails,
//                                                       vehicleNo: e.target.value,
//                                                     })
//                                                   }
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
//                                                   size="small"
//                                                   variant="standard"
//                                                   name="stationFrom"
//                                                   value={
//                                                     transportDetails.stationFrom ||
//                                                     ""
//                                                   }
//                                                   onChange={(e) =>
//                                                     setTransportDetails({
//                                                       ...transportDetails,
//                                                       stationFrom:
//                                                         e.target.value,
//                                                     })
//                                                   }
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
//                                                   size="small"
//                                                   variant="standard"
//                                                   name="stationTo"
//                                                   value={
//                                                     transportDetails.stationTo ||
//                                                     ""
//                                                   }
//                                                   onChange={(e) =>
//                                                     setTransportDetails({
//                                                       ...transportDetails,
//                                                       stationTo: e.target.value,
//                                                     })
//                                                   }
//                                                 />
//                                               </TableCell>
//                                             </TableRow>
//                                           </TableBody>
//                                         </Table>
//                                       </TableContainer>
//                                     </Box>

//                                     <div className="row mt-3">
//                                       <div className="col-xl-12">
//                                         <Button
//                                           type="submit"
//                                           variant="contained"
//                                           color="primary"
//                                           className="fw-bold"
//                                         >
//                                           Update Purchase Item
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
//     </>
//   );
// };

// export default UpdatePurchaseItem;

// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { styled } from "@mui/material/styles";
// import PercentIcon from "@mui/icons-material/Percent";
// import CancelIcon from "@mui/icons-material/Cancel";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import InputAdornment from "@mui/material/InputAdornment";
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
// import api from "../../../../services/api";

// const UpdatePurchaseItem = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [items, setItems] = useState([]);
//   const [suppliers, setSuppliers] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [selectedSupplier, setSelectedSupplier] = useState(null);
//   const [formData, setFormData] = useState({
//     supplierName: "",
//     companyName: "",
//     purchaseDate: "",
//     invoiceDate: "",
//     supplierVoucherNo: "",
//     purchaseVoucherNo: "",
//     itemsList: [],
//     packingCharges: "",
//     gstExpenses: "",
//     otherExpenses: "",
//     totalItemAmount: "",
//     billSundryAmount: "",
//     totalAmount: "",
//   });
//   const [itemData, setItemData] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch purchase data
//         const purchaseResponse = await api.get(`/api/purchases/${id}`);
//         const purchaseData = purchaseResponse.data;

//         // Format dates
//         const formattedPurchaseDate = new Date(purchaseData.purchaseDate)
//           .toISOString()
//           .split("T")[0];
//         const formattedInvoiceDate = new Date(purchaseData.invoiceDate)
//           .toISOString()
//           .split("T")[0];

//         setFormData({
//           ...purchaseData,
//           purchaseDate: formattedPurchaseDate,
//           invoiceDate: formattedInvoiceDate,
//         });

//         const formattedTransportDate = new Date(
//           purchaseData.transportDetails.date
//         )
//           .toISOString()
//           .split("T")[0];

//         setTransportDetails({
//           transportName: purchaseData.transportDetails.transportName || "",
//           vehicleNo: purchaseData.transportDetails.vehicleNo || "",
//           date: formattedTransportDate || "",
//           stationFrom: purchaseData.transportDetails.stationFrom || "",
//           stationTo: purchaseData.transportDetails.stationTo || "",
//         });

//         // Fetch suppliers
//         const suppliersResponse = await api.get("/api/suppliers");
//         const allSuppliers = suppliersResponse.data;
//         setSuppliers(allSuppliers);

//         // Map unique companies
//         const uniqueCompanies = Array.from(
//           new Set(allSuppliers.map((supplier) => supplier.partyName))
//         ).map((partyName) => ({
//           name: partyName,
//           supplier: allSuppliers.find(
//             (supplier) => supplier.partyName === partyName
//           ),
//         }));
//         setCompanies(uniqueCompanies);

//         // Find the corresponding supplier
//         const supplier = allSuppliers.find(
//           (s) => `${s.firstName} ${s.lastName}` === purchaseData.supplierName
//         );

//         // Set supplier data and form state
//         if (supplier) {
//           setSelectedSupplier(supplier);
//           setFormData((prevState) => ({
//             ...prevState,
//             companyName: supplier.partyName,
//             supplierName: `${supplier.firstName} ${supplier.lastName}`,
//           }));
//         } else {
//           // Handle case where supplier is not found
//           toast.warn("Supplier not found");
//           setFormData((prevState) => ({
//             ...prevState,
//             companyName: "",
//             supplierName: "",
//           }));
//         }

//         // Fetch item data
//         const itemIds = purchaseData.itemsList.map((item) => item.item._id);
//         const itemResponses = await Promise.all(
//           itemIds.map((itemId) => api.get(`/api/jewelry-items/${itemId}`))
//         );
//         const itemsData = itemResponses.reduce((acc, response) => {
//           acc[response.data._id] = response.data;
//           return acc;
//         }, {});
//         setItemData(itemsData);

//         const updatedItemsList = purchaseData.itemsList.map((item) => {
//           const itemDetails = itemsData[item.item._id] || {};
//           return {
//             ...item,
//             item: itemDetails,
//             price: item.price,
//             unit: itemDetails?.unit || "",
//             amount: (item.quantity * (item.price || 0)).toFixed(2),
//             isPredefined: true,
//           };
//         });
//         console.log("Updated Items List:", updatedItemsList);

//         setFormData((prevState) => ({
//           ...prevState,
//           itemsList: updatedItemsList,
//         }));

//         // Calculate total amount
//         calculateTotalAmount(updatedItemsList, {
//           packingCharges: purchaseData.packingCharges,
//           gstExpenses: purchaseData.gstExpenses,
//           otherExpenses: purchaseData.otherExpenses,
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         toast.error("Error fetching data");
//       }
//     };

//     fetchData();

//     const fetchItems = async () => {
//       try {
//         const response = await api.get("/api/jewelry-items");
//         setItems(response.data);
//       } catch (error) {
//         console.error("Error fetching items:", error);
//         toast.error("Error fetching items");
//       }
//     };

//     fetchItems();
//   }, [id]);

//   const handleItemChange = async (index, itemId) => {
//     if (!selectedSupplier) {
//       toast.warn("Please select a supplier first");
//       return;
//     }

//     const selectedItem = itemData[itemId] || (await fetchItemData(itemId));

//     const updatedItemsList = [...formData.itemsList];
//     updatedItemsList[index] = {
//       ...updatedItemsList[index],
//       item: selectedItem,
//       unit: selectedItem?.unit || "",
//       amount: (
//         updatedItemsList[index].quantity * (updatedItemsList[index].price || 0)
//       ).toFixed(2),
//     };

//     setFormData({ ...formData, itemsList: updatedItemsList });
//     calculateTotalAmount(updatedItemsList);
//   };

//   const fetchItemData = async (itemId) => {
//     try {
//       if (!itemId) throw new Error("Invalid item ID");
//       const response = await api.get(`/api/jewelry-items/${itemId}`);
//       const itemDetails = response.data;

//       setItemData((prevData) => ({
//         ...prevData,
//         [itemId]: itemDetails,
//       }));

//       return itemDetails;
//     } catch (error) {
//       console.error("Error fetching item data:", error);
//       toast.error("Error fetching item data");
//       return { unit: "" }; // Default empty unit if data fetch fails
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));

//     if (
//       name === "packingCharges" ||
//       name === "gstExpenses" ||
//       name === "otherExpenses"
//     ) {
//       calculateTotalAmount(formData.itemsList, {
//         packingCharges:
//           name === "packingCharges" ? value : formData.packingCharges,
//         gstExpenses: name === "gstExpenses" ? value : formData.gstExpenses,
//         otherExpenses:
//           name === "otherExpenses" ? value : formData.otherExpenses,
//       });
//     }
//   };

//   const handleItemFieldChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedItemsList = [...formData.itemsList];

//     const validatedValue = Math.max(0, value);

//     updatedItemsList[index] = {
//       ...updatedItemsList[index],
//       [name]: validatedValue,
//     };

//     if (name === "quantity" || name === "price") {
//       const quantity =
//         name === "quantity" ? validatedValue : updatedItemsList[index].quantity;
//       const price =
//         name === "price" ? validatedValue : updatedItemsList[index].price;
//       updatedItemsList[index].amount = (quantity * price).toFixed(2);
//     }

//     setFormData({ ...formData, itemsList: updatedItemsList });
//     calculateTotalAmount(updatedItemsList);
//   };

//   const handleAddItem = () => {
//     // Only add items that are already part of the original purchase
//     const availableItems = formData.itemsList.map(item => item.item._id);
//     const newItems = items.filter(item => !availableItems.includes(item._id));

//     if (newItems.length === 0) {
//       toast.warn("All items have been added already.");
//       return;
//     }

//     const updatedItemsList = [
//       ...formData.itemsList,
//       {
//         item: null, // Default empty item
//         quantity: "",
//         unit: "",
//         price: "",
//         amount: "0.00",
//         isPredefined: false,
//       },
//     ];

//     setFormData({ ...formData, itemsList: updatedItemsList });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/api/purchases/${id}`, formData);
//       toast.success("Purchase updated successfully");
//       navigate(`/purchases/${id}`);
//     } catch (error) {
//       console.error("Error updating purchase:", error);
//       toast.error("Error updating purchase");
//     }
//   };

//   const calculateTotalAmount = (itemsList, additionalData = {}) => {
//     const totalItemAmount = itemsList.reduce(
//       (acc, item) => acc + (parseFloat(item.amount) || 0),
//       0
//     );

//     const packingCharges = parseFloat(additionalData.packingCharges || 0);
//     const gstExpenses = parseFloat(additionalData.gstExpenses || 0);
//     const otherExpenses = parseFloat(additionalData.otherExpenses || 0);

//     const totalAmount =
//       totalItemAmount + packingCharges + gstExpenses + otherExpenses;

//     setFormData((prevState) => ({
//       ...prevState,
//       totalItemAmount: totalItemAmount.toFixed(2),
//       totalAmount: totalAmount.toFixed(2),
//     }));
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <Autocomplete
//           options={suppliers}
//           getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
//           value={selectedSupplier}
//           onChange={(event, newValue) => {
//             setSelectedSupplier(newValue);
//             setFormData({
//               ...formData,
//               supplierName: newValue ? `${newValue.firstName} ${newValue.lastName}` : "",
//               companyName: newValue ? newValue.partyName : "",
//             });
//           }}
//           renderInput={(params) => <TextField {...params} label="Supplier" />}
//         />
//       </FormControl>

//       <TextField
//         name="purchaseDate"
//         label="Purchase Date"
//         type="date"
//         value={formData.purchaseDate}
//         onChange={handleChange}
//         fullWidth
//         sx={{ mb: 2 }}
//         InputLabelProps={{ shrink: true }}
//       />

//       <TextField
//         name="invoiceDate"
//         label="Invoice Date"
//         type="date"
//         value={formData.invoiceDate}
//         onChange={handleChange}
//         fullWidth
//         sx={{ mb: 2 }}
//         InputLabelProps={{ shrink: true }}
//       />

//       <TextField
//         name="supplierVoucherNo"
//         label="Supplier Voucher No"
//         value={formData.supplierVoucherNo}
//         onChange={handleChange}
//         fullWidth
//         sx={{ mb: 2 }}
//       />

//       <TextField
//         name="purchaseVoucherNo"
//         label="Purchase Voucher No"
//         value={formData.purchaseVoucherNo}
//         onChange={handleChange}
//         fullWidth
//         sx={{ mb: 2 }}
//       />

//       <TextField
//         name="packingCharges"
//         label="Packing Charges"
//         type="number"
//         value={formData.packingCharges}
//         onChange={handleChange}
//         fullWidth
//         sx={{ mb: 2 }}
//       />

//       <TextField
//         name="gstExpenses"
//         label="GST Expenses"
//         type="number"
//         value={formData.gstExpenses}
//         onChange={handleChange}
//         fullWidth
//         sx={{ mb: 2 }}
//       />

//       <TextField
//         name="otherExpenses"
//         label="Other Expenses"
//         type="number"
//         value={formData.otherExpenses}
//         onChange={handleChange}
//         fullWidth
//         sx={{ mb: 2 }}
//       />

//       <TableContainer component={Paper} sx={{ mb: 2 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Item</TableCell>
//               <TableCell>Quantity</TableCell>
//               <TableCell>Unit</TableCell>
//               <TableCell>Price</TableCell>
//               <TableCell>Amount</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {formData.itemsList.map((item, index) => (
//               item.item && item.isPredefined ? (
//                 <TableRow key={index}>
//                   <TableCell>{item.item.name}</TableCell>
//                   <TableCell>
//                     <TextField
//                       name="quantity"
//                       type="number"
//                       value={item.quantity}
//                       onChange={(e) => handleItemFieldChange(index, e)}
//                       fullWidth
//                     />
//                   </TableCell>
//                   <TableCell>{item.unit}</TableCell>
//                   <TableCell>
//                     <TextField
//                       name="price"
//                       type="number"
//                       value={item.price}
//                       onChange={(e) => handleItemFieldChange(index, e)}
//                       fullWidth
//                     />
//                   </TableCell>
//                   <TableCell>{item.amount}</TableCell>
//                 </TableRow>
//               ) : null
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Button onClick={handleAddItem} variant="contained" color="primary">
//         Add Item
//       </Button>

//       <TextField
//         label="Total Item Amount"
//         value={formData.totalItemAmount}
//         InputProps={{ readOnly: true }}
//         fullWidth
//         sx={{ mb: 2 }}
//       />

//       <TextField
//         label="Total Amount"
//         value={formData.totalAmount}
//         InputProps={{ readOnly: true }}
//         fullWidth
//         sx={{ mb: 2 }}
//       />

//       <Button type="submit" variant="contained" color="primary">
//         Update Purchase
//       </Button>

//       <ToastContainer />
//     </Box>
//   );
// };

// export default UpdatePurchaseItem;

//---------------------for updation -------------------------//

// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { styled } from "@mui/material/styles";
// import PercentIcon from "@mui/icons-material/Percent";
// import CancelIcon from "@mui/icons-material/Cancel";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import InputAdornment from "@mui/material/InputAdornment";
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
// import api from "../../../../services/api";

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const UpdatePurchaseItem = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [items, setItems] = useState([]);
//   const [suppliers, setSuppliers] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [selectedSupplier, setSelectedSupplier] = useState(null);
//   const [formData, setFormData] = useState({
//     supplierName: "",
//     companyName: "",
//     purchaseDate: "",
//     invoiceDate: "",
//     supplierVoucherNo: "",
//     purchaseVoucherNo: "",
//     itemsList: [],
//     packingCharges: "",
//     gstExpenses: "",
//     otherExpenses: "",
//     totalItemAmount: "",
//     billSundryAmount: "",
//     totalAmount: "",
//   });
//   const [itemData, setItemData] = useState({});

//   const getAvailableItems = () => {
//     return items;
//   };

//   const [transportDetails, setTransportDetails] = useState({
//     transportName: "",
//     vehicleNo: "",
//     date: "",
//     stationFrom: "",
//     stationTo: "",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch purchase data
//         const purchaseResponse = await api.get(`/api/purchases/${id}`);
//         const purchaseData = purchaseResponse.data;

//         // Format dates
//         const formattedPurchaseDate = new Date(purchaseData.purchaseDate)
//           .toISOString()
//           .split("T")[0];
//         const formattedInvoiceDate = new Date(purchaseData.invoiceDate)
//           .toISOString()
//           .split("T")[0];

//         setFormData({
//           ...purchaseData,
//           purchaseDate: formattedPurchaseDate,
//           invoiceDate: formattedInvoiceDate,
//         });
//         const formattedTransportDate = new Date(
//           purchaseData.transportDetails.date
//         )
//           .toISOString()
//           .split("T")[0];

//         setTransportDetails({
//           transportName: purchaseData.transportDetails.transportName || "",
//           vehicleNo: purchaseData.transportDetails.vehicleNo || "",
//           date: formattedTransportDate || "",
//           stationFrom: purchaseData.transportDetails.stationFrom || "",
//           stationTo: purchaseData.transportDetails.stationTo || "",
//         });

//         // Fetch suppliers
//         const suppliersResponse = await api.get("/api/suppliers");
//         const allSuppliers = suppliersResponse.data;
//         setSuppliers(allSuppliers);

//         // Map unique companies
//         const uniqueCompanies = Array.from(
//           new Set(allSuppliers.map((supplier) => supplier.partyName))
//         ).map((partyName) => ({
//           name: partyName,
//           supplier: allSuppliers.find(
//             (supplier) => supplier.partyName === partyName
//           ),
//         }));
//         setCompanies(uniqueCompanies);

//         // Find the corresponding supplier
//         const supplier = allSuppliers.find(
//           (s) => `${s.firstName} ${s.lastName}` === purchaseData.supplierName
//         );

//         // Set supplier data and form state
//         if (supplier) {
//           setSelectedSupplier(supplier);
//           setFormData((prevState) => ({
//             ...prevState,
//             companyName: supplier.partyName,
//             supplierName: `${supplier.firstName} ${supplier.lastName}`,
//           }));
//         } else {
//           // Handle case where supplier is not found
//           toast.warn("Supplier not found");
//           setFormData((prevState) => ({
//             ...prevState,
//             companyName: "",
//             supplierName: "",
//           }));
//         }

//         // Fetch item data
//         const itemIds = purchaseData.itemsList.map((item) => item.item._id);
//         const itemResponses = await Promise.all(
//           itemIds.map((itemId) => api.get(`/api/jewelry-items/${itemId}`))
//         );
//         const itemsData = itemResponses.reduce((acc, response) => {
//           acc[response.data._id] = response.data;
//           return acc;
//         }, {});
//         setItemData(itemsData);

//         const updatedItemsList = purchaseData.itemsList.map((item) => {
//           const itemDetails = itemsData[item.item._id] || {};
//           return {
//             ...item,
//             item: itemDetails,
//             price: item.price,
//             unit: itemDetails?.unit || "",
//             amount: (item.quantity * (item.price || 0)).toFixed(2),
//             isPredefined: true,
//           };
//         });
//         console.log("Updated Items List:", updatedItemsList);

//         setFormData((prevState) => ({
//           ...prevState,
//           itemsList: updatedItemsList,
//         }));

//         // Calculate total amount
//         calculateTotalAmount(updatedItemsList, {
//           packingCharges: purchaseData.packingCharges,
//           gstExpenses: purchaseData.gstExpenses,
//           otherExpenses: purchaseData.otherExpenses,
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         toast.error("Error fetching data");
//       }
//     };

//     fetchData();

//     const fetchItems = async () => {
//       try {
//         const response = await api.get("/api/jewelry-items");
//         setItems(response.data);
//       } catch (error) {
//         console.error("Error fetching items:", error);
//         toast.error("Error fetching items");
//       }
//     };

//     fetchItems();
//   }, [id]);

//   const handleItemChange = async (index, itemId) => {
//     if (!selectedSupplier) {
//       toast.warn("Please select a supplier first");
//       return;
//     }

//     const selectedItem = itemData[itemId] || (await fetchItemData(itemId));

//     const updatedItemsList = [...formData.itemsList];
//     updatedItemsList[index] = {
//       ...updatedItemsList[index],
//       item: selectedItem,
//       unit: selectedItem?.unit || "",
//       amount: (
//         updatedItemsList[index].quantity * (updatedItemsList[index].price || 0)
//       ).toFixed(2),
//     };

//     setFormData({ ...formData, itemsList: updatedItemsList });
//     calculateTotalAmount(updatedItemsList);
//   };

//   const fetchItemData = async (itemId) => {
//     try {
//       if (!itemId) throw new Error("Invalid item ID");
//       const response = await api.get(`/api/jewelry-items/${itemId}`);
//       const itemDetails = response.data;

//       setItemData((prevData) => ({
//         ...prevData,
//         [itemId]: itemDetails,
//       }));

//       return itemDetails;
//     } catch (error) {
//       console.error("Error fetching item data:", error);
//       toast.error("Error fetching item data");
//       return { unit: "" }; // Default empty unit if data fetch fails
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));

//     if (
//       name === "packingCharges" ||
//       name === "gstExpenses" ||
//       name === "otherExpenses"
//     ) {
//       calculateTotalAmount(formData.itemsList, {
//         packingCharges:
//           name === "packingCharges" ? value : formData.packingCharges,
//         gstExpenses: name === "gstExpenses" ? value : formData.gstExpenses,
//         otherExpenses:
//           name === "otherExpenses" ? value : formData.otherExpenses,
//       });
//     }
//   };

//   const handleItemFieldChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedItemsList = [...formData.itemsList];

//     const validatedValue = Math.max(0, value);

//     updatedItemsList[index] = {
//       ...updatedItemsList[index],
//       [name]: validatedValue,
//     };

//     if (name === "quantity" || name === "price") {
//       const quantity =
//         name === "quantity" ? validatedValue : updatedItemsList[index].quantity;
//       const price =
//         name === "price" ? validatedValue : updatedItemsList[index].price;
//       updatedItemsList[index].amount = (quantity * price).toFixed(2);
//     }

//     setFormData({ ...formData, itemsList: updatedItemsList });
//     calculateTotalAmount(updatedItemsList);
//   };

//   const handleAddItem = () => {
//     const availableItems = getAvailableItems();
//     if (availableItems.length === 0) {
//       toast.warn("All items have been added already.");
//       return;
//     }

//     // Check if there are already empty item slots and reuse them
//     const updatedItemsList = [...formData.itemsList];
//     const emptySlotIndex = updatedItemsList.findIndex((item) => !item.item._id);
//     if (emptySlotIndex !== -1) {
//       updatedItemsList[emptySlotIndex] = {
//         item: {},
//         quantity: "",
//         unit: "",
//         price: "",
//         amount: "",
//         isPredefined: false,
//       };
//     } else {
//       updatedItemsList.push({
//         item: {},
//         quantity: "",
//         unit: "",
//         price: "",
//         amount: "",
//         isPredefined: false,
//       });
//     }

//     setFormData((prevState) => ({
//       ...prevState,
//       itemsList: updatedItemsList,
//     }));
//   };

//   const handleDeleteItem = (index) => {
//     const updatedItemsList = [...formData.itemsList];
//     updatedItemsList.splice(index, 1);
//     setFormData((prevState) => ({
//       ...prevState,
//       itemsList: updatedItemsList,
//     }));
//     calculateTotalAmount(updatedItemsList);
//   };

//   const calculateTotalAmount = (itemsList, expenses = {}) => {
//     const totalItemAmount = itemsList.reduce(
//       (total, item) => total + (parseFloat(item.amount) || 0),
//       0
//     );
//     const packingCharges = parseFloat(expenses.packingCharges) || 0;
//     const gstExpenses = parseFloat(expenses.gstExpenses) || 0;
//     const otherExpenses = parseFloat(expenses.otherExpenses) || 0;

//     const totalAmount =
//       totalItemAmount + packingCharges + gstExpenses + otherExpenses;
//     const billSundryAmount =
//       totalItemAmount - (packingCharges + gstExpenses + otherExpenses);

//     setFormData((prevState) => ({
//       ...prevState,
//       totalItemAmount: totalItemAmount.toFixed(2),
//       billSundryAmount: billSundryAmount.toFixed(2),
//       totalAmount: totalAmount.toFixed(2),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.itemsList.length === 0) {
//       toast.error("Please add at least one item.");
//       return;
//     }

//     try {
//       await api.put(
//         `/api/purchases/${id}`,
//         { ...formData, transportDetails } // Include transportDetails here
//       );

//       toast.success("Purchase item updated successfully");
//       navigate("/purchase_voucher_list");
//     } catch (error) {
//       console.error("Error updating purchase item:", error);
//       toast.error("Error updating purchase item");
//     }
//   };

//   return (
//     <>
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
//                             Update Purchase Item
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
//                                         options={companies.map(
//                                           (company) => company.name
//                                         )}
//                                         value={formData.companyName || ""}
//                                         onChange={(e, newValue) => {
//                                           const selectedCompany =
//                                             companies.find(
//                                               (company) =>
//                                                 company.name === newValue
//                                             );
//                                           const supplier = selectedCompany
//                                             ? selectedCompany.supplier
//                                             : {};

//                                           setFormData((prevState) => ({
//                                             ...prevState,
//                                             companyName: newValue,
//                                             supplierName: supplier
//                                               ? `${supplier.firstName} ${supplier.lastName}`
//                                               : "",
//                                           }));

//                                           setSelectedSupplier(supplier);
//                                         }}
//                                         renderInput={(params) => (
//                                           <TextField
//                                             {...params}
//                                             label="Company Name"
//                                             size="small"
//                                             variant="outlined"
//                                           />
//                                         )}
//                                       />
//                                     </FormControl>
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <Autocomplete
//                                         options={suppliers.map(
//                                           (supplier) => supplier.firstName
//                                         )}
//                                         value={formData.supplierName || ""}
//                                         onChange={(e, newValue) => {
//                                           const supplier = suppliers.find(
//                                             (supplier) =>
//                                               `${supplier.firstName} ${supplier.lastName}` ===
//                                               newValue
//                                           );

//                                           setFormData((prevState) => ({
//                                             ...prevState,
//                                             supplierName: newValue,
//                                           }));

//                                           setSelectedSupplier(supplier);
//                                         }}
//                                         renderInput={(params) => (
//                                           <TextField
//                                             {...params}
//                                             label="Supplier Name"
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
//                                         name="purchaseDate"
//                                         label="Purchase Date"
//                                         type="date"
//                                         value={formData.purchaseDate || ""}
//                                         onChange={handleChange}
//                                         variant="outlined"
//                                         InputLabelProps={{
//                                           shrink: true,
//                                         }}
//                                         size="small"
//                                       />
//                                     </FormControl>
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <TextField
//                                         name="invoiceDate"
//                                         label="Invoice Date"
//                                         type="date"
//                                         value={formData.invoiceDate || ""}
//                                         onChange={handleChange}
//                                         variant="outlined"
//                                         InputLabelProps={{
//                                           shrink: true,
//                                         }}
//                                         size="small"
//                                       />
//                                     </FormControl>
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth margin="normal">
//                                       <TextField
//                                         name="supplierVoucherNo"
//                                         label="Supplier Voucher No"
//                                         value={formData.supplierVoucherNo || ""}
//                                         onChange={handleChange}
//                                         variant="outlined"
//                                         size="small"
//                                       />
//                                     </FormControl>
//                                   </div>
//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth margin="normal">
//                                       <TextField
//                                         name="purchaseVoucherNo"
//                                         label="Purchase Voucher No"
//                                         value={formData.purchaseVoucherNo || ""}
//                                         onChange={handleChange}
//                                         variant="outlined"
//                                         size="small"
//                                       />
//                                     </FormControl>
//                                   </div>
//                                 </div>
//                                 <div className="row">
//                                   <div className="col-xl-12 d-flex justify-content-end">
//                                     <Button
//                                       type="button"
//                                       variant="contained"
//                                       color="secondary"
//                                       onClick={handleAddItem}
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
//                                           {formData.itemsList
//                                             .filter((item) => item.item._id)
//                                             .map((item, index) => (
//                                               <TableRow key={index}>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "0px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <span className="ps-2 pe-2 pt-0 pb-0">
//                                                     {index + 1}
//                                                   </span>
//                                                 </TableCell>

//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "0px",
//                                                     width: "300px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <FormControl fullWidth>
//                                                     <Autocomplete
//                                                       options={getAvailableItems()}
//                                                       getOptionLabel={(
//                                                         option
//                                                       ) => option.name}
//                                                       value={item.item}
//                                                       onChange={(e, newValue) =>
//                                                         handleItemChange(
//                                                           index,
//                                                           newValue?._id
//                                                         )
//                                                       }
//                                                       renderInput={(params) => (
//                                                         <TextField
//                                                           {...params}
//                                                           label="Item"
//                                                           variant="outlined"
//                                                         />
//                                                       )}
//                                                     />
//                                                   </FormControl>
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
//                                                     fullWidth
//                                                     inputProps={{ min: "0" }}
//                                                     required
//                                                     variant="standard"
//                                                     name="quantity"
//                                                     value={item.quantity || ""}
//                                                     onChange={(e) =>
//                                                       handleItemFieldChange(
//                                                         index,
//                                                         e
//                                                       )
//                                                     }
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
//                                                     value={
//                                                       item.unit?.name || ""
//                                                     }
//                                                     disabled
//                                                     fullWidth
//                                                     variant="standard"
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
//                                                     fullWidth
//                                                     inputProps={{ min: "0" }}
//                                                     required
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment position="center">
//                                                           <CurrencyRupeeIcon
//                                                             style={{
//                                                               fontSize: "15px",
//                                                             }}
//                                                           />
//                                                         </InputAdornment>
//                                                       ),
//                                                     }}
//                                                     name="price"
//                                                     value={item.price || ""}
//                                                     onChange={(e) =>
//                                                       handleItemFieldChange(
//                                                         index,
//                                                         e
//                                                       )
//                                                     }
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
//                                                     name="price"
//                                                     value={item.amount || ""}
//                                                     disabled
//                                                     fullWidth
//                                                     variant="standard"
//                                                     inputProps={{ min: "0" }}
//                                                     required
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment position="center">
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
//                                                   <Button
//                                                     onClick={() =>
//                                                       handleDeleteItem(index)
//                                                     }
//                                                     color="error"
//                                                   >
//                                                     <CancelIcon />
//                                                   </Button>
//                                                 </TableCell>
//                                               </TableRow>
//                                             ))}
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
//                                         Total Item Ammount:
//                                         <span>
//                                           <CurrencyRupeeIcon
//                                             style={{ fontSize: "18px" }}
//                                           />
//                                         </span>
//                                         <span className="fw-bold">
//                                           {formData.totalItemAmount || ""}
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
//                                                     width: "200px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <TextField
//                                                     name="packingCharges"
//                                                     type="number"
//                                                     value={
//                                                       formData.packingCharges ||
//                                                       ""
//                                                     }
//                                                     onChange={handleChange}
//                                                     size="small"
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment
//                                                           position="end"
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
//                                                     name="gstExpenses"
//                                                     type="number"
//                                                     value={
//                                                       formData.gstExpenses || ""
//                                                     }
//                                                     onChange={handleChange}
//                                                     size="small"
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment
//                                                           position="end"
//                                                           style={{
//                                                             marginRight: "-0px",
//                                                             marginBottom: "3px",
//                                                           }}
//                                                         >
//                                                           <PercentIcon
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
//                                                     type="number"
//                                                     value={
//                                                       formData.otherExpenses ||
//                                                       ""
//                                                     }
//                                                     onChange={handleChange}
//                                                     size="small"
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment
//                                                           position="end"
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
//                                             Bil Sundry Amount:
//                                             <CurrencyRupeeIcon
//                                               style={{ fontSize: "15px" }}
//                                             />
//                                             {formData.billSundryAmount || ""}
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
//                                             {formData.totalAmount || ""}
//                                           </span>
//                                         </h5>
//                                       </div>
//                                     </div>

//                                     {/* Bill sundry End */}
//                                     <Box>
//                                       <span>Transport Detail</span>
//                                       <TableContainer component={Paper}>
//                                         <Table>
//                                           <TableHead>
//                                             <TableRow>
//                                               <TableCell
//                                                 align="center"
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold fixed"
//                                               >
//                                                 Date
//                                               </TableCell>
//                                               <TableCell
//                                                 align="center"
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold fixed"
//                                               >
//                                                 Transport Name
//                                               </TableCell>
//                                               <TableCell
//                                                 align="center"
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold fixed"
//                                               >
//                                                 Vehicle No.
//                                               </TableCell>

//                                               <TableCell
//                                                 align="center"
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold fixed"
//                                               >
//                                                 Station From
//                                               </TableCell>
//                                               <TableCell
//                                                 align="center"
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold fixed"
//                                               >
//                                                 Station To
//                                               </TableCell>
//                                             </TableRow>
//                                           </TableHead>
//                                           <TableBody
//                                             sx={{
//                                               background: "white",
//                                               overflowY: "auto",
//                                             }}
//                                           >
//                                             <TableRow>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "0px",
//                                                 }}
//                                                 align="center"
//                                               >
//                                                 <TextField
//                                                   size="small"
//                                                   name="date"
//                                                   label="Date"
//                                                   type="date"
//                                                   value={
//                                                     transportDetails.date || ""
//                                                   }
//                                                   onChange={(e) =>
//                                                     setTransportDetails({
//                                                       ...transportDetails,
//                                                       date: e.target.value,
//                                                     })
//                                                   }
//                                                   variant="standard"
//                                                   InputLabelProps={{
//                                                     shrink: true,
//                                                   }}
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
//                                                   type="text"
//                                                   size="small"
//                                                   variant="standard"
//                                                   name="transportName"
//                                                   value={
//                                                     transportDetails.transportName ||
//                                                     ""
//                                                   }
//                                                   onChange={(e) =>
//                                                     setTransportDetails({
//                                                       ...transportDetails,
//                                                       transportName:
//                                                         e.target.value,
//                                                     })
//                                                   }
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
//                                                   size="small"
//                                                   variant="standard"
//                                                   name="vehicleNo"
//                                                   value={
//                                                     transportDetails.vehicleNo ||
//                                                     ""
//                                                   }
//                                                   onChange={(e) =>
//                                                     setTransportDetails({
//                                                       ...transportDetails,
//                                                       vehicleNo: e.target.value,
//                                                     })
//                                                   }
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
//                                                   size="small"
//                                                   variant="standard"
//                                                   name="stationFrom"
//                                                   value={
//                                                     transportDetails.stationFrom ||
//                                                     ""
//                                                   }
//                                                   onChange={(e) =>
//                                                     setTransportDetails({
//                                                       ...transportDetails,
//                                                       stationFrom:
//                                                         e.target.value,
//                                                     })
//                                                   }
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
//                                                   size="small"
//                                                   variant="standard"
//                                                   name="stationTo"
//                                                   value={
//                                                     transportDetails.stationTo ||
//                                                     ""
//                                                   }
//                                                   onChange={(e) =>
//                                                     setTransportDetails({
//                                                       ...transportDetails,
//                                                       stationTo: e.target.value,
//                                                     })
//                                                   }
//                                                 />
//                                               </TableCell>
//                                             </TableRow>
//                                           </TableBody>
//                                         </Table>
//                                       </TableContainer>
//                                     </Box>

//                                     <div className="row mt-3">
//                                       <div className="col-xl-12">
//                                         <Button
//                                           type="submit"
//                                           variant="contained"
//                                           color="primary"
//                                           className="fw-bold"
//                                         >
//                                           Update Purchase Item
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
//     </>
//   );
// };

// export default UpdatePurchaseItem;

///===================================================================================//
// const { id } = useParams();
// const navigate = useNavigate();
// const [items, setItems] = useState([]);
// const [suppliers, setSuppliers] = useState([]);
// const [companies, setCompanies] = useState([]);
// const [selectedSupplier, setSelectedSupplier] = useState(null);
// const [formData, setFormData] = useState({
//   supplierName: "",
//   companyName: "",
//   purchaseDate: "",
//   invoiceDate: "",
//   supplierVoucherNo: "",
//   purchaseVoucherNo: "",
//   itemsList: [],
//   packingCharges: "",
//   gstExpenses: "",
//   otherExpenses: "",
//   totalItemAmount: "",
//   billSundryAmount: "",
//   totalAmount: "",
// });
// const [itemData, setItemData] = useState({});

// const getAvailableItems = () => {
//   return items;
// };
// const [transportDetails, setTransportDetails] = useState({
//   transportName: "",
//   vehicleNo: "",
//   date: "",
//   stationFrom: "",
//   stationTo: "",
// });

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       // Fetch purchase data
//       const purchaseResponse = await api.get(`/api/purchases/${id}`);
//       const purchaseData = purchaseResponse.data;

//       // Format dates
//       const formattedPurchaseDate = new Date(purchaseData.purchaseDate)
//         .toISOString()
//         .split("T")[0];
//       const formattedInvoiceDate = new Date(purchaseData.invoiceDate)
//         .toISOString()
//         .split("T")[0];

//       setFormData({
//         ...purchaseData,
//         purchaseDate: formattedPurchaseDate,
//         invoiceDate: formattedInvoiceDate,
//       });
//       const formattedTransportDate = new Date(
//         purchaseData.transportDetails.date
//       )
//         .toISOString()
//         .split("T")[0];

//       setTransportDetails({
//         transportName: purchaseData.transportDetails.transportName || "",
//         vehicleNo: purchaseData.transportDetails.vehicleNo || "",
//         date: formattedTransportDate || "",
//         stationFrom: purchaseData.transportDetails.stationFrom || "",
//         stationTo: purchaseData.transportDetails.stationTo || "",
//       });
//       // Fetch suppliers
//       const suppliersResponse = await api.get("/api/suppliers");
//       const allSuppliers = suppliersResponse.data;
//       setSuppliers(allSuppliers);

//       // Map unique companies
//       const uniqueCompanies = Array.from(
//         new Set(allSuppliers.map((supplier) => supplier.partyName))
//       ).map((partyName) => ({
//         name: partyName,
//         supplier: allSuppliers.find(
//           (supplier) => supplier.partyName === partyName
//         ),
//       }));
//       setCompanies(uniqueCompanies);

//       // Find the corresponding supplier
//       const supplier = allSuppliers.find(
//         (s) => `${s.firstName} ${s.lastName}` === purchaseData.supplierName
//       );

//       // Set supplier data and form state
//       if (supplier) {
//         setSelectedSupplier(supplier);
//         setFormData((prevState) => ({
//           ...prevState,
//           companyName: supplier.partyName,
//           supplierName: `${supplier.firstName} ${supplier.lastName}`,
//         }));
//       } else {
//         // Handle case where supplier is not found
//         toast.warn("Supplier not found");
//         setFormData((prevState) => ({
//           ...prevState,
//           companyName: "",
//           supplierName: "",
//         }));
//       }

//       // Fetch item data
//       const itemIds = purchaseData.itemsList.map((item) => item.item._id);
//       const itemResponses = await Promise.all(
//         itemIds.map((itemId) => api.get(`/api/jewelry-items/${itemId}`))
//       );
//       const itemsData = itemResponses.reduce((acc, response) => {
//         acc[response.data._id] = response.data;
//         return acc;
//       }, {});
//       setItemData(itemsData);

//       // Update items list with details and prices
//       const updatedItemsList = purchaseData.itemsList.map((item) => {
//         const itemDetails = itemsData[item.item._id];
//         return {
//           ...item,
//           item: itemDetails,
//           price: item.price, // Keep existing price
//           unit: itemDetails.unit,
//           amount: (item.quantity * item.price).toFixed(2),
//           isPredefined: true,
//         };
//       });

//       setFormData((prevState) => ({
//         ...prevState,
//         itemsList: updatedItemsList,
//       }));

//       // Calculate total amount
//       calculateTotalAmount(updatedItemsList, {
//         packingCharges: purchaseData.packingCharges,
//         gstExpenses: purchaseData.gstExpenses,
//         otherExpenses: purchaseData.otherExpenses,
//       });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       toast.error("Error fetching data");
//     }
//   };

//   fetchData();

//   const fetchItems = async () => {
//     try {
//       const response = await api.get("/api/jewelry-items");
//       setItems(response.data);
//     } catch (error) {
//       console.error("Error fetching items:", error);
//       toast.error("Error fetching items");
//     }
//   };

//   fetchItems();
// }, [id]);

// const handleItemChange = async (index, itemId) => {
//   if (!selectedSupplier) {
//     toast.warn("Please select a supplier first");
//     return;
//   }

//   const selectedItem = itemData[itemId] || (await fetchItemData(itemId));

//   const updatedItemsList = [...formData.itemsList];
//   updatedItemsList[index] = {
//     ...updatedItemsList[index],
//     item: selectedItem,
//     unit: selectedItem.unit, // Automatically update the unit
//     amount: (
//       updatedItemsList[index].quantity * (updatedItemsList[index].price || 0)
//     ) // Use the manually entered price
//       .toFixed(2),
//   };

//   setFormData({ ...formData, itemsList: updatedItemsList });
//   calculateTotalAmount(updatedItemsList);
// };

// const fetchItemData = async (itemId) => {
//   try {
//     if (!itemId) throw new Error("Invalid item ID");
//     const response = await api.get(`/api/jewelry-items/${itemId}`);
//     const { unit } = response.data;

//     const itemDetails = {
//       ...response.data,
//       unit: unit || { name: "" },
//     };

//     setItemData((prevData) => ({
//       ...prevData,
//       [itemId]: itemDetails,
//     }));

//     return itemDetails;
//   } catch (error) {
//     console.error("Error fetching item data:", error);
//     toast.error("Error fetching item data");
//     return { unit: { name: "" } };
//   }
// };

// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormData((prevState) => ({
//     ...prevState,
//     [name]: value,
//   }));

//   if (
//     name === "packingCharges" ||
//     name === "gstExpenses" ||
//     name === "otherExpenses"
//   ) {
//     calculateTotalAmount(formData.itemsList, {
//       packingCharges:
//         name === "packingCharges" ? value : formData.packingCharges,
//       gstExpenses: name === "gstExpenses" ? value : formData.gstExpenses,
//       otherExpenses:
//         name === "otherExpenses" ? value : formData.otherExpenses,
//     });
//   }
// };

// const handleItemFieldChange = (index, e) => {
//   const { name, value } = e.target;
//   const updatedItemsList = [...formData.itemsList];

//   const validatedValue = Math.max(0, value);

//   updatedItemsList[index] = {
//     ...updatedItemsList[index],
//     [name]: validatedValue,
//   };

//   if (name === "quantity" || name === "price") {
//     const quantity =
//       name === "quantity" ? validatedValue : updatedItemsList[index].quantity;
//     const price =
//       name === "price" ? validatedValue : updatedItemsList[index].price;
//     updatedItemsList[index].amount = (quantity * price).toFixed(2);
//   }

//   setFormData({ ...formData, itemsList: updatedItemsList });
//   calculateTotalAmount(updatedItemsList);
// };

// const handleAddItem = () => {
//   const availableItems = getAvailableItems();
//   if (availableItems.length === 0) {
//     toast.warn("All items have been added already.");
//     return;
//   }

//   const updatedItemsList = [
//     ...formData.itemsList,
//     {
//       item: {},
//       quantity: "",
//       unit: "",
//       price: "",
//       amount: "",
//       isPredefined: false,
//     },
//   ];

//   setFormData((prevState) => ({
//     ...prevState,
//     itemsList: updatedItemsList,
//   }));
// };

// const handleDeleteItem = (index) => {
//   const updatedItemsList = [...formData.itemsList];
//   updatedItemsList.splice(index, 1);
//   setFormData((prevState) => ({
//     ...prevState,
//     itemsList: updatedItemsList,
//   }));

//   calculateTotalAmount(updatedItemsList);
// };

// const calculateTotalAmount = (
//   itemsList,
//   expenses = {
//     packingCharges: formData.packingCharges,
//     gstExpenses: formData.gstExpenses,
//     otherExpenses: formData.otherExpenses,
//   }
// ) => {
//   // Calculate total from items list
//   const totalItemAmount = itemsList.reduce(
//     (total, item) => total + parseFloat(item.amount || 0),
//     0
//   );

//   // Parse expenses
//   const packingCharges = parseFloat(expenses.packingCharges) || 0;
//   const gstPercentage = parseFloat(expenses.gstExpenses) || 0; // GST percentage
//   const otherExpenses = parseFloat(expenses.otherExpenses) || 0;

//   // Convert GST percentage to amount
//   const gstAmount = (totalItemAmount * gstPercentage) / 100;

//   // Calculate bill sundry amount
//   const billSundryAmount = packingCharges + gstAmount + otherExpenses;

//   // Calculate total amount including additional expenses
//   const totalAmount = totalItemAmount + billSundryAmount;

//   // Update form data with the new values
//   setFormData((prevState) => ({
//     ...prevState,
//     totalItemAmount: totalItemAmount.toFixed(2),
//     billSundryAmount: billSundryAmount.toFixed(2),
//     totalAmount: totalAmount.toFixed(2),
//   }));
// };

//----------------------------    Original code ------------------------------------------------//

// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { styled } from "@mui/material/styles";
// import PercentIcon from "@mui/icons-material/Percent";
// import CancelIcon from "@mui/icons-material/Cancel";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import InputAdornment from "@mui/material/InputAdornment";
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
// import api from "../../../../services/api";

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const UpdatePurchaseItem = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [items, setItems] = useState([]);
//   const [suppliers, setSuppliers] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [selectedSupplier, setSelectedSupplier] = useState(null);

//   const [formData, setFormData] = useState({
//     supplierName: "",
//     companyName: "",
//     purchaseDate: "",
//     invoiceDate: "",
//     supplierVoucherNo: "",
//     purchaseVoucherNo: "",
//     itemsList: [],
//     packingCharges: "",
//     gstExpenses: "",
//     otherExpenses: "",
//     totalItemAmount: "",
//     billSundryAmount: "",
//     totalAmount: "",
//   });
//   const [itemData, setItemData] = useState({});

//   const getAvailableItems = () => {
//     return items;
//   };

//   const [transportDetails, setTransportDetails] = useState({
//     builtNumber: "",
//     transporter: "",
//     date: "",
//     lotSize: "",
//     lotOpen: "",
//     lotPending: "",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch purchase data
//         const purchaseResponse = await api.get(`/api/purchases/${id}`);
//         const purchaseData = purchaseResponse.data;

//         // Format dates
//         const formattedPurchaseDate = new Date(purchaseData.purchaseDate)
//           .toISOString()
//           .split("T")[0];
//         const formattedInvoiceDate = new Date(purchaseData.invoiceDate)
//           .toISOString()
//           .split("T")[0];

//         setFormData({
//           ...purchaseData,
//           purchaseDate: formattedPurchaseDate,
//           invoiceDate: formattedInvoiceDate,
//         });

//         const formattedTransportDate = new Date(
//           purchaseData.transportDetails.date
//         )
//           .toISOString()
//           .split("T")[0];

//         setTransportDetails({
//           builtNumber: purchaseData.transportDetails.builtNumber || "",
//           transporter: purchaseData.transportDetails.transporter || "",
//           date: formattedTransportDate || "",
//           lotSize: purchaseData.transportDetails.lotSize || "",
//           lotOpen: purchaseData.transportDetails.lotOpen || "",
//           lotPending: purchaseData.transportDetails.lotPending || "",
//         });

//         // Fetch suppliers
//         const suppliersResponse = await api.get("/api/suppliers");
//         const allSuppliers = suppliersResponse.data;
//         setSuppliers(allSuppliers);

//         // Map unique companies
//         const uniqueCompanies = Array.from(
//           new Set(allSuppliers.map((supplier) => supplier.partyName))
//         ).map((partyName) => ({
//           name: partyName,
//           supplier: allSuppliers.find(
//             (supplier) => supplier.partyName === partyName
//           ),
//         }));
//         setCompanies(uniqueCompanies);

//         // Find the corresponding supplier
//         const supplier = allSuppliers.find(
//           (s) => `${s.firstName} ${s.lastName}` === purchaseData.supplierName
//         );

//         // Set supplier data and form state
//         if (supplier) {
//           setSelectedSupplier(supplier);
//           setFormData((prevState) => ({
//             ...prevState,
//             companyName: supplier.partyName,
//             supplierName: `${supplier.firstName} ${supplier.lastName}`,
//           }));
//         } else {
//           // Handle case where supplier is not found
//           toast.warn("Supplier not found");
//           setFormData((prevState) => ({
//             ...prevState,
//             companyName: "",
//             supplierName: "",
//           }));
//         }

//         // Fetch item data
//         const itemIds = purchaseData.itemsList.map((item) => item.item._id);
//         const itemResponses = await Promise.all(
//           itemIds.map((itemId) => api.get(`/api/jewelry-items/${itemId}`))
//         );
//         const itemsData = itemResponses.reduce((acc, response) => {
//           acc[response.data._id] = response.data;
//           return acc;
//         }, {});
//         setItemData(itemsData);

//         const updatedItemsList = purchaseData.itemsList.map((item) => {
//           const itemDetails = itemsData[item.item._id] || {};
//           return {
//             ...item,
//             item: itemDetails,
//             price: item.price,
//             unit: itemDetails?.unit || "",
//             amount: (item.quantity * (item.price || 0)).toFixed(2),
//             isPredefined: true,
//           };
//         });
//         console.log("Updated Items List:", updatedItemsList);

//         setFormData((prevState) => ({
//           ...prevState,
//           itemsList: updatedItemsList,
//         }));

//         // Calculate total amount
//         calculateTotalAmount(updatedItemsList, {
//           packingCharges: purchaseData.packingCharges,
//           gstExpenses: purchaseData.gstExpenses,
//           otherExpenses: purchaseData.otherExpenses,
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         toast.error("Error fetching data");
//       }
//     };

//     fetchData();

//     const fetchItems = async () => {
//       try {
//         const response = await api.get("/api/jewelry-items");
//         setItems(response.data);
//       } catch (error) {
//         console.error("Error fetching items:", error);
//         toast.error("Error fetching items");
//       }
//     };

//     fetchItems();
//   }, [id]);

//   const handleItemChange = async (index, itemId) => {
//     if (!selectedSupplier) {
//       toast.warn("Please select a supplier first");
//       return;
//     }

//     const selectedItem = itemData[itemId] || (await fetchItemData(itemId));

//     const updatedItemsList = [...formData.itemsList];
//     updatedItemsList[index] = {
//       ...updatedItemsList[index],
//       item: selectedItem,
//       unit: selectedItem?.unit || "",
//       amount: (
//         updatedItemsList[index].quantity * (updatedItemsList[index].price || 0)
//       ).toFixed(2),
//     };

//     setFormData({ ...formData, itemsList: updatedItemsList });
//     calculateTotalAmount(updatedItemsList);
//   };

//   const fetchItemData = async (itemId) => {
//     try {
//       if (!itemId) throw new Error("Invalid item ID");
//       const response = await api.get(`/api/jewelry-items/${itemId}`);
//       const itemDetails = response.data;

//       setItemData((prevData) => ({
//         ...prevData,
//         [itemId]: itemDetails,
//       }));

//       return itemDetails;
//     } catch (error) {
//       console.error("Error fetching item data:", error);
//       toast.error("Error fetching item data");
//       return { unit: "" }; // Default empty unit if data fetch fails
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));

//     if (
//       name === "packingCharges" ||
//       name === "gstExpenses" ||
//       name === "otherExpenses"
//     ) {
//       calculateTotalAmount(formData.itemsList, {
//         packingCharges:
//           name === "packingCharges" ? value : formData.packingCharges,
//         gstExpenses: name === "gstExpenses" ? value : formData.gstExpenses,
//         otherExpenses:
//           name === "otherExpenses" ? value : formData.otherExpenses,
//       });
//     }
//   };

//   const handleItemFieldChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedItemsList = [...formData.itemsList];

//     const validatedValue = Math.max(0, value);

//     updatedItemsList[index] = {
//       ...updatedItemsList[index],
//       [name]: validatedValue,
//     };

//     if (name === "quantity" || name === "price") {
//       const quantity =
//         name === "quantity" ? validatedValue : updatedItemsList[index].quantity;
//       const price =
//         name === "price" ? validatedValue : updatedItemsList[index].price;
//       updatedItemsList[index].amount = (quantity * price).toFixed(2);
//     }

//     setFormData({ ...formData, itemsList: updatedItemsList });
//     calculateTotalAmount(updatedItemsList);
//   };

//   const handleAddItem = () => {
//     const availableItems = getAvailableItems();
//     if (availableItems.length === 0) {
//       toast.warn("All items have been added already.");
//       return;
//     }

//     const updatedItemsList = [
//       ...formData.itemsList,
//       {
//         item: null, // Default empty item
//         quantity: "",
//         unit: "",
//         price: "",
//         amount: "",
//         isPredefined: false,
//       },
//     ];

//     setFormData((prevState) => ({
//       ...prevState,
//       itemsList: updatedItemsList,
//     }));
//   };

//   const handleDeleteItem = (index) => {
//     const updatedItemsList = [...formData.itemsList];
//     updatedItemsList.splice(index, 1);
//     setFormData((prevState) => ({
//       ...prevState,
//       itemsList: updatedItemsList,
//     }));
//     calculateTotalAmount(updatedItemsList);
//   };

//   const calculateTotalAmount = (itemsList, expenses = {}) => {
//     const totalItemAmount = itemsList.reduce(
//       (total, item) => total + (parseFloat(item.amount) || 0),
//       0
//     );
//     const packingCharges = parseFloat(expenses.packingCharges) || 0;
//     const gstExpenses = parseFloat(expenses.gstExpenses) || 0;
//     const otherExpenses = parseFloat(expenses.otherExpenses) || 0;

//     const totalAmount =
//       totalItemAmount + packingCharges + gstExpenses + otherExpenses;
//     const billSundryAmount = packingCharges + gstExpenses + otherExpenses;

//     setFormData((prevState) => ({
//       ...prevState,
//       totalItemAmount: totalItemAmount.toFixed(2),
//       billSundryAmount: billSundryAmount.toFixed(2),
//       totalAmount: totalAmount.toFixed(2),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.itemsList.length === 0) {
//       toast.error("Please add at least one item.");
//       return;
//     }

//     try {
//       await api.put(
//         `/api/purchases/${id}`,
//         { ...formData, transportDetails } // Include transportDetails here
//       );

//       toast.success("Purchase item updated successfully");
//       navigate("/purchase_voucher_list");
//     } catch (error) {
//       console.error("Error updating purchase item:", error);
//       toast.error("Error updating purchase item");
//     }
//   };

//   return (
//     <>
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
//                             Update Purchase Item
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
//                                         options={companies.map(
//                                           (company) => company.name
//                                         )}
//                                         value={formData.companyName || ""}
//                                         onChange={(e, newValue) => {
//                                           const selectedCompany =
//                                             companies.find(
//                                               (company) =>
//                                                 company.name === newValue
//                                             );
//                                           const supplier = selectedCompany
//                                             ? selectedCompany.supplier
//                                             : {};

//                                           setFormData((prevState) => ({
//                                             ...prevState,
//                                             companyName: newValue,
//                                             supplierName: supplier
//                                               ? `${supplier.firstName} ${supplier.lastName}`
//                                               : "",
//                                           }));

//                                           setSelectedSupplier(supplier);
//                                         }}
//                                         renderInput={(params) => (
//                                           <TextField
//                                             {...params}
//                                             label="Company Name"
//                                             size="small"
//                                             variant="outlined"
//                                           />
//                                         )}
//                                       />
//                                     </FormControl>
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <Autocomplete
//                                         options={suppliers.map(
//                                           (supplier) => supplier.firstName
//                                         )}
//                                         value={formData.supplierName || ""}
//                                         onChange={(e, newValue) => {
//                                           const supplier = suppliers.find(
//                                             (supplier) =>
//                                               `${supplier.firstName} ${supplier.lastName}` ===
//                                               newValue
//                                           );

//                                           setFormData((prevState) => ({
//                                             ...prevState,
//                                             supplierName: newValue,
//                                           }));

//                                           setSelectedSupplier(supplier);
//                                         }}
//                                         renderInput={(params) => (
//                                           <TextField
//                                             {...params}
//                                             label="Supplier Name"
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
//                                         name="purchaseDate"
//                                         label="Purchase Date"
//                                         type="date"
//                                         value={formData.purchaseDate || ""}
//                                         onChange={handleChange}
//                                         variant="outlined"
//                                         InputLabelProps={{
//                                           shrink: true,
//                                         }}
//                                         size="small"
//                                       />
//                                     </FormControl>
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <TextField
//                                         name="invoiceDate"
//                                         label="Invoice Date"
//                                         type="date"
//                                         value={formData.invoiceDate || ""}
//                                         onChange={handleChange}
//                                         variant="outlined"
//                                         InputLabelProps={{
//                                           shrink: true,
//                                         }}
//                                         size="small"
//                                       />
//                                     </FormControl>
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth margin="normal">
//                                       <TextField
//                                         name="purchaseVoucherNo"
//                                         label="Purchase Voucher No"
//                                         value={formData.purchaseVoucherNo || ""}
//                                         onChange={handleChange}
//                                         variant="outlined"
//                                         size="small"
//                                       />
//                                     </FormControl>
//                                   </div>
//                                 </div>
//                                 <div className="row">
//                                   <div className="col-xl-12 d-flex justify-content-end">
//                                     <Button
//                                       type="button"
//                                       variant="contained"
//                                       color="secondary"
//                                       onClick={handleAddItem}
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
//                                           {formData.itemsList.map(
//                                             (item, index) => (
//                                               <TableRow key={index}>
//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "0px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <span className="ps-2 pe-2 pt-0 pb-0">
//                                                     {index + 1}
//                                                   </span>
//                                                 </TableCell>

//                                                 <TableCell
//                                                   sx={{
//                                                     border:
//                                                       "1px solid lightgray",
//                                                     padding: "0px",
//                                                     width: "300px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <FormControl fullWidth>
//                                                     <Autocomplete
//                                                       options={getAvailableItems()}
//                                                       getOptionLabel={(
//                                                         option
//                                                       ) => option.name}
//                                                       value={item.item || null}
//                                                       onChange={(e, newValue) =>
//                                                         handleItemChange(
//                                                           index,
//                                                           newValue?._id
//                                                         )
//                                                       }
//                                                       renderInput={(params) => (
//                                                         <TextField
//                                                           {...params}
//                                                           label="Item"
//                                                           variant="outlined"
//                                                         />
//                                                       )}
//                                                     />
//                                                   </FormControl>
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
//                                                     fullWidth
//                                                     inputProps={{ min: "0" }}
//                                                     required
//                                                     variant="standard"
//                                                     name="quantity"
//                                                     value={item.quantity || ""}
//                                                     onChange={(e) =>
//                                                       handleItemFieldChange(
//                                                         index,
//                                                         e
//                                                       )
//                                                     }
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
//                                                     value={
//                                                       item.unit?.name || ""
//                                                     }
//                                                     disabled
//                                                     fullWidth
//                                                     variant="standard"
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
//                                                     fullWidth
//                                                     inputProps={{ min: "0" }}
//                                                     required
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment position="center">
//                                                           <CurrencyRupeeIcon
//                                                             style={{
//                                                               fontSize: "15px",
//                                                             }}
//                                                           />
//                                                         </InputAdornment>
//                                                       ),
//                                                     }}
//                                                     name="price"
//                                                     value={item.price || ""}
//                                                     onChange={(e) =>
//                                                       handleItemFieldChange(
//                                                         index,
//                                                         e
//                                                       )
//                                                     }
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
//                                                     name="price"
//                                                     value={item.amount || ""}
//                                                     disabled
//                                                     fullWidth
//                                                     variant="standard"
//                                                     inputProps={{ min: "0" }}
//                                                     required
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment position="center">
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
//                                                   <Button
//                                                     onClick={() =>
//                                                       handleDeleteItem(index)
//                                                     }
//                                                     color="error"
//                                                   >
//                                                     <CancelIcon />
//                                                   </Button>
//                                                 </TableCell>
//                                               </TableRow>
//                                             )
//                                           )}
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
//                                         Total Item Ammount:
//                                         <span>
//                                           <CurrencyRupeeIcon
//                                             style={{ fontSize: "18px" }}
//                                           />
//                                         </span>
//                                         <span className="fw-bold">
//                                           {formData.totalItemAmount || ""}
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
//                                                     width: "200px",
//                                                   }}
//                                                   align="center"
//                                                 >
//                                                   <TextField
//                                                     name="packingCharges"
//                                                     type="number"
//                                                     value={
//                                                       formData.packingCharges ||
//                                                       ""
//                                                     }
//                                                     onChange={handleChange}
//                                                     size="small"
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment
//                                                           position="end"
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
//                                                     name="gstExpenses"
//                                                     type="number"
//                                                     value={
//                                                       formData.gstExpenses || ""
//                                                     }
//                                                     onChange={handleChange}
//                                                     size="small"
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment
//                                                           position="end"
//                                                           style={{
//                                                             marginRight: "-0px",
//                                                             marginBottom: "3px",
//                                                           }}
//                                                         >
//                                                           <PercentIcon
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
//                                                     type="number"
//                                                     value={
//                                                       formData.otherExpenses ||
//                                                       ""
//                                                     }
//                                                     onChange={handleChange}
//                                                     size="small"
//                                                     variant="standard"
//                                                     InputProps={{
//                                                       startAdornment: (
//                                                         <InputAdornment
//                                                           position="end"
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
//                                             Bil Sundry Amount:
//                                             <CurrencyRupeeIcon
//                                               style={{ fontSize: "15px" }}
//                                             />
//                                             {formData.billSundryAmount || ""}
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
//                                             {formData.totalAmount || ""}
//                                           </span>
//                                         </h5>
//                                       </div>
//                                     </div>

//                                     {/* Bill sundry End */}
//                                     <Box>
//                                       <span>Transport Detail</span>
//                                       <TableContainer component={Paper}>
//                                         <Table>
//                                           <TableHead>
//                                             <TableRow>
//                                               <TableCell
//                                                 align="center"
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold fixed"
//                                               >
//                                                 Date
//                                               </TableCell>
//                                               <TableCell
//                                                 align="center"
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold fixed"
//                                               >
//                                                 Built Number
//                                               </TableCell>
//                                               <TableCell
//                                                 align="center"
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold fixed"
//                                               >
//                                                 Transporter
//                                               </TableCell>

//                                               <TableCell
//                                                 align="center"
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold fixed"
//                                               >
//                                                 Lot Size
//                                               </TableCell>
//                                               <TableCell
//                                                 align="center"
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold fixed"
//                                               >
//                                                 Lot Open
//                                               </TableCell>

//                                               <TableCell
//                                                 align="center"
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "4px",
//                                                   background: "#bbdefb",
//                                                 }}
//                                                 className="p-0 fw-bold fixed"
//                                               >
//                                                 Lot Pending
//                                               </TableCell>
//                                             </TableRow>
//                                           </TableHead>
//                                           <TableBody
//                                             sx={{
//                                               background: "white",
//                                               overflowY: "auto",
//                                             }}
//                                           >
//                                             <TableRow>
//                                               <TableCell
//                                                 sx={{
//                                                   border: "1px solid lightgray",
//                                                   padding: "0px",
//                                                 }}
//                                                 align="center"
//                                               >
//                                                 <TextField
//                                                   size="small"
//                                                   name="date"
//                                                   label="Date"
//                                                   type="date"
//                                                   value={
//                                                     transportDetails.date || ""
//                                                   }
//                                                   onChange={(e) =>
//                                                     setTransportDetails({
//                                                       ...transportDetails,
//                                                       date: e.target.value,
//                                                     })
//                                                   }
//                                                   variant="standard"
//                                                   InputLabelProps={{
//                                                     shrink: true,
//                                                   }}
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
//                                                   type="number"
//                                                   size="small"
//                                                   variant="standard"
//                                                   name="builtNumber"
//                                                   value={
//                                                     transportDetails.builtNumber ||
//                                                     ""
//                                                   }
//                                                   onChange={(e) =>
//                                                     setTransportDetails({
//                                                       ...transportDetails,
//                                                       builtNumber:
//                                                         e.target.value,
//                                                     })
//                                                   }
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
//                                                   size="small"
//                                                   variant="standard"
//                                                   name="transporter"
//                                                   value={
//                                                     transportDetails.transporter ||
//                                                     ""
//                                                   }
//                                                   onChange={(e) =>
//                                                     setTransportDetails({
//                                                       ...transportDetails,
//                                                       transporter:
//                                                         e.target.value,
//                                                     })
//                                                   }
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
//                                                   size="small"
//                                                   variant="standard"
//                                                   name="lotSize"
//                                                   value={
//                                                     transportDetails.lotSize ||
//                                                     ""
//                                                   }
//                                                   onChange={(e) =>
//                                                     setTransportDetails({
//                                                       ...transportDetails,
//                                                       lotSize: e.target.value,
//                                                     })
//                                                   }
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
//                                                   size="small"
//                                                   variant="standard"
//                                                   name="lotOpen"
//                                                   value={
//                                                     transportDetails.lotOpen ||
//                                                     ""
//                                                   }
//                                                   onChange={(e) =>
//                                                     setTransportDetails({
//                                                       ...transportDetails,
//                                                       lotOpen: e.target.value,
//                                                     })
//                                                   }
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
//                                                   size="small"
//                                                   variant="standard"
//                                                   name="lotPending"
//                                                   value={
//                                                     transportDetails.lotPending ||
//                                                     ""
//                                                   }
//                                                   onChange={(e) =>
//                                                     setTransportDetails({
//                                                       ...transportDetails,
//                                                       lotPending:
//                                                         e.target.value,
//                                                     })
//                                                   }
//                                                 />
//                                               </TableCell>
//                                             </TableRow>
//                                           </TableBody>
//                                         </Table>
//                                       </TableContainer>
//                                     </Box>

//                                     <div className="row mt-3">
//                                       <div className="col-xl-12">
//                                         <Button
//                                           type="submit"
//                                           variant="contained"
//                                           color="primary"
//                                           className="fw-bold"
//                                         >
//                                           Update Purchase Item
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
//     </>
//   );
// };

// export default UpdatePurchaseItem;

//==========================For deployment ======================//

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";
import PercentIcon from "@mui/icons-material/Percent";
import CancelIcon from "@mui/icons-material/Cancel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Box,
  CssBaseline,
  TextField,
  FormControl,
  Autocomplete,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Header from "../../../schema/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../../services/api";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const UpdatePurchaseItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const [formData, setFormData] = useState({
    supplierName: "",
    companyName: "",
    purchaseDate: "",
    invoiceDate: "",
    supplierVoucherNo: "",
    purchaseVoucherNo: "",
    itemsList: [],
    packingCharges: "",
    gstExpenses: "",
    otherExpenses: "",
    totalItemAmount: "",
    billSundryAmount: "",
    totalAmount: "",
  });
  const [itemData, setItemData] = useState({});

  const getAvailableItems = () => {
    return items;
  };

  const [transportDetails, setTransportDetails] = useState({
    builtNumber: "",
    transporter: "",
    date: "",
    lotSize: "",
    lotOpen: "",
    lotPending: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch purchase data
        const purchaseResponse = await api.get(`/api/purchases/${id}`);
        const purchaseData = purchaseResponse.data;

        // Format dates
        const formattedPurchaseDate = new Date(purchaseData.purchaseDate)
          .toISOString()
          .split("T")[0];
        const formattedInvoiceDate = new Date(purchaseData.invoiceDate)
          .toISOString()
          .split("T")[0];

        setFormData({
          ...purchaseData,
          purchaseDate: formattedPurchaseDate,
          invoiceDate: formattedInvoiceDate,
        });

        const formattedTransportDate = new Date(
          purchaseData.transportDetails.date
        )
          .toISOString()
          .split("T")[0];

        setTransportDetails({
          builtNumber: purchaseData.transportDetails.builtNumber || "",
          transporter: purchaseData.transportDetails.transporter || "",
          date: formattedTransportDate || "",
          lotSize: purchaseData.transportDetails.lotSize || "",
          lotOpen: purchaseData.transportDetails.lotOpen || "",
          lotPending: purchaseData.transportDetails.lotPending || "",
        });

        // Fetch suppliers
        const suppliersResponse = await api.get("/api/suppliers");
        const allSuppliers = suppliersResponse.data;
        setSuppliers(allSuppliers);

        // Map unique companies
        const uniqueCompanies = Array.from(
          new Set(allSuppliers.map((supplier) => supplier.partyName))
        ).map((partyName) => ({
          name: partyName,
          supplier: allSuppliers.find(
            (supplier) => supplier.partyName === partyName
          ),
        }));
        setCompanies(uniqueCompanies);

        // Find the corresponding supplier
        const supplier = allSuppliers.find(
          (s) => `${s.firstName} ${s.lastName}` === purchaseData.supplierName
        );

        // Set supplier data and form state
        if (supplier) {
          setSelectedSupplier(supplier);
          setFormData((prevState) => ({
            ...prevState,
            companyName: supplier.partyName,
            supplierName: `${supplier.firstName} ${supplier.lastName}`,
          }));
        } else {
          // Handle case where supplier is not found
          toast.warn("Supplier not found");
          setFormData((prevState) => ({
            ...prevState,
            companyName: "",
            supplierName: "",
          }));
        }

        // Fetch item data
        const itemIds = purchaseData.itemsList.map((item) => item.item._id);
        const itemResponses = await Promise.all(
          itemIds.map((itemId) => api.get(`/api/jewelry-items/${itemId}`))
        );
        const itemsData = itemResponses.reduce((acc, response) => {
          acc[response.data._id] = response.data;
          return acc;
        }, {});
        setItemData(itemsData);

        const updatedItemsList = purchaseData.itemsList.map((item) => {
          const itemDetails = itemsData[item.item._id] || {};
          return {
            ...item,
            item: itemDetails,
            price: item.price,
            unit: itemDetails?.unit || "",
            alternativeunit: itemDetails?.alternativeunit || "",
            conversionFactor: itemDetails.conversionFactor || 1,
            amount: (item.quantity * (item.price || 0)).toFixed(2),
            alternativeUnitQuantity: (
              item.quantity * (itemDetails.conversionFactor || 1)
            ).toFixed(2),
            alternativeUnitPrice: (
              item.price / (itemDetails.conversionFactor || 1)
            ).toFixed(2),
            isPredefined: true,
          };
        });
        console.log("Updated Items List:", updatedItemsList);

        setFormData((prevState) => ({
          ...prevState,
          itemsList: updatedItemsList,
        }));

        calculateTotalAmount(updatedItemsList, {
          packingCharges: purchaseData.packingCharges,
          gstExpenses: purchaseData.gstExpenses,
          otherExpenses: purchaseData.otherExpenses,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      }
    };

    fetchData();

    const fetchItems = async () => {
      try {
        const response = await api.get("/api/jewelry-items");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
        toast.error("Error fetching items");
      }
    };

    fetchItems();
  }, [id]);

  const handleItemChange = async (index, itemId) => {
    if (!selectedSupplier) {
      toast.warn("Please select a supplier first");
      return;
    }

    const selectedItem = itemData[itemId] || (await fetchItemData(itemId));

    const updatedItemsList = [...formData.itemsList];
    updatedItemsList[index] = {
      ...updatedItemsList[index],
      item: selectedItem,
      unit: selectedItem?.unit || "",
      alternativeunit: selectedItem?.alternativeunit || "",
      conversionFactor: selectedItem.conversionFactor || 1,
      amount: (
        updatedItemsList[index].quantity * (updatedItemsList[index].price || 0)
      ).toFixed(2),
      alternativeUnitQuantity: (
        updatedItemsList[index].quantity * (selectedItem.conversionFactor || 1)
      ).toFixed(2),
      alternativeUnitPrice: (
        updatedItemsList[index].price / (selectedItem.conversionFactor || 1)
      ).toFixed(2),
    };

    setFormData({ ...formData, itemsList: updatedItemsList });
    calculateTotalAmount(updatedItemsList);
  };

  const fetchItemData = async (itemId) => {
    try {
      if (!itemId) throw new Error("Invalid item ID");
      const response = await api.get(`/api/jewelry-items/${itemId}`);
      const itemDetails = response.data;

      setItemData((prevData) => ({
        ...prevData,
        [itemId]: itemDetails,
      }));

      return itemDetails;
    } catch (error) {
      console.error("Error fetching item data:", error);
      toast.error("Error fetching item data");
      return { unit: "", alternativeunit: "" }; // Default empty unit if data fetch fails
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (
      name === "packingCharges" ||
      name === "gstExpenses" ||
      name === "otherExpenses"
    ) {
      calculateTotalAmount(formData.itemsList, {
        packingCharges:
          name === "packingCharges" ? value : formData.packingCharges,
        gstExpenses: name === "gstExpenses" ? value : formData.gstExpenses,
        otherExpenses:
          name === "otherExpenses" ? value : formData.otherExpenses,
      });
    }
  };

  // const handleItemFieldChange = (index, e) => {
  //   const { name, value } = e.target;
  //   const updatedItemsList = [...formData.itemsList];

  //   const validatedValue = Math.max(0, value);

  //   updatedItemsList[index] = {
  //     ...updatedItemsList[index],
  //     [name]: validatedValue,
  //   };

  //   if (name === "quantity" || name === "price") {
  //     const quantity =
  //       name === "quantity" ? validatedValue : updatedItemsList[index].quantity;
  //     const price =
  //       name === "price" ? validatedValue : updatedItemsList[index].price;
  //     updatedItemsList[index].amount = (quantity * price).toFixed(2);
  //     updatedItemsList[index].alternativeUnitQuantity = (
  //       quantity * (updatedItemsList[index].conversionFactor || 1)
  //     ).toFixed(2);
  //     updatedItemsList[index].alternativeUnitPrice = (
  //       price / (updatedItemsList[index].conversionFactor || 1)
  //     ).toFixed(2);
  //   }

  //   setFormData({ ...formData, itemsList: updatedItemsList });
  //   calculateTotalAmount(updatedItemsList);
  // };

  const handleItemFieldChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItemsList = [...formData.itemsList];

    const validatedValue = Math.max(0, value);

    updatedItemsList[index] = {
      ...updatedItemsList[index],
      [name]: validatedValue,
    };

    if (name === "quantity" || name === "price") {
      const quantity =
        name === "quantity" ? validatedValue : updatedItemsList[index].quantity;
      const price =
        name === "price" ? validatedValue : updatedItemsList[index].price;
      updatedItemsList[index].amount = (quantity * price).toFixed(2);
      updatedItemsList[index].alternativeUnitQuantity = (
        quantity * (updatedItemsList[index].conversionFactor || 1)
      ).toFixed(2);
      updatedItemsList[index].alternativeUnitPrice = (
        price / (updatedItemsList[index].conversionFactor || 1)
      ).toFixed(2);
    }

    setFormData({ ...formData, itemsList: updatedItemsList });
    calculateTotalAmount(updatedItemsList);
  };

  const handleAddItem = () => {
    const availableItems = getAvailableItems();
    if (availableItems.length === 0) {
      toast.warn("All items have been added already.");
      return;
    }

    const updatedItemsList = [
      ...formData.itemsList,
      {
        item: null, // Default empty item
        quantity: "",
        unit: "",
        alternativeunit: "",
        price: "",
        amount: "",
        alternativeUnitQuantity: "",
        alternativeUnitPrice: "",
        isPredefined: false,
      },
    ];

    setFormData((prevState) => ({
      ...prevState,
      itemsList: updatedItemsList,
    }));
  };

  const handleDeleteItem = (index) => {
    const updatedItemsList = [...formData.itemsList];
    updatedItemsList.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      itemsList: updatedItemsList,
    }));
    calculateTotalAmount(updatedItemsList);
  };

  const calculateTotalAmount = (itemsList, expenses = {}) => {
    const totalItemAmount = itemsList.reduce(
      (total, item) => total + (parseFloat(item.amount) || 0),
      0
    );
    const packingCharges = parseFloat(expenses.packingCharges) || 0;
    const gstExpenses = parseFloat(expenses.gstExpenses) || 0;
    const otherExpenses = parseFloat(expenses.otherExpenses) || 0;

    const totalAmount =
      totalItemAmount + packingCharges + gstExpenses + otherExpenses;
    const billSundryAmount = packingCharges + gstExpenses + otherExpenses;

    setFormData((prevState) => ({
      ...prevState,
      totalItemAmount: totalItemAmount.toFixed(2),
      billSundryAmount: billSundryAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.itemsList.length === 0) {
      toast.error("Please add at least one item.");
      return;
    }

    try {
      await api.put(
        `/api/purchases/${id}`,
        { ...formData, transportDetails } // Include transportDetails here
      );

      toast.success("Purchase item updated successfully");
      navigate("/purchase_voucher_list");
    } catch (error) {
      console.error("Error updating purchase item:", error);
      toast.error("Error updating purchase item");
    }
  };

  return (
    <>
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
                            Update Purchase Item
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <Box component="form" onSubmit={handleSubmit}>
                        <ToastContainer />
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
                                        options={companies.map(
                                          (company) => company.name
                                        )}
                                        value={formData.companyName || ""}
                                        onChange={(e, newValue) => {
                                          const selectedCompany =
                                            companies.find(
                                              (company) =>
                                                company.name === newValue
                                            );
                                          const supplier = selectedCompany
                                            ? selectedCompany.supplier
                                            : {};

                                          setFormData((prevState) => ({
                                            ...prevState,
                                            companyName: newValue,
                                            supplierName: supplier
                                              ? `${supplier.firstName} ${supplier.lastName}`
                                              : "",
                                          }));

                                          setSelectedSupplier(supplier);
                                        }}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            label="Company Name"
                                            size="small"
                                            variant="outlined"
                                          />
                                        )}
                                      />
                                    </FormControl>
                                  </div>

                                  <div className="col-xl-3">
                                    <FormControl fullWidth>
                                      <Autocomplete
                                        options={suppliers.map(
                                          (supplier) => supplier.firstName
                                        )}
                                        value={formData.supplierName || ""}
                                        onChange={(e, newValue) => {
                                          const supplier = suppliers.find(
                                            (supplier) =>
                                              `${supplier.firstName} ${supplier.lastName}` ===
                                              newValue
                                          );

                                          setFormData((prevState) => ({
                                            ...prevState,
                                            supplierName: newValue,
                                          }));

                                          setSelectedSupplier(supplier);
                                        }}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            label="Supplier Name"
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
                                        name="purchaseDate"
                                        label="Purchase Date"
                                        type="date"
                                        value={formData.purchaseDate || ""}
                                        onChange={handleChange}
                                        variant="outlined"
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        size="small"
                                      />
                                    </FormControl>
                                  </div>

                                  <div className="col-xl-3">
                                    <FormControl fullWidth>
                                      <TextField
                                        name="invoiceDate"
                                        label="Invoice Date"
                                        type="date"
                                        value={formData.invoiceDate || ""}
                                        onChange={handleChange}
                                        variant="outlined"
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        size="small"
                                      />
                                    </FormControl>
                                  </div>

                                  <div className="col-xl-3">
                                    <FormControl fullWidth margin="normal">
                                      <TextField
                                        name="purchaseVoucherNo"
                                        label="Purchase Voucher No"
                                        value={formData.purchaseVoucherNo || ""}
                                        onChange={handleChange}
                                        variant="outlined"
                                        size="small"
                                      />
                                    </FormControl>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-xl-12 d-flex justify-content-end">
                                    <Button
                                      type="button"
                                      variant="contained"
                                      color="secondary"
                                      onClick={handleAddItem}
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
                                              M Quantity
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
                                              M Unit
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
                                              Alt Unit
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
                                              Alt Quantity
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
                                              M Price(Rs.)
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
                                              Alt Price(Rs.)
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
                                              T Amount(Rs.)
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

                                        <TableBody
                                          sx={{
                                            background: "white",
                                            overflowY: "auto",
                                          }}
                                        >
                                          {formData.itemsList.map(
                                            (item, index) => (
                                              <TableRow key={index}>
                                                <TableCell
                                                  sx={{
                                                    border:
                                                      "1px solid lightgray",
                                                    padding: "0px",
                                                  }}
                                                  align="center"
                                                >
                                                  <span className="ps-2 pe-2 pt-0 pb-0">
                                                    {index + 1}
                                                  </span>
                                                </TableCell>

                                                <TableCell
                                                  sx={{
                                                    border:
                                                      "1px solid lightgray",
                                                    padding: "0px",
                                                    width: "300px",
                                                  }}
                                                  align="center"
                                                >
                                                  <FormControl fullWidth>
                                                    <Autocomplete
                                                      options={getAvailableItems()}
                                                      getOptionLabel={(
                                                        option
                                                      ) => option.name}
                                                      value={item.item || null}
                                                      onChange={(e, newValue) =>
                                                        handleItemChange(
                                                          index,
                                                          newValue?._id
                                                        )
                                                      }
                                                      renderInput={(params) => (
                                                        <TextField
                                                          {...params}
                                                        />
                                                      )}
                                                    />
                                                  </FormControl>
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
                                                    fullWidth
                                                    inputProps={{ min: "0" }}
                                                    required
                                                    variant="standard"
                                                    name="quantity"
                                                    value={item.quantity || ""}
                                                    onChange={(e) =>
                                                      handleItemFieldChange(
                                                        index,
                                                        e
                                                      )
                                                    }
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
                                                    value={
                                                      item.unit?.name || ""
                                                    }
                                                    disabled
                                                    fullWidth
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
                                                    value={item.alternativeunit}
                                                    disabled
                                                    fullWidth
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
                                                    type="number"
                                                    value={
                                                      item.alternativeUnitQuantity
                                                    }
                                                    onChange={(e) =>
                                                      handleItemFieldChange(
                                                        index,
                                                        e
                                                      )
                                                    }
                                                    name="alternativeUnitQuantity"
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
                                                    fullWidth
                                                    inputProps={{ min: "0" }}
                                                    required
                                                    variant="standard"
                                                    InputProps={{
                                                      startAdornment: (
                                                        <InputAdornment position="center">
                                                          <CurrencyRupeeIcon
                                                            style={{
                                                              fontSize: "15px",
                                                            }}
                                                          />
                                                        </InputAdornment>
                                                      ),
                                                    }}
                                                    name="price"
                                                    value={item.price || ""}
                                                    onChange={(e) =>
                                                      handleItemFieldChange(
                                                        index,
                                                        e
                                                      )
                                                    }
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
                                                    fullWidth
                                                    inputProps={{ min: "0" }}
                                                    required
                                                    variant="standard"
                                                    InputProps={{
                                                      startAdornment: (
                                                        <InputAdornment position="center">
                                                          <CurrencyRupeeIcon
                                                            style={{
                                                              fontSize: "15px",
                                                            }}
                                                          />
                                                        </InputAdornment>
                                                      ),
                                                    }}
                                                    name="alternativeUnitPrice"
                                                    value={
                                                      item.alternativeUnitPrice ||
                                                      ""
                                                    }
                                                    onChange={(e) =>
                                                      handleItemFieldChange(
                                                        index,
                                                        e
                                                      )
                                                    }
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
                                                    name="price"
                                                    value={item.amount || ""}
                                                    disabled
                                                    fullWidth
                                                    variant="standard"
                                                    inputProps={{ min: "0" }}
                                                    required
                                                    InputProps={{
                                                      startAdornment: (
                                                        <InputAdornment position="center">
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
                                                  <Button
                                                    onClick={() =>
                                                      handleDeleteItem(index)
                                                    }
                                                    color="error"
                                                  >
                                                    <CancelIcon />
                                                  </Button>
                                                </TableCell>
                                              </TableRow>
                                            )
                                          )}
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
                                        Total Item Ammount:
                                        <span>
                                          <CurrencyRupeeIcon
                                            style={{ fontSize: "18px" }}
                                          />
                                        </span>
                                        <span className="fw-bold">
                                          {formData.totalItemAmount || ""}
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
                                                    width: "200px",
                                                  }}
                                                  align="center"
                                                >
                                                  <TextField
                                                    name="packingCharges"
                                                    type="number"
                                                    value={
                                                      formData.packingCharges ||
                                                      ""
                                                    }
                                                    onChange={handleChange}
                                                    size="small"
                                                    variant="standard"
                                                    InputProps={{
                                                      startAdornment: (
                                                        <InputAdornment
                                                          position="end"
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
                                                    name="gstExpenses"
                                                    type="number"
                                                    value={
                                                      formData.gstExpenses || ""
                                                    }
                                                    onChange={handleChange}
                                                    size="small"
                                                    variant="standard"
                                                    InputProps={{
                                                      startAdornment: (
                                                        <InputAdornment
                                                          position="end"
                                                          style={{
                                                            marginRight: "-0px",
                                                            marginBottom: "3px",
                                                          }}
                                                        >
                                                          <PercentIcon
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
                                                    type="number"
                                                    value={
                                                      formData.otherExpenses ||
                                                      ""
                                                    }
                                                    onChange={handleChange}
                                                    size="small"
                                                    variant="standard"
                                                    InputProps={{
                                                      startAdornment: (
                                                        <InputAdornment
                                                          position="end"
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
                                            Bil Sundry Amount:
                                            <CurrencyRupeeIcon
                                              style={{ fontSize: "15px" }}
                                            />
                                            {formData.billSundryAmount || ""}
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
                                            {formData.totalAmount || ""}
                                          </span>
                                        </h5>
                                      </div>
                                    </div>

                                    {/* Bill sundry End */}
                                    <Box>
                                      <span>Transport Detail</span>
                                      <TableContainer component={Paper}>
                                        <Table>
                                          <TableHead>
                                            <TableRow>
                                              <TableCell
                                                align="center"
                                                sx={{
                                                  border: "1px solid lightgray",
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
                                                  border: "1px solid lightgray",
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
                                                  border: "1px solid lightgray",
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
                                                  border: "1px solid lightgray",
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
                                                  border: "1px solid lightgray",
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
                                                  border: "1px solid lightgray",
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
                                                  border: "1px solid lightgray",
                                                  padding: "0px",
                                                }}
                                                align="center"
                                              >
                                                <TextField
                                                  size="small"
                                                  name="date"
                                                  label="Date"
                                                  type="date"
                                                  value={
                                                    transportDetails.date || ""
                                                  }
                                                  onChange={(e) =>
                                                    setTransportDetails({
                                                      ...transportDetails,
                                                      date: e.target.value,
                                                    })
                                                  }
                                                  variant="standard"
                                                  InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                                />
                                              </TableCell>
                                              <TableCell
                                                sx={{
                                                  border: "1px solid lightgray",
                                                  padding: "0px",
                                                }}
                                                align="center"
                                              >
                                                <TextField
                                                  type="number"
                                                  size="small"
                                                  variant="standard"
                                                  name="builtNumber"
                                                  value={
                                                    transportDetails.builtNumber ||
                                                    ""
                                                  }
                                                  onChange={(e) =>
                                                    setTransportDetails({
                                                      ...transportDetails,
                                                      builtNumber:
                                                        e.target.value,
                                                    })
                                                  }
                                                />
                                              </TableCell>
                                              <TableCell
                                                sx={{
                                                  border: "1px solid lightgray",
                                                  padding: "0px",
                                                }}
                                                align="center"
                                              >
                                                <TextField
                                                  size="small"
                                                  variant="standard"
                                                  name="transporter"
                                                  value={
                                                    transportDetails.transporter ||
                                                    ""
                                                  }
                                                  onChange={(e) =>
                                                    setTransportDetails({
                                                      ...transportDetails,
                                                      transporter:
                                                        e.target.value,
                                                    })
                                                  }
                                                />
                                              </TableCell>

                                              <TableCell
                                                sx={{
                                                  border: "1px solid lightgray",
                                                  padding: "0px",
                                                }}
                                                align="center"
                                              >
                                                <TextField
                                                  size="small"
                                                  variant="standard"
                                                  name="lotSize"
                                                  value={
                                                    transportDetails.lotSize ||
                                                    ""
                                                  }
                                                  onChange={(e) =>
                                                    setTransportDetails({
                                                      ...transportDetails,
                                                      lotSize: e.target.value,
                                                    })
                                                  }
                                                />
                                              </TableCell>
                                              <TableCell
                                                sx={{
                                                  border: "1px solid lightgray",
                                                  padding: "0px",
                                                }}
                                                align="center"
                                              >
                                                <TextField
                                                  size="small"
                                                  variant="standard"
                                                  name="lotOpen"
                                                  value={
                                                    transportDetails.lotOpen ||
                                                    ""
                                                  }
                                                  onChange={(e) =>
                                                    setTransportDetails({
                                                      ...transportDetails,
                                                      lotOpen: e.target.value,
                                                    })
                                                  }
                                                />
                                              </TableCell>
                                              <TableCell
                                                sx={{
                                                  border: "1px solid lightgray",
                                                  padding: "0px",
                                                }}
                                                align="center"
                                              >
                                                <TextField
                                                  size="small"
                                                  variant="standard"
                                                  name="lotPending"
                                                  value={
                                                    transportDetails.lotPending ||
                                                    ""
                                                  }
                                                  onChange={(e) =>
                                                    setTransportDetails({
                                                      ...transportDetails,
                                                      lotPending:
                                                        e.target.value,
                                                    })
                                                  }
                                                />
                                              </TableCell>
                                            </TableRow>
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                    </Box>

                                    <div className="row mt-3">
                                      <div className="col-xl-12">
                                        <Button
                                          type="submit"
                                          variant="contained"
                                          color="primary"
                                          className="fw-bold"
                                        >
                                          Update Purchase Item
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
    </>
  );
};

export default UpdatePurchaseItem;
