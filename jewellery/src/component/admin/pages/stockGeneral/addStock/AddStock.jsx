import { useParams } from "react-router-dom";
import api from "../../../../../services/api";
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
  Checkbox,
} from "@mui/material";
import Header from "../../../../schema/Header";

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

export default function AddStock({ onSuccess }) {
  const navigate = useNavigate();
  const { id } = useParams(); // Ensure the correct parameter name is used

  const [formData, setFormData] = useState({
    date: "",
    item: "",
    quantity: "",
    price: "",
    amount: "",
    unit: "",
    itemsConsumed: "",
    shortNarration: "",
    voucherNumber: "",
  });

  useEffect(() => {
    if (id) {
      api
        .get(`/api/entries/${id}`)
        .then((response) => {
          console.log("API response:", response.data); // Debugging
          setFormData({
            date: response.data.date ? response.data.date.substring(0, 10) : "", // Format date for input
            item: response.data.item || "",
            quantity: response.data.quantity || "",
            price: response.data.price || "",
            amount: response.data.amount || "",
            unit: response.data.unit || "",
            itemsConsumed: response.data.itemsConsumed || "",
            shortNarration: response.data.shortNarration || "",
            voucherNumber: response.data.voucherNumber || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching entry:", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      // Automatically calculate amount if quantity or price changes
      if (name === "quantity" || name === "price") {
        updatedData.amount =
          (updatedData.quantity || 0) * (updatedData.price || 0);
      }

      return updatedData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = id ? `/api/entries/${id}` : "/api/entries";
    const method = id ? "put" : "post";

    api[method](url, formData)
      .then((response) => {
        if (typeof onSuccess === "function") {
          onSuccess(); // Call onSuccess if it is a function
        }
        navigate("/stock_list");
      })
      .catch((error) => {
        console.error("Error saving entry:", error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Header />

            <Box component="main">
              <DrawerHeader />
              <div className="row mt-0">
                <div className="col-xl-12">
                  <Box component="form" onSubmit={handleSubmit}>
                    <ToastContainer />
                    <div className="row">
                      <div className="col-xl-12 ">
                        <div className="row">
                          <div className="row mx-start d-flex ">
                            <div className="col-xl-12">
                              <div className="row">
                                <div className="col-xl-6">
                                  <h4>
                                    <span
                                      style={{
                                        fontSize: "20px",
                                        color: "rgb(1, 87, 155)",
                                      }}
                                      className="fw-bold"
                                    >
                                      Add Stock
                                    </span>
                                  </h4>
                                </div>
                                <div className="col-xl-6 d-flex justify-content-end">
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                      navigate("/stock_list");
                                    }}
                                    size="small"
                                    className="fw-bold"
                                  >
                                    All Stock Entry
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-xl-3 d-flex">
                                <FormControl fullWidth>
                                  <TextField
                                    label="Date"
                                    margin="normal"
                                    size="small"
                                    type="date"
                                    name="date"
                                    value={formData.date || ""} // Ensure default empty string
                                    onChange={handleChange}
                                    placeholder="Select Date"
                                    required
                                    InputLabelProps={{ shrink: true }}
                                  />
                                </FormControl>
                              </div>

                              <div className="col-xl-3 d-flex">
                                <FormControl fullWidth>
                                  <TextField
                                    label="Voucher Number"
                                    margin="normal"
                                    size="small"
                                    type="text"
                                    name="voucherNumber"
                                    value={formData.voucherNumber || ""} // Ensure default empty string
                                    onChange={handleChange}
                                    placeholder="Voucher Number"
                                    required
                                  />
                                </FormControl>
                              </div>

                              <div className="col-xl-6 d-flex">
                                <FormControl fullWidth>
                                  <TextField
                                    label="Short Description"
                                    margin="normal"
                                    size="small"
                                    type="text"
                                    name="shortNarration"
                                    value={formData.shortNarration || ""} // Ensure default empty string
                                    onChange={handleChange}
                                    placeholder="Short Description"
                                  />
                                </FormControl>
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
                                          Price Per Unit
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
                                          Item Consumed
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
                                          Total Amount
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
                                            width: "250px",
                                          }}
                                          align="center"
                                        >
                                          <FormControl fullWidth>
                                            <TextField
                                              size="small"
                                              label=""
                                              variant="standard"
                                              type="text"
                                              name="item"
                                              value={formData.item || ""} // Ensure default empty string
                                              onChange={handleChange}
                                              placeholder="Item Name"
                                              required
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
                                            name="unit"
                                            size="small"
                                            sx={{ fontSize: "12px" }}
                                            variant="standard"
                                            type="text"
                                            value={formData.unit || ""} // Ensure default empty string
                                            onChange={handleChange}
                                            placeholder="Unit (e.g., kg, liters)"
                                            required
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
                                            sx={{ fontSize: "12px" }}
                                            variant="standard"
                                            type="number"
                                            name="quantity"
                                            value={formData.quantity || ""} // Ensure default empty string
                                            onChange={handleChange}
                                            placeholder="Quantity"
                                            required
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
                                            sx={{ fontSize: "12px" }}
                                            variant="standard"
                                            type="number"
                                            name="price"
                                            value={formData.price || ""} // Ensure default empty string
                                            onChange={handleChange}
                                            placeholder="Price per Unit"
                                            required
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
                                            sx={{ fontSize: "12px" }}
                                            variant="standard"
                                            type="number"
                                            name="itemsConsumed"
                                            value={formData.itemsConsumed || ""} // Ensure default empty string
                                            onChange={handleChange}
                                            placeholder="Items Consumed"
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
                                            InputProps={{
                                              readOnly: true,
                                            }}
                                            size="small"
                                            variant="standard"
                                            type="number"
                                            name="amount"
                                            value={formData.amount || ""} // Ensure default empty string
                                            onChange={handleChange}
                                            placeholder="Total Amount"
                                            required
                                            //   readOnly
                                          />
                                        </TableCell>
                                      </TableRow>
                                     
                                    </TableBody>
                                  </Table>
                                </TableContainer>

                                <h5 className="text-end me-2 mt-2">
                                  <span className="fw-bold me-2">
                                    Total Amount:
                                  </span>
                                  {formData.amount || ""}
                                </h5>
                              </div>
                            </div>

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
                  </Box>
                </div>
              </div>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
}
