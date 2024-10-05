import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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

// import Header from "../../schema/Header";

import Header from "../../../schema/Header";

import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { toast, ToastContainer } from "react-toastify";
import { Card, CardContent } from "@mui/material";

// import { Box, TextField, Button, Typography } from '@mui/material';

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

// import { Button, Paper, Typography, Grid, CircularProgress, styled } from '@mui/material';

import axios from "axios";

// const navigate = useNavigate();

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
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

const Loading = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

const Container = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  backgroundColor: theme.palette.background.paper,
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  textAlign: "center",
  fontWeight: "bold",
}));

const Image = styled("img")(({ theme }) => ({
  width: "60%",
  height: "auto",
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const Info = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
}));

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" to="/item_master" className="text-decoration-none" style={{ fontSize: "15px" }}>
    Back
  </Link>,

  <Typography key="4" color="text.secondary" style={{ fontSize: "15px" }}>
    View Item
  </Typography>,
];

export default function ViewItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jewelryItem, setJewelryItem] = useState(null);

  // useEffect(() => {
  //   const fetchJewelryItem = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/api/jewelry-items/${id}`
  //       );
  //       setJewelryItem(response.data);
  //     } catch (error) {
  //       console.error("Error fetching jewelry item:", error);
  //     }
  //   };

  //   fetchJewelryItem();
  // }, [id]);

  useEffect(() => {
    const fetchJewelryItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jewelry-items/${id}`);
        setJewelryItem(response.data);
      } catch (error) {
        console.error('Error fetching jewelry item:', error);
      }
    };

    fetchJewelryItem();
  }, [id]);


  if (!jewelryItem) {
    return (
      <Loading>
        <CircularProgress />
      </Loading>
    );
  }




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
                          <h4 className="fw-bold"> View Item</h4>
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
                  <div className="row">
                    <div className="col-xl-12">
                      <Stack spacing={2}></Stack>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xl-12">

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
                                            style={{ color: "rgb(1, 87, 155)", opacity: '0.8' }}
                                          >
                                            Item Information
                                          </span>
                                          <hr />
                                        </Typography>

                                        <div className="col-xl-6">
                                          <Typography
                                            variant="body1"
                                            sx={{ mb: 1 }}
                                          >
                                            <strong>Item Name:</strong>{" "}
                                            {/* {accountData.customId} */}
                                            {jewelryItem.name}
                                          </Typography>
                                          <Typography
                                            variant="body1"
                                            sx={{ mb: 1 }}
                                          >
                                            <strong>Print Name:</strong>{" "}
                                            {/* {accountData.customId} */}
                                            {jewelryItem.printname || "N/A"}
                                          </Typography>

                                          <Typography
                                            variant="body1"
                                            sx={{ mb: 1 }}
                                          >
                                            <strong>Item Type:</strong>{" "}
                                            {/* {accountData.customId} */}
                                            {jewelryItem.itemType || "N/A"}
                                          </Typography>


                                          <Typography
                                            variant="body1"
                                            sx={{ mb: 1 }}
                                          >
                                            <strong>Main Unit Barcode :</strong>{" "}
                                            {/* {accountData.accountId} */}
                                            {jewelryItem.mainUnitBarcode || "N/A"}
                                          </Typography>
                                          <Typography
                                            variant="body1"
                                            sx={{ mb: 1 }}
                                          >
                                            <strong>Alternative UnitBarcode :</strong>{" "}
                                            {/* {accountData.accountId} */}
                                            {jewelryItem.alternativeUnitBarcode || "N/A"}
                                          </Typography>
                                          <Typography
                                            variant="body1"
                                            sx={{ mb: 1 }}
                                          >
                                            <strong>Group:</strong>{" "}
                                            {jewelryItem.group
                                              ? jewelryItem.group.name
                                              : "N/A"}
                                          </Typography>

                                        </div>
                                        <div className="col-xl-6 d-flex justify-content-end">
                                          {/* <Typography variant="body1"> */}
                                          <span
                                            className="mt-0"
                                            style={{ paddingBottom: "35px" }}
                                          >
                                            {jewelryItem.images &&
                                              jewelryItem.images.length > 0 ? (
                                              jewelryItem.images.map(
                                                (image, index) => (
                                                  <Image
                                                    key={index}
                                                    src={`http://localhost:5000${image}`}
                                                    alt={jewelryItem.name}
                                                    style={{
                                                      width: "150px",
                                                      height: "150px",
                                                      objectFit: "cover",
                                                      borderRadius: "50%",
                                                      border: "1px solid gray",
                                                    }}
                                                  />
                                                )
                                              )
                                            ) : (
                                              <Typography variant="body1">
                                                No images available
                                              </Typography>
                                            )}
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
                                          style={{ color: "rgb(1, 87, 155)", opacity: '0.8' }}
                                        >
                                          Group Information
                                        </span>
                                        <hr />
                                      </Typography>

                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Unit:</strong>{" "}
                                        {jewelryItem.unit ? jewelryItem.unit.name : 'N/A'}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Alternative Unit:</strong>{" "}
                                        {jewelryItem.alternativeunit || "N/A"}
                                      </Typography>
                                      {/* <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Packaging Unit:</strong>
                                        {jewelryItem.packagingunit || "N/A"}
                                      </Typography> */}

                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Conversion Type:</strong>{" "}
                                        {jewelryItem.conversionType || "N/A"}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Conversion factor:</strong>{" "}
                                        {jewelryItem.conversionFactor || "N/A"}
                                      </Typography>



                                    </CardContent>
                                  </Card>
                                </Grid>
                                {/* Company Information */}
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
                                          style={{ color: "rgb(1, 87, 155)", opacity: '0.8' }}
                                        >
                                          Price Information
                                        </span>
                                        <hr />
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Retailer Price:</strong>{" "}
                                        {jewelryItem.retailerPrice || "N/A"}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>SemiWholeseller Price:</strong>{" "}
                                        {jewelryItem.semiWholesellerPrice ||
                                          "N/A"}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Wholeseller Price:</strong>{" "}
                                        {jewelryItem.wholesellerPrice || "N/A"}
                                      </Typography>

                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Min Sale Price:</strong>{" "}
                                        {jewelryItem.minSalePrice || "N/A"}
                                      </Typography>

                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Opening Stock:</strong>{" "}
                                        {jewelryItem.quantity || "N/A"}
                                      </Typography>

                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>GST:</strong>{" "}
                                        {jewelryItem.gst
                                          ? `${jewelryItem.gst.name} (${jewelryItem.gst.rate}%)`
                                          : "N/A"}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>HSN Code:</strong>{" "}
                                        {jewelryItem.HSNCode || "N/A"}
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                </Grid>

                               
                              </Grid>
                            </Paper>

                           
                          </Box>
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
    </div>
  );
}
