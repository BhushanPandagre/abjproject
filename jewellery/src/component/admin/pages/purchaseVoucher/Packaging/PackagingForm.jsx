// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import api from "../../../../../services/api";

// const PackagingForm = () => {
//   const [formData, setFormData] = useState({
//     itemName: "",
//     companyName: "",
//     supplierName: "",
//     purchaseVoucherNumber: "",
//     quantity: 0,
//     unit: "",
//     alternativeUnit: "",
//     price: 0,
//     amount: 0,
//     packagingDetails: {
//       boxCount: 0,
//       boxDetails: [{ boxNumber: 0, itemCount: 0 }],
//     },
//     totalBoxes: 0,
//     totalPieces: 0,
//     detailedCalculations: [],
//   });

//   useEffect(() => {
//     // Only run if boxDetails changes
//     const { boxDetails } = formData.packagingDetails;

//     // Check if boxDetails is not empty
//     if (boxDetails && boxDetails.length > 0) {
//       const { totalBoxes, totalPieces, detailedCalculations } =
//         calculateTotals(boxDetails);

//       // Only update the state if there are changes
//       if (
//         totalBoxes !== formData.totalBoxes ||
//         totalPieces !== formData.totalPieces ||
//         JSON.stringify(detailedCalculations) !==
//           JSON.stringify(formData.detailedCalculations)
//       ) {
//         setFormData({
//           ...formData,
//           totalBoxes,
//           totalPieces,
//           packagingDetails: {
//             ...formData.packagingDetails,
//             boxDetails: detailedCalculations,
//           },
//           detailedCalculations,
//         });
//       }
//     }
//   }, [formData.packagingDetails.boxDetails]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handlePackagingDetailChange = (index, e) => {
//     const { name, value } = e.target;
//     const newBoxDetails = [...formData.packagingDetails.boxDetails];
//     newBoxDetails[index][name] = parseInt(value, 10);
//     setFormData({
//       ...formData,
//       packagingDetails: {
//         ...formData.packagingDetails,
//         boxDetails: newBoxDetails,
//       },
//     });
//   };

//   const handleAddBoxDetail = () => {
//     setFormData({
//       ...formData,
//       packagingDetails: {
//         ...formData.packagingDetails,
//         boxDetails: [
//           ...formData.packagingDetails.boxDetails,
//           { boxNumber: 0, itemCount: 0 },
//         ],
//       },
//     });
//   };

//   const calculateTotals = (boxDetails) => {
//     let totalBoxes = 0;
//     let totalPieces = 0;
//     const detailedCalculations = [];

//     boxDetails.forEach((box) => {
//       const pieces = box.boxNumber * box.itemCount;
//       totalBoxes += box.boxNumber;
//       totalPieces += pieces;
//       detailedCalculations.push({
//         ...box,
//         totalPieces: pieces, // Ensure totalPieces is included
//       });
//     });

