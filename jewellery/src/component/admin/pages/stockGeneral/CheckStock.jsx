import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
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
import Swal from "sweetalert2";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import {
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../../../schema/Header";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" to="/user_category" className="text-decoration-none"  style={{ fontSize: "15px" }}>
   User Category
  </Link>,

  <Typography key="4" color="text.secondary"  style={{ fontSize: "15px" }}>
    Account Master
  </Typography>,
];

export default function CheckStock() {
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
                  <div className="row mt-2">
                  <div className="col-xl-12">
                                <h4>
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      color: "rgb(1, 87, 155)",
                                    }}
                                    className="fw-bold"
                                  >
                                    StocK Check
                                  </span>
                                </h4>
                              </div>
                  <div className="col-xl-6  mx-auto">
            <Box
              sx={{
                marginTop: 5,
                // display: "flex",
                // flexDirection: "column",
                alignItems: "center",
              }}
              style={{
                border: "1px solid black",
                borderRadius: "5px",
                // background: "#e0f7fa",
              
              }}
              className="p-4 "
            >
              
              {/* <div className="mb-3">
                <img
                  src={Logo}
                  alt=""
                  className="img-fluid d-flex  mx-auto"
                  style={{ width: "150px" }}
                />
              </div> */}
              <Typography component="h1" variant="h5">
                {/* <span className="fw-bold d-flex justify-content-center">Login</span> */}
              </Typography>
              <div className="row">
                <Box
                  component="form"
                //   onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                
                >
                  <div className="col-xl-12">
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Date"
                      autoComplete="email"
                      id="email"
                      size="small"
                      autoFocus
                      type="date"
                      InputLabelProps={{ shrink: true }}
                    
                    />

                    {/* {errors.email && (
                      <p className="invalid-feedback text-danger">
                        {errors.email}
                      </p>
                    )} */}
                  </div>
                  <div className="col-xl-12">
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Show Total Stock/ Book Stock"
                      value={"T/B"}
                      type="text"
                      size="small"
                   
                    />

                    {/* {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )} */}
                  </div>
                  <div className="col-xl-12">
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Show Value of Items"
                      value={"N"}
                      type="text"
                      size="small"
                   
                    />
                  </div>
                  <div className="col-xl-12">
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Stock Status to be Shown in"
                      value={"Both Unit"}
                      type="text"
                      size="small"
                   
                    />
                  </div>
                  <div className="col-xl-12">
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Item to be shown by"
                      value={"Both Unit"}
                      type="text"
                      size="small"
                   
                    />
                  </div>
                 
                  <div className="col-xl-12">
                   


                                    <TextField
                                      select
                                      label="Item to be shown by"
                                      fullWidth
                                      margin="normal"
                                      size="small"
                                      required
                                    
                                    >
                                        <MenuItem value={"Name"}
                                        
                                        >
                                          Name
                                        </MenuItem>
                                        <MenuItem value={"Alias"}
                                        
                                        >
                                          Alias
                                        </MenuItem>
                                        <MenuItem value={"PrintName"}
                                        
                                        >
                                          PrintName
                                        </MenuItem>
                                      {/* // ))} */}
                                    </TextField>

                  </div>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    OK
                  </Button>
                 
                </Box>
              </div>
            </Box>
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
