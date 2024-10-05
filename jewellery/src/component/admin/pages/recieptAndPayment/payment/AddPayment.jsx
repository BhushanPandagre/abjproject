import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { FormControl, InputLabel, Select, IconButton } from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../../../../schema/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Dialog, Autocomplete,MenuItem  } from "@mui/material";
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
import api from "../../../../../services/api";

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

export default function AddPayment() {
  const [formData, setFormData] = useState({
    voucherNumber: "",
    supplierName: "",
    companyName: "",
    amount: "",
    paymentDate: "",
    paymentMethod: "",
    notes: "",
  });

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch companies data
    const fetchCompanies = async () => {
      try {
        const response = await api.get("/api/purchases"); // Adjust API endpoint if needed
        const companyList = response.data.map((item) => item.companyName);
        setCompanies([...new Set(companyList)]); // Remove duplicates
      } catch (error) {
        console.error("Error fetching companies", error);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    // Fetch payment details if id exists
    if (id) {
      const fetchPayment = async () => {
        try {
          const response = await api.get(`/api/payments/${id}`);
          const data = response.data;
          setFormData({
            ...data,
            paymentDate: new Date(data.paymentDate).toISOString().split("T")[0], // Convert to YYYY-MM-DD format
          });
          setSelectedCompany(data.companyName); // Set the selected company
        } catch (error) {
          console.error("Error fetching payment", error);
        }
      };
      fetchPayment();
    }
  }, [id]);

  useEffect(() => {
    // Fetch supplier name when company is selected
    const fetchSupplier = async () => {
      if (selectedCompany) {
        try {
          const response = await api.get(
            `/api/purchases?companyName=${selectedCompany}`
          );
          if (response.data.length > 0) {
            const supplierName = response.data.find(
              (item) => item.companyName === selectedCompany
            )?.supplierName;
            setFormData((prevState) => ({
              ...prevState,
              supplierName: supplierName || "", // Use empty string if supplierName is not found
            }));
          } else {
            setFormData((prevState) => ({
              ...prevState,
              supplierName: "", // Reset supplierName if no data is found
            }));
          }
        } catch (error) {
          console.error("Error fetching supplier", error);
        }
      }
    };

    fetchSupplier();
  }, [selectedCompany]);

  const handleCompanyChange = (event) => {
    const selected = event.target.value;
    setSelectedCompany(selected);
    setFormData((prevState) => ({
      ...prevState,
      companyName: selected, // Update companyName in formData
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/api/payments/${id}`, formData);
      } else {
        await api.post("/api/payments", formData);
      }
      navigate("/payment_voucher_detail"); // Redirect to the payment list page after save
    } catch (error) {
      console.error("Error saving payment", error);
    }
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

                <div className="row mt-0">
                  <div className="col-xl-12">
                    <Box component="form" onSubmit={handleSubmit}>
                      <ToastContainer />
                      <div className="row">
                        <div className="col-xl-12 ">
                          <div className="row">
                            <div className="row mx-start d-flex ">
                              <div className="col-xl-12">
                                <h4>
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      color: "rgb(1, 87, 155)",
                                    }}
                                    className="fw-bold"
                                  >
                                    Add Payment Voucher
                                  </span>
                                </h4>
                              </div>

                              <div className="row">

                              <div className="col-xl-3">
                                {/* <FormControl fullWidth margin="normal">
                                  <InputLabel>Company Name</InputLabel>
                                  <Select
                                    value={formData.companyName}
                                    onChange={handleCompanyChange}
                                    label="Company Name"
                                    size="small"
                                    variant="outlined"
                                  
                                  >
                                    {companies.map((company, index) => (
                                      <MenuItem key={index} value={company}>
                                        {company}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl> */}

<FormControl fullWidth margin="normal" variant="outlined" size="small">
  <InputLabel>Company Name</InputLabel>
  <Select
    value={formData.companyName}
    onChange={handleCompanyChange}
    label="Company Name"
  >
    {companies.map((company, index) => (
      <MenuItem key={index} value={company}>
        {company}
      </MenuItem>
    ))}
  </Select>
</FormControl>

                            


                              </div>


                                <div className="col-xl-3 d-flex">
                                  {/* <FormControl fullWidth>
                                    <TextField
                                      label="Supplier Name"
                                      margin="normal"
                                      size="small"
                                      required
                                      style={{ background: "#e3f2fd" }}
                                      name="supplierName"
                                      value={formData.supplierName}
                                      onChange={handleChange}
                                      placeholder="Supplier Name"
                                    />
                                  </FormControl> */}


                                <TextField
                                  label="Supplier Name"
                                  required
                                  fullWidth
                                  margin="normal"
                                  size="small"
                                  name="supplierName"
                                  value={formData.supplierName}
                                  onChange={handleChange}
                                  placeholder="Supplier Name"
                                  InputProps={{
                                    readOnly: true, // Make this field read-only
                                  }}
                                />



                                </div>

                              

                                <div className="col-xl-3">
                                  <TextField
                                    label="Voucher Number"
                                    required
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    name="voucherNumber"
                                    value={formData.voucherNumber}
                                    onChange={handleChange}
                                    placeholder="voucherNumber "
                                  />
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    required
                                    label="paymentDate"
                                    InputLabelProps={{ shrink: true }}
                                    name="paymentDate"
                                    type="date"
                                    value={formData.paymentDate}
                                    onChange={handleChange}
                                  />
                                </div>

                                <div className="col-xl-3">
                                  <TextField
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    required
                                    label="Payment Mode"
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={handleChange}
                                    placeholder="Payment Method"
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
                                            D/C
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
                                          <TableCell
                                            sx={{
                                              border: "1px solid lightgray",
                                              padding: "4px",
                                              background: "#bbdefb",
                                            }}
                                            className="p-0 fw-bold fixed"
                                            align="center"
                                          >
                                            Debit(Rs.)
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
                                            Credit(Rs.)
                                          </TableCell>
                                          <TableCell
                                            sx={{
                                              border: "1px solid lightgray",
                                              padding: "4px",
                                              background: "#bbdefb",
                                            }}
                                            className="p-0 fw-bold fixed"
                                            align="center"
                                            style={{ width: "370px" }}
                                          >
                                            Shot Note
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
                                            <span className="ps-2 pe-2"></span>
                                          </TableCell>
                                          <TableCell
                                            sx={{
                                              border: "1px solid lightgray",
                                              padding: "0px",
                                              width: "70px",
                                            }}
                                            align="center"
                                          >
                                            <FormControl
                                              fullWidth
                                            ></FormControl>
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
                                              name="amount"
                                              type="number"
                                              value={formData.amount}
                                              onChange={handleChange}
                                              placeholder="Amount"
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
                                              size="small"
                                              variant="standard"
                                              name="notes"
                                              value={formData.notes}
                                              onChange={handleChange}
                                              placeholder="Notes"
                                            />
                                          </TableCell>
                                        </TableRow>
                                        {/* )
                                        )} */}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>

                                  <h5 className="text-end me-2 mt-2">
                                    <span className="fw-bold me-2">
                                      Total Amount:{formData.amount}
                                    </span>
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
    </div>
  );
}
