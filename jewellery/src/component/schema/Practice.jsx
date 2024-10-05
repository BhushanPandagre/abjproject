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
import Header from "../../../schema/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Dialog, Autocomplete } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import { DialogTitle, DialogContent, DialogActions } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

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

export default function AddPurchaseVoucher() {
  ///////////////////// add_purchase_voucher functions Start //////////////

  const [newItemName, setNewItemName] = useState("");
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [itemData, setItemData] = useState({});

  const [formData, setFormData] = useState({
    supplierName: "",
    companyName: "",
    purchaseDate: new Date().toISOString().split("T")[0],
    invoiceDate: new Date().toISOString().split("T")[0],
    supplierVoucherNo: "",
    purchaseVoucherNo: "",
    itemsList: [{ item: "", quantity: "", unit: "", price: "", amount: "" }],
    packingCharges: "",
    gstExpenses: "",
    otherExpenses: "",
    totalAmount: "",
  });

  

  const handleSupplierChange = (e, value) => {
    setFormData({ ...formData, supplierName: value ? value.name : "" });
    setSelectedSupplier(value);
  };




  useEffect(() => {
    // Fetch the next purchase voucher number when the component loads
    const fetchNextPurchaseVoucherNo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/get-next-purchase-voucher-no"
        );
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

  const handleVoucherNoChange = (event) => {
    const { value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      supplierVoucherNo: value, // Manually set the supplier voucher number
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting form data:", formData);

      // Ensure formData is properly initialized
      if (!formData || !formData.purchaseVoucherNo) {
        throw new Error("Form data or purchaseVoucherNo is missing");
      }

      const submitResponse = await axios.post(
        "http://localhost:5000/api/purchases",
        formData
      );

      if (submitResponse.data.success) {
        alert("Purchase added successfully!");
        // Fetch the next voucher number after successful submission
        const response = await axios.get(
          "http://localhost:5000/api/get-next-purchase-voucher-no"
        );
        const nextVoucherNo = response.data.nextVoucherNo;

        setFormData({
          supplierName: "",
          companyName: "",
          invoiceDate: new Date().toISOString().split("T")[0],
          purchaseDate: new Date().toISOString().split("T")[0],
          supplierVoucherNo: "",
          purchaseVoucherNo: nextVoucherNo,
          itemsList: [
            { item: "", quantity: "", unit: "", price: "", amount: "" },
          ],
          packingCharges: "",
          gstExpenses: "",
          otherExpenses: "",
          totalAmount: "",
        });
      } else {
        throw new Error("Error adding purchase");
      }
    } catch (error) {
      console.error(
        "Error adding purchase:",
        error.response?.data || error.message
      );
      alert(
        "Failed to add purchase: " +
          (error.response?.data?.message || error.message)
      );
    }
  };


  const handleItemFieldChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItemsList = [...formData.itemsList];

    // Ensure quantity and price are not less than 0
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
    }

    setFormData({ ...formData, itemsList: updatedItemsList });
    calculateTotalAmount(updatedItemsList);
  };

  const calculateTotalAmount = (updatedFormData) => {
    const { itemsList, packingCharges, gstExpenses, otherExpenses } =
      updatedFormData;

    // Calculate total from items list
    const itemsTotal = itemsList.reduce(
      (sum, item) => sum + parseFloat(item.amount || 0),
      0
    );

    // Parse additional expenses
    const packing = parseFloat(packingCharges) || 0;
    const gst = parseFloat(gstExpenses) || 0;
    const other = parseFloat(otherExpenses) || 0;

    // Calculate total amount including additional expenses
    const totalAmount = itemsTotal + packing + gst + other;

    // Update form data with the new total amount
    setFormData((prevData) => ({
      ...prevData,
      totalAmount: totalAmount.toFixed(2), // Ensure it's formatted as a string with two decimal places
    }));
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    // Update form data
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);

    // Recalculate total with the updated form data
    calculateTotalAmount(updatedFormData);
  };


  const handleItemChange = async (index, value) => {
    if (!selectedSupplier) {
      alert("Please select a supplier first");
      return;
    }

    const customerType = selectedSupplier.customerType;
    const selectedItem =
      itemData[value] || (await fetchItemData(value, customerType));
    const updatedItemsList = [...formData.itemsList];
    updatedItemsList[index] = {
      ...updatedItemsList[index],
      item: value,
      price: selectedItem.price,
      unit: selectedItem.unit, // Set the main unit
    };
    setFormData({ ...formData, itemsList: updatedItemsList });
    calculateTotalAmount(updatedItemsList);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accountsResponse, itemsResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/accounts"),
          axios.get("http://localhost:5000/api/jewelry-items"),
        ]);

        const allAccounts = accountsResponse.data;

        // Extract company and supplier data
        const companyData = allAccounts
          .filter((item) => item.companyName)
          .map((item) => ({
            name: item.companyName,
            supplierName: item.name, // Use 'name' field for supplierName
          }));

        const supplierData = allAccounts
          .filter((item) => item.name)
          .map((item) => ({
            name: item.name,
            companyName: item.companyName || "",
          }));

        setCompanies(companyData);
        setSuppliers(supplierData);
        setItems(itemsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCompanyChange = (event, value) => {
    if (value) {
      setFormData((prevData) => ({
        ...prevData,
        companyName: value.name,
        supplierName: value.supplierName || "",
      }));
      setSelectedSupplier(
        suppliers.find((supplier) => supplier.name === value.supplierName) ||
          null
      );
    } else {
      setFormData((prevData) => ({
        ...prevData,
        companyName: "",
        supplierName: "",
      }));
      setSelectedSupplier(null);
    }
  };

  ///////////////////// Function For Add New Item In Dialog //////////////

  const [formsData, setFormsData] = useState({
    name: "",
    printname: "",
    barcode: "",
    group: "",
    category: "",
    description: "",
    unit: null,
    alternativeunit: "",
    conversionFactor: "",
    packagingunit: "",
    quantity: "",
    saleprice: "",
    purchaseprice: "",
    MRP: "",
    retailerPrice: "",
    semiWholesellerPrice: "",
    wholesellerPrice: "",
    gst: null,
    HSNCode: "",
    salediscount: "",
    images: [],
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

    const [isTransportDetailDialogOpen, setIsTransportDetailDialogOpen] =
    useState(false);



    const handleTransportDetailDialogOpen = () => {
      setIsTransportDetailDialogOpen(true);
    };
  
    const handleTransportDetailDialogClose = () => {
      setIsTransportDetailDialogOpen(false);
    };



  const handleChangeDialog = (e) => {
    const { name, value } = e.target;
    setFormsData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          groupsResponse,
          unitsResponse,
          alternativeUnitsResponse,
          gstsResponse,
        ] = await Promise.all([
          axios.get("http://localhost:5000/api/groups"),
          axios.get("http://localhost:5000/api/units"),
          axios.get("http://localhost:5000/api/alternative-units"),
          axios.get("http://localhost:5000/api/gsts"),
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
        const response = await axios.get(
          "http://localhost:5000/api/jewelry-items"
        );
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
        const response = await axios.get(
          "http://localhost:5000/api/jewelry-items"
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/accounts");
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

      const response = await axios.post(
        "http://localhost:5000/api/jewelry-items",
        newItem
      );

      if (response.data.success) {
        alert("Item added successfully!");

        // Fetch the updated list of items
        const itemsResponse = await axios.get(
          "http://localhost:5000/api/jewelry-items"
        );
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

  const fetchItemData = async (itemId, customerType) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/jewelry-items/${itemId}`
      );
      const { retailerPrice, semiWholesellerPrice, wholesellerPrice, unit } =
        response.data;

      const price =
        customerType === "Retailer"
          ? retailerPrice
          : customerType === "Semi Wholeseller"
          ? semiWholesellerPrice
          : wholesellerPrice;

      setItemData((prevData) => ({ ...prevData, [itemId]: { price, unit } }));
      return { price, unit };
    } catch (error) {
      console.error("Error fetching item data:", error);
      return { price: 0, unit: "" };
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleItemInputChange = (event, value, reason, index) => {
    if (reason === "input" && value.trim()) {
      if (event.nativeEvent.inputType === "insertParagraph") {
        // Enter key pressed
        setNewItemName(value); // Set the typed name for dialog
        setIsItemAddDialogOpen(true); // Open the dialog
      }
    }
  };

  const handleItemChangeWrapper = (index, value) => {
    if (typeof value === "string") {
      // User typed a new value
      setNewItemName(value); // Set the typed name in the dialog
      setIsItemAddDialogOpen(true); // Open the dialog
    } else {
      // User selected from the dropdown
      handleItemChange(index, value?._id);
    }
  };

  // const handleItemFieldChange = (index, e) => {
  //   const { name, value } = e.target;
  //   const updatedItemsList = [...formData.itemsList];

  //   // Ensure quantity and price are not less than 0
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

  const validateVoucherNo = (voucherNo) => {
    // Check for uniqueness or other validation criteria
    return voucherNo && voucherNo.trim().length > 0; // Example validation
  };

  // const handleVoucherNoChange = (event) => {
  //   const { value } = event.target;

  //   if (validateVoucherNo(value)) {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       voucherNo: value,
  //     }));
  //   }
  // };

  // const calculateTotalAmount = (itemsList) => {
  //   const totalAmount = itemsList.reduce(
  //     (sum, item) => sum + parseFloat(item.amount || 0),
  //     0
  //   );
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     totalAmount: totalAmount.toFixed(2),
  //   }));
  // };

  const handleAddItemDialogClose = () => {
    setIsItemAddDialogOpen(false);
  };

  const handleKeyDown = (event, value) => {
    if (
      event.key === "Enter" &&
      !items.some((item) => item.name.toLowerCase() === value.toLowerCase())
    ) {
      event.preventDefault(); // Prevent default Enter key action
      setNewItemName(value);
      setIsItemAddDialogOpen(true);
    }
  };

  const handleGroupDialogOpen = () => {
    setIsGroupDialogOpen(true);
  };
  const handleGroupDialogClose = () => {
    setIsGroupDialogOpen(false);
  };

  const handleAddNewGroup = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/group", {
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
      const response = await axios.post("http://localhost:5000/api/units", {
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
      const response = await axios.post(
        "http://localhost:5000/api/alternative-units",
        { name: newAlternativeUnit }
      );
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
      const response = await axios.post("http://localhost:5000/api/gsts", {
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormsData((prevState) => ({
      ...prevState,
      images: files,
    }));
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
      if (key === "images") {
        formsData[key].forEach((file) => {
          formsDataToSubmit.append("images", file);
        });
      } else if (key === "group") {
        formsDataToSubmit.append("group", selectedGroup?._id);
      } else if (key === "gst") {
        formsDataToSubmit.append("gst", formsData.gst._id);
      } else {
        formsDataToSubmit.append(key, formsData[key]);
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/jewelry-items",
        formsDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Jewelry item added successfully!");

      // Update items state and reset form
      setItems((prevItems) => [...prevItems, response.data]);
      setFormsData({
        name: "",
        printname: "",
        group: "",
        category: "",
        description: "",
        unit: "",
        alternativeunit: "",
        conversionFactor: "",
        packagingunit: "",
        quantity: "",
        retailerPrice: "",
        semiWholesellerPrice: "",
        wholesellerPrice: "",
        saleprice: "",
        purchaseprice: "",
        MRP: "",
        gst: null,
        HSNCode: "",
        salediscount: "",
        images: [],
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

  const generateBarcode = () => {
    // Generate a random 5-digit barcode
    const uniqueBarcode = Math.floor(10000 + Math.random() * 90000).toString();
    setFormsData((prevState) => ({
      ...prevState,
      barcode: uniqueBarcode,
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

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <Header />

              <Box component="main">
                <DrawerHeader />

                {/* <div className="container-fluid"> */}
                <div className="row mt-0">
                  <div className="col-xl-12">
                    <Box component="form" >
                      <ToastContainer />
                      <div className="row">
                        <div className="col-xl-12 ">
                          <div className="row">
                            <div
                              className="row mx-start d-flex "
                              // style={{
                              //   border: "1px solid lightgray",
                              //   borderRadius: "5px",
                              // }}
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
                                    Purchase Information
                                  </span>
                                </h4>
                              </div>

                              <div className="row">
                                <div className="col-xl-3 d-flex">
                                  <FormControl fullWidth>
                                    <Autocomplete
                                      options={companies}
                                      getOptionLabel={(option) => option.name}
                                      value={
                                        formData.companyName
                                          ? { name: formData.companyName }
                                          : null
                                      }
                                      onChange={handleCompanyChange}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Company Name"
                                          margin="normal"
                                          size="small"
                                          required
                                          style={{ background: "#e3f2fd" }}
                                        />
                                      )}
                                    />
                                  </FormControl>
                                </div>

                                <div className="col-xl-3 d-flex">
                                  <FormControl fullWidth>
                                    <TextField
                                      value={formData.supplierName || ""}
                                      label="Supplier Name"
                                      margin="normal"
                                      size="small"
                                      required
                                      InputProps={{
                                        readOnly: true,
                                      }}
                                      style={{ background: "#e3f2fd" }}
                                    />
                                  </FormControl>
                                </div>

                                {/* <div className="col-xl-3">
                                  <TextField
                                    label="Voucher Number"
                                    name="voucherNo"
                                    value={formData.voucherNo}
                                    onChange={handleVoucherNoChange}
                                    required
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                  />
                                </div> */}


                                
<div className="col-xl-3">
                                  <TextField
                                    label="Supplier Voucher No"
                                    name="supplierVoucherNo"
                                    value={formData.supplierVoucherNo}
                                    onChange={handleVoucherNoChange}
                                    required
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                  />
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="Purchase Voucher No"
                                    name="purchaseVoucherNo"
                                    value={formData.purchaseVoucherNo}
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    InputProps={{
                                      readOnly: true, // Purchase Voucher No is read-only since it is auto-generated
                                    }}
                                  />
                                </div>

                                {/* <div className="col-xl-3">
                                  <TextField
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    required
                                    type="date"
                                    label="Date"
                                    name="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={formData.date}
                                    onChange={handleChange}
                                  />
                                </div> */}


<div className="col-xl-3">
                                  <TextField
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    required
                                    type="date"
                                    label="Purchase Date"
                                    name="purchaseDate"
                                    InputLabelProps={{ shrink: true }}
                                    value={formData.purchaseDate}
                                    onChange={handleChange}
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
                                    InputLabelProps={{ shrink: true }}
                                    value={formData.invoiceDate}
                                    onChange={handleChange}
                                  />
                                </div>

                              </div>

                              <div className="row mt-3">
                                <div className="col-xl-12 mt-1">
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
                                            No.
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
                                            Item
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
                                            Quantity
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
                                            Unit
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
                                            Price
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
                                        {Array.from({ length: 10 }).map(
                                          (_, index) => (
                                            <TableRow key={index}>
                                              <TableCell
                                                sx={{
                                                  border: "1px solid lightgray",
                                                  padding: "0px",
                                                }}
                                                align="center"
                                              >
                                                <span className="ps-2 pe-2">
                                                  {index + 1}
                                                </span>
                                              </TableCell>
                                              <TableCell
                                                sx={{
                                                  border: "1px solid lightgray",
                                                  padding: "0px",
                                                  width: "400px",
                                                }}
                                                align="center"
                                              >
                                                <FormControl fullWidth>
                                                  <Autocomplete
                                                    options={items}
                                                    getOptionLabel={(option) =>
                                                      option.name
                                                    }
                                                    value={
                                                      items.find(
                                                        (i) =>
                                                          i._id ===
                                                          formData.itemsList[
                                                            index
                                                          ]?.item
                                                      ) || null
                                                    }
                                                    onChange={(e, value) => {
                                                      handleItemChangeWrapper(
                                                        index,
                                                        value
                                                      );
                                                    }}
                                                    onInputChange={(
                                                      e,
                                                      value,
                                                      reason
                                                    ) => {
                                                      handleItemInputChange(
                                                        e,
                                                        value,
                                                        reason,
                                                        index
                                                      );
                                                    }}
                                                    renderInput={(params) => (
                                                      <TextField
                                                        {...params}
                                                        size="small"
                                                        label=""
                                                        variant="standard"
                                                        onKeyDown={(event) => {
                                                          if (
                                                            event.key ===
                                                            "Enter"
                                                          ) {
                                                            event.preventDefault(); // Prevent default enter behavior
                                                            openItemAddDialog(
                                                              params.inputProps
                                                                .value
                                                            ); // Open dialog with the input value
                                                          }
                                                        }}
                                                      />
                                                    )}
                                                  />
                                                </FormControl>
                                              </TableCell>
                                              <TableCell
                                                sx={{
                                                  border: "1px solid lightgray",
                                                  padding: "0px",
                                                }}
                                                align="center"
                                              >
                                                <TextField
                                                  name="quantity"
                                                  type="number"
                                                  value={
                                                    formData.itemsList[index]
                                                      ?.quantity || ""
                                                  }
                                                  onChange={(e) =>
                                                    handleItemFieldChange(
                                                      index,
                                                      e
                                                    )
                                                  }
                                                  size="small"
                                                  sx={{ fontSize: "12px" }}
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
                                                  name="unit"
                                                  value={
                                                    formData.itemsList[index]
                                                      ?.unit?.name || ""
                                                  }
                                                  InputProps={{
                                                    readOnly: true,
                                                  }}
                                                  size="small"
                                                  sx={{ fontSize: "12px" }}
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
                                                  name="price"
                                                  type="number"
                                                  value={
                                                    formData.itemsList[index]
                                                      ?.price || ""
                                                  }
                                                  onChange={(e) =>
                                                    handleItemFieldChange(
                                                      index,
                                                      e
                                                    )
                                                  }
                                                  size="small"
                                                  sx={{ fontSize: "12px" }}
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
                                                  name="amount"
                                                  type="number"
                                                  value={
                                                    formData.itemsList[index]
                                                      ?.amount || ""
                                                  }
                                                  InputProps={{
                                                    readOnly: true,
                                                  }}
                                                  size="small"
                                                  variant="standard"
                                                />
                                              </TableCell>
                                            </TableRow>
                                          )
                                        )}
                                      </TableBody>
                                    </Table>
                                    {/* Dialog start */}

                                    <Dialog
                                      open={isItemAddDialogOpen}
                                      onClose={handleAddItemDialogClose}
                                    >
                                      <DialogTitle>Add New Item</DialogTitle>
                                      <DialogContent>
                                        <Box
                                          component="form"
                                          onSubmit={handleSubmitDialog}
                                        >
                                          <div className="row">
                                            <div className="row mt-2 mb-0">
                                              <div className="col-xl-12">
                                                <h5
                                                  className="fw-bold"
                                                  style={{
                                                    color: "rgb(1, 87, 155",
                                                  }}
                                                >
                                                  Item Name
                                                </h5>
                                              </div>
                                            </div>

                                            {/* <div className="col-xl-6">
                                              <TextField
                                                autoFocus
                                                margin="dense"
                                                id="name"
                                                label="Item Name"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                value={newItemName}
                                                onChange={(e) =>
                                                  setNewItemName(e.target.value)
                                                }
                                              />
                                            </div>

                                            <div className="col-xl-6">
                                              <TextField
                                                label="Print Name"
                                                name="printname"
                                                value={newItemName}
                                                onChange={(e) =>
                                                  setNewItemName(e.target.value)
                                                }
                                                fullWidth
                                                margin="normal"
                                                size="small"
                                                required
                                              />
                                            </div> */}

                                            <div className="col-xl-6">
                                              <TextField
                                                autoFocus
                                                margin="dense"
                                                id="name"
                                                label="Item Name"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                value={formsData.name}
                                                onChange={(e) =>
                                                  setFormsData({
                                                    ...formsData,
                                                    name: e.target.value,
                                                  })
                                                }
                                              />
                                            </div>

                                            <div className="col-xl-6">
                                              <TextField
                                                label="Print Name"
                                                name="printname"
                                                value={formsData.printname}
                                                onChange={(e) =>
                                                  setFormsData({
                                                    ...formsData,
                                                    printname: e.target.value,
                                                  })
                                                }
                                                fullWidth
                                                margin="normal"
                                                size="small"
                                                required
                                              />
                                            </div>

                                            <div className="col-xl-6">
                                              <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={generateBarcode}
                                                fullWidth
                                                margin="normal"
                                                className="mt-3 fw-bold"
                                                style={{
                                                  background: "#b3e5fc",
                                                }}
                                              >
                                                Generate Barcode
                                              </Button>
                                            </div>

                                            <div className="col-xl-6">
                                              <TextField
                                                label="Barcode"
                                                name="barcode"
                                                value={formsData.barcode}
                                                onChange={handleChangeDialog}
                                                fullWidth
                                                margin="normal"
                                                size="small"
                                                disabled
                                              />
                                            </div>

                                            <div className="col-xl-6">
                                              <Box
                                                display="flex"
                                                alignItems="center"
                                              >
                                                <FormControl fullWidth>
                                                  <Autocomplete
                                                    options={groups.map(
                                                      (group) => group.name
                                                    )}
                                                    value={formsData.group}
                                                    onChange={(
                                                      event,
                                                      newValue
                                                    ) => {
                                                      setFormsData({
                                                        ...formsData,
                                                        group: newValue,
                                                      });
                                                    }}
                                                    renderInput={(params) => (
                                                      <TextField
                                                        {...params}
                                                        label="Group"
                                                        margin="normal"
                                                        size="small"
                                                      />
                                                    )}
                                                  />
                                                </FormControl>

                                                <Tooltip
                                                  title="Add Group"
                                                  placement="top-start"
                                                >
                                                  <IconButton
                                                    onClick={
                                                      handleGroupDialogOpen
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

                                            <div className="row mt-2 mb-0">
                                              <div className="col-xl-12">
                                                <h5
                                                  className="fw-bold"
                                                  style={{
                                                    color: "rgb(1, 87, 155",
                                                  }}
                                                >
                                                  Unit
                                                </h5>
                                              </div>
                                            </div>

                                            <div className="col-xl-6">
                                              <Box
                                                display="flex"
                                                alignItems="center"
                                                margin="normal"
                                              >
                                                <FormControl
                                                  fullWidth
                                                  margin="normal"
                                                >
                                                  <Autocomplete
                                                    options={units.map(
                                                      (unit) => unit.name
                                                    )}
                                                    value={formsData.unit}
                                                    onChange={(e, newValue) => {
                                                      const selectedUnit =
                                                        units.find(
                                                          (unit) =>
                                                            unit.name ===
                                                            newValue
                                                        );
                                                      setFormsData(
                                                        (prevState) => ({
                                                          ...prevState,
                                                          unit: newValue,
                                                          unitId:
                                                            selectedUnit?._id,
                                                        })
                                                      );
                                                    }}
                                                    renderInput={(params) => (
                                                      <TextField
                                                        {...params}
                                                        label="Unit"
                                                        fullWidth
                                                        size="small"
                                                      />
                                                    )}
                                                  />
                                                </FormControl>

                                                <Tooltip
                                                  title="Add Unit"
                                                  placement="top-start"
                                                >
                                                  <IconButton
                                                    onClick={
                                                      handleUnitDialogOpen
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
                                            <div className="col-xl-6">
                                              <Box
                                                display="flex"
                                                alignItems="center"
                                                margin="normal"
                                              >
                                                <FormControl
                                                  fullWidth
                                                  margin="normal"
                                                >
                                                  <Autocomplete
                                                    options={alternativeUnits.map(
                                                      (altUnit) => altUnit.name
                                                    )}
                                                    value={
                                                      formsData.alternativeunit
                                                    }
                                                    onChange={(
                                                      event,
                                                      newValue
                                                    ) => {
                                                      setFormsData({
                                                        ...formsData,
                                                        alternativeunit:
                                                          newValue,
                                                      });
                                                    }}
                                                    renderInput={(params) => (
                                                      <TextField
                                                        {...params}
                                                        label="Alternative Unit"
                                                        size="small"
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

                                            <div className="col-xl-6">
                                              <TextField
                                                label="Conversion Factor"
                                                name="conversionFactor"
                                                type="number"
                                                value={
                                                  formsData.conversionFactor
                                                }
                                                onInput={preventNegativeInput}
                                                onChange={handleChangeDialog}
                                                margin="normal"
                                                size="small"
                                                fullWidth
                                              />
                                            </div>

                                            <div className="row mt-2 mb-0">
                                              <div className="col-xl-12">
                                                <h5
                                                  className="fw-bold"
                                                  style={{
                                                    color: "rgb(1, 87, 155",
                                                  }}
                                                >
                                                  Pricing
                                                </h5>
                                              </div>
                                            </div>

                                            <div className="row">
                                              <div className="col-xl-6">
                                                <TextField
                                                  label="Retailer Price"
                                                  name="retailerPrice"
                                                  value={
                                                    formsData.retailerPrice
                                                  }
                                                  onChange={handleChangeDialog}
                                                  onInput={preventNegativeInput}
                                                  fullWidth
                                                  margin="normal"
                                                  type="number"
                                                  size="small"
                                                  required
                                                />
                                              </div>

                                              <div className="col-xl-6">
                                                <TextField
                                                  label="Semi Wholeseller Price"
                                                  name="semiWholesellerPrice"
                                                  value={
                                                    formsData.semiWholesellerPrice
                                                  }
                                                  onChange={handleChangeDialog}
                                                  onInput={preventNegativeInput}
                                                  fullWidth
                                                  margin="normal"
                                                  type="number"
                                                  size="small"
                                                  required
                                                />
                                              </div>

                                              <div className="col-xl-6">
                                                <TextField
                                                  label="Wholeseller Price"
                                                  name="wholesellerPrice"
                                                  value={
                                                    formsData.wholesellerPrice
                                                  }
                                                  onChange={handleChangeDialog}
                                                  onInput={preventNegativeInput}
                                                  fullWidth
                                                  margin="normal"
                                                  type="number"
                                                  size="small"
                                                  required
                                                />
                                              </div>
                                            </div>

                                            <div className="col-xl-6">
                                              <TextField
                                                label="Opening Stock"
                                                name="quantity"
                                                value={formsData.quantity}
                                                onChange={handleChangeDialog}
                                                fullWidth
                                                margin="normal"
                                                size="small"
                                                onInput={preventNegativeInput}
                                                type="number"
                                                required
                                              />
                                            </div>

                                            <div className="col-xl-6">
                                              <Box
                                                display="flex"
                                                alignItems="center"
                                              >
                                                <FormControl fullWidth>
                                                  <Autocomplete
                                                    options={gsts}
                                                    getOptionLabel={(option) =>
                                                      `${option.name} (${option.rate}%)`
                                                    }
                                                    value={formsData.gst}
                                                    onChange={(e, newValue) =>
                                                      setFormsData({
                                                        ...formsData,
                                                        gst: newValue,
                                                      })
                                                    }
                                                    renderInput={(params) => (
                                                      <TextField
                                                        {...params}
                                                        label="GST"
                                                        name="gst"
                                                        size="small"
                                                        margin="normal"
                                                      />
                                                    )}
                                                  />
                                                </FormControl>

                                                <Tooltip
                                                  title="Add GST"
                                                  placement="top-start"
                                                >
                                                  <IconButton
                                                    onClick={
                                                      handleGstDialogOpen
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

                                            <div className="col-xl-6">
                                              <TextField
                                                label="HSN Code"
                                                name="HSNCode"
                                                type="number"
                                                value={formsData.HSNCode}
                                                onInput={preventNegativeInput}
                                                onChange={handleChangeDialog}
                                                margin="normal"
                                                fullWidth
                                                size="small"
                                              />
                                            </div>

                                            <div className="col-xl-6">
                                              <Button
                                                className="mt-3"
                                                component="label"
                                                // role={undefined}
                                                variant="contained"
                                                tabIndex={-1}
                                                startIcon={<CloudUploadIcon />}
                                              >
                                                Add Image
                                                <VisuallyHiddenInput
                                                  type="file"
                                                  fullWidth
                                                  margin="normal"
                                                  multiple
                                                  onChange={handleImageChange}
                                                  size="small"
                                                  required
                                                />
                                              </Button>
                                            </div>
                                            <div className="col-xl-12">
                                              <Textarea
                                                maxRows={4}
                                                // aria-label="maximum height"
                                                placeholder="Description......."
                                                style={{ width: "100%" }}
                                                className="p-4 mt-3"
                                                // label="Description"
                                                name="description"
                                                value={formsData.description}
                                                onChange={handleChangeDialog}
                                                fullWidth
                                                margin="normal"
                                                size="small"
                                                required
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
                                                  onClick={
                                                    handleItemAddDialogClose
                                                  }
                                                >
                                                  Cancel
                                                </Button>
                                              </div>
                                            </div>
                                          </div>
                                        </Box>
                                      </DialogContent>
                                    </Dialog>

                                    <Dialog
                                      open={isUnitDialogOpen}
                                      onClose={handleUnitDialogClose}
                                    >
                                      <DialogTitle>Add New Unit</DialogTitle>
                                      <DialogContent>
                                        <TextField
                                          autoFocus
                                          margin="dense"
                                          id="new-unit"
                                          label="New Unit"
                                          type="text"
                                          fullWidth
                                          value={newUnit}
                                          onChange={handleNewUnitChange}
                                        />
                                      </DialogContent>
                                      <DialogActions>
                                        <Button
                                          onClick={handleUnitDialogClose}
                                          color="error"
                                          variant="contained"
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          onClick={handleAddNewUnit}
                                          color="primary"
                                          variant="contained"
                                        >
                                          Add
                                        </Button>
                                      </DialogActions>
                                    </Dialog>

                                    <Dialog
                                      open={isAlternativeUnitDialogOpen}
                                      onClose={handleAlternativeUnitDialogClose}
                                    >
                                      <DialogTitle>
                                        Add New Alternative Unit
                                      </DialogTitle>
                                      <DialogContent>
                                        <TextField
                                          autoFocus
                                          margin="dense"
                                          id="new-alternativeunit"
                                          label="New Alternative Unit"
                                          type="text"
                                          fullWidth
                                          value={newAlternativeUnit}
                                          onChange={
                                            handleNewAlternativeUnitChange
                                          }
                                        />
                                      </DialogContent>
                                      <DialogActions>
                                        <Button
                                          onClick={
                                            handleAlternativeUnitDialogClose
                                          }
                                          color="error"
                                          variant="contained"
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          onClick={handleAddNewAlternativeUnit}
                                          color="primary"
                                          variant="contained"
                                        >
                                          Add
                                        </Button>
                                      </DialogActions>
                                    </Dialog>

                                    <Dialog
                                      open={isGroupDialogOpen}
                                      onClose={handleGroupDialogClose}
                                    >
                                      <DialogTitle>Add New Group</DialogTitle>
                                      <DialogContent>
                                        <TextField
                                          label="Group Name"
                                          value={newGroup}
                                          onChange={handleNewGroupChange}
                                          fullWidth
                                          margin="dense"
                                        />
                                      </DialogContent>
                                      <DialogActions>
                                        <Button
                                          onClick={handleGroupDialogClose}
                                          color="error"
                                          variant="contained"
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          onClick={handleAddNewGroup}
                                          color="primary"
                                          variant="contained"
                                        >
                                          Add
                                        </Button>
                                      </DialogActions>
                                    </Dialog>

                                    <Dialog
                                      open={isGstDialogOpen}
                                      onClose={handleGstDialogClose}
                                    >
                                      <DialogTitle>Add New GST</DialogTitle>
                                      <DialogContent>
                                        {/* <div className="row">
                      <div className="col-xl-12"> */}
                                        <TextField
                                          label="GST Name"
                                          value={newGst}
                                          onChange={handleNewGstChange}
                                          margin="normal"
                                          size="small"
                                        />
                                        {/* </div> */}
                                        {/* <div className="col-xl-12"> */}
                                        <TextField
                                          label="GST Rate"
                                          type="number"
                                          value={newGstRate}
                                          onChange={handleNewGstRateChange}
                                          margin="normal"
                                          size="small"
                                          className="ms-2"
                                        />
                                        {/* </div>
                    </div> */}
                                      </DialogContent>
                                      <DialogActions>
                                        <Button
                                          onClick={handleGstDialogClose}
                                          color="error"
                                          variant="contained"
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          onClick={handleAddNewGst}
                                          color="primary"
                                          variant="contained"
                                        >
                                          Add
                                        </Button>
                                      </DialogActions>
                                    </Dialog>

                                    {/* Dialog end */}
                                  </TableContainer>

                                  <h5 className="text-end me-2 mt-2">
                                    <span className="fw-bold me-2">
                                      Total Amount:
                                    </span>
                                    {formData.totalAmount}
                                  </h5>
                                </div>
                              </div>

                              {/* Bill sundry Start */}


                              <div className="row mt-3 d justify-content-end">
                                <div className="col-xl-6 mt-1 ">
                                 
                                <Button
                                   
                                    variant="contained"
                                    color="primary"
                                    className="fw-bold"
                                    size="small"
                                    onClick={handleTransportDetailDialogOpen}
                                  >
                                   Transport Detail
                                  </Button>

                                  
                                </div>
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
                                              border: "1px solid lightgray",
                                              padding: "4px",
                                              background: "#bbdefb",
                                            }}
                                            className="p-0 fw-bold fixed"
                                          >
                                            No.
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
                                          
                                          <TableCell
                                            sx={{
                                              border: "1px solid lightgray",
                                              padding: "4px",
                                              background: "#bbdefb",
                                            }}
                                            className="p-0 fw-bold fixed"
                                            align="center"
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
                                                <span className="ps-2 pe-2">
                                                 
                                                </span>
                                              </TableCell>
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
                                                formData.packingCharges || ""
                                              }
                                              onChange={handleFieldChange}
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
                                                {/* <TextField
                                                  name="quantity"
                                                  type="number"
                                                  
                                                  size="small"
                                                  sx={{ fontSize: "12px" }}
                                                  variant="standard"
                                                /> */}

<TextField
                                              name="gstExpenses"
                                              type="number"
                                              value={formData.gstExpenses || ""}
                                              onChange={handleFieldChange}
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
                                                {/* <TextField
                                                  name="unit"
                                                  
                                                  size="small"
                                                  sx={{ fontSize: "12px" }}
                                                  variant="standard"
                                                /> */}

<TextField
                                              name="otherExpenses"
                                              type="number"
                                              value={formData.otherExpenses || ""}
                                              onChange={handleFieldChange}
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
                                                  name="amount"
                                                  type="number"
                                                 
                                                  size="small"
                                                  variant="standard"
                                                />
                                              </TableCell>
                                            </TableRow>
                                         
                                      </TableBody>
                                    </Table>



                                    <Dialog open={isTransportDetailDialogOpen} onClose={handleTransportDetailDialogClose}>
        <DialogTitle>Transport Detail</DialogTitle>
        <DialogContent>
          <div className="row">
            <div className="col-xl-6">
            <TextField
            autoFocus
            margin="dense"
            label="Tranport"
            type="text"
            size="small"
            fullWidth
          />
            </div>
            <div className="col-xl-6">
            <TextField
            autoFocus
            margin="dense"
            label="Vehical No."
            type="text"
            size="small"
            fullWidth
          />
            </div>
          
            <div className="col-xl-6">
            <TextField
            autoFocus
            margin="dense"
            label="Date"
            type="date"
            size="small"
            fullWidth
          />
            </div>

            <div className="col-xl-6">
            <TextField
            autoFocus
            margin="dense"
            label="Amount"
            type="text"
            size="small"
            fullWidth
          />
            </div>

            <div className="col-xl-6">
            <TextField
            autoFocus
            margin="dense"
            label="Station from"
            type="text"
            size="small"
            fullWidth
          />
            </div>

            <div className="col-xl-6">
            <TextField
            autoFocus
            margin="dense"
            label="Station To"
            type="text"
            size="small"
            fullWidth
          />
            </div>
          </div>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTransportDetailDialogClose} color="error" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleAddNewAlternativeUnit} color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
                                   
                                  </TableContainer>

                                  <h5 className="text-end me-2 mt-2">
                                    <span className="fw-bold me-2">
                                      Total Amount:
                                    </span>
                                  </h5>
                                </div>
                              </div>

                              {/* Bill sundry End */}




                              <div className="row mt-3 ">
                                <div className="col-xl-12 d-flex justify-content-center">
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
                    </Box>
                  </div>
                </div>
                {/* </div> */}
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>





  );
}
