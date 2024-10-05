//================================ New Code ==========================

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Box,
  CssBaseline,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import Header from "../../../schema/Header";
import "react-toastify/dist/ReactToastify.css";

import { styled, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import { format } from "date-fns";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import api from "../../../../services/api";

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

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  margin: "5px", // Space between buttons
};

const breadcrumbs = [
  <Link
    underline="hover"
    key="1"
    color="inherit"
    to="/purchase_voucher_list"
    className="text-decoration-none"
  >
    Back
  </Link>,

  <Typography key="4" color="text.primary">
    View Purchase Voucher Item
  </Typography>,
];

export default function ViewPurchaseItem() {
  const { id } = useParams();
  const [purchase, setPurchase] = useState(null);
  const [itemDetails, setItemDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchase = async () => {
      try {
        const response = await api.get(`/api/purchases/${id}`);
        console.log("Fetched purchase:", response.data); // Add this line
        setPurchase(response.data);

        // Fetch item details including unit info
        const items = response.data.itemsList;
        if (items && items.length > 0) {
          console.log("Items list:", items); // Add this line
          const itemIds = items
            .map((item) => item.item?._id) // Safe navigation operator
            .filter((id) => id); // Filter out any null or undefined IDs
          const itemResponses = await Promise.all(
            itemIds.map((itemId) => api.get(`/api/jewelry-items/${itemId}`))
          );
          const itemsData = itemResponses.reduce((acc, response) => {
            acc[response.data._id] = response.data;
            return acc;
          }, {});
          setItemDetails(itemsData);
        }
      } catch (error) {
        console.error("Error fetching purchase details:", error);
      }
    };

    fetchPurchase();
  }, [id]);

  if (!purchase) return <div>Loading...</div>;

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <Header />
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="row d-flex justify-content-between">
                        <div className="col-xl-6">
                          <h4 className="fw-bold">View Purchase Item</h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
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

                  <div className="row mt-3">
                    <div className="col-xl-12">
                      <Paper elevation={3} sx={{ p: 3 }}>
                        <Grid container spacing={3}>
                          {/* Purchase Details */}
                          <Grid item xs={12} md={6}>
                            <Card
                              elevation={3}
                              sx={{
                                borderRadius: 2,
                                backgroundColor: "#f9f9f9",
                              }}
                            >
                              <CardContent>
                                <Typography variant="h6" gutterBottom>
                                  <span
                                    className="fw-bold"
                                    style={{ color: "rgb(1, 87, 155)" }}
                                  >
                                    Purchase Details
                                  </span>
                                  <hr />
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Purchase Date:</strong>{" "}
                                  {format(
                                    new Date(purchase.purchaseDate),
                                    "dd-MM-yyyy"
                                  )}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>invoiceDate:</strong>{" "}
                                  {format(
                                    new Date(purchase.invoiceDate),
                                    "dd-MM-yyyy"
                                  )}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Supplier Voucher No:</strong>{" "}
                                  {purchase.supplierVoucherNo}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Purchase Voucher No:</strong>{" "}
                                  {purchase.purchaseVoucherNo}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Company Name:</strong>{" "}
                                  {purchase.companyName}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Supplier Name:</strong>{" "}
                                  {purchase.supplierName}
                                </Typography>

                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Gst Expenses:</strong>{" "}
                                  {purchase.gstExpenses}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Packing Charges:</strong>{" "}
                                  {purchase.packingCharges}
                                </Typography>

                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Other Expenses:</strong>{" "}
                                  {purchase.otherExpenses}
                                </Typography>

                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Total Item Amount:</strong>{" "}
                                  {purchase.totalItemAmount}
                                </Typography>

                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Bill Sundry Amount:</strong>{" "}
                                  {purchase.billSundryAmount}
                                </Typography>

                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Total Amount:</strong>{" "}
                                  {purchase.totalAmount}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>

                          {/* Transport Details */}
                          <Grid item xs={12} md={6}>
                            <Card
                              elevation={3}
                              sx={{
                                borderRadius: 2,
                                backgroundColor: "#f9f9f9",
                              }}
                            >
                              <CardContent>
                                <Typography variant="h6" gutterBottom>
                                  <span
                                    className="fw-bold"
                                    style={{ color: "rgb(1, 87, 155)" }}
                                  >
                                    Transport Details
                                  </span>
                                  <hr />
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Transport Name:</strong>{" "}
                                  {purchase.transportDetails.transportName}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Vehicle No:</strong>{" "}
                                  {purchase.transportDetails.vehicleNo}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Date:</strong>{" "}
                                  {format(
                                    new Date(purchase.transportDetails.date),
                                    "dd-MM-yyyy"
                                  )}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Station From:</strong>{" "}
                                  {purchase.transportDetails.stationFrom}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Station To:</strong>{" "}
                                  {purchase.transportDetails.stationTo}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                          {/* Items List */}
                          <Grid item xs={12} md={12}>
                            <Card
                              elevation={3}
                              sx={{
                                borderRadius: 2,
                                backgroundColor: "#f9f9f9",
                              }}
                            >
                              <CardContent>
                                {purchase.itemsList &&
                                  purchase.itemsList.map((item, index) => (
                                    <div key={index}>
                                      <Typography variant="h6" gutterBottom>
                                        <span
                                          className="fw-bold"
                                          style={{ color: "rgb(1, 87, 155)" }}
                                        >
                                          Item {index + 1}
                                        </span>
                                        <hr />
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Item ID:</strong>{" "}
                                        {item.item && item.item._id
                                          ? item.item._id
                                          : "N/A"}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Item Name:</strong>{" "}
                                        {item.item && item.item.name
                                          ? item.item.name
                                          : "N/A"}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Quantity:</strong>{" "}
                                        {item.quantity}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Unit:</strong>{" "}
                                        {item.item &&
                                        itemDetails[item.item._id]?.unit
                                          ? itemDetails[item.item._id].unit.name
                                          : "N/A"}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Price:</strong> {item.price}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Amount:</strong> {item.amount}
                                      </Typography>

                                      <hr />
                                    </div>
                                  ))}
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>
                      </Paper>

                      <div className="row mt-3">
                        <div className="col-xl-12 d-flex justify-content-center">
                          <Button
                            variant="contained"
                            color="warning"
                            onClick={() => navigate("/purchase_voucher_list")}
                            size="small"
                            className="fw-bold"
                          >
                            Back
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Box>
            </Box>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
}
