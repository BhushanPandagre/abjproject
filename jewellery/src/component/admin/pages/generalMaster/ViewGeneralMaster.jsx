// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// import { useNavigate } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   Box,
//   CssBaseline,
//   Typography,
//   Grid,
//   Paper,
// } from "@mui/material";
// import Header from "../../../schema/Header";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { styled, useTheme } from "@mui/material/styles";
// import Stack from "@mui/material/Stack";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import { Link } from "react-router-dom";
// import Button from "@mui/material/Button";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const API_URL = "http://localhost:5000/api/data";

// export default function ViewGeneralMaster() {
//   const { id } = useParams();
//   const [data, setData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, [id]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/${id}`);
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleBack = () => {
//     navigate("/data_list");
//   };

//   if (!data) return <div className="container mt-4">Loading...</div>;

//   return (
//     <div>
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-xl-12">
//             <Box sx={{ display: "flex" }}>
//               <CssBaseline />
//               <Header />
//               <Box component="main" sx={{ flexGrow: 1 }}>
//                 <DrawerHeader />
//                 <div className="container-fluid">
//                   <div className="row d-flex justify-content-between">
//                     <div className="col-xl-12">
//                       <h4 className="fw-bold text-center">
//                         {" "}
//                         General Account Details
//                       </h4>
//                     </div>
//                   </div>

//                   <div className="row">
//                     <div className="col-xl-12">
//                       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//                         <ToastContainer />

//                         <Paper elevation={3} sx={{ p: 3 }}>
//                           <Grid container spacing={3}>
//                             <Grid item xs={12} md={6}>
//                               <Card
//                                 elevation={3}
//                                 sx={{
//                                   borderRadius: 2,
//                                   backgroundColor: "#f9f9f9",
//                                 }}
//                                 style={{ width: "480px", height: "300px" }}
//                               >
//                                 <CardContent>
//                                   <div className="row">
//                                     <Typography variant="h6" gutterBottom>
//                                       <span
//                                         className="fw-bold"
//                                         style={{ color: "rgb(1, 87, 155)" }}
//                                       >
//                                         Personal Information
//                                       </span>
//                                       <hr />
//                                     </Typography>

//                                     <div className="col-xl-6">
//                                       <Typography
//                                         variant="body1"
//                                         sx={{ mb: 1 }}
//                                       >
//                                         <strong> Name:</strong> {data.name}
//                                       </Typography>
//                                       <Typography
//                                         variant="body1"
//                                         sx={{ mb: 1 }}
//                                       >
//                                         <strong>Print Name:</strong>{" "}
//                                         {data.printName}
//                                       </Typography>
//                                       <Typography
//                                         variant="body1"
//                                         sx={{ mb: 1 }}
//                                       >
//                                         <strong>Group:</strong>
//                                         {data.group}
//                                       </Typography>
//                                       <Typography
//                                         variant="body1"
//                                         sx={{ mb: 1 }}
//                                       >
//                                         <strong>Opening Balance Amount:</strong>{" "}
//                                         {data.openingBalance.amount}(
//                                         {data.openingBalance.type})
//                                       </Typography>
//                                       <Typography
//                                         variant="body1"
//                                         sx={{ mb: 1 }}
//                                       >
//                                         <strong>Opening Balance Type:</strong>{" "}
//                                         {data.openingBalance.type}
//                                       </Typography>
//                                     </div>
//                                   </div>
//                                 </CardContent>
//                               </Card>
//                             </Grid>
//                             {/* Address Information */}
//                             <Grid item xs={12} md={6}>
//                               <Card
//                                 elevation={3}
//                                 sx={{
//                                   borderRadius: 2,
//                                   backgroundColor: "#f9f9f9",
//                                 }}
//                                 style={{ width: "480px", height: "300px" }}
//                               >
//                                 <CardContent>
//                                   <Typography variant="h6" gutterBottom>
//                                     <span
//                                       className="fw-bold"
//                                       style={{ color: "rgb(1, 87, 155)" }}
//                                     >
//                                       Address Information
//                                     </span>
//                                     <hr />
//                                   </Typography>

//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     <strong>House Number:</strong>{" "}
//                                     {data.address.houseNumber}
//                                   </Typography>
//                                   <Typography
//                                     variant="body1"
//                                     sx={{ display: "flex" }}
//                                   >
//                                     <strong>Street Name:</strong>{" "}
//                                     {data.address.streetName}
//                                   </Typography>
//                                   <Typography
//                                     variant="body1"
//                                     sx={{ display: "flex" }}
//                                   >
//                                     <strong>Landmark:</strong>{" "}
//                                     {data.address.landmark || "N/A"}
//                                   </Typography>
//                                   <Typography
//                                     variant="body1"
//                                     sx={{ display: "flex" }}
//                                   >
//                                     <strong>Cross Road:</strong>{" "}
//                                     {data.address.crossRoad || "N/A"}
//                                   </Typography>
//                                   <Typography
//                                     variant="body1"
//                                     sx={{ display: "flex" }}
//                                   >
//                                     <strong>Locality:</strong>{" "}
//                                     {data.address.locality}
//                                   </Typography>
//                                   <Typography
//                                     variant="body1"
//                                     sx={{ display: "flex" }}
//                                   >
//                                     <strong>Related Location:</strong>{" "}
//                                     {data.address.relatedLocation || "N/A"}
//                                   </Typography>
//                                 </CardContent>
//                               </Card>
//                             </Grid>

//                             {/* Contact Information */}
//                             <Grid item xs={12} md={6}>
//                               <Card
//                                 elevation={3}
//                                 sx={{
//                                   borderRadius: 2,
//                                   backgroundColor: "#f9f9f9",
//                                 }}
//                                 style={{ width: "480px", height: "300px" }}
//                               >
//                                 <CardContent>
//                                   <Typography variant="h6" gutterBottom>
//                                     <span
//                                       className="fw-bold"
//                                       style={{ color: "rgb(1, 87, 155)" }}
//                                     >
//                                       Contact Number
//                                     </span>
//                                     <hr />
//                                   </Typography>

//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     <strong>Mobile Number:</strong>
//                                     {data.contactDetails.mobileNumber}
//                                   </Typography>
//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     <strong>WhatsApp Number:</strong>
//                                     {data.contactDetails.whatsappNumber ||
//                                       "N/A"}
//                                   </Typography>
//                                 </CardContent>
//                               </Card>
//                             </Grid>
//                             {/* Associated Information */}
//                             <Grid item xs={12} md={6}>
//                               <Card
//                                 elevation={3}
//                                 sx={{
//                                   borderRadius: 2,
//                                   backgroundColor: "#f9f9f9",
//                                 }}
//                                 style={{ width: "480px", height: "300px" }}
//                               >
//                                 <CardContent>
//                                   <Typography variant="h6" gutterBottom>
//                                     <span
//                                       className="fw-bold"
//                                       style={{ color: "rgb(1, 87, 155)" }}
//                                     >
//                                       Description
//                                     </span>
//                                     <hr />
//                                   </Typography>

//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     {data.description ||
//                                       "No description provided"}
//                                   </Typography>
//                                 </CardContent>
//                               </Card>
//                             </Grid>
//                             {/* Additional sections */}
//                           </Grid>
//                         </Paper>

//                         <div className="row mt-3">
//                           <div className="col-xl-12 d-flex justify-content-center">
//                             <Button
//                               variant="contained"
//                               color="warning"
//                               size="small"
//                               className="fw-bold"

//                               onClick={() => {
//                                 navigate("/general_master_detail");
//                               }}
//                             >
//                               Back
//                             </Button>
//                           </div>
//                         </div>
//                       </Box>
//                     </div>
//                   </div>
//                 </div>
//               </Box>
//             </Box>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }










//================================= Update Live Code ===================================




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
import Header from "../../../schema/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { styled, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
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

// const API_URL = "http://localhost:5000/api/data";

export default function ViewGeneralMaster() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await api.get(`/api/data/${id}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBack = () => {
    navigate("/data_list");
  };

  if (!data) return <div className="container mt-4">Loading...</div>;

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
                      <h4 className="fw-bold text-center">
                        {" "}
                        General Account Details
                      </h4>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xl-12">
                      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <ToastContainer />

                        <Paper elevation={3} sx={{ p: 3 }}>
                          <Grid container spacing={3}>
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
                                        Personal Information
                                      </span>
                                      <hr />
                                    </Typography>

                                    <div className="col-xl-6">
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong> Name:</strong> {data.name}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Print Name:</strong>{" "}
                                        {data.printName}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Group:</strong>
                                        {data.group}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Opening Balance Amount:</strong>{" "}
                                        {data.openingBalance.amount}(
                                        {data.openingBalance.type})
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Opening Balance Type:</strong>{" "}
                                        {data.openingBalance.type}
                                      </Typography>
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
                                      Address Information
                                    </span>
                                    <hr />
                                  </Typography>

                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>House Number:</strong>{" "}
                                    {data.address.houseNumber}
                                  </Typography>
                                  
                                  <Typography
                                    variant="body1"
                                    sx={{ display: "flex" }}
                                  >
                                    <strong>Street Name:</strong>{" "}
                                    {data.address.streetName}
                                  </Typography>
                                      <Typography
                                    variant="body1"
                                    sx={{ display: "flex" }}
                                  >
                                    <strong>Pin Code:</strong>{" "}
                                    {data.address.pinCode}
                                  </Typography>
                                
                                  <Typography
                                    variant="body1"
                                    sx={{ display: "flex" }}
                                  >
                                    <strong>Landmark:</strong>{" "}
                                    {data.address.landmark || "N/A"}
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    sx={{ display: "flex" }}
                                  >
                                    <strong>Cross Road:</strong>{" "}
                                    {data.address.crossRoad || "N/A"}
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    sx={{ display: "flex" }}
                                  >
                                    <strong>Locality:</strong>{" "}
                                    {data.address.locality}
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    sx={{ display: "flex" }}
                                  >
                                    <strong>Related Location:</strong>{" "}
                                    {data.address.relatedLocation || "N/A"}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>

                            {/* Contact Information */}
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
                                      Contact Number
                                    </span>
                                    <hr />
                                  </Typography>

                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Mobile Number:</strong>
                                    {data.contactDetails.mobileNumber}
                                  </Typography>
                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>WhatsApp Number:</strong>
                                    {data.contactDetails.whatsappNumber ||
                                      "N/A"}
                                  </Typography>
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
                                style={{ width: "480px", height: "300px" }}
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
                                    {data.description ||
                                      "No description provided"}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                            {/* Additional sections */}
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
                                navigate("/general_master_detail");
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
    </div>
  );
}

