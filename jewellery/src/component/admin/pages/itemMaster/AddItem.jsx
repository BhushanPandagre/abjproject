
//----------------------------Gunjan----------------------------------------//

///=================================  03/09/2024 =========================================

//=================================  03/09/2024 =========================================

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Header from "../../../schema/Header";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { FormControl, InputLabel, Select, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import Tooltip from "@mui/material/Tooltip";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  DialogContentText,
} from "@mui/material";
import debounce from "lodash/debounce";
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

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const breadcrumbs = [
  <Link
    underline="hover"
    key="2"
    color="inherit"
    to="/item_master"
    className="text-decoration-none"
  >
    Item List
  </Link>,
  <Typography key="3" color="text.primary">
    Add Item
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
import Backdrop from "@mui/material/Backdrop";
import Modal from "react-modal"; // or the correct path for your modal component
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import Barcode from "react-barcode";



export default function AddItem() {
  const navigate = useNavigate("");
  const [formData, setFormData] = useState({
    name: "",
    printname: "",
    itemType: "",
    mainUnitBarcode: "",
    alternativeUnitBarcode: "",
    group: "",
    category: "",
    description: "",
    unit: null,
    alternativeunit: "",
    packagingUnit: "",
    conversionFactor: "1",
    selectedConversion: "alternativeunit/unit",
    quantity: "",
    saleprice: "",
    purchaseprice: "",
    MRP: "",
    retailerPrice: "",
    semiWholesellerPrice: "",
    wholesellerPrice: "",
    alternativeSemiWholesellerPrice: "",
    alternativeWholesellerPrice: "",
    alternativeRetailerPrice: "",
    minSalePrice: "",
    openingStock: "",
    altOpeningStock: "",
    gst: null,
    HSNCode: "",
    salediscount: "",
    images: [],
  });

  const handleNewGroupChange = (e) => {
    setNewGroup(e.target.value);
  };
  const [nameError, setNameError] = useState("");
  const [groups, setGroups] = useState([]);
  const [units, setUnits] = useState([]);
  const [alternativeUnits, setAlternativeUnits] = useState([]);
  const [packagingUnits, setPackagingUnits] = useState([]);
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
  const [newPackagingUnit, setNewPackagingUnit] = useState("");
  const [isPackagingUnitDialogOpen, setIsPackagingUnitDialogOpen] =
    useState(false);
  const [showOpeningStock, setShowOpeningStock] = useState(false);
  const handleCheckboxChange = (e) => {
    setShowOpeningStock(e.target.checked);
  };
  const [samePriceChecked, setSamePriceChecked] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [items, setItems] = useState([]);
  const firstFieldRef = useRef(null);
  const printNameFieldRef = useRef(null);
  const mainUnitBarcodeFieldRef = useRef(null);
  const groupFieldRef = useRef(null);
  const unitFieldRef = useRef(null);
  const alternativeUnitFieldRef = useRef(null);
  const packagingUnitFieldRef = useRef(null);
  const conversionFactorFieldRef = useRef(null);
  const retailerPriceFieldRef = useRef(null);
  const semiWholesellerPriceFieldRef = useRef(null);
  const wholesellerPriceFieldRef = useRef(null);
  const quantityFieldRef = useRef(null);
  const gstFieldRef = useRef(null);
  const HSNCodeFieldRef = useRef(null);
  const descriptionFieldRef = useRef(null);
  useEffect(() => {
    if (firstFieldRef.current) {
      firstFieldRef.current.focus();
    }
  }, []);
  const handleKeyDown = (event, nextFieldRef) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (nextFieldRef.current) {
        nextFieldRef.current.focus();
      }
    }
  };
  // useEffect to update selectedConversion when unit or alternative unit changes
  useEffect(() => {
    if (formData.unit && formData.alternativeunit) {
      // Default to "Main Unit / Alternative Unit" option
      setFormData((prevState) => ({
        ...prevState,
        selectedConversion: "alternativeunit/unit",
      }));
    }
  }, [formData.unit, formData.alternativeunit]);

  const handleConversionChange = (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedConversion: value,
    }));
  };

  // Construct labels for Select options
  const getConversionOptions = () => {
    const unit = formData.unit || "Main Unit";
    const altUnit = formData.alternativeunit || "Alternative Unit";
    return [
      {
        value: "alternativeunit/unit",
        label: `${altUnit} / ${unit}`,
      },
      {
        value: "unit/alternativeunit",
        label: `${unit} / ${altUnit}`,
      },
    ];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          groupsResponse,
          unitsResponse,
          alternativeUnitsResponse,
          packagingUnitsResponse,
          gstsResponse,
        ] = await Promise.all([
          api.get("/api/groups"),
          api.get("/api/units"),
          api.get("/api/alternative-units"),
          api.get("/api/packaging-units"),
          api.get("/api/gsts"),
        ]);
        setGroups(groupsResponse.data);
        setUnits(unitsResponse.data);
        setAlternativeUnits(alternativeUnitsResponse.data);
        setPackagingUnits(packagingUnitsResponse.data);
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

  const generateMainUnitBarcode = () => {
    // Generate a random 5-digit barcode
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  const generateAlternativeUnitBarcode = (name) => {
    if (!name) return "";

    // Generate an alphanumeric barcode based on the item name
    const randomNumbers = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    return `${name.slice(0, 8).toUpperCase()}${randomNumbers}`;
  };

  useEffect(() => {
    // Automatically generate barcodes when the component mounts or when the name changes
    setFormData((prevState) => ({
      ...prevState,
      mainUnitBarcode: generateMainUnitBarcode(),
      alternativeUnitBarcode: generateAlternativeUnitBarcode(prevState.name),
    }));
  }, [formData.name]); // Re-run when the name changes

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert the value to uppercase if the field is "name" or "printname"
    const upperCaseValue =
      name === "name" || name === "printname" ? value.toUpperCase() : value;

    setFormData((prevState) => {
      const updatedFormData = {
        ...prevState,
        [name]: upperCaseValue,
      };

      // If the name field is being changed, also update the printname and alternativeUnitBarcode fields
      if (name === "name") {
        updatedFormData.printname = upperCaseValue;
        updatedFormData.alternativeUnitBarcode = upperCaseValue;
      }

      // If the semiWholesellerPrice field is being changed and the checkbox is checked, also update the wholesellerPrice field
      if (name === "semiWholesellerPrice" && samePriceChecked) {
        updatedFormData.wholesellerPrice = upperCaseValue;
      }

      if (name === "conversionFactor") {
        if (value === "1") {
          // Start debouncing for field reset
          debouncedResetFields();
        } else {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }

      return updatedFormData;
    });
  };

  // Debounced function to reset fields after delay
  const debouncedResetFields = debounce(() => {
    setFormData((prevData) => ({
      ...prevData,
      alternativeunit: "",
      selectedConversion: "",
      alternativeUnitBarcode: "",
      alternativeSemiWholesellerPrice: "",
      alternativeWholesellerPrice: "",
      alternativeRetailerPrice: "",
      altOpeningStock: "",
    }));
  }, 2000);

  useEffect(() => {
    if (isResetting) {
      debouncedResetFields();
    }
    return () => {
      // Cancel the debounce on component unmount or when isResetting changes
      debouncedResetFields.cancel();
    };
  }, [isResetting]);

  const handleCheckboxPriceChange = (e) => {
    setSamePriceChecked(e.target.checked);
    if (e.target.checked) {
      setFormData((prevData) => ({
        ...prevData,
        wholesellerPrice: prevData.semiWholesellerPrice,
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevState) => ({
      ...prevState,
      images: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name.trim()) {
      setNameError("Name is required");
      return;
    } else {
      setNameError("");
    }

    const selectedGroup = groups.find((group) => group.name === formData.group);

    // Check for duplicate
    const duplicateItem = items.find(
      (item) =>
        item.name === formData.name &&
        String(item.group._id) === String(selectedGroup?._id) &&
        Number(item.retailerPrice) === Number(formData.retailerPrice) &&
        Number(item.semiWholesellerPrice) ===
          Number(formData.semiWholesellerPrice) &&
        Number(item.wholesellerPrice) === Number(formData.wholesellerPrice)
    );

    const proceedToSubmit = async () => {
      // Prepare form data for submission
      const formDataToSubmit = new FormData();
      for (const key in formData) {
        if (key === "images") {
          formData[key].forEach((file) => {
            formDataToSubmit.append("images", file);
          });
        } else if (key === "group") {
          formDataToSubmit.append("group", selectedGroup?._id);
        } else if (key === "gst") {
          formDataToSubmit.append("gst", formData.gst?._id || "");
        } else {
          formDataToSubmit.append(key, formData[key]);
        }
      }

      try {
        const response = await api.post(
          "/api/jewelry-items",
          formDataToSubmit,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Jewelry item added successfully!");

        // Update items state and reset form
        setItems((prevItems) => [...prevItems, response.data]);
        setFormData({
          name: "",
          printname: "",
          itemType: "",
          group: "",
          category: "",
          description: "",
          unit: "",
          alternativeunit: "",
          packagingUnit: "",
          selectedConversion: "alternativeunit/unit",
          conversionFactor: 1,
          quantity: 0,
          retailerPrice: 0,
          semiWholesellerPrice: 0,
          wholesellerPrice: 0,
          alternativeSemiWholesellerPrice: 0,
          alternativeWholesellerPrice: 0,
          alternativeRetailerPrice: 0,
          openingStock: 0,
          altOpeningStock: 0,
          minSalePrice: 0,
          saleprice: 0,
          purchaseprice: 0,
          MRP: 0,
          gst: null,
          HSNCode: 0,
          salediscount: 0,
          images: [],
        });
      } catch (error) {
        console.error(
          "Error saving jewelry item:",
          error.response ? error.response.data : error.message
        );
        toast.error(
          `Error saving jewelry item: ${
            error.response ? error.response.data.message : error.message
          }`
        );
      }
    };

    if (duplicateItem) {
      setDuplicateItemData(duplicateItem);
      setIsOpen(true);
    } else {
      proceedToSubmit();
    }
  };
  const handleConfirm = () => {
    setIsOpen(false);
    proceedToSubmit();
  };

  const handleCancel = () => {
    setIsOpen(false);
    toast.info("Operation cancelled. Jewelry item not added.");
  };

  const [isOpen, setIsOpen] = useState(false);
  const [duplicateItemData, setDuplicateItemData] = useState(null);

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
      toast.success("New Group added successfully!");
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
      // First, add the unit to the 'units' database
      const response = await api.post("/api/units", {
        name: newUnit,
      });
      const addedUnit = response.data;

      // Then, add the same unit to the 'alternative-units' database
      await api.post("/api/alternative-units", {
        name: newUnit,
      });

      // Update state to include the new unit in both dropdowns
      setUnits((prevUnits) => [...prevUnits, addedUnit]);
      setAlternativeUnits((prevAlternativeUnits) => [
        ...prevAlternativeUnits,
        addedUnit,
      ]);

      toast.success("Unit added successfully!");
      setNewUnit("");
      setIsUnitDialogOpen(false);
    } catch (error) {
      console.error("Error adding new unit:", error);
      toast.error("Failed to add new unit.");
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
      // First, add the alternative unit to the 'alternative-units' database
      const response = await api.post("/api/alternative-units", {
        name: newAlternativeUnit,
      });
      const addedAlternativeUnit = response.data;

      // Then, add the same alternative unit to the 'units' database
      await api.post("/api/units", {
        name: newAlternativeUnit,
      });

      // Update state to include the new alternative unit in both dropdowns
      setAlternativeUnits((prevAlternativeUnits) => [
        ...prevAlternativeUnits,
        addedAlternativeUnit,
      ]);
      setUnits((prevUnits) => [...prevUnits, addedAlternativeUnit]);

      toast.success("Alternative Unit added successfully!");
      setNewAlternativeUnit("");
      setIsAlternativeUnitDialogOpen(false);
    } catch (error) {
      console.error("Error adding new alternative unit:", error);
      toast.error("Failed to add new alternative unit.");
    }
  };

  const handleAddNewPackagingUnit = async () => {
    try {
      const response = await api.post("/api/packaging-units", {
        name: newPackagingUnit,
      });
      setPackagingUnits([...packagingUnits, response.data]);
      toast.success("New packaging unit added successfully!");
      setNewPackagingUnit("");
      setIsPackagingUnitDialogOpen(false);
    } catch (error) {
      console.error("Error adding new packaging:", error);
    }
  };

  const handlePackagingUnitDialogOpen = () => {
    setIsPackagingUnitDialogOpen(true);
  };

  const handlePackagingUnitDialogClose = () => {
    setIsPackagingUnitDialogOpen(false);
  };

  const handleNewPackagingUnitChange = (e) => {
    setNewPackagingUnit(e.target.value);
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
      toast.success("GST added successfully!");
      setNewGst("");
      setNewGstRate("");
      setIsGstDialogOpen(false);
    } catch (error) {
      console.error("Error adding new GST:", error);
    }
  };

  // Validation function to prevent negative numbers
  const preventNegativeInput = (e) => {
    const value = e.target.value;
    if (value < 0) {
      e.target.value = 0;
    }
  };

  const getConversionText = () => {
    if (formData.conversionFactor && formData.selectedConversion) {
      const [from, to] = formData.selectedConversion.split("/");
      return `${formData.conversionFactor} x 1 `;
    }
    return "";
  };

  const AddItemPage = () => {
    const firstFieldRef = useRef(null);

    useEffect(() => {
      if (firstFieldRef.current) {
        firstFieldRef.current.focus();
      }
    }, []);
  };

  // Handle key press to move focus
  const handleKeyPress = (e, nextRef) => {
    if (e.key === "Enter" && nextRef && nextRef.current) {
      e.preventDefault();
      nextRef.current.focus();
    }
  };

  // Refs for each field
  const secondFieldRef = useRef(null);
  const thirdFieldRef = useRef(null);
  const fourthFieldRef = useRef(null);
  const fifthFieldRef = useRef(null);
  const sixthFieldRef = useRef(null);

  useEffect(() => {
    const {
      semiWholesellerPrice,
      wholesellerPrice,
      retailerPrice,
      conversionFactor,
    } = formData;

    const calcAltPrice = (price) => price * conversionFactor;

    setFormData((prevFormData) => ({
      ...prevFormData,
      alternativeSemiWholesellerPrice: semiWholesellerPrice
        ? calcAltPrice(parseFloat(semiWholesellerPrice))
        : "",
      alternativeWholesellerPrice: wholesellerPrice
        ? calcAltPrice(parseFloat(wholesellerPrice))
        : "",
      alternativeRetailerPrice: retailerPrice
        ? calcAltPrice(parseFloat(retailerPrice))
        : "",
    }));
  }, [
    formData.semiWholesellerPrice,
    formData.wholesellerPrice,
    formData.retailerPrice,
    formData.conversionFactor,
  ]);

  useEffect(() => {
    if (formData.openingStock && formData.conversionFactor) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        altOpeningStock: formData.openingStock * formData.conversionFactor,
      }));
    }
  }, [formData.openingStock, formData.conversionFactor]);

  useEffect(() => {
    if (formData.wholesellerPrice) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        retailerPrice: formData.wholesellerPrice * 2,
      }));
    }
  }, [formData.wholesellerPrice]);

  return (
    <div>
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
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="row d-flex justify-content-between">
                          <div className="col-xl-6 d-flex justify-content-end">
                            <h5 className="fw-bold text-center"> Add Item</h5>
                          </div>
                          <div className="col-xl-6 d-flex justify-content-end mb-1">
                            <Button
                              onClick={() => {
                                navigate("/item_master");
                              }}
                              color="primary"
                              variant="contained"
                              size="small"
                            >
                              List
                            </Button>
                          </div>
                        </div>
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
                        <Box component="form" onSubmit={handleSubmit}>
                          <ToastContainer />
                          <div className="row">
                            <div
                              className="col-xl-12 mx-auto"
                              style={{
                                border: "1px solid gray",
                                borderRadius: "8px",
                              }}
                            >
                              <div className="row">
                                <div className="row mt-2 mb-0">
                                  <div className="col-xl-12">
                                    <h6
                                      className="fw-bold"
                                      style={{ color: "rgb(1, 87, 155" }}
                                    >
                                      Item Name
                                    </h6>
                                  </div>
                                </div>

                                <div className="col-xl-6">
                                  <TextField
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={!!nameError}
                                    helperText={nameError}
                                    fullWidth
                                    size="small"
                                    InputProps={{
                                      style: {
                                        fontSize: "0.875rem", // Reduce the font size
                                      },
                                    }}
                                    InputLabelProps={{
                                      style: { fontSize: "0.875rem" }, // Reduce label font size
                                    }}
                                    inputRef={firstFieldRef}
                                    autoFocus
                                    onKeyDown={(e) =>
                                      handleKeyPress(e, secondFieldRef)
                                    }
                                  />
                                </div>

                                <div className="col-xl-6">
                                  <TextField
                                    label="Print Name"
                                    name="printname"
                                    value={formData.printname}
                                    onChange={handleChange} // This will ensure changes are handled if needed
                                    fullWidth
                                    size="small"
                                    InputProps={{
                                      style: {
                                        fontSize: "0.875rem", // Reduce the font size
                                      },
                                    }}
                                    InputLabelProps={{
                                      style: { fontSize: "0.875rem" }, // Reduce label font size
                                    }}
                                    autoFocus
                                    inputRef={secondFieldRef}
                                    onKeyDown={(e) =>
                                      handleKeyPress(e, thirdFieldRef)
                                    }
                                  />
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    label="Hindi Name"
                                    name="itemType"
                                    value={formData.itemType.replace(
                                      /\b\w/g,
                                      (char) => char.toUpperCase()
                                    )}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    required
                                    InputProps={{
                                      style: {
                                        fontSize: "0.875rem", // Reduce the font size
                                      },
                                    }}
                                    InputLabelProps={{
                                      style: { fontSize: "0.875rem" }, // Reduce label font size
                                    }}
                                    inputRef={thirdFieldRef}
                                    onKeyDown={(e) =>
                                      handleKeyPress(e, fourthFieldRef)
                                    }
                                  />
                                </div>

                                <div className="col-xl-3">
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
                                        options={groups.map(
                                          (group) => group.name
                                        )}
                                        value={formData.group}
                                        onChange={(event, newValue) => {
                                          setFormData({
                                            ...formData,
                                            group: newValue,
                                          });
                                        }}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            label="Department"
                                            margin="normal"
                                            size="small"
                                            sx={{ fontSize: "0.875rem" }}
                                          />
                                        )}
                                      />
                                    </FormControl>

                                    <Tooltip
                                      title="Add Department"
                                      placement="top-start"
                                    >
                                      <IconButton
                                        onClick={handleGroupDialogOpen}
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

                                <div className="row mt-2 mb-1">
                                  <div className="col-xl-12">
                                    <h6
                                      className="fw-bold"
                                      style={{ color: "rgb(1, 87, 155" }}
                                    >
                                      Unit
                                    </h6>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-xl-3">
                                    {formData.unit !==
                                      formData.alternativeunit && (
                                      <FormControl fullWidth>
                                        <TextField
                                          label="Conversion Factor"
                                          name="conversionFactor"
                                          type="number"
                                          value={formData.conversionFactor}
                                          onInput={preventNegativeInput}
                                          onChange={handleChange}
                                          size="small"
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
                                      </FormControl>
                                    )}
                                  </div>

                                  <div className="col-xl-12 mt-2 mb-3">
                                    {/* New Box Displaying Conversion Information */}
                                    {formData.conversionFactor !== "1" && (
                                      <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="flex-start"
                                        border={1}
                                        borderColor="grey.400"
                                        borderRadius={1}
                                        padding={1}
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
                                      >
                                        <Typography variant="body1">
                                          {`${getConversionText()}`}
                                        </Typography>
                                      </Box>
                                    )}
                                  </div>

                                  <div className="col-xl-3">
                                    <Box display="flex" alignItems="center">
                                      <FormControl fullWidth>
                                        {" "}
                                        {/* Adjust maxWidth as needed */}
                                        <Autocomplete
                                          options={units.map(
                                            (unit) => unit.name
                                          )}
                                          value={formData.unit}
                                          onChange={(e, newValue) => {
                                            const selectedUnit = units.find(
                                              (unit) => unit.name === newValue
                                            );
                                            setFormData((prevState) => ({
                                              ...prevState,
                                              unit: newValue,
                                              unitId: selectedUnit?._id,
                                            }));
                                          }}
                                          renderInput={(params) => (
                                            <TextField
                                              {...params}
                                              label="Main Unit"
                                              sx={{ fontSize: "0.75rem" }} // Adjust fontSize and height as needed
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
                                          onClick={handleUnitDialogOpen}
                                          sx={{ ml: 1 }}
                                          style={{
                                            background: "#ffe0b2",
                                            width: "30px",
                                            height: "30px",
                                          }}
                                        >
                                          <AddIcon />
                                        </IconButton>
                                      </Tooltip>
                                    </Box>
                                  </div>

                                  <div className="col-xl-3">
                                    <Box
                                      display="flex"
                                      alignItems="center"
                                      margin="normal"
                                    >
                                      <FormControl fullWidth>
                                        {formData.conversionFactor !== "1" && (
                                          <Autocomplete
                                            options={alternativeUnits.map(
                                              (altUnit) => altUnit.name
                                            )}
                                            value={formData.alternativeunit}
                                            onChange={(event, newValue) => {
                                              setFormData({
                                                ...formData,
                                                alternativeunit: newValue,
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
                                        )}
                                      </FormControl>
                                      <Tooltip
                                        title="Add Alternative Unit"
                                        placement="top-start"
                                      >
                                        {formData.conversionFactor !== "1" && (
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
                                        )}
                                      </Tooltip>
                                    </Box>
                                  </div>

                                  <div className="col-xl-3">
                                    {formData.conversionFactor !== "1" && (
                                      <FormControl fullWidth size="small">
                                        <InputLabel
                                          sx={{ fontSize: "0.875rem" }}
                                        >
                                          Conversion Type
                                        </InputLabel>
                                        <Select
                                          value={formData.selectedConversion}
                                          onChange={handleConversionChange}
                                          label="Conversion Type"
                                          sx={{ fontSize: "0.875rem" }}
                                        >
                                          {getConversionOptions().map(
                                            (option) => (
                                              <MenuItem
                                                key={option.value}
                                                value={option.value}
                                                sx={{ fontSize: "0.875rem" }}
                                              >
                                                {option.label}
                                              </MenuItem>
                                            )
                                          )}
                                        </Select>
                                      </FormControl>
                                    )}
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-xl-3">
                                    <Box
                                      display="flex"
                                      alignItems="center"
                                      margin="normal"
                                    >
                                      <FormControl fullWidth>
                                        <Autocomplete
                                          options={packagingUnits.map(
                                            (packagingUnit) =>
                                              packagingUnit.name
                                          )}
                                          value={formData.packagingUnit}
                                          onChange={(e, newValue) => {
                                            setFormData({
                                              ...formData,
                                              packagingUnit: newValue,
                                            });
                                          }}
                                          renderInput={(params) => (
                                            <TextField
                                              {...params}
                                              label="packaging Unit"
                                              size="small"
                                              margin="normal"
                                            />
                                          )}
                                        />
                                      </FormControl>
                                      <Tooltip
                                        title="Add packaging Units"
                                        placement="top-start"
                                      >
                                        <IconButton
                                          onClick={
                                            handlePackagingUnitDialogOpen
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
                                  <div className="col-xl-3">
                                    <TextField
                                      label="Main Unit Barcode"
                                      name="mainUnitBarcode"
                                      value={formData.mainUnitBarcode}
                                      onChange={handleChange}
                                      fullWidth
                                      margin="normal"
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

                                  <div className="col-xl-3">
                                    {formData.conversionFactor !== "1" && (
                                      <TextField
                                        label="Alternative Unit Barcode"
                                        name="alternativeUnitBarcode"
                                        value={formData.alternativeUnitBarcode}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
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
                                    )}
                                  </div>
                                </div>

                                <div className="row mt-2 mb-0">
                                  <div className="col-xl-12">
                                    <h6
                                      className="fw-bold"
                                      style={{ color: "rgb(1, 87, 155" }}
                                    >
                                      Pricing Main Unit{" "}
                                      {formData.unit && `(${formData.unit})`}
                                    </h6>
                                  </div>

                                  <div className="row ">
                                    <div className="col-xl-3">
                                      <TextField
                                        label="B Price"
                                        name="semiWholesellerPrice"
                                        value={formData.semiWholesellerPrice}
                                        onChange={handleChange}
                                        onInput={preventNegativeInput}
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
                                      {formData.semiWholesellerPrice && (
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              checked={samePriceChecked}
                                              onChange={
                                                handleCheckboxPriceChange
                                              }
                                              color="primary"
                                            />
                                          }
                                          label="Same Price in A Price"
                                          style={{
                                            fontSize: "0.875rem",
                                            marginTop: "0.5rem",
                                          }}
                                        />
                                      )}
                                    </div>

                                    <div className="col-xl-3">
                                      <TextField
                                        label="A Price"
                                        name="wholesellerPrice"
                                        value={formData.wholesellerPrice}
                                        onChange={handleChange}
                                        onInput={preventNegativeInput}
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
                                        name="retailerPrice"
                                        value={formData.retailerPrice}
                                        onChange={handleChange}
                                        onInput={preventNegativeInput}
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
                                        value={formData.minSalePrice}
                                        onChange={handleChange}
                                        onInput={preventNegativeInput}
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

                                <div className="row mt-2 mb-0">
                                  <div className="col-xl-12">
                                    {formData.conversionFactor !== "1" && (
                                      <h6
                                        className="fw-bold"
                                        style={{ color: "rgb(1, 87, 155)" }}
                                      >
                                        Pricing Alt Unit{" "}
                                        {formData.alternativeunit &&
                                          `(${formData.alternativeunit})`}
                                      </h6>
                                    )}
                                  </div>
                                  <div className="row mt-2">
                                    <div className="col-xl-3">
                                      {formData.conversionFactor !== "1" && (
                                        <TextField
                                          label="B Price"
                                          name="alternativeSemiWholesellerPrice"
                                          value={
                                            formData.alternativeSemiWholesellerPrice
                                          }
                                          onChange={handleChange}
                                          onInput={preventNegativeInput}
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
                                      )}
                                    </div>
                                    <div className="col-xl-3">
                                      {formData.conversionFactor !== "1" && (
                                        <TextField
                                          label="A Price"
                                          name="alternativeWholesellerPrice"
                                          value={
                                            formData.alternativeWholesellerPrice
                                          }
                                          onChange={handleChange}
                                          onInput={preventNegativeInput}
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
                                      )}
                                    </div>
                                    <div className="col-xl-3">
                                      {formData.conversionFactor !== "1" && (
                                        <TextField
                                          label="R Price"
                                          name="alternativeRetailerPrice"
                                          value={
                                            formData.alternativeRetailerPrice
                                          }
                                          onChange={handleChange}
                                          onInput={preventNegativeInput}
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
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  {/* Checkbox to toggle visibility */}
                                  <div className="col-xl-3">
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={showOpeningStock}
                                          onChange={handleCheckboxChange}
                                          color="primary"
                                        />
                                      }
                                      label="Add Opening Stock"
                                    />
                                  </div>

                                  {/* Conditionally render the fields */}
                                  {showOpeningStock && (
                                    <>
                                      <div className="col-xl-3">
                                        <TextField
                                          label="Opening Stock"
                                          name="openingStock"
                                          value={formData.openingStock}
                                          onChange={handleChange}
                                          fullWidth
                                          size="small"
                                          onInput={preventNegativeInput}
                                          type="number"
                                          margin="normal"
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
                                            value={formData.altOpeningStock}
                                            onChange={handleChange}
                                            fullWidth
                                            size="small"
                                            onInput={preventNegativeInput}
                                            type="number"
                                            margin="normal"
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
                                    </>
                                  )}
                                </div>

                                <div className="col-xl-3">
                                  <Box display="flex" alignItems="center">
                                    <FormControl fullWidth>
                                      <Autocomplete
                                        options={gsts}
                                        getOptionLabel={(option) =>
                                          `${option.name} (${option.rate}%)`
                                        }
                                        value={formData.gst}
                                        onChange={(e, newValue) =>
                                          setFormData({
                                            ...formData,
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
                                        onClick={handleGstDialogOpen}
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
                                    value={formData.HSNCode}
                                    onInput={preventNegativeInput}
                                    onChange={handleChange}
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

                                <div className="row">
                                  <div className="col-xl-2 d-flex justify-content-center mx-auto mb-2">
                                    <Button
                                      type="submit"
                                      variant="contained"
                                      color="success"
                                      fullWidth
                                      sx={{ mt: 2 }}
                                      className=" fw-bold"
                                    >
                                      Save
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Box>
                      </div>
                    </div>
                  </div>

                  <Dialog
                    open={isOpen}
                    onClose={handleCancel}
                    aria-labelledby="duplicate-item-dialog-title"
                    aria-describedby="duplicate-item-dialog-description"
                  >
                    <DialogTitle id="duplicate-item-dialog-title">
                      Duplicate Item Detected
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="duplicate-item-dialog-description">
                        An item with the same name, group, and prices already
                        exists. Do you want to add it anyway?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleCancel}
                        color="error"
                        variant="contained"
                        size="small"
                      >
                        No
                      </Button>
                      <Button
                        onClick={handleConfirm}
                        color="primary"
                        autoFocus
                        variant="contained"
                        size="small"
                      >
                        Yes
                      </Button>
                    </DialogActions>
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
                        value={newUnit.replace(/\b\w/g, (char) =>
                          char.toUpperCase()
                        )}
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
                    <DialogTitle>Add New Alternative Unit</DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="new-alternativeunit"
                        label="New Alternative Unit"
                        type="text"
                        fullWidth
                        value={newAlternativeUnit.replace(/\b\w/g, (char) =>
                          char.toUpperCase()
                        )}
                        onChange={handleNewAlternativeUnitChange}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleAlternativeUnitDialogClose}
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
                    open={isPackagingUnitDialogOpen}
                    onClose={handlePackagingUnitDialogClose}
                  >
                    <DialogTitle>Add New Alternative Unit</DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="new-packagingunit"
                        label="New  Packaging Unit"
                        type="text"
                        fullWidth
                        value={newPackagingUnit.replace(/\b\w/g, (char) =>
                          char.toUpperCase()
                        )}
                        onChange={handleNewPackagingUnitChange}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handlePackagingUnitDialogClose}
                        color="error"
                        variant="contained"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleAddNewPackagingUnit}
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
                    <DialogTitle>Add New Department</DialogTitle>
                    <DialogContent>
                      <TextField
                        label="Department"
                        value={newGroup.replace(/\b\w/g, (char) =>
                          char.toUpperCase()
                        )}
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

                  <Dialog open={isGstDialogOpen} onClose={handleGstDialogClose}>
                    <DialogTitle>Add New GST</DialogTitle>
                    <DialogContent>
                      <TextField
                        label="GST Name"
                        value={newGst.replace(/\b\w/g, (char) =>
                          char.toUpperCase()
                        )}
                        onChange={handleNewGstChange}
                        margin="normal"
                        size="small"
                      />

                      <TextField
                        label="GST Rate"
                        type="number"
                        value={newGstRate}
                        onChange={handleNewGstRateChange}
                        margin="normal"
                        size="small"
                        className="ms-2"
                      />
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
                </Box>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
