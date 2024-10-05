// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import api from "../../../../services/api";
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

// export default function ViewSupplierMaster() {
//   const { id } = useParams();
//   const [supplier, setSupplier] = useState(null);

//   useEffect(() => {
//     api
//       .get(`/api/suppliers/${id}`)
//       .then((response) => setSupplier(response.data))
//       .catch((error) => console.error("Error fetching supplier:", error));
//   }, [id]);

//   if (!supplier) return <p>Loading...</p>;

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
//                       <h4 className="fw-bold text-center">Account Details</h4>
//                     </div>
//                   </div>

//                   <div className="row">
//                   <div className="container mt-4">
//       <div className="card shadow-sm">
//         <div className="card-header bg-primary text-white">
//           <h2 className="card-title mb-0">
//             {supplier.firstName} {supplier.lastName}
//           </h2>
//         </div>
//         <div className="card-body">
//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <h5 className="card-subtitle mb-2 text-muted">
//                 General Information
//               </h5>
//               <p>
//                 <strong>Party Name:</strong> {supplier.partyName}
//               </p>
//               <p>
//                 <strong>Area:</strong> {supplier.area}
//               </p>
//               <p>
//                 <strong>Party Code:</strong> {supplier.partyCode}
//               </p>
//               <p>
//                 <strong>Opening Balance:</strong>{" "}
//                 {supplier.openingBalance.amount} ({supplier.openingBalance.type}
//                 )
//               </p>
//             </div>
//             <div className="col-md-6 text-center mb-3">
//               {supplier.image && (
//                 <img
//                   src={supplier.image}
//                   alt={`${supplier.firstName} ${supplier.lastName}`}
//                   className="img-fluid rounded-circle shadow-sm"
//                   style={{ maxWidth: "200px" }}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="card-footer bg-light">
//           <h5 className="mt-3">Address</h5>
//           <p>
//             {supplier.address.houseNumber}, {supplier.address.streetName},{" "}
//             {supplier.address.locality}
//           </p>
//           {supplier.address.landmark && (
//             <p>
//               <strong>Landmark:</strong> {supplier.address.landmark}
//             </p>
//           )}
//           {supplier.address.crossRoad && (
//             <p>
//               <strong>Cross Road:</strong> {supplier.address.crossRoad}
//             </p>
//           )}
//           {supplier.address.relatedLocation && (
//             <p>
//               <strong>Related Location:</strong>{" "}
//               {supplier.address.relatedLocation}
//             </p>
//           )}
//           {supplier.address.pinCode && (
//             <p>
//               <strong>Pin Code:</strong> {supplier.address.pinCode}
//             </p>
//           )}

//           <h5 className="mt-3">Bank Details</h5>
//           {supplier.bankDetails.length > 0 ? (
//             supplier.bankDetails.map((bank, index) => (
//               <div key={index} className="mb-2">
//                 <p>
//                   <strong>Firm Name:</strong> {bank.firmName}
//                 </p>
//                 <p>
//                   <strong>Bank Name:</strong> {bank.bankName}
//                 </p>
//                 <p>
//                   <strong>Account Number:</strong> {bank.accountNumber}
//                 </p>
//                 <p>
//                   <strong>IFSC Code:</strong> {bank.ifscCode}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p>No bank details available.</p>
//           )}

//           <h5 className="mt-3">Contact Numbers</h5>
//           {supplier.contactNumbers.length > 0 ? (
//             <ul className="list-unstyled">
//               {supplier.contactNumbers.map((contact, index) => (
//                 <li key={index} className="mb-1">
//                   <i className="bi bi-telephone-fill me-2"></i>
//                   {contact.number} {contact.name && `(${contact.name})`}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No contact numbers available.</p>
//           )}

//           <h5 className="mt-3">Associated Counter</h5>
//           <p>{supplier.associatedCounter || "N/A"}</p>

//           <h5 className="mt-3">Associated Salesman</h5>
//           <p>{supplier.associatedSalesman || "N/A"}</p>

//           <div className="mt-3 text-center">
//             <Link to="/supplier_list" className="btn btn-primary">
//               Back to Supplier List
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
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

