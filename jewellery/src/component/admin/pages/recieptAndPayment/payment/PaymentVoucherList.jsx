import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Header from "../../../../schema/Header";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import api from "../../../../../services/api";

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
    to="/user_category"
    className="text-decoration-none"
    style={{ fontSize: "15px" }}
  >
    User Category
  </Link>,

  <Typography key="4" color="text.secondary" style={{ fontSize: "15px" }}>
    Account Master
  </Typography>,
];

export default function PaymentVoucherList() {
  const navigate = useNavigate("");

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await api.get("/api/payments");
        if (Array.isArray(response.data)) {
          setPayments(response.data);
        } else {
          console.error("Unexpected response format", response.data);
        }
      } catch (error) {
        console.error("Error fetching payments", error);
      }
    };
    fetchPayments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/payments/${id}`);
      // Refresh the list after deletion
      setPayments(payments.filter((payment) => payment._id !== id));
    } catch (error) {
      console.error("Error deleting payment", error);
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
              <Box component="main" sx={{ flexGrow: 1 }}>
                <DrawerHeader />
                <div className="container-fluid">
                  <div className="row mt-2">
                    <div className="col-xl-12">
                      <div className="row d-flex justify-content-between">
                        <div className="col-xl-3">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              navigate("/add_payment_voucher");
                            }}
                            size="small"
                            className="fw-bold"
                          >
                            Add Payment Voucher
                          </Button>
                        </div>
                        <div className="col-xl-9 d-flex justify-content-end">
                          <Grid
                            container
                            spacing={2}
                            alignItems="center"
                            className="d-flex justify-content-end mb-2"
                          >
                            <Grid item xs={12} md={6} lg={4} xl={3}>
                              <TextField
                                size="small"
                                fullWidth
                                id="search"
                                label="Search by Name or Account ID"
                                variant="outlined"
                                name="searchTerm"
                              />
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-1">
                    <div className="col-xl-12">
                      <TableContainer
                        component={Paper}
                        className="d-flex justify-content-center"
                      >
                        <Table
                          sx={{ minWidth: 650 }}
                          size="small"
                          aria-label="a dense table"
                          className="bordered"
                        >
                          <TableHead>
                            <TableRow style={{ background: "#bbdefb" }}>
                              <TableCell align="left" className="fw-bold">
                                #
                              </TableCell>
                              <TableCell align="left" className="fw-bold">
                                Invoice Number
                              </TableCell>

                              <TableCell align="left" className="fw-bold">
                                Voucher Number
                              </TableCell>
                              <TableCell align="left" className="fw-bold">
                                Supplier Name
                              </TableCell>

                              <TableCell align="left" className="fw-bold">
                                Amount
                              </TableCell>
                              <TableCell align="left" className="fw-bold">
                                Payment Date
                              </TableCell>
                              <TableCell align="left" className="fw-bold">
                                Payment Mode
                              </TableCell>
                              <TableCell align="left" className="fw-bold">
                                Action
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {Array.isArray(payments) && payments.length > 0 ? (
                              payments.map((payment, index) => (
                                <TableRow
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                  key={payment._id}
                                >
                                  <TableCell align="left">
                                    {index + 1}
                                  </TableCell>
                                  <TableCell align="left">
                                    {payment.invoiceNumber}
                                  </TableCell>

                                  <TableCell align="left">
                                    {payment.voucherNumber}
                                  </TableCell>
                                  <TableCell align="left">
                                    {payment.supplierName}
                                  </TableCell>
                                  <TableCell align="left">
                                    ${payment.amount}
                                  </TableCell>

                                  <TableCell align="left">
                                    {payment.paymentMethod}
                                  </TableCell>

                                  <TableCell align="left">
                                    {new Date(
                                      payment.paymentDate
                                    ).toLocaleDateString()}
                                  </TableCell>

                                  <TableCell align="left">
                                    <Button
                                      variant="contained"
                                      color="warning"
                                      size="small"
                                      style={{
                                        marginRight: "10px",
                                        background: "#ffe0b2",
                                      }}
                                    >
                                      <RemoveRedEyeIcon
                                        style={{ color: "#ff9100" }}
                                      />
                                    </Button>

                                    <Link
                                      to={`/update_payment_voucher/${payment._id}`}
                                    >
                                      <Button
                                        variant="contained"
                                        color="success"
                                        size="small"
                                        style={{
                                          marginRight: "10px",
                                          background: "#a5d6a7",
                                        }}
                                        className="text-success"
                                      >
                                        <EditRoundedIcon />
                                      </Button>
                                    </Link>

                                    <Button
                                      variant="contained"
                                      onClick={() => handleDelete(payment._id)}
                                      color="error"
                                      size="small"
                                      style={{ background: "#ffab91" }}
                                    >
                                      <DeleteIcon className="text-danger" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </div>
                </div>
              </Box>
            </Box>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
