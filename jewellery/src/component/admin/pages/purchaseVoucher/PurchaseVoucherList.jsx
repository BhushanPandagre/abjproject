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
import Header from "../../../schema/Header";
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
import PrintIcon from "@mui/icons-material/Print"; // Import the print icon
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import { InputAdornment, IconButton } from "@mui/material";
import api from "../../../../services/api";

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

export default function PurchaseVoucherList() {
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPurchases, setFilteredPurchases] = useState(purchases);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    // Fetch purchases data from the backend
    const fetchPurchases = async () => {
      try {
        const response = await api.get("/api/purchases");
        setPurchases(response.data);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    };

    fetchPurchases();
  }, []);

  useEffect(() => {
    const filtered = purchases.filter((purchase) => {
      const isWithinDateRange =
        (!startDate ||
          new Date(purchase.purchaseDate) >= new Date(startDate)) &&
        (!endDate || new Date(purchase.purchaseDate) <= new Date(endDate));

      const matchesSearchTerm =
        (purchase.supplierName?.toLowerCase() || "").includes(searchTerm) ||
        (purchase.supplierVoucherNo?.toString() || "")
          .toLowerCase()
          .includes(searchTerm);

      return isWithinDateRange && matchesSearchTerm;
    });

    setFilteredPurchases(filtered);
  }, [searchTerm, startDate, endDate, purchases]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleNavigateToAddPurchase = () => {
    navigate("/add_purchase_voucher"); // Define this route in your App component
  };

  const handleViewPurchase = (id) => {
    // Navigate to view purchase page
    navigate(`/view_purchase_item/${id}`);
  };

  const handleUpdatePurchase = (id) => {
    // Navigate to update purchase page
    navigate(`/update_purchase_item/${id}`);
  };

  // const handleDeletePurchase = async (id) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "Do you want to delete it!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         await api.delete(`/api/purchases/${id}`);
  //         setPurchases(purchases.filter((purchase) => purchase._id !== id));
  //         toast.success("Purchase Item Deleted successfully");
  //       } catch (err) {
  //         console.error(err);
  //         toast.error("Error deleting Purchase");
  //       }
  //     }
  //   });
  // };

  const handleDeletePurchase = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the purchase and update any associated records.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send the delete request to the backend
          const response = await api.delete(`/api/purchases/${id}`);

          // Check the response to ensure it was successful
          if (response.status === 200) {
            // Update the local state to remove the deleted purchase
            setPurchases((prevPurchases) =>
              prevPurchases.filter((purchase) => purchase._id !== id)
            );
            toast.success("Purchase Item Deleted successfully");
          } else {
            // Handle unexpected response
            toast.error("Unexpected response from server");
          }
        } catch (err) {
          console.error("Error deleting purchase:", err);
          toast.error("Error deleting Purchase");
        }
      }
    });
  };

  const handlePrintInvoice = (id) => {
    // Navigate to the invoice details page
    navigate(`/purchase_invoice/${id}`);
  };

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
                          <div className="col-xl-4">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleNavigateToAddPurchase}
                              size="small"
                              className="fw-bold"
                            >
                              Add Purchase Voucher
                            </Button>
                          </div>
                          <div className="col-xl-8 d-flex justify-content-start"></div>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-xl-12 mb-2">
                        <Grid
                          container
                          spacing={2}
                          alignItems="center"
                          className="d-flex justify-content-start mb-2"
                        >
                          <Grid
                            item
                            xs={12}
                            md={6}
                            lg={3}
                            xl={3}
                            className="d-flex justify-content-start"
                          >
                            <TextField
                              size="small"
                              fullWidth
                              id="search"
                              label="Search by Supplier Name"
                              variant="outlined"
                              name="searchTerm"
                              value={searchTerm}
                              onChange={handleSearchChange}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <IconButton>
                                      <SearchIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            md={6}
                            lg={3}
                            xl={3}
                            className="d-flex justify-content-end"
                          >
                            <TextField
                              size="small"
                              fullWidth
                              id="startDate"
                              label="Start Date"
                              type="date"
                              InputLabelProps={{ shrink: true }}
                              value={startDate}
                              onChange={handleStartDateChange}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            md={6}
                            lg={3}
                            xl={3}
                            className="d-flex justify-content-end"
                          >
                            <TextField
                              size="small"
                              fullWidth
                              id="endDate"
                              label="End Date"
                              type="date"
                              InputLabelProps={{ shrink: true }}
                              value={endDate}
                              onChange={handleEndDateChange}
                            />
                          </Grid>
                        </Grid>
                      </div>

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
                                  Purchase Date
                                </TableCell>
                                <TableCell align="left" className="fw-bold">
                                  Invoice Date
                                </TableCell>

                                <TableCell align="left" className="fw-bold">
                                  Supplier Name
                                </TableCell>
                                <TableCell align="left" className="fw-bold">
                                  Company Name
                                </TableCell>
                                <TableCell align="left" className="fw-bold">
                                  Total Amount
                                </TableCell>

                                <TableCell align="left" className="fw-bold">
                                  Actions
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {filteredPurchases.map((purchase, index) => (
                                <TableRow
                                  key={purchase._id}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell align="left">
                                    {index + 1}
                                  </TableCell>
                                  <TableCell align="left">
                                    {format(
                                      new Date(purchase.purchaseDate),
                                      "dd-MM-yyyy"
                                    )}
                                  </TableCell>
                                  <TableCell align="left">
                                    {format(
                                      new Date(purchase.invoiceDate),
                                      "dd-MM-yyyy"
                                    )}
                                  </TableCell>

                                  <TableCell align="left">
                                    {purchase.supplierName}
                                  </TableCell>
                                  <TableCell align="left">
                                    {purchase.companyName}
                                  </TableCell>
                                  <TableCell align="left">
                                    {purchase.itemsList.reduce(
                                      (total, item) =>
                                        total + item.quantity * item.price,
                                      0
                                    )}
                                  </TableCell>

                                  <TableCell align="left">
                                    <Button
                                      variant="contained"
                                      color="warning"
                                      size="small"
                                      onClick={() =>
                                        handleViewPurchase(purchase._id)
                                      }
                                      style={{
                                        marginRight: "10px",
                                        background: "#ffe0b2",
                                      }}
                                    >
                                      <RemoveRedEyeIcon
                                        style={{ color: "#ff9100" }}
                                      />
                                    </Button>

                                    <Button
                                      variant="contained"
                                      color="success"
                                      size="small"
                                      onClick={() =>
                                        handleUpdatePurchase(purchase._id)
                                      }
                                      style={{
                                        marginRight: "10px",
                                        background: "#a5d6a7",
                                      }}
                                      className="text-success"
                                    >
                                      <EditRoundedIcon />
                                    </Button>
                                    {/* </Link> */}

                                    <Button
                                      variant="contained"
                                      onClick={() =>
                                        handleDeletePurchase(purchase._id)
                                      }
                                      color="error"
                                      size="small"
                                      style={{
                                        background: "#ffab91",
                                        marginRight: "10px",
                                      }}
                                    >
                                      <DeleteIcon className="text-danger" />
                                    </Button>

                                    <Button
                                      variant="contained"
                                      onClick={() =>
                                        handlePrintInvoice(purchase._id)
                                      }
                                      color="secondary"
                                      size="small"
                                      style={{ background: "gray" }}
                                    >
                                      <PrintIcon className="text-light" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
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
    </div>
  );
}
