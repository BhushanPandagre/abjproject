// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import Stack from "@mui/material/Stack";
// import Grid from "@mui/material/Grid";
// import { Link, useNavigate } from "react-router-dom";
// import Button from "@mui/material/Button";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import { FormControl, InputLabel, Select, IconButton } from "@mui/material";
// import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import CssBaseline from "@mui/material/CssBaseline";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Header from "../../../schema/Header";
// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { Box, Dialog, Autocomplete } from "@mui/material";
// import Tooltip from "@mui/material/Tooltip";
// import AddIcon from "@mui/icons-material/Add";
// import { DialogTitle, DialogContent, DialogActions } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import InputAdornment from "@mui/material/InputAdornment";
// import CancelIcon from "@mui/icons-material/Cancel";
// import PercentIcon from "@mui/icons-material/Percent";
// // import PackagingDialog from './PackagingDialog'; // Import the dialog component
// import PackagingDialog from "./PackagingDialog";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Checkbox,
// } from "@mui/material";
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
//     to="/purchase_voucher_list"
//     className="text-decoration-none"
//   >
//     Purchase Voucher
//   </Link>,

//   <Typography key="3" color="text.secondary">
//     Add Purchase Voucher
//   </Typography>,
// ];

// const VisuallyHiddenInput = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

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

// export default function AddPurchaseVoucher() {
//   //--------------------------- add_purchase_voucher functions Start---------------------//
//   const [newItemName, setNewItemName] = useState("");
//   const [items, setItems] = useState([]);
//   const [suppliers, setSuppliers] = useState([]);
//   const [selectedSupplier, setSelectedSupplier] = useState(null);
//   const [companies, setCompanies] = useState([]);
//   const [itemData, setItemData] = useState({});
//   const [serialNumber, setSerialNumber] = useState("");

//   // const [selectedItemIndex, setSelectedItemIndex] = useState(null);
//   // const [isPackagingDialogOpen, setIsPackagingDialogOpen] = useState(false);

