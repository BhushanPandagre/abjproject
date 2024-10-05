// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
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

// const ViewAccountMaster = () => {
//   const { accountId } = useParams();
//   const [accountData, setAccountData] = useState(null);
//   const navigate = useNavigate("");

//   useEffect(() => {
//     const fetchAccountData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/accounts/${accountId}`
//         );
//         setAccountData(response.data);
//       } catch (err) {
//         console.error(err);
//         toast.error("Error fetching account details");
//       }
//     };

//     fetchAccountData();
//   }, [accountId]);

//   if (!accountData) {
//     return <Typography>Loading...</Typography>;
//   }

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

               
//                       <div className="row d-flex justify-content-between">
//                         <div className="col-xl-12">
//                           <h4 className="fw-bold text-center">Account Details</h4>
//                         </div>
//                       </div>
                   

//                   <div className="row">
//                     <div className="col-xl-12">
//                       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//                         <ToastContainer />

//                         <Paper elevation={3} sx={{ p: 3 }}>
//                           <Grid container spacing={3}>
//                             {/* Personal Information */}
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
//                                         <strong>ID:</strong>{" "}
//                                         {accountData.customId}
//                                       </Typography>
//                                       <Typography
//                                         variant="body1"
//                                         sx={{ mb: 1 }}
//                                       >
//                                         <strong>Account Number:</strong>{" "}
//                                         {accountData.accountId}
//                                       </Typography>
//                                       <Typography
//                                         variant="body1"
//                                         sx={{ mb: 1 }}
//                                       >
//                                         <strong>Name:</strong>{" "}
//                                         {accountData.salutation}{" "}
//                                         {accountData.name}{" "}
//                                         {accountData.lastName}
//                                       </Typography>
//                                       <Typography
//                                         variant="body1"
//                                         sx={{ mb: 1 }}
//                                       >
//                                         <strong>Print Name:</strong>{" "}
//                                         {accountData.printName}
//                                       </Typography>
//                                     </div>
//                                     <div className="col-xl-6 d-flex justify-content-end">
//                                       {/* <Typography variant="body1"> */}
//                                       <span
//                                         className="mt-0"
//                                         style={{ paddingBottom: "35px" }}
//                                       >
//                                         {accountData.image && (
//                                           <img
//                                             src={`http://localhost:5000/${accountData.image}`}
//                                             alt="Account"
//                                             style={{
//                                               width: "150px",
//                                               height: "150px",
//                                               objectFit: "cover",
//                                               borderRadius: "50%",
//                                               border: "1px solid gray",
//                                             }}
//                                           />
//                                         )}
//                                       </span>
//                                       {/* </Typography> */}
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
//                                     <strong>Address:</strong>{" "}
//                                     {`${accountData?.address?.streetName}, ${accountData?.address?.houseNumber}`}
//                                   </Typography>
//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     <strong>Landmark:</strong>{" "}
//                                     {accountData?.address?.landmark}
//                                   </Typography>
//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     <strong>Locality:</strong>{" "}
//                                     {accountData?.address?.locality}
//                                   </Typography>
//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     <strong>City:</strong> {accountData.city},{" "}
//                                     {accountData.state}
//                                   </Typography>
//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     <strong>Pin Code:</strong>{" "}
//                                     {accountData.pinCode}
//                                   </Typography>
//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     <strong>Station:</strong>{" "}
//                                     {accountData.station}
//                                   </Typography>
//                                   {/* Display Image */}
//                                   {/* {accountData.image && (
//         <div style={{ marginTop: 10 }}>
//           <img
//             src={`http://localhost:5000/${accountData.image}`}
//             alt="Account"
//             style={{
//               width: "100px",
//               height: "100px",
//               objectFit: "cover",
//               borderRadius: "50%",
//             }}
//           />
//         </div>
//       )} */}
//                                 </CardContent>
//                               </Card>
//                             </Grid>
//                             {/* Company Information */}
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
//                                       Company Information
//                                     </span>
//                                     <hr />
//                                   </Typography>
//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     <strong>Company Name:</strong>{" "}
//                                     {accountData.companyName}
//                                   </Typography>
//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     <strong>Area Group:</strong>{" "}
//                                     {accountData.group}
//                                   </Typography>
//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     <strong>Collection Route:</strong>{" "}
//                                     {accountData.collectionRoot}
//                                   </Typography>
//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     <strong>Customer Type:</strong>{" "}
//                                     {accountData.customerType}
//                                   </Typography>
//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     <strong>Dealer Type:</strong>{" "}
//                                     {accountData.dealerType}
//                                   </Typography>
//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     <strong>Contact Person:</strong>{" "}
//                                     {accountData.contactPerson}
//                                   </Typography>
//                                 </CardContent>
//                               </Card>
//                             </Grid>
//                             {/* Financial Information */}
//                             <Grid item xs={12} md={6}>
//                               <Card
//                                 elevation={3}
//                                 sx={{
//                                   borderRadius: 2,
//                                   backgroundColor: "#f9f9f9",
//                                 }}
//                               >
//                                 <CardContent>
//                                   <Typography variant="h6" gutterBottom>
//                                     <span
//                                       className="fw-bold"
//                                       style={{ color: "rgb(1, 87, 155)" }}
//                                     >
//                                       Financial Information
//                                     </span>

