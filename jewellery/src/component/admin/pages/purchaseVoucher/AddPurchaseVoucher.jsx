//=========================================================================//

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { FormControl, InputLabel, Select, IconButton } from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Header from "../../../schema/Header";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Box, Dialog, Autocomplete } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import { DialogTitle, DialogContent, DialogActions } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import InputAdornment from "@mui/material/InputAdornment";
import CancelIcon from "@mui/icons-material/Cancel";
import PercentIcon from "@mui/icons-material/Percent";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Webcam from "react-webcam";
import PackagingDialog from "./PackagingDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import api from "../../../../services/api";
import Barcode from "react-barcode"; // Import the barcode library
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
    to="/purchase_voucher_list"
    className="text-decoration-none"
  >
    Purchase Voucher
  </Link>,

  <Typography key="3" color="text.secondary">
    Add Purchase Voucher
  </Typography>,
];
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

//--------------------------- add_purchase_voucher functions Start---------------------//

export default function AddPurchaseVoucher() {
  const [newItemName, setNewItemName] = useState("");
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [itemData, setItemData] = useState({});
  const [serialNumber, setSerialNumber] = useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [packagingData, setPackagingData] = useState({});
  const [formData, setFormData] = useState({
    itemsList: Array(12).fill({
      item: "",
      quantity: null,
      unit: "",
      alternativeunit: "",
      price: "",
      alternativeUnitQuantity: "", // New field
      alternativeUnitPrice: "", // New field
      amount: "",
      barcode: "",
    }),
    supplierName: "",
    companyName: "",
    purchaseDate: new Date().toISOString().split("T")[0],
    invoiceDate: new Date().toISOString().split("T")[0],
    purchaseVoucherNo: "",
    packingCharges: "",
    gstExpenses: "",
    otherExpenses: "",
    totalItemAmount: "",
    billSundryAmount: "",
    totalAmount: "",
  });

  const [additionalItem, setAdditionalItem] = useState({
    item: "",
    quantity: "",
    unit: "",
    alternativeunit: "",
    price: "",
    alternativeUnitQuantity: "", // New field
    alternativeUnitPrice: "", // New field
    amount: "",
    barcode: "",
  });
  const addRefsForNewField = (index) => {
    itemNameRefs.current[index] =
      itemNameRefs.current[index] || React.createRef();
    quantityRefs.current[index] =
      quantityRefs.current[index] || React.createRef();
    unitRefs.current[index] = unitRefs.current[index] || React.createRef();
    priceRefs.current[index] = priceRefs.current[index] || React.createRef();
    amountRefs.current[index] = amountRefs.current[index] || React.createRef();
    alternativeUnitQuantityRefs.current[index] =
      alternativeUnitQuantityRefs.current[index] || React.createRef();
    alternativeUnitPriceRefs.current[index] =
      alternativeUnitPriceRefs.current[index] || React.createRef();
  };

  useEffect(() => {
    calculateTotalAmount(formData);
  }, [formData.itemsList]); // Recalculate when itemsList changes

  const handleAddItemToList = () => {
    // Convert serial number to an integer
    let serialNumberInt = parseInt(serialNumber, 10);

    // If no serial number provided or invalid, default to 1
    if (isNaN(serialNumberInt) || serialNumberInt < 1) {
      serialNumberInt = 1;
    }

    // Calculate amount and alternative unit fields
    const calculatedAmount = (
      additionalItem.quantity * additionalItem.price
    ).toFixed(2);
    const alternativeUnitQuantity = (
      additionalItem.quantity * (additionalItem.conversionFactor || 1)
    ).toFixed(2);
    const alternativeUnitPrice = (
      additionalItem.price / (additionalItem.conversionFactor || 1)
    ).toFixed(2);

    // Create a new item object with updated calculations
    const newItem = {
      ...additionalItem,
      amount: calculatedAmount,
      alternativeUnitQuantity: alternativeUnitQuantity,
      alternativeUnitPrice: alternativeUnitPrice,
    };

    setFormData((prev) => {
      const updatedItemsList = [...prev.itemsList];

      // Find the index of the existing item
      const itemIndex = updatedItemsList.findIndex(
        (item) => item.item === newItem.item
      );

      if (itemIndex !== -1) {
        // Update existing item
        const existingItem = updatedItemsList[itemIndex];

        // Update values by incrementing existing values with new values
        updatedItemsList[itemIndex] = {
          ...existingItem,
          quantity: (
            parseFloat(existingItem.quantity) + parseFloat(newItem.quantity)
          ).toFixed(2),
          alternativeUnitQuantity: (
            parseFloat(existingItem.alternativeUnitQuantity) +
            parseFloat(newItem.alternativeUnitQuantity)
          ).toFixed(2),
          price: newItem.price, // Assuming you want to use the new price provided
          alternativeUnitPrice: newItem.alternativeUnitPrice, // Assuming you want to use the new alternative unit price
          amount: (
            parseFloat(existingItem.amount) + parseFloat(newItem.amount)
          ).toFixed(2),
        };
      } else {
        // Ensure we have enough fields
        if (serialNumberInt > updatedItemsList.length) {
          // Add empty fields for all serial numbers up to the new serial number
          for (let i = updatedItemsList.length; i < serialNumberInt; i++) {
            updatedItemsList.push({
              item: "",
              quantity: "",
              unit: "",
              alternativeunit: "",
              price: "",
              amount: "",
              barcode: "",
              alternativeUnitQuantity: "",
              alternativeUnitPrice: "",
              conversionFactor: 1, // Ensure conversionFactor is included
            });
          }
        }

        // Check if the serial number is already occupied
        if (updatedItemsList[serialNumberInt - 1].item !== "") {
          // If occupied, find the next available position
          let nextIndex = serialNumberInt;
          while (
            nextIndex <= updatedItemsList.length &&
            updatedItemsList[nextIndex - 1].item !== ""
          ) {
            nextIndex++;
          }
          // If nextIndex exceeds the current length, push a new empty item
          if (nextIndex > updatedItemsList.length) {
            updatedItemsList.push({
              item: "",
              quantity: "",
              unit: "",
              alternativeunit: "",
              price: "",
              amount: "",
              barcode: "",
              alternativeUnitQuantity: "",
              alternativeUnitPrice: "",
              conversionFactor: 1, // Ensure conversionFactor is included
            });
          }
          // Add the new item to the next available position
          updatedItemsList[nextIndex - 1] = newItem;
        } else {
          // If the serial number is not occupied, add the item at the specified index
          updatedItemsList[serialNumberInt - 1] = newItem;
        }
      }

      // Optionally clear the additional item state
      setAdditionalItem({
        item: "",
        quantity: "",
        unit: "",
        alternativeunit: "",
        price: "",
        amount: "",
        alternativeUnitQuantity: "",
        alternativeUnitPrice: "",
        conversionFactor: 1, // Ensure conversionFactor is reset
      });

      // Add refs for new fields if needed
      if (serialNumberInt > itemNameRefs.current.length) {
        for (let i = itemNameRefs.current.length; i < serialNumberInt; i++) {
          addRefsForNewField(i);
        }
      }

      const updatedFormData = {
        ...prev,
        itemsList: updatedItemsList,
      };

      // Recalculate total amount
      calculateTotalAmount(updatedFormData);

      return updatedFormData;
    });
  };

  //====================== SerialNumber ==========================//

  const handleItemChange = async (index, value) => {
    const selectedItem =
      itemData[value] ||
      (await fetchItemData(value, selectedSupplier?.customerType));

    const updatedItemsList = [...formData.itemsList];
    const conversionFactor = selectedItem.conversionFactor || 1;

    updatedItemsList[index] = {
      ...updatedItemsList[index],
      item: value,
      unit: selectedItem.unit || "",
      alternativeunit: selectedItem.alternativeunit || "",
      conversionFactor,
      alternativeUnitQuantity: updatedItemsList[index].quantity
        ? (updatedItemsList[index].quantity * conversionFactor).toFixed(2)
        : "",
    };

    setFormData({ ...formData, itemsList: updatedItemsList });
    calculateTotalAmount({ ...formData, itemsList: updatedItemsList });
  };

  useEffect(() => {
    // Fetch the next purchase voucher number when the component loads
    const fetchNextPurchaseVoucherNo = async () => {
      try {
        const response = await api.get("/api/get-next-purchase-voucher-no");
        const nextVoucherNo = response.data.nextVoucherNo;
        setFormData((prevData) => ({
          ...prevData,
          purchaseVoucherNo: nextVoucherNo,
        }));
      } catch (error) {
        console.error("Failed to fetch next purchase voucher number:", error);
      }
    };
    fetchNextPurchaseVoucherNo();
  }, []);
  const fetchNextPurchaseVoucherNo = async () => {
    try {
      const response = await api.get("/api/get-next-purchase-voucher-no");
      return response.data.nextVoucherNo;
    } catch (error) {
      console.error("Failed to fetch next purchase voucher number:", error);
      throw new Error("Error fetching next voucher number");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [suppliersResponse, itemsResponse] = await Promise.all([
          api.get("/api/suppliers"),
          api.get("/api/jewelry-items"),
        ]);
        const allSuppliers = suppliersResponse.data;
        // Map company names to their corresponding suppliers
        const companyData = allSuppliers.map((item) => ({
          name: item.companyName,
          supplierName: item.name,
        }));
        // Separate supplier data
        const supplierData = allSuppliers
          .filter((item) => item.name)
          .map((item) => ({
            name: item.name,
            companyName: item.companyName || "",
          }));
        setCompanies(companyData);
        setSuppliers(allSuppliers);
        setItems(itemsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle changes in the company (party) selection
  const handleCompanyChange = (event, newValue) => {
    if (newValue) {
      const selectedSupplier = suppliers.find(
        (supplier) => supplier.partyName === newValue.partyName
      );
      setFormData({
        ...formData,
        companyName: newValue.partyName,
        supplierName: selectedSupplier
          ? `${selectedSupplier.firstName} ${selectedSupplier.lastName}` // Concatenate first and last names
          : "",
      });
    } else {
      setFormData({ ...formData, companyName: "", supplierName: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter out items with empty fields
    const validItemsList = formData.itemsList.filter(
      (item) => item.item && item.quantity && item.price && item.amount
    );

    // Ensure valid itemsList only contains valid ObjectIds or nulls
    const processedItemsList = validItemsList.map((item, index) => ({
      item: item.item ? item.item.trim() : null, // Use null if item is empty
      quantity: item.quantity || 0,
      unit: item.unit || "",
      alternativeunit: item.alternativeunit || "",
      alternativeUnitQuantity: item.alternativeUnitQuantity || "",
      alternativeUnitPrice: item.alternativeUnitPrice || "",
      price: item.price || 0,
      amount: item.amount || 0,
    }));
    const formDataToSubmit = {
      ...formData,
      itemsList: processedItemsList,
      transportDetails, // Assuming transportDetails is already part of the formData
    };
    try {
      const submitResponse = await api.post("/api/purchases", formDataToSubmit);
      if (submitResponse.data.success) {
        console.log(formDataToSubmit);
        alert("Purchase added successfully!");
        console.log(formDataToSubmit);
        // Reset form data as described previously
        const nextVoucherNo = await fetchNextPurchaseVoucherNo();
        resetForm(nextVoucherNo);
      } else {
        throw new Error("Error adding purchase");
      }
    } catch (error) {
      console.error("Error adding purchase:", error);
      alert("Failed to add purchase: " + error.message);
    }
  };

  const resetForm = (nextVoucherNo) => {
    setFormData({
      supplierName: "",
      companyName: "",
      invoiceDate: new Date().toISOString().split("T")[0],
      purchaseDate: new Date().toISOString().split("T")[0],
      purchaseVoucherNo: nextVoucherNo,
      itemsList: Array(12).fill({
        item: "",
        quantity: "",
        unit: "",
        alternativeunit: "",
        price: "",
        alternativeUnitQuantity: "",
        alternativeUnitPrice: "",
        amount: "",
        barcode: "",
      }), // Ensure initialization with all fields
      packingCharges: "",
      gstExpenses: "",
      otherExpenses: "",
      totalAmount: "",
    });
    setTransportDetails({
      builtNumber: "",
      transporter: "",
      date: "",
      lotSize: "",
      lotOpen: "",
      lotPending: "",
    });
  };

  const calculateTotalAmount = (updatedFormData) => {
    const { itemsList, packingCharges, gstExpenses, otherExpenses } =
      updatedFormData;
    // Calculate total from items list
    const totalItemAmount = itemsList.reduce(
      (sum, item) => sum + parseFloat(item.amount || 0),
      0
    );
    // Parse additional expenses
    const packing = parseFloat(packingCharges) || 0;
    const gstPercentage = parseFloat(gstExpenses) || 0; // Assume gstExpenses is a percentage
    const other = parseFloat(otherExpenses) || 0;
    // Convert gst percentage to amount
    const gstAmount = (totalItemAmount * gstPercentage) / 100;
    // Calculate bill sundry amount
    const billSundryAmount = packing + gstAmount + other;
    // Calculate total amount including additional expenses
    const totalAmount = totalItemAmount + billSundryAmount;
    // Update form data with the new values
    setFormData((prevData) => ({
      ...prevData,
      totalItemAmount: totalItemAmount.toFixed(2),
      billSundryAmount: billSundryAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    }));
  };

  //============================Important========================//

  const handleItemFieldChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItemsList = [...formData.itemsList];
    const item = updatedItemsList[index];
    const conversionFactor = item.conversionFactor || 1;

    if (name === "quantity" || name === "alternativeUnitQuantity") {
      const validatedValue = Math.max(0, value);

      if (name === "quantity") {
        updatedItemsList[index] = {
          ...item,
          [name]: validatedValue,
          alternativeUnitQuantity: (validatedValue * conversionFactor).toFixed(
            2
          ),
        };
      } else if (name === "alternativeUnitQuantity") {
        updatedItemsList[index] = {
          ...item,
          [name]: validatedValue,
          quantity: (validatedValue / conversionFactor).toFixed(2),
        };
      }

      // Calculate amount if quantity and price are available
      const quantity = updatedItemsList[index].quantity || 0;
      const price = updatedItemsList[index].price || 0;
      updatedItemsList[index].amount = (quantity * price).toFixed(2);
    } else if (name === "price" || name === "alternativeUnitPrice") {
      const validatedValue = Math.max(0, value);

      if (name === "price") {
        // Update the price of the main unit and calculate the alternative unit price
        updatedItemsList[index] = {
          ...item,
          [name]: validatedValue,
          alternativeUnitPrice: (validatedValue / conversionFactor).toFixed(2),
        };
      } else if (name === "alternativeUnitPrice") {
        // Update the alternative unit price and calculate the main unit price
        updatedItemsList[index] = {
          ...item,
          [name]: validatedValue,
          price: (validatedValue * conversionFactor).toFixed(2),
        };
      }

      // Calculate amount if quantity and price are available
      const quantity = updatedItemsList[index].quantity || 0;
      const price = updatedItemsList[index].price || 0;
      updatedItemsList[index].amount = (quantity * price).toFixed(2);
    } else {
      // Handle other field changes
      updatedItemsList[index] = {
        ...item,
        [name]: value,
      };
    }

    setFormData((prevData) => ({
      ...prevData,
      itemsList: updatedItemsList,
    }));
  };

  const fetchItemData = async (itemId, customerType) => {
    try {
      const response = await api.get(`/api/jewelry-items/${itemId}`);
      const {
        retailerPrice,
        semiWholesellerPrice,
        wholesellerPrice,
        unit,
        alternativeunit,
        conversionFactor,
      } = response.data;

      const price =
        customerType === "Retailer"
          ? retailerPrice
          : customerType === "Semi Wholeseller"
          ? semiWholesellerPrice
          : wholesellerPrice;

      setItemData((prevData) => ({
        ...prevData,
        [itemId]: { price, unit, alternativeunit, conversionFactor },
      }));

      return { price, unit, alternativeunit, conversionFactor };
    } catch (error) {
      console.error("Error fetching item data:", error);
      return { price: 0, unit: "", alternativeunit: "", conversionFactor: 1 };
    }
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);
    // Recalculate total with the updated form data
    calculateTotalAmount(updatedFormData);
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
    // Convert to number for calculation, default to 0 if not a valid number
    if (name === "lotSize" || name === "lotOpen") {
      newValue = parseFloat(value) || 0;
    }
    setTransportDetails((prevDetails) => {
      const updatedDetails = {
        ...prevDetails,
        [name]: newValue,
      };
      // Calculate lot pending if lotSize and lotOpen are available
      if (
        updatedDetails.lotSize !== undefined &&
        updatedDetails.lotOpen !== undefined
      ) {
        updatedDetails.lotPending = (
          updatedDetails.lotSize - updatedDetails.lotOpen
        ).toFixed(2);
      }
      return updatedDetails;
    });
  };
  const handleCheckboxChange = (e) => {
    setShowTransportDetails(e.target.checked);
  };

  //---------------------Function For Add New Item In Dialog--------------------------//
  const [formsData, setFormsData] = useState({
    name: "",
    printname: "",
    itemType: "",
    mainUnitBarcode: "",
    alternativeUnitBarcode: "",
    group: "",
    category: "",
    unit: null,
    alternativeunit: "",
    conversionType: "",
    conversionFactor: "",
    quantity: "",
    saleprice: "",
    purchaseprice: "",
    MRP: "",
    retailerPrice: "",
    semiWholesellerPrice: "",
    wholesellerPrice: "",
    minSalePrice: "",
    gst: null,
    HSNCode: "",
    salediscount: "",
  });
  const navigate = useNavigate("");
  const [isItemAddDialogOpen, setIsItemAddDialogOpen] = useState(false);
  const [isAddSupplierDialogOpen, setIsAddSupplierDialogOpen] = useState(false);
  const handleItemAddDialogOpen = () => {
    setIsItemAddDialogOpen(true);
  };
  const handleItemAddDialogClose = () => {
    setIsItemAddDialogOpen(false);
  };
  const handleNewGroupChange = (e) => {
    setNewGroup(e.target.value);
  };
  const [nameError, setNameError] = useState("");
  const [groups, setGroups] = useState([]);
  const [units, setUnits] = useState([]);
  const [alternativeUnits, setAlternativeUnits] = useState([]);
  const [gsts, setGsts] = useState([]);
  const [newGroup, setNewGroup] = useState("");
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false);
  const [newGst, setNewGst] = useState("");
  const [newGstRate, setNewGstRate] = useState("");
  const [isGstDialogOpen, setIsGstDialogOpen] = useState(false);
  const [newUnit, setNewUnit] = useState("");
  const [isUnitDialogOpen, setIsUnitDialogOpen] = useState(false);
  const [newAlternativeUnit, setNewAlternativeUnit] = useState("");
  const [isAlternativeUnitDialogOpen, setIsAlternativeUnitDialogOpen] =
    useState(false);
  // Create refs for each TextField
  const itemNameRefs = useRef([]);
  const quantityRefs = useRef([]);
  const unitRefs = useRef([]);
  const priceRefs = useRef([]);
  const amountRefs = useRef([]);
  const alternativeUnitPriceRefs = useRef([]);
  const alternativeUnitQuantityRefs = useRef([]);
  // Initialize refs
  const setItemNameRef = (ref, index) => {
    itemNameRefs.current[index] = ref;
  };
  const setQuantityRef = (ref, index) => {
    quantityRefs.current[index] = ref;
  };
  const setUnitRef = (ref, index) => {
    unitRefs.current[index] = ref;
  };
  const setPriceRef = (ref, index) => {
    priceRefs.current[index] = ref;
  };
  const setAmountRef = (ref, index) => {
    amountRefs.current[index] = ref;
  };
  // Update the conversionType whenever the unit or alternative unit changes
  useEffect(() => {
    if (formsData.unit && formsData.alternativeunit) {
      setFormsData((prevState) => ({
        ...prevState,
        conversionType: `${formsData.alternativeunit} / ${formsData.unit}`,
      }));
    }
  }, [formsData.unit, formsData.alternativeunit]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          groupsResponse,
          unitsResponse,
          alternativeUnitsResponse,
          gstsResponse,
        ] = await Promise.all([
          api.get("/api/groups"),
          api.get("/api/units"),
          api.get("/api/alternative-units"),
          api.get("/api/gsts"),
        ]);
        setGroups(groupsResponse.data);
        setUnits(unitsResponse.data);
        setAlternativeUnits(alternativeUnitsResponse.data);
        setGsts(gstsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get("/api/jewelry-items");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get("/api/jewelry-items");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    const fetchSuppliers = async () => {
      try {
        const response = await api.get("/api/suppliers");
        setSuppliers(response.data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };
    const setCurrentDate = () => {
      const currentDate = new Date().toISOString().split("T")[0]; // Format as yyyy-mm-dd
      setFormData((prevData) => ({
        ...prevData,
        date: currentDate,
      }));
    };
    fetchItems();
    fetchSuppliers();
    setCurrentDate();
  }, []);
  const handleAddNewItem = async () => {
    try {
      const newItem = {
        name: newItemName,
        unit: "", // Add other required fields if necessary
      };
      const response = await api.post("/api/jewelry-items", newItem);
      if (response.data.success) {
        alert("Item added successfully!");
        // Fetch the updated list of items
        const itemsResponse = await api.get("/api/jewelry-items");
        setItems(itemsResponse.data);
        // Close the dialog and reset the new item name
        setNewItemName("");
        setIsItemAddDialogOpen(false);
      } else {
        throw new Error("Error adding item");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Error adding item.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleItemInputChange = (event, value, reason, index) => {
    if (reason === "input" && value.trim()) {
      // Set the typed name for the dialog and update the form data
      setNewItemName(value);
      setFormsData((prevData) => ({
        ...prevData,
        name: value,
        printName: value, // Assuming you want to set the print name the same as the typed name
      }));
    }
  };
  const handleChangeDialog = async (e) => {
    const { name, value } = e.target;
    console.log("Value before:", formsData);

    const upperCaseValue =
      name === "name" || name === "printname" ? value.toUpperCase() : value;

    let updatedFormData = {
      ...formsData,
      [name]: upperCaseValue,
    };

    if (name === "name") {
      updatedFormData.printname = upperCaseValue;

      const hindiText = await transliterateToHindi(upperCaseValue);
      updatedFormData.itemType = hindiText;
    }

    setFormsData(updatedFormData);
    console.log("Value after:", updatedFormData);
  };

  const handleItemChangeWrapper = (index, value) => {
    if (typeof value === "string") {
      // User typed a new value and pressed Enter
      setNewItemName(value);
      setFormsData((prevData) => ({
        ...prevData,
        name: value,
        printName: value,
      }));
      setIsItemAddDialogOpen(true); // Open the dialog
    } else if (value && value._id) {
      // User selected from the dropdown
      handleItemChange(index, value._id);
      // Move focus to the next field
      const nextFieldRef = quantityRefs.current[index];
      if (nextFieldRef) {
        nextFieldRef.focus();
      }
    }
  };
  const handleKeyDown = (event, index, type) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default Enter key action
      if (type === "autocomplete") {
        const value = event.target.value.trim();
        if (value) {
          // User pressed Enter while typing a new item name
          setNewItemName(value);
          setFormsData((prevData) => ({
            ...prevData,
            name: value,
            printName: value,
          }));
          setIsItemAddDialogOpen(true); // Open the dialog
        } else {
          // Move focus to the next field if selected from dropdown
          const nextFieldRef = quantityRefs.current[index];
          if (nextFieldRef) {
            nextFieldRef.focus();
          }
        }
      } else {
        // Handle cases where the dialog needs to be opened or the next field should be focused
        const nextFieldRef = (
          type === "quantity"
            ? unitRefs
            : type === "unit"
            ? priceRefs
            : amountRefs
        ).current[index];
        if (nextFieldRef) {
          nextFieldRef.focus(); // Focus on the next field
        }
      }
    }
  };
  const handleAddItem = () => {
    setFormData((prevState) => ({
      ...prevState,
      itemsList: [
        ...prevState.itemsList,
        { quantity: "", unit: { name: "" }, price: "", amount: "" },
      ],
    }));
  };
  const handleDeleteItem = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      itemsList: prevState.itemsList.filter((_, i) => i !== index),
    }));
  };
  const handleAddItemDialogClose = () => {
    setIsItemAddDialogOpen(false);
  };
  const handleGroupDialogOpen = () => {
    setIsGroupDialogOpen(true);
  };
  const handleGroupDialogClose = () => {
    setIsGroupDialogOpen(false);
  };
  const handleAddNewGroup = async () => {
    try {
      const response = await api.post("/api/group", {
        name: newGroup,
      });
      setGroups([...groups, response.data]);
      setNewGroup("");
      setIsGroupDialogOpen(false);
    } catch (error) {
      console.error("Error adding new group:", error);
    }
  };
  const handleUnitDialogOpen = () => {
    setIsUnitDialogOpen(true);
  };
  const handleUnitDialogClose = () => {
    setIsUnitDialogOpen(false);
  };
  const handleNewUnitChange = (e) => {
    setNewUnit(e.target.value);
  };
  const handleAddNewUnit = async () => {
    try {
      const response = await api.post("/api/units", {
        name: newUnit,
      });
      setUnits([...units, response.data]);
      setNewUnit("");
      setIsUnitDialogOpen(false);
    } catch (error) {
      console.error("Error adding new unit:", error);
    }
  };
  const handleAlternativeUnitDialogOpen = () => {
    setIsAlternativeUnitDialogOpen(true);
  };
  const handleAlternativeUnitDialogClose = () => {
    setIsAlternativeUnitDialogOpen(false);
  };
  const handleNewAlternativeUnitChange = (e) => {
    setNewAlternativeUnit(e.target.value);
  };
  const handleAddNewAlternativeUnit = async () => {
    try {
      const response = await api.post("/api/alternative-units", {
        name: newAlternativeUnit,
      });
      setAlternativeUnits([...alternativeUnits, response.data]);
      setNewAlternativeUnit("");
      setIsAlternativeUnitDialogOpen(false);
      toast.success("Alternative Unit Added successfully");
    } catch (error) {
      console.error("Error adding new alternative unit:", error);
    }
  };
  const handleGstDialogOpen = () => {
    setIsGstDialogOpen(true);
  };
  const handleGstDialogClose = () => {
    setIsGstDialogOpen(false);
  };
  const handleNewGstChange = (e) => {
    setNewGst(e.target.value);
  };
  const handleNewGstRateChange = (e) => {
    setNewGstRate(e.target.value);
  };
  const handleAddNewGst = async () => {
    try {
      const response = await api.post("/api/gsts", {
        name: newGst,
        rate: newGstRate,
      });
      setGsts([...gsts, response.data]);
      setNewGst("");
      setNewGstRate("");
      setIsGstDialogOpen(false);
    } catch (error) {
      console.error("Error adding new GST:", error);
    }
  };
  const handleSubmitDialog = async (e) => {
    e.preventDefault();
    // Validate form data
    if (!formsData.name.trim()) {
      setNameError("Name is required");
      return;
    } else {
      setNameError("");
    }
    const selectedGroup = groups.find(
      (group) => group.name === formsData.group
    );
    // Prepare form data for submission
    const formsDataToSubmit = new FormData();
    for (const key in formsData) {
      if (key === "group") {
        formsDataToSubmit.append("group", selectedGroup?._id);
      } else if (key === "gst") {
        formsDataToSubmit.append("gst", formsData.gst._id);
      } else {
        formsDataToSubmit.append(key, formsData[key]);
      }
    }
    try {
      const response = await api.post("/api/jewelry-items", formsDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Jewelry item added successfully!");
      // Update items state and reset form
      setItems((prevItems) => [...prevItems, response.data]);
      setFormsData({
        name: "",
        printname: "",
        itemType: "",
        group: "",
        category: "",
        unit: "",
        alternativeunit: "",
        conversionType: "",
        conversionFactor: "",
        packagingunit: "",
        quantity: "",
        retailerPrice: "",
        semiWholesellerPrice: "",
        wholesellerPrice: "",
        minSalePrice: "",
        saleprice: "",
        purchaseprice: "",
        MRP: "",
        gst: null,
        HSNCode: "",
        salediscount: "",
      });
    } catch (error) {
      console.error(
        "Error saving jewelry item:",
        error.response ? error.response.data : error.message
      );
      alert(
        `Error saving jewelry item: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };
  const generateMainUnitBarcode = () => {
    // Generate a random 5-digit barcode
    const uniqueBarcode = Math.floor(10000 + Math.random() * 90000).toString();
    setFormsData((prevState) => ({
      ...prevState,
      mainUnitBarcode: uniqueBarcode,
    }));
  };
  const generateAlternativeUnitBarcode = () => {
    const { name } = formsData;
    if (!name) {
      alert("Please enter an item name first.");
      return;
    }
    // Generate an alphanumeric barcode based on the item name
    const randomNumbers = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    const uniqueBarcode = `${name.slice(0, 4).toUpperCase()}${randomNumbers}`;
    setFormsData((prevState) => ({
      ...prevState,
      alternativeUnitBarcode: uniqueBarcode,
    }));
  };
  // Validation function to prevent negative numbers
  const preventNegativeInput = (e) => {
    const value = e.target.value;
    if (value < 0) {
      e.target.value = 0;
    }
  };
  const openItemAddDialog = (itemName) => {
    setFormsData((prevData) => ({
      ...prevData,
      name: itemName,
      printname: itemName, // Set both fields to the entered value
    }));
    setIsItemAddDialogOpen(true); // Open the dialog
  };
  const [showWebcam, setShowWebcam] = useState(false);
  const [photo, setPhoto] = useState(null);
  const webcamRef = useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
  }, [webcamRef]);
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          // Inside your return statement or render method
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
                          <h6 className="fw-bold text-center">
                            Add Purchase Voucher
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <Box component="form" onSubmit={handleSubmit}>
                        <ToastContainer />
                        <div className="row">
                          <div className="col-xl-12">
                            <div className="row">
                              <div className="col-xl-12">
                                <div>
                                  {/* Button to open camera */}
                                  <Button
                                    onClick={() => setShowWebcam(!showWebcam)}
                                    variant="contained"
                                    color="primary"
                                  >
                                    {showWebcam
                                      ? "Close Camera"
                                      : "Open Camera"}
                                  </Button>
                                  {/* Webcam component */}
                                  {showWebcam && (
                                    <div>
                                      <Webcam
                                        audio={false}
                                        ref={webcamRef}
                                        screenshotFormat="image/jpeg"
                                      />
                                      <Button
                                        onClick={capture}
                                        variant="contained"
                                        color="primary"
                                      >
                                        Capture photo
                                      </Button>
                                    </div>
                                  )}
                                  {/* Display captured photo */}
                                  {photo && (
                                    <div>
                                      <h2>Captured Photo:</h2>
                                      <img src={photo} alt="Captured" />
                                    </div>
                                  )}
                                  {/* Your existing component code */}
                                </div>
                              </div>
                            </div>
                            <div className="row p-1 ">
                              <div
                                className="row"
                                style={{
                                  border: "1px solid lightgray",
                                  borderRadius: "5px",
                                }}
                              >
                                <div className="row mt-2">
                                  <div className="col-xl-3">
                                    <TextField
                                      fullWidth
                                      size="small"
                                      required
                                      type="date"
                                      label="Purchase Date"
                                      name="purchaseDate"
                                      value={formData.purchaseDate}
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
                                    />
                                  </div>

                                  <div className="col-xl-3">
                                    <FormControl fullWidth>
                                      <Autocomplete
                                        options={suppliers}
                                        getOptionLabel={(option) =>
                                          option.partyName
                                        }
                                        value={
                                          formData.companyName
                                            ? {
                                                partyName: formData.companyName,
                                              }
                                            : null
                                        }
                                        onChange={handleCompanyChange}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            label="Company Name"
                                            size="small"
                                            required
                                            InputProps={{
                                              ...params.InputProps,
                                              sx: { fontSize: "0.875rem" }, // Adjust height and font size
                                            }}
                                            InputLabelProps={{
                                              sx: { fontSize: "0.875rem" },
                                            }} // Adjust label font size
                                          />
                                        )}
                                      />
                                    </FormControl>
                                  </div>

                                  <div className="col-xl-3">
                                    <FormControl fullWidth>
                                      <TextField
                                        value={formData.supplierName || ""}
                                        label="Supplier Name"
                                        size="small"
                                        InputProps={{
                                          style: {
                                            fontSize: "0.875rem", // Reduce the font size
                                          },
                                        }}
                                        InputLabelProps={{
                                          style: { fontSize: "0.875rem" }, // Reduce label font size
                                        }}
                                      />
                                    </FormControl>
                                  </div>

                                  <div className="col-xl-3">
                                    <TextField
                                      label="Purchase Voucher No"
                                      name="purchaseVoucherNo"
                                      value={formData.purchaseVoucherNo}
                                      fullWidth
                                      size="small"
                                      InputProps={{
                                        readOnly: true,
                                        style: {
                                          fontSize: "0.875rem", // Reduce the font size
                                        },
                                      }}
                                      InputLabelProps={{
                                        style: { fontSize: "0.875rem" }, // Reduce label font size
                                      }}
                                    />
                                  </div>

                                  <div className="col-xl-3">
                                    <TextField
                                      fullWidth
                                      margin="normal"
                                      size="small"
                                      required
                                      type="date"
                                      label="Invoice Date"
                                      name="invoiceDate"
                                      value={formData.invoiceDate}
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
                                    />
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-xl-12">
                                    <span>
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            checked={showTransportDetails}
                                            onChange={handleCheckboxChange}
                                          />
                                        }
                                        label="Add Transport Details"
                                      />
                                    </span>
                                    {showTransportDetails && (
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
                                                  name="date"
                                                  type="date"
                                                  value={transportDetails.date}
                                                  onChange={
                                                    handleTransportDetailChange
                                                  }
                                                  size="small"
                                                  variant="standard"
                                                  readOnly
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
                                                  border: "1px solid lightgray",
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
                                                  border: "1px solid lightgray",
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
                                                  border: "1px solid lightgray",
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

                                {/* Add new filds in tables According to serial Number  */}

                                <div className="row">
                                  <div className="col-xl-12">
                                    <Typography variant="h6">
                                      Add New Item
                                    </Typography>
                                  </div>
                                  <div className="col-xl-12">
                                    <TableContainer
                                      component={Paper}
                                      sx={{ maxHeight: 390 }}
                                    >
                                      <Table
                                        stickyHeader
                                        sx={{
                                          border: "1px solid lightgray",
                                          borderCollapse: "collapse",
                                        }}
                                      >
                                        <TableHead
                                          style={{ background: "#bbdefb" }}
                                        >
                                          <TableRow
                                            sx={{
                                              borderBottom:
                                                "1px solid lightgray",
                                            }}
                                          >
                                            <TableCell
                                              align="center"
                                              sx={{
                                                border: "1px solid lightgray",
                                                padding: "4px",
                                                background: "#bbdefb",
                                              }}
                                              className="p-0 fw-bold fixed"
                                            >
                                              S.No
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
                                              Item
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
                                              M quantity
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
                                              Unit
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
                                              Alt Unit
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
                                              Alt quantity
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
                                              Main Price
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
                                              Alt Price
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
                                              Amount
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
                                                type="number"
                                                size="small"
                                                value={serialNumber}
                                                onChange={(e) =>
                                                  setSerialNumber(
                                                    e.target.value
                                                  )
                                                }
                                                variant="standard"
                                              />
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                border: "1px solid lightgray",
                                                padding: "0px",
                                              }}
                                              align="center"
                                            >
                                              <Autocomplete
                                                options={items} // Assuming items contain a list of item objects
                                                getOptionLabel={(option) =>
                                                  option.name
                                                } // Adjust based on your item structure
                                                onChange={(e, value) => {
                                                  setAdditionalItem((prev) => ({
                                                    ...prev,
                                                    item: value
                                                      ? value._id
                                                      : "", // Assuming _id is the identifier
                                                  }));
                                                  fetchItemData(
                                                    value._id,
                                                    selectedSupplier?.customerType
                                                  ).then((itemData) => {
                                                    setAdditionalItem(
                                                      (prev) => ({
                                                        ...prev,
                                                        unit: itemData.unit,
                                                        alternativeunit:
                                                          itemData.alternativeunit,
                                                        conversionFactor:
                                                          itemData.conversionFactor ||
                                                          1, // Add conversionFactor
                                                      })
                                                    );
                                                  });
                                                }}
                                                renderInput={(params) => (
                                                  <TextField
                                                    {...params}
                                                    variant="standard"
                                                    size="small"
                                                  />
                                                )}
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
                                                value={additionalItem.quantity}
                                                onChange={(e) => {
                                                  const quantity =
                                                    e.target.value;
                                                  const amount = (
                                                    quantity *
                                                    additionalItem.price
                                                  ).toFixed(2);
                                                  const alternativeUnitQuantity =
                                                    (
                                                      quantity *
                                                      (additionalItem.conversionFactor ||
                                                        1)
                                                    ).toFixed(2);
                                                  setAdditionalItem((prev) => ({
                                                    ...prev,
                                                    quantity: quantity,
                                                    amount: amount,
                                                    alternativeUnitQuantity:
                                                      alternativeUnitQuantity,
                                                  }));
                                                }}
                                              />
                                            </TableCell>

                                            <TableCell
                                              sx={{
                                                padding: "0px",
                                              }}
                                              align="center"
                                            >
                                              <TextField
                                                size="small"
                                                variant="standard"
                                                value={additionalItem.unit.name}
                                                onChange={(e) =>
                                                  setAdditionalItem({
                                                    ...additionalItem,
                                                    unit: e.target.value,
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
                                                value={
                                                  additionalItem.alternativeunit
                                                }
                                                onChange={(e) =>
                                                  setAdditionalItem({
                                                    ...additionalItem,
                                                    alternativeunit:
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
                                                type="number"
                                                size="small"
                                                variant="standard"
                                                value={
                                                  additionalItem.alternativeUnitQuantity
                                                }
                                                onChange={(e) => {
                                                  const alternativeUnitQuantity =
                                                    e.target.value;
                                                  const quantity = (
                                                    alternativeUnitQuantity /
                                                    (additionalItem.conversionFactor ||
                                                      1)
                                                  ).toFixed(2);
                                                  const alternativeUnitPrice = (
                                                    additionalItem.price /
                                                    (additionalItem.conversionFactor ||
                                                      1)
                                                  ).toFixed(2);
                                                  setAdditionalItem((prev) => ({
                                                    ...prev,
                                                    alternativeUnitQuantity:
                                                      alternativeUnitQuantity,
                                                    quantity: quantity,
                                                    alternativeUnitPrice:
                                                      alternativeUnitPrice,
                                                  }));
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
                                                value={additionalItem.price}
                                                onChange={(e) => {
                                                  const price = e.target.value;
                                                  const amount = (
                                                    additionalItem.quantity *
                                                    price
                                                  ).toFixed(2);
                                                  const alternativeUnitPrice = (
                                                    price /
                                                    (additionalItem.conversionFactor ||
                                                      1)
                                                  ).toFixed(2);
                                                  setAdditionalItem((prev) => ({
                                                    ...prev,
                                                    price: price,
                                                    amount: amount,
                                                    alternativeUnitPrice:
                                                      alternativeUnitPrice,
                                                  }));
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
                                                value={
                                                  additionalItem.alternativeUnitPrice
                                                }
                                                onChange={(e) => {
                                                  const alternativeUnitPrice =
                                                    e.target.value;
                                                  const price = (
                                                    alternativeUnitPrice *
                                                    (additionalItem.conversionFactor ||
                                                      1)
                                                  ).toFixed(2);
                                                  const amount = (
                                                    additionalItem.quantity *
                                                    price
                                                  ).toFixed(2);
                                                  setAdditionalItem((prev) => ({
                                                    ...prev,
                                                    alternativeUnitPrice:
                                                      alternativeUnitPrice,
                                                    price: price,
                                                    amount: amount,
                                                  }));
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
                                                value={additionalItem.amount}
                                                onChange={(e) =>
                                                  setAdditionalItem({
                                                    ...additionalItem,
                                                    amount: e.target.value,
                                                  })
                                                }
                                              />
                                            </TableCell>
                                          </TableRow>
                                        </TableBody>
                                      </Table>
                                      <Button onClick={handleAddItemToList}>
                                        Add Item
                                      </Button>
                                    </TableContainer>
                                  </div>
                                </div>

                                {/* 
                                <div className="row">
                                  <div className="col-xl-12">
                                    <Typography variant="h5" gutterBottom>
                                      Add New Item
                                    </Typography>
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "1rem",
                                        marginBottom: "1rem",
                                      }}
                                    >
                                      <TextField
                                        label="S No"
                                        type="number"
                                        margin="normal"
                                        size="small"
                                        fullWidth
                                        value={serialNumber}
                                        onChange={(e) =>
                                          setSerialNumber(e.target.value)
                                        }
                                      />
                                      <Autocomplete
                                        options={items} // Assuming items contain a list of item objects
                                        getOptionLabel={(option) => option.name} // Adjust based on your item structure
                                        onChange={(e, value) => {
                                          setAdditionalItem((prev) => ({
                                            ...prev,
                                            item: value ? value._id : "", // Assuming _id is the identifier
                                          }));
                                          fetchItemData(
                                            value._id,
                                            selectedSupplier?.customerType
                                          ).then((itemData) => {
                                            setAdditionalItem((prev) => ({
                                              ...prev,
                                              unit: itemData.unit,
                                              alternativeunit:
                                                itemData.alternativeunit,
                                              conversionFactor:
                                                itemData.conversionFactor || 1, // Add conversionFactor
                                            }));
                                          });
                                        }}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            fullWidth
                                            label="Item"
                                            variant="outlined"
                                            margin="normal"
                                            size="small"
                                          />
                                        )}
                                      />

                                      <TextField
                                        label="M Qyt"
                                        type="number"
                                        margin="normal"
                                        size="small"
                                        fullWidth
                                        value={additionalItem.quantity}
                                        onChange={(e) => {
                                          const quantity = e.target.value;
                                          const amount = (
                                            quantity * additionalItem.price
                                          ).toFixed(2);
                                          const alternativeUnitQuantity = (
                                            quantity *
                                            (additionalItem.conversionFactor ||
                                              1)
                                          ).toFixed(2);
                                          setAdditionalItem((prev) => ({
                                            ...prev,
                                            quantity: quantity,
                                            amount: amount,
                                            alternativeUnitQuantity:
                                              alternativeUnitQuantity,
                                          }));
                                        }}
                                      />

                                      <TextField
                                        margin="normal"
                                        size="small"
                                        label="Unit"
                                        fullWidth
                                        value={additionalItem.unit.name}
                                        onChange={(e) =>
                                          setAdditionalItem({
                                            ...additionalItem,
                                            unit: e.target.value,
                                          })
                                        }
                                      />
                                      <TextField
                                        label="Alt Unit"
                                        margin="normal"
                                        size="small"
                                        fullWidth
                                        value={additionalItem.alternativeunit}
                                        onChange={(e) =>
                                          setAdditionalItem({
                                            ...additionalItem,
                                            alternativeunit: e.target.value,
                                          })
                                        }
                                      />

                                      <TextField
                                        label="Alt Qyt"
                                        type="number"
                                        margin="normal"
                                        size="small"
                                        fullWidth
                                        value={
                                          additionalItem.alternativeUnitQuantity
                                        }
                                        onChange={(e) => {
                                          const alternativeUnitQuantity =
                                            e.target.value;
                                          const quantity = (
                                            alternativeUnitQuantity /
                                            (additionalItem.conversionFactor ||
                                              1)
                                          ).toFixed(2);
                                          const alternativeUnitPrice = (
                                            additionalItem.price /
                                            (additionalItem.conversionFactor ||
                                              1)
                                          ).toFixed(2);
                                          setAdditionalItem((prev) => ({
                                            ...prev,
                                            alternativeUnitQuantity:
                                              alternativeUnitQuantity,
                                            quantity: quantity,
                                            alternativeUnitPrice:
                                              alternativeUnitPrice,
                                          }));
                                        }}
                                      />

                                      <TextField
                                        label="M Price"
                                        type="number"
                                        margin="normal"
                                        size="small"
                                        fullWidth
                                        value={additionalItem.price}
                                        onChange={(e) => {
                                          const price = e.target.value;
                                          const amount = (
                                            additionalItem.quantity * price
                                          ).toFixed(2);
                                          const alternativeUnitPrice = (
                                            price /
                                            (additionalItem.conversionFactor ||
                                              1)
                                          ).toFixed(2);
                                          setAdditionalItem((prev) => ({
                                            ...prev,
                                            price: price,
                                            amount: amount,
                                            alternativeUnitPrice:
                                              alternativeUnitPrice,
                                          }));
                                        }}
                                      />

                                      <TextField
                                        label="Alt Price"
                                        type="number"
                                        margin="normal"
                                        size="small"
                                        fullWidth
                                        value={
                                          additionalItem.alternativeUnitPrice
                                        }
                                        onChange={(e) => {
                                          const alternativeUnitPrice =
                                            e.target.value;
                                          const price = (
                                            alternativeUnitPrice *
                                            (additionalItem.conversionFactor ||
                                              1)
                                          ).toFixed(2);
                                          const amount = (
                                            additionalItem.quantity * price
                                          ).toFixed(2);
                                          setAdditionalItem((prev) => ({
                                            ...prev,
                                            alternativeUnitPrice:
                                              alternativeUnitPrice,
                                            price: price,
                                            amount: amount,
                                          }));
                                        }}
                                      />

                                      <TextField
                                        label="Amount"
                                        type="number"
                                        margin="normal"
                                        size="small"
                                        fullWidth
                                        value={additionalItem.amount}
                                        onChange={(e) =>
                                          setAdditionalItem({
                                            ...additionalItem,
                                            amount: e.target.value,
                                          })
                                        }
                                      />

                                      <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleAddItemToList}
                                      >
                                        Add Item
                                      </Button>
                                    </div>
                                  </div>
                                </div> */}

                                <div className="row">
                                  <div className="col-xl-12 mt-2">
                                    <TableContainer
                                      component={Paper}
                                      sx={{ maxHeight: 390 }}
                                    >
                                      <Table
                                        stickyHeader
                                        sx={{
                                          border: "1px solid lightgray",
                                          borderCollapse: "collapse",
                                        }}
                                      >
                                        <TableHead
                                          style={{ background: "#bbdefb" }}
                                        >
                                          <TableRow
                                            sx={{
                                              borderBottom:
                                                "1px solid lightgray",
                                            }}
                                          >
                                            {[
                                              "#",
                                              "Item",
                                              " M Quantity",
                                              " M Unit",
                                              "Alt Unit",
                                              "Alt Quantity",
                                              " M Price(Rs.)",
                                              "Alt Price(Rs.)",
                                              "Amount(Rs.)",
                                              "Actions",
                                            ].map((header) => (
                                              <TableCell
                                                key={header}
                                                sx={{
                                                  background: "#bbdefb",
                                                  fontWeight: "bold",
                                                  position: "sticky",
                                                  top: 0,
                                                  zIndex: 5,
                                                  padding: "1px", // Reduced padding
                                                  fontSize: "13px", // Smaller font size
                                                  textAlign: "center",
                                                  borderRight:
                                                    "1px solid lightgray", // Adding gray border between columns
                                                }}
                                              >
                                                {header}
                                              </TableCell>
                                            ))}
                                          </TableRow>
                                        </TableHead>

                                        <TableBody sx={{ background: "white" }}>
                                          {formData.itemsList.map(
                                            (item, index) => (
                                              <TableRow
                                                key={index}
                                                sx={{
                                                  height: "15px",
                                                  borderBottom:
                                                    "1px solid lightgray", // Adding a gray border between rows
                                                }}
                                              >
                                                {/* Table cells with gray border applied */}

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
                                                      "1px solid lightgray", // Adding gray border between columns
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
                                                      "1px solid lightgray", // Adding gray border between columns
                                                  }}
                                                >
                                                  <FormControl fullWidth>
                                                    <Autocomplete
                                                      options={items}
                                                      getOptionLabel={(
                                                        option
                                                      ) => option.name}
                                                      value={
                                                        items.find(
                                                          (i) =>
                                                            i._id ===
                                                            formData.itemsList[
                                                              index
                                                            ]?.item
                                                        ) || null
                                                      }
                                                      onChange={(e, value) =>
                                                        handleItemChangeWrapper(
                                                          index,
                                                          value
                                                        )
                                                      }
                                                      onInputChange={(
                                                        e,
                                                        value,
                                                        reason
                                                      ) =>
                                                        handleItemInputChange(
                                                          e,
                                                          value,
                                                          reason,
                                                          index
                                                        )
                                                      }
                                                      renderInput={(params) => (
                                                        <TextField
                                                          {...params}
                                                          size="small"
                                                          label=""
                                                          onKeyDown={(event) =>
                                                            handleKeyDown(
                                                              event,
                                                              index,
                                                              "autocomplete"
                                                            )
                                                          }
                                                          inputRef={(ref) =>
                                                            setItemNameRef(
                                                              ref,
                                                              index
                                                            )
                                                          }
                                                          name={`item-${index}`}
                                                          variant="standard"
                                                          InputProps={{
                                                            ...params.InputProps,
                                                            disableUnderline: true,
                                                          }}
                                                          sx={{
                                                            "& .MuiInputBase-input":
                                                              {
                                                                height: "20px",
                                                                fontSize:
                                                                  "13px",
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
                                                      "1px solid lightgray", // Adding gray border between columns
                                                  }}
                                                >
                                                  <TextField
                                                    name="quantity"
                                                    type="number"
                                                    value={item.quantity || ""}
                                                    fullWidth
                                                    onChange={(e) =>
                                                      handleItemFieldChange(
                                                        index,
                                                        e
                                                      )
                                                    }
                                                    inputRef={(ref) =>
                                                      setQuantityRef(ref, index)
                                                    }
                                                    size="small"
                                                    variant="standard"
                                                    InputProps={{
                                                      disableUnderline: true,
                                                    }}
                                                    onKeyDown={(e) =>
                                                      handleKeyDown(
                                                        e,
                                                        index,
                                                        "quantity"
                                                      )
                                                    }
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
                                                    marginTop: "5px",
                                                    padding: "1px",
                                                    fontSize: "10px",
                                                    textAlign: "center",
                                                    width: "170px",
                                                    borderRight:
                                                      "1px solid lightgray", // Adding gray border between columns
                                                  }}
                                                  align="center"
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
                                                    onKeyDown={(e) =>
                                                      handleKeyDown(
                                                        e,
                                                        index,
                                                        "unit"
                                                      )
                                                    }
                                                    inputRef={(ref) =>
                                                      setUnitRef(ref, index)
                                                    }
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
                                                    marginTop: "5px",
                                                    padding: "1px",
                                                    fontSize: "10px",
                                                    textAlign: "center",
                                                    width: "170px",
                                                    borderRight:
                                                      "1px solid lightgray", // Adding gray border between columns
                                                  }}
                                                  align="center"
                                                >
                                                  <TextField
                                                    name="alternativeunit"
                                                    value={item.alternativeunit}
                                                    InputProps={{
                                                      readOnly: true,
                                                      disableUnderline: true,
                                                    }}
                                                    size="small"
                                                    variant="standard"
                                                    onKeyDown={(e) =>
                                                      handleKeyDown(
                                                        e,
                                                        index,
                                                        "alternativeunit"
                                                      )
                                                    }
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
                                                    marginTop: "5px",
                                                    padding: "1px",
                                                    fontSize: "10px",
                                                    textAlign: "center",
                                                    width: "170px",
                                                    borderRight:
                                                      "1px solid lightgray", // Adding gray border between columns
                                                  }}
                                                  align="center"
                                                >
                                                  <TextField
                                                    type="number"
                                                    fullWidth
                                                    onChange={(e) =>
                                                      handleItemFieldChange(
                                                        index,
                                                        e
                                                      )
                                                    }
                                                    name="alternativeUnitQuantity"
                                                    value={
                                                      item.alternativeUnitQuantity ||
                                                      ""
                                                    }
                                                    InputProps={{
                                                      disableUnderline: true,
                                                    }}
                                                    size="small"
                                                    variant="standard"
                                                    onKeyDown={(e) =>
                                                      handleKeyDown(
                                                        e,
                                                        index,
                                                        "alternativeUnitQuantity"
                                                      )
                                                    }
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
                                                    marginTop: "5px",
                                                    padding: "1px",
                                                    fontSize: "10px",
                                                    textAlign: "center",
                                                    width: "150px",
                                                    borderRight:
                                                      "1px solid lightgray", // Adding gray border between columns
                                                  }}
                                                >
                                                  <TextField
                                                    name="price"
                                                    type="number"
                                                    value={item.price || ""}
                                                    onChange={(e) =>
                                                      handleItemFieldChange(
                                                        index,
                                                        e
                                                      )
                                                    }
                                                    inputRef={(ref) =>
                                                      setPriceRef(ref, index)
                                                    }
                                                    size="small"
                                                    variant="standard"
                                                    InputProps={{
                                                      disableUnderline: true,
                                                    }}
                                                    onKeyDown={(e) =>
                                                      handleKeyDown(
                                                        e,
                                                        index,
                                                        "price"
                                                      )
                                                    }
                                                    sx={{
                                                      "& .MuiInputBase-input": {
                                                        height: "20px", // Reduced height
                                                        textAlign: "center",
                                                      },
                                                    }}
                                                  />
                                                </TableCell>

                                                <TableCell
                                                  sx={{
                                                    fontWeight: "bold",
                                                    position: "sticky",
                                                    marginTop: "5px",
                                                    padding: "1px",
                                                    fontSize: "10px",
                                                    textAlign: "center",
                                                    width: "150px",
                                                    borderRight:
                                                      "1px solid lightgray", // Adding gray border between columns
                                                  }}
                                                >
                                                  <TextField
                                                    name="alternativeUnitPrice"
                                                    type="number"
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
                                                    size="small"
                                                    variant="standard"
                                                    InputProps={{
                                                      disableUnderline: true,
                                                    }}
                                                    onKeyDown={(e) =>
                                                      handleKeyDown(
                                                        e,
                                                        index,
                                                        "alternativeUnitPrice"
                                                      )
                                                    }
                                                    sx={{
                                                      "& .MuiInputBase-input": {
                                                        height: "20px", // Reduced height
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
                                                      "1px solid lightgray", // Adding gray border between columns
                                                  }}
                                                  align="center"
                                                >
                                                  <TextField
                                                    name="amount"
                                                    type="number"
                                                    value={item.amount || ""}
                                                    InputProps={{
                                                      readOnly: true,
                                                      disableUnderline: true,
                                                    }}
                                                    size="small"
                                                    variant="standard"
                                                    inputRef={(ref) =>
                                                      setAmountRef(ref, index)
                                                    }
                                                    onKeyDown={(e) => {
                                                      handleKeyDown(
                                                        e,
                                                        index,
                                                        "amount"
                                                      );
                                                      if (e.key === "Enter") {
                                                        handleAddItem(); // Trigger the add item function

                                                        // Move focus to the item field in the next row if it exists
                                                        if (
                                                          index + 1 <
                                                          formData.itemsList
                                                            .length
                                                        ) {
                                                          const nextItemField =
                                                            document.querySelector(
                                                              `input[name='item-${
                                                                index + 1
                                                              }']`
                                                            );
                                                          if (nextItemField) {
                                                            nextItemField.focus();
                                                          }
                                                        }
                                                      }
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
                                                  }}
                                                  align="center"
                                                >
                                                  <Button
                                                    onClick={() =>
                                                      handleDeleteItem(index)
                                                    }
                                                    color="error"
                                                  >
                                                    <CancelIcon fontSize="small" />
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
                                        Item Amount:
                                        <span>
                                          <CurrencyRupeeIcon
                                            style={{ fontSize: "18px" }}
                                          />
                                        </span>
                                        <span className="fw-bold">
                                          {formData.totalItemAmount}
                                        </span>
                                      </span>
                                    </h5>
                                  </div>
                                  {/* Bill sundry Start */}

                                  <div className="row mt-1 d justify-content-end">
                                    <div className="col-xl-6">
                                      <TableContainer
                                        component={Paper}
                                        sx={{ maxHeight: 320 }}
                                      >
                                        <Table>
                                          <TableHead>
                                            <TableRow>
                                              <TableCell
                                                sx={{
                                                  border: "1px solid lightgray",
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
                                                  border: "1px solid lightgray",
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
                                                  border: "1px solid lightgray",
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
                                                  border: "1px solid lightgray",
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
                                                  onChange={handleFieldChange}
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
                                                  border: "1px solid lightgray",
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
                                                  onChange={handleFieldChange}
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
                                                  border: "1px solid lightgray",
                                                  padding: "0px",
                                                }}
                                                align="center"
                                              >
                                                <TextField
                                                  name="otherExpenses"
                                                  type="number"
                                                  value={
                                                    formData.otherExpenses || ""
                                                  }
                                                  onChange={handleFieldChange}
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
                                          {formData.billSundryAmount}
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
                                          {formData.totalAmount}
                                        </span>
                                      </h5>
                                    </div>
                                  </div>

                                  {/* Bill sundry End */}

                                  <div className="row mb-2">
                                    <div className="col-xl-12">
                                      <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className="fw-bold"
                                        size="small"
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
                      </Box>

                      <Dialog
                        open={isItemAddDialogOpen}
                        onClose={handleAddItemDialogClose}
                        maxWidth="md"
                        fullWidth
                      >
                        <DialogTitle className="text-center fw-bold">
                          Add New Item
                        </DialogTitle>
                        <DialogContent>
                          <Box component="form" onSubmit={handleSubmitDialog}>
                            <div className="row">
                              <div className="row mt-2 mb-0">
                                <div className="col-xl-12">
                                  <h6
                                    className="fw-bold"
                                    style={{
                                      color: "rgb(1, 87, 155",
                                    }}
                                  >
                                    Item Name
                                  </h6>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-xl-6">
                                  <TextField
                                    autoFocus
                                    id="name"
                                    label="Item Name"
                                    name="name"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    value={formsData.name} // Use formsData.name here
                                    onChange={handleChange}
                                    error={!!nameError}
                                    helperText={nameError}
                                    InputProps={{
                                      style: {
                                        fontSize: "0.875rem",
                                      },
                                    }}
                                    InputLabelProps={{
                                      style: { fontSize: "0.875rem" },
                                    }}
                                  />
                                </div>

                                <div className="col-xl-6">
                                  <TextField
                                    id="printName"
                                    label="Print Name"
                                    name="printName"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    value={formsData.printName} // Use formsData.printName here
                                    onChange={handleChange}
                                    InputProps={{
                                      style: {
                                        fontSize: "0.875rem",
                                      },
                                    }}
                                    InputLabelProps={{
                                      style: { fontSize: "0.875rem" },
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-xl-4">
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    sx={{ fontSize: "0.875rem" }}
                                  >
                                    <FormControl
                                      fullWidth
                                      sx={{ minWidth: 120 }}
                                    >
                                      <Autocomplete
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            label="Item Hindi Name"
                                            margin="normal"
                                            size="small"
                                            sx={{ fontSize: "0.875rem" }}
                                            InputProps={{
                                              ...params.InputProps,
                                              sx: { fontSize: "0.875rem" }, // Adjust height and font size
                                            }}
                                            InputLabelProps={{
                                              sx: { fontSize: "0.875rem" },
                                            }} // Adjust label font size
                                          />
                                        )}
                                      />
                                    </FormControl>

                                    <Tooltip
                                      title=" Add itemType"
                                      placement="top-start"
                                    >
                                      <IconButton
                                        // onClick={handleItemTypeDialogOpen}
                                        sx={{ ml: 1 }}
                                        style={{
                                          background: "#ffe0b2",
                                          width: "30px",
                                          height: "30px",
                                        }}
                                        className="mt-2"
                                      >
                                        <AddIcon />
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                </div>

                                <div className="col-xl-4">
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    sx={{ fontSize: "0.875rem" }}
                                  >
                                    <FormControl
                                      fullWidth
                                      sx={{ minWidth: 120 }}
                                    >
                                      <Autocomplete
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            label="Department"
                                            margin="normal"
                                            size="small"
                                            sx={{ fontSize: "0.875rem" }}
                                            InputProps={{
                                              ...params.InputProps,
                                              sx: { fontSize: "0.875rem" }, // Adjust height and font size
                                            }}
                                            InputLabelProps={{
                                              sx: { fontSize: "0.875rem" },
                                            }} // Adjust label font size
                                          />
                                        )}
                                      />
                                    </FormControl>

                                    <Tooltip
                                      title="Add Department"
                                      placement="top-start"
                                    >
                                      <IconButton
                                        // onClick={handleGroupDialogOpen}
                                        sx={{ ml: 1 }}
                                        style={{
                                          background: "#ffe0b2",
                                          width: "30px",
                                          height: "30px",
                                        }}
                                        className="mt-2"
                                      >
                                        <AddIcon />
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                </div>
                              </div>

                              <div className="row mt-1">
                                <div className="col-xl-12">
                                  <h6
                                    className="fw-bold"
                                    style={{
                                      color: "rgb(1, 87, 155",
                                    }}
                                  >
                                    Unit
                                  </h6>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-xl-4">
                                  <TextField
                                    label="Conversion Factor"
                                    name="conversionFactor"
                                    type="number"
                                    value={formsData.conversionFactor}
                                    onInput={preventNegativeInput}
                                    onChange={handleChangeDialog}
                                    size="small"
                                    fullWidth
                                    InputProps={{
                                      style: {
                                        fontSize: "0.875rem",
                                      },
                                    }}
                                    InputLabelProps={{
                                      style: { fontSize: "0.875rem" },
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-xl-4">
                                  <Box display="flex" alignItems="center">
                                    <FormControl fullWidth>
                                      <Autocomplete
                                        options={units.map((unit) => unit.name)}
                                        value={formsData.unit}
                                        onChange={(e, newValue) => {
                                          const selectedUnit = units.find(
                                            (unit) => unit.name === newValue
                                          );
                                          setFormsData((prevState) => ({
                                            ...prevState,
                                            unit: newValue,
                                            unitId: selectedUnit?._id,
                                          }));
                                        }}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            label="Unit"
                                            fullWidth
                                            size="small"
                                            margin="normal"
                                            InputProps={{
                                              ...params.InputProps,
                                              sx: { fontSize: "0.875rem" }, // Adjust height and font size
                                            }}
                                            InputLabelProps={{
                                              sx: { fontSize: "0.875rem" },
                                            }} // Adjust label font size
                                          />
                                        )}
                                      />
                                    </FormControl>

                                    <Tooltip
                                      title="Add Unit"
                                      placement="top-start"
                                    >
                                      <IconButton
                                        onClick={handleUnitDialogOpen}
                                        sx={{ ml: 1 }}
                                        style={{
                                          background: "#ffe0b2",
                                          width: "30px",
                                          height: "30px",
                                        }}
                                        className="mt-2"
                                      >
                                        <AddIcon />
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                </div>
                                <div className="col-xl-4">
                                  <Box display="flex" alignItems="center">
                                    <FormControl fullWidth margin="normal">
                                      <Autocomplete
                                        options={alternativeUnits.map(
                                          (altUnit) => altUnit.name
                                        )}
                                        value={formsData.alternativeunit}
                                        onChange={(event, newValue) => {
                                          setFormsData({
                                            ...formsData,
                                            alternativeunit: newValue,
                                          });
                                        }}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            label="Alternative Unit"
                                            size="small"
                                            InputProps={{
                                              ...params.InputProps,
                                              sx: { fontSize: "0.875rem" }, // Adjust height and font size
                                            }}
                                            InputLabelProps={{
                                              sx: { fontSize: "0.875rem" },
                                            }}
                                          />
                                        )}
                                      />
                                    </FormControl>

                                    <Tooltip
                                      title="Add Alternative Unit"
                                      placement="top-start"
                                    >
                                      <IconButton
                                        onClick={
                                          handleAlternativeUnitDialogOpen
                                        }
                                        sx={{ ml: 1 }}
                                        style={{
                                          background: "#ffe0b2",
                                          width: "30px",
                                          height: "30px",
                                        }}
                                        className="mt-2"
                                      >
                                        <AddIcon />
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                </div>
                                <div className="col-xl-4">
                                  <TextField
                                    label="Conversion Type"
                                    value={formsData.conversionType}
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    InputProps={{
                                      readOnly: true,
                                      style: {
                                        fontSize: "0.875rem",
                                      },
                                    }}
                                    InputLabelProps={{
                                      shrink: true,
                                      style: { fontSize: "0.875rem" },
                                    }}
                                  />
                                </div>

                                <div className="col-xl-12 mt-2 mb-3">
                                  <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="flex-start"
                                    border={1}
                                    borderColor="grey.400"
                                    borderRadius={1}
                                    padding={1}
                                    width="100%"
                                    height={40}
                                    bgcolor="background.paper"
                                    InputProps={{
                                      style: {
                                        fontSize: "0.875rem",
                                      },
                                    }}
                                    InputLabelProps={{
                                      shrink: true,
                                      style: { fontSize: "0.875rem" },
                                    }}
                                  ></Box>
                                  {/* )} */}
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-xl-6">
                                  <TextField
                                    label="Main Unit Barcode"
                                    name="mainUnitBarcode"
                                    value={formsData.mainUnitBarcode}
                                    fullWidth
                                    size="small"
                                    disabled
                                    InputProps={{
                                      style: {
                                        fontSize: "0.875rem",
                                      },
                                    }}
                                    InputLabelProps={{
                                      style: { fontSize: "0.875rem" },
                                    }}
                                  />
                                </div>

                                <div className="col-xl-6">
                                  <TextField
                                    label="Alternative Unit Barcode"
                                    name="alternativeUnitBarcode"
                                    value={formsData.alternativeUnitBarcode}
                                    fullWidth
                                    size="small"
                                    disabled
                                    InputProps={{
                                      style: {
                                        fontSize: "0.875rem",
                                      },
                                    }}
                                    InputLabelProps={{
                                      style: { fontSize: "0.875rem" },
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="row mt-2 mb-0">
                                <div className="col-xl-12">
                                  <h6
                                    className="fw-bold"
                                    style={{ color: "rgb(1, 87, 155" }}
                                  >
                                    Pricing ALT Unit{" "}
                                  </h6>
                                  {/* )} */}
                                </div>

                                <div className="row ">
                                  <div className="col-xl-3">
                                    <TextField
                                      label="B Price"
                                      name="semiWholesellerPrice"
                                      fullWidth
                                      type="number"
                                      size="small"
                                      required
                                      InputProps={{
                                        style: { fontSize: "0.875rem" },
                                      }}
                                      InputLabelProps={{
                                        shrink: true,
                                        style: { fontSize: "0.875rem" },
                                      }}
                                    />
                                    {/* )} */}
                                  </div>
                                  <div className="col-xl-3">
                                    <TextField
                                      label="A Price"
                                      name="wholesellerPrice"
                                      fullWidth
                                      type="number"
                                      size="small"
                                      required
                                      InputProps={{
                                        style: { fontSize: "0.875rem" },
                                      }}
                                      InputLabelProps={{
                                        shrink: true,
                                        style: { fontSize: "0.875rem" },
                                      }}
                                    />
                                    {/* )} */}
                                  </div>
                                  <div className="col-xl-3">
                                    <TextField
                                      label="R Price"
                                      name="retailerPrice"
                                      fullWidth
                                      type="number"
                                      size="small"
                                      required
                                      InputProps={{
                                        style: { fontSize: "0.875rem" },
                                      }}
                                      InputLabelProps={{
                                        shrink: true,
                                        style: { fontSize: "0.875rem" },
                                      }}
                                    />
                                    {/* )} */}
                                  </div>
                                </div>

                                <div className="row">
                                  <FormControlLabel
                                    control={<Checkbox color="primary" />}
                                    label="Same Price in A Price"
                                    style={{
                                      fontSize: "0.875rem",
                                      marginTop: "0.3rem",
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="row mt-2 mb-0">
                                <div className="col-xl-12">
                                  <h6
                                    className="fw-bold"
                                    style={{ color: "rgb(1, 87, 155)" }}
                                  >
                                    Pricing Main Unit{" "}
                                  </h6>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-xl-3">
                                    <TextField
                                      label="B Price"
                                      name="alternativeSemiWholesellerPrice"
                                      fullWidth
                                      type="number"
                                      size="small"
                                      required
                                      InputProps={{
                                        style: { fontSize: "0.875rem" },
                                      }}
                                      InputLabelProps={{
                                        shrink: true,
                                        style: { fontSize: "0.875rem" },
                                      }}
                                    />
                                  </div>

                                  <div className="col-xl-3">
                                    <TextField
                                      label="A Price"
                                      name="alternativeWholesellerPrice"
                                      fullWidth
                                      type="number"
                                      size="small"
                                      required
                                      InputProps={{
                                        style: { fontSize: "0.875rem" },
                                      }}
                                      InputLabelProps={{
                                        shrink: true,
                                        style: { fontSize: "0.875rem" },
                                      }}
                                    />
                                  </div>

                                  <div className="col-xl-3">
                                    <TextField
                                      label="R Price"
                                      name="alternativeRetailerPrice"
                                      fullWidth
                                      type="number"
                                      size="small"
                                      required
                                      InputProps={{
                                        style: { fontSize: "0.875rem" },
                                      }}
                                      InputLabelProps={{
                                        shrink: true,
                                        style: { fontSize: "0.875rem" },
                                      }}
                                    />
                                  </div>
                                  <div className="col-xl-3">
                                    <TextField
                                      label="Min Sale Price"
                                      name="minSalePrice"
                                      fullWidth
                                      type="number"
                                      size="small"
                                      required
                                      InputProps={{
                                        style: {
                                          fontSize: "0.875rem",
                                        },
                                      }}
                                      InputLabelProps={{
                                        shrink: true,
                                        style: { fontSize: "0.875rem" },
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div>
                                <div className="col-xl-3">
                                  <FormControlLabel
                                    control={<Checkbox color="primary" />}
                                    label="Add Opening Stock"
                                  />
                                </div>

                                <div className="row">
                                  <div className="col-xl-3">
                                    <TextField
                                      label="Opening Stock"
                                      name="openingStock"
                                      fullWidth
                                      size="small"
                                      type="number"
                                      required
                                      InputProps={{
                                        style: {
                                          fontSize: "0.875rem",
                                        },
                                      }}
                                      InputLabelProps={{
                                        style: { fontSize: "0.875rem" },
                                      }}
                                    />
                                  </div>

                                  <div className="col-xl-3">
                                    {formData.conversionFactor !== "1" && (
                                      <TextField
                                        label="Alt Unit Opening Stock"
                                        name="altOpeningStock"
                                        fullWidth
                                        size="small"
                                        type="number"
                                        required
                                        InputProps={{
                                          style: {
                                            fontSize: "0.875rem",
                                          },
                                        }}
                                        InputLabelProps={{
                                          style: { fontSize: "0.875rem" },
                                        }}
                                      />
                                    )}
                                  </div>
                                </div>
                                {/* )} */}
                              </div>

                              <div className="col-xl-3">
                                <Box display="flex" alignItems="center">
                                  <FormControl fullWidth>
                                    <Autocomplete
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="GST"
                                          name="gst"
                                          size="small"
                                          margin="normal"
                                          InputProps={{
                                            ...params.InputProps,
                                            sx: { fontSize: "0.875rem" }, // Adjust height and font size
                                          }}
                                          InputLabelProps={{
                                            sx: { fontSize: "0.875rem" },
                                          }} // Adjust label font size
                                        />
                                      )}
                                    />
                                  </FormControl>

                                  <Tooltip
                                    title="Add GST"
                                    placement="top-start"
                                  >
                                    <IconButton
                                      sx={{ ml: 1 }}
                                      style={{
                                        background: "#ffe0b2",
                                        width: "30px",
                                        height: "30px",
                                      }}
                                      className="mt-2"
                                    >
                                      <AddIcon />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </div>

                              <div className="col-xl-3">
                                <TextField
                                  label="HSN Code"
                                  name="HSNCode"
                                  type="number"
                                  margin="normal"
                                  fullWidth
                                  size="small"
                                  InputProps={{
                                    style: {
                                      fontSize: "0.875rem",
                                    },
                                  }}
                                  InputLabelProps={{
                                    style: { fontSize: "0.875rem" },
                                  }}
                                />
                              </div>

                              <div className="row d-flex justify-content-end">
                                <div className="col-xl-6 d-flex">
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    className=" fw-bold me-2"
                                  >
                                    Add Item
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="error"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    className=" fw-bold"
                                    onClick={handleItemAddDialogClose}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Box>
                        </DialogContent>
                      </Dialog>
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
