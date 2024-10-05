//============================My code 14/09/2024=====================//



// // src/pages/PackagingDetail.js
// import React, { useState, useEffect } from "react";
// import api from "../../../../../services/api"; // Adjust path as needed
// import { useParams } from "react-router-dom";

// const PackagingDetail = () => {
//   const [packaging, setPackaging] = useState(null);
//   const { id } = useParams(); // Correctly call useParams as a function

//   useEffect(() => {
//     const fetchPackagingDetail = async () => {
//       try {
//         const response = await api.get(`/api/packaging/${id}`);
//         setPackaging(response.data);
//       } catch (error) {
//         console.error("Error fetching packaging detail:", error);
//       }
//     };

//     fetchPackagingDetail();
//   }, [id]);

//   if (!packaging) return <div>Loading...</div>;

//   return (
//     <div>
//       <h3>Packaging Details</h3>
//       <p><strong>Item Name:</strong> {packaging.item}</p>
//       <p><strong>Company Name:</strong> {packaging.companyName}</p>
//       <p><strong>Supplier Name:</strong> {packaging.supplierName}</p>
//       <p><strong>Purchase Voucher Number:</strong> {packaging.purchaseVoucherNo}</p>
//       <p><strong>Quantity:</strong> {packaging.quantity}</p>
//       <p><strong>Unit:</strong> {packaging.unit}</p>
//       <p><strong>Price:</strong> {packaging.price}</p>
//       <p><strong>Amount:</strong> {packaging.amount}</p>
//       <p><strong>Box Count:</strong> {packaging.packagingDetails.boxCount}</p>
//       <p><strong>Total Boxes:</strong> {packaging.totalBoxes}</p>
//       <p><strong>Total Pieces:</strong> {packaging.totalPieces}</p>
//       <button onClick={() => window.history.back()}>Back</button>
//     </div>
//   );
// };

// export default PackagingDetail;



//======================================with style===========================//


import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Box,
  CssBaseline,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { styled, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Header from "../../../../schema/Header";
import api from "../../../../../services/api";

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

export default function ViewPackaging() {
  const navigate = useNavigate("");
  const [packaging, setPackaging] = useState(null);
  const { id } = useParams(); // Correctly call useParams as a function

  useEffect(() => {
    const fetchPackagingDetail = async () => {
      try {
        const response = await api.get(`/api/packaging/${id}`);
        setPackaging(response.data);
      } catch (error) {
        console.error("Error fetching packaging detail:", error);
      }
    };

    fetchPackagingDetail();
  }, [id]);

  if (!packaging) return <div>Loading...</div>;

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <Header />
              <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
                <DrawerHeader />
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div className="row d-flex justify-content-between">
                        <div className="col-xl-6 col-md-6 d-flex justify-content-end">
                          <h6 className="fw-bold">View Packaging Item</h6>
                        </div>
                        <div className="col-xl-6 col-md-6 d-flex justify-content-end mb-1">
                          <Button
                            onClick={() => {
                              navigate("/packaging_list");
                            }}
                            color="warning"
                            variant="contained"
                            size="small"
                          >
                            Back
                          </Button>
                        </div>
                      </div>
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
                                height: "100%",
                                width: "100%",
                              }}
                            >
                              <CardContent>
                                <Typography variant="h6" gutterBottom>
                                  <span
                                    className="fw-bold"
                                    style={{ color: "rgb(1, 87, 155)" }}
                                  >
                                    Item Details
                                  </span>
                                  <hr />
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                  <strong>Item Name:</strong> {packaging.item}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                  <strong>Company Name:</strong>{" "}
                                  {packaging.companyName}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                  <strong>Supplier Name:</strong>{" "}
                                  {packaging.supplierName}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                  <strong>Purchase Voucher Number:</strong>{" "}
                                  {packaging.purchaseVoucherNo}
                                </Typography>

                                <Typography variant="body2" sx={{ mb: 1 }}>
                                  <strong>Unit:</strong> {packaging.unit}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>

                          {/* Purchase Details */}
                          <Grid item xs={12} md={6}>
                            <Card
                              elevation={3}
                              sx={{
                                borderRadius: 2,
                                backgroundColor: "#f9f9f9",
                                height: "100%",
                                width: "100%",
                              }}
                            >
                              <CardContent>
                                <Typography variant="h6" gutterBottom>
                                  <span
                                    className="fw-bold"
                                    style={{ color: "rgb(1, 87, 155)" }}
                                  >
                                    Quantity Details
                                  </span>
                                  <hr />
                                </Typography>

                                <Typography variant="body2" sx={{ mb: 1 }}>
                                  <strong>Quantity:</strong>{" "}
                                  {packaging.quantity}
                                </Typography>

                                <Typography variant="body2" sx={{ mb: 1 }}>
                                  <strong>Price:</strong>{" "}
                                  <CurrencyRupeeIcon
                                    style={{ fontSize: "12px" }}
                                  />
                                  {packaging.price}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                  <strong>Amount:</strong>{" "}
                                  <CurrencyRupeeIcon
                                    style={{ fontSize: "12px" }}
                                  />
                                  {packaging.amount}
                                </Typography>

                                <Typography variant="body2" sx={{ mb: 1 }}>
                                  <strong>Box Count:</strong>{" "}
                                  {packaging.packagingDetails.boxCount}
                                </Typography>

                                <Typography variant="body2" sx={{ mb: 1 }}>
                                  <strong>Total Boxes:</strong>{" "}
                                  {packaging.totalBoxes}
                                </Typography>

                                <Typography variant="body2" sx={{ mb: 1 }}>
                                  <strong>Total Pieces:</strong>{" "}
                                  {packaging.totalPieces}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>
                      </Paper>
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
