import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
import PrintIcon from "@mui/icons-material/Print"; 
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import { InputAdornment, IconButton } from "@mui/material";
import Header from "../../../../schema/Header";
import api from "../../../../../services/api";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const breadcrumbs = [
  <Typography key="4" color="text.primary">
    Purchase Voucher Detail
  </Typography>,
];

export default function StockReport() {
  const navigate = useNavigate("");
  const [reportData, setReportData] = useState({
    totalQuantity: 0,
    totalAmount: 0,
    totalItemsConsumed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await api.get("/api/report");
        setReportData(response.data);
      } catch (error) {
        setError("Failed to fetch report data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  // Function to format numbers as Indian Rupees
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
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
                        <div className="col-xl-6">
                          <h4>
                            <span
                              style={{
                                fontSize: "20px",
                                color: "rgb(1, 87, 155)",
                              }}
                              className="fw-bold"
                            >
                              Stock Report
                            </span>
                          </h4>
                        </div>
                        <div className="col-xl-6 d-flex justify-content-end">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              navigate("/add_stock");
                            }}
                            size="small"
                            className="fw-bold"
                          >
                            Add Stock Entry
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3">
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
                                Total Quantity
                              </TableCell>
                              <TableCell align="left" className="fw-bold">
                                Total Amount
                              </TableCell>

                              <TableCell align="left" className="fw-bold">
                                Total Items Consumed
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="left">
                                {reportData.totalQuantity}
                              </TableCell>
                              <TableCell align="left">
                                {formatCurrency(reportData.totalAmount)}
                              </TableCell>
                              <TableCell align="left">
                                {reportData.totalItemsConsumed}
                              </TableCell>
                            </TableRow>

                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="left"></TableCell>
                            </TableRow>
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
    </>
  );
}
