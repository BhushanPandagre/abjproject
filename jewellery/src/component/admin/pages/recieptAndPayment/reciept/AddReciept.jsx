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

export default function AddReciept() {
  const [receipt, setReceipt] = useState({
    receiptNumber: "",
    paymentAmount: "",
    paymentDate: "",
    paymentMethod: "",
    voucherNumber: "",
    notes: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchReceipt = async () => {
        try {
          const response = await api.get(`/api/receipts/${id}`);
          const data = response.data;
          setReceipt({
            receiptNumber: data.receiptNumber || "",
            voucherNumber: data.voucherNumber || "",
            paymentAmount: data.paymentAmount || "",
            paymentDate: data.paymentDate
              ? new Date(data.paymentDate).toISOString().split("T")[0]
              : "",
            paymentMethod: data.paymentMethod || "",
            notes: data.notes || "",
          });
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching receipt:", error);
          setIsLoading(false);
        }
      };
      fetchReceipt();
    } else {
      setIsLoading(false); // No id means this is a create form
    }
  }, [id]);

  const handleChange = (e) => {
    setReceipt({ ...receipt, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedReceipt = {
        ...receipt,
        paymentDate: new Date(receipt.paymentDate).toISOString(), // Ensure date is correctly formatted
      };

      if (id) {
        await api.put(`/api/receipts/${id}`, formattedReceipt);
      } else {
        await api.post("/api/receipts", formattedReceipt);
      }
      navigate("/reciept_voucher_detail"); // Corrected navigation path
    } catch (error) {
      console.error("Error saving receipt:", error);
    }
  };

  if (isLoading) return <Typography>Loading...</Typography>;

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
                                    {id
                                      ? "Update Reciept Voucher"
                                      : "Add Reciept Voucher"}
                                  </span>
                                </h4>
                              </div>

                              <div className="row">
                                <div className="col-xl-3 d-flex">
                                  <FormControl fullWidth>
                                    <TextField
                                      style={{ background: "#e3f2fd" }}
                                      label="Receipt Number"
                                      margin="normal"
                                      size="small"
                                      required
                                      name="receiptNumber"
                                      value={receipt.receiptNumber}
                                      onChange={handleChange}
                                      fullWidth
                                    />
                                  </FormControl>
                                </div>

                                <div className="col-xl-3 d-flex">
                                  <FormControl fullWidth>
                                    <TextField
                                      label="Voucher Number"
                                      margin="normal"
                                      size="small"
                                      type="number"
                                      required
                                      name="voucherNumber"
                                      value={receipt.voucherNumber}
                                      onChange={handleChange}
                                      variant="outlined"
                                    />
                                  </FormControl>
                                </div>

                              

                                <div className="col-xl-3">
                                  <TextField
                                    fullWidth
                                    label="Payment Date"
                                    margin="normal"
                                    size="small"
                                    type="date"
                                    required
                                    name="paymentDate"
                                    value={receipt.paymentDate}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
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
                                            sx={{
                                              border: "1px solid lightgray",
                                              padding: "4px",
                                              background: "#bbdefb",
                                            }}
                                            className="p-0 fw-bold fixed"
                                            align="center"
                                            style={{ width: "150px" }}
                                          >
                                            Payment Method
                                          </TableCell>
                                          <TableCell
                                            sx={{
                                              border: "1px solid lightgray",
                                              padding: "4px",
                                              background: "#bbdefb",
                                            }}
                                            className="p-0 fw-bold fixed"
                                            align="center"
                                            style={{ width: "150px" }}
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
                                            style={{ width: "200px" }}
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
                                              // width: "70px",
                                            }}
                                            align="center"
                                          >
                                            <TextField
                                              sx={{ fontSize: "12px", }}
                                              fullWidth
                                              label=""
                                              margin="normal"
                                              size="small"
                                              required
                                              name="paymentMethod"
                                              value={receipt.paymentMethod}
                                              onChange={handleChange}
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
                                           
                                              sx={{ fontSize: "12px",}}
                                              variant="standard"

                                              fullWidth
                                              label=""
                                              margin="normal"
                                              size="small"
                                              type="number"
                                              required
                                              name="paymentAmount"
                                              value={receipt.paymentAmount}
                                              onChange={handleChange}
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
                                              sx={{ fontSize: "12px" }}
                                              fullWidth
                                              label=""
                                              margin="normal"
                                              size="small"
                                              required
                                              name="notes"
                                              value={receipt.notes}
                                              onChange={handleChange}
                                              placeholder="Notes"
                                              variant="standard"
                                            />
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  </TableContainer>

                                  <h5 className="text-end me-2 mt-2">
                                    <span className="fw-bold me-2">
                                      Total Amount: {receipt.paymentAmount}
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