//                                     <hr />
//                                   </Typography>
//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     <strong>Credit Limit:</strong>{" "}
//                                     {accountData.creditLimit}
//                                   </Typography>
//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     <strong>Credit Days:</strong>{" "}
//                                     {accountData.creditDays}
//                                   </Typography>
//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     <strong>Opening Balance:</strong>{" "}
//                                     {accountData.openingBalance}
//                                   </Typography>
//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     <strong>Credit Limit Strict:</strong>{" "}
//                                     {accountData.creditLimitStrict}
//                                   </Typography>
//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     <strong>BankName:</strong>{" "}
//                                     {accountData.bankName}
//                                   </Typography>
//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     <strong>IFSC Code:</strong>{" "}
//                                     {accountData.ifscCode}
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
//                               >
//                                 <CardContent>
//                                   <Typography variant="h6" gutterBottom>
//                                     <span
//                                       className="fw-bold"
//                                       style={{ color: "rgb(1, 87, 155)" }}
//                                     >
//                                       Contact Information
//                                     </span>

//                                     <hr />
//                                   </Typography>
//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     <strong>Phone Number:</strong>{" "}
//                                     {accountData.phoneNumber}
//                                   </Typography>
//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     <strong>WhatsApp Number:</strong>{" "}
//                                     {accountData.whatsAppNumber}
//                                   </Typography>
//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     <strong>Email:</strong> {accountData.email}
//                                   </Typography>
//                                   <Typography variant="body1" sx={{ mb: 1 }}>
//                                     <strong>AadharNo:</strong>{" "}
//                                     {accountData.aadharNo}
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
//                               onClick={() => {
//                                 navigate("/account_master_detail");
//                               }}
//                               size="small"
//                               className="fw-bold"
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
// };

// export default ViewAccountMaster;


















// ================================== Update Live Code =====================================


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