//     return { totalBoxes, totalPieces, detailedCalculations };
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/api/packaging", formData);
//       alert("Packaging added successfully!");
//     } catch (error) {
//       console.error("Error adding packaging:", error.response.data);
//       alert("Error adding packaging");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Item Name:
//         <input
//           type="text"
//           name="itemName"
//           value={formData.itemName}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Company Name:
//         <input
//           type="text"
//           name="companyName"
//           value={formData.companyName}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Supplier Name:
//         <input
//           type="text"
//           name="supplierName"
//           value={formData.supplierName}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Purchase Voucher Number:
//         <input
//           type="text"
//           name="purchaseVoucherNumber"
//           value={formData.purchaseVoucherNumber}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Quantity:
//         <input
//           type="number"
//           name="quantity"
//           value={formData.quantity}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Unit:
//         <input
//           type="text"
//           name="unit"
//           value={formData.unit}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Alternative Unit:
//         <input
//           type="text"
//           name="alternativeUnit"
//           value={formData.alternativeUnit}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Price:
//         <input
//           type="number"
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Amount:
//         <input
//           type="number"
//           name="amount"
//           value={formData.amount}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Box Count:
//         <input
//           type="number"
//           name="boxCount"
//           value={formData.packagingDetails.boxCount}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               packagingDetails: {
//                 ...formData.packagingDetails,
//                 boxCount: e.target.value,
//               },
//             })
//           }
//         />
//       </label>
//       {formData.packagingDetails.boxDetails.map((box, index) => (
//         <div key={index}>
//           <label>
//             Box Number:
//             <input
//               type="number"
//               name="boxNumber"
//               value={box.boxNumber}
//               onChange={(e) => handlePackagingDetailChange(index, e)}
//             />
//           </label>
//           <label>
//             Item Count:
//             <input
//               type="number"
//               name="itemCount"
//               value={box.itemCount}
//               onChange={(e) => handlePackagingDetailChange(index, e)}
//             />
//           </label>
//         </div>
//       ))}
//       <button type="button" onClick={handleAddBoxDetail}>
//         Add Box Detail
//       </button>
//       <div>
//         <h3>Detailed Calculations:</h3>
//         {formData.detailedCalculations.map((calc, index) => (
//           <div key={index}>
//             {calc.boxNumber} box X {calc.itemCount} pcs = {calc.totalPieces} pcs
//           </div>
//         ))}
//       </div>
//       <div>
//         <strong>Total Boxes:</strong> {formData.totalBoxes}
//       </div>
//       <div>
//         <strong>Total Pieces:</strong> {formData.totalPieces}
//       </div>
//       <button type="submit">Add Packaging</button>
//     </form>
//   );
// };

// export default PackagingForm;

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     await api.post('/api/packaging', formData);
//     alert('Packaging added successfully!');
//     // Reset form data
//     setFormData({
//       itemName: '',
//       companyName: '',
//       supplierName: '',
//       purchaseVoucherNumber: '',
//       quantity: 0,
//       unit: '',
//       alternativeUnit: '',
//       price: 0,
//       amount: 0,
//       packagingDetails: {
//         boxCount: 0,
//         boxDetails: [{ boxNumber: 0, itemCount: 0 }]
//       },
//       totalBoxes: 0,
//       totalPieces: 0,
//       detailedCalculations: []
//     });
//   } catch (error) {
//     console.error('Error adding packaging:', error.response.data);
//     alert('Error adding packaging');
//   }
// };





//===========================14/09/2024[Original One My code  ]======================================//

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import api from "../../../../../services/api";

// const initialFormData = {
//   item: "",
//   companyName: "",
//   supplierName: "",
//   purchaseVoucherNo: "",
//   quantity: 0,
//   unit: "",
//   alternativeunit: "",
//   price: 0,
//   amount: 0,
//   packagingDetails: {
//     boxCount: 0,
//     boxDetails: [{ boxNumber: 0, itemCount: 0 }],
//   },
//   totalBoxes: 0,
//   totalPieces: 0,
//   detailedCalculations: [],
// };

// const PackagingForm = () => {
//   const [formData, setFormData] = useState(initialFormData);

//   useEffect(() => {
//     // Only run if boxDetails changes
//     const { boxDetails } = formData.packagingDetails;

//     // Check if boxDetails is not empty
//     if (boxDetails && boxDetails.length > 0) {
//       const { totalBoxes, totalPieces, detailedCalculations } =
//         calculateTotals(boxDetails);

//       // Only update the state if there are changes
//       if (
//         totalBoxes !== formData.totalBoxes ||
//         totalPieces !== formData.totalPieces ||
//         JSON.stringify(detailedCalculations) !==
//           JSON.stringify(formData.detailedCalculations)
//       ) {
//         setFormData({
//           ...formData,
//           totalBoxes,
//           totalPieces,
//           packagingDetails: {
//             ...formData.packagingDetails,
//             boxDetails: detailedCalculations,
//           },
//           detailedCalculations,
//         });
//       }
//     }
//   }, [formData.packagingDetails.boxDetails]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handlePackagingDetailChange = (index, e) => {
//     const { name, value } = e.target;
//     const newBoxDetails = [...formData.packagingDetails.boxDetails];
//     newBoxDetails[index][name] = parseInt(value, 10);
//     setFormData({
//       ...formData,
//       packagingDetails: {
//         ...formData.packagingDetails,
//         boxDetails: newBoxDetails,
//       },
//     });
//   };

