import React, { useState, useEffect } from "react";
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
import Header from "../../../../schema/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { styled, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

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


export default function ViewRecieptVoucher() {
    const navigate = useNavigate("")
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

               
                      <div className="row d-flex justify-content-between">
                        <div className="col-xl-12">
                          <h4 className="fw-bold text-center">Reciept Voucher Details</h4>
                        </div>
                      </div>
                   

                  <div className="row">
                    <div className="col-xl-12">
                      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <ToastContainer />

                        <Paper elevation={3} sx={{ p: 3 }}>
                          <Grid container spacing={3}>
                            {/* Personal Information */}
                            <Grid item xs={12} md={6}>
                              <Card
                                elevation={3}
                                sx={{
                                  borderRadius: 2,
                                  backgroundColor: "#f9f9f9",
                                }}
                                style={{ width: "480px", height: "300px" }}
                              >
                                <CardContent>
                                  <div className="row">
                                    <Typography variant="h6" gutterBottom>
                                      <span
                                        className="fw-bold"
                                        style={{ color: "rgb(1, 87, 155)" }}
                                      >
                                        Voucher Information
                                      </span>
                                      <hr />
                                    </Typography>

                                    <div className="col-xl-6">
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>ID:</strong>{" "}
                                        {/* {accountData.customId} */}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Status:</strong>{" "}
                                        {/* {accountData.accountId} */}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Debit:</strong>{" "}
                                        {/* {accountData.salutation}{" "}
                                      
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Credit:</strong>{" "}
                                        {/* {accountData.printName} */}
                                      </Typography>
                                    </div>
                                    <div className="col-xl-6 d-flex justify-content-end">
                                      {/* <Typography variant="body1"> */}
                                      <span
                                        className="mt-0"
                                        style={{ paddingBottom: "35px" }}
                                      >
                                        
                                      </span>
                                      {/* </Typography> */}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </Grid>
                            {/* Address Information */}
                            <Grid item xs={12} md={6}>
                              <Card
                                elevation={3}
                                sx={{
                                  borderRadius: 2,
                                  backgroundColor: "#f9f9f9",
                                }}
                                style={{ width: "480px", height: "300px" }}
                              >
                                <CardContent>
                                  <Typography variant="h6" gutterBottom>
                                    <span
                                      className="fw-bold"
                                      style={{ color: "rgb(1, 87, 155)" }}
                                    >
                                      Short Note
                                    </span>
                                    <hr />
                                  </Typography>

                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                 
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
                              onClick={() => {
                                navigate("/reciept_payment_detail");
                              }}
                              size="small"
                              className="fw-bold"
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
    </div>
  )
}
