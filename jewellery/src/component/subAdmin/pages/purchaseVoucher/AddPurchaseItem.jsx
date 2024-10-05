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
import Header from "../../../schema/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { styled, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import { format } from "date-fns";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import SubAdminHeader from "../../schema/SubAdminHeader";


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
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    margin: '5px', // Space between buttons
  };


  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" to="/purchase_voucher_list" className="text-decoration-none">
     Back
    </Link>,
  
    <Typography key="4" color="text.primary">
     View Purchase Voucher Item
    </Typography>,
  ];

export default function AddPurchaseItem() {
  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-xl-12">
      <Box sx={{ display: "flex" }}>
    <CssBaseline />
    <SubAdminHeader />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="row d-flex justify-content-between">
              <div className="col-xl-6">
                <h4 className="fw-bold">
                  View Purchase Item
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="row">
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
              </div> */}


      </div>
    </Box>
  </Box>
      </div>
    </div>
  </div>
  )
}
