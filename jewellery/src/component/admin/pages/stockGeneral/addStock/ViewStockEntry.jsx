import api from "../../../../../services/api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Box,
  CssBaseline,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { styled, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Header from "../../../../schema/Header";

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

export default function ViewStockEntry() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await api.get(`/api/entries/${id}`);
        setEntry(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching entry:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
                  <div className="row d-flex justify-content-between">
                    <div className="col-xl-12">
                      <h4 className="fw-bold text-center"> View Stock Entry</h4>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xl-12">
                      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <ToastContainer />

                        <Paper elevation={3} sx={{ p: 3 }}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={6}>
                              <Card
                                elevation={3}
                                sx={{
                                  borderRadius: 2,
                                  backgroundColor: "#f9f9f9",
                                }}
                                style={{ width: "100%", height: "100%" }}
                              >
                                <CardContent>
                                  <div className="row">
                                    <Typography variant="h6" gutterBottom>
                                      <span
                                        className="fw-bold"
                                        style={{ color: "rgb(1, 87, 155)" }}
                                      >
                                        Personal Information
                                      </span>
                                      <hr />
                                    </Typography>

                                    <div className="col-xl-6">
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong> Date:</strong>
                                        {new Date(
                                          entry.date
                                        ).toLocaleDateString()}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Item Name:</strong> {entry.item}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Quantity:</strong>
                                        {entry.quantity}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Per Unit Price:</strong>{" "}
                                        {entry.price}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Total Amount:</strong>{" "}
                                        {entry.amount}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Unit:</strong> {entry.unit}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Items Consumed:</strong>{" "}
                                        {entry.itemsConsumed ||
                                          "Item Not Consumed"}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Voucher Number:</strong>{" "}
                                        {entry.voucherNumber}
                                      </Typography>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </Grid>

                            {/* Associated Information */}
                            <Grid item xs={12} md={6}>
                              <Card
                                elevation={3}
                                sx={{
                                  borderRadius: 2,
                                  backgroundColor: "#f9f9f9",
                                }}
                                style={{ width: "100%", height: "100%" }}
                              >
                                <CardContent>
                                  <Typography variant="h6" gutterBottom>
                                    <span
                                      className="fw-bold"
                                      style={{ color: "rgb(1, 87, 155)" }}
                                    >
                                      Description
                                    </span>
                                    <hr />
                                  </Typography>

                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                    {entry.shortNarration ||
                                      "No description provided"}
                                  </Typography>
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
                              size="small"
                              className="fw-bold"
                              onClick={() => {
                                navigate("/stock_list");
                              }}
                            >
                              Back
                            </Button>
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
    </>
  );
}