const ViewAccountMaster = () => {
  const { accountId } = useParams();
  const [accountData, setAccountData] = useState(null);
  const navigate = useNavigate("");

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await api.get(`/api/accounts/${accountId}`);
        setAccountData(response.data);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching account details");
      }
    };

    fetchAccountData();
  }, [accountId]);

  if (!accountData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <Header />
              <Box component="main" sx={{ flexGrow: 1}}>
                <DrawerHeader />
                <div className="container-fluid">
                      <div className="row d-flex justify-content-between">
                        <div className="col-xl-12">
                          <h4 className="fw-bold text-center">Account Details</h4>
                        </div>
                      </div>

                  <div className="row">
                    <div className="col-xl-12">
                      <Box component="main" sx={{ flexGrow: 1}}>
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
                                        Personal Information
                                      </span>
                                      <hr />
                                    </Typography>

                                    <div className="col-xl-6">
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>ID:</strong>{" "}
                                        {accountData.customId}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Account Number:</strong>{" "}
                                        {accountData.accountId}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Name:</strong>{" "}
                                        {accountData.salutation}{" "}
                                        {accountData.name}{" "}
                                        {accountData.lastName}
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        sx={{ mb: 1 }}
                                      >
                                        <strong>Print Name:</strong>{" "}
                                        {accountData.printName}
                                      </Typography>
                                    </div>
                                    <div className="col-xl-6 d-flex justify-content-end">
                                      {/* <Typography variant="body1"> */}
                                      <span
                                        className="mt-0"
                                        style={{ paddingBottom: "35px" }}
                                      >
                                        {accountData.image && (
                                          <img
                                            src={`https://api.abjwork.com/${accountData.image}`}
                                            alt="Account"
                                            style={{
                                              width: "150px",
                                              height: "150px",
                                              objectFit: "cover",
                                              borderRadius: "50%",
                                              border: "1px solid gray",
                                            }}
                                          />
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </Grid>

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
                                    <strong>Address:</strong>{" "}
                                    {`${accountData?.address?.streetName}, ${accountData?.address?.houseNumber}`}
                                  </Typography>
                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Landmark:</strong>{" "}
                                    {accountData?.address?.landmark}
                                  </Typography>
                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Locality:</strong>{" "}
                                    {accountData?.address?.locality}
                                  </Typography>
                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>City:</strong> {accountData.city},{" "}
                                    {accountData.state}
                                  </Typography>
                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Pin Code:</strong>{" "}
                                    {accountData.pinCode}
                                  </Typography>
                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Station:</strong>{" "}
                                    {accountData.station}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>

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
                                      Company Information
                                    </span>
                                    <hr />
                                  </Typography>
                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Company Name:</strong>{" "}
                                    {accountData.companyName}
                                  </Typography>
                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Area Group:</strong>{" "}
                                    {accountData.group}
                                  </Typography>
                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Collection Route:</strong>{" "}
                                    {accountData.collectionRoot}
                                  </Typography>
                                  
                                  
                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Customer Type:</strong>{" "}
                                    {accountData.customerType}
                                  </Typography>
                                  
                                     <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Rate Type:</strong>{" "}
                                    {accountData.rateType}
                                  </Typography>
                              
                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Contact Person:</strong>{" "}
                                    {accountData.contactPerson}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>

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
                                      Financial Information
                                    </span>

                                    <hr />
                                  </Typography>

                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Credit Limit:</strong>{" "}
                                    {accountData.creditLimit}
                                  </Typography>

                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Color Code :</strong>{" "}
                                    {accountData.colorCode}
                                  </Typography>

                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Credit Days:</strong>{" "}
                                    {accountData.creditDays}
                                  </Typography>
                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Opening Balance:</strong>{" "}
                                    {accountData.openingBalance.amount} ({accountData.openingBalance.type})
                                  </Typography>
                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Credit Limit Strict:</strong>{" "}
                                    {accountData.creditLimitStrict}
                                  </Typography>
                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>BankName:</strong>{" "}
                                    {accountData.bankName}
                                  </Typography>
                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>IFSC Code:</strong>{" "}
                                    {accountData.ifscCode}
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
                              >
                                <CardContent>
                                  <Typography variant="h6" gutterBottom>
                                    <span
                                      className="fw-bold"
                                      style={{ color: "rgb(1, 87, 155)" }}
                                    >
                                      Contact Information
                                    </span>

                                    <hr />
                                  </Typography>
                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Phone Number:</strong>{" "}
                                    {accountData.phoneNumber}
                                  </Typography>
                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>WhatsApp Number:</strong>{" "}
                                    {accountData.whatsAppNumber}
                                  </Typography>
                                  <Typography variant="body1" sx={{ mb: 1 }}>
                                    <strong>Email:</strong> {accountData.email}
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
                                navigate("/account_master_detail");
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
  );
};

export default ViewAccountMaster;