//   const [selectedItemIndex, setSelectedItemIndex] = useState(null);
 
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const [formData, setFormData] = useState({
//     itemsList: Array(12).fill({
//       item: "",
//       quantity: null,
//       unit: "",
//       alternativeUnit: "", 
//       price: "",
//       amount: "",
//       packaging: [] // Array to hold packaging details
//     }),
//     supplierName: "",
//     companyName: "",
//     purchaseDate: new Date().toISOString().split("T")[0],
//     invoiceDate: new Date().toISOString().split("T")[0],

//     purchaseVoucherNo: "",
//     packingCharges: "",
//     gstExpenses: "",
//     otherExpenses: "",
//     totalItemAmount: "",
//     billSundryAmount: "",
//     totalAmount: "",
//   });


//   // const handlePackagingClick = (index) => {
//   //   setSelectedItemIndex(index);
//   //   setIsPackagingDialogOpen(true);
//   // };

//   // const handlePackagingSave = (packaging) => {
//   //   const updatedItemsList = [...formData.itemsList];
//   //   updatedItemsList[selectedItemIndex].packaging = packaging;
//   //   setFormData({ ...formData, itemsList: updatedItemsList });
//   // };


//   const handleOpenDialog = (index) => {
//     setSelectedItemIndex(index);
//     setDialogOpen(true);
//   };
  
//   // const handleSavePackaging = (index, packaging) => {
//   //   const updatedItems = items.map((item, i) =>
//   //     i === index ? { ...item, packaging } : item
//   //   );
//   //   setItems(updatedItems);
//   // };

//   const handleSavePackaging = (index, packaging) => {
//     console.log("Updating item packaging:", index, packaging);
//     const updatedItems = items.map((item, i) =>
//       i === index ? { ...item, packaging } : item
//     );
//     setItems(updatedItems);
//   };
  

//   const handleItemChange = async (index, value) => {
//     const selectedItem =
//       itemData[value] ||
//       (await fetchItemData(value, selectedSupplier?.customerType));
//     const updatedItemsList = [...formData.itemsList];
//     updatedItemsList[index] = {
//       ...updatedItemsList[index],
//       item: value,
//       unit: selectedItem.unit ? selectedItem.unit : "", // Ensure unit is a string
//     };
//     setFormData({ ...formData, itemsList: updatedItemsList });
//     calculateTotalAmount(updatedItemsList);
//   };

//   //====================== SerialNumber ==========================//

//   // Handle serial number change and jump to field
//   const handleSerialNumberChange = (e) => {
//     setSerialNumber(e.target.value);
//   };

//   const handleJumpToField = () => {
//     const serialNumberInt = parseInt(serialNumber, 10);
//     if (serialNumberInt >= 1 && serialNumberInt <= formData.itemsList.length) {
//       const index = serialNumberInt - 1; // Serial numbers are 1-based, but array indices are 0-based
//       const nextFieldRef = itemNameRefs.current[index];

//       if (nextFieldRef) {
//         nextFieldRef.focus();
//       }
//     } else {
//       alert("Invalid serial number.");
//     }
//   };


//   const fetchLatestVoucherNumber = async () => {
//     try {
//       const response = await api.get('/api/vouchers/latest-voucher-number');
//       const { latestNumber } = response.data;
//       setFormData(prevData => ({
//         ...prevData,
//         purchaseVoucherNo: latestNumber
//       }));
//     } catch (error) {
//       console.error("Error fetching latest voucher number:", error);
//     }
//   };
  
//   const fetchNextPurchaseVoucherNo = async () => {
//     try {
//       const response = await api.get('/api/vouchers/latest-voucher-number');
//       const { latestNumber } = response.data;
//       // Extract the current number and increment it
//       const [, number] = latestNumber.split('/');
//       const nextNumber = (parseInt(number, 10) + 1).toString().padStart(2, '0');
//       const nextVoucherNumber = PUR-2024/${nextNumber};
      


//       return nextVoucherNumber;
//     } catch (error) {
//       console.error("Error fetching next purchase voucher number:", error);
//       return "Error";
//     }
//   };
  

//   useEffect(() => {

//      // Fetch the latest voucher number when the component mounts
//      fetchLatestVoucherNumber();

//     const fetchData = async () => {
//       try {
//         const [suppliersResponse, itemsResponse] = await Promise.all([
//           api.get("/api/suppliers"),
//           api.get("/api/jewelry-items"),
//         ]);

//         const allSuppliers = suppliersResponse.data;

//         // Map company names to their corresponding suppliers
//         const companyData = allSuppliers.map((item) => ({
//           name: item.companyName,
//           supplierName: item.name,
//         }));

//         // Separate supplier data
//         const supplierData = allSuppliers
//           .filter((item) => item.name)
//           .map((item) => ({
//             name: item.name,
//             companyName: item.companyName || "",
//           }));

//         setCompanies(companyData);
//         setSuppliers(allSuppliers);
//         setItems(itemsResponse.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Handle changes in the company (party) selection
//   const handleCompanyChange = (event, newValue) => {
//     if (newValue) {
//       const selectedSupplier = suppliers.find(
//         (supplier) => supplier.partyName === newValue.partyName
//       );

//       setFormData({
//         ...formData,
//         companyName: newValue.partyName,
//         supplierName: selectedSupplier
//           ? ${selectedSupplier.firstName} ${selectedSupplier.lastName} // Concatenate first and last names
//           : "",
//       });
//     } else {
//       setFormData({ ...formData, companyName: "", supplierName: "" });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log(
//       "Current Save Purchase number -------",
//       formData.purchaseVoucherNo
//     );

//     // Filter out items with empty fields
//     const validItemsList = formData.itemsList.filter(
//       (item) => item.item && item.quantity && item.price && item.amount
//     );

//     // Ensure valid itemsList only contains valid ObjectIds or nulls
//     const processedItemsList = validItemsList.map((item) => ({
//       item: item.item ? item.item.trim() : null, // Use null if item is empty
//       quantity: item.quantity || 0,
//       unit: item.unit || "",
//       alternativeUnit: item.alternativeUnit || "", // Add this field
//       price: item.price || 0,
//       amount: item.amount || 0,
//       packaging: item.packaging || [] // Include packaging details
//     }));

//     const formDataToSubmit = {
//       ...formData,
//       itemsList: processedItemsList,
//       transportDetails,
//     };

//     try {
//       const submitResponse = await api.post("/api/purchases", formDataToSubmit);
//       if (submitResponse.data.success) {
//         alert("Purchase added successfully!");

//         // Reset form data as described previously
//         const nextVoucherNo = await fetchNextPurchaseVoucherNo();
//         resetForm(nextVoucherNo);
//       } else {
//         throw new Error("Error adding purchase");
//       }
//     } catch (error) {
//       console.error("Error adding purchase:", error);
//       alert("Failed to add purchase: " + error.message);
//     }
//   };

//   const resetForm = (nextVoucherNo) => {
//     setFormData({
//       supplierName: "",
//       companyName: "",
//       invoiceDate: new Date().toISOString().split("T")[0],
//       purchaseDate: new Date().toISOString().split("T")[0],
//       // supplierVoucherNo: "",
//       purchaseVoucherNo: nextVoucherNo,
//       itemsList: [{ item: "", quantity: "", unit: "", price: "", amount: "" }],
//       packingCharges: "",
//       gstExpenses: "",
//       otherExpenses: "",
//       totalAmount: "",
//     });
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

//   const calculateTotalAmount = (updatedFormData) => {
//     const { itemsList, packingCharges, gstExpenses, otherExpenses } =
//       updatedFormData;

//     // Calculate total from items list
//     const totalItemAmount = itemsList.reduce(
//       (sum, item) => sum + parseFloat(item.amount || 0),
//       0
//     );

//     // Parse additional expenses
//     const packing = parseFloat(packingCharges) || 0;
//     const gstPercentage = parseFloat(gstExpenses) || 0; // Assume gstExpenses is a percentage
//     const other = parseFloat(otherExpenses) || 0;

//     // Convert gst percentage to amount
//     const gstAmount = (totalItemAmount * gstPercentage) / 100;

//     // Calculate bill sundry amount
//     const billSundryAmount = packing + gstAmount + other;

//     // Calculate total amount including additional expenses
//     const totalAmount = totalItemAmount + billSundryAmount;

//     // Update form data with the new values
//     setFormData((prevData) => ({
//       ...prevData,
//       totalItemAmount: totalItemAmount.toFixed(2),
//       billSundryAmount: billSundryAmount.toFixed(2),
//       totalAmount: totalAmount.toFixed(2),
//     }));
//   };

//   const handleItemFieldChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedItemsList = [...formData.itemsList];

//     // Allow empty or zero values for fields
//     const validatedValue =
//       name === "quantity" || name === "price" ? Math.max(0, value) : value;

//     updatedItemsList[index] = {
//       ...updatedItemsList[index],
//       [name]: validatedValue,
//     };

//     // Calculate amount if quantity and price are available
//     if (name === "quantity" || name === "price") {
//       const quantity =
//         name === "quantity" ? validatedValue : updatedItemsList[index].quantity;
//       const price =
//         name === "price" ? validatedValue : updatedItemsList[index].price;
//       updatedItemsList[index].amount = (quantity * price).toFixed(2);
//     }

//     setFormData({ ...formData, itemsList: updatedItemsList });
//     calculateTotalAmount({ ...formData, itemsList: updatedItemsList });
//   };

//   const handleFieldChange = (event) => {
//     const { name, value } = event.target;
//     const updatedFormData = {
//       ...formData,
//       [name]: value,
//     };
//     setFormData(updatedFormData);

//     // Recalculate total with the updated form data
//     calculateTotalAmount(updatedFormData);
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

//     // Convert to number for calculation, default to 0 if not a valid number
//     if (name === "lotSize" || name === "lotOpen") {
//       newValue = parseFloat(value) || 0;
//     }

//     setTransportDetails((prevDetails) => {
//       const updatedDetails = {
//         ...prevDetails,
//         [name]: newValue,
//       };

//       // Calculate lot pending if lotSize and lotOpen are available
//       if (
//         updatedDetails.lotSize !== undefined &&
//         updatedDetails.lotOpen !== undefined
//       ) {
//         updatedDetails.lotPending = (
//           updatedDetails.lotSize - updatedDetails.lotOpen
//         ).toFixed(2);
//       }

//       return updatedDetails;
//     });
//   };

//   const handleCheckboxChange = (e) => {
//     setShowTransportDetails(e.target.checked);
//   };

//   //---------------------Function For Add New Item In Dialog--------------------------//

//   const [formsData, setFormsData] = useState({
//     name: "",
//     printname: "",
//     itemType: "",
//     mainUnitBarcode: "",
//     alternativeUnitBarcode: "",
//     group: "",
//     category: "",
//     unit: null,
//     alternativeunit: "",
//     conversionType: "",
//     conversionFactor: "",
//     quantity: "",
//     saleprice: "",
//     purchaseprice: "",
//     MRP: "",
//     retailerPrice: "",
//     semiWholesellerPrice: "",
//     wholesellerPrice: "",
//     minSalePrice: "",
//     gst: null,
//     HSNCode: "",
//     salediscount: "",
//   });
//   const navigate = useNavigate("");

//   const [isItemAddDialogOpen, setIsItemAddDialogOpen] = useState(false);
//   const [isAddSupplierDialogOpen, setIsAddSupplierDialogOpen] = useState(false);

//   const handleItemAddDialogOpen = () => {
//     setIsItemAddDialogOpen(true);
//   };

//   const handleItemAddDialogClose = () => {
//     setIsItemAddDialogOpen(false);
//   };

//   const handleNewGroupChange = (e) => {
//     setNewGroup(e.target.value);
//   };

//   const [nameError, setNameError] = useState("");
//   const [groups, setGroups] = useState([]);
//   const [units, setUnits] = useState([]);
//   const [alternativeUnits, setAlternativeUnits] = useState([]);
//   const [gsts, setGsts] = useState([]);

//   const [newGroup, setNewGroup] = useState("");
//   const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false);

//   const [newGst, setNewGst] = useState("");
//   const [newGstRate, setNewGstRate] = useState("");
//   const [isGstDialogOpen, setIsGstDialogOpen] = useState(false);

//   const [newUnit, setNewUnit] = useState("");
//   const [isUnitDialogOpen, setIsUnitDialogOpen] = useState(false);

//   const [newAlternativeUnit, setNewAlternativeUnit] = useState("");
//   const [isAlternativeUnitDialogOpen, setIsAlternativeUnitDialogOpen] =
//     useState(false);

//   // Create refs for each TextField
//   const itemNameRefs = useRef([]);
//   const quantityRefs = useRef([]);
//   const unitRefs = useRef([]);
//   const priceRefs = useRef([]);
//   const amountRefs = useRef([]);
//   // Initialize refs

//   // Initialize refs
//   const setItemNameRef = (ref, index) => {
//     itemNameRefs.current[index] = ref;
//   };

//   const setQuantityRef = (ref, index) => {
//     quantityRefs.current[index] = ref;
//   };

//   const setUnitRef = (ref, index) => {
//     unitRefs.current[index] = ref;
//   };

//   const setPriceRef = (ref, index) => {
//     priceRefs.current[index] = ref;
//   };

//   const setAmountRef = (ref, index) => {
//     amountRefs.current[index] = ref;
//   };

//   // Update the conversionType whenever the unit or alternative unit changes
//   useEffect(() => {
//     if (formsData.unit && formsData.alternativeunit) {
//       setFormsData((prevState) => ({
//         ...prevState,
//         conversionType: ${formsData.alternativeunit} / ${formsData.unit},
//       }));
//     }
//   }, [formsData.unit, formsData.alternativeunit]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [
//           groupsResponse,
//           unitsResponse,
//           alternativeUnitsResponse,
//           gstsResponse,
//         ] = await Promise.all([
//           api.get("/api/groups"),
//           api.get("/api/units"),
//           api.get("/api/alternative-units"),
//           api.get("/api/gsts"),
//         ]);
//         setGroups(groupsResponse.data);
//         setUnits(unitsResponse.data);
//         setAlternativeUnits(alternativeUnitsResponse.data);
//         setGsts(gstsResponse.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await api.get("/api/jewelry-items");
//         setItems(response.data);
//       } catch (error) {
//         console.error("Error fetching items:", error);
//       }
//     };

//     fetchItems();
//   }, []);

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await api.get("/api/jewelry-items");
//         setItems(response.data);
//       } catch (error) {
//         console.error("Error fetching items:", error);
//       }
//     };

//     const fetchSuppliers = async () => {
//       try {
//         const response = await api.get("/api/suppliers");
//         setSuppliers(response.data);
//       } catch (error) {
//         console.error("Error fetching suppliers:", error);
//       }
//     };

//     const setCurrentDate = () => {
//       const currentDate = new Date().toISOString().split("T")[0]; // Format as yyyy-mm-dd
//       setFormData((prevData) => ({
//         ...prevData,
//         date: currentDate,
//       }));
//     };

//     fetchItems();
//     fetchSuppliers();
//     setCurrentDate();
//   }, []);

//   const handleAddNewItem = async () => {
//     try {
//       const newItem = {
//         name: newItemName,
//         unit: "", // Add other required fields if necessary
//       };

//       const response = await api.post("/api/jewelry-items", newItem);

//       if (response.data.success) {
//         alert("Item added successfully!");

//         // Fetch the updated list of items
//         const itemsResponse = await api.get("/api/jewelry-items");
//         setItems(itemsResponse.data);

//         // Close the dialog and reset the new item name
//         setNewItemName("");
//         setIsItemAddDialogOpen(false);
//       } else {
//         throw new Error("Error adding item");
//       }
//     } catch (error) {
//       console.error("Error adding item:", error);
//       alert("Error adding item.");
//     }
//   };

//   const fetchItemData = async (itemId, customerType) => {
//     try {
//       const response = await api.get(/api/jewelry-items/${itemId});
//       const { retailerPrice, semiWholesellerPrice, wholesellerPrice, unit ,alternativeUnit} =
//         response.data;

//       const price =
//         customerType === "Retailer"
//           ? retailerPrice
//           : customerType === "Semi Wholeseller"
//           ? semiWholesellerPrice
//           : wholesellerPrice;

//       setItemData((prevData) => ({ ...prevData, [itemId]: { price, unit , alternativeUnit } }));
//       return { price, unit ,alternativeUnit};
//     } catch (error) {
//       console.error("Error fetching item data:", error);
//       return { price: 0, unit: "",alternativeUnit: "" };
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleItemInputChange = (event, value, reason, index) => {
//     if (reason === "input" && value.trim()) {
//       // Set the typed name for the dialog and update the form data
//       setNewItemName(value);
//       setFormsData((prevData) => ({
//         ...prevData,
//         name: value,
//         printName: value, // Assuming you want to set the print name the same as the typed name
//       }));
//     }
//   };

//   const handleChangeDialog = async (e) => {
//     const { name, value } = e.target;
//     console.log("Value before:", formsData);

//     const upperCaseValue =
//       name === "name" || name === "printname" ? value.toUpperCase() : value;

//     let updatedFormData = {
//       ...formsData,
//       [name]: upperCaseValue,
//     };

//     if (name === "name") {
//       updatedFormData.printname = upperCaseValue;

//       const hindiText = await transliterateToHindi(upperCaseValue);
//       updatedFormData.itemType = hindiText;
//     }

//     setFormsData(updatedFormData);
//     console.log("Value after:", updatedFormData);
//   };

//   const handleItemChangeWrapper = (index, value) => {
//     if (typeof value === "string") {
//       // User typed a new value and pressed Enter
//       setNewItemName(value);
//       setFormsData((prevData) => ({
//         ...prevData,
//         name: value,
//         printName: value,
//       }));
//       setIsItemAddDialogOpen(true); // Open the dialog
//     } else if (value && value._id) {
//       // User selected from the dropdown
//       handleItemChange(index, value._id);
//       // Move focus to the next field
//       const nextFieldRef = quantityRefs.current[index];
//       if (nextFieldRef) {
//         nextFieldRef.focus();
//       }
//     }
//   };

//   const handleKeyDown = (event, index, type) => {
//     if (event.key === "Enter") {
//       event.preventDefault(); // Prevent default Enter key action

//       if (type === "autocomplete") {
//         const value = event.target.value.trim();
//         if (value) {
//           // User pressed Enter while typing a new item name
//           setNewItemName(value);
//           setFormsData((prevData) => ({
//             ...prevData,
//             name: value,
//             printName: value,
//           }));
//           setIsItemAddDialogOpen(true); // Open the dialog
//         } else {
//           // Move focus to the next field if selected from dropdown
//           const nextFieldRef = quantityRefs.current[index];
//           if (nextFieldRef) {
//             nextFieldRef.focus();
//           }
//         }
//       } else {
//         // Handle cases where the dialog needs to be opened or the next field should be focused
//         const nextFieldRef = (
//           type === "quantity"
//             ? unitRefs
//             : type === "unit"
//             ? priceRefs
//             : amountRefs
//         ).current[index];
//         if (nextFieldRef) {
//           nextFieldRef.focus(); // Focus on the next field
//         }
//       }
//     }
//   };

//   const handleAddItemDialogClose = () => {
//     setIsItemAddDialogOpen(false);
//   };

//   const handleGroupDialogOpen = () => {
//     setIsGroupDialogOpen(true);
//   };
//   const handleGroupDialogClose = () => {
//     setIsGroupDialogOpen(false);
//   };

//   const handleAddNewGroup = async () => {
//     try {
//       const response = await api.post("/api/group", {
//         name: newGroup,
//       });
//       setGroups([...groups, response.data]);
//       setNewGroup("");
//       setIsGroupDialogOpen(false);
//     } catch (error) {
//       console.error("Error adding new group:", error);
//     }
//   };

//   const handleUnitDialogOpen = () => {
//     setIsUnitDialogOpen(true);
//   };
//   const handleUnitDialogClose = () => {
//     setIsUnitDialogOpen(false);
//   };
//   const handleNewUnitChange = (e) => {
//     setNewUnit(e.target.value);
//   };

//   const handleAddNewUnit = async () => {
//     try {
//       const response = await api.post("/api/units", {
//         name: newUnit,
//       });
//       setUnits([...units, response.data]);
//       setNewUnit("");
//       setIsUnitDialogOpen(false);
//     } catch (error) {
//       console.error("Error adding new unit:", error);
//     }
//   };

//   const handleAlternativeUnitDialogOpen = () => {
//     setIsAlternativeUnitDialogOpen(true);
//   };
//   const handleAlternativeUnitDialogClose = () => {
//     setIsAlternativeUnitDialogOpen(false);
//   };
//   const handleNewAlternativeUnitChange = (e) => {
//     setNewAlternativeUnit(e.target.value);
//   };
//   const handleAddNewAlternativeUnit = async () => {
//     try {
//       const response = await api.post("/api/alternative-units", {
//         name: newAlternativeUnit,
//       });
//       setAlternativeUnits([...alternativeUnits, response.data]);
//       setNewAlternativeUnit("");
//       setIsAlternativeUnitDialogOpen(false);
//       toast.success("Alternative Unit Added successfully");
//     } catch (error) {
//       console.error("Error adding new alternative unit:", error);
//     }
//   };
//   const handleGstDialogOpen = () => {
//     setIsGstDialogOpen(true);
//   };
//   const handleGstDialogClose = () => {
//     setIsGstDialogOpen(false);
//   };

//   const handleNewGstChange = (e) => {
//     setNewGst(e.target.value);
//   };

//   const handleNewGstRateChange = (e) => {
//     setNewGstRate(e.target.value);
//   };

//   const handleAddNewGst = async () => {
//     try {
//       const response = await api.post("/api/gsts", {
//         name: newGst,
//         rate: newGstRate,
//       });
//       setGsts([...gsts, response.data]);
//       setNewGst("");
//       setNewGstRate("");
//       setIsGstDialogOpen(false);
//     } catch (error) {
//       console.error("Error adding new GST:", error);
//     }
//   };

//   const handleSubmitDialog = async (e) => {
//     e.preventDefault();

//     // Validate form data
//     if (!formsData.name.trim()) {
//       setNameError("Name is required");
//       return;
//     } else {
//       setNameError("");
//     }

//     const selectedGroup = groups.find(
//       (group) => group.name === formsData.group
//     );

//     // Prepare form data for submission
//     const formsDataToSubmit = new FormData();
//     for (const key in formsData) {
//       if (key === "group") {
//         formsDataToSubmit.append("group", selectedGroup?._id);
//       } else if (key === "gst") {
//         formsDataToSubmit.append("gst", formsData.gst._id);
//       } else {
//         formsDataToSubmit.append(key, formsData[key]);
//       }
//     }

//     try {
//       const response = await api.post("/api/jewelry-items", formsDataToSubmit, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Jewelry item added successfully!");

//       // Update items state and reset form
//       setItems((prevItems) => [...prevItems, response.data]);
//       setFormsData({
//         name: "",
//         printname: "",
//         itemType: "",
//         group: "",
//         category: "",
//         unit: "",
//         alternativeunit: "",
//         conversionType: "",
//         conversionFactor: "",
//         packagingunit: "",
//         quantity: "",
//         retailerPrice: "",
//         semiWholesellerPrice: "",
//         wholesellerPrice: "",
//         minSalePrice: "",
//         saleprice: "",
//         purchaseprice: "",
//         MRP: "",
//         gst: null,
//         HSNCode: "",
//         salediscount: "",
//       });
//     } catch (error) {
//       console.error(
//         "Error saving jewelry item:",
//         error.response ? error.response.data : error.message
//       );
//       alert(
//         `Error saving jewelry item: ${
//           error.response ? error.response.data.message : error.message
//         }`
//       );
//     }
//   };

//   const generateMainUnitBarcode = () => {
//     // Generate a random 5-digit barcode
//     const uniqueBarcode = Math.floor(10000 + Math.random() * 90000).toString();
//     setFormsData((prevState) => ({
//       ...prevState,
//       mainUnitBarcode: uniqueBarcode,
//     }));
//   };

//   const generateAlternativeUnitBarcode = () => {
//     const { name } = formsData;
//     if (!name) {
//       alert("Please enter an item name first.");
//       return;
//     }

//     // Generate an alphanumeric barcode based on the item name
//     const randomNumbers = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
//     const uniqueBarcode = ${name.slice(0, 4).toUpperCase()}${randomNumbers};

//     setFormsData((prevState) => ({
//       ...prevState,
//       alternativeUnitBarcode: uniqueBarcode,
//     }));
//   };

//   // Validation function to prevent negative numbers
//   const preventNegativeInput = (e) => {
//     const value = e.target.value;
//     if (value < 0) {
//       e.target.value = 0;
//     }
//   };

//   const openItemAddDialog = (itemName) => {
//     setFormsData((prevData) => ({
//       ...prevData,
//       name: itemName,
//       printname: itemName, // Set both fields to the entered value
//     }));
//     setIsItemAddDialogOpen(true); // Open the dialog
//   };

//   const handleAddItem = () => {
//     setFormData((prevState) => ({
//       ...prevState,
//       itemsList: [
//         ...prevState.itemsList,
//         { quantity: "", unit: { name: "" }, price: "", amount: "" },
//       ],
//     }));
//   };

//   const handleDeleteItem = (index) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       itemsList: prevState.itemsList.filter((_, i) => i !== index),
//     }));
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
//                           <h6 className="fw-bold text-center">
//                             Add Purchase Voucher
//                           </h6>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-xl-12">
//                       <Box component="form" onSubmit={handleSubmit}>
//                         <ToastContainer />
//                         <div className="row">
//                           <div className="col-xl-12">
//                             <div className="row p-1 ">
//                               <div
//                                 className="row"
//                                 style={{
//                                   border: "1px solid lightgray",
//                                   borderRadius: "5px",
//                                 }}
//                               >
//                                 <div className="row mt-2">
//                                   <div className="col-xl-3">
//                                     <TextField
//                                       fullWidth
//                                       size="small"
//                                       required
//                                       type="date"
//                                       label="Purchase Date"
//                                       name="purchaseDate"
//                                       value={formData.purchaseDate}
//                                       onChange={handleChange}
//                                       InputProps={{
//                                         style: {
//                                           fontSize: "0.875rem", // Reduce the font size
//                                         },
//                                       }}
//                                       InputLabelProps={{
//                                         shrink: true,
//                                         style: { fontSize: "0.875rem" }, // Reduce label font size
//                                       }}
//                                     />
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <Autocomplete
//                                         options={suppliers}
//                                         getOptionLabel={(option) =>
//                                           option.partyName
//                                         }
//                                         value={
//                                           formData.companyName
//                                             ? {
//                                                 partyName: formData.companyName,
//                                               }
//                                             : null
//                                         }
//                                         onChange={handleCompanyChange}
//                                         renderInput={(params) => (
//                                           <TextField
//                                             {...params}
//                                             label="Company Name"
//                                             size="small"
//                                             required
//                                             InputProps={{
//                                               ...params.InputProps,
//                                               sx: { fontSize: "0.875rem" }, // Adjust height and font size
//                                             }}
//                                             InputLabelProps={{
//                                               sx: { fontSize: "0.875rem" },
//                                             }} // Adjust label font size
//                                           />
//                                         )}
//                                       />
//                                     </FormControl>
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <FormControl fullWidth>
//                                       <TextField
//                                         value={formData.supplierName || ""}
//                                         label="Supplier Name"
//                                         size="small"
//                                         InputProps={{
//                                           style: {
//                                             fontSize: "0.875rem", // Reduce the font size
//                                           },
//                                         }}
//                                         InputLabelProps={{
//                                           style: { fontSize: "0.875rem" }, // Reduce label font size
//                                         }}
//                                       />
//                                     </FormControl>
//                                   </div>

//                                   <div className="col-xl-3">
//                                     <TextField
//                                       label="Purchase Voucher No"
//                                       name="purchaseVoucherNo"
//                                       value={formData.purchaseVoucherNo}
//                                       fullWidth
//                                       size="small"
//                                       InputProps={{
//                                         readOnly: true,
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
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       required
//                                       type="date"
//                                       label="Invoice Date"
//                                       name="invoiceDate"
//                                       value={formData.invoiceDate}
//                                       onChange={handleChange}
//                                       InputProps={{
//                                         style: {
//                                           fontSize: "0.875rem", // Reduce the font size
//                                         },
//                                       }}
//                                       InputLabelProps={{
//                                         shrink: true,
//                                         style: { fontSize: "0.875rem" }, // Reduce label font size
//                                       }}
//                                     />
//                                   </div>
//                                 </div>

//                                 <div className="row">
//                                   <div className="col-xl-12">
//                                     <span>
//                                       <FormControlLabel
//                                         control={
//                                           <Checkbox
//                                             checked={showTransportDetails}
//                                             onChange={handleCheckboxChange}
//                                           />
//                                         }
//                                         label="Add Transport Details"
//                                       />
//                                     </span>
//                                     {showTransportDetails && (
//                                       <TableContainer
//                                         component={Paper}
//                                         sx={{ maxHeight: 320 }}
//                                       >
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
//                                                   name="date"
//                                                   type="date"
//                                                   value={transportDetails.date}
//                                                   onChange={
//                                                     handleTransportDetailChange
//                                                   }
//                                                   size="small"
//                                                   variant="standard"
//                                                   readOnly
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
//                                                   name="builtNumber"
//                                                   type="number"
//                                                   value={
//                                                     transportDetails.builtNumber
//                                                   }
//                                                   onChange={
//                                                     handleTransportDetailChange
//                                                   }
//                                                   size="small"
//                                                   variant="standard"
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
//                                                   name="transporter"
//                                                   type="text"
//                                                   value={
//                                                     transportDetails.transporter
//                                                   }
//                                                   onChange={
//                                                     handleTransportDetailChange
//                                                   }
//                                                   size="small"
//                                                   variant="standard"
//                                                 />
//                                               </TableCell>

//                                               <TableCell
//                                                 sx={{
//                                                   padding: "0px",
//                                                 }}
//                                                 align="center"
//                                               >
//                                                 <TextField
//                                                   name="lotSize"
//                                                   type="number"
//                                                   value={
//                                                     transportDetails.lotSize
//                                                   }
//                                                   onChange={
//                                                     handleTransportDetailChange
//                                                   }
//                                                   size="small"
//                                                   variant="standard"
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
//                                                   name="lotOpen"
//                                                   type="number"
//                                                   value={
//                                                     transportDetails.lotOpen
//                                                   }
//                                                   onChange={
//                                                     handleTransportDetailChange
//                                                   }
//                                                   size="small"
//                                                   variant="standard"
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
//                                                   name="lotPending"
//                                                   type="number"
//                                                   value={
//                                                     transportDetails.lotPending
//                                                   }
//                                                   onChange={
//                                                     handleTransportDetailChange
//                                                   }
//                                                   size="small"
//                                                   variant="standard"
//                                                 />
//                                               </TableCell>
//                                             </TableRow>
//                                           </TableBody>
//                                         </Table>
//                                       </TableContainer>
//                                     )}
//                                   </div>
//                                   <div className="col-xl-6">
//                                     <TextField
//                                       fullWidth
//                                       margin="normal"
//                                       size="small"
//                                       label="serial number"
//                                       type="number"
//                                       value={serialNumber}
//                                       onChange={handleSerialNumberChange}
//                                       InputProps={{
//                                         style: {
//                                           fontSize: "0.875rem", // Reduce the font size
//                                         },
//                                       }}
//                                       InputLabelProps={{
//                                         shrink: true,
//                                         style: { fontSize: "0.875rem" }, // Reduce label font size
//                                       }}
//                                     />

//                                     <div className="row">
//                                       <div className="col-xl-6">
//                                         <Button
//                                           onClick={handleJumpToField}
//                                           variant="contained"
//                                           color="secondary"
//                                           size="small"
//                                         >
//                                           Jump to Field
//                                         </Button>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>

//                                 <div className="row">
//                                   <div className="col-xl-12 mt-2">
//                                     <TableContainer
//                                       component={Paper}
//                                       sx={{ maxHeight: 390 }} // Adjust the maxHeight as needed
//                                     >
//                                       <Table
//                                         stickyHeader
//                                         sx={{
//                                           border: "1px solid lightgray", // Adding a gray border to the entire table
//                                           borderCollapse: "collapse", // Ensuring borders are not doubled
//                                         }}
//                                       >
//                                         <TableHead
//                                           style={{ background: "#bbdefb" }}
//                                         >
//                                           <TableRow
//                                             sx={{
//                                               borderBottom:
//                                                 "1px solid lightgray",
//                                             }}
//                                           >
//                                             {[
//                                               "#",
//                                               "Item",
//                                               "Quantity",
//                                               "Unit",
//                                               "alternativeUnit", // Add this field
//                                               "Price(Rs.)",
//                                               "Amount(Rs.)",
//                                               "Actions",
//                                             ].map((header) => (
//                                               <TableCell
//                                                 key={header}
//                                                 sx={{
//                                                   background: "#bbdefb",
//                                                   fontWeight: "bold",
//                                                   position: "sticky",
//                                                   top: 0,
//                                                   zIndex: 5,
//                                                   padding: "1px", // Reduced padding
//                                                   fontSize: "13px", // Smaller font size
//                                                   textAlign: "center",
//                                                   borderRight:
//                                                     "1px solid lightgray", // Adding gray border between columns
//                                                 }}
//                                               >
//                                                 {header}
//                                               </TableCell>
//                                             ))}
//                                           </TableRow>
//                                         </TableHead>

//                                         <TableBody sx={{ background: "white" }}>
//                                           {formData.itemsList.map(
//                                             (item, index) => (
//                                               <TableRow
//                                                 key={index}
//                                                 sx={{
//                                                   height: "15px",
//                                                   borderBottom:
//                                                     "1px solid lightgray", // Adding a gray border between rows
//                                                 }}
//                                               >
//                                                 {/* Table cells with gray border applied */}

//                                                 <TableCell
//                                                   sx={{
//                                                     fontWeight: "bold",
//                                                     position: "sticky",
//                                                     top: 0,
//                                                     zIndex: 1,
//                                                     padding: "1px",
//                                                     fontSize: "13px",
//                                                     textAlign: "center",
//                                                     borderRight:
//                                                       "1px solid lightgray", // Adding gray border between columns
//                                                   }}
//                                                 >
//                                                   <span>{index + 1}</span>
//                                                 </TableCell>
//                                                 <TableCell
//                                                   sx={{
//                                                     padding: "0px",
//                                                     width: "250px",
//                                                     fontSize: "10px",
//                                                     borderRight:
//                                                       "1px solid lightgray", // Adding gray border between columns
//                                                   }}
//                                                 >
//                                                   <FormControl fullWidth>
//                                                     <Autocomplete
//                                                       options={items}
//                                                       getOptionLabel={(
//                                                         option
//                                                       ) => option.name}
//                                                       value={
//                                                         items.find(
//                                                           (i) =>
//                                                             i._id ===
//                                                             formData.itemsList[
//                                                               index
//                                                             ]?.item
//                                                         ) || null
//                                                       }
//                                                       onChange={(e, value) =>
//                                                         handleItemChangeWrapper(
//                                                           index,
//                                                           value
//                                                         )
//                                                       }
//                                                       onInputChange={(
//                                                         e,
//                                                         value,
//                                                         reason
//                                                       ) =>
//                                                         handleItemInputChange(
//                                                           e,
//                                                           value,
//                                                           reason,
//                                                           index
//                                                         )
//                                                       }
//                                                       renderInput={(params) => (
//                                                         <TextField
//                                                           {...params}
//                                                           size="small"
//                                                           label=""
//                                                           onKeyDown={(event) =>
//                                                             handleKeyDown(
//                                                               event,
//                                                               index,
//                                                               "autocomplete"
//                                                             )
//                                                           }
//                                                           inputRef={(ref) =>
//                                                             setItemNameRef(
//                                                               ref,
//                                                               index
//                                                             )
//                                                           }
//                                                           name={item-${index}}
//                                                           variant="standard"
//                                                           InputProps={{
//                                                             ...params.InputProps,
//                                                             disableUnderline: true,
//                                                           }}
//                                                           sx={{
//                                                             "& .MuiInputBase-input":
//                                                               {
//                                                                 height: "20px",