//   const handleAddBoxDetail = () => {
//     setFormData({
//       ...formData,
//       packagingDetails: {
//         ...formData.packagingDetails,
//         boxDetails: [
//           ...formData.packagingDetails.boxDetails,
//           { boxNumber: 0, itemCount: 0 },
//         ],
//       },
//     });
//   };

//   const calculateTotals = (boxDetails) => {
//     let totalBoxes = 0;
//     let totalPieces = 0;
//     const detailedCalculations = [];

//     boxDetails.forEach((box) => {
//       const pieces = box.boxNumber * box.itemCount;
//       totalBoxes += box.boxNumber;
//       totalPieces += pieces;
//       detailedCalculations.push({
//         ...box,
//         totalPieces: pieces, // Ensure totalPieces is included
//       });
//     });

//     return { totalBoxes, totalPieces, detailedCalculations };
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/api/packaging", formData);
//       alert("Packaging added successfully!");
//       // Reset the form after successful submission
//       setFormData(initialFormData);
//     } catch (error) {
//       console.error("Error adding packaging:", error.response.data);
//       alert("Error adding packaging");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Item Name:
//         <input
//           type="text"
//           name="item"
//           value={formData.item}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Company Name:
//         <input
//           type="text"
//           name="companyName"
//           value={formData.companyName}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Supplier Name:
//         <input
//           type="text"
//           name="supplierName"
//           value={formData.supplierName}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Purchase Voucher Number:
//         <input
//           type="text"
//           name="purchaseVoucherNo"
//           value={formData.purchaseVoucherNo}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Quantity:
//         <input
//           type="number"
//           name="quantity"
//           value={formData.quantity}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Unit:
//         <input
//           type="text"
//           name="unit"
//           value={formData.unit}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Alternative Unit:
//         <input
//           type="text"
//           name="alternativeunit"
//           value={formData.alternativeunit}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Price:
//         <input
//           type="number"
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Amount:
//         <input
//           type="number"
//           name="amount"
//           value={formData.amount}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Box Count:
//         <input
//           type="number"
//           name="boxCount"
//           value={formData.packagingDetails.boxCount}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               packagingDetails: {
//                 ...formData.packagingDetails,
//                 boxCount: e.target.value,
//               },
//             })
//           }
//         />
//       </label>
//       {formData.packagingDetails.boxDetails.map((box, index) => (
//         <div key={index}>
//           <label>
//             Box Number:
//             <input
//               type="number"
//               name="boxNumber"
//               value={box.boxNumber}
//               onChange={(e) => handlePackagingDetailChange(index, e)}
//             />
//           </label>
//           <label>
//             Item Count:
//             <input
//               type="number"
//               name="itemCount"
//               value={box.itemCount}
//               onChange={(e) => handlePackagingDetailChange(index, e)}
//             />
//           </label>
//         </div>
//       ))}
//       <button type="button" onClick={handleAddBoxDetail}>
//         Add Box Detail
//       </button>
//       <div>
//         <h3>Detailed Calculations:</h3>
//         {formData.detailedCalculations.map((calc, index) => (
//           <div key={index}>
//             {calc.boxNumber} box X {calc.itemCount} pcs = {calc.totalPieces} pcs
//           </div>
//         ))}
//       </div>
//       <div>
//         <strong>Total Boxes:</strong> {formData.totalBoxes}
//       </div>
//       <div>
//         <strong>Total Pieces:</strong> {formData.totalPieces}
//       </div>
//       <button type="submit">Add Packaging</button>
//     </form>
//   );
// };

// export default PackagingForm;


//================================Updated form [get data from Api ]======================================================//



import api from "../../../../../services/api";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useState, useEffect, useRef } from "react";
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
import { useNavigate } from "react-router-dom";
import Header from "../../../../schema/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
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

const initialFormData = {
  item: "",
  companyName: "",
  supplierName: "",
  purchaseVoucherNo: "",
  quantity: 0,
  unit: "",
  alternativeunit: "",
  price: 0,
  amount: 0,
  packagingDetails: {
    boxCount: 0,
    boxDetails: [{ boxNumber: 0, itemCount: 0 }],
  },
  totalBoxes: 0,
  totalPieces: 0,
  detailedCalculations: [],    
};

