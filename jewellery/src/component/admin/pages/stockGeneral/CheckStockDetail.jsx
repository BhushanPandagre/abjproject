import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "../../../schema/Header";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PrintIcon from "@mui/icons-material/Print"; // Import the print icon
import Swal from "sweetalert2";
import SearchIcon from "@mui/icons-material/Search";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import { InputAdornment, IconButton } from "@mui/material";
import api from "../../../../services/api";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const breadcrumbs = [
  <Typography key="4" color="text.primary">
    Purchase Voucher Detail
  </Typography>,
];

export default function CheckStockDetail() {
    const navigate = useNavigate("");
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
                <div className="row">
                  <div className="col-xl-12">
                    <div className="row d-flex justify-content-between">
                      <div className="col-xl-4">
                        <Button
                          variant="contained"
                          color="primary"
                          
                          onClick={()=>{navigate("/stock_check")}}
                          size="small"
                          className="fw-bold"
                        >
                          Check Stock
                        </Button>
                      </div>
                     
                    </div>
                  </div>
                </div>
               
                <div className="row mt-3">
                  <div className="col-xl-12 mb-2 mt-3">
                  <Grid
                      container
                      spacing={2}
                      alignItems="center"
                      className="d-flex justify-content-start mb-2"
                    >
                      
                      <div className="col-xl-6">
                      <Grid item xs={12} md={6} lg={6} xl={3} 
                      className="d-flex justify-content-start"
                      >
                        <TextField
                          size="small"
                          fullWidth
                          id="search"
                          label="Search by Supplier Name"
                          variant="outlined"
                          name="searchTerm"
                         
                    
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <IconButton>
                                  <SearchIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      </div>

                      <div className="col-xl-6 d-flex justify-content-end">
                      <Grid item xs={12} md={6} lg={4} xl={3} className="me-2">
                        <TextField
                          size="small"
                          fullWidth
                          id="startDate"
                          label="Start Date"
                          type="date"
                          InputLabelProps={{ shrink: true }}
                   
                        />
                      </Grid>
                      <Grid item xs={12} md={6} lg={4} xl={3} >
                        <TextField
                          size="small"
                          fullWidth
                          id="endDate"
                          label="End Date"
                          type="date"
                          InputLabelProps={{ shrink: true }}
                   
                        />
                      </Grid>
                      </div>
                     
                     
                    </Grid>
                  </div>
                 
                  <div className="col-xl-12">
                    <TableContainer
                      component={Paper}
                      className="d-flex justify-content-center"
                    >
                      <Table
                        sx={{ minWidth: 650 }}
                        size="small"
                        aria-label="a dense table"
                        className="bordered"
                      >
                        <TableHead>
                          <TableRow style={{ background: "#bbdefb" }}>
                            <TableCell align="left" className="fw-bold">
                              #
                            </TableCell>
                            <TableCell align="left" className="fw-bold">
                            Purchase Date	
                            </TableCell>
                            <TableCell align="left" className="fw-bold">
                            Invoice Date	
                            </TableCell>

                            <TableCell align="left" className="fw-bold">
                            Supplier Name
                            </TableCell>
                            <TableCell align="left" className="fw-bold">
                            Company Name	
                            </TableCell>
                            <TableCell align="left" className="fw-bold">
                            Total Amount
                            </TableCell>

                            <TableCell align="left" className="fw-bold">
                              Actions
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {/* {filteredPurchases.map((purchase, index) => ( */}
                            <TableRow
                            // key={purchase._id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="left">
                                </TableCell>
                              <TableCell align="left">
                             
                              </TableCell>
                              <TableCell align="left">
                            
                              </TableCell>

                              <TableCell align="left">
                              </TableCell>
                              <TableCell align="left">
                              </TableCell>
                              <TableCell align="left">
                            
                              </TableCell>

                              <TableCell align="left">
                               
                                  <Button
                                    variant="contained"
                                    color="warning"
                                    size="small"
                                   
                                    style={{
                                      marginRight: "10px",
                                      background: "#ffe0b2",
                                    }}
                                  >
                                    <RemoveRedEyeIcon
                                      style={{ color: "#ff9100" }}
                                    />
                                  </Button>
                             
                                  <Button
                                    variant="contained"
                                    color="success"
                                    size="small"
                                  
                                    style={{
                                      marginRight: "10px",
                                      background: "#a5d6a7",
                                    }}
                                    className="text-success"
                                  >
                                    <EditRoundedIcon />
                                  </Button>

                                <Button
                                  variant="contained"
                              
                                  color="error"
                                  size="small"
                                  style={{ background: "#ffab91",marginRight: "10px", }}
                                >
                                  <DeleteIcon className="text-danger" />
                                </Button>

                                <Button
                                  variant="contained"
                              
                                  color="secondary"
                                  size="small"
                                  style={{ background: "gray" }}
                                >
                                  <PrintIcon className="text-light" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          {/* ))} */}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
            </Box>
          </Box>
          <ToastContainer />
        </div>
      </div>
    </div>
  </div>
  )
}