// ===================================== Live Update Code  =============================

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from "../../../../services/api";
import { useNavigate } from "react-router-dom";
import {
  CardContent,
  Box,
  CssBaseline,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

import { Card, CardHeader, CardActions, Avatar } from "@mui/material";

import Header from "../../../schema/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { styled, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
// import { makeStyles } from '@mui/styles';

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

export default function ViewSupplierMaster() {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    api
      .get(`/api/suppliers/${id}`)
      .then((response) => setSupplier(response.data))
      .catch((error) => console.error("Error fetching supplier:", error));
  }, [id]);

  if (!supplier) return <p>Loading...</p>;

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
                    <div className="col-xl-6">
                      <h4 className="fw-bold">Supplier Account Details</h4>
                    </div>
                    <div className="col-xl-6 d-flex justify-content-end">
                      <Link to="/supplier_detail">
                        <Button
                          color="primary"
                          variant="contained"
                          size="small"
                        >
                          Back
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="row">
                    <div className="container mt-3 mb-3">
                      <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                          <h2 className="card-title mb-0">
                            {supplier.firstName} {supplier.lastName}
                          </h2>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <h5 className="card-subtitle mb-2 text-muted">
                                General Information
                              </h5>
                              <p>
                                <strong>Party Name:</strong>{" "}
                                {supplier.partyName}
                              </p>
                              <p>
                                <strong>Area:</strong> {supplier.area}
                              </p>
                              <p>
                                <strong>Party Code:</strong>{" "}
                                {supplier.partyCode}
                              </p>
                              <p>
                                <strong>Opening Balance:</strong>{" "}
                                {supplier.openingBalance.amount} (
                                {supplier.openingBalance.type})
                              </p>
                            </div>
                            <div className="col-md-6 text-center mb-3">
                              {supplier.image && (
                                <img
                                  src={supplier.image}
                                  alt={`${supplier.firstName} ${supplier.lastName}`}
                                  className="img-fluid rounded-circle shadow-sm"
                                  style={{ maxWidth: "200px" }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="card-footer bg-light">
                          <h5 className="mt-3">Address</h5>
                          <p>
                            {supplier.address.houseNumber},{" "}
                            {supplier.address.streetName},{" "}
                            {supplier.address.locality}
                          </p>
                          {supplier.address.landmark && (
                            <p>
                              <strong>Landmark:</strong>{" "}
                              {supplier.address.landmark}
                            </p>
                          )}
                          {supplier.address.crossRoad && (
                            <p>
                              <strong>Cross Road:</strong>{" "}
                              {supplier.address.crossRoad}
                            </p>
                          )}
                          {supplier.address.relatedLocation && (
                            <p>
                              <strong>Related Location:</strong>{" "}
                              {supplier.address.relatedLocation}
                            </p>
                          )}
                          {supplier.address.pinCode && (
                            <p>
                              <strong>Pin Code:</strong>{" "}
                              {supplier.address.pinCode}
                            </p>
                          )}

                          <h5 className="mt-3">Bank Details</h5>
                          {supplier.bankDetails.length > 0 ? (
                            supplier.bankDetails.map((bank, index) => (
                              <div key={index} className="mb-2">
                                <p>
                                  <strong>Firm Name:</strong> {bank.firmName}
                                </p>
                                <p>
                                  <strong>Bank Name:</strong> {bank.bankName}
                                </p>
                                <p>
                                  <strong>Account Number:</strong>{" "}
                                  {bank.accountNumber}
                                </p>
                                <p>
                                  <strong>IFSC Code:</strong> {bank.ifscCode}
                                </p>
                              </div>
                            ))
                          ) : (
                            <p>No bank details available.</p>
                          )}

                          <h5 className="mt-3">Contact Numbers</h5>
                          {supplier.contactNumbers.length > 0 ? (
                            <ul className="list-unstyled">
                              {supplier.contactNumbers.map((contact, index) => (
                                <li key={index} className="mb-1">
                                  <i className="bi bi-telephone-fill me-2"></i>
                                  {contact.number}{" "}
                                  {contact.name && `(${contact.name})`}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>No contact numbers available.</p>
                          )}

                          <h5 className="mt-3">Associated Counter</h5>
                          <p>{supplier.associatedCounter || "N/A"}</p>

                          <h5 className="mt-3">Associated Salesman</h5>
                          <p>{supplier.associatedSalesman || "N/A"}</p>
                        </div>
                      </div>
                    </div>

                    {/* <Grid container justifyContent="center">
      <Grid item xs={12} md={8}>
        <Card
          sx={{
            mt: 2,
            boxShadow: 3,
            borderRadius: 2,
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 8,
            },
          }}
        >
          <CardHeader
            avatar={
              supplier.image ? (
                <Avatar
                  src={supplier.image}
                  alt={`${supplier.firstName} ${supplier.lastName}`}
                  sx={{
                    width: 80,
                    height: 80,
                    boxShadow: 4,
                    border: '2px solid',
                    borderColor: 'primary.main',
                  }}
                />
              ) : (
                <Avatar sx={{ width: 80, height: 80 }}>
                  {supplier.firstName.charAt(0)}
                </Avatar>
              )
            }
            title={`${supplier.firstName} ${supplier.lastName}`}
            sx={{ backgroundColor: 'primary.main', color: 'white' }}
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  General Information
                </Typography>
                <Typography variant="body2">
                  <strong>Party Name:</strong> {supplier.partyName}
                </Typography>
                <Typography variant="body2">
                  <strong>Area:</strong> {supplier.area}
                </Typography>
                <Typography variant="body2">
                  <strong>Party Code:</strong> {supplier.partyCode}
                </Typography>
                <Typography variant="body2">
                  <strong>Opening Balance:</strong> {supplier.openingBalance.amount} (
                  {supplier.openingBalance.type})
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box textAlign="center">
                  {supplier.image && (
                    <img
                      src={supplier.image}
                      alt={`${supplier.firstName} ${supplier.lastName}`}
                      className="img-fluid rounded-circle shadow-sm"
                      style={{ maxWidth: "200px" }}
                    />
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                  Address
                </Typography>
                <Typography variant="body2">
                  {supplier.address.houseNumber}, {supplier.address.streetName},{" "}
                  {supplier.address.locality}
                </Typography>
                {supplier.address.landmark && (
                  <Typography variant="body2">
                    <strong>Landmark:</strong> {supplier.address.landmark}
                  </Typography>
                )}
                {supplier.address.crossRoad && (
                  <Typography variant="body2">
                    <strong>Cross Road:</strong> {supplier.address.crossRoad}
                  </Typography>
                )}
                {supplier.address.relatedLocation && (
                  <Typography variant="body2">
                    <strong>Related Location:</strong> {supplier.address.relatedLocation}
                  </Typography>
                )}
                {supplier.address.pinCode && (
                  <Typography variant="body2">
                    <strong>Pin Code:</strong> {supplier.address.pinCode}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                  Bank Details
                </Typography>
                {supplier.bankDetails.length > 0 ? (
                  supplier.bankDetails.map((bank, index) => (
                    <Typography variant="body2" key={index}>
                      <strong>Firm Name:</strong> {bank.firmName}
                      <br />
                      <strong>Bank Name:</strong> {bank.bankName}
                      <br />
                      <strong>Account Number:</strong> {bank.accountNumber}
                      <br />
                      <strong>IFSC Code:</strong> {bank.ifscCode}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2">No bank details available.</Typography>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                  Contact Numbers
                </Typography>
                {supplier.contactNumbers.length > 0 ? (
                  <ul style={{ paddingLeft: 16 }}>
                    {supplier.contactNumbers.map((contact, index) => (
                      <Typography variant="body2" component="li" key={index}>
                        {contact.number} {contact.name && `(${contact.name})`}
                      </Typography>
                    ))}
                  </ul>
                ) : (
                  <Typography variant="body2">No contact numbers available.</Typography>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                  Associated Counter
                </Typography>
                <Typography variant="body2">
                  {supplier.associatedCounter || "N/A"}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                  Associated Salesman
                </Typography>
                <Typography variant="body2">
                  {supplier.associatedSalesman || "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/supplier_detail"
            >
              Back to Supplier List
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid> */}
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
