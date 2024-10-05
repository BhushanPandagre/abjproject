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
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import { format } from "date-fns";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import api from "../../../../services/api";

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
    to="/sale_voucher_list"
    className="text-decoration-none"
  >
    Back
  </Link>,

  <Typography key="4" color="text.primary">
    View Sale Voucher
  </Typography>,
];

export default function ViewSalesVoucher() {
  const { id } = useParams();
  const [saleVoucher, setSaleVoucher] = useState(null);
  const [itemDetails, setItemDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSaleVoucher = async () => {
      try {
        const response = await api.get(
          `/api/sale-vouchers/${id}`
        );
        setSaleVoucher(response.data);

        // Fetch item details including unit info
        const items = response.data.itemsList;
        if (items && items.length > 0) {
          const itemIds = items
            .map((item) => item.item?._id) // Safe navigation operator
            .filter((id) => id); // Filter out any null or undefined IDs
          const itemResponses = await Promise.all(
            itemIds.map((itemId) =>
              api.get(`/api/jewelry-items/${itemId}`)
            )
          );
          const itemsData = itemResponses.reduce((acc, response) => {
            acc[response.data._id] = response.data;
            return acc;
          }, {});
          setItemDetails(itemsData);
        }
      } catch (error) {
        console.error("Error fetching sale voucher details:", error);
      }
    };

    fetchSaleVoucher();
  }, [id]);

  if (!saleVoucher) return <div>Loading...</div>;

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
                    <div className="col-xl-12 d-flex justify-content-center">
                      <h4 className="fw-bold">View Sale Voucher</h4>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xl-12 d-xl-none">
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
                          {/* Sale Voucher Details */}
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
                                    Sale Voucher Details
                                  </span>
                                  <hr />
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Sale Date:</strong>{" "}
                                  {format(
                                    new Date(saleVoucher.saleDate),
                                    "dd-MM-yyyy"
                                  )}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Sale Voucher No:</strong>{" "}
                                  {saleVoucher.saleVoucherNo}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Seller Voucher No:</strong>{" "}
                                  {saleVoucher.sellerVoucherNo}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Buyer Name:</strong>{" "}
                                  {saleVoucher.buyerName}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Packing Charges:</strong>{" "}
                                  {saleVoucher.packingCharges}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>GST Expenses:</strong>{" "}
                                  {saleVoucher.gstExpenses}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Other Expenses:</strong>{" "}
                                  {saleVoucher.otherExpenses}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Total Item Amount:</strong>{" "}
                                  {saleVoucher.totalItemAmount}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Bill Sundry Amount:</strong>{" "}
                                  {saleVoucher.billSundryAmount}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Total Amount:</strong>{" "}
                                  {saleVoucher.totalAmount}
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
                                  {saleVoucher.transportDetails
                                    ?.transportName || "N/A"}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Vehicle No:</strong>{" "}
                                  {saleVoucher.transportDetails?.vehicleNo ||
                                    "N/A"}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Date:</strong>{" "}
                                  {format(
                                    new Date(
                                      saleVoucher.transportDetails?.date
                                    ),
                                    "dd-MM-yyyy"
                                  ) || "N/A"}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Station From:</strong>{" "}
                                  {saleVoucher.transportDetails?.stationFrom ||
                                    "N/A"}
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  <strong>Station To:</strong>{" "}
                                  {saleVoucher.transportDetails?.stationTo ||
                                    "N/A"}
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
                                {saleVoucher.itemsList &&
                                  saleVoucher.itemsList.map((item, index) => (
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
                            onClick={() => navigate("/sales_voucher_list")}
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