export default function PackagingForm() {
  const navigate = useNavigate("");
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    // Only run if boxDetails changes
    const { boxDetails } = formData.packagingDetails;

    // Check if boxDetails is not empty
    if (boxDetails && boxDetails.length > 0) {
      const { totalBoxes, totalPieces, detailedCalculations } =
        calculateTotals(boxDetails);

      // Only update the state if there are changes
      if (
        totalBoxes !== formData.totalBoxes ||
        totalPieces !== formData.totalPieces ||
        JSON.stringify(detailedCalculations) !==
          JSON.stringify(formData.detailedCalculations)
      ) {
        setFormData({
          ...formData,
          totalBoxes,
          totalPieces,
          packagingDetails: {
            ...formData.packagingDetails,
            boxDetails: detailedCalculations,
          },
          detailedCalculations,
        });
      }
    }
  }, [formData.packagingDetails.boxDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePackagingDetailChange = (index, e) => {
    const { name, value } = e.target;
    const newBoxDetails = [...formData.packagingDetails.boxDetails];
    newBoxDetails[index][name] = parseInt(value, 10);
    setFormData({
      ...formData,
      packagingDetails: {
        ...formData.packagingDetails,
        boxDetails: newBoxDetails,
      },
    });
  };

  const handleAddBoxDetail = () => {
    setFormData({
      ...formData,
      packagingDetails: {
        ...formData.packagingDetails,
        boxDetails: [
          ...formData.packagingDetails.boxDetails,
          { boxNumber: 0, itemCount: 0 },
        ],
      },
    });
  };

  const calculateTotals = (boxDetails) => {
    let totalBoxes = 0;
    let totalPieces = 0;
    const detailedCalculations = [];

    boxDetails.forEach((box) => {
      const pieces = box.boxNumber * box.itemCount;
      totalBoxes += box.boxNumber;
      totalPieces += pieces;
      detailedCalculations.push({
        ...box,
        totalPieces: pieces, // Ensure totalPieces is included
      });
    });

    return { totalBoxes, totalPieces, detailedCalculations };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/packaging", formData);
      alert("Packaging added successfully!");
      // Reset the form after successful submission
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error adding packaging:", error.response.data);
      alert("Error adding packaging");
    }
  };

  //======================= useRef start===============================================================//

  const firstFieldRef = useRef(null);
  const secondFieldRef = useRef(null);
  const thirdFieldRef = useRef(null);
  const fourthFieldRef = useRef(null);
  const fifthFieldRef = useRef(null);
  const sixthFieldRef = useRef(null);
  const sevenFieldRef = useRef(null);
  const eightFieldRef = useRef(null);
  const nineFieldRef = useRef(null);
  const tenFieldRef = useRef(null);
  const elevanFieldRef = useRef(null);
  const twelveFieldRef = useRef(null);

  // // Handle key press to move focus and open checkbox
  const handleKeyPress = (e, nextFieldRef) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission

      // Open the checkbox if not already open
      // if (!showOpeningStock) {
      //   setShowOpeningStock(true);
      // }

      // // Move focus to the next field
      if (nextFieldRef.current) {
        nextFieldRef.current.focus();
      }
    }
  };

  useEffect(() => {
    if (firstFieldRef.current) {
      firstFieldRef.current.focus();
    }
  }, []);

  //======================= useRef End===============================================================//

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
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div className="row d-flex justify-content-between">
                        <div className="col-xl-6 col-md-6 d-flex justify-content-end">
                          <h5 className="fw-bold text-center">Add Packaging</h5>
                        </div>
                        <div className="col-xl-6 col-md-6 d-flex justify-content-end mb-1">
                          <Button
                            onClick={() => {
                              navigate("/packaging_list");
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

                              <div className="col-xl-4 col-md-4">
                                <TextField
                                  label="Item Name"
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
                                  type="text"
                                  name="item"
                                  value={formData.item}
                                  onChange={handleChange}
                                  inputRef={firstFieldRef}
                                  autoFocus
                                  onKeyDown={(e) =>
                                    handleKeyPress(e, secondFieldRef)
                                  }
                                />
                              </div>

                              <div className="col-xl-4 col-md-4">
                                <TextField
                                  label="Company Name"
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
                                  type="text"
                                  name="companyName"
                                  value={formData.companyName}
                                  onChange={handleChange}
                                  autoFocus
                                  inputRef={secondFieldRef}
                                  onKeyDown={(e) =>
                                    handleKeyPress(e, thirdFieldRef)
                                  }
                                />
                              </div>

                              <div className="col-xl-3 col-md-4">
                                <TextField
                                  label="Supplier Name"
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
                                  type="text"
                                  name="supplierName"
                                  value={formData.supplierName}
                                  onChange={handleChange}
                                  inputRef={thirdFieldRef} // Assign the ref to this field
                                  onKeyDown={(e) =>
                                    handleKeyPress(e, fourthFieldRef)
                                  }
                                />
                              </div>

                              <div className="col-xl-3 col-md-4">
                                <TextField
                                  label="Purchase Voucher No."
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
                                  type="text"
                                  name="purchaseVoucherNo"
                                  value={formData.purchaseVoucherNo}
                                  onChange={handleChange}
                                  inputRef={fourthFieldRef} // Assign the ref to this field
                                  onKeyDown={(e) =>
                                    handleKeyPress(e, fifthFieldRef)
                                  }
                                />
                              </div>

                              <div className="col-xl-3 col-md-4">
                                <TextField
                                  label="Quantity"
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
                                  type="number"
                                  name="quantity"
                                  value={formData.quantity}
                                  onChange={handleChange}
                                  inputRef={fifthFieldRef} // Assign the ref to this field
                                  onKeyDown={(e) =>
                                    handleKeyPress(e, sixthFieldRef)
                                  } // Move to next field on Enter
                                />
                              </div>

                              <div className="row mt-2 mb-1">
                                <div className="col-xl-6">
                                  <div className="row">
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
                                    <div className="col-xl-6 col-md-6">
                                      <FormControl fullWidth>
                                        <TextField
                                          label="Main Unit"
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
                                          type="text"
                                          name="unit"
                                          value={formData.unit}
                                          onChange={handleChange}
                                          inputRef={sixthFieldRef} // Assign the ref to this field
                                          onKeyDown={(e) =>
                                            handleKeyPress(e, sevenFieldRef)
                                          } // Move to next field on Ente
                                        />
                                      </FormControl>
                                    </div>
                                    <div className="col-xl-6 col-md-6">
                                      <FormControl fullWidth>
                                        <TextField
                                          label="Alternative Unit"
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
                                          type="text"
                                          name="alternativeunit"
                                          value={formData.alternativeunit}
                                          onChange={handleChange}
                                          inputRef={sevenFieldRef} // Assign the ref to this field
                                          onKeyDown={(e) =>
                                            handleKeyPress(e, eightFieldRef)
                                          } // Move to next field on Ente
                                        />
                                      </FormControl>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-xl-6">
                                  <div className="row mb-0">
                                    <div className="col-xl-12">
                                      <h6
                                        className="fw-bold"
                                        style={{ color: "rgb(1, 87, 155)" }}
                                      >
                                        Pricing{" "}
                                      </h6>
                                    </div>
                                    <div className="row">
                                      <div className="col-xl-6 col-md-4">
                                        <TextField
                                          label="Price"
                                          fullWidth
                                          size="small"
                                          required
                                          InputProps={{
                                            style: { fontSize: "0.875rem" },
                                          }}
                                          InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: "0.875rem" },
                                          }}
                                          type="number"
                                          name="price"
                                          value={formData.price}
                                          onChange={handleChange}
                                          inputRef={eightFieldRef} // Assign the ref to this field
                                          onKeyDown={(e) =>
                                            handleKeyPress(e, nineFieldRef)
                                          } // Move to next field on Ente
                                        />
                                      </div>

                                      <div className="col-xl-6 col-md-4">
                                        <TextField
                                          label="Amount"
                                          fullWidth
                                          size="small"
                                          required
                                          InputProps={{
                                            style: { fontSize: "0.875rem" },
                                          }}
                                          InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: "0.875rem" },
                                          }}
                                          type="number"
                                          name="amount"
                                          value={formData.amount}
                                          onChange={handleChange}
                                          inputRef={nineFieldRef} // Assign the ref to this field
                                          onKeyDown={(e) =>
                                            handleKeyPress(e, tenFieldRef)
                                          } // Move to next field on Ente
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row ">
                                <div className="col-xl-12 d-flex mt-2">
                                  <span className="pt-1">
                                    <h6
                                      className="fw-bold"
                                      style={{ color: "rgb(1, 87, 155)" }}
                                    >
                                      Box Detail{" "}
                                    </h6>
                                  </span>

                                  <span>
                                    <Tooltip
                                      title="Add Box detail"
                                      placement="top-start"
                                    >
                                      <IconButton
                                        onClick={handleAddBoxDetail}
                                        sx={{ ml: 1 }}
                                        style={{
                                          background: "#ffe0b2",
                                          width: "20px",
                                          height: "20px",
                                        }}
                                      >
                                        <AddIcon style={{ fontSize: "17px" }} />
                                      </IconButton>
                                    </Tooltip>
                                  </span>
                                </div>

                                <div className="col-xl-3 col-md-4">
                                  <TextField
                                    label="Box Count"
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
                                    type="number"
                                    name="boxCount"
                                    value={formData.packagingDetails.boxCount}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        packagingDetails: {
                                          ...formData.packagingDetails,
                                          boxCount: e.target.value,
                                        },
                                      })
                                    }
                                    className="mt-1"
                                    inputRef={tenFieldRef} // Assign the ref to this field
                                    onKeyDown={(e) =>
                                      handleKeyPress(e, elevanFieldRef)
                                    } // Move to next field on Ente
                                  />
                                </div>
                                <div className="row">
                                  <div className="col-xl-12 col-md-4">
                                    {formData.packagingDetails.boxDetails.map(
                                      (box, index) => (
                                        <div className="row" key={index}>
                                          <div className="col-xl-3">
                                            <TextField
                                              label="Box Number"
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
                                              type="number"
                                              name="boxNumber"
                                              value={box.boxNumber}
                                              onChange={(e) =>
                                                handlePackagingDetailChange(
                                                  index,
                                                  e
                                                )
                                              }
                                              inputRef={elevanFieldRef} // Assign the ref to this field
                                              onKeyDown={(e) =>
                                                handleKeyPress(
                                                  e,
                                                  twelveFieldRef
                                                )
                                              } // Move to next field on Ente
                                            />
                                          </div>

                                          <div className="col-xl-3">
                                            <TextField
                                              label="Item Count"
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
                                              type="number"
                                              name="itemCount"
                                              value={box.itemCount}
                                              onChange={(e) =>
                                                handlePackagingDetailChange(
                                                  index,
                                                  e
                                                )
                                              }
                                              inputRef={twelveFieldRef}
                                            />
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-xl-12">
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
                                              Box Detail
                                            </TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody
                                          sx={{
                                            background: "white",
                                            overflowY: "auto",
                                          }}
                                        >
                                          {formData.detailedCalculations.map(
                                            (calc, index) => (
                                              <TableRow>
                                                <TableCell
                                                  sx={{
                                                    border:
                                                      "1px solid lightgray",
                                                    padding: "0px",
                                                  }}
                                                  align="center"
                                                  key={index}
                                                >
                                                  {calc.boxNumber} box X {calc.itemCount} pcs = {calc.totalPieces} pcs
                                                  
                                                  
                                                </TableCell>
                                              </TableRow>
                                            )
                                          )}

                                          <TableRow>
                                            <TableCell
                                              sx={{
                                                border: "1px solid #e0e0e0",
                                                padding: "5px",
                                                fontSize: "13px",
                                                fontWeight: "bold",
                                                color: "#1565c0", // Highlight the totals
                                              }}
                                              align="center"
                                              colSpan={2} // Span across two columns for totals
                                            >
                                              Total Boxes -{" "}
                                              {formData.totalBoxes} | Total
                                              Pieces - {formData.totalPieces}
                                            </TableCell>
                                          </TableRow>
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-xl-2 col-md-3 d-flex justify-content-center mx-auto mb-2">
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
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}







































